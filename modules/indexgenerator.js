var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);
var beitie = args[0];

if (!fs.existsSync(beitie)) {
    console.log(beitie, ' is not exists.');
    console.log('Usage: node modules/indexgenerator.js public/beitie/');
    return false;
}

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
            json.push({size: images.length, author: author, name: paper, cover: images[0], dir: path.join('beitie', author, paper)});
        } else {
            // console.log(dir, ' has no jpg images.');
        }
    });
});

var indexes = JSON.stringify(json);
// console.log(indexes);
var indexfile = path.join(beitie, '..', '..', 'config', 'index.json');

fs.open(indexfile, 'w+', function(err, fd) {
    var buf = new Buffer(indexes);
    fs.writeSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
});

console.log(json.length);
