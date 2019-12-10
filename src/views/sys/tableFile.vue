<template>
  <div class="base">
    <div class="DAfb">
      <h2>档案附表</h2>
    </div>
    <div class="header">
      <div>
        档案号：
        <!-- <el-input v-model="" disabled></el-input> -->
        <span>{{archivesCode}}</span>
      </div>
      <div>
        姓名：
        <span>{{userName}}</span>
        <!-- <el-input v-model="userName" disabled></el-input> -->
      </div>
      <div>
        年龄：
        <span>{{userAge}}</span>
        <!-- <el-input v-model="" disabled></el-input> -->
      </div>
    </div>
    <!-- @change="handleChange  el-collapse事件-->
    <el-collapse v-model="activeNames">
      <div v-show="addFileObj.selectionbase">

        <div class="partition"></div>
        <el-collapse-item name="1" class="icon-delete">
          
          <template slot="title">
            <!-- 1 -->
            <h3>慢病档案附表</h3>
            <i class="el-icon-delete" @click="fubiaoDele(1)"></i>
          </template>
          <div>
            <!-- 基础档案表1 -->
            <appendixTable ref="receiveAppend"></appendixTable>
          </div>
        </el-collapse-item>
      </div>

      <div v-if="addFileObj.selectionGuanXin">
        <div class="partition"></div>
        <el-collapse-item name="2" class="icon-delete">
          
          <template slot="title">
            <!-- 2 -->
            <h3>冠心病附表</h3>
            <i class="el-icon-delete" @click="fubiaoDele(2)"></i>
          </template>

          <div>
            <!-- 冠心病检查结果2 -->
            <CHD ref="receiveCHD"></CHD>
          </div>
        </el-collapse-item>
      </div>

      <div v-if="addFileObj.selectionTangNiao">
        
        <div class="partition"></div>
        <el-collapse-item title="效率 Efficiency" name="3" class="icon-delete">      
          <template slot="title">
            <!-- 3 -->
            <h3>糖尿病附表</h3>
            <i class="el-icon-delete" @click="fubiaoDele(3)"></i>
          </template>
          <div>
            <!-- 糖尿病检查结果3 -->
            <diabetes ref="receivediabetes"></diabetes>
          </div>
        </el-collapse-item>
      </div>
      <div v-if="addFileObj.selectionManZF">
        <div class="partition"></div>
        <el-collapse-item name="4" class="icon-delete">
          
          <template slot="title">
            <!-- 4 -->
            <h3>慢阻肺附表</h3>
            <i class="el-icon-delete" @click="fubiaoDele(4)"></i>
          </template>
          <div>
            <!-- 慢阻肺患者病史及检查结果5 -->
            <coronaryHeart ref="receivecoronaryHeart"></coronaryHeart>
          </div>
        </el-collapse-item>
      </div>
      <div class="finally">
        <el-button size="medium" type="success" @click="pushfile">提交数据</el-button>
      </div>
    </el-collapse>
    <vueToTop></vueToTop>
  </div>
</template>
<script>
import { insertBsAS } from "@/api/sys/base.js";
import appendixTable from "@/views/table/FileTemplate/appendixTable";
import CHD from "@/views/table/illnessKindTemplate/CHD";
import coronaryHeart from "@/views/table/illnessKindTemplate/coronaryHeart";
import diabetes from "@/views/table/illnessKindTemplate/diabetes";
export default {
  data() {
    return {
      num: 0,
      archivesCode:'',
      addFileObj: {},
      // row:"",
      activeNames: ["1", "2", "3", "4"],
      appendTableValue: "",
      userAge: "",
      userName: "",
      form: {
        archivesCode: "1121638247294959616"
        // // 基础表
        // bsArchivesScheduleHistoryDoseHospital: {},
        // // 冠心病
        // bsArchivesCoronary: {},
        // // 糖尿病
        // bsArchivesDiabetes: {},
        // // 慢阻肺
        // bsArchivesCopd: {}
      }
    };
  },
  components: {
    appendixTable,
    CHD,
    coronaryHeart,
    diabetes
  },

  created() {
    //   获取需要显示列表的状态
    this.addFileObj = JSON.parse(sessionStorage.getItem("data"));
  },
  mounted() {
    // 传用户名 age...
    this.userage();
    this.num = sessionStorage.getItem("num");
  },
  methods: {
    // 删除附表
    fubiaoDele(value) {
      let _this = this;
      if (_this.num > 1) {
        switch (value) {
          case 1:
            // delete obj.key1
            _this.addFileObj.selectionbase = false;
            break;
          case 2:
            _this.addFileObj.selectionGuanXin = false;
            break;
          case 3:
            _this.addFileObj.selectionTangNiao = false;
            break;
          case 4:
            _this.addFileObj.selectionManZF = false;
            break;
        }
        _this.num = _this.num-1;
      }else {
        _this.$message.warning("最后一个不可删除")
      }
    },
    // 传用户名 age...
    userage() {
      let value = JSON.parse(sessionStorage.getItem("baseValue"));
      // let value=JSON.parse(this.$route.params.value);
      this.form.archivesCode = value.code;
      this.userAge = value.userAge;
      this.userName = value.userName;
      this.archivesCode=value.archivesCode
    },
    //提交数据
    pushfile() {
      let _this = this;
      _this
        .$confirm("此操作将提交数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // 附表添加拦截

          if (_this.addFileObj.selectionbase) {
            let value = _this.$refs.receiveAppend.form;
            _this.$set(
              _this.form,
              "bsArchivesScheduleHistoryDoseHospital",
              value
            );
          }
          if (_this.addFileObj.selectionTangNiao) {
            let value = _this.$refs.receivediabetes.form;
            _this.$set(_this.form, "bsArchivesDiabetes", value);
          }

          if (_this.addFileObj.selectionManZF) {
            let value = _this.$refs.receivecoronaryHeart.form;
            _this.$set(_this.form, "bsArchivesCopd", value);
          }
          if (_this.addFileObj.selectionGuanXin) {
            let value = _this.$refs.receiveCHD.form;
            _this.$set(_this.form, "bsArchivesCoronary", value);
          }
          // 调用添加附表接口
          insertBsAS(_this.form).then(res => {
            if (res.code == 0) {
              _this.$message.success(res.value);
              _this.$router.push("/manB/manBIng");
            } else {
              _this.$message.error(res.value);
            }
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  }
};
</script>
<style scoped>
.icon-delete {
  position: relative;
}
.el-icon-delete {
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 24px;
  cursor: pointer;
  z-index: 9999;
}
h3 {
  margin-left: 12px;
}
.partition {
  border: 12px solid #e9f2f5;
}
.DAfb {
  background-color: #e9f2f5;
  text-align: center;
  line-height: 45px;
}
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-around;
}
.header .el-input {
  width: 68% !important;
}
.header div span {
  line-height: 40px;
}
.header >>> .el-input__inner {
  background-color: #e9f2f5 !important;
}
.finally {
  text-align: center;
  margin: 12px 12px;
}
</style>
