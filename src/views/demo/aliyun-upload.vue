<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      list-type="picture"
      :multiple="true"
      :http-request="importFile"
      :on-change="onChange"
      :on-remove="onRemove"
      :file-list="fileList"
      accept=".jpg,.jpeg,.png,gif,JPG,JPEG,PNG,GIF">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip" style="color:#fff">
        提示：仅允许上传“jpg”、“jpeg”、“png”或“gif”格式文件！
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button size="small" type="primary" @click="dataFormSubmit()" class="dialogBtn">上传</el-button>
      <el-button class="btnCancel dialogBtn" size="small" @click="visible = false">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        imgFileId: '',
        fileList: [],
        dataList:[],
        formData: null
      }
    },
    methods: {
      init (imgId) {
        this.visible = true
        this.imgFileId = imgId
        this.fileList = []
      },
      onChange (file, fileList) {
        // 这里做一些文件控制，注意：就算一次选取多个文件，这里依旧会执行多次
        let typeArray = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        let isJPG = typeArray.indexOf(file.raw.type)
        if (isJPG === -1) {
          this.$message.error('上传头像图片只能是 jpg、jpeg、png或gif 格式！！！')
          fileList.pop()
        }
        this.fileList = fileList
      },
      onRemove (file, fileList) {
        this.fileList = fileList
      },
      //自定义上传图片到阿里云逻辑
      importFile (e) {
        console.log(e);
        this.$api.aliyun.upLoadImage(e.file,(p)=>{
          console.log(p);
        })
        .then(url=>{
          console.log(url);
          this.dataList.push(url);
        })
        .catch(err=>{
          console.log(err);
        })
      },
      // 表单提交
      dataFormSubmit () {
        //这里处理上传数据逻辑
        console.log(this.dataList);
      }
    }
  }
</script>
