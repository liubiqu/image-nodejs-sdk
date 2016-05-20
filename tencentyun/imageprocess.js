var http = require('http');
var urlM = require('url');
var fs = require('fs');
var crypto = require('crypto');
var auth = require('./auth');
var conf = require('./conf');

var TIME_OUT = 10;

/**
 * 智能鉴黄
 * @param  string  $pronDetectUrl     要进行黄图检测的图片url
 */
exports.pornDetect = function(pronDetectUrl, callback) {
    var sign  = auth.getPornDetectSign(pronDetectUrl);
    if( -1 == sign || -2 == sign){
        var data = {
                'code':9, 
                'message':'Secret id or key is empty.', 
                'data':{}
        }
        callback(data);
    }

    var content = {
        'bucket': conf.BUCKET,
        'appid': parseInt(conf.APPID),
        'url': pronDetectUrl
    }     
    var reqdata = JSON.stringify(content);  

    var headers = {
        'Authorization': sign, 
        'Content-Type': 'application/json'
    }
    var url = conf.API_PRONDETECT_URL;
    var urlInfo = urlM.parse(url);
    var options = {
        hostname: urlInfo.hostname,
        port: urlInfo.port || 80,
        path: urlInfo.path,
        method: 'POST',
        timeout: TIME_OUT,
        headers: headers
    };

    var req = http.request(options, function (res) {
        res.on('data', function (data) {
            var ret = {};

            try {
                var ret = JSON.parse(data.toString());
            } catch (err) {
                ret = {};
            }
            if (ret) {
                var result = {
                    'code':ret.code, 
                    'message':ret.message || '', 
                    'data':{}
                }

                if (0 == ret.code) {
                    result.data = {
                        'result':ret.data.result || '0',
                        'confidence':ret.data.confidence || '0',
                        'normal score':ret.data.normal_score || '0',
                        'hot score':ret.data.hot_score || '0',
                        'porn score':ret.data.porn_score || '0'
                    }
                }

                callback(result);

            } else {
                callback({'code':-1, 'message':'response '+data.toString()+' is not json', 'data':{}});
            }
        });
    });

    req.write(reqdata);
    req.end();
}