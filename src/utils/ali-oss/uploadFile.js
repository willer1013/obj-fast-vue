import axios from 'axios';
const env = require('./config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;
const base64 = require('./base64.js');//Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

/*
 *上传文件到阿里云oss
 *@param - filePath :文件的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */ 
const uploadFile = function (filePath, dir, successc, failc,progressc) {
  if (!filePath) {
    console.log("文件错误,请重试",filePath);
    return;
  }
  //文件名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给文件命名的
  const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150);
  
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);//获取签名
 
  const formData=new FormData();
  formData.append("key",aliyunFileKey);
  formData.append("policy",policyBase64);
  formData.append("OSSAccessKeyId",accessid);
  formData.append("signature",signature);
  formData.append("success_action_status",200);
  formData.append("file",filePath);
  axios({
    method:"post",
    url:aliyunServerURL,
    data:formData,
    headers:{
      'Content-type' : 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      let progress = (progressEvent.loaded / progressEvent.total * 100 | 0);
      progressc&&progressc(progress);
    }
  })
  .then((res)=>{
    console.log(res);
    console.log(aliyunServerURL+aliyunFileKey);
    if (res.status != 200) {
      failc(new Error('上传错误:' + res))
      return;
    }
    console.log(res);
    successc(aliyunServerURL+aliyunFileKey);
  })
  .catch((err)=>{
    console.log(err);
    err.wxaddinfo = aliyunServerURL;
    failc(err);
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 1024 * 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = base64.encode(JSON.stringify(policyText));
	console.log(policyBase64);
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);
console.log(signature);
  return signature;
}

export default uploadFile;