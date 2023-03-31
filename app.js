const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
       {
        email_address:email,
        status:"subscribed",
        merege_fields: {
         FNAME: firstName,
         LNAME: lastName
        }

       }

        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/dcb0563b40";

    const options = {
        method:"POST",
        auth: "Ronak_sen580:ab3c00ef108bb178f65f23fc91d517c4-us21"
    }


    const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })


    })

    request.write(jsonData);
    request.end();

});

app.listen(3000,function() {
    console.log("Server is running on port 3000");
})

// API key
// ab3c00ef108bb178f65f23fc91d517c4-us21

// list id
// dcb0563b40