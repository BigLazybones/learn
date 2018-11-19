var fs = require('fs');
//调用 fs.createReadStream() 会返回一个 fs.ReadStream 对象。
//fs.ReadStream 对象都是可读流。
// var  readStream = fs.createReadStream('stream_copy_logo.js');
var  readStream = fs.createReadStream('drop.jpg');
var n = 0;

readStream
    .on('data', function(chunk){
        n++;
        console.log('data emits');
        console.log(Buffer.isBuffer(chunk));
        // console.log(chunk.toString('utf-8'));

        readStream.pause();
        console.log('data pause');
        setTimeout(function(){
            console.log('data pause end');
            readStream.resume();   //将被暂停的可读流恢复触发 'data' 事件，并将流切换到流动模式。
        },10);
    })
    .on('readable',function(){
        console.log('data readable');
    })
    .on('end',function(){
        console.log(n);
        console.log('data ends');
    })
    .on("close",function(){
        console.log('data close');
    })
    .on('error',function(e){
        console.log('data rea error' + e);
    })