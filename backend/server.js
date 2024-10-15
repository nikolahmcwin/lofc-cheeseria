/*
   Back end server for Cheeseria POC
   @author Nikolah McWin
*/

// Initialise dependencies
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require('cors');


// Constants
const PORT = 3000;
const FILE_NAME = "cheeses.json";

// Add middleware 
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Used to pull the cheese data out of the JSON file
// TODO remove global variable + read data directly when required
let cheeses = "";
fs.readFile(FILE_NAME, "utf8", (err, jsonString) => {
   if (err) {
      console.error(`Reading file ${FILE_NAME} failed with error: `, err);
      return;
   }
   cheeses = JSON.parse(jsonString);
});

// Used to write data out to the JSON file
function writeData() {
   const jsonString = JSON.stringify(cheeses, null, 2);
   fs.writeFile(FILE_NAME, jsonString, err => {
      if (err) {
         console.error(`Writing file ${FILE_NAME} failed with error: `, err);
      }
   })
}

// Home page 
app.get("/", (req, res) => {
   res.send("Home page");
   //TODO do we need the homepage?
})

// Get all cheeses
app.get("/cheeses", (req, res) => {
   res.send(cheeses);
})

// Add to all cheeses
app.post("/cheeses", (req, res) => {
   const newCheese = {
      id: cheeses.length + 1,
      name: req.body.name,
      origin: req.body.origin,
      price: req.body.price,
      colour: req.body.colour,
      texture: req.body.texture,
      milk: req.body.milk,
      photo: req.body.photo
   };

   cheeses.push(newCheese);
   res.status(201).send(newCheese);
   writeData();
})

// Get cheese by ID
app.get("/cheeses/:id", (req, res) => {

   const reqId = parseInt(req.params.id);
   if (Number.isNaN(reqId)) {
      return res.status(400).send("Invalid cheese ID");
   }

   const cheese = cheeses.find(i => i.id == reqId);
   if (cheese == null) {
      return res.status(404).send(`No cheese found for ID: ${reqId}`);
   }
   res.send(cheese);
});

// Update cheese by ID
app.put("/cheeses/:id", (req, res) => {

   const reqId = parseInt(req.params.id);
   if (Number.isNaN(reqId)) {
      return res.status(400).send("Invalid cheese ID");
   }

   const index = cheeses.findIndex(i => i.id == reqId);
   if (index == -1) {
      return res.status(404).send(`No cheese found for ID: ${reqId}`);
   }

   let newCheese = {
      id: reqId,
      name: req.body.name,
      origin: req.body.origin,
      price: req.body.price,
      colour: req.body.colour,
      texture: req.body.texture,
      milk: req.body.milk,
      photo: req.body.photo
    };

   cheeses[index] = newCheese;
   res.send(cheeses[index]);
   writeData();
});

// Delete cheese by ID
app.delete("/cheeses/:id", (req, res) => {

   const reqId = parseInt(req.params.id);
   if (Number.isNaN(reqId)) {
      return res.status(400).send("Invalid cheese ID");
   }

   const index = cheeses.findIndex(i => i.id == reqId);
   if (index == -1) {
      return res.status(404).send(`No cheese found for ID: ${reqId}`);
   }

   const cheese = cheeses.splice(index, 1);
   res.send(cheese[0]);
   writeData();

});


// Set the app to listen
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}/`)
});

