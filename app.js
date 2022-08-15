const express = require("express");
const bp = require("body-parser");
const app = express();
const request = require("request");
const client = require("mailchimp-marketing");
const https = require("https");

client.setConfig({
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});





app.use(express.static("public"));
app.use(bp.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  var fname = req.body.fname;
  var email = req.body.email;
  var reminder = req.body.rem;
  var phone = req.body.phone;
  var dates = req.body.dayss;

  console.log(req.body);

    const data = {
      members: [{
        "email_address": email,
        "status": "subscribed",
        "merge_fields" : {
          "FNAME" : fname,
          "PHONE" : phone,
          "REM" : dates
          // "BDAY" : reminder,
        }
      }]
    };
    const url ="https://us12.api.mailchimp.com/3.0/lists/f44f528f46";
    const options = {
      "method": "POST",
      "auth": "faraz:d87af2ad21c5826c6b05c8adb55c84c1-us12"
    }
  const jsonData = JSON.stringify(data);
  const request= https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

  // console.log(req.body);
  res.sendFile(__dirname+"/succ.html");
});

app.listen(process.env.PORT||3000, function(){
  console.log("Server running at port 3000...");
});



// d87af2ad21c5826c6b05c8adb55c84c1-us12      -API key
// f44f528f46     ID
