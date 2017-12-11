var fs = require('fs');
exports.getAllAlbums = function (callback) {
    fs.readdir('./uploads',function (err,files) {
        var allAlbums = [];
        // console.log(files);
        (function iterator(i) {
            if (i == files.length) {
                // return allAlbums;
                callback(null,allAlbums);
                return;
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if(err){
                    callback('找不到文件！' + files[i], null)
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)

    })
}   