const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB, { useNewUrlParser: true });

const db = require("../models");
module.exports = function (app) {
    app.get("/", function (req, res) {
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
                console.log(result);
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        });
        res.send("scraped");
    });
};