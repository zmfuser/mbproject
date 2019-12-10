//netcall实例
//1 initNetCall初始化SDK  本实例仅用webRTC模式(注 要等IM初始化完成后才可初始化视频，同时必须使用SDK.NIM.use(WebRTC);)
//2 目前只支持点对点视频电话

//talker 
let netCall = {
	talkVue: null, //主页面实例
	talker: null, //对方信息
	account: "",//判断多人聊天和点对点聊天

	accountMany: [],
	video: [],
	netcallType: "",
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
			// container: document.getElementById('video-mine'), //我的画面容器
			// remoteContainer: document.getElementById('video-other'), //对方画面容器othervideoChat
			// remoteContainer: document.getElementById('othervideoChat'),
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
				// _this.talkVue.closeAllUI("nc_connectingMany", "close"); //关闭视频连接	
				_this.callTimerMany = setTimeout(function () {
					if (!netcall.callAccepted) {
						console.log('超时未接听, hangup');
						_this.talkVue.closeUI("notAnswer1", "open")
						_this.talkVue.closeUI("notAnswer2", "open")
						_this.LeaveVideo();
					}
				}, _this.callOutTime);
				console.log("启动定时器")
				_this.connectMember();
				if (callback) {
					callback();
				}
			});
	},

	// 被叫-加入房间
	joinRoom(groupObj) {
		let _this = this
		debugger
		let obj = JSON.parse(groupObj.content)
		window.netcall.joinChannel({
			channelName: obj.room, //房间号
			type: Netcall.NETCALL_TYPE_VIDEO,
			sessionConfig: _this.sessionConfig
		})
			.then(function (obj) {
				_this.talkVue.closeUI("nc", "open"); //打开对话界面
				_this.connectMember()
			}).catch(function (err) {
				_this.talkVue.$message.error("其他用户已退出视频通话");
				_this.talkVue.closeUI("nc", "close"); //打开对话界面
				_this.talkVue.closeUI("nc_acceptMany", "close"); //打开对话界面
				_this.talkVue.$refs.susp.style.display = "none";
			});
	},



	// 多人视频-视频连接
	connectMember() {
		let _this = this
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
					width: 230,
					height: 230
				})
					.catch(function (err) {
						console.log('启动摄像头失败')
						console.error(err)
					})
			})
			.then(function () {
				//预览本地画面
				netcall.startLocalStream(
					document.getElementById('myvideoChat')
				)
				// 设置本地预览画面大小
				netcall.setVideoViewSize({
					width: 230,
					height: 230,
					cut: true
				})
			})
			.catch(function (err) {
				console.log('发生错误')
				console.log(err)
				netcall.hangup()
			})
		netcall.on('remoteTrack', function (obj) {
			// _this.talkVue.video.push(obj)
			_this.talkVue.closeUI("nc_memberList", "close");
			_this.talkVue.closeUI("nc", "open"); //打开对话界面
			_this.talkVue.closeUI("nc_talkingMany", "open"); //打开对话界面
			// _this.talkVue.$nextTick(function (){
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
				node: document.getElementById("othervideoChat")
			})

			// 设置对方预览画面大小
			netcall.setVideoViewRemoteSize({
				account: obj.account,
				width: 220,
				height: 220,
				// cut: true
			})
			// })
		})

		// 在回调里监听对方加入通话，并显示对方的视频画面

	},

	// 自己离开房间
	leaveRoom() {
		let _this = this
		window.netcall.leaveChannel().then(function () {
			// 离开房间后，开发者自己业务的扫尾工作  
			_this.talkVue.closeAllUIMany();
			_this.talkVue.closeUI("nc", "close")
			_this.talkVue.closeUI("nc_talkingMany", "close")
			console.log("自己离开了房间")
			_this.talkVue.$refs.susp.style.display = "none";
		});
	},


	initNetcallEvents() {
		//注册视频监听方法
		//被叫拒绝  被叫接受的通知  
		let _this = this;


		// 开启监听
		window.netcall.on('beCalling', function (obj) {
			console.log('on beCalling', obj);
			debugger
			// if(obj.type==2){
			//通话UI
			_this.talkVue.closeUI("nc", "open"); //打开视频框
			_this.talkVue.closeUI("nc_accept", "open"); //打开请求连接
			// }





			//设置对方的信息
			_this.talkVue.clears();
			_this.talkVue.getUseInfo(obj.account, function (val) {
				_this.talkVue.$set(_this.talkVue, "accepter", val);
			});


			const channelId = obj.channelId;

			// 被叫回应主叫自己已经收到了通话请求
			window.netcall.control({
				channelId: channelId,
				command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
			});


			// 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
			if (!window.netcall.calling && !_this.beCalling) {
				_this.type = obj.type;
				_this.beCalling = true;
				_this.beCalledInfo = obj;
			} else {
				if (window.netcall.calling) {
					_this.busy = window.netcall.notCurrentChannelId(obj);
				} else if (_this.beCalling) {
					_this.busy = _this.beCalledInfo.channelId !== channelId;
				}

				if (_this.busy) {
					window.netcall.control({
						channelId: channelId,
						command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
					});
					// 拒绝通话
					window.netcall.response({
						accepted: false,
						beCalledInfo: obj
					}).then(function () {
						console.log("对方挂断")
					});
				}
			}
		});



		// 被叫拒绝的通知
		window.netcall.on('callRejected', function (obj) {
			console.log('on callRejected', obj);
			// 取消呼叫倒计时
			//clearCallTimer();
			// 挂断
			_this.hangup()

		});

		// 被叫接受的通知
		window.netcall.on('callAccepted', function (obj) {
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
		window.netcall.on('hangup', function (obj) {
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
		//_this.NetcallOnCall()
	},
	initEvent() {
		//注册netcall监听事件
		let _this = this;

		// 用户加入多人聊天

		window.netcall.on('joinChannel', function (obj) {
			_this.accountMany.push(obj)
			console.log('user joinchannel', obj);
			console.log("用户加入多人聊天")

		});

		// 用户离开多人聊天
		window.netcall.on('leaveChannel', function (obj) {
			for (let i = 0; i < _this.accountMany.length; i++) {
				if (_this.accountMany[i].account == obj.account) {
					_this.accountMany.splice(i, 1)
				}
			}
			if (_this.accountMany.length == 0) {
				_this.leaveRoom()
				_this.accountMany = []
			}
			// sdk内部会做一系列清理工作，此外开发者需要自己做业务逻辑和UI处理
			console.log()
		});





		// 开启监听
		window.netcall.on('beCalling', function (obj) {
			console.log('on beCalling', obj);

			// 设置对方的信息
			_this.talkVue.clears();
			_this.talkVue.getUseInfo(obj.account, function (val) {
				_this.talkVue.$set(_this.talkVue, "accepter", val);
			});


			//通话UI
			_this.talkVue.$bus.emit("contactUsesr", 1)
			if (_this.talkVue.hide.Rcontent == false) {
				_this.talkVue.hide.Rcontent = true
				_this.talkVue.hide.userinfoContent = true
				_this.talkVue.$bus.emit("rcontent", 935);
			}
			if (obj.type == 1) {
				_this.talkVue.closeAllUI()
				_this.talkVue.closeall()
				_this.talkVue.closeUI("nc", "open"); //打开视频框
				_this.talkVue.closeUI("nc_acceptVodeo", "open"); //打开请求连接
			} else if (obj.type == 2) {
				_this.talkVue.closeAllUI()
				_this.talkVue.closeall()
				_this.talkVue.closeUI("nc", "open"); //打开视频框
				_this.talkVue.closeUI("nc_accept", "open"); //打开请求连接
			}




			const channelId = obj.channelId;

			// 被叫回应主叫自己已经收到了通话请求
			window.netcall.control({
				channelId: channelId,
				command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
			});


			// 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
			if (!window.netcall.calling && !_this.beCalling) {
				_this.type = obj.type;
				_this.beCalling = true;
				_this.beCalledInfo = obj;
			} else {
				if (window.netcall.calling) {
					_this.busy = window.netcall.notCurrentChannelId(obj);
				} else if (_this.beCalling) {
					_this.busy = _this.beCalledInfo.channelId !== channelId;
				}

				if (_this.busy) {
					window.netcall.control({
						channelId: channelId,
						command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
					});
					// 拒绝通话
					window.netcall.response({
						accepted: false,
						beCalledInfo: obj
					}).then(function () {
						console.log("对方挂断")
					});
				}
			}
		});


		// 被叫接受的通知
		// 连接成功时的监听
		window.netcall.on('callAccepted', function (obj) {
			debugger
			if (obj.type == 1) {
				_this.talkVue.closeAllUI("nc_connecting", "close");
				_this.talkVue.closeUI("nc", "open");
				_this.talkVue.closeUI("nc_talkingVodeo", "open");
				_this.startvodeoCall()
			} else {
				console.log('on callAccepted', obj);
				// 如果呼叫之前，启动了超时倒计时，这里可以取消呼叫倒计时
				_this.clearCallTimer();


				//通话UI开启
				_this.talkVue.closeAllUI("nc_connecting", "close"); //关闭视频连接

				_this.talkVue.closeUI("nc", "open"); //打开对话界面
				_this.talkVue.closeUI("nc_talking", "open"); //打开对话界面
				// 可以开启音视频连接操作。。。
				_this.startCall();
			}
		});

		//其他端已经做了处理
		window.netcall.on('callerAckSync', function (obj) {
			console.log('其他端已经做了处理', obj);
			alert(_this.tipMsg.callerAckSync);
		});



		// 对方挂断
		window.netcall.on('callRejected', function (obj) {
			console.log('on callRejected', obj);
			// 挂断
			_this.hangup();
			// 做清理工作
			//resetWhenHangup();
			alert(_this.tipMsg.callRejected);

			//监听中关闭视频界面
			_this.talkVue.closeUI("nc_connecting", "close"); //关闭视频连接
			_this.talkVue.closeUI("nc_talking", "close"); //关闭对话界面
			_this.talkVue.closeUI("nc", "close"); //关闭视频框
		});

		//监测挂断
		window.netcall.on('hangup', function (obj) {
			console.log('on hangup', obj);
			// 判断需要挂断的通话是否是当前正在进行中的通话
			if (!_this.beCalledInfo || _this.beCalledInfo.channelId === obj.channelId) {
				// 清理工作，这是调用一系列接口实现的
				//resetWhenHangup();
				// 也可以直接调用hangup接口实现各种清除工作
				_this.hangup();
			}
		});

		//sdk反馈错误信息
		//code	number	错误码
		//desc	string	错误信息描述
		window.netcall.on('error', function (obj) {
			console.log('sdk反馈错误信息', obj);
			if (obj.code) {
				if (obj.code == 509) {
					console.warn('你被提出房间了');
				} else if (obj.code == 500) {
					console.warn('你的web不支持H264视频编码，无法进行呼叫，请检测浏览器的H264插件是否正常');
				}
			}
		});

		//音量大小实时回调通知
		// obj['self']	obj	自己的音量对象
		// obj['self'].status	float	自己的音量大小值
		// obj['accountA']	obj	账号accountA的音量对象
		// obj['accountA'].status	float	账号accountA的音量大小值
		window.netcall.on('audioVolume', function (obj) {
			console.log('音量', obj);
		});

		//新增设备列表
		window.netcall.on('deviceAdd', function (devices) {
			console.log('新增设备列表', devices);
		});

		//移除设备列表
		window.netcall.on('deviceRemove', function (devices) {
			console.log('移除设备列表', devices);
		});

		// 		//网络探测(webrtc)
		// 		window.netcall.detectNetworkStatus({
		// 				detectTime: 30,
		// 				fromDevice: true
		// 			})
		// 			.then(function(obj) {
		// 				console.log('netDetect completed', obj)
		// 			})
		// 			.catch(function(err) {
		// 				console.log('netDetect error', err)
		// 			})
	},
	handleOptionMic(state) {
		let _this = this;
		if (state == "1") {
			//打开麦克风
			window.netcall.startDevice({
				type: Netcall.DEVICE_TYPE_AUDIO_IN,
				device: {
					deviceId: ''
				}
			}).then(function () {
				console.log('启动麦克风成功')
			}).catch(function (err) {
				console.log('启动麦克风失败', err)
			});
		} else {
			//关闭麦克风			
			window.netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN).then(function () {
				console.log('麦克风关闭成功')
			});
		}
	},
	clearCallTimer() {
		//取消时间计算
		let _this = this;
		clearTimeout(_this.callTimer); //清除主叫计时
	},
	clearcallTimerMany() {
		let _this = this
		clearTimeout(_this.callTimerMany);
		console.log("清除了定时器")
	},
	calling(talker, item, type, callingType) {
		//主叫发起通话请求 点对点视频电话
		//talker 被呼叫的语音对象
		let _this = this;
		_this.talkVue
		//主叫时发送的一些配置
		const pushConfig = {
			enable: true,
			needBadge: true,
			needPushNick: true,
			pushContent: '',
			custom: "",
			pushPayload: '',
			sound: '',
			forceKeepCalling: 0
		};
		if (type == "team") {
			_this.account = item

		} else if (type == "p2p") {
			debugger
			_this.account = talker.to
		}

		// 设置对方的信息
		_this.talkVue.clears();
		_this.talkVue.getUseInfo(_this.account, function (val) {
			_this.talkVue.$set(_this.talkVue, "accepter", val);
		});


		if (callingType == 1) {
			_this.netcallType = Netcall.NETCALL_TYPE_VIDEO//视频
		} else if (callingType == 2) {
			_this.netcallType = Netcall.NETCALL_TYPE_AUDIO//语音
		}
		//添加自定义字段，匹配呼叫人
		//设置当前用户聊天记录

		//主叫拨打视频
		window.netcall.call({
			type: _this.netcallType,
			account: _this.account,
			pushConfig: pushConfig,
			sessionConfig: _this.sessionConfig,
			webrtcEnable: true
		})
			.then(function (obj) {
				// 成功发起呼叫
				console.log('call success', obj);
			})
			.catch(function (err) {
				// 被叫不在线
				setTimeout(function () {
					alert(_this.tipMsg.callOffline);
					_this.talkVue.telOff();
				}, 3000);
			});

		// 设置超时计时器
		_this.callTimer = setTimeout(function () {
			if (!netcall.callAccepted) {
				console.log('超时未接听, hangup');
				_this.hangup();
			}
		}, _this.callOutTime);
	},
	startvodeoCall() {
		let _this = this;
		const netcall = window.netcall
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
	},
	startCall() {
		// 接听  连接彼此
		let _this = this;

		const netcall = window.netcall
		// 连接媒体网关
		netcall.startRtc().then(function () {
			// 开启麦克风
			return netcall.startDevice({
				type: Netcall.DEVICE_TYPE_AUDIO_IN
			}).catch(function (err) {
				console.log('启动麦克风失败')
				console.error(err)
				_this.talkVue.$message.error('启动麦克风失败');

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
					document.getElementById('video-mine')
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
				node: document.getElementById('video-other')
			})
			// 设置对方预览画面大小
			let otherVideo = document.getElementById("video-other");
			netcall.setVideoViewRemoteSize({
				account: _this.talker.to,
				width: otherVideo.offsetWidth,
				height: otherVideo.offsetHeight,
				cut: true
			})
		});
	},
	acceptCall() {
		// 接听
		let _this = this;
		_this.beCalling = false;

		window.netcall.response({
			accepted: true,
			beCalledInfo: _this.beCalledInfo,
			sessionConfig: _this.sessionConfig
		})
			.catch(function (err) {
				reject();
				console.log('接听失败', err);
			});
	},
	refuseCall() {
		// 拒绝
		// 可以先通知对方自己忙, 拒绝的时候需要回传在 `beCalling` 事件里面接收到的对象
		let _this = this;

		const beCalledInfo = _this.beCalledInfo;

		window.netcall.control({
			channelId: beCalledInfo.channelId,
			command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
		});
		window.netcall.response({
			accepted: false,
			beCalledInfo
		}).then(function () {
			console.log("拒绝回调")
			_this.talkVue.closeAllUI();
		});
		_this.beCalledInfo = null;
		_this.beCalling = false;
	},
	hangup() {
		//挂断
		let _this = this;
		window.netcall.hangup();
		_this.talkVue.closeAllUI();
		_this.talkVue.closeall()
		//清除计时 主叫
		_this.clearCallTimer();

		// 是否被叫中
		_this.beCalling = false;
		// 呼叫类型
		_this.type = null;
		// 被叫信息
		_this.beCalledInfo = null;
		// 是否正忙
		_this.busy = false;

	},
	LeaveVideo() {
		let _this = this
		window.netcall.hangup();
		_this.talkVue.closeAllUIMany()
		_this.clearcallTimerMany()
	},
}
export default netCall;