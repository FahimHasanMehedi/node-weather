const request = require("postman-request");

const forecast = function ({ latitude: lat, longitude: long }, callback) {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=f7ad6246cec9decb2883abe3cf33852f&query=${lat},${long}`;

  request({ url: weatherUrl, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather services", undefined);
      return;
    } else if (res.body.error) {
      callback("Problem getting weather data", undefined);
      return;
    }
    callback(
      undefined,
      `${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature} degrees out. It feels like ${res.body.current.feelslike} degrees out.`
    );
  });
};

module.exports = forecast;
