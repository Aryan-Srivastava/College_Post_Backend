const router = require("express").Router();
const createPost = require("../controllers/posts-controller").createPost;
const updatePost = require("../controllers/posts-controller").updatePost;
const deletePost = require("../controllers/posts-controller").deletePost;
const getPost = require("../controllers/posts-controller").getPost;
const getAllPosts = require("../controllers/posts-controller").getAllPosts;
// const likePost = require("../controllers/posts-controller").likePost;
// const commentPost = require("../controllers/posts-controller").commentPost;
// const bookmarkPost = require("../controllers/posts-controller").bookmarkPost;


router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.get("/", getAllPosts);

// not yet implemented routes
// router.put("/:id/like", likePost);
// router.put("/:id/comment", commentPost);
// router.put("/:id/bookmark", bookmarkPost);

module.exports = router;
