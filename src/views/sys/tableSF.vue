<template>
  <div>
    <div class="suifang_head">
      <div class="DAfb">
        <h2>随访表</h2>
      </div>
      <el-form  :rules="rules" :model="form.bsFlup">
        <div class="header">
        <div>
          <el-form-item prop="archivesUserName">
          <!-- <div> -->
             <img class="imgsrc" src="../../../static/star.png"/>姓名：
            <el-select :required="true"
              v-model="form.bsFlup.archivesUserName"
              filterable
              style="width:180px"
              placeholder="请选择"
              @change="changeUname(form.bsFlup.archivesUserName)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          <!-- </div> -->
          </el-form-item>
          <div class="title">
            <!-- 性别：<el-input class="miniW" v-model="userSex | conplateSex "></el-input> -->
            <el-form-item>
              <span>身份证号：{{idcard}}</span>
            </el-form-item>
          </div>
        </div>
        <div>
          <div>
             <el-form-item prop="archivesUserName">
            <img class="imgsrc" src="../../../static/star.png"/>随访日期
            <el-date-picker v-model="form.bsFlup.flupDate" type="date"></el-date-picker>
             </el-form-item>
          </div>
          <div>
            年龄:
            <span>{{userAge}}</span>
            <span style="padding-left:130px">性别：{{ userSex | conplateSex}}</span>
            <!-- <el-input class="miniW" v-model="userAge"></el-input> -->
          </div>

          <!-- <el-select
            v-model="idcard"
            filterable
            style="width:200px"
            placeholder="请选择"
            @change="changeUname(idcard)"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
        </div>
        <div>
          <div>
            <img class="imgsrc" src="../../../static/star.png"/>随访方式
            <el-radio-group v-model="form.bsFlup.flupType">
              <el-radio label="1">门诊</el-radio>
              <el-radio label="2">远程</el-radio>
              <el-radio label="3">上门</el-radio>
            </el-radio-group>
          </div>
          <div>
            <div class="title">
              慢病档案号：
              <!-- <el-input v-model="form.form.bsFlup.archivesCode" placeholder="请输入档案号"></el-input> -->
              <span>{{form.bsFlup.archivesCodeDisplay}}</span>
              <!-- <el-select v-model="filecode" filterable class="miniW" placeholder="请选择" @change="changeUname(filecode)">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
              </el-select>-->
            </div>
          </div>
        </div>
      </div>
      </el-form>
      <div class="header" style="padding-top:12px"></div>
    </div>

    <el-collapse v-model="activeNames" class="base">

      <div v-show="addFileObj.guanxinbingWeek">
        <div class="partition"></div>
        <el-collapse-item name="2" class="icon-delete">

          <template slot="title">
            <h3>冠心病随访表(周)</h3>
            <i class="el-icon-delete" @click="fubiaoDele(2)"></i>
          </template>
          <wgxb ref="receivewgxb"></wgxb>
        </el-collapse-item>
      </div>
      <div v-show="addFileObj.guanxinbingMounth" >
        <div class="partition"></div>
        <el-collapse-item name="1" class="icon-delete">
          <template slot="title">
            <h3>冠心病随访表(月)</h3>
            <i class="el-icon-delete" @click="fubiaoDele(1)"></i>
          </template>
          <mgxb ref="receivemgxb"></mgxb>
        </el-collapse-item>
      </div>
      <!-- <div>
        <div class="partition"></div>
        <el-collapse-item name="3">
          <template slot="title">
            <h3>冠心病随访表(年)</h3>
          </template>
          <ygxb></ygxb>
        </el-collapse-item>
      </div>-->
      <div v-show="addFileObj.gaoxueyaMounth">
        <div class="partition"></div>
        <el-collapse-item name="3" class="icon-delete">

          <template slot="title">
            <h3>高血压随访表(月)</h3>
            <i class="el-icon-delete" @click="fubiaoDele(3)"></i>>
          </template>
          <mgxy ref="receivemgxy"></mgxy>
        </el-collapse-item>
      </div>
      <div v-show="addFileObj.gaoxueyaWeek">
        <div class="partition"></div>
        <el-collapse-item name="4" class="icon-delete">

          <template slot="title">
            <h3>高血压随访表(周)</h3>
             <i class="el-icon-delete" @click="fubiaoDele(4)"></i>
          </template>
          <wgxy ref="receivewgxy"></wgxy>
        </el-collapse-item>
      </div>
      <!-- <div>
        <div class="partition"></div>
        <el-collapse-item name="6">
          <template slot="title">
            <h3>高血压随访表(年)</h3>
          </template>
          <ygxy></ygxy>
        </el-collapse-item>
      </div>-->
      <div v-show="addFileObj.naozuzhong">
        <div class="partition"></div>
        <el-collapse-item name="5" class="icon-delete">
          <template slot="title">
            <h3>脑卒中随访表</h3>
            <i class="el-icon-delete" @click="fubiaoDele(5)"></i>
          </template>
          <naocu ref="receivenaocu"></naocu>
        </el-collapse-item>
      </div>
      <div v-show="addFileObj.tangniaobingMounth">
        <div class="partition"></div>
        <el-collapse-item name="6" class="icon-delete">

          <template slot="title">
            <h3>糖尿病随访表(月)</h3>
            <i class="el-icon-delete" @click="fubiaoDele(6)"></i>
          </template>
          <mtnb ref="receivemtnb"></mtnb>
        </el-collapse-item>
      </div>
      <div v-show="addFileObj.tangniaobingWeek">
        <div class="partition"></div>
        <el-collapse-item name="7" class="icon-delete">

          <template slot="title">
            <h3>糖尿病随访表(周)</h3>
             <i class="el-icon-delete" @click="fubiaoDele(7)"></i>
          </template>
          <wtnb ref="receivewtnb"></wtnb>
        </el-collapse-item>
      </div>
      <el-row>
        <el-col class="padL" :md="2">添加随访图片:</el-col>
        <el-col :md="22">
          <div>
            <el-upload
              action
              list-type="picture-card"
              :on-change="onloadImg"
              :file-list="filses"
              multiple
              :auto-upload="false"
              :show-file-list="true"
              :limit="10"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handlesuccess"
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
      <div class="dataCenter">
        <el-button type="success" @click="pushfile(1)">保存草稿</el-button>
        <el-button type="warning" @click="pushfile(0)">提交数据</el-button>
      </div>
    </el-collapse>
    <vueToTop></vueToTop>
  </div>
</template>


<script>
import mgxb from "@/views/table/suifang/guanxinbing/monthCoronaryHeartDisease.vue";
import wgxb from "@/views/table/suifang/guanxinbing/weekCoronaryHeartDisease.vue";
import ygxb from "@/views/table/suifang/guanxinbing/yearCoronaryHeartDisease.vue";
import mgxy from "@/views/table/suifang/highBlood/monthhighBloodPressure.vue";
import wgxy from "@/views/table/suifang/highBlood/weekhighBloodPressure.vue";
import ygxy from "@/views/table/suifang/highBlood/yearhighBloodPressure.vue";
import naocu from "@/views/table/suifang/naocu/brainDeath.vue";
import mtnb from "@/views/table/suifang/tangniaobing/monthDiabetes.vue";
import wtnb from "@/views/table/suifang/tangniaobing/weekDiabetes.vue";

import { queryBsFlupList, insertBsFlup,queryListByUcode } from "@/api/sys/suifang.js";
import { getPagelist } from "@/api/sys/base.js";
import { uploadFile } from "@/api/sys/client.js";
export default {
  components: { mgxb, wgxb, ygxb, mgxy, wgxy, ygxy, naocu, mtnb, wtnb },
  data() {
    return {
      rules: {
        archivesUserName: [{ required: true, message: "请输入您的姓名" , trigger: 'blur'}],
      },
      filses: [],
      bsFlupImages: [],
      dialogImageUrl: "",
      dialogVisible: false,
      pageQuery: {
        page: 1,
        limit: 10
      },
      form: {
        bsFlupImages: [],
        bsFlup: {
          flupDate: "",
          // 档案code
          archivesCode: "",
          // 档案编号
          archivesCodeDisplay: "",
          // 随访类型 1-门诊 2-远程 3-上门
          flupType: "",
          archivesUserName: "",
          // 随访病种
          flupDiseaseType: "",
          // 保存状态 0-建檔完成 1-保存草稿
          dataStatus: 0
        },
        bsMonthFlupCoronaries: [], //guan
        bsWeedFlupCoronaries: [], //guan
        bsMonthFlupFeritins: [], //gao
        bsWeedFlupFeritins: [], //gao
        bsFlupStrokes: [], //nao
        bsMonthFlupDiabetes: [], //tang
        bsWeedFlupDiabetes: [] //tang
      },
      userAge: "",
      userSex: "",
      userData: "",
      idcard: "",
      filecode: "",
      options: [],
      options1: [],
      options2: [],
      addFileObj: {},
      activeNames: ["1", "2", "3", "4", "5", "6", "7"],
      suifanNumber:""
    };
  },
  created() {
    //   获取需要显示列表的状态
    this.addFileObj = JSON.parse(sessionStorage.getItem("data"));
  },
  mounted() {
    let _this=this
    _this.getmainList({});
    _this.suifanNumber=sessionStorage.getItem("suifanNumber")

  },
  methods: {
     // 删除附表
      fubiaoDele(value) {
      let _this = this;
      if (_this.suifanNumber > 1) {
        switch (value) {
            case 1:
              this.addFileObj.guanxinbingMounth = false;
              break;
            case 2:
              this.addFileObj.guanxinbingWeek = false;
              break;
            case 3:
              this.addFileObj.gaoxueyaMounth = false;
              break;
            case 4:
              this.addFileObj.gaoxueyaWeek = false;
              break;
            case 5:
              this.addFileObj.naozuzhong = false;
              break;
            case 6:
              this.addFileObj.tangniaobingMounth = false;
              break;
            case 7:
              this.addFileObj.tangniaobingWeek = false;
              break;
          }
        _this.suifanNumber = _this.suifanNumber-1;
      }else {
        _this.$message.warning("最后一个不可删除")
      }
    },
    handleRemove(file, fileList) {
      this.form.bsFlupImages = [];
      this.bsFlupImages = [];
      for (var item of fileList) {
        var formData = new FormData();
        formData.append("file", item.raw);
        uploadFile(formData).then(res => {
          this.bsFlupImages.push({ imagesUrl: res.value });
          this.form.bsFlupImages = this.bsFlupImages;
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList) {},
    onloadImg(file, fileList) {
      let _this = this;
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        _this.bsFlupImages.push({ imagesUrl: res.value });
        _this.form.bsFlupImages = _this.bsFlupImages;
      });
    },
    // },
    // handleload() {
    //   let _this = this;
    //   batchUploadFile(_this.formData).then(res => {
    //     // this.dialogImageUrl = `http://${res.value}`;
    //   });
    // },
    // 更改姓名时其它两项更改
    changeUname(val) {
      let index = parseInt(val);
      this.form.bsFlup.archivesUserName = this.userData[index].userName;
      this.idcard = this.userData[index].userCard;
      this.form.bsFlup.archivesCode = this.userData[index].code;
      this.form.bsFlup.archivesCodeDisplay = this.userData[index].archivesCode;
      this.userSex = this.userData[index].userSex;
      this.userAge = this.userData[index].userAge;
      for (const item of this.userData) {
        if (item.val != null) {
          this.userName = item.userName;
          this.idcard = item.userCard;
          this.filecode = item.code;
        }
      }
    },
    // 获取病人数据
    getmainList(val) {
      queryListByUcode(val).then(res => {
        // this.userData = res.value;
        this.$set(this, "userData", res.value);
        for (let index = 0; index < res.value.length; index++) {
          this.options.push({
            value: `${index}`,
            label: `${res.value[index].userName}`
          });
        }
      });
    },

    //提交数据/保存草稿
    orpushfile() {
      let _this = this;
      if (_this.addFileObj.guanxinbingMounth) {
        let value = _this.$refs.receivemgxb.form;
        // _this.$set(_this.form, "bsMonthFlupCoronaries", value);
        this.form.bsMonthFlupCoronaries.push(value);
      }
      if (_this.addFileObj.guanxinbingWeek) {
        let value = _this.$refs.receivewgxb.form;
        // _this.$set(_this.form, "bsWeedFlupCoronaries", value);
        this.form.bsWeedFlupCoronaries.push(value);
      }

      if (_this.addFileObj.gaoxueyaMounth) {
        let value = _this.$refs.receivemgxy.form;
        // _this.$set(_this.form, "bsMonthFlupFeritins", value);
        this.form.bsMonthFlupFeritins.push(value);
      }
      if (_this.addFileObj.gaoxueyaWeek) {
        let value = _this.$refs.receivewgxy.form;
        // _this.$set(_this.form, "bsWeedFlupFeritins", value);
        this.form.bsWeedFlupFeritins.push(value);
      }
      if (_this.addFileObj.naozuzhong) {
        let value = _this.$refs.receivenaocu.form;
        // _this.$set(_this.form, "bsFlupStrokes", value);
        this.form.bsFlupStrokes.push(value);
      }
      if (_this.addFileObj.tangniaobingMounth) {
        let value = _this.$refs.receivemtnb.form;
        this.form.bsMonthFlupDiabetes.push(value);
        // _this.$set(_this.form, "bsMonthFlupDiabetes", value);
      }
      if (_this.addFileObj.tangniaobingWeek) {
        let value = _this.$refs.receivewtnb.form;
        this.form.bsWeedFlupDiabetes.push(value);
        // _this.$set(_this.form, "bsWeedFlupDiabetes", value);
      }
      // 调用随访接口
      insertBsFlup(_this.form).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("manB/suifang");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //提交数据/保存草稿 flupDiseaseType flupType
    pushfile(val) {
      if (
        this.form.bsFlup.archivesUserName != "" &&
        this.form.bsFlup.flupDate != "" &&
        this.form.bsFlup.flupType != ""
      ) {
        if (val == 1) {
          let _this = this;
          _this
            .$confirm("此操作将提交数据, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              this.form.bsFlup.dataStatus = 1;
              this.orpushfile();
            })
            .catch(() => {
              _this.$message({
                type: "info",
                message: "已取消提交"
              });
            });
        } else {
          let _this = this;
          _this
            .$confirm("此操作将保存草稿数据, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _this.form.bsFlup.dataStatus = 0;
              _this.orpushfile();
            })
            .catch(() => {
              _this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      } else {
        this.$message.error("请添加完整顶部基本信息");
      }
    }
  }
};
</script>

<style scoped>
.imgsrc{
  display: inline-block;
  width:8px;
  height: 8px;
}
.icon-delete {
  position: relative;
}
.el-icon-delete {
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 24px;
  cursor: pointer;
}
.title {
  height: 40px;
  line-height: 40px;
  /* text-align: center; */
}
.miniW {
  width: 40% !important;
}
h3 {
  margin-left: 12px;
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
.suifang_head {
  background-color: #fff;
  max-width: 1200px;
  margin: 12px auto;
  line-height: 50px;
  border-radius: 6px;
}
.dataCenter {
  text-align: center;
  margin-bottom: 12px;
  margin: 0 auto;
}
</style>
