const request = require("request");

const  forecast = (lat,lon,callback) => {
    // const getDetail = getCityCoord(city, (data) => {
    // const lat = data.latitude;
    // const lon = data.longitude;
   const url = `http://api.weatherstack.com/current?access_key=1142f6c6f580c94751eecfb3ed0c2ab8&query=${lat},${lon}`;
  // //const API = '1142f6c6f580c94751eecfb3ed0c2ab8';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect");
    } else if (body.error) {
      callback("unable to find location");
    } else {
      const region = body.location.name;
      const country = body.location.country;
      const temp = body.current.temperature;
      const ftemp = body.current.feelslike;
      const desc = body.current.weather_descriptions[0];

        callback(undefined, `${region}-${country} - It is current ${temp} degrees out.  It feels like ${ftemp} degrees out and its ${desc}`)

    }
  });
// });
}

module.exports = forecast;