var fs = require('fs');
var path = require('path');
var os = require('os');

// 请到app.qcloud.com查看您对应的appid相关信息并填充
exports.APPID = '您的APPID';
exports.SECRET_ID = '您的SECRET_ID';
exports.SECRET_KEY = '您的SECRET_KEY';
exports.BUCKET = '您的BUCKET';

var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json')));
var ua = function () {
    return 'QcloudNodejs/' + pkg.version + ' (' + os.type() + '; ' + os.platform() + '; ' + os.arch() + '; ) ';
}

exports.USER_AGENT = ua;
exports.API_VIDEO_END_POINT = 'http://web.image.myqcloud.com/videos/v1/';
exports.API_IMAGE_END_POINT = 'http://web.image.myqcloud.com/photos/v1/';
exports.API_IMAGE_END_POINT_V2 = 'http://web.image.myqcloud.com/photos/v2/';
exports.API_PRONDETECT_URL = 'http://service.image.myqcloud.com/detection/pornDetect';
//人脸识别-个体信息管理
exports.API_NEW_PERSON_URL = 'http://service.image.myqcloud.com/face/newperson';
exports.API_DEL_PERSON_URL = 'http://service.image.myqcloud.com/face/delperson';
exports.API_ADD_FACE_URL = 'http://service.image.myqcloud.com/face/addface';
exports.API_DEL_FACE_URL = 'http://service.image.myqcloud.com/face/delface';
exports.API_SET_INFO_URL = 'http://service.image.myqcloud.com/face/setinfo';
exports.API_GET_INFO_URL = 'http://service.image.myqcloud.com/face/getinfo';
exports.API_GET_GROUPIDS_URL = 'http://service.image.myqcloud.com/face/getgroupids';
exports.API_GET_PERSONIDS_URL = 'http://service.image.myqcloud.com/face/getpersonids';
exports.API_GET_FACEIDS_URL = 'http://service.image.myqcloud.com/face/getfaceids';
exports.API_GET_FACEINFO_URL = 'http://service.image.myqcloud.com/face/getfaceinfo';
//人脸识别-人脸检索
exports.API_VERIFY_URL = 'http://service.image.myqcloud.com/face/verify';
exports.API_IDENTIFY_URL = 'http://service.image.myqcloud.com/face/identify';
exports.API_COMPARE_URL = 'http://service.image.myqcloud.com/face/compare';


exports.setAppInfo = function (appid, secretId, secretKey, bucket) {
    module.exports.APPID = appid;
    module.exports.SECRET_ID = secretId;
    module.exports.SECRET_KEY = secretKey;
    if (bucket) {
        module.exports.BUCKET = bucket;
    }
};