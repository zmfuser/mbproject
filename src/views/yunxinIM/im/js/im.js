//im聊天
window.miniIM = null;
let im = {
	myVue: null,
	imData: {
		account: "",
		token: ""
	},
	tips: {
		netcall_init: ""
	},
	talkerInfo: {
		talker_avatar: "",
		talker_nick: "",
	},
	btn: {
		telOff: null
	},
	beCalledInfo: null,
	init(fatherVue) {
		let _this = this;

		//注入vue实例；
		_this.myVue = fatherVue;
		//设置帐号
		// _this.imData.account = _this.myVue.$store.state.userInfo.wangyiName; //用户名
		// _this.imData.token = _this.myVue.$store.state.userInfo.wangyiPassword; //用户名
		_this.imData.account = _this.myVue.$store.state.user.dataUser.wangyiName; //用户名
		_this.imData.token = _this.myVue.$store.state.user.dataUser.wangyiPassword; //用户名
		//设置被叫帐号信息
		_this.talkerInfo.talker_avatar = (_this.myVue.activeTalker.headerUrl == "" ? "" : _this.myVue.activeTalker.headerUrl);
		_this.talkerInfo.talker_nick = (_this.myVue.activeTalker.patientName == "" ? "暂无患者名" : _this.myVue.activeTalker.patientName);


		//UI插入
		_this.UIInit();

		//连接IM		
		if (window.miniIM != null) {
			window.miniIM.destroy({
				done: function (err) {
					console.log('实例已被完全清除');
					_this.connectIM();
				}
			});
		} else {
			_this.connectIM();
		}


	},
	connectIM() {
		//连接IM
		let _this = this;
		window.miniIM = SDK.NIM.getInstance({
			debug: true,
			needReconnect: true,
			appKey: _this.myVue.$config.appkey,
			account: _this.imData.account,
			token: _this.imData.token,
			onwillreconnect(obj) {
				// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				console.log('即将重连');
				console.log(obj.retryCount);
				console.log(obj.duration);

				_this.connectIM();

			},
			ondisconnect(error) {
				// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('丢失连接');
				console.log(error);

				if (error) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							break;
						// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
						case 417:
							break;
						// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							break;
						default:
							window.miniIM.connect();
							break;
					}
				}
			},
			onerror(error) {
				console.log(error);

			},
			onconnect() {
				console.log('连接成功');

			},
			onsyncdone() {
				//同步完成
				//初始化视频
				_this.initMyNetcall();
			}

		});
	},
	initMyNetcall() {
		//初始化视频
		let _this = this;

		_this.UIOption("netcall_init", "none");
		_this.UIOption("nc_connecting", "block");

		//准备视频
		var miniNIM = window.miniIM;
		var Netcall = WebRTC;
		SDK.NIM.use(WebRTC);

		//注册视频实例
		window.miniNetcall = Netcall.getInstance({
			nim: miniNIM,
			container: document.getElementById('video-mine'), //我的画面容器
			remoteContainer: document.getElementById('video-other'), //对方画面容器
			chromeId: '',
			// 是否开启日志打印
			debug: false
		});

		//注册视频监听方法
		_this.initNetcallEvents();


	},
	initNetcallEvents() {
		//注册视频监听方法
		//被叫拒绝  被叫接受的通知  
		let _this = this;

		// 被叫拒绝的通知
		window.miniNetcall.on('callRejected', function (obj) {
			console.log('on callRejected', obj);
			// 取消呼叫倒计时
			//clearCallTimer();
			// 挂断
			_this.hangup()

		});

		// 被叫接受的通知
		window.miniNetcall.on('callAccepted', function (obj) {
			// 缓存呼叫类型，后面开启音视频连接需要用到
			//type = obj.type;
			console.log('on callAccepted', obj);

			_this.beCalledInfo = obj;

			_this.UIOption("netcall_init", "none");
			_this.UIOption("nc_connecting", "none");

			//UI打开通话界面
			//开始通话
			_this.NetcallStartCall();
			// 取消呼叫倒计时
			//clearCallTimer();
			// 可以开启音视频连接操作。。。
		});

		//对方挂断
		window.miniNetcall.on('hangup', function (obj) {
			console.log('on hangup', obj);
			// 判断需要挂断的通话是否是当前正在进行中的通话
			if (!_this.beCalledInfo || _this.beCalledInfo.channelId === obj.channelId) {
				// 清理工作，这是调用一系列接口实现的
				_this.hangup();
				// 也可以直接调用hangup接口实现各种清除工作
				// netcall.hangup();
			}
		});

		//自动打电话
		_this.NetcallOnCall()
	},
	NetcallOnCall() {
		//主叫呼叫方法
		let _this = this;
		if (window.miniNetcall == null) {
			//console.log("netcall实例不存在");
			_this.myVue.com.showMessage({
				str: "netcall实例不存在",
				type: 'error'
			});
			setTimeout(function () {
				//3秒后重新呼叫
				_this.NetcallOnCall();

			}, 3000);
			return false;
		}



		//初始化被叫信息
		_this.initTalkInfo()

		if (_this.myVue.activeTalker.userCode == undefined) {
			//console.log("用户ID不存在，无法视频");
			_this.myVue.com.showMessage({
				str: "用户ID不存在，无法视频",
				type: 'warning'
			})
			return false;
		}

		const pushConfig = {
			enable: true,
			needBadge: true,
			needPushNick: true,
			pushContent: '',
			custom: '',
			pushPayload: '',
			sound: '',
			forceKeepCalling: 0
		};
		const sessionConfig = {
			videoQuality: Netcall.CHAT_VIDEO_QUALITY_HIGH,
			videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
			videoBitrate: 0,
			recordVideo: false,
			recordAudio: false,
			highAudio: false,
			bypassRtmp: false,
			rtmpUrl: '',
			rtmpRecord: false,
			splitMode: Netcall.LAYOUT_SPLITLATTICETILE
		};

		//自定义字段

		let cus = {}

		if (_this.myVue.members != undefined) {

			cus = {
				RemoteExtension: {
					AllMember: _this.myVue.members,
					CurrentMember: _this.myVue.activeTalker.patientName,
					CurrentMemberCode: _this.myVue.activeTalker.userCode
				}
			};
		} else {
			alert("抱歉，请选择当前活动人");
			return false;
		}

		pushConfig.custom = JSON.stringify(cus);

		window.miniNetcall.call({
			type: Netcall.NETCALL_TYPE_VIDEO,
			account: _this.myVue.activeTalker.userCode,
			pushConfig: pushConfig,
			sessionConfig: sessionConfig,
			webrtcEnable: true
		})
			.then(function (obj) {
				// 成功发起呼叫
				console.log('call success', obj);
			})
			.catch(function (err) {
				// 被叫不在线
				_this.myVue.com.showMessage({
					str: "对方不在线，请稍候再拨",
					type: 'error'
				});
				//alert("对方不在线，请稍候再拨");
				if (err.event.code === 11001) {
					console.log('callee offline', err);
				}
				_this.hangup()

			});



		// 设置超时计时器
		// 		let callTimer = setTimeout(function() {
		// 			if (!netcall.callAccepted) {
		// 				console.log('超时未接听, hangup');
		// 				hangup();
		// 			}
		// 		}, 1000 * 30);


	},
	NetcallStartCall() {
		// 接听  连接彼此
		let _this = this;
		if (window.miniNetcall == null) {
			consoele.log("通话连接失败");
			return false;
		}

		let nc_talking = document.getElementById("nc_talking");
		if (nc_talking == null) {
			console.log("UI连接成功界面不存在")
			return false;
		}
		//打开呼叫界面		
		_this.UIOption("nc_connecting", "none");

		_this.UIOption("nc_talking", "block")

		//设置对方基本信息
		document.getElementById("nc_talking_img").src = _this.myVue.activeTalker.headerUrl;
		document.getElementById("nc_talking_nick").innerHTML = _this.myVue.activeTalker.patientName;
		document.getElementById("nc_talking_age").innerHTML = _this.myVue.activeTalker.age + " 岁";

		const netcall = window.miniNetcall
		// 连接媒体网关
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
					type: Netcall.DEVICE_TYPE_VIDEO
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
				let myVideo = document.getElementById("video-mine");
				myVideo.style.width = myVideo.clientWidth + "px";
				myVideo.style.height = myVideo.clientHeight + "px";
				myVideo.style.top = (((800 - myVideo.clientHeight) / 2) - (myVideo.clientHeight / 2)) + "px";

				netcall.setVideoViewSize({
					width: myVideo.clientWidth,
					height: myVideo.clientHeight,
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
			console.log('user join', obj)
			// 播放对方声音
			netcall.startDevice({
				type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
			}).catch(function (err) {
				console.log('播放对方的声音失败')
				console.error(err)
			})
			// 预览对方视频画面
			netcall.startRemoteStream({
				account: obj.account,
				node: document.getElementById('remoteContainer')
			})
			// 设置对方预览画面大小
			let otherVideo = document.getElementById("video-other");
			netcall.setVideoViewRemoteSize({
				account: _this.myVue.activeTalker.userCode,
				width: otherVideo.offsetWidth,
				height: otherVideo.offsetHeight,
				cut: true
			})
		});

		//修改订单状态 2待建档
		_this.myVue.page.updateOrderState(_this.myVue, {
			code: _this.myVue.activeTalker.orderCode,
			doctorCode: _this.myVue.$store.state.doctorInfo.doctorUserCode,
			orderType: "1",
			"patientCode": _this.myVue.activeTalker.patientCode,
			"patientName": _this.myVue.activeTalker.patientName,
			"state": 2,
			done: function () {
				_this.myVue.com.showMessage({
					str: "状态已更改待建档",
					type: "warning"
				});
			}
		})



	},
	handleOpenMic() {
		window.miniNetcall.startDevice({
			type: Netcall.DEVICE_TYPE_AUDIO_IN,
			device: {
				deviceId: ''
			}
		}).then(function () {
			console.log('启动麦克风成功')
		}).catch(function (err) {
			console.log('启动麦克风失败', err)
		})

	},
	handleOptionMic(obj) {
		//关闭麦克风
		let _this = this;
		//获取麦克风状态 1--打开  0--关闭
		var micState = obj.getAttribute("data-mic");

		if (micState == "1") {
			//设置麦克风关闭
			obj.setAttribute("data-mic", "0");
			obj.setAttribute("src", "../../../static/img/im/voice-no.png");
			//obj.src = "../../../static/img/im/voice-on.png";
			window.miniNetcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN).then(function () {

				_this.myVue.com.showMessage({
					str: "麦克风关闭成功",
					type: "warning"
				})
			});
		} else {
			//设置麦克风打开
			obj.setAttribute("data-mic", "1");
			obj.setAttribute("src", "../../../static/img/im/voice-change.png");

			window.miniNetcall.startDevice({
				type: Netcall.DEVICE_TYPE_AUDIO_IN,
				device: {
					deviceId: ''
				}
			}).then(function () {

				_this.myVue.com.showMessage({
					str: "启动麦克风成功",
					type: "warning"
				})
			}).catch(function (err) {

				_this.myVue.com.showMessage({
					str: "启动麦克风失败",
					type: "error"
				})
			})
		}
	},
	hangup() {
		//挂断电话
		let _this = this;
		window.miniNetcall.hangup();

		//ui处理
		_this.UICloseAll();
		//_this.UIDestroy();
		//刷新父元素列表

		_this.myVue.getList();
	},
	destoryIM(callback) {
		let _this = this;
		if (window.miniIM != null) {
			window.miniIM.destroy({
				done: function (err) {
					console.log('实例已被完全清除');
					if (callback) {
						callback();
					}
				}
			});
		}
	},
	UIOpenConnectBox() {
		//打开连接UI
		let _this = this;
		let myBox = document.getElementById("nc_connecting");
		myBox.style.display = "block"

	},
	initTalkInfo() {
		//设置被叫人信息
		let _this = this;
		document.getElementById("talker_avatar").setAttribute("src", _this.talkerInfo.talker_avatar); //设置头像
		document.getElementById("talker_nick").innerHTML = _this.talkerInfo.talker_nick; //设置名称
	},
	UIOption(domId, state) {
		//关闭视频view
		if (domId == "") {
			console.log("抱歉找不到页面元素");
			return false;
		}

		let myUIDom = document.getElementById(domId);
		if (myUIDom != null) {
			myUIDom.style.display = (state == undefined ? "none" : state);
		}
	},
	UICloseAll() {
		//关闭所有窗口
		let _this = this;

		//窗口ID
		var winId = ["netcall_init", "nc_connecting", "talker_avatar", "nc_talking", "video-other", "video-mine",
			"myMiniNetCall"
		];
		if (winId.length != 0) {
			for (let i in winId) {
				_this.UIOption(winId[i], "none");
			}
		}
	},
	UIDestroy() {
		var uiDom = document.getElementById("myMiniNetCall");
		if (uiDom != null) {
			uiDom.parentNode.removeChild(uiDom);
		}
	},
	UIInit() {
		//视频UI
		let _this = this;
		let uiDom = [];
		//uiDom.push("<!-- 视频界面 -->");
		uiDom.push('<div class="im-netcall-mini" ref="nc" id="myMiniNetCall">');

		uiDom.push('<div class="init-box" id="netcall_init">初始化您的帐号...<p>若您网络连接过慢，或连接不畅，请刷新页面</p></div>');
		//uiDom.push('<!-- 主叫连接 -->');
		uiDom.push('<div class="connect-box" id="nc_connecting" >');
		uiDom.push('<div class="box-content">');
		uiDom.push('<div class="content-l">');
		uiDom.push('<img class="l-avatar" src="" id="talker_avatar"/>');
		uiDom.push('</div>');
		uiDom.push('<div class="content-r">');
		uiDom.push('<p class="client-name" id="talker_nick"></p>');
		uiDom.push('<p class="connect-tips">正在为您呼叫...</p>');
		uiDom.push('</div>');
		uiDom.push('</div>');
		uiDom.push('<div class="box-foot">');
		uiDom.push(
			'<img class="btn-nc" src="../../../../../static/img/im/connect-off.png" id="telOff" title="挂断" onclick="window.$miniIM.hangup()"/>'
		);
		uiDom.push('</div>');
		uiDom.push('</div>');

		//uiDom.push('<!-- 连接成功 -->');
		uiDom.push('<div class="talking-box" id="nc_talking">');
		uiDom.push('<div class="box-head">');
		uiDom.push('<img class="avatar" :src="talker.avatar" id="nc_talking_img"/>');
		uiDom.push('<span class="name" id="nc_talking_nick"></span>');
		uiDom.push('<span class="age" id="nc_talking_age"></span>');
		uiDom.push('</div>');

		//uiDom.push('<!-- 画面会自动生成video   画面大小设置在监听中-->');
		//uiDom.push('<!-- 对方画面 -->');
		uiDom.push('<div class="other-side" id="video-other">');
		uiDom.push('</div>');

		//uiDom.push('<!-- 自己的画面 -->');
		uiDom.push('<div class="my-side" id="video-mine">');
		uiDom.push('</div>');

		//uiDom.push('<!-- 按钮区 -->');
		uiDom.push('<div class="talking-foot">');
		uiDom.push(
			'<img class="btn-nc" src="../../../../../static/img/im/connect-off.png" onclick="window.$miniIM.hangup()" title="挂断" />'
		);
		uiDom.push(
			'<img class="btn-nc" src="../../../../../static/img/im/voice-change.png" data-mic="1" onclick="window.$miniIM.handleOptionMic(this)" id="" title="关闭或打开麦克风" />'
		);
		//uiDom.push(			'<img class="btn-nc" src="../../../static/img/im/voice-change.png"  onclick="window.$miniIM.handleOpenMic(this)" title="调节音量" />'		);
		uiDom.push('</div>');
		uiDom.push('</div>');

		//uiDom.push('<!-- 背景 -->');
		uiDom.push('<div class="netcall-bg"></div>');
		uiDom.push('</div>"');

		var myMiniNetCallHtml = document.getElementById("myMiniNetCall");
		if (myMiniNetCallHtml != null) {
			myMiniNetCallHtml.parentNode.removeChild(myMiniNetCallHtml);
		}

		var domApp = document.getElementById("app")
		domApp.insertAdjacentHTML("afterend", uiDom.join(""));;


		_this.tips.netcall_init = document.getElementById("netcall_init");
		_this.tips.nc_connecting = document.getElementById("nc_connecting");
		_this.tips.nc_talking = document.getElementById("nc_talking");



	}


}
window.$miniIM = im;

export default im;
