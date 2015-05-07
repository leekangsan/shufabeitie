var fs = require('fs');
var path = require('path');
var beitie = 'public/beitie';

var authors = fs.readdirSync(beitie);
var json = [];
authors.forEach(function(author) {
    var pdir = path.join(beitie, author);
    var pstats = fs.statSync(pdir);
    if (!pstats.isDirectory()) {
        // console.log(pdir, ' is not a directory');
        return false;
    }

    var papers = fs.readdirSync(pdir);
    papers.forEach(function(paper) {
        var dir = path.join(beitie, author, paper);
        var stats = fs.statSync(dir);
        if (!stats.isDirectory()) {
            // console.log(dir, ' is not a directory');
            return false;
        }

        var all = fs.readdirSync(dir);
        var images = all.filter(function(t) {
            return /\.jpg/i.test(t);
        });

        if (images.length) {
            json.push({size: images.length, author: author, paper: paper, cover: images[0]});
        }
    });
});

module.exports = json;
