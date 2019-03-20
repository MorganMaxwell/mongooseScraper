const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB, { useNewUrlParser: true });

const db = require("../models");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.propublica.org/").then(function (response) {
            let $ = cheerio.load(response.data);
            $(".story-entry").each(function (i, element) {
                let result = {};
                result.headline = $(this)
                    .children(".description")
                    .children(".hed")
                    .children("a")
                    .text();

                result.summary = $(this)
                    .children(".description")
                    .children(".dek")
                    .text();

                result.link = $(this)
                    .children(".description")
                    .children(".hed")
                    .children("a")
                    .attr("href");
                db.Article.find({})
                    .then(function (dbArticle) {
                        let readyToPush = true;
                        for (var i = 0; i < dbArticle.length; i++) {
                            if (dbArticle[i].headline === result.headline) {
                                readyToPush = false;
                            };
                        };
                        if (readyToPush) {
                            db.Article.create(result)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        };
                    });

            });
        });
        res.send("scraped");
    });
    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                let handleBarsArticle = {
                    articles: dbArticle
                }
                res.render("index", handleBarsArticle);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
    app.get("/oneArticle/:id", function (req, res) {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate("comment")
            .then(function (dbArticle) {
                console.log(dbArticle.comment.title);
                res.json(dbArticle);
            })
            .catch(err => {
                res.json(err);
            });
    });
    app.post("/oneArticle/:id", function (req, res) {
        db.UserComment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { comment: dbComment._id },
                    { new: true });
            })
            .then(dbArticle => {
                res.json(dbArticle);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
    app.delete("/deleteComment/:id", function (req, res) {
        db.UserComment.deleteOne({
            _id: req.params.id
        })
            .then(function (dbComment) {
                res.json(dbComment);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};