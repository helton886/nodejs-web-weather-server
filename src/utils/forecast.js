const acessToken = require('./acesstoken.js');
const request = require('request');

const foreCast = (latitude, longitude, callback) => {
  const url = acessToken.darksky(latitude, longitude);
  request({ url, json: true }, (error, { body }) => {
    // error handler for low-lvl errors
    // prettier-ignore
    if (error) {
      callback({error: 'Unable to connect to location forecast service!'}, undefined);
    } else if (body.error) {
      callback({error: 'Unable to find the location! Try another one'}, undefined);
    } else {
      const currently = body.currently;
      callback(undefined, `Atualmente está ${currently.summary} com a temperatura de ${currently.temperature} e há ${currently.precipProbability} chance de chuva.`);
    }
  });
};

module.exports = foreCast;
