const router = require("express").Router();
const Comment = require("../models/Comment");


// To create the Comment
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body);
    console.log(newComment);
    const API_KEY = req.query.api;
    if(API_KEY === process.env.API_KEY){
    try {
        const savedComment = await newComment.save();
        return res.status(200).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }}
    else{
        return res.status(401).json("Unauthorised")
      }
});

//DELETE Comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.delete();
        return res.status(200).json("Comment has been deleted...");
    } catch (err) {
        return res.status(500).json(err);
    }
});


// To get All comment by PostId
router.get("/:postId", async (req, res) => {
    const API_KEY = req.query.api;
    if(API_KEY === process.env.API_KEY){
    try {
        const comments = await Comment.find({postId : req.params.postId});
        return res.status(200).json(comments);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}
    else{
        return res.status(401).json("Unauthorised")
      }

});

module.exports = router;
