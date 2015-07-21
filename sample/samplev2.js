var tencentyun = require('../');

tencentyun.conf.setAppInfo('10000002', 'AKIDL5iZVplWMenB5Zrx47X78mnCM3F5xDbC', 'Lraz7n2vNcyW3tiP646xYdfr5KBV4YAv');

var bucket = 'test1';
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

        // 复制
        tencentyun.imagev2.copy(bucket, fileid, function(ret) {
            console.log(ret);
            // 生成私密下载url
            var sign = tencentyun.auth.appSignV2(ret.data.downloadUrl, 0);
            console.log('downloadUrl is : ' + ret.data.downloadUrl + '?sign=' + sign);
        });

        // 生成新的上传签名
        var expired = parseInt(Date.now() / 1000) + 60;
        // http://test1-10000002.image.myqcloud.com/test1-10000002/0/sample1436341553/
        // http://[bucket]-[appid].image.myqcloud.com/[bucket]-[appid]/[userid]/[fileid]/
        var sign = tencentyun.auth.appSignV2('http://test1-10000002.image.myqcloud.com/test1-10000002/0/sample1436341553/', expired);
        console.log('sign is :'+sign);
        /*
        tencentyun.imagev2.delete(bucket, fileid, function(ret) {
            console.log(ret);
        });
        */
    }
});