<template>
  <div class="mod-role">
    <el-form :inline="true"  @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-form-item>
          <el-input v-model="speed" placeholder="设置速度" clearable></el-input>
        </el-form-item>
         <el-button  type="primary" @click="setSpeed()" >设置速度</el-button>
        <el-button v-if="isAuth('sys:role:save')" type="primary" @click="addOrUpdateHandle()" >新增</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
        </el-table-column>
      <el-table-column
        prop="picName"
        header-align="center"
        align="center"
        label="图片名称">
      </el-table-column>
      <el-table-column 
      prop="picImg" 
      label="图片"
      header-align="center"
    align="center"
        >
        <template v-slot="scope">
            <img :src="scope.row.picUrl" alt="" width="90" height="90">
        </template>
        </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:role:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:role:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './pictures-add-or-update.vue'
  export default {
    data () {
      return {
        dataList: [],
        pageIndex: 1,
        speed:1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    created(){
      this.getSpeed()
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      async getDataList () {
        
        this.dataListLoading = true
        let {data:{page}} = await this.$api.photo.getAll(this.pageIndex,this.pageSize);
        this.dataList = [...page.list];
        console.log(page.list)
        this.totalPage = page.totalCount;
        this.dataListLoading = false;
        console.log(data)
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      async getSpeed(){
         let {data:{msg}} = await this.$api.photo.getSpeed();
         this.speed = msg;
      },
      // 设置速度
      async setSpeed(){
        let {data} = await this.$api.photo.updateSpeed(this.speed);
        this.$message.success("成功")
        this.getSpeed();
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        console.log(ids)
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.photo.delete(ids).then(() => {
                this.$message.success('操作成功')
                this.getDataList()
            })
        }).catch(() => {})
      }
    }
  }
</script>
