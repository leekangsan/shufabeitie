var crypto = require('crypto');

var users = require('../config/users.json');
console.log(users);

module.exports = function(u) {
    var length = users.length;
    var md5sum = crypto.createHash('sha1');
    for (var i = 0; i < length; i ++) {
        var user = users[i];
        if (u.name === user.name) {
            var md5sum = crypto.createHash('sha1');
            md5sum.update(u.password, 'utf8');
            console.log(u.password, 'utf8');
            var sha1 = md5sum.digest('hex');
            console.log(sha1);
            if (user.password === sha1) {
                return true;
            } else {
                return false;
            }
        }
    }

    return false;
};
