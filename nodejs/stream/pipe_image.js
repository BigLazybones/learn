var fs = require('fs');

fs.createReadStream('drop.jpg').pipe(fs.createWriteStream('1-pipe.jpg'));