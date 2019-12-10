<template>
  <div>
    <!-- <div class="port">
     <div @click="doprint()"><img src="../../../../static/png/print.png" alt="">打印</div>
     <div @click="checkTable"><img src="../../../../static/png/export.png" alt="">导出</div>
    </div>-->
    <div id="div_print">
      <!-- 图片 -->
      <div id="viewer" v-viewer></div>
      <!-- html页面 -->

      <div id="content" v-if="hide" v-loading="fullscreenLoading">
        <!-- 冠心病 -->
        <div class="suifang_head">
          <div class="DAfb">
            <h2>随访表</h2>
          </div>
          <div class="header">
            <div>
              <div>
                姓名：
                <!--<el-select-->
                <!--v-model="form.bsFlup.archivesUserName"-->
                <!--filterable-->
                <!--style="width:180px"-->
                <!--placeholder="请选择"-->
                <!--@change="changeUname(form.bsFlup.archivesUserName)"-->
                <!--&gt;-->
                <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value"-->
                <!--&gt;</el-option>-->
                <!--</el-select>-->
                <span>{{form.bsFlup.archivesUserName}}</span>
              </div>
              <div class="title">
                <!-- 性别：<el-input class="miniW" v-model="userSex | conplateSex "></el-input> -->
                <span>身份证号：{{idcard}}</span>
              </div>
            </div>
            <div>
              <div>
                随访日期
                <el-date-picker v-model="form.bsFlup.flupDate" type="date"></el-date-picker>
              </div>
              <div>
                年龄:
                <span>{{userAge}}</span>
                <span style="padding-left:130px">性别：{{ userSex | conplateSex}}</span>
                <!-- <el-input class="miniW" v-model="userAge"></el-input> -->
              </div>
            </div>
            <div>
              <div>
                随访方式
                <el-radio-group v-model="form.bsFlup.flupType">
                  <el-radio :label="1">门诊</el-radio>
                  <el-radio :label="2">远程</el-radio>
                  <el-radio :label="3">上门</el-radio>
                </el-radio-group>
              </div>
              <div>
                <div class="title">
                  慢病档案号：
                  <!-- <el-input v-model="form.bsFlup.archivesCode" placeholder="请输入档案号"></el-input> -->

                  <span>{{form.bsFlup.archivesCodeDisplay}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="header" style="padding-top:12px"></div> -->
        </div>
        <div>
          <mgxb
            ref="receivemgxb"
            :guanMounth="item"
            v-for="(item,index) in result.SFguanM.guanMounth"
            :key="index"
          ></mgxb>
        </div>
        <div>
          <wgxb
            ref="receivewgxb"
            :guanWeek="item"
            v-for="(item,index) in result.SFguanW.guanWeek"
            :key="index"
          ></wgxb>
        </div>
        <div>
          <!-- <ygxb :chd="item" v-for="(item,index) in result.SFguanM.guanMounth" :key="index"></ygxb> -->
        </div>
        <!-- 高血压 -->
        <div>
          <mgxy
            ref="receivemgxy"
            :gaoMounth="item"
            v-for="(item,index) in result.SFgaoM.gaoMounth"
            :key="index"
          ></mgxy>
        </div>
        <div>
          <wgxy
            ref="receivewgxy"
            :gaoWeek="item"
            v-for="(item,index) in result.SFgaoW.gaoWeek"
            :key="index"
          ></wgxy>
        </div>
        <div>
          <!-- <ygxy :disbetes="item" v-for="(item,index) in result.SFguanM.guanMounth" :key="index"></ygxy> -->
        </div>
        <!-- 脑卒中 -->
        <div>
          <naocu
            ref="receivenaocu"
            :Naocu="item"
            v-for="(item,index) in result.SFNao.naocu"
            :key="index"
          ></naocu>
        </div>
        <!-- 糖尿病 -->
        <div>
          <mtnb
            ref="receivemtnb"
            :tangMounth="item"
            v-for="(item,index) in result.SFtangM.tangMounth"
            :key="index"
          ></mtnb>
        </div>
        <div>
          <wtnb
            ref="receivewtnb"
            :tangWeek="item"
            v-for="(item,index) in result.SFtangW.tangWeek"
            :key="index"
          ></wtnb>
        </div>
        <el-row style="background-color:#fff;max-width: 1200px;margin: 0 auto">
          <el-col class="padL" :md="2">添加随访图片:</el-col>
          <el-col :md="22">
            <div>
              <el-upload
                action
                list-type="picture-card"
                :on-change="onloadImg"
                :auto-upload="false"
                :show-file-list="true"
                :file-list="filses"
                :limit="10"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                accept=".png, .jpg, .jpeg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- <el-button @click="handleload">提交</el-button> -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
        <div class="updateData">
          <el-button type="success" @click="pushfile(0)">保存草稿</el-button>
          <el-button type="warning" @click="pushfile(1)">提交数据</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPagelist } from "@/api/sys/base.js";

import html2canvas from "html2canvas";
import {
  getCodeList,
  updateBsFlup,
  queryListByUcode
} from "@/api/sys/suifang.js";
import { uploadFile } from "@/api/sys/client.js";
import $ from "jquery";
import mgxb from "@/views/edit/suifang/guanxinbing/monthCoronaryHeartDisease.vue";
import wgxb from "@/views/edit/suifang/guanxinbing/weekCoronaryHeartDisease.vue";
import ygxb from "@/views/edit/suifang/guanxinbing/yearCoronaryHeartDisease.vue";
import mgxy from "@/views/edit/suifang/highBlood/monthhighBloodPressure.vue";
import wgxy from "@/views/edit/suifang/highBlood/weekhighBloodPressure.vue";
import ygxy from "@/views/edit/suifang/highBlood/yearhighBloodPressure.vue";
import naocu from "@/views/edit/suifang/naocu/brainDeath.vue";
import mtnb from "@/views/edit/suifang/tangniaobing/monthDiabetes.vue";
import wtnb from "@/views/edit/suifang/tangniaobing/weekDiabetes.vue";
import uploadImg from "@/views/edit/suifang/upload-img/upload-img-multiple.vue";
export default {
  components: {
    mgxb,
    wgxb,
    ygxb,
    mgxy,
    wgxy,
    ygxy,
    naocu,
    mtnb,
    wtnb,
    uploadImg
  },
  data() {
    return {
      userAge: "",
      userSex: "",
      options: [],
      bsFlupImages: [],
      idcard: "",
      allIimageUrl: [],
      userData: "",
      filses: [],
      dialogVisibleimg: false,
      dialogimg: "",
      editimgurl: [],
      dialogVisible: false,
      dialogImageUrl: "",
      userAge: "",
      userSex: "",
      options: [],
      fullscreenLoading: false,
      hide: true,
      archivesCode: "",
      sfCode: "",
      loading: {},
      result: {
        SFguanM: { guanMounth: [] },
        SFguanW: { guanWeek: [] },
        SFtangM: { tangMounth: [] },
        SFtangW: { tangWeek: [] },
        SFNao: { Naocu: [] },
        SFgaoM: { gaoMounth: [] },
        SFgaoW: { gaoWeek: [] }
      },
      form: {
        bsFlupImages: [],
        bsFlup: {},
        // 添加对应的*个人*及表数据
        bsMonthFlupCoronaries: [],
        bsWeedFlupCoronaries: [],
        bsMonthFlupFeritins: [],
        bsWeedFlupFeritins: [],
        bsFlupStrokes: [],
        bsMonthFlupDiabetes: [],
        bsWeedFlupDiabetes: []
      },
      // 拉取数据对应的状态
      getData: {
        bsFlup: false,
        bsFlupStrokes: false,
        bsMonthFlupCoronaries: false,
        bsMonthFlupDiabetes: false,
        bsMonthFlupFeritins: false,
        bsWeedFlupCoronaries: false,
        bsWeedFlupDiabetes: false,
        bsWeedFlupFeritins: false
      }
    };
  },
  created() {},
  mounted() {
    // this.printOut()
    this.getSFCode();
    this.archivesCode = sessionStorage.getItem("archivesCode");
    this.sfCode = sessionStorage.getItem("sfCode");
    this.openFullScreen();
    this.getHight();

    this.loading.close();
  },
  methods: {
    handleRemove(file, fileList) {
      for (var item in fileList) {
        if (fileList[item].uid == file.uid) {
          fileList.splice(item, 1);
        }
      }
      for (var item of fileList) {
        var imglist = {};
        imglist.imagesUrl = item.url;
        this.form.bsFlupImages.push(imglist);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onloadImg(file) {
      let _this = this;
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        for (var item of _this.filses) {
          var imglist = {};
          imglist.imagesUrl = item.url;
          _this.form.bsFlupImages.push(imglist);
        }
        _this.form.bsFlupImages.push({ imagesUrl: res.value });
      });
    },
    // 获取当前页面高度
    getHight() {
      var orderHight = document.body.clientHeight;
      document.getElementById("content").style.minHeight = orderHight + "px";
    },
    // loading
    openFullScreen() {
      this.fullscreenLoading = true;
    },
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
        target: document.getElementById("content")
      });
    },
    // 获取病人信息
    getmainList(val) {
      let _this = this;
      queryListByUcode(val).then(res => {
        // this.userData = res.value;
        this.$set(this, "userData", res.value);

        console.log(this.form.bsFlup, res.value);
        for (let index = 0; index < res.value.length; index++) {
          this.options.push({
            value: `${index}`,
            label: `${res.value[index].userName}`
          });
          if (res.value[index].archivesCode == this.form.bsFlup.archivesCodeDisplay) {
            _this.userAge = _this.userData[index].userAge;

            _this.userSex = _this.userData[index].userSex;
            _this.idcard = _this.userData[index].userCard;
          }
        }
      });
    },
    // 更改姓名时其它两项更改
    changeUname(val) {
      let index = parseInt(val);
      this.form.bsFlup.archivesUserName = this.userData[index].userName;
      this.idcard = this.userData[index].userCard;
      this.form.bsFlup.archivesCode = this.userData[index].archivesCodeDisplay;
      this.form.bsFlup.archivesCode = this.userData[index].code;
      this.userSex = this.userData[index].userSex;
      this.userAge = this.userData[index].userAge;
    },
    // 遍历拉取对应表数据
    forpush(value, Table) {
      let _this = this;
      for (const item of value) {
        _this.form[Table].push(item.form);
      }
    },
    //提交数据/保存草稿
    orpushfile() {
      let _this = this;
      if (_this.getData.bsMonthFlupCoronaries) {
        let value = _this.$refs.receivemgxb;
        for (const item of value) {
          this.form.bsMonthFlupCoronaries.push(item.form);
        }
      }
      if (_this.getData.bsWeedFlupCoronaries) {
        let value = _this.$refs.receivewgxb;
        for (const item of value) {
          this.form.bsWeedFlupCoronaries.push(item.form);
        }
      }

      if (_this.getData.bsMonthFlupFeritins) {
        let value = _this.$refs.receivemgxy;
        for (const item of value) {
          this.form.bsMonthFlupFeritins.push(item.form);
        }
      }
      if (_this.getData.bsWeedFlupFeritins) {
        let value = _this.$refs.receivewgxy;
        for (const item of value) {
          this.form.bsWeedFlupFeritins.push(item.form);
        }
      }
      if (_this.getData.bsFlupStrokes) {
        let value = _this.$refs.receivenaocu;
        for (const item of value) {
          this.form.bsFlupStrokes.push(item.form);
        }
      }

      if (_this.getData.bsMonthFlupDiabetes) {
        let value = _this.$refs.receivemtnb;
        for (const item of value) {
          this.form.bsMonthFlupDiabetes.push(item.form);
        }
      }
      if (_this.getData.bsWeedFlupDiabetes) {
        let value = _this.$refs.receivewtnb;
        for (const item of value) {
          this.form.bsWeedFlupDiabetes.push(item.form);
        }
      }

      updateBsFlup(_this.form).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("manB/suifang");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //提交数据/保存草稿
    pushfile(val) {
      if (val == 1) {
        let _this = this;
        // _this
        //   .$confirm("此操作将提交数据, 是否继续?", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning"
        //   })
        //   .then(() => {

        this.form.bsFlup.dataStatus = 1;
        this.orpushfile();
        // })
        // .catch(() => {
        //   _this.$message({
        //     type: "info",
        //     message: "已取消提交"
        //   });
        // });
      } else {
        let _this = this;
        // _this
        //   .$confirm("此操作将保存草稿数据, 是否继续?", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning"
        //   })
        //   .then(() => {
        _this.form.bsFlup.dataStatus = 0;
        _this.orpushfile();
        // })
        // .catch(() => {
        //   _this.$message({
        //     type: "info",
        //     message: "已取消保存"
        //   });
        // });
      }
    },
    // 根据随访code查询信息
    getSFCode() {
      let _this = this;
      let code = sessionStorage.getItem("sfCode");
      getCodeList(code).then(res => {
        let value = res.value;
        _this.form.bsFlup = value.bsFlup;
        _this.editimgurl = value.bsFlupImages;
        for (var item of _this.editimgurl) {
          var imglist = {};
          imglist.url = item.imagesUrl;
          _this.filses.push(imglist);
        }
        // 冠心病随访月
        _this.result.SFguanM.guanMounth = value.bsMonthFlupCoronaries;

        // 冠心病随访周
        _this.result.SFguanW.guanWeek = value.bsWeedFlupCoronaries;
        // 糖尿病随访月
        _this.result.SFtangM.tangMounth = value.bsMonthFlupDiabetes;
        // 糖尿病随访周
        _this.result.SFtangW.tangWeek = value.bsWeedFlupDiabetes;
        // 高血压随访月
        _this.result.SFgaoM.gaoMounth = value.bsMonthFlupFeritins;
        // 高血压随访周
        _this.result.SFgaoW.gaoWeek = value.bsWeedFlupFeritins;
        // 脑卒中
        _this.result.SFNao.naocu = value.bsFlupStrokes;
        for (const key in value) {
          if (value[key] != null) {
            _this.getData[key] = true;
          } else {
            _this.getData[key] = false;
          }
        }
        this.getmainList({});
      });
    },
    checkTable() {}
  }
};
</script>


<style scoped>
.lookimg {
  display: inline-block;
  width: 146px;
  height: 146px;
  margin-left: 12px;
}
.lookimg > img {
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
}
.hide {
  display: none;
}
#div_print {
  /* width: 1200px; */
  margin: 0 auto;
}
#viewer {
  max-width: 1200px;
}
.base {
  margin-bottom: 50px;
  border: 1px solid #ddd;
}
.port {
  display: flex;
  width: 1300px;
  margin: 20px auto;
  justify-content: flex-end;
}
.port > div {
  margin-right: 15px;
  cursor: pointer;
}
.port img {
  vertical-align: middle;
  margin-right: 8px;
}
.updateData {
  width: 100%;
  text-align: center;
  margin: 10px;
}
.suifang_head {
  background-color: #fff;
  max-width: 1200px;
  margin: 12px auto;
  line-height: 50px;
  border-radius: 6px;
}
.DAfb {
  text-align: center;
  line-height: 45px;
}
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
}
.header .el-input {
  width: 65% !important;
}

.title {
  height: 40px;
  line-height: 40px;
  /* text-align: center; */
}
</style>
