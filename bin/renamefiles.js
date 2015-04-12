var fs = require('fs');
var args = process.argv.slice(2);

//  从文件名中删除这些常匹配到的标点符号
var reg = /[【《〈)（\[—:：·，。、［『』］\s\t+\]）(〉》】]+/g;
var walk = function(path) {
    var files = fs.readdirSync(path);
    files.forEach(function(item) {
        var oldName = path + '/' + item,
            stats = fs.statSync(oldName);

        if (stats.isDirectory()) {
            if (reg.test(item)) {
                var newName = path + '/' + item.replace(reg, '');
                fs.renameSync(oldName, newName);
                console.log('【' + oldName + '】 renamed to 【' + newName + '】');
                walk(newName);
            } else {
                walk(oldName);
            }
        } else {
            if (reg.test(item)) {
                var newName = path + '/' + item.replace(reg, '');
                fs.renameSync(oldName, newName);
                console.log('【' + oldName + '】 renamed to 【' + newName + '】');
            }
        }
    });
};

args.forEach(function(path) {
    console.log("begin rename path: 【" + path + "】");
    walk(path);
});

