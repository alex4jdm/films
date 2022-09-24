import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index.js';

const app = express();
app.use(bodyParser.json()); 
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})