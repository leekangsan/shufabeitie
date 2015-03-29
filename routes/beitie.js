var fs = require('fs');
var express = require('express');
var router = express.Router();

// a middleware with no mount path, gets executed for every request to the router
router.use(function(req, res, next) {
    console.log('Time:', Date.now());
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
    var reg = /[(（\s\t\n]+/g,
        walk = function(path) {
            var files = fs.readdirSync(path);
            files.forEach(function(item) {
                var oldName = path + '/' + item,
                    stats = fs.statSync(oldName);

                if (stats.isDirectory()) {
                    if (reg.test(item)) {
                        var newName = path + '/' + item.replace(reg, '_').replace(/[)）]/g, '');
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
                    if (reg.test(item)) {
                        var newName = path + '/' + item.replace(reg, '_').replace(/[)）]/g, '');
                        fs.rename(oldName, newName, function(err) {
                            if (!err) {
                                console.log(oldName + ': file renamed successfully!');
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
            folders.push(source + item);
        }
    });

    var data = {
        title: 'list of bei tie',
        folders: folders
    };

    res.render('beitie/index', data);
});

// define the show beitie list route: /beitie/2015-03/
router.get(/(\d+-\d+)\/$/, function(req, res) {
    var source = req.originalUrl,
        path = 'public' + source,
        folders = [];
    if (!fs.existsSync(path)) {
        res.status(404).render('beitie/404', {
            url: source
        });
    } else {
        var files = fs.readdirSync('public' + source);
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
            title: 'list of bei tie',
            folders: folders
        };

        res.render('beitie/list', data);
    }
});

// define the show beitie details route: /beitie/2015-03/转轮经
router.get(/(\d+-\d+)\/(.*?)\/$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source),
        info = 'info.json',
        dir = 'public' + path,
        files = fs.readdirSync(dir);

    // should hide files which name start with "." such as .DS_Store, .svn, .git
    var images = files.filter(function(t) {
        return /\.jpeg|\.jpg|\.png/i.test(t);
    }),
        json = {
            info: {},
            images: images,
            path: path
        };

    if (files.indexOf(info) != -1) {
        // exists info.json
        fs.readFile(dir + info, function(err, data) {
            try {
                json.info = JSON.parse(data);
            } catch(e) {
                console.error(e);
            }
            res.render('beitie/show', json);
        });
    } else {
        res.render('beitie/show', json);
    }
});

// edit info.json
router.get(/(\d+-\d+\/.*?)\/info$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source.replace(/info/, '')),
        dir = 'public' + path,
        info = 'info.json',
        infoFile = dir + info,
        files = fs.readdirSync(dir);

    var json = {
        name: "碑帖名称",
        dynasty: "碑帖所属朝代",
        category: "楷行草隶篆书",
        type: "纸质墨迹石刻崖刻拓片",
        size: "宽 x 高",
        text: "碑帖内容",
        collector: "碑帖收藏地点",
        author: "碑帖书家",
        description: "碑帖简介"
    };
    if (files.indexOf(info) != -1) {
        // exists info.json
        fs.readFile(infoFile, function(err, data) {
            try {
                json = JSON.parse(data);
            } catch(e) {
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
router.post(/(\d+-\d+)\/(.*?)\/info$/, function(req, res) {
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
