// http 服务器
const http = require('http');  
// 创建http server，并传入回调函数:
http.createServer(function(request, response){
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
}).listen(8888);  // 让服务器监听8888端口

console.log('server listening on 8888');