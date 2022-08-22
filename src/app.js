const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// List of all paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials/");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Fahim Hasan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Fahim Hasan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Fahim Hasan",
    message: "I am here to help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help article not found",
    title: "404 ERROR",
    name: "Fahim Hasan",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "Page not found",
    title: "404 ERROR",
    name: "Fahim Hasan",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
