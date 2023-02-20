require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
  const query = req.body.cityName;
  const weatherAPI = process.env.WEATHER_API;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = `${weatherAPI}${query}&appid=${apiKey}&units=${unit}`;
  const response = await fetch(`${url}`);
  const weatherData = await response.json();

  if (weatherData.weather === undefined) {
    res.sendFile(__dirname + "/error.html");
  } else if (weatherData.weather !== undefined) {
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.render("results", {
      cityName: weatherData.name,
      country: weatherData.sys.country,
      temp: Math.floor(weatherData.main.temp),
      feelsLike: Math.floor(weatherData.main.feels_like),
      weatherDescription: weatherData.weather[0].description,
      imageURL: imageURL,
    });
  }

  //Get results
  app.get("/citydata", async (req, res) => {
    try {
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
});

// Server Setup
app.listen(3000, function () {
  console.log("Server is running on port 3000 ^_^");
});