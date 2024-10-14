/*
   Back end server for Cheeseria POC
   @author Nikolah McWin
*/

// Initialise dependencies
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

// 
const app = express();
const port = 3000;

// Pull in cheese data from JSON file
const fs = require("fs");
let cheeses = '';
fs.readFile("cheeses.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  cheeses = JSON.parse(jsonString).cheeses;
});

console.log(cheeses);
//Middleware for JSON and SWAGGER
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Home page 
app.get("/", (req, res) => {
   res.send("Home page");
})

// All cheeses page
app.get("/cheeses", (req, res) => {
   res.send(cheeses);
})

// Single cheese by ID
app.get("/cheeses/:id", (req, res) => {
   const reqId = parseInt(req.params.id);
   const cheese = cheeses.find(i => i.id === reqId);

   if (cheese != null) {
      res.send(cheese);
   } else {
      res.status(404).send("Cheese not found");
   }
});


// Set the app to listen
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`)
});

