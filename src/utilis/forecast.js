const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=abe8e6e732a54ee88342410feca1b66f&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " it is currently " +
          body.current.temperature +
          " degrees out. There is a " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
