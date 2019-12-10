<template> 
<div class="changesize"> 
    <div class="port">
      <!-- <div @click="print">
        <img src="../../../../static/png/print.png" alt>打印
      </div> -->
      <div @click="pdfList" title="请导出成pdf在做打印处理">
        <img src="../../../../static/png/export.png" >导出
      </div>
    </div>
     <el-form v-loading="loading">
    <div id="div_print">
      <!-- 图片 -->
      <div id="viewer" v-viewer v-show="imgshow"></div>
      <!-- html页面 -->

      <!-- <div class="partition"></div> -->
      <div id="html" v-show="hide">
        <!-- 主表 -->
        <div>
          <lenti-virus ref="mylentivirus"></lenti-virus>
        </div>
        <el-collapse v-model="activeNames" class="base">
          <div v-if="result.bsArchivesS.fubiao.length!=0">
            <el-collapse-item name="1">
              <template slot="title">
                <h3>慢病附表</h3>
              </template>
              <div>
                <appendix-table
                  :appendixTable="item"
                  v-for="(item,index) in result.bsArchivesS.fubiao"
                  :key="index"
                ></appendix-table>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.bsArchivesGuan.guan.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="2">
              <template slot="title">
                <h3>冠心病附表</h3>
              </template>
              <div>
                <c-hd :chd="item" v-for="(item,index) in result.bsArchivesGuan.guan" :key="index"></c-hd>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.bsArchivesCopd.mazuf.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="3">
              <template slot="title">
                <h3>慢阻肺附表</h3>
              </template>
              <div>
                <coronary-heart
                  :coronaryHeart="item"
                  v-for="(item,index) in result.bsArchivesCopd.mazuf"
                  :key="index"
                ></coronary-heart>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.bsArchivesTang.tang.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="4">
              <template slot="title">
                <h3>糖尿病附表</h3>
              </template>
              <div>
                <dia-betes
                  :disbetes="item"
                  v-for="(item,index) in result.bsArchivesTang.tang"
                  :key="index"
                ></dia-betes>
              </div>
            </el-collapse-item>
          </div>

           <div v-if="result.bsArchivesChu.healthplan.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="5">
              <template slot="title">
                <h3>健康计划</h3>
              </template>
              <div>
                <presc-ription :myfitplan="item" v-for="(item,index) in result.bsArchivesChu.healthplan" :key="index"></presc-ription>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.SFguanM.guanMounth.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="6">
              <template slot="title">
                <h3>冠心病随访表(月)</h3>
              </template>
              <div>
                <mgxb
                  :guanMounth="item"
                  v-for="(item,index) in result.SFguanM.guanMounth"
                  :key="index"
                ></mgxb>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.SFguanW.guanWeek.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="7">
              <template slot="title">
                <h3>冠心病随访表(周)</h3>
              </template>
              <div>
                <wgxb :guanWeek="item" v-for="(item,index) in result.SFguanW.guanWeek" :key="index"></wgxb>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.SFgaoM.gaoMounth.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="8">
              <template slot="title">
                <h3>高血压随访表(月)</h3>
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

          <div v-if="result.SFgaoW.gaoWeek.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="9">
              <template slot="title">
                <h3>高血压随访表(周)</h3>
              </template>
              <div>
                <wgxy :gaoWeek="item" v-for="(item,index) in result.SFgaoW.gaoWeek" :key="index"></wgxy>
              </div>
            </el-collapse-item>
          </div>

          <div v-if="result.SFNao.naocu.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="10">
              <template slot="title">
                <h3>脑卒中附表</h3>
              </template>
              <div>
                <naocu :Naocu="item" v-for="(item,index) in result.SFNao.naocu" :key="index"></naocu>
              </div>
            </el-collapse-item>
          </div>
          <div v-if="result.SFtangM.tangMounth.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="11">
              <template slot="title">
                <h3>糖尿病附表(月)</h3>
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
          <div v-if="result.SFtangW.tangWeek.length!=0">
            <div class="partition"></div>
            <el-collapse-item name="12">
              <template slot="title">
                <h3>糖尿病附表(周)</h3>
              </template>
              <div>
                <wtnb :tangWeek="item" v-for="(item,index) in result.SFtangW.tangWeek" :key="index"></wtnb>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
    </div>
    <vueToTop></vueToTop>
  
  </el-form>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import $ from "jquery";
import lentiVirus from "@/views/preview/manbing/FileTemplate/lentivirus.vue";
import appendixTable from "@/views/preview/manbing/FileTemplate/appendixTable.vue";
import cHd from "@/views/preview/manbing/illnessKindTemplate/CHD.vue";
import coronaryHeart from "@/views/preview/manbing/illnessKindTemplate/coronaryHeart.vue";
import diaBetes from "@/views/preview/manbing/illnessKindTemplate/diabetes.vue";
import prescRiption from "@/views/preview/manbing/illnessKindTemplate/prescription.vue";
import mgxb from "@/views/preview/suifang/guanxinbing/monthCoronaryHeartDisease.vue";
import wgxb from "@/views/preview/suifang/guanxinbing/weekCoronaryHeartDisease.vue";
import ygxb from "@/views/preview/suifang/guanxinbing/yearCoronaryHeartDisease.vue";
import mgxy from "@/views/preview/suifang/highBlood/monthhighBloodPressure.vue";
import wgxy from "@/views/preview/suifang/highBlood/weekhighBloodPressure.vue";
import ygxy from "@/views/preview/suifang/highBlood/yearhighBloodPressure.vue";
import naocu from "@/views/preview/suifang/naocu/brainDeath.vue";
import mtnb from "@/views/preview/suifang/tangniaobing/monthDiabetes.vue";
import wtnb from "@/views/preview/suifang/tangniaobing/weekDiabetes.vue";
import { getCode ,queryAllBsFlupInfo} from "@/api/sys/base.js";
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
    appendixTable,
    lentiVirus,
    cHd,
    coronaryHeart,
    diaBetes,
    prescRiption
  },

  data() {
    return {
      loading:false,
      imgshow:false,
      activeNames: [],
      code: "",
      hide: true,
      result: {
        bsArchives: { base: {} },
        bsArchivesS: { fubiao: [] },
        bsArchivesCopd: { mazuf: [] },
        bsArchivesGuan: { guan: [] },
        bsArchivesTang: { tang: [] },
        bsArchivesChu: { healthplan: [] },
        SFguanM: { guanMounth: [] },
        SFguanW: { guanWeek: [] },
        SFtangM: { tangMounth: [] },
        SFtangW: { tangWeek: [] },
        SFNao: { naocu: [] },
        SFgaoM: { gaoMounth: [] },
        SFgaoW: { gaoWeek: [] }
      }
    };
  },
  created() {
    let code = JSON.parse(sessionStorage.getItem("code"));
    this.code = code.code;
    this.checkTable();
    this.getSFCode();
    // this.list()
  },
  mounted() {
    
  },
  methods: {
    // list(){
    //   this.loading=true
    //   this.activeNames=["1","2","3","4","5","6","7","8","9","10","11","12"];
    //   this.loading=false
    //   setTimeout(() => {
    //      let canvasID = document.getElementById("html");
    //     let viewer = document.getElementById("viewer");
    //     let img = document.createElement("img");
    //     html2canvas(canvasID).then(canvas => {
    //       viewer.appendChild(img);
    //       img.setAttribute("src", canvas.toDataURL("image/png"));
    //       img.setAttribute("width", "100%");
    //     });
    //   }, 2000);
    // },
    pdfList(){
      this.activeNames=["1","2","3","4","5","6","7","8","9","10","11","12"];
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
    // printOut(name) {
    //     // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
    //     $(window).scrollTop(0);  // jQuery 的方法
    //     document.body.scrollTop = 0; // IE的
    //     document.documentElement.scrollTop = 0; // 其他
    //     this.downloadResult(name)
    // },
    getSFCode() {
      let _this = this;
      queryAllBsFlupInfo(_this.code).then(res => {
        let value = res.value;
        // 冠心病随访月
        // _this.result.SFguanM.guanMounth = value.bsMonthFlupCoronaries;
        _this.$set(_this.result.SFguanM,"guanMounth",value.bsMonthFlupCoronaries)
        // 冠心病随访周
        // _this.result.SFguanW.guanWeek = value.bsWeedFlupCoronaries;
        _this.$set(_this.result.SFguanW,"guanMguanWeekounth",value.bsWeedFlupCoronaries)
        // 糖尿病随访月
        // _this.result.SFtangM.tangMounth = value.bsMonthFlupDiabetes;
        _this.$set(_this.result.SFtangM,"guantangMounthMounth",value.bsMonthFlupDiabetes)
        // 糖尿病随访周
        // _this.result.SFtangW.tangWeek = value.bsWeedFlupDiabetes;
        _this.$set(_this.result.SFtangW,"tangWeek",value.bsWeedFlupDiabetes)
        // 高血压随访月
        // _this.result.SFgaoM.gaoMounth = value.bsMonthFlupFeritins;
        _this.$set(_this.result.SFgaoM,"gaoMounth",value.bsMonthFlupFeritins)
        // 高血压随访周
        // _this.result.SFgaoW.gaoWeek = value.bsWeedFlupFeritins;
        _this.$set(_this.result.SFgaoW,"gaoWeek",value.bsWeedFlupFeritins)
        // 脑卒中
        // _this.result.SFNao.naocu = value.bsFlupStrokes;
        _this.$set(_this.result.SFNao,"naocu",value.bsFlupStrokes)
      });
    },
    checkTable() {
      let _this = this;
      getCode(_this.code).then(res => {
        // 档案基础表
        _this.result.bsArchives.base = res.value.bsArchivesPastHistoryDTO;
        _this.$refs.mylentivirus.getMYinfo(this.result.bsArchives.base);
        // 档案附表
        _this.$set(
          _this.result.bsArchivesS,
          "fubiao",
          res.value.bsArchivesScheduleDTOList
        );

        // 慢阻肺附表
        _this.$set(
          _this.result.bsArchivesCopd,
          "mazuf",
          res.value.bsArchivesCopdList
        );

        // 冠心病附表
        _this.$set(
          _this.result.bsArchivesGuan,
          "guan",
          res.value.bsArchivesCoronaryList
        );

        // 糖尿病附表
        _this.$set(
          _this.result.bsArchivesTang,
          "tang",
          res.value.bsArchivesDiabetesList
        );

        // 健康计划
        _this.$set(
          _this.result.bsArchivesChu,
          "healthplan",
          res.value.bsHealthPlans
        );
        // let canvasID = document.getElementById("html");
        // let viewer = document.getElementById("viewer");
        // let img = document.createElement("img");
        // html2canvas(canvasID).then(canvas => {
        //   viewer.appendChild(img);
        //   img.setAttribute("src", canvas.toDataURL("image/png"));
        //   img.setAttribute("width", "100%");
        //   _this.hide = false;
        // });
      });
    }
  }
};
</script>
<style scoped>
.changesize>>>label{
  color:#373737
}
.base >>> h3 {
  padding-left: 12px;
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
.changesize >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
.changesize >>> .el-form-item__content {
  font-size: 16px !important;
}
.changesize >>> .el-form-item__label {
  font-size: 16px !important;
}
.changesize >>> .el-radio__label {
  font-size: 16px !important;
}
.changesize >>> .el-checkbox__label {
  font-size: 16px !important;
}
.changesize >>> .el-input-group__prepend {
  font-size: 16px;
}
.changesize >>> .el-input-group__append {
  font-size: 16px;
}
.changesize >>> .el-table th,
.el-table td {
  padding: 0 0 !important;
}
.changesize >>> .el-table td {
  border-bottom: 1px solid #888888;
}
.changesize >>> .el-table th.is-leaf {
  border-bottom: 1px solid #888888;
}
.changesize >>> .el-table--border th {
  border-right: 1px solid #888888;
}
.changesize >>> .el-table--border td {
  border-right: 1px solid #888888;
}
.changesize >>> .el-table--border {
  border: 1px solid #888888;
  color:#000
}
.changesize>>>.el-table th > .cell{
  color:#000
}
/* radio禁用 样式 */
.changesize>>>.el-radio__input.is-disabled.is-checked .el-radio__inner::after{
  background-color:#fff;
  border-color:#fff;
  cursor: default;
}
.changesize>>>.el-radio__input.is-disabled.is-checked .el-radio__inner{
  background-color:#56C8AC;
  border-color: #56C8AC;
  cursor: default;
}
.changesize>>>.el-radio__input.is-disabled + span.el-radio__label{
  color:#000;
  cursor: default;
}
.changesize>>>.el-radio__input.is-disabled .el-radio__inner{
  cursor: default;
}
/* input禁用样式 */
.changesize>>>.el-input.is-disabled .el-input__inner{
  background-color:transparent;
  color:#000;
  cursor: default;
}
/* 复选框 禁用样式 */
.changesize>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color:#56C8AC;
  border-color: #56C8AC;
  cursor: default;
}
.changesize>>>.el-checkbox__input.is-disabled + span.el-checkbox__label{
  color:#000;
  cursor: default;
}
.changesize>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
  border-color:#fff;
  cursor: default;
}
.changesize>>>.el-radio__input.is-disabled .el-radio__inner{
  border-color:#888
}
.changesize>>>.el-checkbox__input.is-disabled .el-checkbox__inner{
  border-color:#888
}
/* prepend禁用修改样式 */
.changesize >>> .el-input-group__prepend {
  background-color: transparent !important;
  border: none !important;
  color: #000
}
.changesize >>> .el-input__inner {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #ddd !important;
  color: #000
}
.changesize >>> .el-input-group__append {
  background-color: transparent !important;
  border: none !important;
  color: #000
}
.changesize>>>.el-textarea.is-disabled .el-textarea__inner{
  background-color:transparent !important;
  border-color:#ddd;
  color:#000;
  cursor:default;
}
</style>

<style>
/* @media print {
   body {
      color: #000;
      background: #fff;
   }
   nav, aside {
      display: none;
   }
 
   body, article {
      width: 100%;
      margin: 0;
      padding: 0;
   }
   el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
   @page {
      margin: 2cm;
      -webkit-print-color-adjust:exact
   }

} */

</style>
