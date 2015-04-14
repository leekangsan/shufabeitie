var fs = require('fs');
var path = require('path');
var PDFDocument = require('pdfkit');
var sizeOf = require('image-size');
var args = process.argv.slice(2);

var generator = function(author) {
    if (!fs.existsSync(author)) {
        console.log(author, ' not exists.');
        return false;
    }
    var files = fs.readdirSync(author);

    files.forEach(function(paper) {
        var fileName = path.join(author, paper);
        var stats = fs.statSync(fileName);
        if (!stats.isDirectory()) {
            return false;
        }

        var pdfname = path.join(author, paper + '.pdf');
        if (fs.existsSync(pdfname)) {
            // console.log(pdfname, ' 已经存在');
            return false;
        }

        var w1000 = path.join(author, paper, 'w1000');
        if (!fs.existsSync(w1000)) {
            console.log(w1000, ' 目录不存在');
            return false;
        }

        var all = fs.readdirSync(w1000);
        var doc = null;
        var images = all.filter(function(t) {
            return /\.jpg/i.test(t);
        });
        for (var i = 0; i < images.length; i++) {
            var t = images[i],
                imgpath = path.join(author, paper, 'w1000', t);

            try {
                var dimensions = sizeOf(imgpath),
                imageWidth = dimensions.width,
                imageHeight = dimensions.height;
                console.log(imgpath, dimensions);
            } catch (e) {
                imageWidth = 1000;
                imageHeight = 1000;
                console.error(e);
            }

            if (imageWidth < 1000) {
                imageHeight = 1000 / imageWidth * imageHeight;
                imageWidth = 1000;
            }

            if (i === 0) {
                doc = new PDFDocument({
                    size: [imageWidth, imageHeight]
                });
                doc.pipe(fs.createWriteStream(pdfname));
                doc.image(imgpath, 0, 0, {
                    width: imageWidth
                });
            } else {
                doc.addPage({
                    size: [imageWidth, imageHeight]
                }).image(imgpath, 0, 0, {
                    width: imageWidth
                });
            }
        }

        if (doc) {
            doc.end();
        }
    });

}

args.forEach(function(path) {
    console.log("begin generate pdf for path: 【" + path + "】");
    generator(path);
});

// for author in $(ls); do node ~/shufabeitie/modules/pdfgenerator.js $author; done
