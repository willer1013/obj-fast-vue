<template>
  <div>
    <div class="my-2">
      <el-alert
        type="success"
        title="tinymce+powerpaste+xiumi微信公众号示例"
        :closable="false"
        show-icon
      ></el-alert>
      <tinymce class="rich_text_editor" v-model="richText"></tinymce>
    </div>
    <div class="my-2">
      <el-alert
        type="success"
        title="obj-table-plus示例"
        :closable="false"
        show-icon
      ></el-alert>
      <el-alert
        type="warning"
        title="obj-table-plus默认高度是填满其父组件的高度，因此需要显式地设置父组件高度"
        :closable="false"
        show-icon
      ></el-alert>
      <div style="height: 70vh">
        <obj-table-plus
          ref="oTable"
          @query="queryList"
          v-model="tableData"
          :tableEvent="{}"
          :tableCols="tableCols"
        >
        </obj-table-plus>
      </div>
      <div class="my-2">
        <el-alert
          type="success"
          title="obj-modal,集成了form表单和form弹窗+jsx"
          :closable="false"
          show-icon
        ></el-alert>
        <el-alert
          type="info"
          title="表单模式"
          :closable="false"
          show-icon
        ></el-alert>
        <obj-form
          ref="conditionForm"
          :formCols="pageData.modalForm"
          :formData="pageData.modalData"
        ></obj-form>
        <el-alert
          type="info"
          title="弹窗模式"
          :closable="false"
          show-icon
        ></el-alert>
        <obj-modal
          ref="modalRef"
          :modalConfig="pageData.modalConfig"
          :modalCols="pageData.modalForm"
          :modalData="pageData.modalData"
          :modalHandles="pageData.modalHandles"
          @closeModal="closeModal()"
        ></obj-modal>
        <el-button @click="openModal"> 点击打开弹窗 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce/index.vue";
const mockData = [
  {
    name: "小明",
    gender: "男",
    age: 17,
    info: "干净又卫生",
    edit: "请填写你的数据",
  },
  {
    name: "马沙拉",
    gender: "男",
    age: 17,
    info: "干净又卫生",
    edit: "请填写你的数据",
  },
  {
    name: "蒙娜丽莎",
    gender: "女",
    age: 30,
    info: "干净又卫生",
    edit: "请填写你的数据",
  },
];
export default {
  components: { Tinymce },
  data() {
    return {
      richText: "",
      //表格数据
      tableData: [],
      pageData: {
        //modal配置 start
        modalConfig: {
          title: "新增", //弹窗标题,值为:新增，查看，编辑
          show: false, //弹框显示
          formEditDisabled: false, //编辑弹窗是否可编辑
          width: "700px", //弹出框宽度
          modalRef: "modalRef", //modal标识
          type: "1", //类型 1新增 2编辑 3保存
        },
        //modal配置 end
        //modal表单 start
        modalForm: [
          {
            type: "Input",
            label: "姓名",
            prop: "username",
          },
          {
            type: "Input",
            label: "手机号码",
            prop: "userCellphone",
          },
          {
            type: "Select",
            label: "直属部门",
            data: [],
            prop: "departmentName",
          },
          {
            type: "Input",
            label: "固定工资",
            prop: "userFixedSalary",
          },
          {
            type: "Input",
            label: "备用号码",
            prop: "userCellphone2",
          },
          {
            type: "Input",
            label: "住宿地址",
            prop: "liveAddress",
          },
          {
            type: "Date",
            label: "入职日期",
            prop: "entryDay",
          },
          {
            type: "Date",
            label: "出生日期",
            prop: "birthDay",
          },
          {
            type: "Input",
            label: "开户行",
            prop: "accountBank",
          },
          {
            type: "Input",
            label: "户名",
            prop: "accountName",
          },
          {
            type: "Input",
            label: "账号",
            prop: "accountNumber",
          },
          {
            type: "Input",
            label: "QQ",
            prop: "userQq",
          },
          {
            type: "Input",
            label: "微信号",
            prop: "userWx",
          },
          {
            type: "Input",
            label: "身份证号",
            prop: "userIdNumber",
          },
          {
            type: "Input",
            label: "户籍地址",
            prop: "userAddress",
          },
          {
            type: "Input",
            label: "备注",
            prop: "userRemark",
          },
        ],
        //modal表单 end
        //modal 数据 start
        modalData: {},
        //modal 数据 end
        //modal 按钮 start
        modalHandles: [
          {
            label: "取消",
            type: "default",
            handle: () => this.closeModal(),
          },
          {
            label: "提交",
            type: "primary",
            handle: () => this.$refs.modalRef.validate(),
          },
        ],
      },
    };
  },
  methods: {
    queryList(pageNo, pageSize) {
      //pageNo pageSize是用来分页,obj-table-plus内部处理了分页逻辑
      setTimeout(() => {
        //第一个参数传服务器返回的数据,第二个传数据总数告诉obj-table-plus一共有多少数据，以自动处理分页
        this.$refs.oTable.complete(mockData, 1000);
      }, 1000);
    },
    //打开弹窗
    openModal() {
      this.pageData.modalConfig.show = true;
    },
    //关闭弹窗
    closeModal() {
      this.$refs["modalRef"].resetFields(); //校验重置
      this.pageData.modalConfig.show = false; //关闭modal
    },
  },
  computed: {
    tableCols() {
      return [
        {
          field: "name",
          title: "姓名",
          "min-width": "150",
        },
        {
          field: "gender",
          title: "性别",
          "min-width": "150",
        },
        {
          field: "age",
          title: "年龄",
          "min-width": "150",
        },
        {
          field: "info",
          title: "介绍",
          "min-width": "150",
        },
        {
          field: "edit",
          title: "编辑",
          width: "250",
          type: "jsx",
          render: ({ row }) => {
            return <el-input v-model={row.edit}></el-input>;
          },
        },
        {
          field: "edit",
          title: "操作",
          width: "280",
          fixed: "right",
          type: "jsx",
          render: ({ row }) => {
            return (
              <div>
                <el-button size="mini" type="primary">
                  编辑
                </el-button>
                <el-button size="mini" type="danger">
                  删除
                </el-button>
                <el-button size="mini" onClick={this.openModal}>
                  打开model弹窗
                </el-button>
              </div>
            );
          },
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.rich_text_editor {
  height: 800px;
}
</style>