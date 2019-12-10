<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <im v-show="show"></im>
  </div>
</template>

<script>
import im from "@/views/yunxinIM/test1.vue";
export default {
  name: "App",
  components: {
    im: im
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      userid: "",
      isRouterAlive: true,
      show: false
    };
  },
  created() {},
  mounted() {
    let _this = this;
    _this.$bus.on("user11", res => {
      if (res.id != 1) {
        localStorage.setItem("showLocal", JSON.stringify(res));
        _this.show = true;
        _this.$nextTick(function() {
          if (_this.show) {
            _this.$bus.emit("contactUsesr", 2);
            _this.$bus.emit("init", 1);
          }
        });
      }else{
        _this.show=false
      }
    });
    let showLocal = JSON.parse(localStorage.getItem("showLocal"));
    if (showLocal != null) {
      if (showLocal.id != 1) {
        _this.show = true;
        _this.$nextTick(function() {
          if (_this.show) {
            _this.$bus.emit("contactUsesr", 2);
            _this.$bus.emit("init", 1);
          }
        });
      }else{
        _this.show=false;
      }
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
.Ndisplay {
  display: none;
}
.app-container {
  background-color: #fff;
  max-width: 95%;
  margin: 20px auto;
  border-radius: 6px;
}
.createBase {
  margin-bottom: 12px;
}
.page {
  text-align: center;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0px;
  margin: 0px;
}
.base {
  max-width: 1200px;
  background-color: #fff;
  margin: 20px auto;
  color: #373737;
}
.center {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
}
.center1 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
}
.padd {
  padding: 0px 20px;
}
.padL {
  padding-left: 10px;
  font-size: 14px;
}
.miniW {
  width: 120px;
}
.el-collapse-item__wrap {
  border: none !important;
}
.cell > img {
  padding-right: 15px;
  cursor: pointer;
}
.partition {
  border: 8px solid #e9f2f5;
}
.ying {
  display: none;
}
.miniWBIG {
  width: 300px;
}
.textMore {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
