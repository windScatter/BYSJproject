var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var routes = require('./routes');


// get请求
function get(req, res) {
    var reqUrl = url.parse(req.url);
    res.writeHead('200', {"Content-Type": "text/html"});
    // console.log(reqUrl.pathname);
    if (typeof  routes.getHandler[reqUrl.pathname] === "function") {
        routes.getHandler[reqUrl.pathname](req, res);
    } else {
        routes.getHandler["/404"](req, res);
    }
}

// post请求（示例）
function post(req, res) {
    var reqUrl = url.parse(req.url);
    if (typeof  routes.postHandler[reqUrl.pathname] === "function") {
        var postData = "";
        req.on('data', function(data){
            postData += data;
        });
        req.on('end', function(){
            postData = qs.parse(postData);
            // console.log(postData);
            routes.postHandler[reqUrl.pathname](req, res, postData);
        });
    } else {
        routes.getHandler["/404"](req, res);
    }
}

// 提供给其他模块使用的接口
module.exports = {
    get: get,
    post: post
}

