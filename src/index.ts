
import * as express from 'express';
import { database } from './database';
import { fileRouter } from './file/file.controller';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

// init
app.get('/init', (req, res) => {
  res.json({ name: 'i am api and others config' });
});

// options methods
app.get('/option', (req, res) => {
  res.json(database.options);
});

app.put('/option', (req, res) => {
  Object.assign(database.options, req.body);
  res.send('ok!');
});

// resources
app.get('/resource', (req, res) => {
  res.json(database.resources);
});

app.post('/resource', (req, res) => {
  database.resources.push(req.body);
  res.send('ok!');
});

// file
app.use('/file', fileRouter);

app.listen(3000, () => console.log('FoxFinder app listening on port 3000!'));

import * as http from 'http';
