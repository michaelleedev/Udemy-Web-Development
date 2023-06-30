//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://michael:Yuu7gL7ueol5eUNi@cluster0.2sm3ftb.mongodb.net/todolistDB");

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "item1",
});

const item2 = new Item({
  name: "item2",
});

const item3 = new Item({
  name: "item3",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String, 
    items: [itemsSchema]
  }

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({})
    .then((result) => {
      if(result.length === 0) {
        Item.insertMany(defaultItems)
        .then(()=>{
          console.log("Successfully added many");
        })
        .catch((err)=> {
          console.log(err);
        });
        res.redirect("/");
      }
      else{
        res.render("list", {listTitle: "Today", newListItems: result});
      }
      
    })
    .catch((err) => {
      console.log(err);
    })

const day = date.getDate();
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else{
    List.findOne({name: listName})
    .then((result)=>{
      result.items.push(item);
      result.save();
      res.redirect("/" + listName);
    })
    .catch((err) =>{
      console.log(err);
    });
  }

});

app.post("/delete", (req, res) =>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.deleteOne({_id: checkedItemId})
    .then(()=>{
      res.redirect("/");
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}})
    .then((foundList) =>{
      res.redirect("/" + listName);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  
})

app.get("/:name", (req, res) =>{
  const customListName = _.capitalize(req.params.name);

  List.findOne({name: customListName})
  .then((result) => {
    if(!result){
      //console.log("Doesn't Exist");
      const list = new List({
        name: customListName,
        items: defaultItems,
      });

      list.save();
      // very first list document gets added 4 times due to some reason. Possibly because of time it takes
      // to create a new collection. Needed to wait a bit before redirecting to check inside the collection.
      setTimeout(()=>{
        res.redirect("/"+customListName);
      }, 100); 
    }
    else{
      //console.log("Exists");
      res.render("list", {listTitle: result.name, newListItems: result.items});
    }
  })
  .catch((err) => {
    console.log(err);
  })
  
  
})

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
