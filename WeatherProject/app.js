const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
    const lat = req.body.lat;
    const lon = req.body.lon;
    const apiKey = "d887663d4225b7dedc4d0aafa435fdd2"
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<h1>The weather is currently " + weatherDescription + "</h1>")
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Farenheit.</h1>");
            res.write("<img src=" + iconUrl + ">")
            res.send();
        })
    });
})




app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});