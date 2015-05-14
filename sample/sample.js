var tencentyun = require('../');

tencentyun.image.upload('./154633894.jpg', function(ret){
    var fileid = ret.data.fileid;

    tencentyun.image.stat(fileid, function(ret) {
        console.log(ret);
    });

    var fileid = ret.data.fileid;
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

