require("dotenv").config();
const db = require('./db.js');
const express = require("express");
const path = require("path");
// const router = express.Router({ mergeParams: true });
const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.json())
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/words/edit', (req, res) => {
  console.log(req.body)
  db.edit({name: req.body.name, definition: req.body.definition}, {name: req.body.nameToChange, definition: req.body.definitionChangeTo}, (err, editted) => {
    if (err) {
      res.send(err)
    } else {
      res.send(editted)
    }
  })
})

app.post('/words/delete', (req, res) => {
  console.log(req.body)
  db.deleteWord(req.body, (err, deleted) => {
    if (err) {
      res.send(err)
    } else {
      res.send(deleted)
    }
  })
})

app.post('/words/add', (req, res) => {
  console.log(req.body.newWord.name + ': ' + req.body.newWord.definition);
  db.save(req.body.newWord);
})

app.get('/words/search', (req, res) => {
  db.getSearched(req.query.searchTxt, (err, words) => {
    if (err) {
      res.send(err)
    } else {
      res.send(words)
    }
  })
})


app.get('/words/all', (req, res) => {
  db.getWords((err, words) => {
    if (err) {
      res.send(err);
    } else {
      res.send(words);
    }
  })
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
