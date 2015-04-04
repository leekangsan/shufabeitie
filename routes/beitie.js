var fs = require('fs');
var date = require('datejs');
var lwip = require('lwip');
var im = require('imagemagick');
var express = require('express');
var router = express.Router();

// a middleware with no mount path, gets executed for every request to the router
router.use(function(req, res, next) {
    console.log('Time:', new Date().toString("yyyy-MM-dd HH:mm:ss"));
    next();
});

// a middleware sub-stack shows request info for any type of HTTP request
router.use('/:action', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function(req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// remove blank space from filename and directory name.
router.get('/rename', function(req, res, next) {
    //  孙保造像记
    var reg = /[\s\t\n]+/g, chineseChars = /[【《〈)（\[—·，+\]）(〉》】]+/g,
        walk = function(path) {
            var files = fs.readdirSync(path);
            files.forEach(function(item) {
                var oldName = path + '/' + item,
                    stats = fs.statSync(oldName);

                if (stats.isDirectory()) {
                    if (reg.test(item) || chineseChars.test(item)) {
                        var newName = path + '/' + item.replace(reg, '_').replace(chineseChars, '');
                        fs.rename(oldName, newName, function(err) {
                            if (!err) {
                                console.log(oldName + ': folder renamed successfully!');
                                walk(newName);
                            }
                        });
                    } else {
                        walk(oldName);
                    }
                } else {
                    if (reg.test(item) || chineseChars.test(item)) {
                        var newName = path + '/' + item.replace(reg, '_').replace(chineseChars, '');
                        fs.rename(oldName, newName, function(err) {
                            if (!err) {
                                console.log(oldName + ': file renamed successfully!');
                            } else {
                                console.log(err);
                            }
                        });
                    }
                }
            });
        };

    walk('public/beitie');
    res.send('rename finished!');
});

// define the home page route
router.get('/', function(req, res) {
    var source = '/beitie/',
        folders = [],
        files = fs.readdirSync('public' + source);

    files.forEach(function(item) {
        var fileName = 'public' + source + item,
            stats = fs.statSync(fileName);

        if (stats.isDirectory()) {
            folders.push({
                key: item,
                value: source + item
            });
        }
    });

    var data = {
        title: '书法碑帖列表',
        folders: folders
    };

    res.render('beitie/index', data);
});

// define the show beitie list route, 一级目录路径: /beitie/东晋-王羲之/
router.get(/^\/([^\/]*)\/$/, function(req, res) {
    var source = decodeURIComponent(req.originalUrl),
        path = 'public' + source,
        folders = [];

    console.log(source, req.params[0]);
    if (!fs.existsSync(path)) {
        res.status(404).render('beitie/404', {
            url: source
        });
    } else {
        var files = fs.readdirSync('public' + source);
        files.forEach(function(item) {
            var fileName = 'public' + source + item,
                stats = fs.statSync(fileName);

            if (!/^\./.test(item) && stats.isDirectory()) {
                folders.push({
                    key: item,
                    value: source + item
                });
            }
        });

        var data = {
            title: '书法碑帖列表',
            folders: folders
        };

        res.render('beitie/list', data);
    }
});

// define the show beitie details route, 二级碑帖内容显示路径: /beitie/北魏-五代-敦煌写经/转轮经/
router.get(/(^\/.*?\/)(.*?)\/$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source),
        info = 'info.json',
        current = decodeURIComponent(req.params[1]),
        parentDirectory = 'public/beitie' + decodeURIComponent(req.params[0]),
        dir = 'public' + path,
        infoExist = false,
        thumbnailExist = false,
        thumbnailDirectory = dir + 'thumbnail/';

    console.log(req.params[0], current);
    if (fs.existsSync(thumbnailDirectory)) {
        thumbnailExist = true;
    }
    if (fs.existsSync(dir + info)) {
        infoExist = true;
    }

    // 找到上一个法帖和下一个法帖的文件夹位置
    var siblings = fs.readdirSync(parentDirectory).filter(function(item) {
        var fileName = parentDirectory + item,
            stats = fs.statSync(fileName);

        if (!/^\./.test(item) && stats.isDirectory()) {
            return true;
        }
    });
    var length = siblings.length, index = siblings.indexOf(current), prevIndex = index - 1, nextIndex = index + 1;
    if (prevIndex < 0) {
        prevIndex = length - 1;
    }
    if (nextIndex == length) {
        nextIndex = 0;
    }

    var files = fs.readdirSync(thumbnailExist ? thumbnailDirectory : dir);
    var images = files.filter(function(t) {
        return /\.jpg/i.test(t);
    });
    if (!thumbnailExist) {
        console.log(new Date().toString("yyyy-MM-dd HH:mm:ss"), "缩略图文件夹不存在，创建文件夹，并生成全部图片的缩略图");
        fs.mkdirSync(thumbnailDirectory);

        files.forEach(function(t) {
            var isImg = /\.jpg/i.test(t);
            if (isImg) {
                lwip.open(dir + t, function(err, image) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var width = image.width(),
                        ratio = 1000 / width,
                        simg = thumbnailDirectory + t;
                    if (width > 1000) {
                        // define a batch of manipulations and save small image to disk
                        image.batch().scale(ratio).writeFile(simg, function(err) {
                            if (err) {
                                console.log(err);
                            }
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

    var json = {
        info: {},
        thumbnail: thumbnailExist ? 'thumbnail/' : '',
        images: images,
        prev: siblings[prevIndex],
        next: siblings[nextIndex],
        path: path
    };
    if (infoExist) {
        // exists info.json
        fs.readFile(dir + info, function(err, data) {
            try {
                json.info = JSON.parse(data);
            } catch (e) {
                console.error(e);
            }
            res.render('beitie/show', json);
        });
    } else {
        res.render('beitie/show', json);
    }
});

// edit info.json
router.get(/(.*?\/)info$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source.replace(/info/, '')),
        dir = 'public' + path,
        info = 'info.json',
        infoFile = dir + info,
        files = fs.readdirSync(dir),
        json = {
            name: "",
            dynasty: "东晋唐宋元明清代",
            category: "楷行草隶篆书",
            type: "纸本墨迹拓片",
            size: "",
            text: "",
            collector: "",
            author: "",
            publisher: "",
            description: ""
        };

    if (files.indexOf(info) != -1) {
        // exists info.json
        fs.readFile(infoFile, function(err, data) {
            try {
                json = JSON.parse(data);
            } catch (e) {
                console.error(e);
            }
            res.render('beitie/info', {
                info: json
            });
        });
    } else {
        res.render('beitie/info', {
            info: json
        });
    }
});

// save info.json
router.post(/(.*?)\/(.*?)\/info$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source.replace(/info/, '')),
        dir = 'public' + path,
        info = 'info.json',
        infoFile = dir + info,
        files = fs.readdirSync(dir);

    fs.open(infoFile, 'w+', function(err, fd) {
        // updated info.json and backup old file to info-timestamp.json
        var buf = new Buffer(JSON.stringify(req.body));
        fs.writeSync(fd, buf, 0, buf.length, 0);

        res.redirect(path);
    });
});

module.exports = router;
