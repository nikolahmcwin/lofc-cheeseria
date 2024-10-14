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
let basicCheeses = [{ "id": 1, "name": "Asiago" }, { "id": 2, "name": "Brie" }, { "id": 3, "name": "Camembert" }, { "id": 4, "name": "Danish Blue" }, { "id": 5, "name": "Emmental" }]
let cheeses = [{
   "id": 1,
   "name": "Asiago",
   "origin": "Italy",
   "price_per_kilo": 19.50,
   "colour": "Pale Yellow",
   "texture": "Firm",
   "milk_type": "Cow",
   "photo-url": "https://www.cheese.com/media/img/cheese/Formaggio_Asiago_Dop_mdAjQor.jpg"
},
{
   "id": 2,
   "name": "Brie",
   "origin": "France",
   "price_per_kilo": 22.30,
   "colour": "White",
   "texture": "Soft",
   "milk_type": "Cow",
   "photo-url": "https://www.cheese.com/media/img/cheese-suggestion/Briefermier.jpg"
},
{
   "id": 3,
   "name": "Camembert",
   "origin": "France",
   "price_per_kilo": 25.00,
   "colour": "Cream",
   "texture": "Soft",
   "milk_type": "Cow",
   "photo-url": "https://www.cheese.com/media/img/cheese-suggestion/CamembertStLoup_800x.jpg"
},
{
   "id": 4,
   "name": "Danish Blue",
   "origin": "Denmark",
   "price_per_kilo": 21.80,
   "colour": "Blue",
   "texture": "Semi-Soft",
   "milk_type": "Cow",
   "photo-url": "https://www.cheese.com/media/img/cheese/Danablu-Danish-Blue.jpg"
},
{
   "id": 5,
   "name": "Emmental",
   "origin": "Switzerland",
   "price_per_kilo": 24.50,
   "colour": "Yellow",
   "texture": "Firm",
   "milk_type": "Cow",
   "photo-url": "https://www.cheese.com/media/img/cheese-suggestion/Emmental_6174830f-d536-4b99-964e-ea52f1ed6a57_800x.jpg"
}];

//Middleware for JSON and SWAGGER
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Home page 
app.get("/", (req, res) => {
   res.send("Home page");
})

// All cheeses page
app.get("/cheeses", (req, res) => {
   res.status(200);
   res.send(cheeses);
})


//Single cheese by ID
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

