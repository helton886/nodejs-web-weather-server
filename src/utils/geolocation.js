const request = require('request');
const acessToken = require('./acesstoken.js');

const geoLocation = (address, callback) => {
  const url = acessToken.mapbox(address);
  request({ url, json: true }, (error, { body }) => {
    // error handler for low-lvl errors
    if (error) {
      callback({ error: 'Unable to connect to location services!' }, undefined);
      // error handler for wrong matching
    } else if (body.features.length === 0) {
      callback({ error: 'Unable to find location!' }, undefined);
    } else {
      // everything went well.
      const feature = body.features[0];
      callback(undefined, {
        latitude: feature.center[0],
        longitude: feature.center[1],
        location: feature.place_name,
      });
    }
  });
};

module.exports = geoLocation;
