//Vue 插件
//添加方法 在main.js  import 引入  ,并用use注册
//页面公共方法
var page = {};

//import config from '@/components/configs'
//const SDK = require('@/components/im/sdk/' + config.sdk)

page.install = function(Vue, options) {
	var myVue = Vue;
	Vue.prototype.page = {
		patientHead: "../../../static/img/im/user_head.png",
		doctorHead: "../../../static/img/im/doctor_head.png",
		checkDoctorOnline(myVm) {
			//医生在线心跳 无返回值 4.8分发送一次
			let _this = myVm;
			setInterval(function() {
				(function() {
					//设置Header请求参数     
					let sParams = {
						params: {},
						headers: _this.com.httpHeader(_this.$store.state)
					};

					_this.com.ajax_get_nocheck(_this.$api.doctor.heartbeat, {
						params: "",
						headers: sParams.headers
					}, function(response) {
						
					});
				}());
			}, 1000 *60*4.8);
		},
		browserRedirect() {
			//判断手机或PC
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				return "phone";
			} else {
				return "pc";
			}
		},
		getSex(sex) {
			//性别
			if (sex == 1) {
				return "男";
			} else if (sex == 2) {
				return "女";
			} else if (sex == 0) {
				return "保密";
			} else {
				return "-";
			}
		},
		isNull: function(str) {
			if ((str === "") || (str == undefined)) {
				return true
			}
			var regu = "^[ ]+$"
			var re = new RegExp(regu)
			return re.test(str)
		},
		timeFormat(bigTime) {
			//shijianchuo是整数，否则要parseInt转换
			let _this = this;
			let time = new Date(bigTime);
			let y = time.getFullYear();
			let m = time.getMonth() + 1;
			let d = time.getDate();
			let h = time.getHours();
			let mm = time.getMinutes();
			let s = time.getSeconds();
			return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm <
				10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
		},
		gotoDataReport(myRoute, code) {
			//跳转数据报告
			myRoute.push({
				name: 'FamilyReport',
				params: {
					"code": code
				}
			})
		},
		getFamilyMember(fatherVue, callback) {
			//获取家庭成员信息
			let _that = this;
			let _this = fatherVue;
			let myHeader = _this.com.httpHeader(_this.$store.state);
			if (myHeader == false) {
				return false;
			}

			let memberID = "";

			if (_this.talker != undefined) {
				memberID = _this.talker.to;
			} else {
				memberID = _this.activeTalker.userCode;
			}

			_this.com.ajax_get(_this.$api.findFamilyMember + memberID, {
				params: "",
				headers: myHeader
			}, function(response) {
				if (_this.com.checkAjaxState(response) == false) {
					//api调用出错
					_this.com.showNotice({
						title: '错误',
						type: "error",
						message: response.data.msg
					});
					return false;
				}
				if (callback) {
					callback(response.data.data);
				}
			});
		},
		getFamilyMembers(opt, callback) {
			//获取家庭成员信息
			//mode:1  PatientCode    2 UserCode
			let _that = this;
			let _this = opt.vm;
			let myHeader = _this.com.httpHeader(_this.$store.state);
			if (myHeader == false) {
				return false;
			}

			let url = "";
			if (opt.mode == 1) {
				url = _this.$api.family.findPatientListByPatientCode + opt.patientCode;

			} else if (opt.mode == 2) {
				url = _this.$api.family.findPatientListByUserCode + opt.userCode;
			}

			_this.com.ajax_get(url, {
				params: "",
				headers: myHeader
			}, function(response) {
				if (_this.com.checkAjaxState(response) == false) {
					//api调用出错
					_this.com.showNotice({
						title: '错误',
						type: "error",
						message: response.data.msg
					});
					return false;
				}
				if (opt.done) {
					opt.done(response.data.data);
				}
			});
		},
		getPatientByPatientCode(opt, callback) {
			//获取家庭成员信息
			//mode:1  PatientCode    2 UserCode
			let _that = this;
			let _this = opt.vm;
			let myHeader = _this.com.httpHeader(_this.$store.state);
			if (myHeader == false) {
				return false;
			}

			_this.com.ajax_get(_this.$api.family.findPatientByPatientCode + opt.patientCode, {
				params: "",
				headers: myHeader
			}, function(response) {
				if (_this.com.checkAjaxState(response) == false) {
					//api调用出错
					_this.com.showNotice({
						title: '错误',
						type: "error",
						message: response.data.msg
					});
					return false;
				}
				if (opt.done) {
					opt.done(response.data.data);
				}
			});
		},
		updateOrderState(fatherVue, opt) {
			//修改订单状态
			//触发：回拨后，只要接通电话即修改
			let _that = this;
			let _this = fatherVue;

			//设置Header请求参数         
			let sParams = {
				params: {},
				headers: _this.com.httpHeader(_this.$store.state)
			};

			// orderType 订单类型 1-视频咨询 2-图文咨询
			// state 咨询订单状态 0-咨询中 1-待回拨 2-待建档 3-已完成 4-强制终止
			sParams.visitOrderQo = {
				"code": opt.code,
				"doctorCode": opt.doctorCode,
				"orderType": opt.orderType,
				"patientCode": opt.patientCode,
				"patientName": opt.patientName,
				"state": opt.state
			}

			_this.com.ajax_post(_this.$api.order.updateOrderStatus, {
				params: sParams.visitOrderQo,
				headers: sParams.headers
			}, function(response) {
				if (_this.com.checkAjaxState(response) == false) {
					//api调用出错
					_this.com.showNotice({
						title: '错误',
						type: "error",
						message: response.data.msg
					});
					return false;
				}
				if (opt.done) {
					opt.done();
				}
			});
		},
		handleSetActiveEle(opt) {
			//设置活动元素

			// 			{
			// 				fatherId:"",
			// 				fatherClass:"",
			// 				childClassName:"",
			// 				removeClassName:"",
			// 				addClassName:"",
			// 				currentEle:""
			// 			}
			//1查找元素集
			var nodes = null;
			if (opt.fatherId != undefined) {
				nodes = document.getElementsById(opt.fatherId);
			} else if (opt.fatherClass != undefined) {
				nodes = document.getElementsByClassName(opt.fatherClass);
			}
			var childNodes = nodes[0].getElementsByClassName(opt.childClassName);

			if (childNodes.length != 0) {
				//除去
				for (var i = 0; i < childNodes.length; i++) {
					childNodes[i].classList.remove(opt.removeClassName);
				}
			}

			var classVal = opt.currentEle.getAttribute("class");
			classVal = classVal.concat(" " + opt.addClassName);
			opt.currentEle.setAttribute("class", classVal);
		},
		showNotice: function(obj) {
			let _this = this;

			message.error("hello", function() {
				console.log("message");
			})
			return false;
			if (_this.isNull(obj.title)) {
				obj.title = "提示";
			}
			if (_this.isNull(obj.message)) {
				obj.message = "";
			}
			if (_this.isNull(obj.type)) {
				obj.type = "success";
			}
			var _notifys = Vue.prototype.$notify;
			if (_notifys != undefined) {
				_notifys.closeAll();
			}
			Vue.prototype.$notify({
				showClose: true,
				title: obj.title,
				message: obj.message,
				type: obj.type,
				duration: 2500
			});

		},
		registerMouseWheel(opt) {
			let that = this;

			if (that.isNull(opt.elm)) {
				return false;
			}

			var myDom = document.getElementById(opt.elm);
			if (myDom == null) {
				return false;
			}

			//兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
			//判断鼠标滚轮滚动方向
			if (myDom.addEventListener) {
				//FF,火狐浏览器会识别该方法
				myDom.addEventListener('DOMMouseScroll', wheel, false);
			}
			myDom.onmousewheel = wheel;

			function wheel(event) {
				var delta = 0;
				if (!event) {
					event = window.event;
				}

				if (event.wheelDelta) {
					//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
					delta = event.wheelDelta / 120;
					if (window.opera) {
						delta = -delta;
					}
					//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
				} else if (event.detail) {
					//FF浏览器使用的是detail,其值为“正负3”
					delta = -event.detail / 3;
				}
				if (delta) {
					var step = 100;
					var maxWidth = 0;
					var maxHeight = 0;

					if (opt.direction == "horizontal") {
						//水平方向
						maxWidth = myDom.offsetWidth;
					} else {
						//垂直方向
						maxHeight = myDom.offsetHeight;
					}

					if (delta < 0) {
						if (opt.direction == "horizontal") {
							//水平方向
							myDom.scrollBy(step, 0);
						} else {
							//垂直方向
							myDom.scrollBy(0, step);
						}
					} else {
						if (opt.direction == "horizontal") {
							//水平方向
							myDom.scrollBy(-step, 0);
						} else {
							//垂直方向
							myDom.scrollBy(0, -step);
						}
					}
				}
			}

		},
		clearOption(params) {
			let that = this;
			if (that.isNull(params)) {
				return false;
			}
			for (let i in params) {
				if (params[i].constructor.name.toUpperCase() == "string") {

				}
			}

		},
		netcallNotice: function(obj) {
			let _this = this;

			if (_this.isNull(obj.title)) {
				obj.title = "提示";
			}
			if (_this.isNull(obj.message)) {
				obj.message = "";
			}
			if (_this.isNull(obj.type)) {
				obj.type = "success";
			}
			var _netcallnotifys = Vue.prototype.$notify;
			if (_netcallnotifys != undefined) {
				_netcallnotifys.closeAll();
			}
			Vue.prototype.$notify({
				showClose: true,
				title: obj.title,
				message: obj.message,
				type: obj.type,
				duration: 2500
			});

		},
		Trim: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		TrimAll: function(str, is_global) {
			var result;
			result = str.replace(/(^\s+)|(\s+$)/g, "");
			if (is_global.toLowerCase() == "g") {
				result = result.replace(/\s/g, "");
			}
			return result;
		},

	}
}
export default page;
