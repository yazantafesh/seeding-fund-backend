'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require('./src/routers/authRouter');
const router = require('./src/routers/router');
const DATABASE = process.env.DATABASE

app.use(cors());
app.use(express.json());
app.use('/sign', authRouter);
app.use('/', router);

//Here we are connecting to the DB

mongoose
  .connect(DATABASE)
  .then(() => app.listen(PORT, () => console.log(`Server is up on ${PORT}`)))
  .catch((e) => console.error('Connection Error', e.message));
