const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const fetchuser = require('../middleware/fetchuser');

// GET Latest 12 POSTS

router.get("/latest", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ _id: -1 }).limit(12);
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).sort({ _id: -1 }).limit(12);
    } else {
      posts = await Post.find().sort({ _id: -1 }).limit(12);
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});



//CREATE POST
router.post("/", fetchuser, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", fetchuser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted...");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can delete only your post, Not Others!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // TO increase the view Count
    await Post.findByIdAndUpdate(req.params.id, { $inc: { view: 1 } }, { new: true })

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});



//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ _id: -1 });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).sort({ _id: -1 });
    } else {
      posts = await Post.find().sort({ _id: -1 });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});


module.exports = router;
