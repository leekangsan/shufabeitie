var express = require('express');
var path = require('path');
var faties = require('../config/index');
var router = express.Router();
var jsonarrayutils = require('../modules/jsonarrayutils');

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var random = [], size = faties.length - 1;
    for (var i = 0; i <= size && i < 12; i++) {
        var pos = Math.round(Math.random() * size);
        random.push(faties[pos]);
    }
    var data = {
        title: '书法碑帖',
        faties: random
    };

    res.render('index', data);
});

router.get('/more', function(req, res, next) {
    var random = [], size = faties.length - 1;
    for (var i = 0; i <= size && i < 3; i++) {
        var pos = Math.round(Math.random() * size);
        random.push(faties[pos]);
    }

    res.json(random);
});

router.get('/page', function(req, res, next) {
    req.session.more = (req.session.more || 0) + 1;
    var more = [], slice = faties.slice(req.session.more * 3), size = slice.length - 1;
    if (size < 3) {
        req.session.more = 0;
    }
    for (var i = 0; i <= size && i < 3; i++) {
        more.push(slice[i]);
    }

    res.json(more);
});

router.get('/upload', function(req, res, next) {
    var data = {
        title: '书法碑帖/访客上传'
    };

    res.render('upload', data);
});

router.post('/upload', function(req, res, next) {
    var file = './uploads/data.json';
    var json = jsonarrayutils.read(file);
    req.body.datetime = new Date().getTime();
    json.unshift(req.body);
    jsonarrayutils.write(file, json);

    res.redirect('/');
});

module.exports = router;
