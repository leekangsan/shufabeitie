var crypto = require('crypto');

var users = require('../config/users');

module.exports = function(u) {
    if (!u) {
        return false;
    }

    var length = users.length;
    var md5sum = crypto.createHash('sha1');
    for (var i = 0; i < length; i ++) {
        var user = users[i];
        if (u.name === user.name) {
            if (user.password === u.password) {
                return user;
            }

            var md5sum = crypto.createHash('sha1');
            md5sum.update(u.password, 'utf8');
            var sha1 = md5sum.digest('hex');
            console.log(u.password, sha1, user.password);
            if (user.password === sha1) {
                return user;
            } else {
                return false;
            }
        }
    }

    return false;
};
