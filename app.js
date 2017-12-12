var express = require('express');
var app = express();
var router = require('./controller/router');

app.set('view engine','ejs');

// 路由中间件
// 静态页面
app.use(express.static('./public'));
app.use(express.static("./uploads"));
// 首页
app.get('/', router.showIndex); // 不用写router.showIndex(req, res)
app.get('/:albumName', router.showAlbum);
app.use(function (req,res) {
    res.render('err');
})
app.listen(3000);