/*
   Back end server for Cheeseria POC
   @author Nikolah McWin
*/

const express = require("express");
const server = express();
const port = 3000;

//Mock backend cheese data
let cheeses =  [ {"id": 1, "name": "Asiago"}, {"id": 2, "name": "Brie"}, {"id": 3, "name": "Camembert"}, {"id": 4, "name": "Danish Blue"}, {"id": 5, "name": "Emmental"}]

//Middleware to parse any JSON
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Home page");
})

app.get("/cheeses", (req, res) => {
   res.send(cheeses);
})

app.listen(port, () => {
   onsole.log(`Server running at http://localhost:${port}/`)
});

