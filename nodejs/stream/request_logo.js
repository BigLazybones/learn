var http = require('http');
var fs = require('fs');
var request = require('request');

http.createServer(function(req, res){
    // fs.readFile('../buffer/logo.png', function(err,  data){
    //     if(err){
    //         res.end('file not exist!');
    //     }else{
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(data);
    //     }
    // })

    // fs.createReadStream('../buffer/logo.png').pipe(res);

    request('https://www.imooc.com/static/img/index/logo.png').pipe(res);
    
}).listen(8080)