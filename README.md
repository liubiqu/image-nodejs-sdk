# tencentyun-image-node
nodejs sdk for [腾讯云万象图片与微视频服务](http://app.qcloud.com/image.html)

## 安装
npm install tencentyun

## 动态指定您的配置
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

    // 生成新的上传签名，60秒后过期（如果发现签名无效，请尝试校准时钟或者加入QQ群324357952联系我们）
    var expired = parseInt(Date.now() / 1000) + 60;
    var sign = tencentyun.auth.appSign('http://web.image.myqcloud.com/photos/v1/200679/0/', expired);
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

## 致谢

20150528 感谢QQ网友王瑜剑提出的建议，我们改进了配置管理方式，增加了对于时钟校准的说明。