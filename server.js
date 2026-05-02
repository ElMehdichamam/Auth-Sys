require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
const userRouter = require('./router/routers');
const connectDB = require('./config/db');



app.use('/api/user',userRouter);


connectDB().then(() => {
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
});