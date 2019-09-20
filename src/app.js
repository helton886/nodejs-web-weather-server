const path = require('path');
const hbs = require('hbs');
const geoLocation = require('./utils/geolocation');
const forecast = require('./utils/forecast');
const express = require('express');

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirectoryPath));

// routes
app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Helton' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Helton', helpText: 'Help Text.' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Helton' });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address!' });
  }

  geoLocation(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404-help', {
    title: '404',
    name: 'Helton',
    helpText: 'Help page not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found.',
    name: 'Helton',
  });
});

app.listen(3000, () => {
  console.log('Server Running!');
});
