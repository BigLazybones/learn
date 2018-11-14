//重写爬虫，更优雅的异步编程
var https = require('https');
var Promise = require('bluebird');
var cheerio = require('cheerio');  //nodejs的抓取页面模块

var baseUrl = 'https://www.imooc.com/learn/';
var videoids = [75, 134, 197, 259, 348, 637, 728];

function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $(".course-chapters").children('.chapter');  //拿到所有章节
    var title = $('.hd').find('h2').text();
    var score = $('.statics .score-btn .meta-value').html()

    var courseData = {
        title: title,
        score: score,
        videos: []
    };

    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find("h3").text().trim();
        var videos = chapter.find('.video li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(item){
            var video = $(this);
            var videoTitle = video.find('a').text().trim().split(')')[0] + ')';
            console.log("videoTitle："+ videoTitle);
            var id = video.attr('data-media-id');
            chapterData.videos.push({
                title: videoTitle,
                id: id
            });
        });

        courseData.videos.push(chapterData);
    });

    return courseData;
}

function printCourseInfo(coursesData){
    coursesData.forEach(function(courseData){
        console.log(courseData.title + ' 评分为：' + courseData.score + '\n');
    });

    coursesData.forEach(function(courseData){
        console.log('### '+ courseData.title + '\n');
        courseData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');
            item.videos.forEach(function(video){
                console.log(' 【'+ video.id +'】 ' + video.title + '\n');
            });
        });
    });

    
}

function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log('正在爬取 ' + url);
        https.get(url, function(res){
            var html = '';
            res.on('data', function(data){
                html += data;
            })
        
            res.on('end', function(){
                resolve(html);
            })
        }).on('error', function(e){
            reject(e);
            console.log('获取课程数据出错！');
        })
    });
}

var fetchCourseArray = [];  //获取课程Promise数组

videoids.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise.all(fetchCourseArray)
    .then(function(pages){
        var coursesData = [];

        pages.forEach(function(html){
            var courses = filterChapters(html);
            coursesData.push(courses);
        });

        coursesData.sort(function(a, b){
            return a.score < b.score;
        });

        printCourseInfo(coursesData);
    });
