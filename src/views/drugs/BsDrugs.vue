<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" placeholder="药品名称/助记码" v-model="param" class="filter-item"/>
      <el-button
        class="filter-item"
        @click="getListData({page:1,limit:10})"
        type="primary"
        icon="el-icon-search"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        v-if="hasPermission('drug:edit')"
        icon="el-icon-edit"
        @click="dialogFormVisible=true"
      >新增</el-button>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="药品编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="药品名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="助记码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsSimpleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsSpec }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零售价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零售单位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsRetailUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库单位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.drugsWarehousingUnit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"   v-if="hasPermission('drug:edit')" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button type="primary"  v-if="hasPermission('drug:query')" size="mini" @click="preview(scope.row)">查看说明书</el-button>
          <el-button
            size="mini"
             v-if="hasPermission('drug:del')"
            type="danger"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left" label-width="80px">
        <div class="displayeidt">
          <div class="hospitaltDrug">
            <el-form-item label="药品名称" prop="drugsName">
              <el-input v-model="obj.drugsName" placeholder="请输入药品名称"/>
            </el-form-item>

            <el-form-item label="规格" prop="drugsSpec">
              <el-input v-model="obj.drugsSpec" placeholder="请输入规格"/>
            </el-form-item>
            <el-form-item label="零售价格" prop="drugsPrice">
              <el-input v-model="obj.drugsPrice" placeholder="请输入零售价格"/>
            </el-form-item>

            <el-form-item label="入库单位" prop="drugsWarehousingUnit">
              <el-input v-model="obj.drugsWarehousingUnit" placeholder="请输入入库单位"/>
            </el-form-item>
          </div>
          <div class="hospitaltDrug">
            <el-form-item label="药品编号" prop="drugsNo">
              <el-input v-model="obj.drugsNo" placeholder="请输入药品编号"/>
            </el-form-item>
            <el-form-item label="助记码" prop="drugsSimpleCode">
              <el-input v-model="obj.drugsSimpleCode" placeholder="请输入助记码"/>
            </el-form-item>
            <el-form-item label="零售单位" prop="drugsRetailUnit">
              <el-input v-model="obj.drugsRetailUnit" placeholder="请输入零售单位"/>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="preview" title="查看说明书" :visible.sync="previewDialogFormVisible">
      <iframe :src="instruction" frameborder="0" style="height:100%;width:100%"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { deleteObjs, getList, saveOrUpdate } from "@/api/drugs/BsDrugs";

export default {
  data() {
    return {
      list: [],
      param: "",
      listLoading: false,
      previewDialogFormVisible: false,
      dialogFormVisible: false,
      instruction:"",
      btnLoading: false,
      obj: {
        id: "",
        code: "",
        drugsName: "",
        drugsNo: "",
        drugsSimpleCode: "",
        drugsSpec: "",
        drugsPrice: "",
        drugsRetailUnit: "",
        drugsWarehousingUnit: "",
        isDeleted: "",
        createBy: "",
        createIp: "",
        createTime: "",
        modifyBy: "",
        modifyIp: "",
        modifyTime: "",
        instructionsUrl: ""
      },
      rules: {
        drugsName: [
          { required: true, message: "请填写药品名称", trigger: "change" }
        ],
        drugsNo: [
          { required: true, message: "请填写药品编号", trigger: "change" }
        ],
        drugsSimpleCode: [
          { required: true, message: "请填写助记码", trigger: "change" }
        ],
        drugsSpec: [
          { required: true, message: "请填写规格", trigger: "change" }
        ],
        drugsPrice: [
          { required: true, message: "请填写零售价格", trigger: "change" }
        ],
        drugsRetailUnit: [
          { required: true, message: "请填写零售单位", trigger: "change" }
        ],
        drugsWarehousingUnit: [
          { required: true, message: "请填写入库单位", trigger: "change" }
        ]
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.obj = {
          id: "",
          code: "",
          drugsName: "",
          drugsNo: "",
          drugsSimpleCode: "",
          drugsSpec: "",
          drugsPrice: "",
          drugsRetailUnit: "",
          drugsWarehousingUnit: "",
          isDeleted: "",
          createBy: "",
          createIp: "",
          createTime: "",
          modifyBy: "",
          modifyIp: "",
          modifyTime: "",
          instructionsUrl: ""
        };
        this.$refs["dataForm"].resetFields();
      }
    }
  },
  mounted() {
    this.getListData(this.pageQuery);
  },
  methods: {
    deleteObj(row) {
      var array = [];
      array.push(row.id);
      row.loading = true;
      deleteObjs(array).then(res => {
        row.loading = false;
        if (res.code == 0) {
          this.getListData({ page: 1, limit: 10 });
        }
      });
    },
    getListData(pageParam) {
      this.listLoading = true;
      pageParam.param = this.param;
      getList(pageParam).then(res => {
        this.listLoading = false;
        if (res.code == 0) {
          this.list = res.value.records;
          this.pageQuery.total = res.value.total;
          this.pageQuery.page = res.value.current;
          this.pageQuery.limit = res.value.size;
        }
      });
    },
    toEdit(row) {
      this.dialogFormVisible = true;
      this.obj = JSON.parse(JSON.stringify(row));
    },
    preview(row){
      // instructionsUrl
      this.previewDialogFormVisible=true;
      this.instruction=row.instructionsUrl;
    },
    editData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          saveOrUpdate(this.obj).then(res => {
            this.btnLoading = false;
            if (res.code == 0) {
              this.dialogFormVisible = false;
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.getListData({ page: 1, limit: 10 });
            }
          });
        }
      });
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.displayeidt {
  display: flex;
  justify-content: space-around;
}
.hospitaltDrug{
  width: 45%;
}
.dialog-footer{
  text-align: center;
}
.preview>>>.el-dialog__body{
  height: 70vh;
}
</style>

