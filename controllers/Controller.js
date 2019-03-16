const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const mongoose = require("mongoose");
// connect to mongodb on heroku, or do a localhost connection
const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB, { useNewUrlParser: true });

const db = require("../models");

const router = express.Router();

module.exports = function(app) {

}