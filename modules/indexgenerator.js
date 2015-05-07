var fs = require('fs');
var path = require('path');
var beitie = 'public/beitie';

var dirs = fs.readdirSync(beitie);
var authors = [], papers = [];
dirs.forEach(function(author) {
    var pdir = path.join(beitie, author);
    var pstats = fs.statSync(pdir);
    if (!pstats.isDirectory()) {
        // console.log(pdir, ' is not a directory');
        return false;
    } else {
        if (/[\u4e00-\u9fa5]/.test(author)) {
            authors.push(author);
        }
    }

    var subdirs = fs.readdirSync(pdir);
    subdirs.forEach(function(paper) {
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
            papers.push({size: images.length, author: author, paper: paper, cover: images[0]});
        }
    });
});

module.exports = {authors: authors, papers: papers};
