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
    // 遍历相册中的所有图片
    var albumName = req.params.albumName;
    // res.end('相册' + req.params.albumName);
    // 具体业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
             //交给下面的中间件
            res.render('err');
            return;
        }
        res.render("album",{
            "albumname" : albumName,
            "images" : imagesArray
        });
    });
}
