
//dependencies
const express = require("express");
const fs = require("fs");

//setting up express
const app = express();
var PORT = process.env.PORT || 8080;

require("./routes/route")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });