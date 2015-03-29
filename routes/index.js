var express = require('express');
var router = express.Router();

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
        title: 'list of bei tie'
    };

    res.render('index', data);
});

router.get('/epoch', function(req, res, next) {
    var data = {
        title: 'epoch of bei tie'
    };

    res.render('epoch', data);
});

router.get('/calligraphist', function(req, res, next) {
    var data = {
        title: 'calligraphist of bei tie'
    };

    res.render('calligraphist', data);
});

router.get('/paper', function(req, res, next) {
    var data = {
        title: 'paper of bei tie'
    };

    res.render('paper', data);
});

router.get('/search', function(req, res, next) {
    var data = {
        title: 'search of bei tie'
    };

    res.render('search', data);
});

module.exports = router;
