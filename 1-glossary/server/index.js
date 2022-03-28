require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, "../client/dist")));

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'glossaryDB'
})

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

app.get('/words/all', (req, res) => {
  connection.query(
    'SELECT * FROM glossary',
    function(err, results) {
      //console.log(results);
      res.send(results)
    }
  );
})

app.post('/words/edit', (req, res) => {
  console.log(req.body)
  console.log(req.body.name)
  connection.query(
    `UPDATE glossary SET name='${req.body.nameChangeTo}', definition='${req.body.definitionChangeTo}' WHERE name='${req.body.name}'`,
    function(err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log(results);
      }
    }
  )
})

app.post('/words/delete', (req, res) => {
  console.log(req.body)
  connection.query(
    `DELETE FROM glossary WHERE name = '${req.body.name}'`,
    function(err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log(results);
      }
    }
  )
})

app.post('/words/add', (req, res) => {
  console.log(req.body.newWord.name + ': ' + req.body.newWord.definition);
  connection.query(
    `INSERT INTO glossary (name,definition) VALUES ('${req.body.newWord.name}', '${req.body.newWord.definition}')`,
    function(err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log(results);
      }
    }
  )
})

app.get('/words/search', (req, res) => {
  // console.log(req.query.searchTxt)
  connection.query(
    `SELECT * FROM glossary WHERE name LIKE '%${req.query.searchTxt}%'`,
    function(err, results) {
      console.log(results);
      res.send(results)
    }
  );
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
