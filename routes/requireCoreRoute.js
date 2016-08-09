/**
 * Created by jaric on 09.08.2016.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

//router.get('/', function(req, res) {
//    var ans = {};
//    res.send(ans);
//});

router.get('/requireCore.js', function(req, res) {
    var pathToRequireCore = path.join(__dirname, '..', 'views', 'requireCore.js.html');
    console.log("asking modified requireCore.js", pathToRequireCore, req.app.apiMapKey);
    res.render(pathToRequireCore, {specialWords: "wazzzzzzup", apiMapKey: req.app.apiMapKey});
});

module.exports = router;