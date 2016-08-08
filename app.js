var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(cookieParser());
app.use(session({
    secret: 'verySecretString',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false, path: '/c3' }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var noop = function(){};
function readJSONFile(filepath, callback){
    callback = callback || noop;
    fs.readFile(filepath, {encoding: "utf8"}, function(err, filedata){
        if (err) {
            console.log("read error:", err);
            callback(err, null);
        } else {
            // some hack with first symbol =/
            filedata = filedata.replace(/^\uFEFF/, '');
            // parsing file to JSON object
            var jsondata = JSON.parse(filedata);

            callback(null, jsondata);
        }
    });
}
function readMapKey(){
    var filePath = path.join(__dirname, 'apiMapKey.txt');
    readJSONFile(filePath, function(err, data){
        app.apiMapKey = data.apiMapKey;
    });
}
readMapKey();

var players = {};
function regAuth(ip){
    var player = {
        name: generatePlayerName()
    };
    players[ip] = player;
    return player;
}
function checkAuth(ip){
    return players[ip] !== undefined;
}
function getPlayer(ip){
    return players[ip];
}

var cntr = 0;
var generatePlayerName = function(){
    var ans = "Player" + cntr.toString();
    cntr++;
    return ans;
};
app.use('/c3', function(req, res, next) {
//    req.session.name = generatePlayerName();
    var ip = req._remoteAddress;
    var player;
    if (checkAuth(ip)) {
        player = getPlayer(ip);
    } else {
        player = regAuth(ip);
        res.cookie('options', JSON.stringify(player));
    }
    console.log(req.session.id, ip);
    res.render('c3.html', {apiMapKey: app.apiMapKey});
});
app.use('/players', function(req,res,next){
    res.send(players);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
