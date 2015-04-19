var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);

//  从文件名中删除这些常匹配到的标点符号
var reg = /[【《〈)（\[—:：·，。、［『』］\s\t+\]）(〉》】]+/g;
var walk = function(dir) {
    console.log(dir);
    var files = fs.readdirSync(dir);
    files.forEach(function(item) {
        var oldName = path.join(dir, item),
            stats = fs.statSync(oldName);

        if (stats.isDirectory()) {
            if (reg.test(item)) {
                var newName = path.join(dir, item.replace(reg, ''));
                fs.renameSync(oldName, newName);
                console.log('【' + oldName + '】 renamed to 【' + newName + '】');
                walk(newName);
            } else {
                walk(oldName);
            }
        } else {
            if (reg.test(item)) {
                var newName = path.join(dir, item.replace(reg, ''));
                fs.renameSync(oldName, newName);
                console.log('【' + oldName + '】 renamed to 【' + newName + '】');
            }
        }
    });
};

var beitie = args[0];

if (!fs.existsSync(beitie)) {
    console.log(beitie, ' is not exists.');
    console.log('Usage: node modules/pdfrename.js public/beitie/');
    return false;
} else {
    walk(beitie);
}

