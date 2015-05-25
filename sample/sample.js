var tencentyun = require('../');

tencentyun.conf.setAppInfo('200679', 'AKIDoleG4e6U0j6EVQcjWXxzSO2Vv7Hqlgp2', 'ROlw3XYdNXNnII18ATs6zd7m5mivnApa');

tencentyun.image.upload('/tmp/amazon.jpg', function(ret){
    var fileid = ret.data.fileid;

    tencentyun.image.stat(fileid, function(ret) {
        console.log(ret);
    });

    var fileid = ret.data.fileid;

    tencentyun.image.copy(fileid, function(ret) {
        console.log(ret);
        var sign = tencentyun.auth.appSign(ret.data.downloadUrl, 0);
        console.log(ret.data.downloadUrl + '?sign=' + sign);
    });

    tencentyun.image.delete(fileid, function(ret) {
        console.log(ret);
    });
});


tencentyun.video.upload('/tmp/085523020515bc3137630770.mp4');

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

