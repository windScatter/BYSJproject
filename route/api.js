var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var foods = require('../model/foods')();

var getHandler = {};
var postHandler = {};

//处理对主页的请求
getHandler['/'] = function(req, res){
    var foodMenu = "";
    //拼装首页数据
    var food = foods.getAllFoods();
    for(var i = 0; i< food.length; i++){
        foodMenu = `<div class="food-card" id=${food[i].id}><img src=
                    ${food[i].image}><h1>${food[i].name}</h1><h2>${food[i].price}</h2></div>`;
    }

    fs.readFile(__dirname + '/../views/index.html', function(err, data){
        if(err){
            console.log(err);
            res.end();
        }else{
            //动态渲染模板
            res.end(data.toString().replace('{{foodMenu}}', foodMenu));
        }
    });
};

//处理对详情页面请求
getHandler['/detail'] = function(req, res){
    var query = qs.parse(url.parse(req.url).query);
    var foodDetail = detail.getDetail(query.id);

    fs.readFile(__dirname + '/../views/detail.html', function(err, data) {
        //动态渲染模板
        res.end(data.toString().replace('{{image}}', foodDetail.image))
            .replace('{{name}}', foodDetail.name)
            .replace('{{description}}', foodDetail.description)
            .replace('{{price}}', foodDetail.price);
    });
};
//注册
getHandler['/resgiter'] = function(req, res){
    fs.readFile(__dirname + '/../views/resgiter.html', function(err, data) {
      //动态渲染模板
      if(err){
          console.log(err);
          res.end();
      }else{
          res.end(data.toString());
      }
    });
};


//404响应，找不到页面
getHandler['/404'] = function(req, res){
    res.end("404 NOT FOUND");
};

// 登录处理
postHandler['/fuck'] = function(res, data) {
    if(data.user != 'lbl' || data.password != '3113007975'){
        res.write('账号或者密码错误或者都错误！！！');
        res.end();
    }else{
        res.writeHead(301, {'Location': '/'});
        console.log(res._header);
        res.end();
    }

    // do something
}

// get请求
function get(req, res) {
    var reqUrl = url.parse(req.url);
    res.writeHead('200', {"Content-Type": "text/html"});
    // console.log(reqUrl.pathname);
    if (typeof getHandler[reqUrl.pathname] === "function") {
        getHandler[reqUrl.pathname](req, res);
    } else {
        getHandler["/404"](req, res);
    }
}

// post请求（示例）
function post(req, res) {
    var reqUrl = url.parse(req.url);
    if (typeof postHandler[reqUrl.pathname] === "function") {
        var postData = "";
        req.on('data', function(data){
            postData += data;
        });
        req.on('end', function(){
            res.writeHead('200', {"Content-Type": "text/html"});
            postData = qs.parse(postData);
            console.log(postData);
            postHandler[reqUrl.pathname](res, postData);
        });
    } else {
        getHandler["/404"](req, res);
    }
}

// 提供给其他模块使用的接口
module.exports = {
    get: get,
    post: post
}

