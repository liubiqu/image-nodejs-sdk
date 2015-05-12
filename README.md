# tencentyun-image-node
nodejs sdk for [腾讯云万象图片与微视频服务](http://app.qcloud.com/image.html)

## 安装
npm install tencentyun

## 修改配置
修改conf.js内的appid等信息为您的配置

## 微视频上传、查询、删除程序示例
```javascript
var tencentyun = require('tencentyun');

//简单上传
tencentyun.video.upload('/tmp/085523020515bc3137630770.mp4');

//带有自定义信息的上传
tencentyun.video.upload('/tmp/085523020515bc3137630770.mp4', function(ret){

    var fileid = ret.data.fileid;
    // 查询
    tencentyun.video.stat(fileid, function(ret) {
        console.log(ret);
    });
    // 删除
    var fileid = ret.data.fileid;
    tencentyun.video.delete(fileid, function(ret) {
        console.log(ret);
    });

}, 'myvideos', {'title':'测试', 'desc':'这是一个测试'}, 'testimage');

```
