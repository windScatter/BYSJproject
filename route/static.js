var fs = require('fs');
var path = require('path');

var opts = {
    ".css": "text/css",
    ".js": "text/js",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif"
};

function get(pathname, res){
    if(fs.existsSync(pathname)){
        var extname = path.extname(pathname);
        res.writeHead('200', {'Content-Type': opts[extname]});
        fs.readFile(pathname, function(err, data){
            if(err){
                console.log(err);
                res.end();
            }else{
                if(isImage(extname)){
                    res.end(data, 'binary');  //二进制文件需加上binary
                }else{
                    res.end(data.toString());
                }
            }
        })
    }
}

function isImage(extname){
    if(extname == '.jpg' || '.jpeg'|| '.png'|| '.gif'){
        return true;
    }
    return false;
}

module.exports = get;