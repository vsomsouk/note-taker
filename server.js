
//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//setting up express
const app = express();
const PORT = process.env.PORT || 3000;

// 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => res.send('Hello World!'))

// listening to port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });