var file = require('../models/file'),
    formidable = require('formidable'),
    path = require("path"),
    fs = require("fs");

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

exports.showUp = function (req, res) {
    file.getAllAlbums(function(err,albums){
        res.render("up",{
            albums : albums
        });
    });
    // console.log(res,1);
    // res.render("up");
}

// 上传表单
exports.doPost = function (req, res) {
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files, next) {
        console.log(files);
        console.log(fields);
        if (err) {
            next();
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if (size == 0) {
            res.send('请选择图片！');
            return;
        }
        if(size > 5000){
            res.send("图片尺寸应该小于5M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }
        var extname = path.extname(files.tupian.name),
            wenjianjia = fields.wenjianjia,
            oldpath = files.tupian.path,
            newpath = path.normalize(__dirname + '/../uploads/' + wenjianjia + '/' + parseInt(Math.random()*1000) + extname);
        // 改名
        fs.rename(oldpath,newpath,function (err) {
            if (err) {
                throw Error('rename failed');
            }
            res.send("成功");
        })

    });
    // res.end('success');
}