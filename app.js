const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs')

const prompts = require('./prompts.js');

const app = express();
const port = process.env.PORT || 5500;

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/',
  }),
);

app.use(express.static('dist'));
app.use(express.static('public'));

const piecesWithFilenames = {};
prompts.forEach((p, i) => {
  const key = `day${i+1}`;
  piecesWithFilenames[key] = {
    name: p,
    file: key
  };
})

app.get('/:route', (req, res) => {
  res.render('piece', {
    name: piecesWithFilenames[req.params.route].name,
    scriptName: `${req.params.route}.js`
  });
});

app.get('/', (_req, res) => {
  res.render('index', {
    pieces: Object.values(piecesWithFilenames)
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
