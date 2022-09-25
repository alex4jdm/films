import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routerV1 from './src/v1/routes/routes.mjs';
import multer from 'multer';

dotenv.config();

const app = express();

const corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); 
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('common'));

const upload = multer();
app.use(upload.single('movies')); 
app.use(express.static('public'));

app.use('/api/v1', routerV1);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});