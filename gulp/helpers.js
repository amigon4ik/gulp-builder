var fs = require('fs');

var rmDir = function (dirPath) {
    if (!fs.existsSync(dirPath)) {
        return;
    }
    try {
        var files = fs.readdirSync(dirPath);
    } catch(e) {
        console.log(e.message);
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                rmDir(filePath);
            }
        }
    fs.rmdirSync(dirPath);
};

var mkDir = function(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

module.exports = {
    rmDir: function (dirPath) {
        rmDir(dirPath);
    },
    mkDir: function(dirPath) {
        mkDir(dirPath);
    },
    cleanDir: function(dirPath) {
        rmDir(dirPath);
        mkDir(dirPath);
    },
    baseName: function (path) {
        var maybeFile = path.split('/').pop();
        if (maybeFile.indexOf('.') !== -1) {
            return maybeFile;
        }
        return '';
    }
};