/**
 * Basic back end server for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 *
 */

// Import my node app
const app = require("./app.js");

// Use env variables
require("dotenv").config();

// Capture server address
const PORT = process.env.PORT || 3000;
const SERVER = process.env.API_BASE_URL || `http://localhost:${PORT}`;

// Set my app to listen
app.listen(PORT, () => {
  console.log(`Server running at ${SERVER}/`);
});
