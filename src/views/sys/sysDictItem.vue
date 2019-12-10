<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item"/>
      <el-button
        class="filter-item"
        @click="getListData({page:1,limit:10})"
        type="primary"
        icon="el-icon-search"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
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
      :header-cell-style="{background:tableHead}"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="流水号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="唯一标识" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="唯一Key值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isDeleted }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="230px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="addValue(scope.row)"
          >值管理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      class="page"
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />

    <el-dialog title="编辑" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left">
        <el-form-item label="流水号" prop="id" hidden="hidden">
          <el-input v-model="obj.id" placeholder="请输入流水号"/>
        </el-form-item>
        <el-form-item label="唯一标识" prop="code" hidden="hidden">
          <el-input v-model="obj.code" placeholder="请输入唯一标识"/>
        </el-form-item>
        <el-form-item label="唯一Key值" prop="dictKey">
          <el-input v-model="obj.dictKey" placeholder="请输入唯一Key值"/>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="obj.dictName" placeholder="请输入字典名称"/>
        </el-form-item>
        <el-form-item label="状态" prop="isDeleted">
          <el-input v-model="obj.isDeleted" placeholder="请输入是否删除 0-未删除 1-已删除"/>
        </el-form-item>
        <el-form-item label="创建人" prop="createBy" hidden="hidden">
          <el-input v-model="obj.createBy" placeholder="请输入创建人"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime" hidden="hidden">
          <el-input v-model="obj.createTime" placeholder="请输入创建时间"/>
        </el-form-item>
        <el-form-item label="修改人" prop="modifyBy" hidden="hidden">
          <el-input v-model="obj.modifyBy" placeholder="请输入修改人"/>
        </el-form-item>
        <el-form-item label="修改时间" prop="modifyTime" hidden="hidden">
          <el-input v-model="obj.modifyTime" placeholder="请输入修改时间"/>
        </el-form-item>
        <el-form-item label="创建Ip" prop="createIp" hidden="hidden">
          <el-input v-model="obj.createIp" placeholder="请输入创建Ip"/>
        </el-form-item>
        <el-form-item label="修改ip" prop="modifyIp" hidden="hidden">
          <el-input v-model="obj.modifyIp" placeholder="请输入修改ip"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="obj.sort" placeholder="请输入排序"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加字典值" :close-on-click-modal="false" :visible.sync="addDictItemKeyValue">
      <el-form ref="dataForm" :model="addDictItemKey" label-position="left">
        <el-form-item label="字典项" prop="dictKey">
          <el-input v-model="addDictItemKey.dictItemKey" placeholder="请输入字典项"/>
        </el-form-item>
        <el-form-item label="显示值" prop="dictName">
          <el-input v-model="addDictItemKey.displayValue" placeholder="请输入显示值"/>
        </el-form-item>
        <el-form-item label="数据值" prop="isDeleted">
          <el-input v-model="addDictItemKey.dictValue"/>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="addDictItemKey.sort" placeholder="请输入排序"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogdictItemKey = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="comfirmDictItemKey">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :close-on-click-modal="false" :visible.sync="dialogdictItemKey">
      <el-form ref="dataForm" :model="zdvalue" label-position="left">
        <el-form-item label="字典项" prop="dictKey">
          <el-input v-model="zdvalue.dictItemKey" placeholder="请输入字典项"/>
        </el-form-item>
        <el-form-item label="显示值" prop="dictName">
          <el-input v-model="zdvalue.displayValue" placeholder="请输入显示值"/>
        </el-form-item>
        <el-form-item label="数据值" prop="isDeleted">
          <el-input v-model="zdvalue.dictValue"/>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="zdvalue.sort" placeholder="请输入排序"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogdictItemKey = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="comfirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="字典值管理" border :visible.sync="valueManagement">
      <el-button size="mini" type="success" style="margin-bottom:10px;" @click="addValueItem">添加字典值</el-button>
      <el-table
        v-loading="listLoading"
        row-key="id"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="字典项" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dictItemKey}}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示值" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.displayValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据值" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dictValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="140px" align="center">
          <template slot-scope="scope">
            <div class="icon-sizeWidth">
              <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">编辑</el-button>
              <el-button size="mini" @click="deleteone(scope.row)" type="success">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定大师傅似的</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteObjs,
  getList,
  saveOrUpdate,
  getDictValuelist,
  updateDictValue,
  deleteDictValue,
  saveDictValue
} from "@/api/sys/SysDictItem";

export default {
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      addDictKey: "",
      addValueScope: "",
      code: "",
      list: [],
      tableData: [],
      addDictItemKeyValue: false,
      dialogdictItemKey: false,
      listLoading: false,
      valueManagement: false,
      dialogFormVisible: false,
      btnLoading: false,
      addDictItemKey: {
        dictItemKey: "",
        displayValue: "",
        dictValue: "",
        sort: ""
      },
      zdvalue: {
        dictItemKey: "",
        displayValue: "",
        dictValue: "",
        sort: ""
      },
      obj: {
        code: "",
        dictKey: "",
        dictName: "",
        isDeleted: "",
        sort: ""
      },
      rules: {
        dictKey: [
          { required: true, message: "请填写唯一Key值", trigger: "change" }
        ],
        dictName: [
          { required: true, message: "请填写字典名称", trigger: "change" }
        ],
        isDeleted: [
          {
            required: true,
            message: "请填写是否删除 0-未删除 1-已删除",
            trigger: "change"
          }
        ],
        sort: [{ required: true, message: "请填写排序", trigger: "change" }]
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      },
      valueData: {
        page: "1",
        limit: "10",
        dictItemKey: "SYS_PUSH_SMS_HOUR_MAX_NUM"
      }
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.obj = {
          id: "",
          code: "",
          dictKey: "",
          dictName: "",
          isDeleted: "",
          sort: ""
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
      // row.loading = true;
      this
        .$confirm("此操作将删除当前列, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteObjs(array).then(res => {
            row.loading = false;
            if (res.code == 0) {
              this.getListData({ page: 1, limit: 10 });
            }
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 值管理
    addValue(value) {
      this.$set(this, "addValueScope", value);
      this.addDictItemKey.dictItemKey = value.dictKey;
      this.valueManagement = true;
      this.valueData.dictItemKey = value.dictKey;
      getDictValuelist(this.valueData).then(res => {
        if (res.code == 0) {
          this.tableData = res.value.records;
        }
      });
    },
    // 编辑字典项
    addtwodeparm(val) {
      this.code = val.code;
      this.dialogdictItemKey = true;
      for (const key in this.zdvalue) {
        this.zdvalue[key] = val[key];
      }
    },
    // 确认添加字典值dictItemKey
    comfirmDictItemKey() {
      if (
        this.addDictItemKey.dictItemKey != "" &&
        this.addDictItemKey.displayValue != "" &&
        this.addDictItemKey.dictValue != ""
      ) {
        saveDictValue(this.addDictItemKey).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.addValue(this.addValueScope);
            // this.dialogFormVisible = false;
            this.addDictItemKeyValue = false;
            this.addDictItemKey.dictItemKey = "" ;
            this.addDictItemKey.displayValue = "" ;
            this.addDictItemKey.dictValue = "";
            this.addDictItemKey.sort="";
          } else {
            this.$message.warning(res.msg);
          }
        });
      } else {
        this.$message.warning("显示值、字典值、字典项 (必填)");
      }
    },
    // 确认编辑编辑字典项
    comfirm() {
      this.zdvalue.code = this.code;
      updateDictValue(this.zdvalue).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.addValue(this.addValueScope);
          this.dialogdictItemKey = false;
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 删除字典项
    deleteone(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDictValue(val.code).then(res => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              getDictValuelist(this.valueData).then(res => {
                if (res.code == 0) {
                  this.tableData = res.value.records;
                }
              });
            } else {
              this.$message.warning(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加字典项
    addValueItem() {
      this.addDictItemKeyValue = true;
    },
    // 查询字典项下的字典值
    getvaluedata(value) {},
    getListData(pageParam) {
      this.listLoading = true;
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
    }
  }
};
</script>

<style>
</style>
