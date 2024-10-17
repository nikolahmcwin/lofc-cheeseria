/**
 * Basic back end server for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 *
 * URL for the API in dev:
 *  http://localhost:3000/cheeses/
 *  http://localhost:3000/cheeses/:id
 *
 * NOTE:
 *  First Node.js and Express application, created it manually to learn.
 *  Stored cheese data in a .json file that is being written & read with FS
 *  Didn't use any global environment variables for now
 *  Missing input validation for requests (also making them provide ID but overwriting it is dumb & lazy)
 *  Code should likely be split into multiple files/modules, for simplicity
 *  Clogging up logs a lot with reading/writing files too.
 *
 * Learnt a lot! Had a lot of fun! Need to learn a lot more!
 * And definitely need to review good vs bad practices, I'm like a kid again here.
 *
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
const FILE_NAME = "cheeses.json";
const API_DOCS = "/api-docs";
const CHEESES = "/cheeses";
const CHEESE_ID = "/cheeses/:id";

// Middleware used
app.use(express.json());
app.use(cors());
app.use(API_DOCS, swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//Helper for my own sanity in console while testing
const timestamp = () => `[${new Date().toLocaleString()}]`;

// Helper to pull the cheese data out of the JSON file
async function readData() {
  try {
    console.log(` - Reading from file ${FILE_NAME} at ${timestamp()}`);
    const jsonString = await fs.readFile(FILE_NAME, "utf8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(`Reading file ${FILE_NAME} failed with error: `, err);
    throw new Error("Error reading data.");
  }
}

// Helper to write data out to the JSON file
async function writeData(data) {
  console.log(` - Writing to file ${FILE_NAME} at ${timestamp()}`);
  const jsonString = JSON.stringify(data, null, 2);
  await fs.writeFile(FILE_NAME, jsonString, (err) => {
    if (err) {
      console.error(`Writing file ${FILE_NAME} failed with error: `, err);
      throw new Error("Error writing data.");
    }
  });
}
// Default landing page
app.get("/", (req, res) => {
  res.send(`Please see api docs at: ${API_DOCS}`);
});

// API Get all cheeses
app.get(CHEESES, async (req, res) => {
  try {
    const cheeses = await readData();
    res.send(cheeses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// API Add to all cheeses
app.post(CHEESES, async (req, res) => {
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

// API Get cheese by ID
app.get(CHEESE_ID, async (req, res) => {
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

// API Update cheese by ID
app.put(CHEESE_ID, async (req, res) => {
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

// API Delete cheese by ID
app.delete(CHEESE_ID, async (req, res) => {
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

// Export the whole app
module.exports = app;
