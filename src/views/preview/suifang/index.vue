<template>
  <div class="suifangstyle">
    <div class="port">
      <!-- <div @click="print">
        <img src="../../../../static/png/print.png" alt>打印
      </div>-->
      <div @click="pdfList" title="请导出成pdf在做打印处理">
        <img src="../../../../static/png/export.png" alt>导出
      </div>
    </div>
    <div id="div_print">
      <!-- 图片 -->
      <div id="viewer" v-viewer v-show="imgshow"></div>
      <div id="div_print" class="loadinging" v-show="hide">
        <div class="suifang_head" v-show="look">
          <div class="header">
            <div>
              <div>
                姓名：
                <span>{{form.bsFlup.archivesUserName}}</span>
              </div>
              <div>
                身份证号：
                <span>{{form.bsFlup.code}}</span>
              </div>
            </div>
            <div>
              <div class="suifanDdata">
                随访日期:
                <span>{{form.bsFlup.flupDate}}</span>
              </div>
              <div >
                年龄：
                <span>{{form.bsFlup.age}}</span>

                <span style="margin-left:15px">性别：{{form.bsFlup.sex | conplateSex}}</span>
              </div>
            </div>
            <div >
            <div>
              随访方式
              <el-radio-group v-model="form.bsFlup.flupType">
                <el-radio :label="1">门诊</el-radio>
                <el-radio :label="2">远程</el-radio>
                <el-radio :label="3">上门</el-radio>
              </el-radio-group>
            </div>
            <div class="title">
              慢病档案号：
              <span>{{form.bsFlup.archivesCodeDisplay}}</span>
            </div>
          </div>
          </div>

        </div>
        <!-- <el-collapse> -->
        <!-- 冠心病 -->
        <el-collapse v-model="activeNames" v-if="showOrHide" style="margin-top:40px" ref="myTables">
          <div class="borderTandB" v-if="result.SFNao.naocu!=null">
            <el-collapse-item name="1" >
              <template slot="title">
                <h3>脑卒中</h3>
              </template>
              <div>
                <naocu :Naocu="item" v-for="(item,index) in result.SFNao.naocu" :key="index"></naocu>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFguanM.guanMounth!=null">
            <el-collapse-item name="2">
              <template slot="title">
                <h3>冠心病随访(月)</h3>
              </template>
              <div >
                <mgxb
                  :guanMounth="item"
                  v-for="(item,index) in result.SFguanM.guanMounth"
                  :key="index"
                ></mgxb>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFtangM.tangMounth!=null">
            <el-collapse-item name="3">
              <template slot="title">
                <h3>糖尿病月表</h3>
              </template>
              <div>
                <mtnb
                  :tangMounth="item"
                  v-for="(item,index) in result.SFtangM.tangMounth"
                  :key="index"
                ></mtnb>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFgaoM.gaoMounth!=null">
            <el-collapse-item name="4">
              <template slot="title">
                <h3>高血压随访(月)</h3>
              </template>
              <div>
                <mgxy
                  :gaoMounth="item"
                  v-for="(item,index) in result.SFgaoM.gaoMounth"
                  :key="index"
                ></mgxy>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFguanW.guanWeek!=null">
            <el-collapse-item name="5">
              <template slot="title">
                <h3>冠心病随访(周)</h3>
              </template>
              <div>
                <wgxb :guanWeek="item" v-for="(item,index) in result.SFguanW.guanWeek" :key="index"></wgxb>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFtangW.tangWeek!=null">
            <el-collapse-item name="6">
              <template slot="title">
                <h3>糖尿病周表</h3>
              </template>
              <div>
                <wtnb :tangWeek="item" v-for="(item,index) in result.SFtangW.tangWeek" :key="index"></wtnb>
              </div>
            </el-collapse-item>
          </div>
          <div class="borderTandB" v-if="result.SFgaoW.gaoWeek!=null">
            <el-collapse-item name="7">
              <template slot="title">
                <h3>高血压周表</h3>
              </template>
              <div>
                <wgxy :gaoWeek="item" v-for="(item,index) in result.SFgaoW.gaoWeek" :key="index"></wgxy>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
        <div class="bigIMGrul">
          <el-row>
          <el-col :md="2">随访图片：</el-col>
          <el-col :md="21">
            <div class="imageurl"  v-viewer  v-for="(item,index) in imgList" :key="index">
              <img :src="item.imagesUrl" alt="">
            </div>
          </el-col>
        </el-row>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <vueToTop></vueToTop>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { getCodeList } from "@/api/sys/suifang.js";
import { getPagelist } from "@/api/sys/base.js";
import $ from "jquery";
import mgxb from "@/views/preview/suifang/guanxinbing/monthCoronaryHeartDisease.vue";
import wgxb from "@/views/preview/suifang/guanxinbing/weekCoronaryHeartDisease.vue";
import ygxb from "@/views/preview/suifang/guanxinbing/yearCoronaryHeartDisease.vue";
import mgxy from "@/views/preview/suifang/highBlood/monthhighBloodPressure.vue";
import wgxy from "@/views/preview/suifang/highBlood/weekhighBloodPressure.vue";
import ygxy from "@/views/preview/suifang/highBlood/yearhighBloodPressure.vue";
import naocu from "@/views/preview/suifang/naocu/brainDeath.vue";
import mtnb from "@/views/preview/suifang/tangniaobing/monthDiabetes.vue";
import wtnb from "@/views/preview/suifang/tangniaobing/weekDiabetes.vue";
export default {
  components: { mgxb, wgxb, ygxb, mgxy, wgxy, ygxy, naocu, mtnb, wtnb },
  data() {
    return {

      imgList:[],
      showOrHide: false,
      imgshow: false,
      activeNames: ['1'],
      hide: true,
      numbul: 1,
      archivesCode: "",
      sfCode: "",
      loadingInstance: "",
      look: false,
      form: {
        bsFlup: {
          age: "",
          sex: ""
        }
      },
      result: {
        SFguanM: { guanMounth: [] },
        SFguanW: { guanWeek: [] },
        SFtangM: { tangMounth: [] },
        SFtangW: { tangWeek: [] },
        SFgaoM: { gaoMounth: [] },
        SFgaoW: { gaoWeek: [] },
        SFNao: { naocu: [] }
      }
    };
  },
  created() {
    this.getSFCode();
    this.archivesCode = sessionStorage.getItem("archivesCode");
    this.sfCode = sessionStorage.getItem("sfCode");
  },
  mounted() {
    // this.list()
  },
  methods: {
    // list() {
    //   this.activeNames = [
    //     "1",
    //     "2",
    //     "3",
    //     "4",
    //     "5",
    //     "6",
    //     "7",
    //     "8",
    //     "9",
    //     "10",
    //     "11",
    //     "12"
    //   ];
    //   setTimeout(() => {
    //     let canvasID = document.getElementById("div_print");
    //     let viewer = document.getElementById("viewer");
    //     let img = document.createElement("img");
    //     html2canvas(canvasID).then(canvas => {
    //       viewer.appendChild(img);
    //       img.setAttribute("src", canvas.toDataURL("image/png"));
    //       img.setAttribute("width", "100%");
    //     });
    //   }, 6000);
    // },
    // print(){
    //   this.imgshow=true
    //   this.hide=false
    // setTimeout(() => {
    //   this.doprint()
    // }, 12000);
    // },
    pdfList(){
      this.activeNames=["1","2","3","4","5","6","7"];
      setTimeout(() => {
        this.getPdf()
      }, 2000);
    },
    // dataURLToBlob(dataurl) {//ie 图片转格式
    //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while (n--) {
    //       u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new Blob([u8arr], {type: mime})
    // },
    // downloadResult(name) {
    //     let canvasID = document.getElementById("html")
    //     let viewer=document.getElementById("viewer")
    //     let img = document.createElement('img');
    //     html2canvas(canvasID).then(canvas => {
    //       viewer.appendChild(img);
    //       img.setAttribute("src",canvas.toDataURL("image/png"))
    //       img.setAttribute("width","100%")
    //       this.hide=false;
    //     });
    // },
    // printOut(name) {
    //     // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
    //     $(window).scrollTop(0);  // jQuery 的方法
    //     document.body.scrollTop = 0; // IE的
    //     document.documentElement.scrollTop = 0; // 其他
    //     this.downloadResult(name)
    // },
    // 根据随访code查询信息
    getSFCode() {
      let _this = this;
      let code = sessionStorage.getItem("sfCode");
      getCodeList(code).then(res => {
        let value = res.value;
        let code = res.value.bsFlup.archivesCode;
        _this.$set(_this,"imgList",value.bsFlupImages)
        _this.$set(_this.form, "bsFlup", value.bsFlup);
        // 更改日期格式
        _this.changeDate();
        // 冠心病随访月
        _this.$set(_this.result.SFguanM,"guanMounth",value.bsMonthFlupCoronaries)
        // _this.result.SFguanM.guanMounth = value.bsMonthFlupCoronaries;
        // 冠心病随访周

        _this.$set(_this.result.SFguanW,"guanWeek",value.bsWeedFlupCoronaries)
       
        // _this.result.SFguanW.guanWeek = value.bsWeedFlupCoronaries;
        // 糖尿病随访月

        _this.$set(_this.result.SFtangM,"tangMounth",value.bsMonthFlupDiabetes)

        // _this.result.SFtangM.tangMounth = value.bsMonthFlupDiabetes;
        // 糖尿病随访周
        _this.$set(_this.result.SFtangW,"tangWeek",value.bsWeedFlupDiabetes)

        // _this.result.SFtangW.tangWeek = value.bsWeedFlupDiabetes;
        // 高血压随访月

        _this.$set(_this.result.SFgaoM,"gaoMounth",value.bsMonthFlupFeritins)

        // _this.result.SFgaoM.gaoMounth = value.bsMonthFlupFeritins;
        // 高血压随访周

        _this.$set(_this.result.SFgaoW,"gaoWeek",value.bsWeedFlupFeritins)

        // _this.result.SFgaoW.gaoWeek = value.bsWeedFlupFeritins;
        // 脑卒中
        _this.$set(_this.result.SFNao,"naocu",value.bsFlupStrokes)

        // _this.result.SFNao.naocu = value.bsFlupStrokes;
        this.getdata();
        _this.look = true;
        _this.$nextTick(function(){
          if( _this.$refs.myTables.$children.length!=0){          
            _this.activeNames.length=0;
            _this.activeNames.push(_this.$refs.myTables.$children[0].name);
          }

        })
      });
    },
    // 更改日期格式
    changeDate() {
      if (this.form.bsFlup.flupDate !== null) {
        this.form.bsFlup.flupDate = this.form.bsFlup.flupDate.substring(0, 10);
      }
    },
    // // 打印
    // doprint() {
    //   let _this = this;
    //   var arr = [];
    //   for (let index = 2; index < 8; index++) {
    //     this.activeNames.push(`${index}`);
    //   }
    //   _this.look = true;
    //   setTimeout(() => {
    //     let canvasID = document.getElementById("div_print");
    //     let viewer = document.getElementById("viewer");
    //     let img = document.createElement("img");
    //     html2canvas(canvasID).then(canvas => {
    //       viewer.appendChild(img);
    //       img.setAttribute("src", canvas.toDataURL("image/png"));
    //       img.setAttribute("width", "100%");
    //       _this.hide = false;
    //     });
    //   }, 1000);
    // },
    // 获取用户信息
    getdata() {
      let _this = this;
      let code = _this.form.bsFlup.archivesCode;
      getPagelist({}).then(res => {
        if (res.code == 0) {
          for (const item in res.value) {
            if (_this.form.bsFlup.archivesCodeDisplay == res.value[item].archivesCode) {
              this.form.bsFlup.age = res.value[item].userAge;
              this.form.bsFlup.sex = res.value[item].userSex;
              this.form.bsFlup.code = res.value[item].userCard;
            }
          }
        }
      });
      this.showOrHide = true;
    },
    checkTable() {}
  }
};
</script>


<style scoped>
.bigIMGrul{
  background-color:#fff;
  padding:12px 12px;
  font-size: 15px;
  font-weight: bold
}
.imageurl{
  display:inline-block;
  width:146px;
  height:146px;
  margin-left:12px;
}
.imageurl>img{
  width:100%;
  height:100%;
  border:1px solid #Ddd
}
.suifangstyle >>> h3 {
  padding: 12px;
}
.hide {
  display: none;
}
#div_print {
  width: 1200px;
  margin: 0 auto;
}
#viewer {
  max-width: 1200px;
}
.port {
  display: flex;
  width: 1300px;
  margin: 30px auto;
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
.margin_botton {
  margin-bottom: 0px !important;
}
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 48px;
  padding: 10px;
}
.suifang_head {
  background-color: #fff;
  max-width: 1200px;
  margin: -20px auto;
  line-height: 50px;
  border-radius: 6px;
  border: 1px solid #ddd;
}
.suifangstyle >>> .el-table th,
.el-table td {
  padding: 0 0 !important;
}
.suifangstyle >>> .el-table td {
  border-bottom: 1px solid #888888;
}
.suifangstyle >>> .el-table th.is-leaf {
  border-bottom: 1px solid #888888;
}
.suifangstyle >>> .el-table--border th {
  border-right: 1px solid #888888;
}
.suifangstyle >>> .el-table--border td {
  border-right: 1px solid #888888;
}
.suifangstyle >>> .el-table--border {
  border: 1px solid #888888;
}
.suifangstyle >>> .el-table th > .cell {
  color: #000;
}
/* radio禁用 样式 */
.suifangstyle
  >>> .el-radio__input.is-disabled.is-checked
  .el-radio__inner::after {
  background-color: #fff;
  border-color: #fff;
  cursor: default;
}
.suifangstyle >>> .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #56c8ac;
  border-color: #56c8ac;
  cursor: default;
}
.suifangstyle >>> .el-radio__input.is-disabled + span.el-radio__label {
  color: #000;
  cursor: default;
}
.suifangstyle >>> .el-radio__input.is-disabled .el-radio__inner {
  cursor: default;
}
/* input禁用样式 */
.suifangstyle >>> .el-input.is-disabled .el-input__inner {
  background-color: transparent;
  color: #000;
  cursor: default;
}
/* 复选框 禁用样式 */
.suifangstyle
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #56c8ac;
  border-color: #56c8ac;
  cursor: default;
}
.suifangstyle >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #000;
  cursor: default;
}
.suifangstyle
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
  cursor: default;
}
.suifangstyle >>> .el-radio__input.is-disabled .el-radio__inner {
  border-color: #888;
}
.suifangstyle >>> .el-checkbox__input.is-disabled .el-checkbox__inner {
  border-color: #888;
}
.suifangstyle >>> .el-textarea.is-disabled .el-textarea__inner {
  background-color: transparent !important;
  border-color: #ddd;
  color: #000;
  cursor: default;
}
.borderTandB {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px !important;
}
</style>
