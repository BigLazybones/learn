//request方法

var http = require('http');

//querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。
var querystring = require('querystring');

//querystring.stringify 方法通过遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。
var postData = querystring.stringify({
    author:'tester',
    mail:'125787989@qq.com',
    url: 'lazywu.com',
    text: '测试客户端发起请求数据'
});

var options = {
    hostname: 'lazywu.com',
    port: 443,
    path: '/20180815/23.html/comment',
    method: 'POST',
    headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Cache-Control':'max-age=0',
        'Connection':'keep-alive',
        'Content-Length': postData.length,
        'Content-Type':'application/x-www-form-urlencoded',
        'Host':'lazywu.com',
        'Origin':'https://lazywu.com',
        'Referer':'https://lazywu.com/20180815/23.html',
        'Upgrade-Insecure-Requests':'1',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
}

var req = http.request(options, function(res){
    console.log('Statys: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(chunk){
        //Buffer.isBuffer 如果 obj 是一个 Buffer 则返回 true ，否则返回 false 。
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    })

    res.on('end',function(){
        console.log('评论完毕');
    });
})

req.on('error',function(e){
    console.log('Error: ' + e.message);
})

//request.write 发送请求主体的一个数据块。 通过多次调用该方法，一个请求主体可被发送到一个服务器，在这种情况下，当创建请求时，建议使用 ['Transfer-Encoding', 'chunked'] 请求头。
req.write(postData);
req.end();