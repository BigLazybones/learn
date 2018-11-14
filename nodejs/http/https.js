// https 服务器
var https = require('https');
var fs = require('fs');  //fs模块用于对系统文件及目录进行读写操作

var  options = {
    key: fs.readFileSync('ssh_key.pem'),
    cert: fs.readFileSync('ssh_cert.pem')
}

https.createServer(options, function(req, res){
    res.writeHead(200);
    res.end('Hello Imooc');
}).listen(8090);