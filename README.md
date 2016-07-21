# tencentyun/image-nodejs-sdk
腾讯云 [万象优图（Cloud Image）](https://www.qcloud.com/product/ci.html) SDK for Node.js

## 安装
npm install tencentyun

## 动态指定您的配置
```javascript
tencentyun.conf.setAppInfo('111', 'secretid', 'secretkey');
```

## V2版本空间和自定义文件名的上传，查询和删除示例
```javascript
var tencentyun = require('../');

// 自定义空间名称，在http://console.qcloud.com/image/bucket创建
var bucket = 'bucket';

// 111 即项目ID 在http://console.qcloud.com/image/bucket查看
// 后两项为secretid和secretkey 在http://console.qcloud.com/image/project查看
tencentyun.conf.setAppInfo('111', 'secretid', 'secretkey', bucket);

//智能鉴黄
var pornUrl = 'http://b.hiphotos.baidu.com/image/pic/item/8ad4b31c8701a18b1efd50a89a2f07082938fec7.jpg';
tencentyun.imageprocess.pornDetect(pornUrl, function(ret){
    console.log(ret);
});

//智能鉴黄-Url
var pornUrl = [
        'http://b.hiphotos.baidu.com/image/pic/item/8ad4b31c8701a18b1efd50a89a2f07082938fec7.jpg',
        'http://c.hiphotos.baidu.com/image/h%3D200/sign=7b991b465eee3d6d3dc680cb73176d41/96dda144ad3459829813ed730bf431adcaef84b1.jpg',
    ];
tencentyun.imageprocess.pornDetectUrl(pornUrl, function(ret){
    console.log(ret);
});

//智能鉴黄-File
var pornFile = [
        'D:/porn/test1.jpg',
        'D:/porn/test2.jpg',
        '../../../../../porn/test3.png',
    ];
tencentyun.imageprocess.pornDetectFile(pornFile, function(ret){
    console.log(ret);
});

// 自定义文件名
var fileid = 'sample' + parseInt(Date.now() / 1000);

tencentyun.imagev2.upload('/tmp/amazon.jpg', bucket, fileid, function(ret){

    console.log(ret);

    if (0 == ret.code) {
        var fileid = ret.data.fileid;

        // 查询
        tencentyun.imagev2.stat(bucket, fileid, function(ret) {
            console.log(ret);
        });

        var fileid = ret.data.fileid;

        // 生成私密下载url
        var expired = parseInt(Date.now() / 1000) + 60;
        var sign = tencentyun.auth.getAppSignV2(bucket, fileid, expired);
        console.log('downloadUrl is : ' + ret.data.downloadUrl + '?sign=' + sign);

        // 复制
        tencentyun.imagev2.copy(bucket, fileid, function(ret) {
            console.log(ret);
        });

        // 生成新的上传签名
        var expired = parseInt(Date.now() / 1000) + 60;
        var sign = tencentyun.auth.getAppSignV2(bucket, fileid, expired);
        console.log('sign is :'+sign);
        /*
        tencentyun.imagev2.delete(bucket, fileid, function(ret) {
            console.log(ret);
        });
        */
    }
});
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