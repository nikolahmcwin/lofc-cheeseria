/*
   Back end server for Cheeseria POC
   @author Nikolah McWin
*/

// Initialise dependencies
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const app = express();
const port = 3000;

//Mock backend cheese data
let cheeses =  [ {"id": 1, "name": "Asiago"}, {"id": 2, "name": "Brie"}, {"id": 3, "name": "Camembert"}, {"id": 4, "name": "Danish Blue"}, {"id": 5, "name": "Emmental"}]

//Middleware for JSON and SWAGGER
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());


// Home page 
app.get("/", (req, res) => {
   res.send("Home page");
})

// All cheeses page
app.get("/cheeses", (req, res) => {
   res.send(cheeses);
})

// Set the app to listen
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`)
});

