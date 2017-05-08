var http = require('http');
var url = require('url');
function Cookie(req, res){
    // //解析cookie
    function  handleCookie(){
        var arr= [];
        var obj = {};
        if(req.headers.cookie){
            arr = req.headers.cookie.split(",");
        }
        for(index in arr){
            var parts = arr[index].split('=');
            obj[parts[0].trim()] = (parts[1]||'').trim();
        }
        // console.log(obj);
        return obj;
    };
    this.Cookies = handleCookie();

    //获取cookie
    this.getValue = function(key){
        return this.Cookies ? this.Cookies[key]: undefined;
    };
    //设置Cookie
    this.setValue= function(key,value){
        if(typeof(value) !== "string"){
            value = JSON.stringify(value);
        }
        this.Cookies[key] = value;
    };
    //设置获取sid
    this.getSessionId= function(){
        // console.log(this.Cookies["sid"]);
        return this.Cookies["sid"];
    };
    this.setSessionId= function(sid){
        this.Cookies["sid"] = sid;
    }
    //写入cookie
    this.flush = function(){
        var arr = [];
        for(key in this.Cookies){
            arr.push(key+"="+this.Cookies[key]);
        }
        req.headers.cookie = arr.join(";");
        res.setHeader('Set-Cookie',arr);
    }
}

module.exports = {
    Cookie: Cookie
};