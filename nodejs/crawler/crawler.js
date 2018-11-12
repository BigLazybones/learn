//HTTP 小爬虫
var https = require('https');
var cheerio = require('cheerio')
var url = 'https://www.imooc.com/video/7965';
// var url = 'https://www.imooc.com/video/11548';

function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $(".chapter-list").children('ul');  //拿到所有章节
    var courseData = [];

    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find(".sec-title span").text();
        var videos = chapter.find('.sec-li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(item){
            var video = $(this).find('.clearfix');
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title: videoTitle,
                id: id
            });
        });

        courseData.push(chapterData);
    });

    return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');
        item.videos.forEach(function(video){
            console.log(' 【'+ video.id +'】 ' + video.title + '\n');
        });
    });
}

https.get(url, function(res){
    var html = '';
    res.on('data', function(data){
        html += data;
    })

    res.on('end', function(){
        var courseData = filterChapters(html);
        printCourseInfo(courseData);
    })
}).on('error', function(){
    console.log('获取课程数据出错！');
})