<template>
  <div class="suifang app-container">
    <div>
      <b>排班表文件名：</b>
      <el-input size="medium" v-model="data.title"></el-input>
    </div>
    <div style="padding:25px 0">
      <b>排班科室：</b>
      <span style="margin-left:32px">{{data.departmentName}}</span>
    </div>
    <b>排班表</b>
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      class="tableArea"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="group" label="区域"></el-table-column>
      <el-table-column prop="time" label="时间段"></el-table-column>
      <el-table-column :label="datelist[0]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.one"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[1]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.two"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[2]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.three"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column :label="datelist[3]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.four"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[4]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.five"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[5]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.six"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column :label="datelist[6]" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.seven"></el-checkbox>
        </template>
      </el-table-column>
     
    </el-table>
    <div style="text-align:center;padding:25px">
      <el-button type="success" size="medium" @click="save(0)">创建</el-button>
      <el-button type="warning" size="medium" @click="save(1)">保存草稿</el-button>
    </div>
  </div>
</template>
<script>
import {
  createOrUpdateScheduling,
  saveOrUpdate,
  keshi,
  findDoctor
} from "@/api/workplan/BsSchedulingLog";
import { getInfo } from "@/api/login.js";
export default {
  name: "myNeedDeal",
  data() {
    return {
      departmentName: "",
      doctorlist: [],
      doctorData: {},
      useoriginTableObj: {},
      nameObj: {},
      checked: true,
      date1: "2015-01-02",
      rowList: [],
      spanArr: [],
      spanArr1: [],
      datelist: ["-","-","-","-","-","-","-"],
      position: 0,
      position1: 0,
      listData: [
     
      ],
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
    this.fun_date();
    this.date = new Date();
    
  },
  mounted() {
    this.getuserData();
    
  },
  methods: {
    // 获取当前周的周日
    getsunday() {
      let _date = new Date();
      let _nowTime = _date.getTime();
      let _week = _date.getDay();
      let _dayLongTime = 24 * 60 * 60 * 1000;
      let _furtureSundayTimes = _nowTime + (7 - _week) * _dayLongTime;
      let _furtureSaturdayTimes = _nowTime + (6 - _week) * _dayLongTime;
      _furtureSundayTimes = new Date(_furtureSundayTimes);
      _furtureSaturdayTimes = new Date(_furtureSaturdayTimes);
      // staurday
      let _satYear = _furtureSaturdayTimes.getFullYear();
      let _satMonth = _furtureSaturdayTimes.getMonth() + 1;
      let _satDay = _furtureSaturdayTimes.getDate();
      //sunday
      let _sunYear = _furtureSundayTimes.getFullYear();
      let _sunMonth = _furtureSundayTimes.getMonth() + 1;
      let _sunDay = _furtureSundayTimes.getDate();
      _satMonth = _satMonth >= 10 ? _satMonth : "0" + _satMonth;
      _satDay = _satDay >= 10 ? _satDay : "0" + _satDay;
      _sunMonth = _sunMonth >= 10 ? _sunMonth : "0" + _sunMonth;
      _sunDay = _sunDay >= 10 ? _sunDay : "0" + _sunDay;
      let _mealSunDay = _satYear + "-" + _satMonth + "-" + _satDay;
      console.log(_mealSunDay);
      return _mealSunDay;
    },
    // 往后的多少天
    fun_date() {
      let dayarr = [1, 2, 3, 4, 5, 6, 7],
      _this=this,
      newDateList=[];
      for (const a of dayarr) {
        var date1 = new Date(),
          time1 =
            date1.getFullYear() +
            "-" +
            (date1.getMonth() + 1) +
            "-" +
            date1.getDate();
        // var date1= this.getsunday();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + a);
        var time2 = this.formatDateTime(date2);

        // var time2 =
        //   date2.getFullYear() +
        //   "-" +
        //   (date2.getMonth() + 1) +
        //   "-" +
        //   date2.getDate();
        newDateList.push(time2);
        _this.$set(_this,"datelist",newDateList)
      }
      console.log(this.datelist);
    },
    // 转时间格式
    formatDateTime(date2) {
        var seperator1 = "-";
        var year = date2.getFullYear();
        var month = date2.getMonth() + 1;
        var strDate = date2.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      // return date2.toISOString();
    },
    // 获取用户信息
    getuserData() {
      let _this = this;
      getInfo().then(res => {
        if (res.code == 0) {
          _this.$set(this, "doctorData", res.value);
          _this.data.departmentCode = _this.doctorData.departmentCode;
        }
        _this.getkshi();
      });
    },
    // 获取科室信息
    getkshi() {
      let _this = this;

      let keshiObj = {
        departmentCode: _this.data.departmentCode
      };
      keshi(keshiObj).then(res => {
        if (res.code == 0) {
          _this.data.departmentName = res.value[0].departmentName;
        }
      });
      _this.getpeople();
    },
    // 获取当前科室人员
    getpeople() {
      let _this = this;
      let doctorObj = {
        leave2Code: this.data.departmentCode
      };
      findDoctor(doctorObj).then(res => {
        if (res.code == 0) {
          for (const item of res.value) {
            _this.listData.push({
              id: 0,
              date: "",
              code:item.code,
              name: item.doctorName,
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
            _this.listData.push({
              id: 1,
              date: "",
              code:item.code,
              name: item.doctorName,
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
            _this.listData.push({
              id: 2,
              date: "",
              code:item.code,
              name: item.doctorName,
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
            _this.listData.push({
              id: 3,
              date: "",
              code:item.code,
              name: item.doctorName,
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
          }

          _this.$nextTick(function() {
            _this.rowspan();
          });
        }
      });
    },
    // 创建或者保存草稿
    save(dataStatus) {
      this.data.dataStatus = dataStatus;
      this.changeData();
    },

    // 转换数据格式/取名
    changeData() {
      // 1
      let listname = [],
        _this = this;
      for (const key in _this.listData) {
        if (
          key > 1 &&
          _this.listData[key].name != _this.listData[key - 1].name
        ) {
          listname.push(_this.listData[key].name);
        } else if (key == 0) {
          listname.push(_this.listData[key].name);
        }
      }
      _this.changedatatype(listname);
    },
    // 重组数据结构
    changedatatype(listname) {
      // 2
      let _this = this;
      // 人名
      for (const name of listname) {
        let upArr = [];
        for (const iterator of _this.datelist) {
          upArr.push({
            schedulingDate: iterator,
            d_Scheduling_Am: 0,
            d_Scheduling_Pm: 0,
            x_Scheduling_Am: 0,
            x_Scheduling_Pm: 0,
            doctorCode: "",
            doctorName: name
          });
        }
        //转换成每个人对应七天数据
        _this.nameObj[name] = upArr;
        console.log(this.nameObj);
      }
      this.changeTableData();
    },
    // 表格数据转换成名字对应数据
    changeTableData() {
      // 3
      let _this = this;
      let originTableObj = {};
      for (const index in _this.listData) {
        if (index == 0) {
          originTableObj[_this.listData[index].name] = [];
          originTableObj[_this.listData[index].name].push(_this.listData[0]);
        } else if (
          index > 1 &&
          _this.listData[index].name == _this.listData[index - 1].name
        ) {
          originTableObj[_this.listData[index].name].push(
            _this.listData[index]
          );
        } else {
          if (originTableObj.hasOwnProperty(_this.listData[index].name)) {
            originTableObj[_this.listData[index].name].push(
              _this.listData[index]
            );
          } else {
            originTableObj[_this.listData[index].name] = [];
            originTableObj[_this.listData[index].name].push(
              _this.listData[index]
            );
          }
        }
      }
      _this.useoriginTableObj = originTableObj;
      console.log(originTableObj);
      _this.addDataToUp();
    },
    // 赋值
    addDataToUp() {
      // 4
      let _this = this;

      for (const name in _this.useoriginTableObj) {
        for (const key in _this.useoriginTableObj[name]) {
          var number = parseInt(key);
          switch (number) {
            case 0:
             
              _this.nameObj[name][0].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][1].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][2].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][3].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][4].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][5].doctorCode=_this.useoriginTableObj[name][0].code;
              _this.nameObj[name][6].doctorCode=_this.useoriginTableObj[name][0].code;

              _this.nameObj[name][0].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].one == true ? 1 : 0;
              _this.nameObj[name][1].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].two == true ? 1 : 0;
              _this.nameObj[name][2].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].three == true ? 1 : 0;
              _this.nameObj[name][3].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].four == true ? 1 : 0;
              _this.nameObj[name][4].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].five == true ? 1 : 0;
              _this.nameObj[name][5].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].six == true ? 1 : 0;
              _this.nameObj[name][6].d_Scheduling_Am =
                _this.useoriginTableObj[name][0].seven == true ? 1 : 0;
              break;
            case 1:
              _this.nameObj[name][0].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].one == true ? 1 : 0;
              _this.nameObj[name][1].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].two == true ? 1 : 0;
              _this.nameObj[name][2].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].three == true ? 1 : 0;
              _this.nameObj[name][3].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].four == true ? 1 : 0;
              _this.nameObj[name][4].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].five == true ? 1 : 0;
              _this.nameObj[name][5].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].six == true ? 1 : 0;
              _this.nameObj[name][6].d_Scheduling_Pm =
                _this.useoriginTableObj[name][1].seven == true ? 1 : 0;

              break;
            case 2:
              _this.nameObj[name][0].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].one == true ? 1 : 0;
              _this.nameObj[name][1].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].two == true ? 1 : 0;
              _this.nameObj[name][2].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].three == true ? 1 : 0;
              _this.nameObj[name][3].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].four == true ? 1 : 0;
              _this.nameObj[name][4].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].five == true ? 1 : 0;
              _this.nameObj[name][5].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].six == true ? 1 : 0;
              _this.nameObj[name][6].x_Scheduling_Am =
                _this.useoriginTableObj[name][2].seven == true ? 1 : 0;
              break;
            case 3:
              _this.nameObj[name][0].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].one == true ? 1 : 0;
              _this.nameObj[name][1].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].two == true ? 1 : 0;
              _this.nameObj[name][2].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].three == true ? 1 : 0;
              _this.nameObj[name][3].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].four == true ? 1 : 0;
              _this.nameObj[name][4].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].five == true ? 1 : 0;
              _this.nameObj[name][5].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].six == true ? 1 : 0;
              _this.nameObj[name][6].x_Scheduling_Pm =
                _this.useoriginTableObj[name][3].seven == true ? 1 : 0;

              break;

            default:
              break;
          }
        }
      }
      _this.data.schedulings = [];
      for (const key in _this.nameObj) {
        _this.data.schedulings = _this.data.schedulings.concat(
          _this.nameObj[key]
        );
      }
      console.log(_this.data.schedulings);
      _this.upload();
    },
    // 提交数据
    upload() {
      let _this = this;
      if (_this.data.dataStatus == 0) {
        this.$confirm("此操作将保存数据且不可更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            createOrUpdateScheduling(_this.data).then(res => {
             if (res.code==0) {
            _this.$message.success(res.msg);
            _this.$router.push("/BsSchedulingLog");
          }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else if (_this.data.dataStatus == 1) {
        createOrUpdateScheduling(_this.data).then(res => {
          if (res.code==0) {
            _this.$message.success(res.msg);
            _this.$router.push("/BsSchedulingLog");
          }
          console.log(res);
        });
      }
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
    }
  }
};
</script>
<style lang="scss" scoped>
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

