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

const port = 3000;
const fileName = "cheeses.json";
const newFileName = "new_cheeses.json";
//TODO remove double file name

// Add middleware 
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Used to pull the cheese data out of the JSON file
let cheeses = '';
fs.readFile("cheeses.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  cheeses = JSON.parse(jsonString);
});

// Used to write data out to the JSON file
function writeData() {
   const jsonString = JSON.stringify(cheeses, null, 2);
   fs.writeFile(newFileName, jsonString, err => {
      if (err) {
          console.log("Error writing file", err)
      } else {
          console.log("Successfully wrote file")
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
   const cheese = cheeses.find(i => i.id === reqId);

   if (cheese != null) {
      res.send(cheese);
   } else {
      res.status(404).send("Cheese not found");
   }
});

// Update cheese by ID
app.put("/cheeses/:id", (req, res) => {
   const reqId = parseInt(req.params.id);
   const index = cheeses.findIndex(i => i.id === reqId); 

   if (index === -1) {
         res.status(404).send("Cheese not found");
   } else {
      cheeses[index].name = req.body.name;
      cheeses[index].origin = req.body.origin;
      cheeses[index].price = req.body.price;
      cheeses[index].colour = req.body.colour;
      cheeses[index].texture = req.body.texture;
      cheeses[index].milk = req.body.milk;
      cheeses[index].photo = req.body.photo;
      res.send(cheeses[index]);
      writeData();
   }

});

// Delete cheese by ID
app.delete("/cheeses/:id", (req, res) => {

   const reqId = parseInt(req.params.id);
   const cheese = cheeses.find(i => i.id === reqId);

   if (cheese != null) {
      //TODO DELETE cheese by ID

   } else {
      res.status(404).send("Cheese not found");
   }
});


// Set the app to listen
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`)
});

