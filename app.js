const { query } = require("express");
const express =require("express");
const https = require("https");
const app=express();
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
  
response.sendFile(__dirname +"/index.html")
    
    })
app.post("/",function(request,response){


    const query=request.body.cityName;
    const apiKey="de784a6063398a59ab9c01d7f438e201";
    const units="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiKey+"&units="+ units;
      https.get(url,function(res){
          console.log(res.statusCode);
          res.on("data",function(data){
              const weatherData=JSON.parse(data);
              const temp=weatherData.main.temp;
              const des=weatherData.weather[0].description;
              const icon=weatherData.weather[0].icon;
              const imageURL ="http://openweathermap.org/img/wn/"+ icon+"@2x.png";
            response.write("<p> the weather is currently "+ des +"</p>")
            
              response.write("<h1>the temprature in"+ query +" is  " +temp+" degree celcies</h1>")
              response.write("<img src="+ imageURL +">");
        response.send();
        
          })
      })

})

app.listen(3000,function(){
    console.log("server started on port 3000");});