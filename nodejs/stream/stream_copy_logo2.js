var fs = require('fs');

var  readStream = fs.createReadStream('drop.jpg');
var  wirteStream = fs.createWriteStream('1-stream.jpg');

readStream.on('data', function(chunk){
    if(wirteStream.write(chunk) === false){
        //数据还在缓存区，降低读的速度
        console.log('still cached');
        readStream.pause();
    }
    wirteStream.write(chunk);
});

readStream.on('end', function(){
    wirteStream.end();
});

//如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。
wirteStream.on('drain',function(){
    console.log('data drains');
    readStream.resume();
})