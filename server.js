const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/Controller.js")(app);

app.listen(PORT, function () { console.log("http://localhost:" + PORT) });