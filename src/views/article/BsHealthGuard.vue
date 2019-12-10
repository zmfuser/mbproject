<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="div-flex">
        <div>
          <div class="marginTop" >
            <label>标题：</label>
            <el-input
              v-model="Attendance.title"
              placeholder="请输入标题"
              style="width: 200px; margin-left:15px"
              class="filter-item" 
              
            ></el-input>
          </div>
          <div class="marginTop">
            <label for>创建人：</label>
            <el-input
              v-model="Attendance.createName"
              placeholder="请输入创建人"
              style="width: 200px;"
              class="filter-item"
            ></el-input>
          </div>
        </div>
        <div>
          <div class="marginTop">
            <label for>状态：</label>
            <el-select v-model="Attendance.dataStatus" filterable placeholder="请选择状态">
              <el-option
                v-for="item in dataStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="marginTop">
            <label for>分类：</label>
            <el-select v-model="Attendance.articleType" filterable placeholder="请选择分类">
              <el-option
                v-for="item in articleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="button-seach-regi">
        <el-button
          plain
          icon="el-icon-search"
          class="search"
          @click="getListData({page:1,limit:10})"
        >搜索</el-button>
        <el-button class="reset" @click="resetBtn({page:1,limit:10})">
          <img src="../../../static/png/manbin_icon_chongzhi.png" />重置
        </el-button>
      </div>
      <div class="addArticle">
        <el-button plain class="search" @click="addArticle" v-if="hasPermission('ueditor:edit')">添加文章</el-button>
      </div>
    </div>
    <br />
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
      <el-table-column label="标题图片" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.titleImage" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.articleType | articleType}}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus |articleStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人名字" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.reviewerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.auditNote }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shareAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="推送人群" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pushCrowd |sentUserType}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="editData(scope.row)" v-if="hasPermission('ueditor:edit')">编辑</el-button>
          <el-button type="primary" size="mini" @click="Audit(scope.row)" 	v-if="hasPermission('ueditor:audit')">审核</el-button>
          <el-button type="success" size="mini" @click="priview(scope.row)">预览</el-button>
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
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />
    <el-dialog title="文章审核" :visible.sync="hide.dialogTableVisible">
      <div>
        <span>审核结果：</span>
        <el-radio-group v-model="radio">
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>审核备注：</span>
        <div style="margin-top:12px;">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="auditNote"></el-input>
        </div>
      </div>
      <div class="fontCenter">
        <el-button size="mini" type="primary" @click="Auditafrim">确认</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <div class="dialog">
      <el-dialog width="423px" :visible.sync="dialogVisible">
      <!-- style="background-image: url('')" -->
      <div class="view">
        <img src="../../../static/img/shouji_moxin_bai@2x.png" alt />
        <div class="content">
          <div class="article_head">
            <div class="article_img">
              <img :src="phoneView.originalImgUrl" alt />
            </div>
            <div class="article_content">
              <div>
                <span class="name">{{phoneView.doctorName}}</span>
                <span class="department">{{phoneView.departmentLevel1Name}}</span>
              </div>
              <div>
                <span class="hospital">{{phoneView.hospitalName}}</span>
                <span class="team">{{phoneView.hospitalName}}</span>
              </div>
              <div class="adept" title="擅长：医学博士，2010年获取博士学位，擅长培养房价低首付几点上飞机啊">
                <span>{{phoneView.remark}}</span>
              </div>
            </div>
          </div>
          <div v-html="phoneView.articleContent" class="box"></div>
        </div>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { deleteObjs, getList, saveOrUpdate,approvalArticle } from "@/api/article/BsHealthGuard";
import {findDoctor} from "@/api/im/checkIm.js";
export default {
  data() {
    return {
      auditNote:"",
      hide: {
        dialogTableVisible: false
      },
      radio:"",
      dataStatus: [
        { value: 0, label: "草稿" },
        { value: 1, label: "待审核" },
        { value: 2, label: "审核通过" },
        { value: 3, label: "审核失败" }
      ],
      articleType: [
        { value: 1, label: "糖尿病" },
        { value: 2, label: "高血压" },
        { value: 3, label: "冠心病" },
        { value: 4, label: "慢阻肺" }
      ],
      Attendance: {
        title: "",
        createName: "",
        dataStatus: "",
        articleType: ""
      },
      list: [],
      phoneView:{},
      listLoading: false,
      dialogFormVisible: false,
      btnLoading: false,
      audit:{},
      dialogVisible:false,
      articleContent:"",
      obj: {
        id: "",
        code: "",
        isDeleted: "",
        createBy: "",
        createIp: "",
        createTime: "",
        modifyBy: "",
        modifyIp: "",
        modifyTime: "",
        titleImage: "",
        title: "",
        articleType: "",
        dataStatus: "",
        reviewerCode: "",
        auditNote: "",
        readAmount: "",
        shareAmount: "",
        pushCrowd: "",
        articleContent: "",
        reviewerName: "",
        createName: ""
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
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
    cancel(){
       let _this = this;
      _this.hide.dialogTableVisible = false;
       _this.$message('已取消审核');
    },
    // 审核文章
    Audit(value) {
      let _this = this;
      _this.hide.dialogTableVisible = true;
      _this.audit=value
    },
    // 审核文章-确认
    Auditafrim(){
      let _this=this
      let obj={};
      obj.code=_this.audit.code
      obj.dataStatus=_this.radio;
      obj.auditNote=_this.auditNote;
      obj.reviewerName=_this.$store.state.user.dataUser.name;
      obj.reviewerCode=_this.$store.state.user.dataUser.id;
      approvalArticle(obj).then(res=>{
        if(res.code==0){
          _this.$message.success(res.msg)
        }else if(res.code==-1){
          _this.$message.error(res.msg)
        }
      })
    },
    // 重置
    resetBtn(pageParam) {
      let _this = this;
      (_this.Attendance.title = ""),
        (_this.Attendance.createName = ""),
        (_this.Attendance.dataStatus = ""),
        (_this.Attendance.articleType = "");
      getList(pageParam).then(res => {
        _this.listLoading = false;
        if (res.code == 0) {
          _this.list = res.value.records;
          _this.pageQuery.total = res.value.total;
          _this.pageQuery.page = res.value.current;
          _this.pageQuery.limit = res.value.size;
        }
      });
    },
    // 预览
    priview(value) {
      let _this = this;
      _this.$set(_this,"phoneView",[])
      _this.dialogVisible = true;
      let content=value.createBy
      findDoctor({doctorCode:content}).then(res=>{
      _this.$set(_this,"phoneView",res.value[0])
      _this.$set(_this.phoneView,"articleContent",value.articleContent)
      })
     
    },
    // 添加文章
    addArticle() {
      let _this = this;
      _this.$router.push("/UEditor");
    },
    // 查询
    getListData(pageParam) {
      (pageParam.title = this.Attendance.title),
        (pageParam.createName = this.Attendance.createName),
        (pageParam.dataStatus = this.Attendance.dataStatus),
        (pageParam.articleType = this.Attendance.articleType);
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
    // toEdit(row) {
    //   this.dialogFormVisible = true
    //   this.obj = JSON.parse(JSON.stringify(row))

    //   this.$router.push("/HealthGuardian/editUEditor")
    // },
    // 编辑
    editData(value) {
      sessionStorage.setItem("editData", JSON.stringify(value));
      this.$router.push("/editUEditor");
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
.el-dialog__body .view > img {
  width: 100%;
  height: 750px;
}
.dialog >>> .el-dialog {
  background: transparent !important;
  box-shadow: none !important;
}
.dialog >>> .el-dialog__header {
  background-color: transparent !important;
}
.dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: transparent !important;
}
.view {
  position: relative;
}
.content {
  width: 337px;
  height: 583px;
  background: #fff;
  position: absolute;
  top: 88px;
  left: 23px;
  overflow: hidden;
  overflow-y: auto
}
  .article_head {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  /* font-size: 1rem; */
}

  .article_head > .article_content,
.article_img {
  display: inline-block;
}

  .article_head > .article_content {
  width: 75%;
}

  .article_head .article_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 60px;
}

  .article_head .article_img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.article_content > div {
  margin-top: 10px;
}

  .article_head .article_content .name {
  color: #333;
  /* font-size: 16px; */
  padding-right: 12px;
}

  .article_head .article_content .department {
  color: #666;
  font-size: 16px;
}

  .article_head .article_content .hospital {
  color: #666;
  /* font-size: 16px; */
  padding-right: 12px;
}

  .article_head .article_content .team {
  color: #666;
  /* font-size: 16px; */
  padding-left: 12px;
}

  .article_head .article_content .adept {
  color: #666;
  /* font-size: 16px; */
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.content>>>.video-js{
  max-width: 200px !important;
  height: 320px;
}
.content>>>img{
  max-width: 336px !important;
}










.doctorImg {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.doctorImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.marginTop {
  margin-top: 10px;
}
.fontCenter{
  text-align: center;
  margin-top:10px;
}

</style>
