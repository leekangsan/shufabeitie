var fs = require('fs');
var path = require('path');
var date = require('datejs');
var express = require('express');
var thumbnail = require('../modules/thumbnail');
var authenticate = require('../modules/users');
var router = express.Router();

// 同步读取info.json文件中数组内容，供页面显示及编辑使用
// 保存时需要将最新的版本加到数组最前面
var syncReadInfoVersions = function(infofile) {
    try {
        var data = fs.readFileSync(infofile, {
            encoding: 'utf8'
        });
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        return [];
    }
};

router.use(/(.*?)\/(.*?)\/info$/, function(req, res, next) {
    var user = req.session.user;
    if (authenticate(user)) {
        next();
    } else {
        res.redirect('/beitie/login?url=' + req.originalUrl);
    }
});

// define the home page route
router.get('/', function(req, res) {
    var source = 'beitie',
        folders = [],
        files = fs.readdirSync(path.join('public', source));

    files.forEach(function(item) {
        var fileName = path.join('public', source, item),
            stats = fs.statSync(fileName);

        if (stats.isDirectory()) {
            folders.push({
                key: item,
                value: item
            });
        }
    });

    var data = {
        title: '书法碑帖',
        folders: folders
    };

    res.render('beitie/index', data);
});

router.get('/login', function(req, res) {
    res.render('beitie/login');
});

router.post('/login', function(req, res) {
    var user = authenticate(req.body);
    if (user) {
        // console.log(user, req.query.url);
        req.session.user = user;
        if (req.query.url) {
            res.redirect(req.query.url);
        }
    } else {
        res.render('beitie/login');
    }
});

// define the show beitie list route, 一级目录路径: /beitie/东晋-王羲之/
router.get(/^\/([^\/]*)\/$/, function(req, res) {
    var source = decodeURIComponent(req.originalUrl),
        author = decodeURIComponent(req.params[0]),
        file = path.join('public', source),
        folders = [];

    // console.log(source, file, req.params[0]);
    if (!fs.existsSync(file)) {
        res.status(404).render('beitie/404', {
            url: source
        });
    } else {
        var files = fs.readdirSync(path.join('public', source));
        files.forEach(function(item) {
            var fileName = path.join('public', source, item),
                stats = fs.statSync(fileName);

            if (!/^\./.test(item) && stats.isDirectory()) {
                folders.push({
                    key: item,
                    value: path.join(source, item)
                });
            }
        });

        var data = {
            title: path.join('书法碑帖', author),
            folders: folders
        };

        res.render('beitie/list', data);
    }
});

// define the show beitie details route, 二级碑帖内容显示路径: /beitie/北魏-五代-敦煌写经/转轮经/
router.get(/^\/(.*?)\/(.*?)\/$/, function(req, res) {
    var source = decodeURIComponent(req.originalUrl),
        dir = path.join('public', source),
        info = 'info.json',
        author = decodeURIComponent(req.params[0]),
        paper = decodeURIComponent(req.params[1]),
        parentDirectory = path.join('public', 'beitie', author),
        infofile = path.join(dir, info),
        infoexist = false,
        w1000exist = false,
        w1000Directory = path.join(dir, 'w1000'),
        w100exist = false,
        w100Directory = path.join(dir, 'w100');

    if (fs.existsSync(w100Directory)) {
        w100exist = true;
    } else {
        thumbnail(100, dir);
    }
    if (fs.existsSync(w1000Directory)) {
        w1000exist = true;
    } else {
        thumbnail(1000, dir);
    }
    if (fs.existsSync(infofile)) {
        infoexist = true;
    }

    // 找到上一个法帖和下一个法帖的文件夹位置
    var siblings = fs.readdirSync(parentDirectory).filter(function(item) {
        var fileName = path.join(parentDirectory, item),
            stats = fs.statSync(fileName);

        if (!/^\./.test(item) && stats.isDirectory()) {
            return true;
        }
    });

    var length = siblings.length,
        index = siblings.indexOf(paper),
        prevIndex = index - 1,
        nextIndex = index + 1;
    if (prevIndex < 0) {
        prevIndex = length - 1;
    }
    if (nextIndex == length) {
        nextIndex = 0;
    }

    var files = fs.readdirSync(w100exist ? w100Directory : dir);
    var images = files.filter(function(t) {
        return /\.(jpg|png)/i.test(t);
    });

    var json = {
        info: {},
        title: path.join('书法碑帖', author, paper),
        images: images,
        prev: siblings[prevIndex],
        next: siblings[nextIndex],
        path100: path.join(source, (w100exist ? 'w100' : '')),
        path1000: path.join(source, (w1000exist ? 'w1000' : ''))
    };
    if (infoexist) {
        var versions = syncReadInfoVersions(infofile);
        json.info = versions[0] || {};
        json.info.text = json.info.text.replace(/\n+/g, '<p>');
    }
    res.render('beitie/show', json);
});

// edit info.json
router.get(/(.*?)\/(.*?)\/info$/, function(req, res) {
    var source = decodeURIComponent(req.originalUrl.replace(/info/, '')),
        dir = path.join('public', source),
        info = 'info.json',
        infofile = path.join(dir, info),
        files = fs.readdirSync(dir),
        json = {
            name: "",
            dynasty: "东晋唐宋元明清代",
            category: "楷行草隶篆书",
            type: "纸本墨迹拓本",
            text: "",
            author: "",
            description: ""
        };

    if (files.indexOf(info) != -1) {
        var versions = syncReadInfoVersions(infofile);
        json = versions[0] || {};
    }

    res.render('beitie/info', {
        info: json
    });
});

// save info.json
router.post(/(.*?)\/(.*?)\/info$/, function(req, res) {
    var source = decodeURIComponent(req.originalUrl.replace(/info/, '')),
        dir = path.join('public', source),
        info = 'info.json',
        infofile = path.join(dir, info),
        versions = [],
        files = fs.readdirSync(dir);

    // exists info.json
    if (files.indexOf(info) != -1) {
        versions = syncReadInfoVersions(infofile);
    }

    // 最新的版本放在info.json数组的最前面，并加入编辑时间戳和用户user.id
    req.body.user = req.session.user.id;
    req.body.timestamp = new Date().getTime();
    versions.unshift(req.body);
    fs.open(infofile, 'w+', function(err, fd) {
        var buf = new Buffer(JSON.stringify(versions));
        fs.writeSync(fd, buf, 0, buf.length, 0);

        res.redirect(source);
    });
});

module.exports = router;
