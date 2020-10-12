const express = require("express");
const router = express.Router();

const userDb = require("../users/userDb");
const postDb = require("./postDb");

router.get("/", (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  res.status(200).json(req.post); // attach passed data
});

router.delete("/:id", validatePostId(), (req, res) => {
  postDb
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        // res.status(200).json(req.user{message:""});
        res.status(200).json({
          post: req.post,
          message: "The post has been nuked",
        });
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

router.put("/:id", validatePostId(), (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.id) {
    res.status(400).json({
      message: "Failed to provide id",
    });
  } else {
    postDb
      .update(id, changes)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error updating the post",
        });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    postDb.getById(req.params.id).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
        // } else if (!post.id) {
        //   return res.status(400).json({
        //     message: "Invalid post ID",
        //   });
      } else {
        req.post = post;
        next();
      }
    });
  };
}

module.exports = router;
