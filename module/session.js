var Cookie = require('./cookie').Cookie;
var sessionData = require('../static/sessionData');
function Session(req,res){
    function handleSession(sid){
        if(!sessionData.data[sid]){ //如果session数据不存在
            temp = {values:{},time:new Date().getTime()};
            sessionData.data[sid] = temp;
        }else{
            temp = {values:sessionData.data[sid],time:new Date().getTime()};
            console.log(temp);
        }
        return temp.values;
    };

    var cookie = new Cookie(req,res);
    this.sid = cookie.getSessionId();
    this.data = handleSession(this.sid);

    this.getValue  = function(key){
        // console.log(this.data);
        return this.data[key];
    }
    this.setValue = function(key,value){
        this.data[key] = value;
        sessionData.data[this.sid]["values"] =  this.data;
    }

}

module.exports = {
    Session: Session
}