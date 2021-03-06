
//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//setting up express
const app = express();
const PORT = process.env.PORT || 8000;

// 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


// routes

// main page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//notes page
 app.get("/notes", function(req, res) {
   res.sendFile(path.join(__dirname, "./public/notes.html"));
}); 


//db
 app.get("/api/notes", function(req, res) {
   res.sendFile(path.join(__dirname, "./db/db.json"));
 });
 

 
 app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", function (error, data) {
      if (error) {
        console.log(error);
      }
      
      const noteInfo = JSON.parse(data);
 
      const newEntry = {
        id: noteInfo.length + 1,
        title: req.body.title,
        text: req.body.text
      }
 
 // adds the new note
    noteInfo.push(newEntry);
    res.json(newEntry);
 
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(noteInfo, null, 2), function (err) {
      if (err) throw err;
    });
 
   });
 });

 //delete

 app.delete("/api/notes/:id", function (req, res) {
   fs.readFile ("./db/db/json", "utf8", function (error, data) {
     if (error) {
       console.log (error);
     }


     const noteInfo = [];

     //use splice() to remove 
    noteInfo.splice(req.params.id - 1, 1);

    //for loop updating id in db
    for (let i = 0; i < noteInfo.length; i++) {
      noteInfo[i].id = i + 1;
    };

    res.json(noteInfo);

    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(noteInfo, null, 2), function (err) {
      if (err) throw err;
    });
   });
  });
  




// listening to port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });