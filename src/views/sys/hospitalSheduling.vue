<template>
  <div class="suifang app-container">
    <div>
    <b> 排班表明：</b><el-input size="medium"></el-input>

    </div>
    <div style="padding:25px 0">
      <b> 排班科室：</b><span>心内科</span>
    </div>
    <b> 排班表</b>
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      class="tableArea"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" align="center" width="200"/>
      <el-table-column prop="group" label="区域"/>
      <el-table-column prop="time" label="时间段"/>
      <el-table-column prop="time" label="date"></el-table-column>
      <!-- <el-table-column
          prop="templateUrl"
          label="templateUrl"
      />-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <i class="el-icon-edit-outline" @click="modify(scope)"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <i class="el-icon-delete" @click="deleteData(scope)"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;padding:25px">
      <el-button type="success" size="medium">创建</el-button>
      <el-button type="warning" size="medium">保存草稿</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "myNeedDeal",
  data() {
    return {
      date:"",
      rowList: [],
      spanArr: [],
      spanArr1: [],
      position: 0,
      position1: 0,
      listData: []
    };
  },
  created() {
    this.date=new Date();
    console.log(this.date ,"sdkflsk ")
    this.fun_date(34)
  },
mounted() {
  
   
},
  
  methods: {
    fun_date(a){
      var date1 = new Date(), 
       time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate(); 
       var date2 = new Date(date1);  
       console.log(date1.getDate())    
       date2.setDate(date1.getDate() + a);     
       var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      console.log(time2)
    },
    queryData() {
      //查询操作
      this.listData = [
        {
          id: 0,
          name: "张三",
          group: "东区",
          time: "上午"
        },
        {
          id: 1,
          name: "张三",
          group: "东区",
          time: "下午"
        },
        {
          id: 2,
          name: "张三",
          group: "西区",
          time: "上午"
        },
        {
          id: 3,
          name: "张三",
          group: "西区",
          time: "下午"
        },
        {
          id: 0,
          name: "李四",
          group: "东区",
          time: "上午"
        },
        {
          id: 1,
          name: "李四",
          group: "东区",
          time: "下午"
        },
        {
          id: 2,
          name: "李四",
          group: "西区",
          time: "上午"
        },
        {
          id: 3,
          name: "李四",
          group: "西区",
          time: "下午"
        }
      ];
      this.rowspan();
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
  },
  mounted() {
    this.queryData();
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

