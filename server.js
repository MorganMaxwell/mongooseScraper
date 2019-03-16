// requiring packages
const express = require("express");
// I have to use it, it's my own name :)
const logger = require("morgan");
// initialize the express package
const app = express();
// tell express to use morgan logger package with status codes and such for route hits
app.use(logger("dev"));
// parse req as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// requiring handlebars 
const exphbs = require("express-handlebars");
// setting handlebars to use 'main' as basic HTML
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// send the public folder to the browser
app.use(express.static("public"));
// declare where routes are coming from and use them
require("./controllers/Controller.js")(app);
// wait for hits on PORT 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("https://localhost:" + PORT) });