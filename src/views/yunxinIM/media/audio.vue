<template>
	<div class="audio-wapper">
		<audio ref="refMusic" @error.native="handleError" @ended="handleEnded" @canplaythrough="handleInitMusic" @timeupdate="handleTimeUpdate">
			<source :src="myMusic.src">
			</source>
			抱歉，您的浏览器不支持 audio 功能，请用chrome浏览器打开此页面!
		</audio>
		<div class="audio-left">
			<button shape="circle" :icon="myMusic.btnImg" @click="handlePlay">play</button>
		</div>
		<div class="audio-right">
			<div class="audio-timeline">
				<div class="slider" :tooltipVisible="false" :step="0.1" ref="refSlider" :defaultValue="myMusic.currentTime" :max="myMusic.duration"
				 :value="myMusic.playTime" @change="handleChangeTime" @afterChange="handleAfterChangeTime" ></div>
			</div>
			<div class="audio-timestart">{{formateTime(myMusic.currentTime)}} /</div>

			<div class="audio-timeend">{{formateTime(myMusic.duration)}}</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "audios",
		props: ["audioSrc"],
		data() {
			return {
				myMusic: {
					src: "",
					ele: null,
					duration: 0,
					playTime: 0,
					currentTime: 0,
					btnImg: ""
				},
				img: {
					play: "play-circle",
					pause: "pause"
				}
			};
		},
		methods: {
			formateTime(times) {
				let h = Math.floor(times / 3600).toFixed(0);
				let m = Math.floor(times / 60).toFixed(0)
				let s = (times % 60).toFixed(0);
				let result = "";
				if (h == 0) {
					return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
				} else {
					return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
				}
			},
			handleError() {
				this.$emit('error');
			},
			handleCheckAudio() {
				let _this = this;
				if (_this.myMusic.ele == null) {
					return false;
				} else {
					return true;
				}
			},
			handleInitMusic() {
				//加载完成
				let _this = this;
				_this.myMusic.ele = _this.$refs.refMusic;
				_this.myMusic.duration = _this.myMusic.ele.duration;
				_this.myMusic.currentTime = _this.myMusic.ele.currentTime;

				_this.myMusic.btnImg = _this.img.play;
			},
			handleTimeUpdate() {
				let _this = this;
				_this.myMusic.currentTime = _this.myMusic.ele.currentTime;
				_this.myMusic.playTime = _this.myMusic.currentTime;
			},
			handleChangeTime(val) {
				//调节时间
				let _this = this;
				if (!_this.handleCheckAudio()) {
					return false;
				}
				_this.myMusic.currentTime = val;
				_this.myMusic.playTime = val;
				_this.myMusic.ele.currentTime = val;
				//console.log("调整中的时间：" + val)
			},
			handleAfterChangeTime(val) {
				//调节时间
				let _this = this;
				if (!_this.handleCheckAudio()) {
					return false;
				}
				_this.myMusic.ele.play();
				_this.$refs.refSlider.blur();
				_this.myMusic.btnImg = _this.img.pause;
				//console.log("调节后的时间：" + val)
			},
			handlePlay: function() {
				let _this = this;
				if (!_this.handleCheckAudio()) {
					return false;
				}
				if (_this.myMusic.ele.paused) {
					_this.myMusic.ele.play();
					_this.myMusic.btnImg = _this.img.pause;
				} else {
					_this.myMusic.ele.pause();
					_this.myMusic.btnImg = _this.img.play;
				}
			},
			handleEnded() {
				let _this = this;
				_this.myMusic.ele.pause();
				_this.$refs.refSlider.blur();
				_this.myMusic.ele.currentTime = 0;
				_this.myMusic.playTime = 0;
				console.log("end")
			}
		},
		created: function() {
			let _this = this;
			if (_this.page.isNull(_this.audioSrc)) {
				return false;
			}
			_this.myMusic.src = _this.audioSrc;
		},
		mounted() {
			let _this = this;
			_this.$on('error', function() {
				console.log('child-change-event-handler');
			});
		}
	};
</script>

<style>
	.audio-wapper {
		overflow: hidden;

	}

	.audio-left {
		float: left;
		/* width: 100%; */
		height: 100%;
		
		/* padding: 10px 5px; */
	}
.audio-left button{
	color: #ddd;
	background: #eeeeee;
	border:1px solid #eeeeee;
	width: 50px;
	height: 23px;
}
	.audio-right {
		float: left;
		height: 100%;
		text-align: center;
	}

	.audio-right .audio-timeline {
		min-width: 150px;
		font-size: 14px;
	}
		
	.ant-slider-step{
		background: #26A738;
	}

	.audio-right .audio-timestart {
		display: inline-block;
		min-width: 40px;
		font-size: 14px;
	}

	.audio-right .audio-timeend {
		display: inline-block;
		min-width: 40px;
		font-size: 14px;
	}
</style>
