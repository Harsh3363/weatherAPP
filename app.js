const express = require("express");
const https = require("https"); //don't need to npm install as it is already bundeled with node module.
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){ // if we try to make get request from "/" from this route.
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){ // if we try to make get request from "/" from this route.

  const url = "https://api.openweathermap.org/data/2.5/find?q=" + req.body.cityName + "&appid=3b15b0ee653b06e600076f39a21bc8a1&units=metric"

https.get(url,function(response){ //just passing the url and loging the response statuscode
  console.log(response.statusCode);

response.on("data",function(data){ //res.on('data', ...) is how you register a listener for the data event and the data event is the primary way that you receive data from the incoming stream. This listener will be called one or more times with chunks of arriving data.
  const weatherData = JSON.parse(data) //initially data will be in hexadecimal we have to puy JSON to make it readable.
  const temp = (weatherData.list[0].main.temp)
  const icon = "http://openweathermap.org/img/wn/" +weatherData.list[0].weather[0].icon + "@2x.png"
  res.write("<p>the temprature description is " + weatherData.list[0].weather[0].description +" </p>");
  res.write("<h1>the temprature in " + req.body.cityName + " is " + weatherData.list[0].main.temp + " degree c </h1>");
  res.write("<img src=" + icon + ">");
  res.send();
  // const temp = weatherData.main.temp;
})
})

  // res.send("server is running on port 3000") //can't use .send method more then once.
});



app.listen(3000,function(){
  console.log("server is up and running on port 3000.");
})
