var fs = require('fs');
//fs.readFileSync 返回文件 path 的内容
var source = fs.readFileSync('../buffer/logo.png');  

fs.writeFileSync('stream_copy_logo.png', source);