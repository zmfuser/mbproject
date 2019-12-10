<template>
  <div>
    <ul class="member-list J-member-list" id="memberList"></ul>
    <div class="option-box">
      <div class="operation meeting">
        <div class="control">
          <div class="switch control-item hide">
            <span class="fullScreenIcon" title="切换全屏">&nbsp;</span>
          </div>
          <div class="microphone control-item">
            <span class="icons icon-micro"></span>
            <div class="slider hide">
              <div class="txt">10</div>
              <input
                class="microSliderInput"
                type="range"
                min="0"
                max="10"
                step="1"
                value="10"
                data-orientation="vertical"
              >
            </div>
          </div>
          <div class="volume control-item">
            <span class="icons icon-volume"></span>
            <div class="slider hide">
              <div class="txt">10</div>
              <input
                class="volumeSliderInput"
                type="range"
                min="0"
                max="10"
                step="1"
                value="10"
                data-orientation="vertical"
              >
            </div>
          </div>
          <div class="camera control-item">
            <span class="icon-camera"></span>
          </div>
          <div class="speakBan control-item">
            <span class="icon-ban icon-disabled"></span>
          </div>
          <div class="desktop control-item J-desktop-share hide">
            <span class="icon-desktop">
              <div class="desktop-share">
                <p class="share-item" data-type="screen">共享全屏幕</p>
                <p class="share-item" data-type="window">共享程序窗口</p>
                <p class="share-item" data-type="close">停止共享</p>
              </div>
            </span>
          </div>
        </div>
        <div class="op">
          <button class="hangupButton netcall-button red">挂断</button>
        </div>
        <div class="tip">等待接听...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>


<style scoped>
/* 多人音视频样式表*/
.netcall-meeting-box.fullscreen{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: block;
    background-image: url(../images/bg_netcall_fullscreen.png);
}
.netcall-meeting-box .member-list{
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    align-items: center;
    min-height: 140px;
    flex-wrap: wrap;
    width: 690px;
    margin: 0 auto;
}

.netcall-meeting-box .member-list .item{
    width: 138px;
    height: 138px;
    display: inline-block;
    border: 1px solid #000;
    background-color:rgba(0,0,0,0.5);
    background-image: url('../images/member.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-blend-mode: darken;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    color: #fff;
}
.netcall-meeting-box .member-list .item.fullScreenIcon{
    position: fixed;
    left: 0;
    width: 100vw;
    height: 100vh;
    top: 0;
}
.netcall-meeting-box .member-list .item canvas{
    width: 100%;
    height: 100%;
}
.netcall-meeting-box .member-list .item .name{
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 25px; */
    background: rgba(0, 0, 0, 0.3);
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* color: #ddd; */
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 10px;
    box-sizing: border-box;
    z-index: 1;
}
.netcall-meeting-box .member-list .item .tip{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: 0;
    display: block;
    transform: translate(-50%,-50%);
    color: #fff;
    /*z-index: -1;*/
}
.netcall-meeting-box .member-list .item .tip i{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    background: rgba(255, 255, 255, 0.1);
    animation: animation-loading 1s linear infinite alternate forwards;
}
.netcall-meeting-box .member-list .item .tip i:nth-child(2){
    animation-delay: 0.3s
}
.netcall-meeting-box .member-list .item .tip i:last-child{
    animation-delay: 0.7s
}
@keyframes animation-loading{
    0% {background: rgba(255, 255, 255, 0.1)}
    50% {background: rgba(255, 255, 255, 0.5)}
    100% {background: rgba(255, 255, 255, 1)}
}
.netcall-meeting-box .member-list  .item .volume-show{
    display: inline-block;
    width: 0%;
    height: 2px;
    background: #8a8af9;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 111;
    transition: width 0.5s linear;
}
.netcall-meeting-box .option-box .operation{
    background: rgba(221, 221, 221, 0.3);
    padding: 5px 10px;
    /* overflow: auto; */
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
}
.netcall-meeting-box .option-box .control{
    display: inline-block;
    vertical-align: middle;
    margin-top: 0px;
}
.netcall-meeting-box .member-list .item .fullScreenIcon,
.netcall-meeting-box .option-box .control .fullScreenIcon{
    width: 36px;
    height: 36px;
    /*margin-top: 2px;*/
    /*line-height: 5;*/
    display: inline-block;
    background: url(../images/icons.png) no-repeat;
    background-position: -279px -263px;
    background-color: rgba(0,0,0, 0.08);
    cursor: pointer;
    border-radius: 50%;
    color: #acadac;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: text-bottom;
}
.netcall-meeting-box .member-list .item .fullScreenIcon{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
}
.netcall-meeting-box .member-list .item .fullScreenIcon.active{
    background-position: -83px -215px;
}
.netcall-meeting-box .member-list .item.fullscreen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
.netcall-meeting-box .option-box .control .switch:after{
    content: '';
    display: inline-block;
    width: 2px;
    height: 70%;
    background: #ddd;
    margin-left: 5px;
    margin-right: 5px;
    vertical-align: 2px;
}

/*.netcall-meeting-box .option-box .control .slider{
    opacity: 0;
    z-index: -1;
    transition: opacity 0.5s 0.5s linear;
}
.netcall-meeting-box .option-box .control .control-item:hover .slider{
    opacity: 1;
    z-index: 0;
}
.netcall-meeting-box .option-box .control .control-item.no-device:hover .slider{
    opacity: 0;
    z-index: -1;
}*/
.netcall-meeting-box .option-box .op{
    margin-top: 3px;
    float: right;
    margin-left: 10px;
    display: inline-block;
}
.netcall-meeting-box .option-box .tip{
    float: right;
}
/* 多人全屏模式 */
.netcall-meeting-box.fullscreen .member-list{
    position: absolute;
    bottom: 50px;
    width: auto;
    height: auto;
    right: 0;
}
/*.netcall-meeting-box.fullscreen .member-list .item{
    position: relative;
    width: 218px;
    height: 218px;
}
.netcall-meeting-box.fullscreen .member-list .item canvas{
    width: 218px;
    height: 218px;
}*/
.netcall-meeting-box.fullscreen .option-box{
    position: absolute;
    width: 100%;
    bottom: 0;
}
.netcall-meeting-box.fullscreen .option-box .control .fullScreenIcon{
    background-position: -245px -263px;
}
/* 弹框样式修改 */
.dialog-team-container .icon-control{
    float: right;
    background-color: rgba(0, 0, 0, 0.6);
}
.dialog-team-container .icon-micro.cur{
    background-position: -22px -262px;
}
</style>
