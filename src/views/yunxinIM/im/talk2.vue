<template>
  <div class="im-panel" v-loading="loading.doctorInfo">
    <div class="box-l" id="bl">
      <div class="box-title" id="bl-title">
        <img class="doctor doctor-head" :src="nim.doctorInfo.avatar" :title="nim.doctorInfo.nick" />
        <div class="doctor doctor-info">
          <span class="doctor-name" :title="nim.doctorInfo.nick">{{nim.doctorInfo.nick}}</span>
          <!-- <span class="doctor-hospatil-name" title="医院名称">医院名称</span> -->
          <el-tag size="mini" color="#56C8AC">{{sign.roleName}}</el-tag>
          <div class="department">
            <span>{{sign.departmentLevel1Name}}</span>
            <span></span>
            <span>{{sign.departmentLevel2Name}}</span>
          </div>
        </div>

        <div class="clear"></div>
        <div class="text-center">
          <!-- <a-input-search
            v-model="test.no"
            placeholder="input search text"
            style="width: 200px"
            @search="addFriend"
          />-->
          <!-- <el-input v-model="test.no" placeholder="请输入姓名" style="width: 100%;" size="small" @search="findFriend"></el-input> -->
        </div>
      </div>
      <div class="box-friend" id="bl-friend">
        <ul class="friends-list" id="fl">
          <li
            class="friend"
            v-for="(item, index) in nim.friends"
            :key="index"
            :ref="'friend'+item.id"
            @click="handleSelectFirend(item)"
          >
            <div class="list-avatar">
              <img
                class="head"
                :src="!page.isNull(item.userinfo)?item.userinfo.avatar:img.friendHead"
              />
              <!-- <img
                class="head"
                :src="page.isNull(item.userinfo.avatar)?(item.userinfo==null?img.friendHead:item.userinfo.avatar):img.friendHead"
              />-->
            </div>
            <div class="list-info">
              <div class="name" :title="item.custom">{{item.custom}}</div>
              <div class="msg text-over" :title="item.lastMsg.text">
                <span v-if="item.lastMsg.type=='text'">{{item.lastMsg.text}}</span>
                <span v-else-if="item.lastMsg.type=='image' ">您有一条图片消息</span>
                <span v-else-if="item.lastMsg.type=='audio' ">您有一条语音消息</span>
                <span
                  v-else-if="item.lastMsg.type=='notification'&&item.lastMsg.attach.type=='netcallMiss'"
                >{{item.lastMsg.text}}</span>
                <span v-else-if="item.lastMsg.type=='tip'">{{item.lastMsg.tip}}</span>
                <span
                  v-else-if="item.lastMsg.type=='notification'&&item.lastMsg.attach.type=='cancelNetcallBeforeAccept'"
                >已取消呼叫</span>

                <span
                  v-else-if="item.lastMsg.type=='notification'&&item.lastMsg.attach.type=='netcallBill'"
                >网络通话</span>
              </div>
              <el-badge :value="item.unread" class="item" v-show="item.unread!=0"></el-badge>
              <div class="time">{{page.timeFormat(item.updateTime)}}</div>
            </div>
          </li>
        </ul>
        <!-- <div class="no-friend">
						暂无咨询患者
        </div>-->
      </div>
    </div>
    <div class="box-r" v-if="hide.Rcontent">
      <!-- 悬浮窗 -->
      <div class="suspension" ref="susp" @click="continueJoin">
        <img src="../../../../static/img/liaotian.png" alt />
        <span>重新加入聊天团队</span>
      </div>
      <div class="r-title">
        <div
          class="patient-name text-over"
          :title="nim.activeFriend.CurrentMember"
        >{{nim.activeFriend.CurrentMember}}</div>
        <div class="patient-more">
          <img :src="page.isNull(patient.headerImg)?img.friendHead:patient.headerImg" alt />
          <span>{{patient.userName}}</span>
        </div>
      </div>
      <div class="r-content">
        <div class="msg-panel" id="msg-box">
          <!-- 远端 左侧显示 -->
          <div
            class="chat-list"
            v-for="(item,index ) in nim.chat"
            :key="index"
            v-if="item.from!=nim.doctorInfo.account"
          >
            <img
              class="chat-avatar"
              :src="page.isNull(item.custom)?img.friendHead:item.custom.avatar"
            />
            <!-- 文本图 -->
            <div class="chat-msg" v-if="item.type=='text'">{{item.text}}</div>

            <!-- 图片消息 -->
            <div class="chat-msg" v-else-if="item.type=='image'" v-viewer>
              <img class="chat-msg-img" :src="item.file.url" title="点击查看" />
            </div>
            <!-- 视频消息 -->
            <!-- <div class="chat-msg" v-else-if="item.type=='notification'">{{item.text}}</div> -->
            <div
              class="chat-msg"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallMiss'"
            >{{item.text}}</div>

            <div
              class="chat-msg"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallBill'"
            >话单通话时长：{{item.attach.duration}} 秒</div>

            <!-- tip消息 -->
            <div class="chat-msg" v-else-if="item.type=='tip'">{{item.tip}}</div>

            <!-- 音频消息 -->
            <div class="chat-msg" v-else-if="item.type=='audio'">
              <im-audio :audioSrc="item.file.url"></im-audio>
            </div>
            <div class="clearfix"></div>
          </div>

          <!-- 医生端 右侧显示 -->
          <div class="chat-list" v-else>
            <img class="chat-avatar-r" :src="nim.doctorInfo.avatar" />
            <!-- 文本图 -->
            <div class="chat-msg-r" v-if="item.type=='text'">{{item.text}}</div>

            <!-- 视频消息 -->
            <div
              class="chat-msg-r"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallBill'"
            >话单通话时长：{{item.attach.duration}} 秒</div>

            <div
              class="chat-msg-r"
              v-else-if="item.type=='notification'&&item.attach.type=='cancelNetcallBeforeAccept'"
            >已取消呼叫</div>
            <!-- tip -->
            <div class="chat-msg-r" v-if="item.type=='tip'">{{item.tip}}</div>
            <!-- 图片消息 -->
            <div class="chat-msg-r" v-else-if="item.type=='image'" v-viewer>
              <img class="chat-msg-img" :src="item.file.url" title="点击查看" />
            </div>

            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="msg-tool">
        <!-- 功能按钮 -->
        <div class="tools">
          <div class="img" icon="picture" title="发送图片">
            <label for="file1" class="btn-file" title="发送图片"></label>
            <input type="file" name="file" id="file1" class="inputfile" @change="handleSendFileMsg" />
          </div>

          <el-button
            class="el-icon-video-camera"
            plain
            :disabled="!hide.telOn"
            title="视频通话"
            @click="telOn"
          ></el-button>

          <el-button
            class="el-icon-phone-outline"
            plain
            :disabled="!hide.telOn"
            title="语音通话"
            @click="voice"
          ></el-button>

          <el-button
            class="el-icon-video-play"
            plain
            :disabled="!hide.threePchat"
            title="多人视频通话"
            @click="threePchat"
          ></el-button>

          <el-button
            class="el-icon-user"
            plain
            :disabled="!hide.addDoctor"
            title="将医生加入聊天"
            @click="addDoctor"
          ></el-button>

          <!-- <el-button class="el-icon-refresh" plain title="就诊记录" @click="medicalRecord"></el-button> -->
          <el-button class="el-icon-refresh" plain title="随访记录" @click="FollowupRecords"></el-button>

          <!-- <el-button class="el-icon-refresh" plain title="随访记录" @click="nigimg"></el-button> -->
        </div>
        <el-input
          type="textarea"
          class="msg"
          placeholder="请输入内容..."
          :rows="3"
          v-model="nim.sendText"
          @keydown.native.enter="checkEnter($event)"
        ></el-input>
        <span class="ctrlEnter">Ctrl+Enter 回车</span>
        <el-button class="btn-send" type="primary" size="small" @click="handleSendMsg">发送</el-button>
      </div>
    </div>
    <div class="r-userinfo" v-if="hide.userinfoContent">
      <!-- 就诊记录 -->
      <medical-record v-show="record.medical"></medical-record>
      <!-- 随访记录 -->
      <followup-records v-show="record.followup"></followup-records>
    </div>

    <!-- 随访记录 -->
    <!-- <div class="r-userinfo" v-show="FollowupRecords">
      <div>
        <div class="patient-record">就诊记录</div>
      </div>
    </div>-->
    <!-- <div class="box-other">
			其它功能
    </div>-->
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
          <img
            class="btn-nc"
            src="../../../../static/im/connect-off.png"
            @click="telOff"
            title="挂断"
          />
        </div>
      </div>

      <!-- 多人视频主叫 -->
      <div class="member-list" ref="nc_memberList">
        <div class="video">
          <div class="memberVideo">
            <img class="pleaseImg" src="../../../../static/im/wating.gif" alt />
            <div class="fontLive" ref="notAnswer1">未接听</div>
          </div>
          <div class="memberVideo">
            <img class="pleaseImg" src="../../../../static/im/wating.gif" alt />
            <div class="fontLive" ref="notAnswer2">未接听</div>
          </div>
        </div>
        <div class="myvideo">
          <div class="memberVideo">
            <div></div>
          </div>
        </div>
        <div class="box-foot1">
          <img
            class="btn-nc"
            src="../../../../static/im/connect-off.png"
            @click="leaveRoom"
            title="挂断"
          />
        </div>
      </div>

      <!-- 请求接通 对方打多人视频电话 -->
      <div class="accept-box" ref="nc_acceptMany">
        <div class="box-content">
          <div class="content-l">
            <img class="l-avatar" :src="accepter.avatar" />
          </div>
          <div class="content-r">
            <p class="tips">{{customsysmsg.apnsText}}</p>
          </div>
        </div>
        <div class="box-foot">
          <!-- telRefuse 拒绝挂断 -->
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-off.png"
            @click="telManyRefuse"
            title="挂断"
          />
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-on.png"
            @click="telManySuccess"
            title="加入"
          />
        </div>
      </div>
      <!-- 接通-多人视频 -->
      <div class="member-list" ref="nc_talkingMany">
        <div class="allvideo">
          <div class="video memberVideo" id="othervideoChat"></div>
        </div>

        <div class="myvideo1" id="myvideoChat"></div>
        <div class="box-foot1">
          <img
            class="btn-nc"
            src="../../../../static/im/connect-off.png"
            @click="leaveRoom"
            title="挂断"
          />
          <img
            class="btn-nc"
            :src="states==1? imgs.video.on:imgs.video.off"
            :datastate="states"
            @click="handleOptionMic"
            :title="(states==1?'关闭麦克风':'打开麦克风')"
          />
        </div>
      </div>
      <!-- 请求接通  对方打电话 -->
      <div class="accept-box" ref="nc_accept">
        <div class="box-content">
          <div class="content-l">
            <img
              class="l-avatar"
              :src="page.isNull(accepter.avatar)?img.friendHead:accepter.avatar"
            />
          </div>
          <div class="content-r">
            <p class="client-name text-over">{{accepter.nick}}</p>
            <p class="connect-tips">邀请您进行视频通话...</p>
          </div>
        </div>
        <div class="box-foot">
          <!-- telRefuse 拒绝挂断 -->
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-off.png"
            @click="telRefuse"
            title="挂断"
          />
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-on.png"
            @click="telSuccess"
            title="接通"
          />
        </div>
      </div>

      <!-- 请求接通  对方打电话 -->
      <div class="accept-box" ref="nc_acceptVodeo">
        <div class="box-content">
          <div class="content-l">
            <img
              class="l-avatar"
              :src="page.isNull(accepter.avatar)?img.friendHead:accepter.avatar"
            />
          </div>
          <div class="content-r">
            <p class="client-name text-over">{{accepter.nick}}</p>
            <p class="connect-tips">邀请您进行语音通话...</p>
          </div>
        </div>
        <div class="box-foot">
          <!-- telRefuse 拒绝挂断 -->
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-off.png"
            @click="telRefuse"
            title="挂断"
          />
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-on.png"
            @click="telvoiceSuccess"
            title="接通"
          />
        </div>
      </div>

      <!-- 语音连接成功 -->
      <div class="talking-box1" ref="nc_talkingVodeo">
        <div class="box-head">
          <img class="avatar" :src="page.isNull(accepter.avatar)?img.friendHead:accepter.avatar" />
          <span class="name">{{accepter.nick}}</span>
        </div>

        <!-- 按钮区 -->
        <div class="talking-foot">
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-off.png"
            @click="telOff"
            title="挂断"
          />
          <img
            class="btn-nc"
            :src="states==1? imgs.video.on:imgs.video.off"
            :datastate="states"
            @click="handleOptionMic"
            :title="(states==1?'关闭麦克风':'打开麦克风')"
          />
          <!-- <img class="btn-nc" src="../../../static/img/im/voice-change.png" title="调节音量" /> -->
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
        <div class="other-side" id="video-other"></div>

        <!-- 自己的画面 -->
        <div class="my-side" id="video-mine"></div>

        <!-- 按钮区 -->
        <div class="talking-foot">
          <img
            class="btn-nc"
            src="../../../../static/img/im/connect-off.png"
            @click="telOff"
            title="挂断"
          />
          <img
            class="btn-nc"
            :src="states==1? imgs.video.on:imgs.video.off"
            :datastate="states"
            @click="handleOptionMic"
            :title="(states==1?'关闭麦克风':'打开麦克风')"
          />
          <!-- <img class="btn-nc" src="../../../static/img/im/voice-change.png" title="调节音量" /> -->
        </div>
      </div>

      <!-- 背景 -->
      <div class="netcall-bg"></div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="doctor1Visible"
      :append-to-body="true"
      class="page-dialog pres-dialoag"
      width="30%"
    >
      <div class="content" id="j-addDoctor">
        <div class="j-doctorChat" v-for="(item,index) in checkteamDoctor" :key="index">
          <div class="content-left">
            <div class="left-img">
              <img :src="item.originalImgUrl" />
            </div>
            <div class>
              <div>姓名：{{item.doctorName}}</div>
              <div>科室：{{item.departmentLevel1Name}}</div>
              <div>擅长：内科</div>
            </div>
          </div>
          <div class="rightBtn">
            <el-button
              type="success"
              size="mini"
              plain
              class="j-joinChat"
              @click="joinChat(item)"
            >加入聊天</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="listlistlist"
      :append-to-body="true"
      class="page-dialog pres-dialoag"
      width="40%"
    >
      <div class="bigbox" id="html">
        <div class="msg-panel" id="msg-box">
          <!-- 远端 左侧显示 -->
          <div
            class="chat-list"
            v-for="(item,index ) in nim.chat"
            :key="index"
            v-if="item.from!=nim.doctorInfo.account"
          >
            <!-- <img
              class="chat-avatar"  style="crossOrigin:anonymous"
              :src="page.isNull(item.custom)?img.friendHead:item.custom.avatar"
            />-->
            <img
              src="http://192.168.1.221/group1/M00/00/08/wKgB3V0r0HWAaO27AAAydc3oNY8468.jpg"
              class="chat-avatar"
              alt
            />
            <!-- 文本图 -->
            <div class="chat-msg" v-if="item.type=='text'">{{item.text}}</div>

            <!-- 图片消息 -->
            <div class="chat-msg" v-else-if="item.type=='image'" v-viewer>
              <img class="chat-msg-img" :src="item.file.url" title="点击查看" />
            </div>
            <!-- 视频消息 -->
            <!-- <div class="chat-msg" v-else-if="item.type=='notification'">{{item.text}}</div> -->
            <div
              class="chat-msg"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallMiss'"
            >{{item.text}}</div>

            <div
              class="chat-msg"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallBill'"
            >话单通话时长：{{item.attach.duration}} 秒</div>

            <!-- tip消息 -->
            <div class="chat-msg" v-else-if="item.type=='tip'">{{item.tip}}</div>

            <!-- 音频消息 -->
            <div class="chat-msg" v-else-if="item.type=='audio'">
              <im-audio :audioSrc="item.file.url"></im-audio>
            </div>
            <div class="clearfix"></div>
          </div>

          <!-- 医生端 右侧显示 -->
          <div class="chat-list" v-else>
            <!-- <img class="chat-avatar-r" :src="nim.doctorInfo.avatar"  style="crossOrigin:anonymous"/> -->
            <img
              src="http://192.168.1.221/group1/M00/00/08/wKgB3V0r0HWAaO27AAAydc3oNY8468.jpg"
              class="chat-avatar"
              alt
            />
            <!-- 文本图 -->
            <div class="chat-msg-r" v-if="item.type=='text'">{{item.text}}</div>

            <!-- 视频消息 -->
            <div
              class="chat-msg-r"
              v-else-if="item.type=='notification'&&item.attach.type=='netcallBill'"
            >话单通话时长：{{item.attach.duration}} 秒</div>

            <div
              class="chat-msg-r"
              v-else-if="item.type=='notification'&&item.attach.type=='cancelNetcallBeforeAccept'"
            >已取消呼叫</div>
            <!-- tip -->
            <div class="chat-msg-r" v-if="item.type=='tip'">{{item.tip}}</div>
            <!-- 图片消息 -->
            <div class="chat-msg-r" v-else-if="item.type=='image'" v-viewer>
              <img class="chat-msg-img" :src="item.file.url" title="点击查看" />
            </div>

            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NetCall from "@/views/yunxinIM/im/sdk/NIM_Web_Netcall_v6.2.0.js";
import NETCALLSDK from "@/views/yunxinIM/im/js/netcall.js";
import Audio from "@/views/yunxinIM/media/audio.vue";
import MedicalRecord from "@/views/yunxinIM/im/medicalRecord.vue";
import FollowupRecords from "@/views/yunxinIM/im/FollowupRecords.vue";
import {
  getDoctor,
  getUserIngInquiry,
  findDoctor,
  updateInquiry,
  itemKey
} from "@/api/im/checkIm.js";
import { drugsList } from "@/api/inquiry/BsInquiry.js";
import { uploadFile } from "@/api/sys/client.js";
// import FamilyReportSelect from "@/components/dataReport/family-report-select.vue"
// import MedicalRecordAddSelect from "@/components/medicalRecord/medical-record-add-select.vue"

//云信在线咨询 v2.0.0  by vic
//main.js 配置加载云信SDK
//进入页面后，初始化方法并连接SDK  医生在创建帐号时，自动创建云信帐号和密码作为ACCOUNT TOKEY
//好友列表：由session会话过滤好友帐号，再获取其资料(目前最多一次性获取150条)，最后绑定session会话消息，并渲染页面
// wangyiName: "1108280816091398144"
// wangyiPassword: "f3875c68546479c5379134c79ef83968"

// 	wangyiName: "1128860537921339392"
// wangyiPassword: "af2c72ad1918911c1fb25c4b3b480e92"
import html2canvas from "html2canvas";
export default {
  name: "Talk",
  components: {
    "im-audio": Audio,
    "medical-record": MedicalRecord,
    "followup-records": FollowupRecords
    // "family-report-select": FamilyReportSelect,
    // "medical-record-add-select": MedicalRecordAddSelect
  },
  data() {
    return {
      listlistlist: false,
      video1: false,
      msg: {
        name: ""
      },
      dialog: {},
      count: 0,
      record: {
        medical: true,
        followup: false
      },
      druglish: [],
      fineDrugName: "",
      activeNames: [],
      doctor1Visible: false,

      opt: {
        medicalReacord: {}
      },
      teamSroom: {
        teamAll: "",
        name: "",
        teamId: ""
      },
      lists: {
        patientCode: "",
        doctorCode: "",
        healthAssistantCode: ""
      },
      TEAM: {
        teamname: ""
      },
      customsysmsg: {},
      teamCustom: {},
      time: "",
      num: "",
      invalid: [], //被解散的群组
      ship: "",
      getSign: "",
      sign: {},
      members: {},
      countIn: {
        patientCode: "",
        doctorCode: "",
        healthAssistantCode: ""
      },
      dialogVisible: false,
      valuelist: "",
      to: "",
      video: [],
      teamDoctor: "",
      doctorVisible: false,
      checkteamDoctor: [],
      // 显示和隐藏
      hide: {
        Rcontent: false,
        userinfoContent: false,
        telOn: false,
        threePchat: false,
        addDoctor: false
      },
      // 头部信息
      patient: {
        headerImg: "",
        userName: ""
      },
      dialog: {
        familyReport: false,
        medicalReacord: false
      },
      img: {
        doctorHead: "../../../static/img/im/doctor_head.png",
        friendHead: "../../../../static/im/user_head.png",
        connectOn: "../../../static/img/im/connect-on.png",
        connectOff: "../../../static/img/im/connect-off.png"
      },
      imgs: {
        loginOut: "../../../static/img/im/login-out.png",
        close: "../../../static/img/im/close.png",
        audio: {
          on: "../../../static/img/im/audio-on.png",
          off: "../../../static/img/im/audio-off.png"
        },
        video: {
          on: "../../../static/img/im/voice-change.png",
          off: "../../../static/img/im/voice-no.png"
        },
        photo: {
          on: "../../../static/img/im/photo-on.png",
          off: "../../../static/img/im/photo-off.png"
        }
      },
      test: {
        no: ""
      },
      loading: {
        doctorInfo: true,
        // friendList: true,
        family: false
      },
      disabled: {
        history: true,
        dataReport: true
        // medicalRecordAdd: true
      },
      notice: this.$notify,
      show: {
        family: false
      },
      myNetCall: NETCALLSDK,
      accepter: {},
      // 多人视频
      myGroup: {},
      otherGroup: [],
      teamGroup: {
        teamid: "",
        teamName: "",
        accountArr: ""
      },
      states: "1", //声音开关  1——开   0——关
      talker: {
        to: "",
        avatar: "",
        fromId: "",
        fromNick: "",
        text: ""
      },
      nim: {
        //网易云ID
        account: "1135443614210588672",
        //网易云密码
        token: "f658816ccec02f2b5f05cc4cd100bc51",
        doctorInfo: {
          avatar: "../../../../static/img/user/doctor_img.jpg",
          nick: ""
        },
        friends: [],
        activeTalker: {},
        activeFriend: {},
        session: [],
        chat: [],
        sendText: ""
      }
    };
  },
  computed: {},
  methods: {
    // 获取用户信息
    // getUserDome(val) {
    // return window.nim.getUser({
    //     account: val,
    //     done: function(error, user) {
    //       console.log(error);
    //       console.log(user);
    //       console.log("获取用户资料" + (!error ? "成功" : "失败"));
    //     }
    //   });
    // },
    // 给回访患者发送信息
    visitUser(visitObj) {
      let _this = this;
      window.nim.sendTipMsg({
        scene: "p2p",
        to: visitObj.userCode,
        tip: "开始回访",
        done: function(error, msg) {
          if (!error) {
            for (var item of _this.nim.friends) {
              if (msg.sessionId === item.id) {
                _this.$bus.emit("contactUsesr", 1);
                _this.handleSelectFirend(item);
              }
            }
          }
        }
      });
      // console.log("正在发送p2p提醒消息, id=" + msg.idClient);
    },
    // 发送自定义消息
    sendCustom(customValue) {
      let _this = this;
      window.nim.getUser({
        account: customValue.lastMsg.from,
        done: function(error, user) {
          window.nim.sendCustomSysMsg({
            scene: customValue.scene,
            to: customValue.to,
            sendToOnlineUsersOnly: false,
            apnsText: user.nick + "邀请您进行通话",
            content: "{key:1}",
            done: function(error, msg) {
              console.log(
                "发送" +
                  msg.scene +
                  "自定义系统通知" +
                  (!error ? "成功" : "失败") +
                  ", id=" +
                  msg.idClient
              );
            }
          });
        }
      });
    },

    nigimg() {
      this.listlistlist = true;
      setTimeout(() => {
        let canvasID = document.getElementById("html");
        html2canvas(canvasID).then(canvas => {
          var ImgSrc = canvas.toDataURL("image/png");
          var a = this.dataURLtoFile(ImgSrc);
          var formData = new FormData();
          var formData = new FormData();
          formData.append("file", a);
          uploadFile(formData).then(res => {});
        });
      }, 2000);
    },
    dataURLtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, { type: mime });
    },
    // 删除本地会话
    delLocalsession(delValue) {
      window.nim.deleteLocalSession({
        id: delValue.id,
        done: deleteLocalSessionDone
      });
      function deleteLocalSessionDone(error, obj) {
        console.log(error);
        console.log(obj);
        console.log("删除本地会话" + (!error ? "成功" : "失败"));
      }
    },
    //  随访记录
    FollowupRecords() {
      let _this = this;

      _this.record.medical = !_this.record.medical;
      _this.record.followup = !_this.record.followup;
      // suifang
      // _this.$router.push("/manB/suifang");
      // _this.$bus.emit("contactUsesr", 2);
      // setTimeout(() => {
      //   _this.$bus.emit("dialog", { value: _this.dialog, key: 1 });
      // }, 2000);
    },

    // 医生弹框
    addDoctor() {
      let _this = this;
      _this.doctor1Visible = true;
      var posisional = JSON.parse(sessionStorage.getItem("getInfo"));
      _this.otherGroup.push({
        account: posisional.wangyiName,
        nick: posisional.name,
        avatar: posisional.avatar
      });
      var teamCode = posisional.teamCode;
      // 调用基于健康团队获取团队中的医生的接口
      getDoctor(teamCode).then(res => {
        if (res.code == 0) {
          _this.$set(_this, "teamDoctor", res.value);
          for (let item of _this.teamDoctor) {
            // 对象中是否含有null，若有则不放入数组中
            if (item != null) {
              _this.checkteamDoctor.push(item);
            }
          }
        }
      });
      _this.$set(_this, "checkteamDoctor", []);
    },
    // 将医生加入聊天，并创建群聊(讨论组)
    joinChat(val) {
      // val 医生的im账号
      let _this = this;
      var list = _this.nim.activeTalker;
      var custom = JSON.stringify({ key: "p2pEnd", value: "change" });
      _this
        .$confirm("确认将该医生加入聊天中, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // 点对点发送tip消息，提示点对点会话结束升级成群聊天
          window.nim.sendTipMsg({
            scene: "p2p",
            to: _this.nim.activeTalker.to,
            tip: "会话转移",
            custom: custom,
            done: function(error, msg) {
              if (!error) {
                // for(var item of _this.nim.session){

                // }
                _this.hide.userinfoContent = false;
                _this.hide.Rcontent = false;
                _this.$bus.emit("rcontent", 0);
              }
            }
          });
          _this.otherGroup.push({
            account: val.wanyiName,
            nick: val.doctorName,
            avatar: val.originalImgUrl
          });

          var a = ",",
            b = "",
            arr = [],
            account = "";
          account = JSON.parse(sessionStorage.getItem("getInfo"));
          for (var item of _this.otherGroup) {
            b += item.nick + a;
            if (account.wangyiName != item.account) {
              arr.push(item.account);
            }
          }
          b += "等人";
          _this.createTeam(b, arr, val.wanyiName);
          _this.doctor1Visible = false;
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 创建群
    createTeam(b, arr, doctor) {
      let _this = this;
      window.nim.createTeam({
        type: "advanced",
        avatar: "../../../../static/img/avatar_team@2x.png",
        name: b,
        accounts: arr,
        level: 3,
        joinMode: "noVerify",
        beInviteMode: "noVerify",
        ps: "建了一个高级群",
        custom: JSON.stringify(_this.otherGroup),
        done: function(error, obj) {
          let patientCode = "";
          let josn = JSON.parse(sessionStorage.getItem("updateInfo"));
          if (!error) {
            for (let key in obj.accounts) {
              if (obj.accounts[key] != doctor) {
                patientCode = obj.accounts[key];
              }
            }
            let updateObj = {
              groupChatId: obj.team.teamId,
              doctorCode: doctor,
              patientCode: patientCode,
              inquiryNumber: josn.inquiryNumber
            };
            updateInquiry(updateObj).then(res => {
              if (res.code != 0) {
                _this.$message.error(rea.msg);
              }
            });
            // _this.openChatwindow(obj);
            _this.teamGroup.teamid = obj.team.teamId;
            _this.teamGroup.teamName = obj.team.name;
            _this.teamGroup.accountArr = obj.team.accounts;
          }
        }
      });
      _this.doctorVisible = false;
    },
    // 根据群成员id、群id获取群成员信息
    getMemberTeam() {
      window.nim.getTeamMemberByTeamIdAndAccount({
        teamId: 123,
        account: "abc",
        done: getTeamMemberDone
      });
      function getTeamMemberDone(error, obj) {
        console.log(error);
        console.log(obj);
        console.log("获取群成员" + (!error ? "成功" : "失败"));
        if (!error) {
          onTeamMember(obj);
        }
      }
    },
    // 群聊中的多人视频聊天
    threePchat() {
      let _this = this;
      _this.myNetCall.callingMany();
    },
    // 离开房间
    leaveRoom() {
      let _this = this;
      _this.$refs.susp.style.display = "block";
      _this.callTimerMany = setTimeout(function() {
        _this.$refs.susp.style.display = "none";
      }, 300000);
      _this.myNetCall.leaveRoom();
    },
    // 获取医生标识
    getdoctorSign(sign) {
      let _this = this;
      if (sign == 1) {
      } else {
        findDoctor({ doctorCode: sign }).then(res => {
          _this.$set(_this, "sign", res.value[0]);
        });
      }
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
    closeall() {
      let _this = this;
      _this.closeUI("nc_connecting", "close"); //视频连接
      _this.closeUI("nc_talkingVodeo", "close"); //对话界面
      _this.closeUI("nc_acceptVodeo", "close"); //被叫话界面
      _this.closeUI("nc", "close"); //视频框
    },
    closeAllUIMany() {
      let _this = this;
      _this.closeUI("nc_memberList", "close"); //视频连接
      _this.closeUI("nc_talkingMany", "close"); //对话界面
      _this.closeUI("nc_acceptMany", "close"); //被叫话界面
      _this.closeUI("nc", "close"); //视频框
    },
    closeUI(ref, state) {
      //显示与隐藏
      let _this = this;
      if (_this.$refs[ref] == undefined) {
        console.log("UI不存在");
        return false;
      }
      if (state == "open") {
        _this.$refs[ref].style.display = "block";
      } else if (state == "close") {
        _this.$refs[ref].style.display = "none";
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
    telOn() {
      //Netcall 打视频电话
      let _this = this;
      _this.closeUI("nc", "open"); //打开视频框
      _this.closeUI("nc_connecting", "open"); //打开视频连接
      _this.myNetCall.calling(_this.talker, "", "p2p", 1); //拨通电话
    },
    // 打语音通话
    voice() {
      let _this = this;
      _this.closeUI("nc", "open"); //打开视频框
      _this.closeUI("nc_connecting", "open"); //打开视频连接
      _this.myNetCall.calling(_this.talker, "", "p2p", 2); //拨通语音
    },
    telSuccess() {
      //接电话
      let _this = this;
      _this.closeAllUI();
      _this.closeUI("nc", "open"); //打开视频框
      _this.closeUI("nc_talking", "open"); //打开视频连接

      _this.myNetCall.acceptCall();
    },
    // 语音通话连接成功
    telvoiceSuccess() {
      let _this = this;
      _this.closeall();
      _this.closeUI("nc", "open"); //打开视频框
      _this.closeUI("nc_talkingVodeo", "open"); //打开视频连接
      _this.myNetCall.acceptCall();
    },
    // 多人视频-关掉电话
    telManyRefuse() {
      let _this = this;
      _this.closeAllUIMany();
    },
    // 退出之后继续加入房间
    continueJoin() {
      let _this = this;
      _this.closeUI("nc", "open"); //打开多人视频框
      _this.closeUI("nc_talkingMany", "open"); //打开多人视频连接
      _this.myNetCall.joinRoom(_this.customsysmsg);
    },
    telManySuccess() {
      let _this = this;
      _this.closeUI("nc", "open"); //打开多人视频框
      _this.closeAllUIMany();
      // _this.closeUI("nc_acceptMany","close")
      _this.closeUI("nc_talkingMany", "open"); //打开多人视频连接

      clearTimeout(_this.callTimerMany);
      _this.myNetCall.joinRoom(_this.customsysmsg);
    },
    // nc_acceptMany
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
    // 发送就诊结束的tip消息
    successTip() {
      let _this = this;
      window.nim.sendTipMsg({
        scene: _this.nim.activeTalker.scene,
        to: _this.nim.activeTalker.to,
        custom: "{key:end,value:咨询结束}",
        tip: "咨询结束",
        done: function(error, obj) {}
      });
    },
    // 解散群组
    dissTeam() {
      var _this = this;
      var list = _this.nim.activeTalker;
      var teamId = _this.teamSroom.teamId;
      window.nim.dismissTeam({
        teamId: teamId,
        done: function(error, obj) {
          console.log(error);
          console.log(obj);
          console.log("解散群" + (!error ? "成功" : "失败"));
          if (!error) {
          }
        }
      });
    },
    init() {
      let boxl = document.getElementById("bl");
      let boxlTitle = document.getElementById("bl-title");
      let boxlFriend = document.getElementById("bl-friend");
      this.connectSDK(); //连接IM SDK
      // boxlFriend.style.height =
      //   boxl.clientHeight - boxlTitle.clientHeight + "px";
      // console.log(boxlFriend.clientHeight);
    },
    connectSDK() {
      //连接IM SDK
      let _this = this;
      // let nim = JSON.parse(sessionStorage.getItem("getInfo"));
      let nim = _this.$store.state.user.dataUser;
      if (nim.id == 1) {
      } else {
        window.nim = SDK.NIM.getInstance({
          appKey: _this.$config.appkey,
          account: nim.wangyiName,
          token: nim.wangyiPassword,
          debug: true,
          isRoamingable: true,
          needMsgReceipt: true,
          needReconnect: true, //是否需要重连接
          onconnect: function(optional) {
            console.log("SDK 连接成功");
            console.log(optional);
          },

          onteams: function(teams) {
            _this.$set(_this, "teamCustom", teams);
          },
          onmyinfo: function(user) {
            //获取IM 医生信息
            _this.$set(_this.nim, "doctorInfo", user);
            _this.$nextTick(function() {
              _this.loading.doctorInfo = false; //loading
            });
          },
          onmsg: function(msg) {
            if (_this.hide.Rcontent) {
              _this.handleGetMsg();
            }
            console.log("收到消息", msg.scene, msg.type, msg);
          },
          oncustomsysmsg: function(sysMsg) {
            if (sysMsg.type == "custom" && sysMsg.status == "success") {
              _this.$set(_this, "customsysmsg", sysMsg);
              _this.closeUI("nc_acceptMany", "close");
              _this.closeUI("nc", "open");
              _this.closeUI("nc_acceptMany", "open");
              _this.$bus.emit("contactUsesr", 1);
              if (_this.hide.Rcontent == false) {
                _this.hide.Rcontent = true;
                _this.hide.userinfoContent = true;
                _this.$bus.emit("rcontent", 935);
              }
              _this.clears();
              _this.getUseInfo(sysMsg.from, function(val) {
                _this.$set(_this, "accepter", val);
              });
            }
          },
          onsessions: function(sessions) {
            //获取最近会话  本地获取  提取好友列表
            //注意 此方法只执行一次
            _this.nim.session = window.nim.mergeSessions(
              _this.nim.session,
              sessions
            );
            _this.mergeFriend(); //通过nim.session提取好友
          },
          onupdatesession: function(sessions) {
            _this.nim.session = window.nim.mergeSessions(
              _this.nim.session,
              sessions
            );
            _this.mergeFriend(); //通过nim.session提取好友
          },
          onsyncdone: function() {
            //初始化完成
            console.log("im 加载完成");

            //初始化Netcall，此功能必须等IM初始化完成方可初始化
            //将本页实例传入
            _this.myNetCall.initNetCall(_this);

            _this.$emit("talkLoading", true);
          }
        });
      }
    },
    mergeFriend() {
      //nim.session 中提取好友
      let _this = this;

      if (_this.nim.session.length == 0) {
        return false;
      }
      var list = _this.nim.session;

      for (var item in _this.nim.session) {
        if (_this.nim.session[item].scene === "team") {
          if (_this.nim.session[item].lastMsg.type === "notification") {
            if (_this.nim.session[item].lastMsg.hasOwnProperty("attach"))
              if (
                _this.nim.session[item].lastMsg.attach.type === "dismissTeam"
              ) {
                _this.delLocalsession(_this.nim.session[item]);
                _this.nim.session.splice(item, 1);
              }
          }
          if (_this.nim.session[item].lastMsg.tip === "咨询结束") {
            _this.delLocalsession(_this.nim.session[item]);
            _this.nim.session.splice(item, 1);
          }
        } else if (_this.nim.session[item].scene === "p2p") {
          if (_this.nim.session[item].lastMsg.tip === "咨询结束") {
            _this.delLocalsession(_this.nim.session[item]);
            _this.nim.session.splice(item, 1);
          }
          if (_this.nim.session[item].lastMsg.tip === "会话转移") {
            _this.delLocalsession(_this.nim.session[item]);
            _this.nim.session.splice(item, 1);
          }
        }
      }

      // if (_this.nim.session[i].lastMsg.type == "notification") {
      //   if (_this.nim.session[i].lastMsg.attach.type == "dismissTeam") {
      //     _this.nim.session.splice(i, 1);
      //   }
      // }

      // for(_this.nim.session.le)

      //清空好友列表
      _this.$set(_this.nim, "friends", []);

      for (let i = 0; i < _this.nim.session.length; i++) {
        // 获取未读数
        let notread = "";
        notread += _this.nim.session[i].unread;
        _this.$bus.emit("unread", notread);
        // 					if (_this.nim.session[i].lastMsg.type == "notification") {
        // 					} else {
        // 						_this.nim.friends.push(_this.nim.session[i]);
        // 					}
        (function(that) {
          that.getUseInfo(_this.nim.session[i].lastMsg.target, function(users) {
            _this.$set(_this.nim.session[i], "userinfo", users);
            // let user=users.hasOwnProperty("avatar")
            if (!users.hasOwnProperty("avatar")) {
              let nim = _this.nim.session[i];
              _this.$set(
                _this.nim.session[i].userinfo,
                "avatar",
                "../../../../static/im/user_head.png"
              );
            }
            if (_this.nim.session[i].scene == "team") {
              window.nim.getTeam({
                teamId: _this.nim.session[i].to,
                done: function(error, obj) {
                  if (!error) {
                    _this.$set(_this.nim.session[i], "custom", obj.name);
                    console.log(obj);
                    console.log("获取群" + (!error ? "成功" : "失败"));
                  }
                }
              });
            } else if (_this.nim.session[i].scene == "p2p") {
              _this.$set(_this.nim.session[i], "custom", users.nick);
            }
            _this.$nextTick(function() {
              that.nim.friends.push(_this.nim.session[i]);
              var list = that.nim.friends;
            });
          });
        })(_this);
      }
      // _this.loading.friendList = false;
    },
    // 视频通话
    tellonOther() {
      let _this = this;
      _this.telOn();
    },
    handleSelectFirend(val) {
      //选择某个好友时
      let _this = this;
      _this.$set(_this.nim, "activeTalker", val);

      console.log(val);

      if (val.scene == "p2p") {
        window.nim.setCurrSession(val.id); //重置当前会话
        _this.patient.headerImg = val.userinfo.avatar;
        _this.patient.userName = val.userinfo.nick;
        // 工具的显示隐藏
        _this.hide.addDoctor = true;
        _this.hide.telOn = true;
        _this.hide.threePchat = false;
        var health = JSON.parse(sessionStorage.getItem("getInfo"));
        var objCode = {
          healthAssistantCode: health.id,
          patientCode: val.userinfo.account
        };
        _this.patient.userName = val.userinfo.nick;
        getUserIngInquiry(objCode).then(res => {
          if (res.value != null) {
            _this.$bus.emit("record", { value: res.value, Vue: _this });
            sessionStorage.setItem("updateInfo", JSON.stringify(res.value));
            _this.$set(_this, "dialog", res.value);
            _this.hide.userinfoContent = true;
            _this.hide.Rcontent = true;
            _this.$bus.emit("rcontent", 930);
          } else if (res.vlue == null) {
            _this.hide.Rcontent = true;
            _this.$bus.emit("rcontent", 570);
            _this.hide.userinfoContent = false;
          }
        });
        objCode = {}; //清空对象
        // _this.hide.userinfoContent = true;
        // _this.hide.Rcontent = true;
        // _this.$bus.emit("rcontent", 930);

        // 对方信息
        _this.talker.to = val.to;
        // _this.talker.avatar = val.userinfo.avatar;
        // _this.talker.nick=val.userinfo.nick
        _this.$set(_this, "talker", val.userinfo);

        _this.otherGroup.push({
          account: val.userinfo.account,
          nick: val.userinfo.nick,
          avatar: val.userinfo.avatar
        });
      } else if (val.scene == "team") {
        // 工具的显示隐藏
        _this.hide.telOn = false;
        _this.hide.addDoctor = false;
        _this.hide.threePchat = true;
        window.nim.setCurrSession(val.id); //重置当前会话
        _this.hide.userinfoContent = true;
        _this.hide.Rcontent = true;
        _this.$bus.emit("rcontent", 930);
        // 获取群消息
        window.nim.getTeam({
          teamId: val.lastMsg.target,
          done: getTeamDone
        });
        function getTeamDone(error, obj) {
          if (!error) {
            _this.patient.headerImg = obj.avatar;
            _this.patient.userName = obj.name;
          }
          console.log(error);
          console.log(obj);
          console.log("获取群" + (!error ? "成功" : "失败"));
        }

        for (let item of _this.teamCustom) {
          if (val.to == item.teamId) {
            _this.$set(_this.teamSroom, "teamAll", item.custom);
            _this.$set(_this.teamSroom, "name", item.name);
            _this.$set(_this.teamSroom, "teamId", item.teamId);
            _this.findTeam(item.custom);
          }
        }
      }

      _this.to = val.to;

      // _this.$refs.Rcontent.display="block"

      // _this.dissTeam();
      //加载活动人员的聊天内容
      _this.handleGetMsg();
    },
    // 遍历某个群中的医生、患者、助理
    findTeam(teams) {
      let _this = this;
      var teams = JSON.parse(teams);
      for (let i = 0; i < teams.length; i++) {
        findDoctor({ doctorCode: teams[i].account }).then(res => {
          if (res.code == 0) {
            if (res.value.length != 0) {
              var list = res.value[0].roleCode;
              if (list == "f458a20b767e42ba97816983423c9fd7") {
                _this.lists.healthAssistantCode = teams[i].account;
              } else if (list == "69c8fe312e794640baee369542756f42") {
                _this.lists.doctorCode = teams[i].account;
              }
            } else {
              _this.lists.patientCode = teams[i].account;
            }
          }
        });
      }
      console.log(_this.lists) +
        _this.$nextTick(function() {
          setTimeout(() => {
            getUserIngInquiry(_this.lists).then(res => {
              if (res.code == 0) {
                _this.$set(_this, "dialog", res.value);
                sessionStorage.setItem("Inquiry", res.value);
              }
              _this.$bus.emit("record", { value: res.value, Vue: _this });
            });
          }, 800);
        });
    },

    handleGetMsg() {
      //获取聊天记录
      let _this = this;
      console.log(_this.nim.activeTalker);
      window.nim.getLocalMsgs({
        sessionId: _this.nim.activeTalker.id,
        limit: 100,
        done: function(error, obj) {
          console.log(obj);
          _this.handleGetChat(obj);
        }
      });
    },
    handleGetChat(msg) {
      //获取聊天内容
      //msg:{limitlimit: 100,msgs:[N条消息],sessionId:""}
      let _this = this;

      if (msg.msgs.length == 0) {
        console.log("暂无聊天信息");
      }

      //清空聊天列表
      _this.$set(_this.nim, "chat", []);

      _this.$nextTick(function() {
        for (let i = 0; i < msg.msgs.length; i++) {
          let tempMsg = msg.msgs[msg.msgs.length - i - 1];
          // if (tempMsg.type == "notification") {
          //   continue;
          // }
          // if (tempMsg.scene == "team") {
          //   for (var item of _this.teamCustom) {
          //     if (tempMsg.target == item.teamId) {
          //       var list = JSON.parse(item.custom);
          //       for (var key of list) {
          //         if (tempMsg.from == key.account) {
          //           tempMsg.custom = key;
          //         }
          //       }
          //     }
          //   }
          // }
          if (tempMsg.scene == "p2p") {
            window.nim.getUser({
              account: tempMsg.target,
              done: function(error, user) {
                if (!user.hasOwnProperty("avatar")) {
                  _this.$set(
                    user,
                    "avatar",
                    "../../../../static/im/user_head.png"
                  );
                }
                tempMsg.custom = user;
              }
            });
          } else if (tempMsg.scene == "team") {
            for (var item of _this.teamCustom) {
              if (tempMsg.target == item.teamId) {
                var list = JSON.parse(item.custom);
                for (var key of list) {
                  if (tempMsg.from == key.account) {
                    tempMsg.custom = key;
                  }
                }
              }
            }
          }
          _this.nim.chat.push(tempMsg);
        }

        _this.$nextTick(function() {
          //消息滚动底部
          setTimeout(() => {
            _this.handleScrollToBottom();
          }, 1000);
        });
      });
    },
    handleScrollToBottom() {
      let msgContent = document.getElementById("msg-box");
      msgContent.scrollTo(0, msgContent.scrollHeight);
    },
    handlePushMsg(msg) {
      //增加一条消息
      let _this = this;
      if (!_this.page.isNull(msg.lastMsg)) {
        _this.nim.chat.push(msg.lastMsg);
      } else {
        _this.nim.chat.push(msg);
      }
      _this.handleUpdateFriends(msg);
    },
    handleUpdateFriends(msg) {
      //更新好友列表
      let _this = this;

      for (let i in _this.nim.friends) {
        if (_this.nim.activeTalker.id == _this.nim.friends[i].id) {
          _this.nim.friends.splice(i, 1, msg);
          break;
        }
      }
      _this.$nextTick(function() {
        _this.handleScrollToBottom();
      });
    },
    checkEnter(e) {
      let _this = this;

      let et = e || window.event;
      let keycode = et.charCode || et.keyCode;
      if (13 == e.keyCode && e.ctrlKey) {
        _this.nim.sendText += "\n";
      } else if (e.keyCode == 13) {
        _this.handleSendMsg(); //提交的执行函数
        e.preventDefault(); //禁止回车的默认换行
      }
    },
    handleSendMsg() {
      //发送消息
      let _this = this;

      if (_this.page.isNull(_this.nim.activeTalker.to)) {
        _this.com.showNotice({
          title: "错误",
          type: "error",
          message: "未选取用户"
        });
        return false;
      }
      //消息内容必须除空格
      let txt = _this.nim.sendText;
      txt = txt.replace(/(^\s*)|(\s*$)/g, ""); //去空格
      txt = txt.replace(/<[^>]+>|&[^>]+;/g, ""); //去标签
      txt = txt.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
      txt = txt.replace(/&npsp;/gi, ""); //去掉npsp

      if (_this.page.isNull(txt)) {
        _this.$message.error("不可以发送空消息!");
        return false;
      }

      //设置当前用户聊天记录

      window.nim.sendText({
        scene: _this.nim.activeTalker.scene,
        to: _this.nim.activeTalker.to,
        text: txt,
        done: function(error, msg) {
          if (!error) {
            let tempMsg = {
              id: msg.sessionId,
              lastMsg: msg
            };
            _this.handlePushMsg(tempMsg);
            _this.nim.sendText = "";
          } else {
            console.log(
              "发送" +
                msg.scene +
                " " +
                msg.type +
                "消息" +
                (!error ? "成功" : "失败") +
                ", id=" +
                msg.idClient
            );
          }
        }
      });
      _this.$nextTick(function() {
        // //消息滚动底部
        _this.handleScrollToBottom();
      });
    },
    handleSendFileMsg() {
      //发送消息
      let _this = this;

      if (_this.page.isNull(_this.nim.activeTalker.to)) {
        _this.com.showNotice({
          title: "错误",
          type: "error",
          message: "未选取用户"
        });
        return false;
      }

      //设置当前用户聊天记录
      let member = {
        CurrentMember: _this.nim.activeFriend.CurrentMember,
        CurrentMemberCode: _this.nim.activeFriend.CurrentMemberCode
      };
      let cus = {
        RemoteExtension: JSON.stringify(member)
      };
      window.nim.sendFile({
        scene: _this.nim.activeTalker.scene,
        to: _this.nim.activeTalker.to,
        type: "image",
        fileInput: document.getElementById("file1"),
        fastPass: '{"w":200,"h":110,"md5":"xxxxxxxxx"}',
        beginupload: function(upload) {
          // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
          // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
        },
        uploadprogress: function(obj) {
          console.log("文件总大小: " + obj.total + "bytes");
          console.log("已经上传的大小: " + obj.loaded + "bytes");
          console.log("上传进度: " + obj.percentage);
          console.log("上传进度文本: " + obj.percentageText);
        },
        uploaddone: function(error, file) {
          console.log(error);
          console.log(file);
          console.log("上传" + (!error ? "成功" : "失败"));
        },
        beforesend: function(msg) {
          console.log("正在发送p2p image消息, id=" + msg.idClient);
          let tempMsg = {
            id: msg.sessionId,
            lastMsg: msg
          };
          _this.handlePushMsg(tempMsg);
        },
        done: function() {
          console.log("完成上传");
        }
      });
    },
    getUseInfo(userCount, callback) {
      //获取单条用户信息
      let _this = this;
      if (_this.page.isNull(userCount)) {
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
    }
    // addFriend() {
    //   //新增
    //   let _this = this;
    //   for (var i in _this.nim.friends) {
    //     if (i == parseInt(_this.test.no)) {
    //       _this.nim.friends.splice(i, 1);
    //       break;
    //     }
    //   }
    //   _this.$nextTick(function() {
    //     _this.nim.friends.unshift(a);
    //   });
    // }
    // findFriend() {
    // 	//查找好友
    // 	let _this = this;

    // 	if (_this.test.no == "") {
    // 		return false;
    // 	}

    // 	for (var i in _this.nim.friends) {
    // 		if (_this.nim.friends[i].nick.indexOf(_this.test.no) > -1) {
    // 			let myref = "friend" + _this.nim.friends[i].id;
    // 			if (_this.$refs[myref].length != 0) {
    // 				let temp = _this.$refs[myref][0];
    // 				let myFL = document.getElementById("fl");
    // 				myFL.scrollTo(0, temp.offsetTop);
    // 			}
    // 			break;
    // 		}
    // 	}
    // },
  },
  created() {},
  mounted() {
    let _this = this;
    _this.$bus.on("sendTip", res => {
      _this.visitUser(res);
    });
    //监听IM初始化
    _this.$bus.on("init", val => {
      //初始化Im
      setTimeout(() => {
        _this.getSign = JSON.parse(sessionStorage.getItem("getInfo"));
        if (_this.getSign != undefined) {
          _this.getdoctorSign(_this.getSign.id);
          _this.init();
        }
      }, 1000);
    });
    // if ((_this.com.isNull(_this.$route.params.wId)) || (_this.com.isNull(_this.$route.params.wPd))) {
    // 	_this.nimData.account = _this.$store.state.userInfo.wangyiName; //用户名
    // 	_this.nimData.token = _this.$store.state.userInfo.wangyiPassword; //用户名
    // } else {
    // 	_this.nimData.account = _this.$route.params.wId; //用户名
    // 	_this.nimData.token = _this.$route.params.wPd; //密码
    // }

    //注册鼠标滚动事件
    //elm:绑定的DOM(父元素)
    //direction:滚动方向
    // _this.page.registerMouseWheel({
    // 	elm: "fm",
    // 	direction: "horizontal"
    // })
  },
  beforeDestroy() {
    let _this = this;
  },
  destroyed() {
    let _this = this;
  }
};
</script>

<style scoped>
.item {
  position: absolute;
  right: 0;
  top: 37px;
}
.classtip {
  width: 30%;
  height: 22px;
  border: 1px solid #56c8ac;
  margin: 12px auto;
  line-height: 22px;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  background: #56c8ac;
}
/* 悬浮窗 */
.suspension {
  position: absolute;
  right: 0;
  top: 82px;
  width: 100%;
  height: 40px;
  z-index: 200;
  line-height: 40px;
  text-align: center;
  color: #000;
  background: #fff;
  cursor: pointer;
  display: none;
}
.suspension > img {
  position: absolute;
  left: 0px;
  margin: 5px 12px;
}
.suspension > span {
  position: absolute;
  left: 53px;
}
.suifang >>> .el-form-item__label {
  text-align: left;
}
.suifang >>> .el-dialog__body {
  padding-top: 0;
}
.electronicPrescription > :first-child {
  text-align: center;
}
.electronicPrescription {
  padding-top: 50px;
}
.PrescriptionHead {
  border-top: 1px solid #ccc;
  /* border-bottom: 1px dashed #ccc; */
}

.PrescriptionHead >>> .el-date-editor.el-input {
  width: 145px;
}
.baseData >>> .el-input__inner {
  border: none;
}
.baseData {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.inputstle {
  width: 50%;
  border-bottom: 1px solid;
}
.primaryDiagnosis {
  padding-bottom: 15px;
  border-bottom: 2px solid black;
}
.drygNumber {
  border-bottom: 1px solid #ccc;
}
.counter >>> .el-input-number__decrease {
  background-color: #ffffff;
}
.counter >>> .el-input-number__increase {
  background-color: #ffffff;
}
.counter >>> .el-input-number {
  width: 120px;
}
.drug {
  line-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Medication_compliance >>> .el-input {
  width: 70%;
}
#signature {
  padding-top: 10px;
}
#signature img {
  display: inline-block;
  width: 135px;
  vertical-align: middle;
  text-align: right;
  background-color: black;
}
.comfirm {
  text-align: center;
  padding-top: 20px;
}
.doctor {
  /* border-top: 2px solid black; */
  margin-top: 15px;
}
.choiceDrg {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}
.font_size {
  font-size: 12px;
}
.padding {
  padding: 5px 0;
}
.instructions {
  color: rgb(63, 81, 181);
}
.comfimButton {
  margin-top: 15px;
  text-align: center;
}
.allDialog >>> .el-dialog {
  /* height: 100%; */
  /* overflow-y: auto  ; */
  /* border: 1px solid red */
}
.allDialog >>> .el-dialog__body {
  /* height: 100%; */
  /* overflow-y: auto */
}
.choiceDrug {
  padding: 50px 10px 10px 10px;
  height: 600px;
  overflow-y: auto;
}
.instructionsUrl >>> .el-dialog__body {
  height: 70vh;
}

.team {
  display: inline-block;
  border: 1px solid red;
  width: 100%;
}
/* 多人视频-呼叫 */
.member-list {
  position: absolute;
  top: 25%;
  left: 45%;
  margin-left: -300px;
  margin-top: -100px;
  width: 700px;
  height: 590px;
  background: #888;
  border-radius: 4px;
  z-index: 2900;
  z-index: 99999999;
  display: none;
}
.member-list .video {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.member-list .myvideo {
  width: 100%;
  display: flex;
  justify-content: center;
}
.member-list > .box-foot1 {
  position: absolute;
  bottom: 0;
  left: 40%;
}
.memberVideo {
  width: 230px;
  height: 230px;
  margin: 12px;
  position: relative;
}
.fontLive {
  position: absolute;
  top: 125px;
  left: 76px;
  font-size: 26px;
  color: #fff;
  display: none;
  opacity: 0.6;
}
.allvideo {
  display: flex;
  justify-content: space-around;
  height: 320px;
}
.allvideo .el-icon-rank {
  z-index: 200;
  font-size: 32px;
  position: absolute;
  top: 0px;
  right: 0px;
  display: none;
}
.myvideo1 {
  margin: 12px;
  width: 310px;
  height: 250px;
}
.memberVideo .pleaseImg {
  position: absolute;
  width: 230px;
  height: 230px;
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
  background: #26a738 !important;
  color: #fff !important;
}

/* 视频盒子 */
.im-netcall {
  position: position;
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
  border-bottom: 1px solid #e4e4e4;
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
.im-netcall .tips {
  color: #999999;
  font-size: 12px;
}
.im-netcall .box-foot {
  padding: 20px 30px;
  text-align: right;
}

/* 主叫与被叫界面 end */

/* 连接界面 */
.im-netcall .talking-box1 {
  position: absolute;
  top: 70%;
  left: 60%;
  width: 500px;
  height: 300px;
  margin-left: -400px;
  margin-top: -300px;
  color: #000;
  border-radius: 4px;
  background: #999;
  z-index: 2200;
  display: none;
}
.im-netcall .talking-box1 .box-head {
  position: relative;
  height: 100px;
  width: 100%;
  z-index: 2210;
}
.im-netcall .talking-box1 .talking-foot {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  text-align: center;
  z-index: 2202;
}
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
  cursor: pointer;
}

.el-icon-video-camera,
.el-icon-user,
.el-icon-video-play,
.el-icon-refresh,
.el-icon-phone-outline {
  font-size: 26px;
  vertical-align: middle;
  color: #a5a5a5;
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
.im-panel {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #0086b3;
}

.box-l {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  border-right: 1px solid #ddd;
  background: #f2f2f2;
}

/* 左侧头部 */
.box-l .box-title {
  min-height: 80px;
  border-bottom: 1px solid #cacbce;
}

/* 左侧 医生信息 头像 名称 等 */
.box-l .box-title .doctor {
  float: left;
  width: 200px;
  margin-top: 20px;
  cursor: pointer;
  position: relative;
}

.box-l .box-title .doctor-head {
  display: inline-block;
  margin: 15px 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.box-l .box-title .el-tag {
  position: absolute;
  top: 10px;
  left: 60px;
  color: #fff;
  border-radius: 8px;
  padding: 0 5px;
  font-size: 12px;
}
.box-l .box-title .department {
  position: absolute;
  color: #9d9d9d;
  top: 36px;
}
.box-l .box-title .department > span:nth-child(2) {
  display: inline-block;
  height: 6px;
  width: 6px;
  background: #56c8ac;
  border-radius: 50%;
  margin: 0 5px;
}
.box-l .box-title .doctor-name {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  width: 60px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-l .box-title .doctor-hospatil-name {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 好友区域 */
.box-l .box-friend {
}

.box-l .friends-list {
  position: absolute;
  width: 100%;
  /* height: inherit; */
  height: 593px;
  overflow: auto;
  list-style: none;
}
.box-l .friends-list > li:hover {
  background: #ddd;
}
.box-l .friends-list > li:visited {
  background: #777;
}
.box-l .no-friend {
  color: red;
  font-size: 12px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

/* 好友项 */
.box-l .friends-list .friend {
  min-height: 60px;
  border-bottom: 1px solid #ccc;
  position: relative;
  padding: 5px 0;
  cursor: pointer;
}

.box-l .friends-list .friend:last-child {
  border-bottom: none;
}

/* 好友列表 左侧 头像*/
.box-l .friends-list .list-avatar {
  width: 60px;
  height: 60px;
  float: left;
}

.box-l .friends-list .list-avatar .head {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 40px;
  border-radius: 50%;
  width: 40px;
}

/* 好友列表 右侧 留言 时间 */
.box-l .friends-list .list-info {
  margin-left: 60px;
}
/* .list-info>>>.el-badge__content.is-fixed{
		top:13px;
	} */
.box-l .friends-list .list-info .name {
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  font-size: 14px;
  color: #292b37;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-l .friends-list .list-info .msg {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #a5a6aa;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.box-l .friends-list .list-info .time {
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 12px;
  color: #cbccce;
}

.box-r {
  position: absolute;
  top: 0;
  right: 0;
  left: 300px;
  height: 100%;
  width: 570px;
  background: #f2f2f2;
  z-index: 700;
  /* display: none */
}

.box-r .r-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #cacbce;
  z-index: 200;
}

#j-addDoctor {
  height: 600px;
  overflow: auto;
}

.tools >>> .el-button {
  padding: 0px 3px;
  border-color: #f2f2f2;
  background: #f2f2f2;
}
.content-left {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.j-doctorChat {
  display: flex;
  justify-content: space-between;
  line-height: normal;
  border-bottom: 1px solid #dddddd;
  padding: 15px 0px;
  font-size: 14px;
}
.left-img {
  width: 50px;
  height: 50px;
  border: 1px solid dimgrey;
  margin-top: 7px;
}
.left-img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: 0px 0px;
  vertical-align: middle;
}
.rightBtn {
  margin-top: 20px;
  line-height: 25px;
}

.box-r .r-title .patient-name {
  float: left;
  max-width: 200px;
  height: 80px;
  line-height: 80px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  padding-left: 15px;
  cursor: pointer;
  margin-right: 15px;
}

.box-r .r-title .patient-family {
  float: left;
  width: 150px;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
}

/* 家庭信息 */
.box-r .r-title .patient-family .family-member {
  display: block;
  overflow: hidden;
  white-space: nowrap;
}

.box-r .r-title .patient-family .member {
  cursor: pointer;
}

.box-r .r-title .patient-family li {
  width: 40px;
  height: 60px;
  display: inline-block;
  margin-right: 15px;
}

/* 家庭信息 头像 */
.box-r .r-title .patient-family .avatar {
  width: 100%;
  border-radius: 50%;
}

/* 家庭信息 姓名 */
.box-r .r-title .patient-family .name {
  text-align: center;
  cursor: pointer;
}

.box-r .r-title .patient-more {
  position: absolute;
  left: 10px;
  top: 0;
  font-size: 14px;
  font-weight: 800;
  height: 80px;
  line-height: 80px;
  cursor: pointer;
}
.box-r .patient-more > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.box-r .patient-more > span {
  padding-left: 15px;
}
.box-r .r-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  z-index: 100;
}

.box-r .r-content .msg-panel {
  position: relative;
  /* height: 100%; */
  height: 450px;
  width: 100%;
  /* padding-bottom: 120px; */
  background: #f2f2f2;
  /* padding: 5px 5px 155px 5px; */
  overflow-y: auto;
}

.box-r .r-content .msg-panel .chat-list {
  padding: 4px 10px 10px 10px;
  position: relative;
  margin-bottom: 15px;
}

.box-r .r-content .msg-panel .chat-list .chat-avatar {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #26a738;
}

.box-r .r-content .msg-panel .chat-list .chat-avatar-r {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #26a738;
}

.box-r .r-content .msg-panel .chat-list .chat-msg {
  float: left;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 60%;
  line-height: 25px;
  font-size: 14px;
  color: #333333;
  background: #fff;
  padding: 8px;
  border-radius: 0 10px 10px 10px;
  word-wrap: break-word;
}

.box-r .r-content .msg-panel .chat-list .chat-msg-r {
  float: right;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 60%;
  line-height: 25px;
  font-size: 14px;
  color: #fff;
  background: #26a738;
  padding: 8px;
  border-radius: 10px 0 10px 10px;
  word-wrap: break-word;
}

.box-r .r-content .msg-panel .chat-list .chat-msg-img {
  width: 100%;
  height: 100%;
}

.bigbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  z-index: 100;
}

.bigbox .msg-panel {
  position: relative;
  /* height: 100%; */
  width: 100%;
  /* padding-bottom: 120px; */
  background: #f2f2f2;
  /* padding: 5px 5px 155px 5px; */
  overflow-y: auto;
}

.bigbox .msg-panel .chat-list {
  padding: 4px 10px 10px 10px;
  position: relative;
  margin-bottom: 15px;
}

.bigbox .msg-panel .chat-list .chat-avatar {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #26a738;
}

.bigbox .msg-panel .chat-list .chat-avatar-r {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #26a738;
}

.bigbox .msg-panel .chat-list .chat-msg {
  float: left;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 60%;
  line-height: 25px;
  font-size: 14px;
  color: #333333;
  background: #fff;
  padding: 8px;
  border-radius: 0 10px 10px 10px;
  word-wrap: break-word;
}

.bigbox .msg-panel .chat-list .chat-msg-r {
  float: right;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 60%;
  line-height: 25px;
  font-size: 14px;
  color: #fff;
  background: #26a738;
  padding: 8px;
  border-radius: 10px 0 10px 10px;
  word-wrap: break-word;
}

.bigbox.msg-panel .chat-list .chat-msg-img {
  width: 100%;
  height: 100%;
}

.box-r .msg-tool {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: #f2f2f2;
  z-index: 100;
  border-top: 1px solid #ccc;
}

.box-r .msg-tool .tools {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}

.box-r .msg-tool .tools div {
  float: left;
  margin-right: 15px;
  height: 20px;
  padding: 8px 0 0 8px;
}

.box-r .msg-tool .inputfile {
  display: none;
}

.box-r .msg-tool .msg {
  width: 100%;
}
.box-r .msg-tool .msg >>> .el-textarea__inner {
  background-color: #f2f2f2;
  border: none;
}
.box-r .msg-tool .ctrlEnter {
  position: absolute;
  right: 75px;
  bottom: 18px;
  color: #999999;
  font-size: 14px;
}
.box-r .msg-tool .btn-send {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.box-other {
  position: absolute;
  top: 0;
  right: 0;
  left: 300px;
  height: 100%;
  width: auto;
  background: #fff;
  z-index: 900;
}

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  box-sizing: border-box;
}
</style>
