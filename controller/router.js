exports.showIndex = function (req, res) {
    res.send('我是首页');
}
exports.showAlbum = function (req, res) {
    res.end('相册' + req.params.albumName);
}