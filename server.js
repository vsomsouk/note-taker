
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
app.use(express.static("./Develop/public"));


// routes

// main page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

//notes page
 app.get("*", function(req, res) {
   res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
}); 


//db
 app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "/Develop/db/db.json"));
 });
 
 app.use(express.urlencoded({ extended: true}));
 app.use(express.json());
 app.use(express.static("./Develop/public"));

 //printing in db
 
 app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "/Develop/db/db.json"), "utf8", function (error, data) {
      if (error) {
        console.log(error);
      }
 
      const noteInfo = JSON.parse(data);
 
      const newEntry = {
        id: noteInfo.length + 1,
        title: req.body.title,
        text:req.body.text
      }
 
 
    noteInfo.push(newEntry);
    res.json(newEntry);
 
    fs.writeFile(path.join(__dirname, "/Develop/db/db.json"), JSON.stringify(noteInfo, null, 2), function (err) {
      if (err) throw err;
    });
 
   });
 });

 //delete

 //app.delete('/api/notes', function (req, res) {
  //})
  




// listening to port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });