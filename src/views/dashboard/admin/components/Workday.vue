<template>
  <div class="suifang app-container">
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      class="tableArea"
      style="width: 100%"
      :disabled="true"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="group" label="区域"></el-table-column>
      <el-table-column prop="time" label="时间段"></el-table-column>
      <el-table-column :label="datelist[0]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.one" v-show="scope.row.one"></el-checkbox> -->
          <span v-if="!scope.row.one">休息</span>
          <span v-else-if="scope.row.one" class="work">上班</span>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[1]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.two" v-show="scope.row.two"></el-checkbox> -->
          <span v-if="!scope.row.two">休息</span>
          <span v-else-if="scope.row.two" class="work">上班</span>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[2]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.three" v-show="scope.row.three"></el-checkbox> -->
          <span v-if="!scope.row.three">休息</span>
          <span v-else-if="scope.row.three" class="work">上班</span>
        </template>
      </el-table-column>

      <el-table-column :label="datelist[3]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.four" v-show="scope.row.four"></el-checkbox> -->
          <span v-if="!scope.row.four">休息</span>
          <span v-else-if="scope.row.four" class="work">上班</span>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[4]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.five" v-show="scope.row.five"></el-checkbox> -->
          <span v-if="!scope.row.five">休息</span>
          <span v-else-if="scope.row.five" class="work">上班</span>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[5]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.six" v-show="scope.row.six"></el-checkbox> -->
          <span v-if="!scope.row.six">休息</span>
          <span v-else-if="scope.row.six" class="work">上班</span>
        </template>
      </el-table-column>
      <span :label="datelist[6]" align="center">
        <template slot-scope="scope">
          <!-- <el-checkbox :disabled="true" v-model="scope.row.seven" v-show="scope.row.seven"></el-checkbox> -->
          <span v-if="!scope.row.seven">休息</span>
          <span v-else-if="scope.row.seven" class="work">上班</span>
        </template>
      </span>
    </el-table>
  </div>
</template>
<script>
import { queryDoctorSchedul } from "@/api/sys/report";
import { getInfo } from "@/api/login.js";
export default {
  name: "myNeedDeal",
  data() {
    return {
      updateData: {},
      departmentName: "",
      doctorlist: [],
      doctorData: {},
      hospitalShedulingDataNewObj: {},
      useoriginTableObj: {},
      daoloaduseoriginTableObj: {},
      nameObj: {},
      daoLoadNameObj: {},
      checked: true,
      date1: "",
      rowList: [],
      spanArr: [],
      spanArr1: [],
      datelist: ["1","1","1","1","1","1","1"],
      daoLoadDatelist: [],
      position: 0,
      position1: 0,
      listData: [],
      data: {
        title: "",
        // 0-发布 1-草稿
        dataStatus: 1,
        departmentCode: "",
        departmentName: "",
        schedulings: []
      }
    };
  },
  created() {
    // this.date = new Date();
  },
  mounted() {
    this.queryData();
  },
  methods: {
    // 获取日期数据
    getdateData(schedulings) {
      let _this = this,
        arr1 = [];
      for (let index = 0; index < 7; index++) {
        arr1.push(schedulings[index].schedulingDate);
      }
      _this.$set(_this, "datelist", arr1);
      // debugger;
    },
    // 返回一个键名为rowspan和colspan的对象(行和列)
    rowspan() {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
          this.spanArr1.push(1);
          this.position1 = 0;
        } else {
          if (this.listData[index].name === this.listData[index - 1].name) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
          if (this.listData[index].group === this.listData[index - 1].group) {
            this.spanArr1[this.position1] += 1;
            this.spanArr1.push(0);
          } else {
            this.spanArr1.push(1);
            this.position1 = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      //row: 当前行 column: 当前列 rowIndex：当前行号 columnIndex ：当前列号
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 1) {
        const _row = this.spanArr1[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    queryData() {
      //查询操作
      let _this = this;
      var hospitalShedulingDataobj = JSON.parse(
        sessionStorage.getItem("hospitalShedulingData")
      );
      _this.$set(
        _this,
        "hospitalShedulingDataNewObj",
        hospitalShedulingDataobj
      );

      queryDoctorSchedul().then(res => {
        if (res.code == 0) {
          // debugger
          _this.data.title = res.value.title;
          _this.data.departmentName = res.value.departmentName;
          _this.$set(_this, "updateData", res.value);
          _this.$nextTick(function() {
            _this.getdateData(res.value);
            _this.changedloadData();
          });
        }
      });
    },
    // 转换数据格式/取名
    changedloadData() {
      let _this = this,
        listname = [];
      for (const key in _this.updateData) {
        if (
          key > 1 &&
          _this.updateData[key].doctorName !=
            _this.updateData[key - 1].doctorName
        ) {
          listname.push(_this.updateData[key].doctorName);
        } else if (key == 0) {
          listname.push(_this.updateData[key].doctorName);
        }
      }

      _this.daoloadDatatype(listname);
    },
    // 根据人名重组数据结构
    daoloadDatatype(listname) {
      let _this = this;
      // 人名
      for (const name of listname) {
        let upArr = [];
        upArr.push({
          id: 0,
          date: "",
          name: name,
          group: "东区",
          time: "上午",
          one: false,
          two: false,
          three: false,
          four: false,
          five: false,
          six: false,
          seven: false
        });
        upArr.push({
          id: 0,
          date: "",
          name: name,
          group: "东区",
          time: "下午",
          one: false,
          two: false,
          three: false,
          four: false,
          five: false,
          six: false,
          seven: false
        });
        upArr.push({
          id: 0,
          date: "",
          name: name,
          group: "西区",
          time: "上午",
          one: false,
          two: false,
          three: false,
          four: false,
          five: false,
          six: false,
          seven: false
        });
        upArr.push({
          id: 0,
          date: "",
          name: name,
          group: "西区",
          time: "下午",
          one: false,
          two: false,
          three: false,
          four: false,
          five: false,
          six: false,
          seven: false
        });

        //转换成四条对应七天数据
        _this.daoLoadNameObj[name] = upArr;
        // console.log(this.nameObj);
      }
      this.changeDaoloadTableData();
    },
    // 根据人名分组response数据
    changeDaoloadTableData() {
      let _this = this;
      let originTableObj = {};
      for (const index in _this.updateData) {
        if (index == 0) {
          originTableObj[_this.updateData[index].doctorName] = [];
          originTableObj[_this.updateData[index].doctorName].push(
            _this.updateData[0]
          );
        } else if (
          index > 1 &&
          _this.updateData[index].doctorName ==
            _this.updateData[index - 1].doctorName
        ) {
          originTableObj[_this.updateData[index].doctorName].push(
            _this.updateData[index]
          );
        } else {
          if (
            originTableObj.hasOwnProperty(_this.updateData[index].doctorName)
          ) {
            originTableObj[_this.updateData[index].doctorName].push(
              _this.updateData[index]
            );
          } else {
            originTableObj[_this.updateData[index].doctorName] = [];
            originTableObj[_this.updateData[index].doctorName].push(
              _this.updateData[index]
            );
          }
        }
      }
      _this.$set(_this, "daoloaduseoriginTableObj", originTableObj);
      // _this.daoloaduseoriginTableObj=originTableObj

      _this.addData();
    },
    // 赋值给表格数据
    addData() {
      let _this = this,
        listDataSpan = [];
      for (const name in _this.daoLoadNameObj) {
        for (const key in _this.daoLoadNameObj[name]) {
          var number = parseInt(key);
          switch (number) {
            case 0:
              _this.daoLoadNameObj[name][0].one =
                _this.daoloaduseoriginTableObj[name][0].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].two =
                _this.daoloaduseoriginTableObj[name][1].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].three =
                _this.daoloaduseoriginTableObj[name][2].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].four =
                _this.daoloaduseoriginTableObj[name][3].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].five =
                _this.daoloaduseoriginTableObj[name][4].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].six =
                _this.daoloaduseoriginTableObj[name][5].dschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][0].seven =
                _this.daoloaduseoriginTableObj[name][6].dschedulingAm == 1
                  ? true
                  : false;
              break;
            case 1:
              _this.daoLoadNameObj[name][1].one =
                _this.daoloaduseoriginTableObj[name][0].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].two =
                _this.daoloaduseoriginTableObj[name][1].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].three =
                _this.daoloaduseoriginTableObj[name][2].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].four =
                _this.daoloaduseoriginTableObj[name][3].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].five =
                _this.daoloaduseoriginTableObj[name][4].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].six =
                _this.daoloaduseoriginTableObj[name][5].dschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][1].seven =
                _this.daoloaduseoriginTableObj[name][6].dschedulingPm == 1
                  ? true
                  : false;
              break;
            case 2:
              _this.daoLoadNameObj[name][2].one =
                _this.daoloaduseoriginTableObj[name][0].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].two =
                _this.daoloaduseoriginTableObj[name][1].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].three =
                _this.daoloaduseoriginTableObj[name][2].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].four =
                _this.daoloaduseoriginTableObj[name][3].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].five =
                _this.daoloaduseoriginTableObj[name][4].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].six =
                _this.daoloaduseoriginTableObj[name][5].xschedulingAm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][2].seven =
                _this.daoloaduseoriginTableObj[name][6].xschedulingAm == 1
                  ? true
                  : false;
              break;
            case 3:
              _this.daoLoadNameObj[name][3].one =
                _this.daoloaduseoriginTableObj[name][0].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].two =
                _this.daoloaduseoriginTableObj[name][1].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].three =
                _this.daoloaduseoriginTableObj[name][2].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].four =
                _this.daoloaduseoriginTableObj[name][3].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].five =
                _this.daoloaduseoriginTableObj[name][4].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].six =
                _this.daoloaduseoriginTableObj[name][5].xschedulingPm == 1
                  ? true
                  : false;
              _this.daoLoadNameObj[name][3].seven =
                _this.daoloaduseoriginTableObj[name][6].xschedulingPm == 1
                  ? true
                  : false;
              break;

            default:
              break;
          }
        }
      }
      console.log(_this.daoLoadNameObj);

      for (const name in _this.daoLoadNameObj) {
        listDataSpan = listDataSpan.concat(_this.daoLoadNameObj[name]);
      }

      _this.$set(_this, "listData", listDataSpan);
      _this.$nextTick(function() {
        _this.rowspan();
      });
    }
  }
};
</script>
<style scoped>
.work{
  color: #000;
  font-weight: bolder
}
.app-container
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #56c8ac;
  border-color: #56c8ac;
  cursor: default;
}
.app-container >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #000;
  cursor: default;
}
.app-container
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
  cursor: default;
}
.app-container >>> .el-radio__input.is-disabled .el-radio__inner {
  border-color: #888;
}
.app-container >>> .el-checkbox__input.is-disabled .el-checkbox__inner {
  border-color: #888;
}

.app-container {
  max-width: 100% !important;
  margin: 0 auto;
  margin-bottom:32px;
}
.el-select {
  margin-right: 15px;
}
.el-input {
  margin-right: 15px;
  width: 200px;
}
.tableArea {
  border: 1px solid #ccc;
}
i[class^="el-icon"] {
  margin-right: 5px;
  font-size: 16px;
  cursor: pointer;
}
.modify_table {
  td {
    padding: 10px;
  }
}
.item_title {
  text-align: right;
}
</style>

