
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "e47701bfb77ea80d83e4f8fff8664469"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey +"&units=" + unit;
  https.get(url, function(responce){
    console.log(responce.statusCode);


    //Это чтобы получить ответ от сервера, тоесть в данном случае погоду--------------
    responce.on("data", function(data){
      const weatherData = JSON.parse(data);
      //console.log(weatherData);----Это мы получим полный отчет о погоде
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp); //Мы получили только температуру------------
      console.log(weatherDescription);

      res.write("<p>The Weather is currently "+ weatherDescription +"<p>");
      res.write("<h1>The temperature in "+ query +  " is "+ temp +" degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send()
    })
  })
})





app.listen(3000, function(){
  console.log("Server is started on port 3000");
});
