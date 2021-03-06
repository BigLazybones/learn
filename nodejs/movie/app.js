var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;  //process.env.PORT：读取当前目录下环境变量port的值
var app = express();

app.set('views', './views/pages');  //设置试图根目录
app.set('view engine', 'jade')//设置默认模板引擎
app.use(bodyParser.urlencoded({ extended: false }))  //将表单数据格式化 body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port);

console.log('movie started on port ' + port);


//路由
// index page
app.get('/', function (req, res) {
    res.render('index', {
        title: 'movie 首页',
        movies: [
            {
                title: "机械战警",
                _id: 1,
                poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"

            },
            {
                title: "X战警",
                _id: 2,
                poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
            },
            {
                title: "皇家骑士",
                _id: 3,
                poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"

            }
        ]

    })
})

// list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: 'movie 列表页',
        movies: [
            {
                title: "机械战警",
                _id: 1,
                doctor: '何塞.帕迪利亚',
                country: "美国",
                year: 2014,
                poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
                language: "英语",
                flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
                summary: "《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
            }
        ]
    })
})

// detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: 'movie 详情页',
        movie: {
            doctor: '何塞.帕迪利亚',
            country: "美国",
            title: "机械战警",
            year: 2014,
            poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
            language: "英语",
            flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
            summary: "《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
        }
    })
})

// admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'movie 后台录入页',
        movie: {
            doctor: '何塞.帕迪利亚',
            country: "美国",
            title: "机械战警",
            year: 2014,
            poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
            language: "英语",
            flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
            summary: "《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
        }
    })
})