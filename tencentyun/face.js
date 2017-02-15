var http = require('http');
var urlM = require('url');
var fs = require('fs');
var formstream = require('formstream');
var crypto = require('crypto');
var auth = require('./auth');
var conf = require('./conf');

var TIME_OUT = 1000;
// 30 days
var EXPIRED_SECONDS = 2592000;
/**
 * 2.1 个体创建:创建一个Person，并将Person放置到group_ids指定的组当中，不存在的group_id会自动创建。
 * @param group_ids
 * @param person_id
 * @param image_url
 * @param person_name
 * @param tag
 * @param callback
 */
exports.newPerson = function (group_ids, person_id, image_url, person_name, tag, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'group_ids': encodeURIComponent(group_ids),
        'person_id': encodeURIComponent(person_id),
        'person_name': encodeURIComponent(person_name),
        'url': image_url,
        'tag': encodeURIComponent(tag)
    };

    return requestCI(conf.API_NEW_PERSON_URL, content, callback);
};

/**
 * 2.2 删除个体:删除一个Person
 * @param person_id
 * @param callback
 * @returns {*}
 */
exports.delPerson = function (person_id, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id
    };
    return requestCI(conf.API_DEL_PERSON_URL, content, callback);
};

/**
 * 2.3 增加人脸:将一组Face加入到一个Person中。注意，一个Face只能被加入到一个Person中。 一个Person最多允许包含20个Face；加入几乎相同的人脸会返回错误。
 * @param person_id
 * @param urls
 * @param tag
 * @param callback
 * @returns {*}
 */
exports.addFace = function (person_id, urls, tag, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'tag': tag,
        'urls': urls,
        'person_id': person_id
    };
    return requestCI(conf.API_ADD_FACE_URL, content, callback);
};

/**
 * 2.4 删除人脸:删除一个person下的face，包括特征，属性和face_id。
 * @param person_id
 * @param face_ids
 * @param callback
 * @returns {*}
 */
exports.delFace = function (person_id, face_ids, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id,
        'face_ids': face_ids
    };
    return requestCI(conf.API_DEL_FACE_URL, content, callback);
};

/**
 * 2.5 设置信息:设置Person的name。
 * @param person_id
 * @param person_name
 * @param tag
 * @param callback
 * @returns {*}
 */
exports.setInfo = function (person_id, person_name, tag, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id,
        'person_name': person_name,
        'tag': tag
    };
    return requestCI(conf.API_SET_INFO_URL, content, callback);
};

/**
 * 2.6 获取信息:获取一个Person的信息, 包括name, id, tag, 相关的face, 以及groups等信息。
 * @param person_id
 * @param callback
 * @returns {*}
 */
exports.getInfo = function (person_id, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id
    };
    return requestCI(conf.API_GET_INFO_URL, content, callback);
};

/**
 * 2.7 获取组列表:获取一个AppId下所有group列表。
 * @param callback
 * @returns {*}
 */
exports.getGroupIds = function (callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID
    };
    return requestCI(conf.API_GET_GROUPIDS_URL, content, callback);
};

/**
 * 2.8 获取人列表:获取一个组Group中所有person列表。
 * @param group_id
 * @param callback
 * @returns {*}
 */
exports.getPersonIds = function (group_id, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'group_id': group_id
    };
    return requestCI(conf.API_GET_PERSONIDS_URL, content, callback);
};

/**
 * 2.9 获取人脸列表:获取一个组person中所有face列表。
 * @param person_id
 * @param callback
 * @returns {*}
 */
exports.getFaceIds = function (person_id, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id
    };
    return requestCI(conf.API_GET_FACEIDS_URL, content, callback);
};

/**
 *  2.10 获取人脸信息:获取一个face的相关特征信息。
 * @param face_id
 * @param callback
 * @returns {*}
 */
exports.getFaceInfo = function (face_id, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'face_id': face_id
    };
    return requestCI(conf.API_GET_FACEINFO_URL, content, callback);
};

/**
 * 2.11 人脸验证:给定一个图片和一个Person，检查是否是同一个人。
 * @param person_id
 * @param image_url
 * @param callback
 * @returns {*}
 */
exports.verify = function (person_id, image_url, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'person_id': person_id,
        'url': image_url
    };
    return requestCI(conf.API_VERIFY_URL, content, callback);
};


/**
 * 2.12 人脸检索:对于一个待识别的人脸图片，在一个Group中识别出最相似的Top5 Person作为其身份返回，返回的Top5中按照相似度从大到小排列。
 * @param group_id 候选人组id
 * @param image_url 图片的url, image 和url只提供一个就可以了,如果都提供,只使用url
 * @param image_obj
 * @param callback
 * @returns {*}
 */
exports.identify = function (group_id, image_url, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'group_id': group_id,
        'url': image_url
    };
    return requestCI(conf.API_IDENTIFY_URL, content, callback);
};

exports.compare = function (image_urlA, image_urlB, callback) {
    var content = {
        'bucket': conf.BUCKET,
        'appid': conf.APPID,
        'group_id': group_id,
        'urlA': image_urlA,
        'urlA': image_urlB
    };
    return requestCI(conf.API_COMPARE_URL, content, callback);
};


function requestCI(api_url, req_body, callback) {
    var expired = parseInt(Date.now() / 1000) + EXPIRED_SECONDS;
    var sign = auth.getAppSignV2(conf.BUCKET, '', expired);
    if (-1 == sign || -2 == sign) {
        var data = {
            'code': 9,
            'message': 'Secret id or key is empty.',
            'data': {}
        };
        callback(data);
    }
    var reqdata = JSON.stringify(req_body);
    var headers = {
        'Authorization': sign,
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': reqdata.length
    };
    var urlInfo = urlM.parse(api_url);
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
                ret = JSON.parse(data.toString());
            } catch (err) {
                ret = {};
            }
            if (ret) {
                callback && callback(ret);
            } else {
                callback && callback({'code': -1, 'message': 'response ' + data.toString() + ' is not json', 'data': {}});
            }
        });
    });
    req.write(reqdata);
    req.end();
}
