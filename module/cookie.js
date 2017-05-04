module.exports = function(req, res){
    this.Cookies = {};
    //解析cookie
    if(req.headers.cookie){
        req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            this.Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
    }

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
        return this.Cookies["sid"];//不存在sid则自动生成一个
    };
    this.setSessionId= function(sid){
        this.Cookies["sid"] = sid;
    }
    //写入输出流
    this.flush = function(){
        var arr = [];
        for(key in this.Cookies){
            arr.push(key+"="+this.Cookies[key]);
        }
        req.headers.cookie = arr.join(";");
        res.setHeader('Set-Cookie',arr);
    }
}