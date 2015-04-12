var fs = require('fs');
var lwip = require('lwip');

var thumbnail = function(thumbnailWidth, dir) {
    dir = /\/$/.test(dir) ? dir : (dir + '/');
    var exist = false,
        directory = dir + 'w' + thumbnailWidth + '/';

    if (fs.existsSync(directory)) {
        exist = true;
    } else {
        fs.mkdirSync(directory);
    }

    if (exist) {
        return false;
    }

    fs.readdir(dir, function(err, ts) {
        if (!exist) {
            console.log("create " + thumbnailWidth + " thumbnail image for path: 【" + directory + "】");
            ts.forEach(function(t) {
                if (/\.jpg/i.test(t)) {
                    lwip.open(dir + t, function(err, image) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        var imageWidth = image.width(),
                            ratio = thumbnailWidth / imageWidth,
                            simg = directory + t;

                        if (imageWidth > thumbnailWidth) {
                            image.scale(ratio, function(err, image) {
                                image.writeFile(simg, function(err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            });
                        } else {
                            image.writeFile(simg, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports = thumbnail;
