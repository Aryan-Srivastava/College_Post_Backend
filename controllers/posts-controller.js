const Post = require("../models/Post");

// Create post
const createPost = async (req, res) => {
	const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        try {
            if(post.username === req.body.username) {
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, { new: true });
                    res.status(200).json(updatedPost);
                } catch (err) {
                    res.status(500).json(err);
                }
            } else {
                res.status(401).json("You can update only your post");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get all posts
const getAllPosts = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({username});
        } else if (catName) {
            posts = await Post.find({categories: {
                $in: [catName]
            }});
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// TODO <----------------------------- Yet to be implemented ---------------------------------->

// like / dislike a post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: { likes: req.body.userId }
            });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({
                $pull: { likes: req.body.userId }
            });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Comment on a post
const commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.updateOne({
            $push: { comments: {
                userId: req.body.userId,
                text: req.body.text
            } }
        });
        res.status(200).json("The comment has been added");
    } catch (err) {
        res.status(500).json(err);
    }
};

// Bookmark post
const bookmarkPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.bookmarks.includes(req.body.userId)) {
            await post.updateOne({
                $push: { bookmarks: req.body.userId }
            });
            res.status(200).json("The post has been bookmarked");
        } else {
            await post.updateOne({
                $pull: { bookmarks: req.body.userId }
            });
            res.status(200).json("The post has been unbookmarked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
    likePost,
    commentPost,
    bookmarkPost
};