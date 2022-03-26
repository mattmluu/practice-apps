const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

const wordSchema = new mongoose.Schema({
  name: String,
  definition: String
})
const Word = mongoose.model('Word', wordSchema);

mongoose.connect('mongodb://localhost:27017/glossary', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected')
  }
})

const edit = (conditions, update, cb) => {
  Word.findOneAndUpdate(conditions, update, (err, edits) => {
    if (err) {
      cb(err)
    } else {
      cb(edits)
    }
  })
}

const deleteWord = (conditions, cb) => {
  console.log(conditions)
  Word.findOneAndDelete(conditions, (err, deleted) => {
    if (err) {
      cb(err)
    } else {
      cb(null, deleted)
    }
  })
}

const getSearched = (searchTxt, cb) => {
  Word.find({ name: /searchTxt/i }, (err, searched) => {
    if (err) {
      cb(err)
    } else {
      cb(null, searched)
    }
  });
}

const getWords = function(cb) {
  Word.find((err, words) => {
    if (err) {
      cb(err)
    } else {
      cb(null, words)
    }
  })
}

const save = function(term) {
  const termToSave = new Word({name: term.name, definition: term.definition})
  termToSave.save();
}

module.exports.deleteWord = deleteWord;
module.exports.edit = edit;
module.exports.getSearched = getSearched;
module.exports.getWords = getWords;
module.exports.save = save;
module.exports.Word = Word;


// main().catch(err => console.log(err))
// //mongoose.connect('mongodb://localhost:3000/glossary')

// //seed stuff into DB
// async function main () {
//   const wordSchema = new mongoose.Schema({
//     name: String,
//     definition: String
//   })
//   const Word = mongoose.model('Word', wordSchema);
//   await mongoose.connect('mongodb://localhost:3000/glossary')
//   const suspect = new Word({name: 'suspect', definition: 'to doubt or mistrust'});
//   const absolute = new Word({name: 'absolute', definition: 'free from imperfection; pure; complete; perfect'});
//   const dynamic = new Word({name: 'dynamic', definition: 'Digital Technology. (of data storage, processing, or programming) affected by the passage of time or the presence or absence of power:'});
//   suspect.save();
//   absolute.save();
//   dynamic.save();
// }