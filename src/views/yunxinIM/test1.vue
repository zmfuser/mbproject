<template>
  <div id="drag">
    <div class="title" ref="title">
      <span class="title-txt">{{msg}}</span>
      <div>
        <a class="min" href="javascript:;" ref="selector" title="最小化"></a>
        <!-- <a class="max" href="javascript:;" title="最大化"></a> -->
        <a class="revert" href="javascript:;" title="还原"></a>
        <a class="close" href="javascript:;" title="关闭"></a>
      </div>
    </div>
    <!-- <div class="resizeL"></div> -->
    <!-- <div class="resizeT"></div> -->
    <!-- <div class="resizeR"></div> -->
    <!-- <div class="resizeB"></div> -->
    <!-- <div class="resizeLT"></div> -->
    <!-- <div class="resizeTR"></div> -->
    <!-- <div class="resizeBR"></div> -->
    <!-- <div class="resizeLB"></div> -->
    <div class="content">
      <my-talk ref="mytalk" @talkLoading="handleTalkLoading"></my-talk>
    </div>
  </div>
</template>

<script>
import Talk from "@/views/yunxinIM/im/talk2";

export default {
  name: "Test",
  components: {
    "my-talk": Talk
  },
  data() {
    return {
      count: 0,
      unread: "",
      show: true,
      msg: "正在配置中...",
      get: {
        byId: function(id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        },
        byClass: function(sClass, oParent) {
          var aClass = [];
          var reClass = new RegExp("(^| )" + sClass + "( |$)");
          var aElem = this.byTagName("*", oParent);
          for (var i = 0; i < aElem.length; i++)
            reClass.test(aElem[i].className) && aClass.push(aElem[i]);
          return aClass;
        },
        byTagName: function(elem, obj) {
          return (obj || document).getElementsByTagName(elem);
        }
      },
      dragEle: {
        dragMinWidth: 900,
        dragMinHeight: 600,
        disX: 0, //鼠标X轴
        disY: 0, //鼠标Y轴,
        oMin: null,
        oMax: null,
        oRevert: null,
        oClose: null,
        oDrag: null,
        oTitle: null,
        oL: null,
        oT: null,
        oR: null,
        oB: null,
        oLT: null,
        oTR: null,
        oBR: null,
        oLB: null
      }
    };
  },
  methods: {
    destory() {},
    handleTalkLoading() {
      this.msg = "在线咨询";
      this.$bus.emit("msg", sessionStorage.getItem("getInfo"));
    },
    initDrag() {
      //初始化 绑定各元素，按钮等
      let _this = this;
      _this.dragEle.oDrag = document.getElementById("drag"); //整个窗口

      _this.dragEle.oMin = _this.get.byClass("min", _this.dragEle.oDrag)[0]; //最小化按钮
      // _this.dragEle.oMax = _this.get.byClass("max", _this.dragEle.oDrag)[0]; //最大化按钮
      _this.dragEle.oRevert = _this.get.byClass(
        "revert",
        _this.dragEle.oDrag
      )[0]; //还原按钮
      _this.dragEle.oClose = _this.get.byClass("close", _this.dragEle.oDrag)[0]; //关闭窗口按钮

      _this.dragEle.oTitle = _this.get.byClass("title", _this.dragEle.oDrag)[0]; //标题栏
      // _this.dragEle.oL = _this.get.byClass("resizeL", _this.dragEle.oDrag)[0]; //左边界
      // _this.dragEle.oT = _this.get.byClass("resizeT", _this.dragEle.oDrag)[0]; //上边界
      // _this.dragEle.oR = _this.get.byClass("resizeR", _this.dragEle.oDrag)[0]; //右边界
      // _this.dragEle.oB = _this.get.byClass("resizeB", _this.dragEle.oDrag)[0]; //下边界
      // _this.dragEle.oLT = _this.get.byClass("resizeLT", _this.dragEle.oDrag)[0]; //左上角
      // _this.dragEle.oTR = _this.get.byClass("resizeTR", _this.dragEle.oDrag)[0]; //右上角
      // _this.dragEle.oBR = _this.get.byClass("resizeBR", _this.dragEle.oDrag)[0]; //右下角
      // _this.dragEle.oLB = _this.get.byClass("resizeLB", _this.dragEle.oDrag)[0]; //左下角

      //注册拖拽 窗口及标题栏可拖拽
      //oDrag：整个窗口
      //oTitle：标题拦
      _this.drag(_this.dragEle.oDrag, _this.dragEle.oTitle);

      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oLT, true, true, false, false);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oTR, false, true, false, false);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oBR, false, false, false, false);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oLB, true, false, false, false);
      //四边
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oL, true, false, false, true);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oT, false, true, true, false);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oR, false, false, false, true);
      // _this.resize(_this.dragEle.oDrag, _this.dragEle.oB, false, false, true, false);
      _this.dragEle.oDrag.style.left =
        (document.documentElement.clientWidth -
          _this.dragEle.oDrag.offsetWidth) /
          6 +
        "px";
      _this.dragEle.oDrag.style.top =
        (document.documentElement.clientHeight -
          _this.dragEle.oDrag.offsetHeight) /
          6 +
        "px";
      _this.closeWindow();
    },

    drag(oDrag, handle) {
      //拖拽函数
      let _this = this;

      //鼠标x,y
      _this.dragEle.disX = _this.dragEle.dixY = 0;
      _this.dragEle.oMin = _this.get.byClass("min", oDrag)[0]; //最小化按钮
      // _this.dragEle.oMax = _this.get.byClass("max", oDrag)[0]; //最大化按钮
      _this.dragEle.oRevert = _this.get.byClass("revert", oDrag)[0]; //还原按钮
      _this.dragEle.oClose = _this.get.byClass("close", oDrag)[0]; //关闭按钮

      handle = handle || oDrag;
      handle.style.cursor = "move";

      //鼠标操作
      handle.onmousedown = function(event) {
        //onmousedown按下鼠标时
        var event = event || window.event;
        _this.dragEle.disX = event.clientX - _this.dragEle.oDrag.offsetLeft;
        _this.dragEle.disY = event.clientY - _this.dragEle.oDrag.offsetTop;
        _this.$refs.mytalk.init();
        document.onmousemove = function(event) {
          //onmousemove 移动鼠标时
          var event = event || window.event;
          var iL = event.clientX - _this.dragEle.disX;
          var iT = event.clientY - _this.dragEle.disY;
          var maxL =
            document.documentElement.clientWidth -
            _this.dragEle.oDrag.offsetWidth;
          var maxT =
            document.documentElement.clientHeight -
            _this.dragEle.oDrag.offsetHeight;
          iL <= 0 && (iL = 0);
          iT <= 0 && (iT = 0);
          iL >= maxL && (iL = maxL);
          iT >= maxT && (iT = maxT);
          _this.dragEle.oDrag.style.left = iL + "px";
          _this.dragEle.oDrag.style.top = iT + "px";
          return false;
        };

        document.onmouseup = function() {
          //onmouseup鼠标抬起
          document.onmousemove = null;
          document.onmouseup = null;
          this.releaseCapture && this.releaseCapture();
          _this.$refs.mytalk.init();
        };
        this.setCapture && this.setCapture();
        return false;
      };
      //最大化按钮
      // _this.dragEle.oMax.onclick = function() {
      // 	_this.dragEle.oDrag.style.top = _this.dragEle.oDrag.style.left = 0;
      // 	_this.dragEle.oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
      // 	_this.dragEle.oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
      // 	this.style.display = "none";
      // 	_this.dragEle.oRevert.style.display = "block";
      // };
      //还原按钮
      _this.dragEle.oRevert.onclick = function() {
        _this.dragEle.oDrag.style.width = _this.dragEle.dragMinWidth + "px";
        _this.dragEle.oDrag.style.height = _this.dragEle.dragMinHeight + "px";
        _this.dragEle.oDrag.style.left =
          (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
        _this.dragEle.oDrag.style.top =
          (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 +
          "px";
        this.style.display = "none";
        _this.dragEle.oMax.style.display = "block";
      };
      //最小化按钮
      _this.dragEle.oMin.onclick = _this.dragEle.oClose.onclick = function() {
        _this.dragEle.oDrag.style.display = "none";
        var oA = document.createElement("a");
        var img = document.createElement("img");
        var input = document.createElement("input");

        oA.appendChild(img);
        oA.id = "miniImBtn";
        img.setAttribute("src", "../../static/img/button_jiezhen@3x.png");
        oA.appendChild(input);
        input.className = "input";
        input.setAttribute("value", _this.unread);
        oA.className = "open";
        oA.href = "javascript:;";
        oA.title = "还原";
        oA.style.zIndex = 99999;
        document.body.appendChild(oA);
        oA.onclick = function() {
          oDrag.style.display = "inline-block";
          document.body.removeChild(this);
          this.onclick = null;
        };
      };
      //阻止冒泡
      _this.dragEle.oMin.onmousedown = _this.dragEle.oClose.onmousedown = function(
        event
      ) {
        this.onfocus = function() {
          this.blur();
        };
        (event || window.event).cancelBubble = true;
      };
    },

    closeWindow() {
      let _this = this;
      if (_this.dragEle.oDrag.style.display != "none") {
        //最小化主窗口
        console.log("窗口最大化");
        _this.dragEle.oDrag.style.display = "none";
        var oA = document.createElement("a");
        var img = document.createElement("img");
        var input = document.createElement("input");
        img.setAttribute("src", "../../static/img/button_jiezhen@3x.png");
        oA.appendChild(img);
        oA.id = "miniImBtn";
        oA.className = "open";
        oA.appendChild(input);
        input.className = "input";
        input.setAttribute("value", _this.unread);
        oA.href = "javascript:;";
        oA.title = "还原";
        // oA.innerHTML = "点击打开与患者的对话";
        oA.style.zIndex = 999;
        document.body.appendChild(oA);
        oA.onclick = function() {
          _this.dragEle.oDrag.style.display = "inline-block";
          document.body.removeChild(this);
          this.onclick = null;
        };
      }
    },
    openWindow() {
      let _this = this;
      if (_this.dragEle.oDrag.style.display == "none") {
        //打开主窗口
        console.log("窗口最小化");
        _this.dragEle.oDrag.style.display = "block";
        var oA = document.getElementById("miniImBtn");
        document.body.removeChild(oA);
        oA.onclick = null;
      }
    },
    checkWindow() {
      let _this = this;
      if (_this.dragEle.oDrag.style.display == "none") {
        //打开主窗口
        console.log("窗口最小化");
        _this.dragEle.oDrag.style.display = "block";
        var oA = document.getElementById("miniImBtn");
        document.body.removeChild(oA);
        oA.onclick = null;
      } else {
        //最小化主窗口
        console.log("窗口最大化");
        _this.dragEle.bg.style.display = "none";
        _this.dragEle.oDrag.style.display = "none";
        var oA = document.createElement("a");
        var input = document.createElement("input");
        oA.id = "miniImBtn";
        oA.className = "open";
        oA.appendChild(input);
        input.className = "input";
        input.setAttribute("value", _this.unread);
        oA.href = "javascript:;";
        oA.title = "还原";
        oA.style.zIndex = 999;
        document.body.appendChild(oA);
        oA.onclick = function() {
          oDrag.style.display = "inline-block";
          document.body.removeChild(this);
          this.onclick = null;
        };
      }
    },

    resize(oParent, handle, isLeft, isTop, lockX, lockY) {
      let _this = this;
      handle.onmousedown = function(event) {
        var event = event || window.event;
        var disX = event.clientX - handle.offsetLeft;
        var disY = event.clientY - handle.offsetTop;
        var iParentTop = oParent.offsetTop;
        var iParentLeft = oParent.offsetLeft;
        var iParentWidth = oParent.offsetWidth;
        var iParentHeight = oParent.offsetHeight;
        document.onmousemove = function(event) {
          var event = event || window.event;
          var iL = event.clientX - disX;
          var iT = event.clientY - disY;
          var maxW =
            document.documentElement.clientWidth - oParent.offsetLeft - 2;
          var maxH =
            document.documentElement.clientHeight - oParent.offsetTop - 2;
          var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
          var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
          isLeft && (oParent.style.left = iParentLeft + iL + "px");
          isTop && (oParent.style.top = iParentTop + iT + "px");
          iW < _this.dragEle.dragMinWidth && (iW = _this.dragEle.dragMinWidth);
          iW > maxW && (iW = maxW);
          lockX || (oParent.style.width = iW + "px");
          iH < _this.dragEle.dragMinHeight &&
            (iH = _this.dragEle.dragMinHeight);
          iH > maxH && (iH = maxH);
          lockY || (oParent.style.height = iH + "px");
          if (
            (isLeft && iW == _this.dragEle.dragMinWidth) ||
            (isTop && iH == _this.dragEle.dragMinHeight)
          )
            document.onmousemove = null;
          return false;
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          _this.$refs.mytalk.init();
        };
        return false;
      };
    },
  },
  created() {
    let _this = this; // 未读数
    // _this.$bus.on("unread", res => {
    //   console.log(res);
    //   setTimeout(() => {
    //     _this.unread=res
    //   }, 3000);
    // });
  },
  mounted() {
    let _this = this;
    _this.initDrag();
    _this.$bus.on("contactUsesr", res => {
      if (res == 1) {
        _this.openWindow();
      } else if (res == 2) {
        _this.closeWindow();
      }
    });
    _this.$bus.on("rcontent", res => {
      _this.$refs.title.style.width = 300 + res + "px";
    });
  }
};
</script>

<style>
#drag {
  position: fixed;
  top: 100px;
  left: 100px;
  /* width: 1300px; */
  /* width: 300px; */
  height: 700px;
  background: #fff;
  box-shadow: 0 1px 11px 4px #ddd;
  font-size: 12px;
  z-index: 999;
  overflow: hidden;
}

#drag .title {
  position: relative;
  height: 27px;
  padding: 0 5px;
  width: 300px;
  /* width: 1200px; */
  background: #56c8ac;
  cursor: move;
  z-index: 100;
}

#drag .title .title-txt {
  font-size: 12px;
  height: 27px;
  line-height: 27px;
  display: inline-block;
  color: #fff;
}

#drag .title div {
  position: absolute;
  height: 19px;
  top: 2px;
  right: 5px;
}

#drag .title a,
a.open {
  float: left;
  width: 21px;
  height: 19px;
  display: block;
  margin-left: 5px;
  background: url(../../../static/img/im/imv2/tool.png) no-repeat;
}

a.open {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 120px;
  background: transparent;
  /* padding: 5px; */
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
}
a.open img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* a.open .input {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  text-align: center;
  background: #f56c6c;
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
  border: 1px solid #f56c6c;
} */
a.open .count {
  position: fixed;
  bottom: 100px;
  width: 30px;
  height: 20px;
  border-radius: 50%;
  right: 24px;
  border: 1px solid red;
  background: red;
  color: #fff;
}
a.open:hover {
  background-position: 0 -29px;
}

#drag .title a.min {
  background-position: -29px 0;
}

#drag .title a.min:hover {
  background-position: -29px -29px;
}

#drag .title a.max {
  background-position: -60px 0;
}

#drag .title a.max:hover {
  background-position: -60px -29px;
}

#drag .title a.revert {
  background-position: -149px 0;
  display: none;
}

#drag .title a.revert:hover {
  background-position: -149px -29px;
}

#drag .title a.close {
  background-position: -89px 0;
}

#drag .title a.close:hover {
  background-position: -89px -29px;
}

#drag .content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  padding-top: 27px;
  overflow: hidden;
  z-index: 99;
}

#drag .resizeBR {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  cursor: nw-resize;
  background: url(../../../static/img/im/imv2/sresize.png) no-repeat;
  z-index: 100;
}

#drag .resizeL,
#drag .resizeT,
#drag .resizeR,
#drag .resizeB,
#drag .resizeLT,
#drag .resizeTR,
#drag .resizeLB {
  position: absolute;
  background: #000;
  overflow: hidden;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 100;
}

#drag .resizeL,
#drag .resizeR {
  top: 0;
  width: 5px;
  height: 100%;
  cursor: w-resize;
}

#drag .resizeR {
  right: 0;
}

#drag .resizeT,
#drag .resizeB {
  width: 100%;
  height: 5px;
  cursor: n-resize;
}

#drag .resizeT {
  top: 0;
}

#drag .resizeB {
  bottom: 0;
}

#drag .resizeLT,
#drag .resizeTR,
#drag .resizeLB {
  width: 8px;
  height: 8px;
  background: #ff0;
}

#drag .resizeLT {
  top: 0;
  left: 0;
  cursor: nw-resize;
}

#drag .resizeTR {
  top: 0;
  right: 0;
  cursor: ne-resize;
}

#drag .resizeLB {
  left: 0;
  bottom: 0;
  cursor: ne-resize;
}
</style>
