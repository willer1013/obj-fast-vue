import $http from "../../utils/request.js";
import uploadFileToOss from '../../utils/ali-oss/uploadFile.js';
export const aliyun = {
	//上传图片
	upLoadImage(filePath/*文件路径*/,progressc/*上传进度回调函数，返回进度*/){
		return new Promise((resolve,reject)=>{
			uploadFileToOss(filePath,'',url => {
				//JSON.stringify({url})
				resolve(JSON.stringify({url}))
			 },err=>{
				 reject(err)
			 },progress=>{
				 progressc&&progressc(progress)
			 })
		})
	},
	//上传视频 aliyun-oss直传
	uploadVideo(videoPath/*文件路径*/,progressc/*上传进度回调函数，返回进度*/){
		console.log(videoPath);
		return new Promise((resolve,reject)=>{
			uploadFileToOss(videoPath,'',result => {
				resolve(result)
			 },err=>{
				 reject(err)
			 },progress=>{
				 progressc&&progressc(progress)
			 })
		})
		
	},
};