const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: String,
});

const UserComment = mongoose.model("UserComment", CommentSchema);

module.exports = UserComment;