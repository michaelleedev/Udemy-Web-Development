const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello, world!</h1>");
})

app.get("/contact", function(req, res){
    res.send("Contact me at: michael@gmail.com");
})

app.get("/about", function(req, res){
    res.send("I'm Michael");
});

app.get("/hobbies", function(req, res){
    res.send("<ul><li>Gaming</ul></li><ul><li>Snowboarding</ul></li><ul><li>Coffee</ul></li>")
})

app.listen(3000, function() {
    console.log("server started on port 3000");
});