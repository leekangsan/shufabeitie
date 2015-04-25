var fs = require('fs');

module.exports = {
    read: function(file) {
        try {
            var data = fs.readFileSync(file, {
                encoding: 'utf8'
            });
            return JSON.parse(data);
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    write: function(file, json) {
        var buf = new Buffer(JSON.stringify(json));
        var fd = fs.openSync(file, 'w+');
        fs.writeSync(fd, buf, 0, buf.length, 0);
        fs.closeSync(fd);
    }
};
