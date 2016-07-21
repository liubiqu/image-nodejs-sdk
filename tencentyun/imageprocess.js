var http = require('http');
var urlM = require('url');
var fs = require('fs');
var formstream = require('formstream');
var crypto = require('crypto');
var auth = require('./auth');
var conf = require('./conf');

var TIME_OUT = 1000;

/**
 * 智能鉴黄
 * @param  string  $pronDetectUrl     要进行黄图检测的图片url
 */
exports.pornDetect = function(pronDetectUrl, callback) {
    var sign  = auth.getPornDetectSign();
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
                        'porn score':ret.data.porn_score || '0',
                        'forbid status':ret.data.forbid_status || '0'
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

/**
 * 智能鉴黄-Url
 * @param  string  $pornUrl     要进行黄图检测的图片url列表
 */
exports.pornDetectUrl = function(pornUrl, callback) {
    var sign  = auth.getPornDetectSign();
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
        'url_list': pornUrl
    }     
    var reqdata = JSON.stringify(content);  

    var headers = {
        'Authorization': sign, 
        'Content-Type': 'application/json',
        'Content-Length': reqdata.length,
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
                var rets = ret.result_list;
                if(rets){
                    var result = {};
                    for(var i = 0; i < rets.length; i++){
                        var res = {
                            'code':rets[i].code, 
                            'message':rets[i].message || '', 
                            'url':rets[i].url || '', 
                            'data':{},
                        }

                        if (0 == rets[i].code) {
                            res.data = {
                                'result':rets[i].data.result || '0',
                                'confidence':rets[i].data.confidence || '0',
                                'normal score':rets[i].data.normal_score || '0',
                                'hot score':rets[i].data.hot_score || '0',
                                'porn score':rets[i].data.porn_score || '0',
                                'forbid status':rets[i].data.forbid_status || '0',
                            }
                        }
                        result[i] = res;
                    }
                    callback(result);
                }
                else{
                    var res = {
                        'code':ret.code, 
                        'message':ret.message || '', 
                        'data':{},
                    }
                    callback(res);
                }
            } else {
                callback({'code':-1, 'message':'response '+data.toString()+' is not json', 'data':{}});
            }
        });
    });
    req.write(reqdata);
    req.end();
}

/**
 * 智能鉴黄-File
 * @param  string  $pornFile     要进行黄图检测的图片file列表
 */
exports.pornDetectFile = function(pornFile, callback) {
    var sign  = auth.getPornDetectSign();
    if( -1 == sign || -2 == sign){
        var data = {
                'code':9, 
                'message':'Secret id or key is empty.', 
                'data':{}
        }
        callback(data);
    }

    var form = formstream();
    for (var i = 0; i < pornFile.length; i++) {
        filePath = pornFile[i];
        var isExists = fs.existsSync(filePath);
        if (isExists) {
            var stats = fs.statSync(filePath);
            var fileSizeInBytes = stats["size"];
            form.file('image['+i.toString()+']', filePath, filePath, fileSizeInBytes);
        }
        else{
            callback({'httpcode':0, 'code':-1, 'message':'file '+filePath+' not exists', 'data':{}});
        }
    }

    form.field('appid', conf.APPID).field('bucket', conf.BUCKET);

    var headers = form.headers({
        'Authorization': sign,
    });

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
                var rets = ret.result_list;
                if(rets){
                    var result = {};
                    for(var i = 0; i < rets.length; i++){
                        var res = {
                            'code':rets[i].code, 
                            'message':rets[i].message || '', 
                            'filename':rets[i].filename || '', 
                            'data':{},
                        }

                        if (0 == rets[i].code) {
                            res.data = {
                                'result':rets[i].data.result || '0',
                                'confidence':rets[i].data.confidence || '0',
                                'normal score':rets[i].data.normal_score || '0',
                                'hot score':rets[i].data.hot_score || '0',
                                'porn score':rets[i].data.porn_score || '0',
                                'forbid status':rets[i].data.forbid_status || '0',
                            }
                        }
                        result[i] = res;
                    }
                    callback(result);
                }
                else{
                    var res = {
                        'code':ret.code, 
                        'message':ret.message || '', 
                        'data':{},
                    }
                    callback(res);
                }
            } else {
                callback({'code':-1, 'message':'response '+data.toString()+' is not json', 'data':{}});
            }
        });
    });
    form.pipe(req);
}