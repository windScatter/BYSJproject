var Cookie = require('./cookie');
var sessionData = require('./sessionData');
module.exports = function(req,res){
    cookie = new Cookie(req,res);
    this.sid = cookie.getSessionId();
    this.date = (function(sid){
        temp = sessionData.data[sid];
        if(!temp){ //如果session数据不存在
            temp = {values:{},time:new Date().getTime()};
            sessionData.data[sid] = temp;
            cookie.setSessionId(sid);
            cookie.flush();
        }
        return temp.values;
    })(this.sid);

    this.getValue  = function(key){
        return this.date[key];
    }
    this.setValue = function(key,value){
        this.date[key] = value;
        sessionData.data[this.sid]["values"] =  this.date;
    }

}