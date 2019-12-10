<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="input" class="filter-item"/>
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
      :header-cell-style="{background:tableHead}"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属菜单,前端判断并展示菜单使用," align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.menuCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单的中文释义" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.menuName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限的代码/通配符,对应代码中@RequiresPermissions 的value" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.permissionCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本权限的中文释义" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.permissionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
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

    <el-dialog title="编辑"  :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left">
        <el-form-item label="归属菜单,前端判断并展示菜单使用," prop="menuCode">
          <el-input v-model="obj.menuCode" placeholder="请输入归属菜单,前端判断并展示菜单使用,"/>
        </el-form-item>
        <el-form-item label="菜单的中文释义" prop="menuName">
          <el-input v-model="obj.menuName" placeholder="请输入菜单的中文释义"/>
        </el-form-item>
        <el-form-item label="权限的代码/通配符,对应代码中@RequiresPermissions 的value" prop="permissionCode">
          <el-input
            v-model="obj.permissionCode"
            placeholder="请输入权限的代码/通配符,对应代码中@RequiresPermissions 的value"
          />
        </el-form-item>
        <el-form-item label="本权限的中文释义" prop="permissionName">
          <el-input v-model="obj.permissionName" placeholder="请输入本权限的中文释义"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, saveOrUpdate, deleteObjs } from "@/api/sys/SysPermission";
export default {
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      list: [],
      input:"",
      listLoading: false,
      dialogFormVisible: false,
      btnLoading: false,
      obj: {
        id: "",
        menuCode: "",
        menuName: "",
        permissionCode: "",
        permissionName: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "请填写自定id,主要供前端展示权限列表分类排序使用.",
            trigger: "change"
          }
        ],
        menuCode: [
          {
            required: true,
            message: "请填写归属菜单,前端判断并展示菜单使用,",
            trigger: "change"
          }
        ],
        menuName: [
          { required: true, message: "请填写菜单的中文释义", trigger: "change" }
        ],
        permissionCode: [
          {
            required: true,
            message:
              "请填写权限的代码/通配符,对应代码中@RequiresPermissions 的value",
            trigger: "change"
          }
        ],
        permissionName: [
          {
            required: true,
            message: "请填写本权限的中文释义",
            trigger: "change"
          }
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
          menuCode: "",
          menuName: "",
          permissionCode: "",
          permissionName: ""
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
