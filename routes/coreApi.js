/**
 * Created by jaric on 09.08.2016.
 */

var express = require('express');
var router = express.Router();

//router.get('/', function(req, res, next){
//    res.send("123");
//});

router.get('/houses', function(req, res, next){
    var msg = req.url + ", list of houses";
    res.send(msg);
});
router.get('/players', function(req, res, next){
    var msg = req.url + ", list of players";
    res.send(msg);
});
router.get('/farms', function(req, res, next){
    var msg = req.url + ", list of farms";
    res.send(msg);
});

module.exports = router;