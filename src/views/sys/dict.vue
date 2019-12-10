<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="querys.type" placeholder="请选择类型">
        <el-option
          v-for="item in typeOptions"
          :label="item.description"
          :value="item.type">
        </el-option>
      </el-select>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
      <el-button v-if="hasPermission('dict:edit')" class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button>
    </div>
    <br>
    <br>
    <el-table :header-cell-style="{background:tableHead}"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="字典名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" v-if="hasPermission('dict:edit')" size="mini" @click="toEdit(scope.row,1)">
            编辑
          </el-button>
          <el-button type="primary" v-if="hasPermission('dict:edit')" size="mini" @click="toEdit(scope.row,2)">
            增加同级
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination class="page" v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dict" label-position="left">
        <el-form-item label="字典名称(如:男)" prop="name">
          <el-input v-model="dict.name" placeholder="请输入字典名称"/>
        </el-form-item>
        <el-form-item label="字典值(如:1)" prop="value">
          <el-input v-model="dict.value" placeholder="请输入字典值"/>
        </el-form-item>
        <el-form-item label="字典类型(如:gender)" prop="type">
          <el-input v-model="dict.type" placeholder="请输入字典类型"/>
        </el-form-item>
        <el-form-item label="字典描述(如:性别)" prop="description">
          <el-input v-model="dict.description" placeholder="请输入字典描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="submitDict">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {getList, saveOrUpdate, getTypes} from '@/api/sys/dict'

  export default {
    data() {
      return {
        tableHead: "rgba(228,248,245,1)",
        dialogFormVisible: false,
        listLoading: false,
        btnLoading: false,
        list: [],
        typeOptions: [],
        pageQuery: {
          total: 0,
          page: 1,
          limit: 10
        },
        dict: {
          name: "",
          value: "",
          description: "",
          type: ""
        },
        rules: {
          name: [
            {required: true, message: '请输入字典名称'}
          ],
          value: [
            {required: true, message: '请输入字典值'}
          ],
          type: [
            {required: true, message: '请输入字典类型'}
          ],
          description: [
            {required: true, message: '请输入字典描述'}
          ],
        },
        querys: {
          type: ""
        }
      }
    },
    watch: {
      dialogFormVisible(val) {
        if (!val) {
          this.dict = {
            name: "",
            value: "",
            description: "",
            type: ""
          }
          this.$refs.dataForm.resetFields();
        }
      }
    },
    mounted() {
      this.getListData({page: 1, limit: 10});
      this.initTypes();
    },
    methods: {
      initTypes(){
        getTypes().then(res => {
          if (res.code == 0) {
            this.typeOptions = res.value;
            this.typeOptions.unshift({
              type:"",
              description:"请选择"
            })
          }
        })
      },
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
      getListData(pageQueryParam) {
        pageQueryParam.type = this.querys.type;
        this.listLoading = true;
        getList(pageQueryParam).then(response => {
          this.listLoading = false;
          if (response.code == 0) {
            let value = response.value;
            this.list = value.records;
            this.pageQuery.total = value.total;
            this.pageQuery.page = value.current;
            this.pageQuery.limit = value.size;
          }
        })
      },
      submitDict() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            saveOrUpdate(this.dict).then(res => {
              this.btnLoading = false;
              if (res.code == 0) {
                this.dialogFormVisible = false;
                this.getListData({page: 1, limit: 10});
                this.initTypes();
              }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style>
</style>
