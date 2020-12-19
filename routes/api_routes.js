const fs = require("fs");
let path = require("path");
let db = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, notesData) => {
      if (err) throw err;
      res.send(JSON.parse(notesData));
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, notesData) {
      if (err) throw err;
      notess = JSON.parse(notesData);
      notess.push(req.body);
      console.log(notess);
      for (let i = 0; i < notess.length; i++) {
        notess[i].id = i;
      }
      console.log(notess);
   

    fs.writeFile("./db/db.json", 
    JSON.stringify(notess), 
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(notess);
      }
    }
    )

    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(__dirname + "/../db/db.json", function (err, data) {
      if (err) console.log(err);
      let noteEx = JSON.parse(data);
      const newArray = noteEx.filter(
        (dataItem) => dataItem.id !== parseInt(req.params.id)
      );
      fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(newArray),
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.send(noteEx);
          }
        }
      )
    })
})

}