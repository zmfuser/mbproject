<template>
	<div class="panel" style="background: none;">
		<!-- 在线聊天 -->
		<div class="im-box">
			<!-- 左侧 -->
			<div class="im-box-l">
				<!-- 医生个人信息 -->
				<div class="im-box-l-title">
					<img class="doctor-avatar" alt="医生头像" :src="nimData.myInfo.avatar" v-viewer />
					<div class="doctor-name">{{nimData.myInfo.nick}}</div>
					<button class="displaynone" @click="delAllLocalMsgs">清空所有消息</button>
					<img class="btn-login-out" :src="imgs.loginOut" @click="handleLoginOut" title="退出" />
				</div>

				<!-- 咨询患者列表 -->
				<div class="im-box-l-content">
					<ul class="friend-list" v-if="nimData.friendMsgs.length != 0" id="fl">
						<li class="friend" v-for="(item, index) in nimData.friendMsgs" :key="index" @click="selectPeople(item)">
							<img class="friend-avatar" :src="item.avatar==''?'../../../static/img/user/user-default.png':item.avatar" />
							<span class="friend-name">{{item.nick}}</span>
							<span class="friend-last-msg">{{item.lastMsg.text}}</span>
							<span class="friend-time">{{timeFormat(item.lastMsg.time)}}</span>

							<span class="friend-newMsg" v-if="checkIsReady(item)"></span>

						</li>
						<div class="clean"></div>
					</ul>

					<!-- 没有好友时提示以下内容 -->
					<div class="friend no-friend" v-else>暂无联系人</div>
				</div>
			</div>

			<!-- 右侧 -->
			<div class="im-box-r" v-if="wind.boxR">
				<!-- 患者信息 -->
				<div class="talker-info">
					<img class="talker-avatar" :src="talker.avatar" />
					<span class="talker-name">{{talker.nick}}</span>
					<img class="btn-close" :src="imgs.close" @click="handleClose" title="关闭窗口" />
				</div>

				<!-- 家庭成员 -->
				<div class="talker-members">
					<ul class="family">
						<li class="member" v-for="(item, index) in talker.members" :key="index" :id="item.code" @click="handleSelectMember">
							<img class="member-avatar" :src="item.avatar==undefined?com.defaultAdImg: item.avatar" :title="item.patientName" />
							<div class="member-name text-over" :title="item.patientName">{{item.patientName}}</div>
						</li>
					</ul>
				</div>

				<!-- 聊天内容 -->
				<div class="talker-content" id="msg-box">
					<!-- 消息体 对方 -->
					<div class="msg-list" v-for="(item,index) in chatList" :key="index" v-if="item.chatType == 'l'">
						<img class="msg-img" :src="talker.avatar" />
						<div class="msg-text" v-if="item.msgType=='text'">
							{{item.text}}
						</div>
						<div class="msg-text-img-l" v-else-if="item.msgType=='audio'">
							<audio class="media-audio" controls>
								<source :src="item.fileInfo.file.mp3Url" type="audio/mpeg">
								您的浏览器不支持 audio 元素。
							</audio>
						</div>

						<!-- 图片 -->
						<div class="msg-text-img-l" v-else-if="item.msgType=='image'" v-viewer>
							<img class="msg-chat-img" :src="item.fileInfo.file.url" />
						</div>
						<div class="clean"></div>
					</div>

					<div class="msg-list tips-text" v-else-if="item.chatType == 'tip'">
						{{item.text}}

					</div>
					<!-- 消息体 当前登录人 -->
					<div class="msg-list" v-else-if="item.chatType == 'r'">
						<img class="msg-img-r" :src="nimData.myInfo.avatar" />
						<div class="msg-text-r" v-if="item.msgType!='image'">
							{{item.text}}
						</div>
						<!-- 图片 -->
						<div class="msg-text-img-r" v-else v-viewer>
							<img class="msg-chat-img" :src="item.fileInfo.file.url" />
						</div>
						<div class="clean"></div>
					</div>
				</div>

				<!-- 发送消息区 -->
				<div class="talker-foot">
					<div class="foot-bar">
						<!-- <img class="im-fun" src="../../../static/img/im/audio.png" alt="发送语音" /> -->
						<!-- <img class="im-fun" src="../../../static/img/im/video.png" alt="发送视频" @click="telOn" /> -->
						<label for="file1" class='btn-file' title="发送图片"></label>
						<input type="file" name="file" id="file1" class="inputfile" @change="handleSendFileMsg" />

					</div>
					<div class="foot-send">
						<textarea class="send-text" v-model="talker.text" placeholder="请输入消息"></textarea>
						<button class="btn-send" @click="handleSendMsg" title="发送消息">发送</button>
					</div>

				</div>

			</div>
		</div>

		<!-- 多人视频 -->
		<div class="manypeo-netcall" ref="mpn">
			<!-- 多人主叫连接 -->
			<div class="connect-box" ref="nc_connecting">
				<div class="box-content">
					<div class="content-l">
						<img class="l-avatar" :src="talker.avatar" />
					</div>
					<div class="content-r">
						<p class="client-name text-over">{{talker.nick}}</p>
						<p class="connect-tips">正在为您呼叫...</p>
					</div>
				</div>
				<div class="box-foot">
					<img class="btn-nc" src="../../../static/img/im/connect-off.png" @click="telOff" title="挂断" />
				</div>
			</div>
		</div>

		<!-- 视频界面 -->
		<div class="im-netcall" ref="nc">
			<!-- 主叫连接 -->
			<div class="connect-box" ref="nc_connecting">
				<div class="box-content">
					<div class="content-l">
						<img class="l-avatar" :src="talker.avatar" />
					</div>
					<div class="content-r">
						<p class="client-name text-over">{{talker.nick}}</p>
						<p class="connect-tips">正在为您呼叫...</p>
					</div>
				</div>
				<div class="box-foot">
					<img class="btn-nc" src="../../../static/img/im/connect-off.png" @click="telOff" title="挂断" />
				</div>
			</div>

			<!-- 请求接通  对方打电话 -->
			<div class="accept-box" ref="nc_accept">
				<div class="box-content">
					<div class="content-l">
						<img class="l-avatar" :src="accepter.avatar" />
					</div>
					<div class="content-r">
						<p class="client-name text-over">{{accepter.nick}}</p>
						<p class="connect-tips">邀请您进行视频通话...</p>
					</div>
				</div>
				<div class="box-foot">
					<!-- telRefuse 拒绝挂断 -->
					<img class="btn-nc" src="../../../static/img/im/connect-off.png" @click="telRefuse" title="挂断" />
					<img class="btn-nc" src="../../../static/img/im/connect-on.png" @click="telSuccess" title="接通" />
				</div>
			</div>

			<!-- 连接成功 -->
			<div class="talking-box" ref="nc_talking">
				<div class="box-head">
					<img class="avatar" :src="accepter.avatar" />
					<span class="name">{{accepter.nick}}</span>
				</div>


				<!-- 画面会自动生成video   画面大小设置在监听中-->
				<!-- 对方画面 -->
				<div class="other-side" id="video-other">
				</div>

				<!-- 自己的画面 -->
				<div class="my-side" id="video-mine">
				</div>

				<!-- 按钮区 -->
				<div class="talking-foot">
					<img class="btn-nc" src="../../../static/img/im/connect-off.png" @click="telOff" title="挂断" />
					<img class="btn-nc" :src="states==1? imgs.video.on:imgs.video.off" :datastate="states" @click="handleOptionMic"
					 :title="(states==1?'关闭麦克风':'打开麦克风')" />
					<!-- <img class="btn-nc" src="../../../static/img/im/voice-change.png" title="调节音量" /> -->
				</div>
			</div>

			<!-- 背景 -->
			<div class="netcall-bg"></div>
		</div>

	</div>
</template>

<script>
	import NetCall from '@/components/im/sdk/NIM_Web_Netcall_v6.2.0.js'
	// import WebRTC from '@/components/im/sdk/NIM_Web_WebRTC_v6.2.0.js'

	import NETCALLSDK from "@/components/im/js/netcall.js"

	//云信在线咨询 v1.0.0  by vic
	//main.js 配置加载云信SDK
	//进入页面后，初始化方法并连接SDK  医生在创建帐号时，自动创建云信帐号和密码作为ACCOUNT TOKEY
	//好友列表：由session会话过滤好友帐号，再获取其资料(目前最多一次性获取150条)，最后绑定session会话消息，并渲染页面

	export default {
		name: "Talk",
		components: {

		},
		data() {
			return {
				myNetCall: NETCALLSDK,
				nimData: {
					account: "",
					token: "",
					myInfo: {
						avatar: "../../../static/img/user/doctor_img.jpg",
						nick: ""
					},
					session: [],
					friendCounts: [], //好友帐号 通过session会话过滤
					friendInfos: [], //好友资料
					friendMsgs: [] //好友及其会话消息
				},
				nim: null,
				wind: {
					boxR: false
				},
				accepter: {},
				talker: {
					"to": "",
					"avatar": "",
					"fromId": "",
					"fromNick": "",
					"text": "",
					"members": []
				},
				activeTalker: {},
				chatList: [],
				chatFlog: "first",
				imgs: {
					loginOut: '../../../static/img/im/login-out.png',
					close: '../../../static/img/im/close.png',
					audio: {
						on: '../../../static/img/im/audio-on.png',
						off: '../../../static/img/im/audio-off.png'
					},
					video: {
						on: '../../../static/img/im/voice-change.png',
						off: '../../../static/img/im/voice-no.png'
					},
					photo: {
						on: '../../../static/img/im/photo-on.png',
						off: '../../../static/img/im/photo-off.png'
					}
				},
				states: "1", //声音开关  1——开   0——关
				loading: null,
				sessionState: ""
			}
		},
		computed: {

		},
		methods: {
			checkIsReady(val) {
				let _this = this;


				//((val.lastMsg.flow=='in')&&(getJSON(val.localCustom) ==undefined))

				//消息不是接收过来的，则不显示角标
				if (val.lastMsg.flow != 'in') {
					return false;
				}

				let localCustom = JSON.parse(val.localCustom);

				if (localCustom.isReady == '0') {
					return true;
				} else {
					return false;
				}

			},
			handleOptionMic(e) {
				//开关麦克风
				let _this = this;

				if (_this.states == "1") {
					//关闭麦克风
					_this.states = "0";

				} else {
					//打开麦克风
					_this.states = "1";
				}
				_this.myNetCall.handleOptionMic(_this.states);
			},
			clears() {
				//清空信息
				let _this = this;

				//清空accepter
				_this.$set(_this, "accepter", {});

			},
			closeAllUI() {
				let _this = this;
				_this.closeUI("nc_connecting", "close"); //视频连接
				_this.closeUI("nc_talking", "close"); //对话界面
				_this.closeUI("nc_accept", "close"); //被叫话界面
				_this.closeUI("nc", "close"); //视频框

			},
			closeUI(ref, state) {
				//显示与隐藏
				let _this = this;
				if (_this.$refs[ref] == undefined) {
					console.log("UI不存在")
					return false;
				}
				if (state == "open") {
					_this.$refs[ref].style.display = "block";
				} else if (state == "close") {
					_this.$refs[ref].style.display = "none";
				}

			},
			telOn() {
				//Netcall 打视频电话
				let _this = this;

				_this.closeUI("nc", "open"); //打开视频框
				_this.closeUI("nc_connecting", "open"); //打开视频连接
				_this.myNetCall.calling(_this.talker); //拨通电话
			},
			telSuccess() {
				//接电话
				let _this = this;
				_this.closeAllUI();
				_this.closeUI("nc", "open"); //打开视频框
				_this.closeUI("nc_talking", "open"); //打开视频连接

				_this.myNetCall.acceptCall();

			},
			telOff() {
				//挂断电话
				let _this = this;

				_this.myNetCall.hangup(); //挂断电话
				_this.closeAllUI();
			},
			telRefuse() {
				//拒绝电话 当医生被呼叫时
				let _this = this;

				_this.myNetCall.refuseCall(); //挂断电话 有被叫信息
				_this.closeAllUI();
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			timeFormat(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				let _this = this;
				let time = new Date(shijianchuo);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				let h = time.getHours();
				let mm = time.getMinutes();
				let s = time.getSeconds();
				return y + '-' + _this.add0(m) + '-' + _this.add0(d) + ' ' + _this.add0(h) + ':' + _this.add0(mm) + ':' + _this.add0(
					s);
			},
			delAllLocalMsgs() {
				//手动删除所有本地消息
				nim.deleteAllLocalMsgs({
					done: function(error, obj) {
						console.log(error);
						console.log(obj);
						console.log('删除所有本地消息' + (!error ? '成功' : '失败'));
					}
				});
			},
			initNimSDK(opt) {
				//初始化IM 
				let _this = this;
				//1 连接SDK(登录帐号)
				//UI loading 开始
				console.log("loading");

				if (!_this.com.isNull(window.nim)) {
					window.nim.destroy();
				}
				_this.connectSDK();
			},
			reConnectSDK() {
				//尝试重新连接
				let _this = this;
				_this.connectSDK();
			},

			connectSDK() {
				//连接云信SDK
				let _this = this;

				//nim云信实例
				window.nim = SDK.NIM.getInstance({
					appKey: _this.$config.appkey,
					account: _this.nimData.account,
					token: _this.nimData.token,
					debug: true,
					needMsgReceipt: true,
					needReconnect: true, //是否需要重连接
					onconnect: function(optional) {
						//SDK 连接成功
						//关闭loading

						console.log('SDK 连接成功')
						console.log(optional);

					},
					ondisconnect: function(error) {
						console.log('SDK 连接断开', error);

						//尝试重连接
						// _this.reConnectSDK();
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
									break;
							}
						}
					},
					onerror: function(error) {
						console.log('SDK 连接失败', error);

						//尝试重连接
						_this.reConnectSDK();
					},
					onmyinfo: _this.onMyInfo,
					onsyncdone: _this.onSyncDone,
					onsessions: _this.onSessions,
					onupdatesession: _this.onUpdateSession,
					onroamingmsgs: _this.onRoamingMsgs,
					onofflinemsgs: _this.onOfflineMsgs,
					onmsg: _this.onMsg
				});
			},
			onSyncDone() {
				//NIm 初始化完成
				let _this = this;

				//初始化Netcall，此功能必须等IM初始化完成方可初始化
				//将本页实例传入
				_this.myNetCall.initNetCall(_this);

				//清除loading
				_this.loading.close();
			},
			onMyInfo(user) {
				//个人信息
				let _this = this;
				_this.$set(_this.nimData, "myInfo", user)
			},
			checkIm() {
				//检测云信实例
				if (window.nim == undefined) {
					console.log("云信实例丢失，请尝试重新连接!");
					return false;
				}
			},
			getUseInfo(userCount, callback) {
				//获取单条用户信息
				if ((userCount == undefined) || (userCount == "")) {
					return false;
				}
				if (window.nim == undefined) {
					console.log("云信实例丢失，请尝试重新连接!");
					return false;
				}
				window.nim.getUser({
					account: userCount,
					done: function(error, users) {
						if (callback) {
							callback(users);
						}
					}
				});
			},
			getUsersInfo(userArr, callback) {
				//获取用户信息 最多150条
				if (userArr.length == 0) {
					return false;
				}
				if (window.nim == undefined) {
					console.log("云信实例丢失，请尝试重新连接!");
					return false;
				}

				window.nim.getUsers({
					accounts: userArr,
					done: function(error, users) {
						if (callback) {
							callback(users)
						}
					}
				});
			},
			updateSessionList(orginal, key, val) {
				//更新会话用户列表(更新好友列表)
				//orginal:更新的字段
				//target:更新的值
				let _this = this;
				this.$set(orginal, key, val);
			},
			onSessions(sessions) {
				//获取最近会话好友
				console.log(sessions)
				let _this = this;
				let tempFriends = [];

				_this.$set(_this.nimData, "friendMsgs", []);
				_this.$nextTick(function() {
					//获取会话，合并会话，过滤好友，获取好友资料，绑定好友会话
					//合并会话
					_this.nimData.session = window.nim.mergeSessions(_this.nimData.session, sessions);
					//过滤好友帐号
					_this.handleGetFriendCount();
				})


			},
			onUpdateSession(sessions) {
				//更新近会话好友
				//触发条件：好友发送信息成功时，自动发出一条更新消息	
				let _this = this;
				_this.chatFlog = "2"

				// if(_this.sessionState=="local"){
				// 	return false;
				// }


				_this.$set(_this.nimData, "friendMsgs", []);

				_this.$nextTick(function() {
					//获取会话，合并会话，过滤好友，获取好友资料，绑定好友会话
					//合并session会话
					_this.nimData.session = window.nim.mergeSessions(_this.nimData.session, sessions);
					//过滤好友帐号
					_this.handleGetFriendCount();

				})

			},
			handleGetFriendCount() {
				//通过session过滤好友帐号	
				let _this = this;

				//1通过session过滤好友帐号				
				if (_this.nimData.session.length != 0) {
					for (let i in _this.nimData.session) {
						if (_this.nimData.session[i].to != undefined) {
							//_this.nimData.friendCounts.push(_this.nimData.session[i].to);
							_this.handleMergeFriendCount(_this.nimData.session[i]);
						}
					}
				}
				//console.log("好友count:" + JSON.stringify(_this.nimData.friendCounts));
				//获取account好友资料
				_this.handleGetUsersInfo(_this.nimData.friendCounts);
			},
			handleMergeFriendCount(session) {
				let _this = this;
				if (_this.nimData.friendCounts.length == 0) {
					_this.nimData.friendCounts.push(session.to);
				} else {
					let hasEle = false;
					for (let i in _this.nimData.friendCounts) {
						if (_this.nimData.friendCounts[i] == session.to) {
							hasEle = true;
							break;
						}
					}
					if (hasEle == false) {
						//未找到，则添加新元素
						_this.nimData.friendCounts.push(session.to);
					}
				}
			},
			handleGetUsersInfo(accountArr) {
				//通过好友account,获取好友列表资料
				let _this = this;
				if (accountArr.length == 0) {
					console.log("抱歉，好友帐号为空");
					return false;
				}
				//查询当前好友资料			
				_this.getUsersInfo(accountArr, function(val) {
					_this.updateSessionList(_this.nimData, "friendInfos", val);
					//console.log("好友资料:" + JSON.stringify(_this.nimData.friendInfos));
					//去合并好友及session
					_this.handleMergeFriendMsg();
				});
			},
			handleMergeFriendMsg() {
				//合并好友及其会话
				let _this = this;
				if ((_this.nimData.session.length == 0) || (_this.nimData.friendInfos.length == 0)) {
					console.log("抱歉，好友帐号或者好友资料为空");
					return false;
				}

				let sessions = _this.nimData.session; //session会话列表
				let friendInfos = _this.nimData.friendInfos; //好友资料

				for (let j in sessions) {
					for (let k in friendInfos) {
						//{"account":"1108569956284628992","nick":"乔新新","avatar":"http://file.huaqueyun.cn/huaque-files/15547258627851108569956284628992.jpg","gender":"unknown","createTime":1553138649158,"updateTime":1554725870866}
						if (sessions[j].to == friendInfos[k].account) {
							//找到ACCOUNT后合并
							_this.handleMergeFriendAndMsg(Object.assign(sessions[j], friendInfos[k]))
							break;
						}
					}
				}
				//console.log("好友及会话=" + JSON.stringify(_this.nimData.friendMsgs));
			},
			handleMergeFriendAndMsg(friendAndMsg) {
				//合并好友及资料
				//如果好友已存在，则更新，否则添加
				let _this = this;

				if (friendAndMsg.lastMsg.type == "audio") {
					friendAndMsg.lastMsg.text = "语音消息";
				}

				if (_this.nimData.friendMsgs.length == 0) {
					if (friendAndMsg.lastMsg.attach == undefined) {
						_this.nimData.friendMsgs.push(friendAndMsg);
					}
				} else {
					//是否已有好友
					let hasElement = false;
					for (let i in _this.nimData.friendMsgs) {
						if (friendAndMsg.account == _this.nimData.friendMsgs[i].account) {
							hasElement = true;

							if (friendAndMsg.lastMsg.attach == undefined) {
								//存在则更新数据；
								_this.$set(_this.nimData.friendMsgs, i, friendAndMsg);
								break;
							}

						}
					}
					if (hasElement == false) {
						_this.nimData.friendMsgs.push(friendAndMsg);
					}
				}


				if (_this.nimData.friendMsgs.length > 0) {
					_this.nimData.friendMsgs.sort(_this.handleSortArr);
				}
				//console.log("好友及资料" + JSON.stringify(_this.nimData.friendMsgs));
			},
			handleSortArr(a, b) {
				//排序 friendMsgs 更新时间排序
				return a.lastMsg.time > b.lastMsg.time;
			},
			onRoamingMsgs(obj) {
				//漫游消息
				console.log('收到漫游消息', obj);
			},
			onOfflineMsgs(obj) {
				//离线消息
				console.log('收到离线消息', obj);
			},
			onMsg(msg) {
				//收到消息
				console.log('收到消息', msg.scene, msg.type, msg);

				nim.updateLocalSession({
					id: msg.sessionId,
					localCustom: '{"isReady":"0"}', //设置消息未读
					done: function(error, obj) {
						console.log(error);
						console.log(obj);
						console.log('更新本地会话' + (!error ? '成功' : '失败'));
						return false;
					}
				});
				let _this = this;
				switch (msg.type) {
					case 'custom':
						//onCustomMsg(msg);
						break;
					case 'notification':
						// 处理群通知消息
						//onTeamNotificationMsg(msg);
						break;
						// 其它case
					default:
						_this.handlePushMsg(msg)
						break;
				}
			},
			selectPeople(opt) {
				//选择聊天用户
				//每次选择好友时，需要清空聊天内容
				let _this = this;





				let that = event.currentTarget.children;
				if (that.length != 0) {
					for (let i in that) {
						if (that[i].className == "friend-newMsg") {
							that[i].style.display = 'none';
							break;
						}
					}
				}
				_this.chatFlog = "first";

				//打开聊天窗口
				_this.wind.boxR = true;

				//好友信息
				_this.talker.to = opt.to; //当前聊天人ID
				_this.talker.avatar = opt.avatar == undefined ? "--" : opt.avatar; //头像
				_this.talker.nick = opt.nick == undefined ? _this.com.defaultAdImg : opt.nick; //姓名

				//清空聊天内容
				_this.chatList.length = 0;

				//1 加载本地存储的聊天内容  只存七天
				let oldChat = window.localStorage.getItem(opt.lastMsg.from);
				if (oldChat != null) {
					oldChat = Parser();
				}

				//获取家庭成员
				_this.talker.members.length = 0;
				_this.page.getFamilyMember(_this, function(val) {
					if (val.length == 0) {
						console.log("家庭成员不存在")
						_this.$set(_this.talker, "members", [{
							code: _this.talker.to,
							patientName: _this.talker.nick
						}]);
					} else {
						_this.$set(_this.talker, "members", val);
					}


					//视图渲染完后 过滤聊天信息、确定当前聊天者
					_this.$nextTick(function() {
						//过滤信息
						//当前聊天者
						console.log(_this.nimData.session);
						let lastSession = _this.handleGetCurrentTalkerSession(_this.talker.to);
						console.log(lastSession);

						//设置当前活动的家庭成员
						if (lastSession.lastMsg.custom != undefined) {
							_this.handleSetCurrentActiveMember(lastSession.lastMsg.custom);
						} else {
							//在医生与患者对话中，找到最后一次通过话人员作为活动用户
						}

						//2 装载聊天记录
						_this.handleSetChat();



						//更新本地会话
						window.nim.updateLocalSession({
							id: opt.id,
							localCustom: '{"isReady":"1"}',
							done: function(error, obj) {
								console.log(error);
								console.log(obj);
								console.log('更新本地会话' + (!error ? '成功' : '失败'));

								_this.sessionState = "local";

								return false;
							}
						});
						
						
						var fl=document.getElementById("fl");
						if(fl!=null){
							fl.scrollTo(0,0)
						}

					});
				});
			},
			handleSetCurrentActiveMember(custom) {
				let _this = this;
				let myCustom = JSON.parse(custom);
				if (myCustom.RemoteExtension.constructor.name == "String") {
					myCustom = JSON.parse(myCustom.RemoteExtension);
				} else {
					myCustom = (myCustom.RemoteExtension);
				}

				console.log(myCustom);

				//更新活动聊天对象；
				_this.$set(_this, "activeTalker", myCustom);

				let myCurrentMember = null;
				//通过家庭成员code确定当前聊天人
				if (_this.talker.members.length != 0) {
					for (let i in _this.talker.members) {

						//通过code查找
						if (_this.talker.members[i].code == (_this.activeTalker.CurrentCode == undefined ? _this.activeTalker.CurrentMember :
								_this.activeTalker.CurrentCode)) {
							myCurrentMember = _this.talker.members[i];
							break;
						}
						//通过姓名查找
						if (_this.talker.members[i].patientName == (_this.activeTalker.CurrentCode == undefined ? _this.activeTalker.CurrentMember :
								_this.activeTalker.CurrentCode)) {
							myCurrentMember = _this.talker.members[i];
							break;
						}
					}
				}

				if (_this.com.isNull(myCurrentMember)) {
					console.log("当前活动人不存在")
					return false;
				}
				let htmlCurrentMember = document.getElementById(myCurrentMember.code);
				_this.page.handleSetActiveEle({
					fatherClass: "family",
					childClassName: "member",
					removeClassName: "active",
					addClassName: "active",
					currentEle: htmlCurrentMember
				});
			},
			handleSelectMember() {
				//选择家庭成员
				let _this = this;

				//当前选者的元素
				let htmlCurrentMember = event.currentTarget;
				//清空聊天记录
				//_this.chatList.length = 0;
				_this.$set(_this, "chatList", []);
				_this.chatFlog = "first";
				_this.$nextTick(function() {
					if (_this.activeTalker.AllMember.length != 0) {
						for (var i in _this.activeTalker.AllMember) {
							if (_this.activeTalker.AllMember[i].MemberCode == htmlCurrentMember.id) {
								_this.activeTalker.CurrentMember = _this.activeTalker.AllMember[i].MemberName;
								_this.activeTalker.CurrentMemberCode = _this.activeTalker.AllMember[i].MemberCode;
								break;
							}
						}
					} else {
						return false;
					}

					_this.page.handleSetActiveEle({
						fatherClass: "family",
						childClassName: "member",
						removeClassName: "active",
						addClassName: "active",
						currentEle: htmlCurrentMember
					});

					//重新装载聊天内容
					_this.handleSetChat();
				});
			},
			handleGetCurrentTalkerSession(account) {
				//根据帐户，查找当前session会话
				let _this = this;

				//找到当前session会话，返回其session记录
				let currentSession = ""; //当前session会话
				if (_this.nimData.session.length != 0) {
					for (let i in _this.nimData.session) {
						if (_this.nimData.session[i].account == account) {
							currentSession = _this.nimData.session[i];
							break;
						}
					}
				}
				return currentSession;
			},

			handleGetCurrentSession(account) {
				//根据帐户，查找当前session
				let _this = this;

				//找到当前session会话，返回其id，否则返回空
				let currentSessionId = ""; //当前session会话
				if (_this.nimData.session.length != 0) {
					for (let i in _this.nimData.session) {
						if (_this.nimData.session[i].account == account) {
							currentSessionId = _this.nimData.session[i].id;
							break;
						}
					}
				}
				return currentSessionId;
			},
			handleSetChat() {
				//初始化加载 设置聊天信息
				//触发条件：选择聊天对象并打开聊天窗口时
				let _this = this;
				if (_this.talker.to == "") {
					console.log("抱歉，当前聊天对象为空");
					return false;
				}
				let myCurrentSessionId = _this.handleGetCurrentSession(_this.talker.to);
				if (myCurrentSessionId == "") {
					console.log("抱歉，当前聊天对象session为空");
					return false;
				}
				//拉取本地消息数据  最多加载100条
				window.nim.getLocalMsgs({
					sessionId: myCurrentSessionId,
					limit: 100,
					done: function(error, obj) {
						console.log('获取本地消息' + (!error ? '成功' : '失败'), error, obj);
						//1装载本地数据库indexDB聊天信息
						console.log(_this.nimData.myInfo);
						if (obj.msgs.length != 0) {
							for (let m in obj.msgs) {
								//判断消息类型

								//消息，如果是当前用户发送的，则加r 
								let currentMsg = obj.msgs[(obj.msgs.length - parseInt(m) - 1)];
								console.log(currentMsg);

								_this.handlePushMsg(currentMsg);
							}
						}

						if (_this.chatFlog != "first") {
							//2装载session信息
							if (_this.nimData.friendMsgs.length != 0) {
								//从好友session中查到当前聊天用户信息
								for (let i in _this.nimData.friendMsgs) {
									if (_this.nimData.friendMsgs[i].to == _this.talker.to) {
										let myMsg = {};
										if (_this.nimData.friendMsgs[i].lastMsg != undefined) {
											//会话消息，别人发送的一条消息
											myMsg = JSON.parse(JSON.stringify(_this.nimData.friendMsgs[i].lastMsg));
										} else {
											myMsg = JSON.parse(JSON.stringify(_this.nimData.friendMsgs[i]));
										}
										_this.handlePushMsg(myMsg);
										break;
									}
								}
							}
						}
						_this.handleMsgScroll();
					}
				});
			},
			handleMsgScroll() {
				//消息窗口滚动至底
				let _this = this;
				_this.$nextTick(function() {
					//消息滚动底部
					let msgContent = document.getElementById("msg-box");
					msgContent.scrollTo(0, msgContent.scrollHeight);
				});
			},
			handlePushMsg(newMsg) {
				//添加一条消息
				let _this = this;
				//复制消息
				let myMsg = {};
				if (newMsg.lastMsg != undefined) {
					//会话消息，别人发送的一条消息
					myMsg = JSON.parse(JSON.stringify(newMsg.lastMsg));
				} else {
					myMsg = JSON.parse(JSON.stringify(newMsg));
				}

				//判断是否为当前活动聊天人 
				//目前用人名来判断

				//当前消息的发送人
				let custom = null;
				if (myMsg.custom != undefined) {
					custom = JSON.parse(myMsg.custom);
					if (custom.RemoteExtension.constructor.name != "Object") {
						custom = JSON.parse(custom.RemoteExtension);
					} else {
						custom = (custom.RemoteExtension);
					}
				} else {
					console.log("此消息被过滤")
					return false;
				}


				if (_this.activeTalker.CurrentMemberCode != custom.CurrentMemberCode) {
					return false;
				}

				//处理单条消息
				let chat = {
					uId: myMsg.from,
					devType: myMsg.fromClientType,
					toId: myMsg.to,
					text: myMsg.text,
					msgType: myMsg.type,
					custom: (myMsg.custom == undefined ? "" : myMsg.custom),
					fileInfo: (myMsg.type == 'image' ? myMsg : myMsg)
				}

				if (myMsg.type == "audio") {
					chat.fileInfo = myMsg
				}

				//消息过滤
				//消息类型 tip  text
				if ((myMsg.type = "text") || (myMsg.type = "image") || (myMsg.type = "audio")) {
					//发送人是否是本医生
					if (myMsg.from == _this.$store.state.userInfo.wangyiName) {
						chat.chatType = "r"
					} else {
						chat.chatType = "l"
					}
					//判断是否是tip提示文字
					if (myMsg.tip != undefined) {
						chat.chatType = "tip";
						chat.text = (_this.com.isNull(myMsg.tip) ? _this.timeFormat(myMsg.userUpdateTime) : myMsg.tip)
					}

				} else if (myMsg.type = "notification") {
					//过滤 未接来电
					if (myMsg.attach != undefined) {
						return false;
					}
				}

				//如果是图片消息，添加
				if (myMsg.file != undefined) {

					if (_this.activeTalker.CurrentMemberCode == custom.CurrentMemberCode) {
						if (chat.msgType == "audio") {
							chat.text = "您有一条语言消息"
						}
						_this.chatList.push(chat);
					}
				} else if (myMsg.type == "text") {
					if (myMsg.custom != undefined) {
						if (_this.activeTalker.CurrentMemberCode == custom.CurrentMemberCode) {
							_this.chatList.push(chat);
						}
					}
				}
			},
			handleSendMsg() {
				//发送消息
				let _this = this;

				if (_this.talker.to == "") {
					alert("请选择用户");
					return false;
				}
				//消息内容必须除空格
				let txt = _this.talker.text;
				txt = txt.replace(/(^\s*)|(\s*$)/g, ""); //去空格
				txt = txt.replace(/<[^>]+>|&[^>]+;/g, ""); //去标签
				txt = txt.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
				txt = txt.replace(/&npsp;/ig, ''); //去掉npsp

				if (_this.talker.text == "") {
					alert("不可以发送空消息,请注意，您可能输入非法字符");
					return false;
				}

				//设置当前用户聊天记录
				let cus = {
					RemoteExtension: JSON.stringify(_this.activeTalker)
				};

				window.nim.sendText({
					scene: 'p2p',
					to: _this.talker.to,
					content: JSON.stringify(cus),
					text: txt,
					custom: JSON.stringify(cus),
					done: function(error, msg) {
						console.log(error);
						console.log(msg);
						console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);

						//消息显示位置 
						//注：1PC版永远为右侧  2ANDROID
						//l:左侧
						//r:右侧	
						msg.chatType = "r";
						//填入更新的会话信息
						_this.handlePushMsg(msg);

						//清空消息
						_this.talker.text = "";
						_this.handleMsgScroll();
					}
				});
			},
			handleSendFileMsg() {
				let _this = this;
				//设置当前用户聊天记录

				let cus = {
					RemoteExtension: JSON.stringify(_this.activeTalker)
				};

				window.nim.sendFile({
					scene: 'p2p',
					to: _this.talker.to,
					type: 'image',
					custom: JSON.stringify(cus),
					fileInput: document.getElementById("file1"),
					fastPass: '{"w":200,"h":110,"md5":"xxxxxxxxx"}',
					beginupload: function(upload) {
						// - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
						// - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
					},
					uploadprogress: function(obj) {
						console.log('文件总大小: ' + obj.total + 'bytes');
						console.log('已经上传的大小: ' + obj.loaded + 'bytes');
						console.log('上传进度: ' + obj.percentage);
						console.log('上传进度文本: ' + obj.percentageText);
					},
					uploaddone: function(error, file) {
						console.log(error);
						console.log(file);
						console.log('上传' + (!error ? '成功' : '失败'));
					},
					beforesend: function(msg) {
						console.log('正在发送p2p image消息, id=' + msg.idClient);
						_this.handlePushMsg(msg);
						_this.handleMsgScroll();
					},
					done: function() {
						console.log("完成上传");
					}
				});
			},
			handleClose() {
				//关闭聊天窗口
				//清除talker信息，chatList清空
				let _this = this;
				_this.wind.boxR = false;

				//好友信息
				_this.talker.to = ""; //当前聊天人ID
				_this.talker.avatar = ""; //头像
				_this.talker.nick = ""; //姓名

				//聊天内容清空
				_this.chatList.length = 0;
			},
			handleLoginOut() {
				//退出登录
				let _this = this;
				_this.$confirm('请问，您是否要退出在线咨询?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					window.nim.disconnect();
					window.nim.destroy();
					_this.$router.push({
						name: "DoctorDefault"
					});
				});
			},
			openFullScreen2() {
				let _this = this;
				_this.loading = this.$loading({
					lock: true,
					text: '正在为您配置信息...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				_this.initNimSDK();
			}
		},
		created() {
			let _this = this;

			//获取帐号信息
			if ((_this.com.isNull(_this.$route.params.wId)) || (_this.com.isNull(_this.$route.params.wPd))) {
				_this.nimData.account = _this.$store.state.userInfo.wangyiName; //用户名
				_this.nimData.token = _this.$store.state.userInfo.wangyiPassword; //用户名
			} else {
				_this.nimData.account = _this.$route.params.wId; //用户名
				_this.nimData.token = _this.$route.params.wPd; //密码
			}

			_this.openFullScreen2();

			_this.$orginaljs.addEvent(window.document, "keydown", function(e) {
				var currKey = 0;
				e = e || event;
				currKey = e.keyCode || e.which || e.charCode;
				//监测如果按f5，则挂断
				if (currKey == 116) {
					console.log("F5")
					if (window.netcall != null) {
						window.netcall.hangup();
					}
				}
			});
		},
		beforeDestroy() {
			let _this = this;
			if (!_this.com.isNull(window.nim)) {
				window.nim.destroy({
					done: function(err) {
						console.log('实例已被完全清除');
						window.nim = null;
					}
				});
			}
		},
		destroyed() {
			let _this = this;
			_this.loading.close();
		}
	}
</script>

<style scoped>
	.im-box-l-content{
		height: 700px;
		
		overflow: auto;
	}
	.media-audio {
		height: 30px;
		line-height: 30px;
	}

	/* 家庭成员列表 */
	.talker-members {
		position: relative;
		width: 100%;
		height: 100px;
		background: #fff;

		z-index: 2900;
	}

	.talker-members .family {
		width: 100%;
		height: 100px;
		padding: 15px;
		overflow-x: hidden;
	}

	.talker-members .family .member {
		float: left;
		margin-right: 20px;
		cursor: pointer;
		text-align: center;
		max-width: 80px;
	}

	.talker-members .family .active .member-avatar {
		border: 2px solid #26A738;
	}

	.talker-members .family .member .member-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.talker-members .family .member .member-name {
		text-align: center;
		font-size: 12px;
		color: #999999;
	}

	/* IM 在线咨询盒子 */
	div,
	ul,
	li {
		box-sizing: border-box;
	}

	.display-block {
		display: block !important;
	}

	.clean {
		clear: both;
	}

	.float-r {
		float: right !important;
		background: #26A738 !important;
		color: #fff !important;
	}

	/* 视频盒子 */
	.im-netcall {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 2000;
		display: none;
	}

	.im-netcall .btn-nc {
		width: 50px;
		height: 50px;
		margin: 0 10px;
		cursor: pointer;
	}

	/* 呼叫 */
	.im-netcall .connect-box {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -100px;
		width: 400px;
		height: 200px;
		background: #fff;
		border-radius: 4px;
		z-index: 2900;
		display: none;
	}

	/* 请求连接 */
	.im-netcall .accept-box {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -100px;
		width: 400px;
		height: 200px;
		background: #fff;
		border-radius: 4px;
		z-index: 2800;
		display: none;
	}

	/* 主叫与被叫界面 start */
	.im-netcall .box-content {
		height: 110px;
		border-bottom: 1px solid #E4E4E4;
	}

	.im-netcall .box-content .content-l {
		float: left;
		margin-right: 15px;
		padding: 20px;
	}

	.im-netcall .box-content .content-r {
		float: left;
		padding-top: 20px;
		width: 260px;
	}

	/* 头像 */
	.im-netcall .box-content .content-l .l-avatar {
		height: 60px;
		width: 60px;
		border: 1px solid red;
		border-radius: 50%;
	}

	/* 名称 */
	.im-netcall .box-content .content-r .client-name {
		height: 50px;
		line-height: 50px;
		font-weight: 600;
		letter-spacing: 1px;
	}

	/* 提示信息 */
	.im-netcall .connect-tips {
		color: #999999;
		font-size: 12px;
	}

	.im-netcall .box-foot {
		padding: 20px 30px;
		text-align: right;
	}

	/* 主叫与被叫界面 end */

	/* 连接界面 */
	.im-netcall .talking-box {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 800px;
		height: 600px;
		margin-left: -400px;
		margin-top: -300px;
		color: #000;
		border-radius: 4px;
		background: #fff;
		z-index: 2200;
		display: none;
	}

	.im-netcall .talking-box .box-head {
		position: relative;
		height: 100px;
		width: 100%;
		z-index: 2210;
	}

	.im-netcall .box-head .avatar {
		position: absolute;
		left: 15px;
		top: 15px;
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}

	.im-netcall .box-head .name {
		position: absolute;
		left: 75px;
		top: 15px;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		color: #fff;
	}

	.im-netcall .talking-box .other-side {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 4px;
		z-index: 2201;
		background: gray;
	}

	.im-netcall .talking-box .my-side {
		position: absolute;
		top: 0;
		right: 0;
		width: 150px;
		height: 260px;
		border-radius: 4px;
		z-index: 2202;
	}

	.im-netcall .talking-box .talking-foot {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 80px;
		width: 100%;
		text-align: center;
		z-index: 2202;
	}

	/* 挂断 */
	.btn-file {
		display: inline-block;
		width: 24px;
		height: 20px;
		background: url(../../../../static/img/im/upload.png) no-repeat;
		background-size: 100% 100%;
	}

	/* 视频盒子 背景 */
	.im-netcall .netcall-bg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 2100;
		background: rgba(0, 0, 0, 0.9);
	}

	/* 视频 UI END */
	.im-box {
		position: relative;
		max-width: 1200px;
		width: 100%;
		min-height: 800px;
		margin: 0 auto;
		z-index: 1000;
	}

	/* 左盒子 好友列表  */
	.im-box-l {
		position: absolute;
		top: 0;
		left: 0;
		width: 280px;
		height: 100%;
		background: #fff;
	}

	/* 左盒子 头部 医生用户信息  */
	.im-box-l-title {
		width: 100%;
		height: 100px;
		background: #fff;
	}

	/* 医生头像 */
	.doctor-avatar {
		position: absolute;
		top: 15px;
		left: 15px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #ccc;
		cursor: pointer;
		z-index: 10001;
	}

	/* 医生姓名  */
	.doctor-name {
		position: absolute;
		top: 25px;
		left: 80px;
		width: 110px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		letter-spacing: 1px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333333;
		z-index: 10001;
	}

	/* 退出按钮  */
	.btn-login-out {
		position: absolute;
		top: 25px;
		right: 15px;
		height: 25px;
		cursor: pointer;
		z-index: 10001;
	}

	/* 左侧盒子 好友列表 */
	.friend-list {
		list-style: none;
		clear: both;
		border-top: 10px solid #F3F3F3;
	}

	/* 好友项 */
	.friend {
		float: left;
		width: 100%;
		height: 80px;
		background: #fff;
		border-bottom: 1px solid #E8E8E8;
		position: relative;
		cursor: pointer;
		z-index: 1000;
	}

	.friend:last-child {
		border-bottom: none !important;
	}

	.friend:hover {
		background: #F5FFF6;
	}

	/* 没有好友 */
	.no-friend {
		line-height: 80px;
		font-weight: 500;
		text-align: center;
		color: #333333;
		border-top: 10px solid #F3F3F3;
	}

	/* 选择好友时 */
	.friend-list .is-selected {
		background: #F5FFF6;
	}

	/* 好友项 头像 */
	.friend .friend-avatar {
		position: absolute;
		left: 10px;
		top: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #CCC;
	}

	/* 好友名字 */
	.friend .friend-name {
		position: absolute;
		left: 65px;
		top: 8px;
		width: 100px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333333;
	}

	/* 好友最后一条消息 */
	.friend .friend-last-msg {
		position: absolute;
		left: 65px;
		bottom: 0;
		width: 200px;
		height: 25px;
		font-size: 12px;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #CCCCCC;
	}

	/* 好友列表 最后一条信息时间 */
	.friend .friend-time {
		position: absolute;
		right: 5px;
		top: 13px;
		font-size: 12px;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #CCCCCC;
	}

	/* 新消息提醒 */
	.friend .friend-newMsg {
		position: absolute;
		right: 5px;
		bottom: 13px;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #f05749;
	}

	/* 右盒子 聊天界面  */
	.im-box-r {
		position: absolute;
		top: 0;
		right: 0;
		left: 300px;
		height: 100%;
		width: auto;
	}

	/* 聊天者头部区 */
	.talker-info {
		position: relative;
		width: 100%;
		height: 100px;
		background: #fff;
		border-bottom: 1px solid #E8E8E8;
	}



	/* 聊天者 -- 头像 */
	.talker-info .talker-avatar {
		position: absolute;
		left: 15px;
		top: 25px;
		width: 50px;
		height: 50px;
		border-radius: 50%;

	}

	/* 聊天者 -- 姓名 */
	.talker-info .talker-name {
		position: absolute;
		left: 85px;
		top: 25px;
		width: 400px;
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* 聊天者信息区 关闭按钮 */
	.talker-info .btn-close {
		position: absolute;
		right: 15px;
		top: 15px;
		width: 15px;
		height: 15px;
		cursor: pointer;
	}

	/* 消息区 */
	.talker-content {
		position: absolute;
		top: 201px;
		bottom: 160px;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 10px 3%;
		background: #fff;
	}

	/* 每条消息 */
	.msg-list {
		padding: 4px 0px 10px 0px;
		position: relative;
		margin-bottom: 15px;
	}


	/* tip */
	.tips-text {
		text-align: center;
		font-size: 12px;
		color: #999999;
		height: 30px;
	}

	/* 消息头像 */
	.msg-list .msg-img {
		float: left;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #26A738;
	}

	.msg-list .msg-chat-img {
		float: left;
		width: 260px;
	}

	.msg-list .msg-img-r {
		float: right;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #26A738;
	}

	/* 消息内容 */
	.msg-list .msg-text {
		float: left;
		margin-left: 15px;
		margin-right: 15px;
		max-width: 60%;
		line-height: 25px;
		font-size: 14px;
		color: #333333;
		background: #F3F3F3;
		padding: 15px;
		border-radius: 4px;
	}


	.msg-list .msg-text-img-l {
		float: left;
		margin-left: 15px;
		margin-right: 15px;
		max-width: 60%;
	}

	.msg-list .msg-text-img-r {
		float: right;
		margin-left: 15px;
		margin-right: 15px;
		max-width: 60%;
	}

	.msg-list .msg-text-r {
		float: right;
		margin-left: 15px;
		margin-right: 15px;
		max-width: 60%;
		line-height: 25px;
		font-size: 14px;
		color: #fff;
		background: #26A738;
		padding: 15px;
		border-radius: 4px;
	}

	/* 发送消息区 */
	.talker-foot {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 160px;
		background: #fff;
		border-top: 1px solid #E8E8E8;
	}

	/* 发送消息工具栏  语音/视频 按钮区 */
	.talker-foot .foot-bar {

		height: 40px;
		line-height: 40px;
		padding: 10px 0 0 15px;
	}

	/* 语音/视频 按钮 */
	.talker-foot .foot-bar .im-fun {
		float: left;
		height: 18px;
		margin-right: 15px;
		cursor: pointer;
	}

	.talker-foot .foot-bar .inputfile {
		display: none;
	}

	/* 消息发送区 */
	.talker-foot .foot-send {
		box-sizing: border-box;
		height: 60px;
	}

	/* 消息框 */
	.talker-foot .send-text {
		float: left;
		width: 100%;
		height: 60px;
		color: #333333;
		line-height: 25px;
		padding: 15px;
		outline: none;
		border: none;
		box-sizing: border-box;
		letter-spacing: 1px;
		resize: none;
	}

	/* 发送按钮 */
	.talker-foot .btn-send {
		float: right;
		width: 10%;
		padding: 10px;
		margin: 5px 15px 0 0;
		border-radius: 4px;
		outline: none;
		border: none;
		background: #26A738;
		color: #fff;
		cursor: pointer;
	}

	.talker-foot .btn-tips {
		font-size: 12px;

		color: #fff;

	}
</style>



// WEBPACK FOOTER //
// src/components/im/talk.vue