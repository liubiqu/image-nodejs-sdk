var crypto = require('crypto');
var urlM = require('url');
var conf = require('./conf');

exports.AUTH_URL_FORMAT_ERROR = -1;
exports.AUTH_SECRET_ID_KEY_ERROR = -2;

exports.appSign = function(url, expired) {

    var now            = parseInt(Date.now() / 1000);
    var rdm            = parseInt(Math.random() * Math.pow(2, 32));
    var puserid        = '';
    var fileid         = null;

    var secretId = conf.SECRET_ID, secretKey = conf.SECRET_KEY;

    if (!secretId.length || !secretKey.length){
        return AUTH_SECRET_ID_KEY_ERROR;
    }

    var urlInfo = getInfoFromUrl(url);
    if (!urlInfo) {
        return AUTH_URL_FORMAT_ERROR;
    }

    var cate = urlInfo.cate, ver = urlInfo.ver, appid = urlInfo.appid, userid = urlInfo.userid;
    var oper = urlInfo.oper || '';
    fileid = urlInfo.fileid || null;

    // del and copy get once sign
    var onceOpers = ['del','copy'];
    if(oper && -1 != onceOpers.indexOf(oper)) {
        expired = 0;
    }

    if(typeof userid === 'string'){
        if(userid.length > 64){
            return AUTH_URL_FORMAT_ERROR;
        }
        puserid = userid;
    }
        
    var plainText = 'a='+appid+'&k='+secretId+'&e='+expired+'&t='+now+'&r='+rdm+'&u='+puserid+'&f='+fileid;
    
    var data = new Buffer(plainText,'utf-8');
    
    var res = crypto.createHmac('sha1',secretKey).update(data).digest();
    
    var bin = Buffer.concat([res,data]);
    
    var sign = bin.toString('base64');

    return sign;
}

function getInfoFromUrl(url) {
    var args = urlM.parse(url);
    if (args.pathname) {
        var parts = args.pathname.split('/');
        switch (parts.length) {
            case 5:
                cate = parts[1];
                ver = parts[2];
                appid = parts[3];
                userid = parts[4];
                return {'cate':cate, 'ver':ver, 'appid':appid, 'userid':userid};
            break;
            case 6:
                cate = parts[1];
                ver = parts[2];
                appid = parts[3];
                userid = parts[4];
                fileid = parts[5];
                return {'cate':cate, 'ver':ver, 'appid':appid, 'userid':userid, 'fileid':fileid};
            break;
            case 7:
                cate = parts[1];
                ver = parts[2];
                appid = parts[3];
                userid = parts[4];
                fileid = parts[5];
                oper = parts[6];
                return {'cate':cate, 'ver':ver, 'appid':appid, 'userid':userid, 'fileid':fileid, 'oper':oper};
            break;
            default:
                return {};
        }
    } else {
        return {};
    }
}
