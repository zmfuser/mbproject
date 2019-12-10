//netcall实例
//1 initNetCall初始化SDK  本实例仅用webRTC模式(注 要等IM初始化完成后才可初始化视频，同时必须使用SDK.NIM.use(WebRTC);)
//2 目前只支持点对点视频电话

//talker 
let netCall1 = {
  talkVue: null, //主页面实例
  talker: null, //对方信息
  account: "",//判断多人聊天和点对点聊天

  beCalling: false, // 是否被叫中	
  type: null, // 呼叫类型	
  beCalledInfo: null, // 被叫信息	
  busy: false, // 是否正忙
  sessionConfig: {
    videoQuality: Netcall.CHAT_VIDEO_QUALITY_HIGH,
    videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
    videoEncodeMode: Netcall.CHAT_VIDEO_ENCODEMODE_NORMAL,	// 多人视频添加的属性
    videoBitrate: 0,
    recordVideo: false,
    recordAudio: false,
    highAudio: false,
    bypassRtmp: false,
    rtmpUrl: '',
    rtmpRecord: false,
    splitMode: Netcall.LAYOUT_SPLITLATTICETILE
  },
  callTimer: null,
  callOutTime: 1000 * 30,
  tipMsg: {
    beCalling: "来电了，请接通",
    callAccepted: "正在为您接通，请稍候", //对方已接受，连接中
    callRejected: "对方暂时无法接听，请稍候再试",
    callerAckSync: "其它端已处理",
    callOffline: "对方不在线，已为您挂断此次通话",
    hangup: "您已挂断此次通话"
  },
  check: {},
  initNetCall(fatherVue) {
    //初始化NETCALL  
    //注：必须待IM初始化完成才可以调视频
    let _this = this;

    //将父页面传入，用于控制UI
    _this.talkVue = fatherVue;
    _this.talker = fatherVue.talker; //对方信息

    //加载所需的SDK
    var NIM = window.nim;

    //webRTC模式
    var Netcall = WebRTC;

    //注意这个必须要加，否则监测不到
    SDK.NIM.use(WebRTC);

    //初始化netcall SDK
    window.netcall = Netcall.getInstance({
      nim: window.nim,
      container: document.getElementById('video-mine1'), //我的画面容器
      remoteContainer: document.getElementById('video-other1'), //对方画面容器
      chromeId: '',
      // 是否开启日志打印
      debug: true
    });
    _this.initEvent();

  },

  // 多人视频加入房间
  createMembergroup(groupObj, callback) {

    let _this = this
    window.netcall.joinChannel({
      channelName: groupObj.channelName, //房间号
      type: Netcall.NETCALL_TYPE_VIDEO,
      sessionConfig: _this.sessionConfig
    })
      .then(function (obj) {
        // 加入房间成功后的上层逻辑操作
        // eg: 开启摄像头
        // eg: 开启麦克风
        // eg: 开启本地流
        // eg: 设置音量采集、播放
        // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式

        _this.connectMember();
        if (callback) {
          callback();
        }
      });
  },

  // 多人视频-被呼叫加入房间
  CalledjoinRoom(groupObj) {
    let _this = this
    var channelName = JSON.parse(groupObj.content)
    window.netcall.joinChannel({
      channelName: channelName.room, //房间号
      type: Netcall.NETCALL_TYPE_VIDEO,
      sessionConfig: _this.sessionConfig
    })
      .then(function (obj) {
        _this.talkVue.closeAllUI("nc_memberList", "close");
        _this.talkVue.closeUI("nc", "open"); //打开对话界面
        _this.talkVue.closeUI("nc_talkingMany", "open"); //打开对话界面
        _this.connectMember()
      })
  },

  // 多人视频-视频连接
  connectMember() {
    const netcall = window.netcall
    netcall.startRtc().then(function () {
      // 开启麦克风
      return netcall.startDevice({
        type: Netcall.DEVICE_TYPE_AUDIO_IN
      }).catch(function (err) {
        console.log('启动麦克风失败')
        console.error(err)
      })
    })
      .then(function () {
        // 设置采集音量
        netcall.setCaptureVolume(255)
        // 开启摄像头
        return netcall.startDevice({
          type: Netcall.DEVICE_TYPE_VIDEO,
          width: 640,
          height: 480
        })
          .catch(function (err) {
            console.log('启动摄像头失败')
            console.error(err)
          })
      })
      .then(function () {
        //预览本地画面
        netcall.startLocalStream(
          document.getElementById('localContainer')
        )
        // 我的画面大小
        let myVideo = document.getElementById("video-mine1");
        netcall.setVideoViewSize({
          width: 120,
          height: 120,
          cut: false
        })
      })
      .catch(function (err) {
        console.log('发生错误')
        console.log(err)
        netcall.hangup()
      });
    // 在回调里监听对方加入通话，并显示对方的视频画面
    netcall.on('remoteTrack', function (obj) {
      console.log('收到远程轨道信息', obj);
      // 音频：播放对方的音频
      if (obj.track.kind === 'audio') {
        // 播放对方声音
        netcall
          .startDevice({
            type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
          })
          .catch(function () {
            console.log('播放对方的声音失败');
          });
      }

      // 视频：展示对方的画面
      if (obj.track.kind === 'video') {
        // 预览加入的同学的视频流
        netcall.startRemoteStream({
          account: obj.account,
          node: document.getElementById('remoteContainer')
        });

        // 设置对方预览画面大小
        var otherVideo = document.getElementById('video-other1')
        netcall.setVideoViewRemoteSize({
          uid: obj.account,
          width: 120,
          height: 120,
          cut: false
        });
      }
    });
  },

  initNetcallEvents() {
    //注册视频监听方法
    //被叫拒绝  被叫接受的通知  
    let _this = this;
  },
  initEvent() {
    //注册netcall监听事件

    // 用户加入多人聊天
    window.netcall.on('joinChannel', function (obj) {
      console.log('user joinchannel', obj);
      console.log("用户加入多人聊天")
    });



    window.netcall.on('leaveChannel', function () {
      // sdk内部会做一系列清理工作，此外开发者需要自己做业务逻辑和UI处理
      console.log("用户离开了房间")
    });
  }
}
export default netCall1;
