import * as dotenv from 'dotenv';
import router from './router';
import fileUpload from 'express-fileupload';
const cors = require('cors');

dotenv.config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(process.env.IMAGES_PATH));
//app.use(express.bodyParser());
// get rid of X-Powered-By
app.disable('x-powered-by');

// CORS
app.use(cors({
  origin: '*'
}));


// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use((req,res,next)=>{
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

router(app);

export default app;