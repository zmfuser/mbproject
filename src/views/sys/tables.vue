<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入表名" v-model="tableName" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" @click="getListData()" type="primary" icon="el-icon-search">查询
      </el-button>
      <br>
      <br>
      <br>
      <el-input placeholder="请输入模块名" v-model="moduleName" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="请输入作者" v-model="author" style="width: 200px;" class="filter-item"/>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading" :header-cell-style="{background:tableHead}"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="表名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="generateCode(scope.row)">
            代码生成
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import request from '@/utils/request'

  export default {
    data() {
      return {
        tableHead: "rgba(228,248,245,1)",
        listLoading: false,
        list: [],
        tableName: "",
        moduleName:"",
        author:""
      }
    },
    methods: {
      toEdit(obj, type) {
        obj = JSON.parse(JSON.stringify(obj));
        if (type == 2) {
          obj.id = null;
          obj.name = null;
          obj.version = null;
          obj.value = null;
        }
        this.dict = obj;
        this.dialogFormVisible = true;
      },
      generateCode(tableName){
        if (this.isEmpty(this.moduleName)) {
          this.$message.error("请输入模块名");
          return;
        }
        if (this.isEmpty(this.author)) {
          this.$message.error("请输入作者");
          return;
        }
        request({
          url: '/index/generator',
          method: 'post',
          data:JSON.stringify({
            tableName:tableName,
            moduleName:this.moduleName,
            author:this.author,
          })
        }).then(res => {
          if (res.code == 0) {
            this.$message.success("生成成功");
          }
        })
      },
      getListData() {
        if (this.isEmpty(this.tableName)) {
          this.$message.error("请输入表名查询");
          return;
        }
        this.listLoading=true;
        request({
          url: '/index/get-tables/' + this.tableName,
          method: 'get',
        }).then(res => {
          this.listLoading=false;
          if (res.code == 0) {
              this.list=res.value;
          }
        })

      },
    }
  }
</script>

<style>
</style>
