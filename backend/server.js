/**
 * Basic back end server for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 */

// Initialise dependencies
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const app = express();

// Constants
const PORT = 3000;
const FILE_NAME = "cheeses.json";

// Add middleware
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Used to pull the cheese data out of the JSON file
async function readData() {
  try {
    const jsonString = await fs.readFile(FILE_NAME, "utf8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(`Reading file ${FILE_NAME} failed with error: `, err);
    throw new Error("Error reading data.");
  }
}

// Used to write data out to the JSON file
async function writeData(data) {
  const jsonString = JSON.stringify(data, null, 2);
  await fs.writeFile(FILE_NAME, jsonString, (err) => {
    if (err) {
      console.error(`Writing file ${FILE_NAME} failed with error: `, err);
      throw new Error("Error writing data.");
    }
  });
}

//Home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Get all cheeses
app.get("/cheeses", async (req, res) => {
  try {
    const cheeses = await readData();
    res.send(cheeses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// Add to all cheeses
app.post("/cheeses", async (req, res) => {
  try {
    const cheeses = await readData();
    const newCheese = {
      id: cheeses.length + 1,
      name: req.body.name,
      origin: req.body.origin,
      price: req.body.price,
      colour: req.body.colour,
      texture: req.body.texture,
      milk: req.body.milk,
      photo: req.body.photo,
    };

    cheeses.push(newCheese);
    await writeData(cheeses);
    res.status(201).send(newCheese);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting data");
  }
});

// Get cheese by ID
app.get("/cheeses/:id", async (req, res) => {
  const reqId = parseInt(req.params.id);
  if (Number.isNaN(reqId)) {
    return res.status(400).send("Invalid cheese ID");
  }

  try {
    const cheeses = await readData();
    const cheese = cheeses.find((i) => i.id == reqId);
    if (cheese == null) {
      return res.status(404).send(`No cheese found for ID: ${reqId}`);
    }

    res.send(cheese);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting data");
  }
});

// Update cheese by ID
app.put("/cheeses/:id", async (req, res) => {
  const reqId = parseInt(req.params.id);
  if (Number.isNaN(reqId)) {
    return res.status(400).send("Invalid cheese ID");
  }

  try {
    const cheeses = await readData();
    const index = cheeses.findIndex((i) => i.id == reqId);
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
      photo: req.body.photo,
    };

    cheeses[index] = newCheese;
    await writeData(cheeses);
    res.send(cheeses[index]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating data");
  }
});

// Delete cheese by ID
app.delete("/cheeses/:id", async (req, res) => {
  const reqId = parseInt(req.params.id);
  if (Number.isNaN(reqId)) {
    return res.status(400).send("Invalid cheese ID");
  }
  try {
    const cheeses = await readData();
    const index = cheeses.findIndex((i) => i.id == reqId);
    if (index == -1) {
      return res.status(404).send(`No cheese found for ID: ${reqId}`);
    }

    const cheese = cheeses.splice(index, 1);
    await writeData(cheeses);
    res.send(cheese[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data");
  }
});

// Set the app to listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
