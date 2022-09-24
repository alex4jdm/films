import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json()); 
app.use(express.urlencoded({
  extended: true
}));

app.post('/user', (req, res) => {
  
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})