<template >
  <div class="tableTest">
     <div class="app">
        <input class="tar" type="text" :value="vals.join('/')" readonly placeholder="下拉选择 (可多选)" @click="change($event)">
        <div class="hide">
          <label v-for="item in list" class="tar" :key="item">
            <input class="tar" type="checkbox" v-model="vals" :value="item.id">
            {{item.name}}</label>
        </div>
    </div> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: {}, //初始列表数据
        vals: [], //选择的数据
        flag: false //toggle标记
      }
    }, 
    methods: {
      change(e){
      this.initData();
    },
      //渲染列表数据
      initData() {
        var data = [{
          id: 1,
          name: "冠心病"
        }, {
          id: 2,
          name: "糖尿病"
        }, {
          id: 3,
          name: "高血压"
        }];
        //赋值
        this.list = data;
      }
    },
  }
</script>

<style>
  .app {
    width:250px;
    background-color: #f5f5f5;
  }
  .app:hover .hide{
    display:block;
  }

  .hide{
    display: none
  }
  .app>input {
    outline: none;
    width: 100%;
    height: 30px;
    text-indent: 6px;
  }

  .app>div>label {
    display: block;
    cursor: pointer;
    text-indent: 10px;
    padding: 8px 0;
    margin: 0;
  }
  .app>div>label:hover{
    background-color:#fff;
  }
</style>

