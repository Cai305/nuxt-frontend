const express = require("express");
const bodyParser = require("body-parser");

// create express app
var cors = require('cors')
var app = express()

app.use(cors())


// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// Required routes
require("./routers/category.router")(app);
require("./routers/content.router")(app);
require("./routers/items.router")(app);
require("./routers/locale.router")(app);
require("./routers/media.router")(app);
require("./routers/tutorial.router")(app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
