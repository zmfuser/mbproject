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
      <el-table-column :label="  datelist[0]" align="center">
        <template slot-scope="scope">
          <!-- {{datelist[0]}} -->
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
      <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
      <!-- <el-table-column
          prop="templateUrl"
          label="templateUrl"
      />-->
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <i class="el-icon-edit-outline" @click="modify(scope)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <i class="el-icon-delete" @click="deleteData(scope)" />
          </el-tooltip>
        </template>
      </el-table-column>-->
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
  findDoctor,
  getOneScheduling
} from "@/api/workplan/BsSchedulingLog";
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
      // datelist: ["1","1","1","1","1","1","1"],
      datelist: ["-","-","-","-","-","-","-"],
      daoLoadDatelist: [],
      position: 0,
      position1: 0,
      listData: [
        // {
        //   id: 0,
        //   date: "2015-01-01",
        //   name: "张三",
        //   group: "东区",
        //   time: "上午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: false,
        //   name: "张三",
        //   group: "东区",
        //   time: "下午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 2,
        //   name: "张三",
        //   group: "西区",
        //   time: "上午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 3,
        //   name: "张三",
        //   group: "西区",
        //   time: "下午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 0,
        //   name: "李四",
        //   group: "东区",
        //   time: "上午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 1,
        //   name: "李四",
        //   group: "东区",
        //   time: "下午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 2,
        //   name: "李四",
        //   group: "西区",
        //   time: "上午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // },
        // {
        //   id: 3,
        //   name: "李四",
        //   group: "西区",
        //   time: "下午",
        //   one: false,
        //   two: false,
        //   three: false,
        //   four: false,
        //   five: false,
        //   six: false,
        //   seven: false
        // }
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
  beforeCreate() {
    
  },
  created() {
    this.date = new Date();
   this.queryData();
  },
  mounted() {
    
  },
 
  methods: {
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
      _this.data.departmentName=hospitalShedulingDataobj.departmentName;
      getOneScheduling(_this.hospitalShedulingDataNewObj.code).then(res => {
        if (res.code == 0) {
          debugger
          _this.data.code = res.value.code;
          _this.data.title = res.value.title;
          _this.data.departmentCode = res.value.departmentCode;
          _this.data.departmentName = res.value.departmentName;
          _this.$set(_this, "updateData", res.value.schedulings);
          _this.getdateData(res.value.schedulings);
          _this.changedloadData();
        }
      });
    },
    // 获取日期数据
    getdateData(schedulings){
      let _this=this,
          arr1=[];
      for (let index = 0; index < 7; index++) {
      arr1.push(schedulings[index].schedulingDate)
        
      }
      _this.$set(_this,"datelist",arr1);
      console.log(this.datelist)
      _this.$nextTick(function(){


      })
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
             _this.daoLoadNameObj[name][0].code=_this.daoloaduseoriginTableObj[name][1].doctorCode;
              _this.daoLoadNameObj[name][1].code=_this.daoloaduseoriginTableObj[name][1].doctorCode;
              _this.daoLoadNameObj[name][2].code=_this.daoloaduseoriginTableObj[name][1].doctorCode;
              _this.daoLoadNameObj[name][3].code=_this.daoloaduseoriginTableObj[name][1].doctorCode;

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
    },
    // 、、、、、、、、、、、、、、、、、、
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
            //               d_Scheduling_Am
            // d_Scheduling_Pm
            // x_Scheduling_Am
            // x_Scheduling_Pm
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
        // console.log(this.nameObj);
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
              if (res.code == 0) {
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
      } else {
        createOrUpdateScheduling(_this.data).then(res => {
          if (res.code == 0) {
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

