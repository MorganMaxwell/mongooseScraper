const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: String,
    summary: String,
    link: String,
    comment: {
        type: Schema.Types.ObjectId,
        ref: "UserComment"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;