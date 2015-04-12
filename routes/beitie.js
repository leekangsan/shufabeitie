var fs = require('fs');
var date = require('datejs');
var express = require('express');
var thumbnail = require('../modules/thumbnail');
var router = express.Router();

// 同步读取info.json文件中数组内容，供页面显示及编辑使用
// 保存时需要将最新的版本加到数组最前面
var syncReadInfoVersions = function(infoFile) {
    try {
        var data = fs.readFileSync(infoFile, {
            encoding: 'utf8'
        });
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        return [];
    }
};

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
}, function(req, res, next) {
    console.log('Action is', req.params.action);
    next();
});

router.use(/(.*?)\/(.*?)\/info$/, function(req, res, next) {
    console.log('user valified.');
    next();
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

    // console.log(source, req.params[0]);
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
        infoFile = dir + info,
        infoExist = false,
        w1000Exist = false,
        w1000Directory = dir + 'w1000/',
        w100Exist = false,
        w100Directory = dir + 'w100/';

    if (fs.existsSync(w100Directory)) {
        w100Exist = true;
    } else {
        thumbnail(100, dir);
    }
    if (fs.existsSync(w1000Directory)) {
        w1000Exist = true;
    } else {
        thumbnail(1000, dir);
    }
    if (fs.existsSync(infoFile)) {
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

    var length = siblings.length,
        index = siblings.indexOf(current),
        prevIndex = index - 1,
        nextIndex = index + 1;
    if (prevIndex < 0) {
        prevIndex = length - 1;
    }
    if (nextIndex == length) {
        nextIndex = 0;
    }

    var files = fs.readdirSync(w100Exist ? w100Directory : dir);
    var images = files.filter(function(t) {
        return /\.jpg/i.test(t);
    });

    var json = {
        info: {},
        w100: w100Exist ? 'w100/' : '',
        w1000: w1000Exist ? 'w1000/' : '',
        images: images,
        prev: siblings[prevIndex],
        next: siblings[nextIndex],
        path: path
    };
    if (infoExist) {
        var versions = syncReadInfoVersions(infoFile);
        json.info = versions[0] || {};
        json.info.text = json.info.text.replace(/\n+/g, '<p>');
    }
    res.render('beitie/show', json);
});

// edit info.json
router.get(/(.*?)\/(.*?)\/info$/, function(req, res) {
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
            type: "纸本墨迹拓本",
            text: "",
            author: "",
            description: ""
        };

    if (files.indexOf(info) != -1) {
        var versions = syncReadInfoVersions(infoFile);
        json = versions[0] || {};
    }

    res.render('beitie/info', {
        info: json
    });
});

// save info.json
router.post(/(.*?)\/(.*?)\/info$/, function(req, res) {
    var source = req.originalUrl,
        path = decodeURIComponent(source.replace(/info/, '')),
        dir = 'public' + path,
        info = 'info.json',
        infoFile = dir + info,
        versions = [],
        files = fs.readdirSync(dir);

    // exists info.json
    if (files.indexOf(info) != -1) {
        versions = syncReadInfoVersions(infoFile);
    }

    // 最新的版本放在info.json数组的最前面，并加入编辑时间戳和用户
    req.body.user = 'admin';
    req.body.timestamp = new Date().getTime();
    versions.unshift(req.body);
    fs.open(infoFile, 'w+', function(err, fd) {
        var buf = new Buffer(JSON.stringify(versions));
        fs.writeSync(fd, buf, 0, buf.length, 0);

        res.redirect(path);
    });
});

module.exports = router;
