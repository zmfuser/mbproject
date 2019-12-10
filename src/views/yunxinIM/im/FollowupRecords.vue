<template>
  <div class="suifang app-container r-userinfo">
    <div>随访记录</div>
      <div class="allTable">
        <div class="tableButton" @click="aaddSF">
          <div>
            <div class="tableType">
              <img
                data-filenum="1"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_gaoxueya.png"
                alt
              />
              <img
                data-filenum="1"
                v-show="addFileObj.gaoxueyaWeek"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="1"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.gaoxueyaWeek"></i>

              <p class="bingBiao">高血压随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="2"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_gaoxueya.png"
                alt
              />
              <img
                data-filenum="2"
                v-show="addFileObj.gaoxueyaMounth"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="2"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.gaoxueyaMounth"></i>

              <p class="bingBiao">高血压随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="3"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_guanxinb.png"
                alt
              />
              <img
                data-filenum="3"
                v-show="addFileObj.guanxinbingWeek"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="3"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.guanxinbingWeek"></i>

              <p class="bingBiao">冠心病随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="4"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_guanxinb.png"
                alt
              />
              <img
                data-filenum="4"
                v-show="addFileObj.guanxinbingMounth"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="4"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.guanxinbingMounth"></i>

              <p class="bingBiao">冠心病随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="5"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_tlb.png"
                alt
              />
              <img
                data-filenum="5"
                v-show="addFileObj.tangniaobingWeek"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="5"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.tangniaobingWeek"></i>

              <p class="bingBiao">糖尿病随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="6"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_tlb.png"
                alt
              />
              <img
                data-filenum="6"
                v-show="addFileObj.tangniaobingMounth"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="6"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.tangniaobingMounth"></i>

              <p class="bingBiao">糖尿病随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="7"
                class="absoluteImg"
                src="../../../../static/png/manbintc_button_ncz.png"
                alt
              />
              <img
                data-filenum="7"
                v-show="addFileObj.naozuzhong"
                class="selection"
                src="../../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="7"
                class="buttomImg"
                src="../../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.naozuzhong"></i>

              <p class="bingBiao">脑卒中随访表</p>
            </div>
          </div>
        </div>
        <div class="confirm">
          <el-button class="confirmButton" @click="addSFTable">确认</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import { queryBsFlupList } from "@/api/sys/suifang.js";
export default {
  data() {
    return {
      suifanNumber: 0,
      querys: {
        archivesCodeDisplay: "",
        healthAssistantName: "",
        createTime: ""
      },
      employee: {
        archivesUserName: "",
        archivesCode: "",
        healthAssistantName: "",
        dataStatus: "",
        createTime: "",
        flupType: ""
      },
      total: 0,
      pagecQuery: {
        page: 1,
        limit: 10
      },
      submitLoading: false,
      SFlist: [],
      listLoading: false,
      dialogDoctorVisible: false,
      dialogaddSFVisible: false,
      confim:{},
      addFileObj: {
        gaoxueyaWeek: false,
        gaoxueyaMounth: false,
        guanxinbingWeek: false,
        guanxinbingMounth: false,
        naozuzhong: false,
        tangniaobingWeek: false,
        tangniaobingMounth: false
      }
    };
  },
  mounted() {
    let _this=this
    _this.$bus.on("dialog", res => {
      console.log(res);
      if (res.key == 1) {
        _this.dialogaddSFVisible = true;
        
      }
    });
  },
  methods: {
        // 添加随访记录-确认
    addSFTable() {
      let _this=this
      for (const item in _this.addFileObj) {
        _this.confim = _this.addFileObj[item] || _this.confim;
      }
      if (_this.confim) {
        sessionStorage.setItem("data", JSON.stringify(_this.addFileObj));
        sessionStorage.setItem("suifanNumber", _this.suifanNumber);
        _this.$router.push("/tableSF");
        _this.$bus.emit("contactUsesr", 2);
      } //把data对应的值保存到sessionStorage
      _this.addFileObj=null
    },
    baseLBTN1(value) {
      if (value == 1) {
        return false;
      } else {
        return true;
      }
    },
     addFileToSF() {
      this.dialogaddSFVisible = true;
    },
    // 添加随访记录弹窗
    aaddSF(e) {
      let _this=this
      if (e.target.nodeName == "IMG") {
        var number = e.target.dataset.filenum;
        if (number == 1) {
          _this.addFileObj.gaoxueyaWeek = !_this.addFileObj.gaoxueyaWeek;
          if (_this.addFileObj.gaoxueyaWeek) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 2) {
          _this.addFileObj.gaoxueyaMounth = !_this.addFileObj.gaoxueyaMounth;
          if (_this.addFileObj.gaoxueyaMounth) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 3) {
          _this.addFileObj.guanxinbingWeek = !_this.addFileObj.guanxinbingWeek;
          if (_this.addFileObj.guanxinbingWeek) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 4) {
          _this.addFileObj.guanxinbingMounth = !_this.addFileObj
            .guanxinbingMounth;
          if (_this.addFileObj.guanxinbingMounth) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 5) {
          _this.addFileObj.tangniaobingWeek = !_this.addFileObj.tangniaobingWeek;
          if (_this.addFileObj.tangniaobingWeek) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 6) {
          _this.addFileObj.tangniaobingMounth = !_this.addFileObj
            .tangniaobingMounth;
          if (_this.addFileObj.tangniaobingMounth) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        } else if (number == 7) {
          _this.addFileObj.naozuzhong = !_this.addFileObj.naozuzhong;
          if (_this.addFileObj.naozuzhong) {
            _this.suifanNumber += 1;
          } else {
            _this.suifanNumber -= 1;
          }
        }
      }
      }
    },
};
</script>


<style scoped>
.r-userinfo {
  position: absolute;
  top: 0;
  left: 870px;
  height: 100%;
  /* left: 900px; */
  border: 1px solid #ddd;
  width: 360px;
  background: #f2f2f2;
  z-index: 700;
  border-radius:0px;
  /* display: none; */
}
.marginTop {
  margin-top: 10px;
}
.icon-sizeWidth .el-button {
  padding: 5px 5px;
}
.div-flex {
  width: 85%;
  margin: 15px auto;
  display: flex;
  justify-content: space-around;
}
.div-flex label {
  font-weight: normal;
  font-size: 14px;
}
.buildFile {
  background: #f1c264;
  color: #ffffff;
}

.tableType {
  margin-bottom: 40%;
  position: relative;
}
.table_icon {
  position: absolute;
  bottom: 20px;
  right: 5px;
}
.selection {
  position: absolute;
  width: 85px;
}
/* 添加随访记录弹窗样式 */
.allTable {
  width: 100%;
  text-align: center;
}
.tableButton > .el-button {
  margin-bottom: 5px;
  width: 25%;
  margin-left: 45px;
}

.tableButton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
}
.tableType {
  position: relative;
  margin: 10px;
}
.tableType .buttomImg {
  width: 85px;
}
.absoluteImg {
  position: absolute;
  left: 20%;
  bottom: 36%;
  width: 50px;
}
.tableButton > .el-button {
  margin-bottom: 5px;
  width: 25%;
  margin-left: 45px;
}
.confirm {
  width: 30%;
  margin: 0 auto;
}
.confirmButton {
  background: #56c8ac;
  color: #ffffff;
  width: 100%;
}
</style>

