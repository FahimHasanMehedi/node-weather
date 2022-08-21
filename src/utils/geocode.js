const axios = require("axios");

const geocode = function (location, callback) {
  const params = {
    auth: "778158806143629619194x70857",
    locate: encodeURIComponent(location),
    json: "1",
  };

  axios.get("https://geocode.xyz", { params }).then(
    (response) => {
      if (response.data.error) {
        callback("Problem getting location data", undefined);
        return;
      }
      console;
      callback(undefined, {
        latitude: response.data.latt,
        longitude: response.data.longt,
        location:
          response.data.standard.city +
          "," +
          response.data.standard.countryname,
      });
    },
    () => {
      callback("Unable to connect", undefined);
    }
  );
};

module.exports = geocode;
