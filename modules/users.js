var crypto = require('crypto');
var jsonarrayutils = require('./jsonarrayutils');

module.exports = function(u) {
    if (!u) {
        return false;
    }

    var file = './config/users.json';
    var users = jsonarrayutils.read(file);
    if (users.length === 0) {
        // init user config file, password is 'admin'.
        users.push({id: 1, name: 'admin', password: 'd033e22ae348aeb5660fc2140aec35850c4da997'});
        jsonarrayutils.write(file, users);
    }
    var length = users.length;
    var md5sum = crypto.createHash('sha1');
    for (var i = 0; i < length; i ++) {
        var user = users[i];
        if (u.name === user.name) {
            var md5sum = crypto.createHash('sha1');
            md5sum.update(u.password, 'utf8');
            var sha1 = md5sum.digest('hex');
            // console.log(u.password, sha1, user.password);
            if (user.password === sha1) {
                return user;
            } else {
                return false;
            }
        }
    }

    return false;
};
