var fs = require('fs');
var path = require('path');
var os = require('os');

// 请到app.qcloud.com查看您对应的appid相关信息并填充
exports.APPID = '200679';
exports.SECRET_ID = 'AKIDoleG4e6U0j6EVQcjWXxzSO2Vv7Hqlgp2';
exports.SECRET_KEY = 'ROlw3XYdNXNnII18ATs6zd7m5mivnApa';

var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json')));
var ua = function() {
    return 'QcloudNodejs/' + pkg.version + ' (' + os.type() + '; ' + os.platform() + '; ' + os.arch() + '; ) ';
}

exports.USER_AGENT = ua;
exports.API_VIDEO_END_POINT = 'http://web.image.myqcloud.com/videos/v1/';
exports.API_IMAGE_END_POINT = 'http://web.image.myqcloud.com/photos/v1/';
