var tencentyun = require('../');

// 自定义空间名称，在http://console.qcloud.com/image/bucket创建
var bucket = 'face';

//TODO: 前三个参数在https://console.qcloud.com/ci/secret查看，bucket在https://console.qcloud.com/ci/bucket 查看
tencentyun.conf.setAppInfo('111', 'secretid', 'secretkey', bucket);

//智能鉴黄
var pornUrl = 'http://b.hiphotos.baidu.com/image/pic/item/8ad4b31c8701a18b1efd50a89a2f07082938fec7.jpg';
tencentyun.imageprocess.pornDetect(pornUrl, function(ret){
    console.log('智能鉴黄imageprocess.pornDetect',ret);
});
//
// var face1 = 'http://face-1253351908.costj.myqcloud.com/07147bb99b25b908444221e236ba956d.jpg';
// // 个体信息创建
// tencentyun.face.newPerson(['8021M'], '1890502xxxx', face1, '刘必渠', 'student', function (data) {
//     console.log('newPerson', data);
// });
//
// tencentyun.face.getPersonIds('8021M', function (data) {
//     console.log('getPersonIds', data);
// });
//
// tencentyun.face.delPerson( '18905029911', function (data) {
//     console.log('个体信息创建.delPerson', data);
// });
//
// //个体信息信息获取
// tencentyun.face.getInfo('1890502xxxx', function (data) {
//     console.log('getInfo', data);
// });
//
// //人脸验证
// tencentyun.face.verify('1890502xxxx', face1,  function (data) {
//     console.log('verify', data, data.candidates);
// });
//
// //人脸检索
// tencentyun.face.identify('8021M', face1,  function (data) {
//     console.log('人脸检索.identify', data, data.candidates);
// });

// tencentyun.imageprocess.pornDetect(face1, function(ret){
//     console.log('智能鉴黄imageprocess.pornDetect11',ret);
// });
//
// //智能鉴黄-Url
// var pornUrl = [
//         'http://b.hiphotos.baidu.com/image/pic/item/8ad4b31c8701a18b1efd50a89a2f07082938fec7.jpg',
//         'http://c.hiphotos.baidu.com/image/h%3D200/sign=7b991b465eee3d6d3dc680cb73176d41/96dda144ad3459829813ed730bf431adcaef84b1.jpg',
//     ];
// tencentyun.imageprocess.pornDetectUrl(pornUrl, function(ret){
//     console.log('智能鉴黄imageprocess.pornDetectUrl',ret);
// });

// //智能鉴黄-File
// var pornFile = [
//         'D:/porn/test1.jpg',
//         'D:/porn/test2.jpg',
//         '../../../../../porn/test3.png',
//     ];
// tencentyun.imageprocess.pornDetectFile(pornFile, function(ret){
//     console.log(ret);
// });

// // 自定义文件名
// var fileid = 'sample' + parseInt(Date.now() / 1000);
//
// tencentyun.imagev2.upload('/tmp/amazon.jpg', bucket, fileid, function(ret){
//
//     console.log(ret);
//
//     if (0 == ret.code) {
//         var fileid = ret.data.fileid;
//
//         // 查询
//         tencentyun.imagev2.stat(bucket, fileid, function(ret) {
//             console.log(ret);
//         });
//
//         var fileid = ret.data.fileid;
//
//         // 生成私密下载url
//         var expired = parseInt(Date.now() / 1000) + 60;
//         var sign = tencentyun.auth.getAppSignV2(bucket, fileid, expired);
//         console.log('downloadUrl is : ' + ret.data.downloadUrl + '?sign=' + sign);
//
//         // 复制
//         tencentyun.imagev2.copy(bucket, fileid, function(ret) {
//             console.log(ret);
//         });
//
//         // 生成新的上传签名
//         var expired = parseInt(Date.now() / 1000) + 60;
//         var sign = tencentyun.auth.getAppSignV2(bucket, fileid, expired);
//         console.log('sign is :'+sign);
//         /*
//         tencentyun.imagev2.delete(bucket, fileid, function(ret) {
//             console.log(ret);
//         });
//         */
//     }
// });