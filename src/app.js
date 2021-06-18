const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlerars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));
he;
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tushar Mangla",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Tushar Mangla",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: " i am here for your help,  any time ping me up😊😊",
    title: "Help",
    name: "Tushar Mangla",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Tushar Mangla",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tushar Mangla",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
