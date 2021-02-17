const express = require('express');
const postDb = require("./postDb");
const userDb = require("../users/userDb");
const router = express.Router();
const {
	validateUserId,
	validateUser,
	validatePost,
} = require("../middleware/user");


router.get("/", validateUserId(),(req, res) => {
  userDb
    .getUserPosts(req.user.id)
		.then((posts) => {
      console.log(posts)
			res.status(200).json(posts);
		})
		.catch((err) => {next()});
});
router.get("/:id",validateUserId(), validatePostId(), (req, res) => {
	userDb
  .getUserPosts(req.user.id)
		.then((response) => {
			res.status(200).json(req.post);
		})
		.catch((error) => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

router.delete("/:id", validatePostId(), (req, res) => {
	postDb
		.remove(req.post)
		.then((response) => {
			res.status(200).json({ message: "Deleted" });
		})
		.catch((error) => {
			res
				.status(500)
				.json({ error: "The posts information could not be deleted." });
		});
});
router.put("/:id", validatePostId(), (req, res) => {
	postDb
    .update(req.post.id, {
      text: req.body.text,
      user_id: req.body.user_id,
    })
		.then(res.status(200))
		.catch((error) => {
			res.status(500).json({ error: "Could not update post." });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	return (req, res, next) => {
		postDb
			.getById(req.params.id)
			.then((post) => {
				if (post) {
					req.post = post;
					next();
				} else {
					res.status(404).json({
						message: "Post not found",
					});
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: "Error retrieving the post",
				});
			});
	};
}

module.exports = router;


