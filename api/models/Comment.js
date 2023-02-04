const mongoose = require("mongoose");

const ComentSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,

        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", ComentSchema);
