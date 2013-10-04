
/**
 * Module dependencies.
 */

var express = require('express.io');

var controllers = require('./controllers');
var http = require('http');
var connect = require('connect');
var path = require('path');
var crypto = require('crypto');

app = express().http().io();

var SITE_SECRET = 'Why are you so aglify.js ?';
var sessionStore = new connect.session.MemoryStore();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(SITE_SECRET));

app.use(express.session({
      key: 'express.sid',
      store: sessionStore,
      secret: SITE_SECRET
}));

app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', controllers.index);

app.get('/files', require('./controllers/files/form'));
app.post('/files', require('./controllers/files/save'));

app.io.on('connection', function(socket){
    console.log('A socket with sessionID '+socket.handshake.sessionID+' has connected.');
});

app.io.route('message', {post: require('./controllers/chat/post')});
app.io.route('messages', require('./controllers/chat/messages'));

//var server = http.createServer(app);
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
