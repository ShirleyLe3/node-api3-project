const express = require("express");

const router = express.Router();
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

//      create
router.post("/", validateUser(), (req, res) => {
  res.status(201).json(req.user);
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  postDb
    .insert({ user_id: req.params.id, text: req.body.text })
    .then((post) => {
      res.status(200).json(post); //send back the post   and 201 for success create
    })
    .catch((error) => res.statuts(500).json({ error: "error" }));
});

//      read
router.get("/", (req, res) => {
  userDb
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  res.status(200).json(req.user); // attach passed data
});

router.get("/:id/posts", validateUserId(), (req, res) => {
  userDb
    .getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving",
      });
    });
});

//      delete
router.delete("/:id", validateUserId(), (req, res) => {
  userDb
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        // res.status(200).json(req.user{message:""});
        res.status(200).json({
          user: req.user,
          message: "The user has been nuked",
        });
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

router.put("/:id", validateUserId(), (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.name) {
    res.status(400).json({
      message: "Failed to provide username",
    });
  } else {
    userDb
      .update(id, changes)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error updating the user",
        });
      });
  }
});
// // CUSTOM MIDDLEWARE

// all endpoints that include an `id` parameter in the url (ex: `/api/users/:id`)

function validateUserId() {
  //  if the `id` parameter is valid, store that user object as `req.user`
  //  if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`
  return (req, res, next) => {
    userDb.getById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      } else if (!user.id) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      } else {
        req.user = user;
        next();
      }
    });
  };
}

function validateUser() {
  //  if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
  //  if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Missing user data",
      });
      next();
    } else if (!req.body.name) {
      return res.status(400).json({
        message: "Missing field",
      });
    } else
      userDb
        .insert(req.body)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((error) => {
          res.status(500).json({ message: "Error retrieving" });
        });
  };
}

function validatePost(req, res, next) {
  // if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
  //  if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Missing user data",
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        message: "Missing field",
      });
    } else {
      next();
    }
  };
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost
}
