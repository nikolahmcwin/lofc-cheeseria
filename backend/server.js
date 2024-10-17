/**
 * Basic back end server for LoFC Cheeseria POC.
 *
 * @author Nikolah McWin
 * October 2024
 */

// Import my node app
const app = require("./app.js");

// Server constants
const PORT = 3000;
const SERVER = `http://localhost:${PORT}`;

// Set my app to listen
app.listen(PORT, () => {
  console.log(`Server running at ${SERVER}/`);
});
