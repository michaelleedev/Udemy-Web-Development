const mongoose = require("mongoose");
const {mongoDB} = require('./config.js');
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect(mongoDB);
}

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String, 
    required: [true, "Please check your data entry, no name specified!"]
  }, 
  rating: {
    type: Number, 
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7, 
  review: "Great!"
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = new mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great Fruit",
});

//pineapple.save();

const watermellon = new Fruit({
  name: "Watermellon",
  score: 8,
  review: "Great Mellon",
})

const person = new Person({
  name: "Amy",
  age: 37,
  favouriteFruit: pineapple,
});

//person.save();

watermellon.save();

// Person.updateOne({name: "John"}, {favouriteFruit: watermellon})
//   .then(()=>{
//     console.log("Successfully Updated John's Favorite Fruit");
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 10, 
//   review: "The best fruit!"
// });

// const orange = new Fruit ({
//   name: "Orange",
//   rating: 4, 
//   review: "Too sour for me"
// });

// const banana = new Fruit ({
//   name: "Banana",
//   rating: 3, 
//   review: "Weird texture"
// });

//Fruit.insertMany([kiwi, orange, banana]);
// Fruit.find().then((err,fruits) => {
//   if(err){
//       console.log(err);
//   } else{
//     mongoose.connection.close();
//     console.log(fruits);
//   }

// });

// Fruit.updateOne({_id: "643b203e4f3abda3515f5c4d"}, {name: "Peach"})
//   .then(()=> {
//     console.log("Successfully Updated");
//   })
//   .catch((err)=> {
//     console.log(err);
//   });

// Fruit.deleteOne({name: "Peach"})
//   .then(()=> {
//     console.log("Successfully Deleted");
//   })
//   .catch((err)=> {
//     console.log(err);
//   });

// Fruit.deleteMany({name: "Pineapple"})
//   .then(()=> {
//     console.log("Successfully Deleted");
//   })
//   .catch((err)=> {
//     console.log(err);
//   });

// Person.deleteOne({_id: '643b2a6c6a7fa1c9a344af50'})
//   .then(()=> {
//     console.log("Successfully Deleted Many");
//   })
//   .catch((err)=> {
//     console.log(err);
//   });