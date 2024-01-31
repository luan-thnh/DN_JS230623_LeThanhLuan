require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRouter = require('./src/routes');
const { errorHandler } = require('./src/middleware/errorHandler.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

appRouter(app);
app.use(errorHandler);

app.listen(3003, () => console.log('⚡Server running on: http://localhost:3003/api/v1'));
