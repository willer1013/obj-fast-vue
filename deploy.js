/**
 *  deployJS
 *  自动化部署脚本
 */
 const path = require('path');
 const Client = require('ssh2').Client;// 引入ssh客户端
 const ora = require('ora');
 const compressing = require('compressing')
 const onUploadToServerLoading = ora('正在发布到服务器...');
 const config={
     targetDeployServerPath:'/www/wwwroot/',//目标部署至服务器的路径
     serverDeployedDirName:'obj.com',// 部署至服务器后的那个目录名
     localProductPath:'./dist/', //本地项目打包后的路径
     localWaitingUploadFileName:'./dist.zip', //本地要上传的文件全名
     host: '192.168.0.1', // 服务器地址
     port: 22, // 端口号
     username: 'root', // 用户名
     password: 'root',//密码
     onlineUrl: 'http://obj.com',//线上地址
 }
 // 部署函数
 async function deploy() {
   // 第一步 打包。
   // 第二步，压缩目录
   await new Promise((resolve, reject) => {
     const dir = path.resolve(process.cwd(), config.localProductPath) // 待压缩目录
     const dest = path.resolve(process.cwd(), config.localWaitingUploadFileName) // 压缩后存放目录和文件名称
     compressing.zip.compressDir(dir, dest).then(rs => {
       console.log('压缩成功:' + rs)
       resolve()
     }, err => {
       reject(err)
     })
   })
 
   // 第三步，上传linux服务器
   !(() => {
     onUploadToServerLoading.start();
     const connect = new Client()
 
     // 连接linux服务器
     // 异步进行，先注册连接状态的监听事件
     setTimeout(() => {
       connect.connect({
         host: config.host,
         port: config.port,
         username: config.username,
         password: config.password
       })
     })
 
     // 连接成功
     connect.on('ready', async () => {
       // 上传文件到linux服务器
       // 先连接sftp
       await new Promise((resolve, reject) => {
         connect.sftp((err, sftp) => {
           // sftp连接失败，退出
           if (err) {
             reject(err)
             return
           }
 
           // sftp连接成功，发起上传
           const file = path.resolve(process.cwd(), config.localWaitingUploadFileName) // 要上传的文件
           const dest = `${config.targetDeployServerPath}${config.serverDeployedDirName}.zip` //  linux下存放目录和文件名称。
           sftp.fastPut(file, dest, (err, res) => {
             if (err) {
               reject(err) // 上传失败
             } else {
               resolve() // 上传成功
             }
           })
         })
       })
       onUploadToServerLoading.stop();
 
       // 执行shell脚本
       // 对上传的文件进行解压
       await new Promise((resolve, reject) => {
         // 先进行shell连接
         connect.shell((err, stream) => {
           // 连接失败退出
           if (err) {
             reject(err)
             return
           }
 
           // 到目录下删除源目录,再解压zip包,重命名目录,再删除掉zip包
           stream.write(`cd ${config.targetDeployServerPath} && rm -rf ./${config.serverDeployedDirName}/ && unzip ${config.serverDeployedDirName}.zip && mv ./dist ${config.serverDeployedDirName} && rm -r -f ${config.serverDeployedDirName}.zip \nexit\n`)
 
           stream.on('close', err => {
             connect.end()
             if (err) {
               console.error(err)
               return
             }
             console.info(`恭喜🎉部署成功,线上网址:http://${config.host}/${config.serverDeployedDirName}`)
           })
 
           let buf = ''
           stream.on('data', data => {
             buf += data
             console.log(buf)
           })
         })
       })
 
     })
 
     // 连接错误
     connect.on('error', (err) => {
       console.log('*******连接出错*******')
     })
 
     // 连接关闭
     connect.on('end', () => {
       console.log('*******连接关闭*******')
     })
 
     // 连接异常关闭
     connect.on('close', (err) => {
       if (err) console.log('*******连接出错*******')
     })
 
   })()
 
 }
 
 // 执行一键部署
 deploy()
 
 