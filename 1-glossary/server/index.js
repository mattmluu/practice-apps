require("dotenv").config();
const db = require('./db.js');
const express = require("express");
const path = require("path");

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */
app.get('/words/all', (req, res) => {
  // console.log('THIS IS A GET REQUEST')
  // res.send('THIS IS A GET REQUEST')

  //get stuff from the glossary database

})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
