require("dotenv").config();
const db = require('./db.js');
const express = require("express");
const path = require("path");
// const router = express.Router({ mergeParams: true });
const app = express();


// Serves up all static and generated assets in ../client/dist.
app.use(express.json())
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.post('/words/edit', (req, res) => {
  console.log(req.body)
  res.send()
})
app.post('/words/delete', (req, res) => {
  console.log(req.body)
  res.send()
})

app.post('/words/add', (req, res) => {
  //req.body = word object
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

  // res.send(searchResult)
  //res.send(req.body)
  // res.send(req.body)
  //console.log(req.query.searchTxt) // <----- this is what we want
  //res.send(db.getSearched(req.query.searchTxt))
  //res.send(req.query)
  // console.log(db.getSearched(req.body.searchTxt))
  // res.send(db.getSearched(req.body.searchTxt))
})


app.get('/words/all', (req, res) => {
  // console.log('THIS IS A GET REQUEST')
  // res.send('THIS IS A GET REQUEST')

  //get stuff from the glossary database
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
