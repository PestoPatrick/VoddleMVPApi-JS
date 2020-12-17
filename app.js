const express = require('express');
const app = express();

const env = require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videosRouter = require('./routes/videos');
const authRouter = require ('./routes/auth');
const profilesRouter = require('./routes/profiles')



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/auth', authRouter);
app.use('/profiles', profilesRouter);

module.exports = app;
