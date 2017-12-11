var file = require('../models/file');

exports.showIndex = function (req, res) {
    //错误的：传统思维，不是node的思维：
    //res.render("index",{
    //    "albums" : file.getAllAlbums()
    //});
    //这就是Node.js的编程思维，就是所有的东西，都是异步的
    //所以，内层函数，不是return回来东西，而是调用高层函数提供的
    //回调函数。把数据当做回调函数的参数来使用。
    file.getAllAlbums(function(err,allAlabums){
        //err是字符串
        if(err){
            console.log(err);
            res.render('err');
            return;
        }
        res.render("index",{
            "albums" : allAlabums
        });
    })
}
exports.showAlbum = function (req, res) {
    res.end('相册' + req.params.albumName);
}