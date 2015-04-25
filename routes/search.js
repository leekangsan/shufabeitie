var express = require('express');
var path = require('path');
var faties = require('../config/index');
var router = express.Router();

router.get('/', function(req, res, next) {
    var matched = [];
    var data = {
        title: '书法碑帖/搜索',
        faties: matched
    };

    res.render('search', data);
});

router.post('/', function(req, res, next) {
    var matched = [], size = faties.length - 1;
    var keywords = req.body.keywords;
    var i = 0;
    for (; i <= size && matched.length < 12; i++) {
        var fatie = faties[i];
        if (new RegExp(keywords, 'i').test(fatie.dir)) {
            matched.push(faties[i]);
        }
    }
    req.session.search = {index: i, keywords: keywords};
    var data = {
        title: path.join('书法碑帖', '搜索结果', keywords),
        faties: matched
    };

    res.render('search', data);
});

router.get('/more', function(req, res, next) {
    var more = [], size = faties.length - 1;
    console.dir(req.session.search.index);
    var i = req.session.search.index + 1;
    var keywords = req.session.search.keywords;
    for (; i <= size && more.length < 3; i++) {
        var fatie = faties[i];
        if (new RegExp(keywords, 'i').test(fatie.dir)) {
            more.push(faties[i]);
        }
    }
    req.session.search.index = i;

    res.json(more);
});

module.exports = router;

