// routes

// main page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// notes page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


// db 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });