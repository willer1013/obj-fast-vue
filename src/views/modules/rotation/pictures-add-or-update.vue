<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="图片名称" prop="picName">
        <el-input v-model="dataForm.picName" placeholder="图片名称"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="picUrl">
        <el-upload
          action=""
          :file-list="fileList"
          drag
          multiple
          :on-change="onChenge"
          list-type="picture"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text" v-html="$t('upload.text')"></div>
          <div class="el-upload__tip" slot="tip" >
            {{ $t("upload.tip", { format: "jpg、png、gif" }) }}
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        url: "",
        num: 0,
        fileList: [],
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          id: 0,
          picName: '',
          picUrl: ''
        },
        dataRule: {
          picName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ],
          // picUrl: [
          //   { required: true, message: '图片不能为空', trigger: 'change' }
          // ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
      init (id) {
        this.visible = true;
        this.$refs.dataForm?.resetFields();
        this.url = "https://guli123.oss-cn-beijing.aliyuncs.com/";
        this.num = 0;
        this.fileList = [];
        if(id){
          this.getInfo(id)
        }
      },
      async getInfo (id) {
        let res = await this.$api.photo.getbyid(id)
        this.dataForm = res.data.pictures
        console.log(this.dataForm)
      },
      async onChenge (file, fileList) {
        this.fileList = fileList;
        let res = await this.$api.aliyun.upLoadImage(file.url)
        console.log(res)
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate(async (valid) => {
          if (valid) {
            console.log(this.dataForm)
            let submitMethod = this.dataForm.id?'update':'save';
            let res = await this.$api.photo[submitMethod](this.dataForm)
            this.$message.success("成功");
            this.$emit('refreshDataList')
            this.visible = false;
            
          }
        })
      }
    }
  }
</script>
