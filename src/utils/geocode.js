const request = require("request");

const geocode = (address, callback) => {
  const cityName = address;
  const cityURL = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=5Bpp3eRYDgOh6kJNpRBBqte3Ac3OhRXi&q=${address}`;
  request({ url: cityURL, json: true }, (error, { body }) => {
    //console.log(response.body[0].GeoPosition);
    const data = {
      Latitude: body[0].GeoPosition.Latitude,
      Longitude: body[0].GeoPosition.Longitude,
      City: body[0].EnglishName,
      Zone: body[0].AdministrativeArea.EnglishName,
      Country: body[0].Country.EnglishName,
    };
    callback(undefined, data);
  });
};

module.exports = geocode;