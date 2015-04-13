var fs = require('fs');
var path = require('path');
var lwip = require('lwip');

var thumbnail = function(thumbnailWidth, dir) {
    var exist = false,
        directory = path.join(dir, 'w' + thumbnailWidth);

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
                    lwip.open(path.join(dir, t), function(err, image) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        var imageWidth = image.width(),
                            ratio = thumbnailWidth / imageWidth,
                            simg = path.join(directory, t);

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
