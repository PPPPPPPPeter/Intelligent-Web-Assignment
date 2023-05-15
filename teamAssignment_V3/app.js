var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var birdSightRouter = require("./controllers/sightings");
const {ChatModel} = require("./models/chat");
const mongoose = require("mongoose");

var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
const ChatSessions = {};

io.on('connection', (socket) => {
  socket.on('sendMessage', async (dataStr) => {
    const data = JSON.parse(dataStr);
    const {sightId, message, sender} = data;
    await ChatModel.create({
      sight: new mongoose.mongo.ObjectId(sightId),
      message,
      sender
    });
    let messages = await ChatModel.find();
    messages = messages.filter(message => {
      return message.sight.toString() === sightId;
    })
    const sockets = ChatSessions[sightId];
    if (Array.isArray(sockets)) {
      try {

        for (let soc of sockets) {
          io.to(soc.id).emit('updateMessages', JSON.stringify(messages));
        }
      } catch (err) {
        console.log(`Emit update message fail`, err);
      }
    }
  })

  socket.on('joinSession', async (data) => {
    if (!ChatSessions[data]) {
      ChatSessions[data] = [{
        id: socket.id,
        socket
      }];
    } else {
      ChatSessions[data].push({
        id: socket.id,
        socket
      });
    }
    let messages = await ChatModel.find();

    messages = messages.filter(message => {
      return message.sight.toString() === data;
    })
    try {
      socket.emit('updateMessages', JSON.stringify(messages));
    } catch (err) {

    }

  });
  socket.on('disconnect', () => {
    for (let sightId in ChatSessions) {
      const sockets = ChatSessions[sightId];
      for (let soc of sockets) {
        if (soc.id === socket.id) {
          ChatSessions[sightId] = sockets.filter(soc => soc.id !== socket.id)
          return;
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
