const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const mailUrl = require("./config.js");
const authApi = require("./config.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    let data = {
        members:[
            {
               email_address: email,
               status: "subscribed",
               merge_fields:{
                FNAME: firstName,
                LNAME: lastName
               }
            }
        ]
    };

    app.post("/failure", function(req, res){
        res.redirect("/");
    })

    const jsonData = JSON.stringify(data);

    const url = mailUrl;

    const options = {
        method: "POST", 
        auth: authApi,
        headers:{
            'Content-Type': 'application/json',
        }
    }

    const request = https.request(url, options, function(response){

        response.on("data", function(data){
            d = JSON.parse(data);
            console.log(d);
            if(d.error_count === 0){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        });
    })

    request.write(jsonData);
    request.end();

})





app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

//API key
//b557a6a2e37a9e5c626ff247c725db53-us18

//audience id
//64715a6a91