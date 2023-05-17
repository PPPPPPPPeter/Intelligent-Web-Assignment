// Import required modules
/**
 * Module: createError
 * Description: Create HTTP error objects.
 */
var createError = require('http-errors');

/**
 * Module: express
 * Description: Express.js framework for creating web applications.
 */
var express = require('express');

/**
 * Module: path
 * Description: Provides utilities for working with file and directory paths.
 */
var path = require('path');

/**
 * Module: cookieParser
 * Description: Parse Cookie header and populate req.cookies.
 */
var cookieParser = require('cookie-parser');

/**
 * Module: logger
 * Description: HTTP request logger middleware for node.js.
 */
var logger = require('morgan');

/**
 * Router: indexRouter
 * Description: Handles routes for the main page.
 */
var indexRouter = require('./controllers/index');

/**
 * Router: usersRouter
 * Description: Handles routes for user-related actions.
 */
var usersRouter = require('./controllers/users');

/**
 * Router: birdSightRouter
 * Description: Handles routes for bird sighting-related actions.
 */
var birdSightRouter = require("./controllers/sightings");

/**
 * Model: ChatModel
 * Description: Model representing a chat in the database.
 */
const {ChatModel} = require("./models/chat");

/**
 * Module: mongoose
 * Description: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
 */
const mongoose = require("mongoose");

// Create the Express app
var app = express();

// Create an HTTP server using the Express app
const server = require('http').createServer(app);

// Set up Socket.IO for real-time communication
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up middleware
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/sights", birdSightRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000;

/**
 * Object: ChatSessions
 * Description: Stores active chat sessions.
 */
const ChatSessions = {};

// Handle socket.io connections
io.on('connection', (socket) => {
  // Handle sending of a chat message
  socket.on('sendMessage', async (dataStr) => {
    // More comments here...
  });

  // Handle joining a chat session
  socket.on('joinSession', async (data) => {
    // More comments here...
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // More comments here...
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
