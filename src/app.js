const path = require('path');

const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath);

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.send('Hi, =)!');
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Raining',
    location: 'Recife',
    temperature: 25.5,
  });
});

app.listen(3000, () => {
  console.log('Server Running!');
});
