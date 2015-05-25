# tencentyun-image-node
nodejs sdk for [腾讯云万象图片与微视频服务](http://app.qcloud.com/image.html)

## 安装
npm install tencentyun

## 修改配置
修改conf.js文件内如下appid配置，改为您对应app的信息
```javascript
// 请到app.qcloud.com查看您对应的appid相关信息并填充
exports.APPID = '您的APPID';
exports.SECRET_ID = '您的SECRET_ID';
exports.SECRET_KEY = '您的SECRET_KEY';
```

或者可以动态指定您的配置
```javascript
tencentyun.conf.setAppInfo('200674', 'AKID6iy7TYQpLA4AmoGtNVlfZij00wy6qEuI', 'LtkKOTyAV0g4i4UscFXDYEGUIlxZrtnL');
```

## 图片和微视频上传、查询、删除程序示例
```javascript
var tencentyun = require('../');

tencentyun.conf.setAppInfo('200679', 'AKIDoleG4e6U0j6EVQcjWXxzSO2Vv7Hqlgp2', 'ROlw3XYdNXNnII18ATs6zd7m5mivnApa');

tencentyun.image.upload('/tmp/amazon.jpg', function(ret){
    var fileid = ret.data.fileid;

    // 查询
    tencentyun.image.stat(fileid, function(ret) {
        console.log(ret);
    });

    var fileid = ret.data.fileid;

    // 复制
    tencentyun.image.copy(fileid, function(ret) {
        console.log(ret);
        // 生成私密下载url
        var sign = tencentyun.auth.appSign(ret.data.downloadUrl, 0);
        console.log(ret.data.downloadUrl + '?sign=' + sign);
    });

    // 生成新的上传签名
    var expired = parseInt(Date.now() / 1000) + 999;
    var sign = tencentyun.auth.appSign('http://web.image.myqcloud.com/photos/v1/0/', expired);
    console.log(sign);

    tencentyun.image.delete(fileid, function(ret) {
        console.log(ret);
    });
});


// 带自定义信息的上传
tencentyun.video.upload('/tmp/085523020515bc3137630770.mp4', function(ret){

    var fileid = ret.data.fileid;

    tencentyun.video.stat(fileid, function(ret) {
        console.log(ret);
    });

    var fileid = ret.data.fileid;
    tencentyun.video.delete(fileid, function(ret) {
        console.log(ret);
    });

}, 'myvideos', {'title':'测试', 'desc':'这是一个测试'}, 'testimage');

```
