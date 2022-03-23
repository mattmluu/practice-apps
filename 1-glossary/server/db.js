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

console.log('hi')
mongoose.connect('mongodb://localhost:27017/glossary', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected')
  }
})

//i: callback
//o: pass in an array of word objects into a callback
const getWords = function(cb) {
  Word.find((err, words) => {
    //words to be set to array of objects from database
    //if err pass error obj onto the callback
    //pass the words onto the callback
    if (err) {
      cb(err)
    } else {
      cb(null, words)
    }

  })
}
getWords(console.log)

// create a save function to add stuff to DB
const save = function(term) {
  const termToSave = new Word({name: term.name, definition: term.definition})
  termToSave.save();
}

//export the save function
//module.exports.seed = seed;
module.exports.save = save;





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