var express = require('express');
var path = require('path');
var router = express.Router();
var jsonarrayutils = require('../modules/jsonarrayutils');
var faties = require('../modules/indexgenerator');

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var random = [], size = faties.papers.length - 1;
    for (var i = 0; i <= size && i < 60; i++) {
        var pos = Math.round(Math.random() * size);
        random.push(faties.papers[pos]);
    }
    var data = {
        title: '书法碑帖',
        faties: random
    };

    if (req.xhr || /json/.test(req.get('Accept'))) {
        // xhr
        res.json(random);
    } else {
        res.render('index', data);
    }
});

router.get('/more', function(req, res, next) {
    var random = [], size = faties.papers.length - 1;
    for (var i = 0; i <= size && i < 3; i++) {
        var pos = Math.round(Math.random() * size);
        random.push(faties.papers[pos]);
    }

    res.json(random);
});

router.get('/page', function(req, res, next) {
    req.session.more = (req.session.more || 0) + 1;
    var more = [], slice = faties.papers.slice(req.session.more * 3), size = slice.length - 1;
    if (size < 3) {
        req.session.more = 0;
    }
    for (var i = 0; i <= size && i < 3; i++) {
        more.push(slice[i]);
    }

    res.json(more);
});

module.exports = router;
