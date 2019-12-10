<template>
  <div class="im-panel" v-loading="loading.doctorInfo">
    <div class="box-l" id="bl">
      <div class="box-title" id="bl-title">
        <img class="doctor doctor-head" :src="nim.doctorInfo.avatar" :title="nim.doctorInfo.nick" />
        <div class="doctor doctor-info">
          <span class="doctor-name" :title="nim.doctorInfo.nick">{{nim.doctorInfo.nick}}</span>
          <!-- <span class="doctor-hospatil-name" title="医院名称">医院名称</span> -->
          <el-tag size="mini" color="#56C8AC">{{sign.positionName}}</el-tag>
          <div class="department">
            <span>{{sign.departmentLevel1Name}}</span>
            <span></span>
            <span>{{sign.departmentLevel2Name}}</span>
          </div>
        </div>

        <div class="clear"></div>
        <div class="text-center">
          <!-- <a-input-search v-model="test.no" placeholder="input search text" style="width: 200px"  @search="addFriend" /> -->
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
                :src="item.userinfo==null||page.isNull(item.userinfo.avatar)?img.friendHead:item.userinfo.avatar"
              />
            </div>
            <div class="list-info">
              <div
                class="name"
              >{{page.isNull(item.lastMsg.fromNick)||item.lastMsg.scene!="team"?item.userinfo.nick:"accot"}}</div>
              <!-- <div class="name">{{page.isNull(item.lastMsg.fromNick)?item.userinfo.nick:item.lastMsg.fromNick}}</div> -->
              <div class="msg text-over" :title="item.lastMsg.text">
                <span v-if="item.lastMsg.type=='text'">{{item.lastMsg.text}}</span>
                <span v-else-if="item.lastMsg.type=='image' ">您有一条图片消息</span>
                <span v-else-if="item.lastMsg.type=='audio' ">您有一条语音消息</span>
                <span v-else-if="item.lastMsg.type=='notification'">视频通话</span>
                <span v-else-if="item.lastMsg.type=='tip'">{{item.lastMsg.tip}}</span>
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
      <div class="suspension" ref="susp" @click="continueJoin">加入</div>
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
            <!-- <div class="chat-msg" v-else-if="item.type=='notification'">
							通话时长
            </div>-->

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

          <el-button class="el-icon-video-camera" plain title="视频通话" @click="telOn"></el-button>

          <el-button class="el-icon-video-play" plain title="多人视频通话" @click="threePchat"></el-button>

          <el-button class="el-icon-user" plain title="将医生加入聊天" @click="addDoctor"></el-button>
           <el-button class="el-icon-delete" plain title="群退出" @click="dissTeam"></el-button>
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
      <div>
        <div class="patient-record">就诊记录</div>
        <div class="patient-img">
          <!-- <img id="id" :src="form.imgsrc" alt /> -->
        </div>
        <div class="parient-flex">
          <div>记录编号：{{newDoctor.inquiryNumber}}</div>
          <!-- <div>科室：{{form.department}}</div> -->
        </div>
        <div class="parient-flex">
          <div>患者：{{newDoctor.patientName}}</div>
          <div>年龄：{{newDoctor.patientAge}}</div>
        </div>
        <div class="parient-flex">
          <div>性别：{{newDoctor.patientSex | conplateSex}}</div>
          <div>就诊时间：{{newDoctor.inquiryTime}}</div>
        </div>
        <!-- <div class="axisLine"></div>
        <div class="parient-flexstart">
          <div>诊断：</div>
          <div style="width:210px">
            <input style="width:100%" v-model="recipt.diagnose" type="text" />
          </div>
        </div>-->

        <el-collapse v-model="activeNames" accordion>
          <div class="axisLine"></div>
          <el-collapse-item title="添加诊断" name="1">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="newDoctor.diagnosis"></el-input>
          </el-collapse-item>
          <div class="axisLine"></div>
          <el-collapse-item title="添加主诉" name="2">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="newDoctor.chiefComplaint"
            ></el-input>
          </el-collapse-item>
          <div class="axisLine"></div>
          <el-collapse-item title="添加现病史" name="3">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="newDoctor.currentMedicalHistory"
            ></el-input>
          </el-collapse-item>
          <div class="axisLine"></div>
          <el-collapse-item title="添加既往史" name="4">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="newDoctor.pastMedicalHistory"
            ></el-input>
          </el-collapse-item>
          <div class="axisLine"></div>
        </el-collapse>
        <div class="parient-flex">
          <div>处方</div>
          <el-button size="mini" @click="createChufang">创建处方</el-button>
        </div>
        <div class="axisLine"></div>

        <div class="parient-btn">
          <fieldset>
            <el-button size="mini" @click="createClinic">创建就诊记录</el-button>
            <el-button size="mini">预览</el-button>
            <el-button size="mini" @click="saveClinic">保存草稿</el-button>
          </fieldset>
        </div>
      </div>
    </div>

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
        <div class="video memberVideo" id="othervideoChat">
          <!-- <div class="memberVideo" v-for="(item,index) in video" :key="index" :id="item.account">
            <img class="pleaseImg" src="../../../../static/im/wating.gif" alt="">
          </div>-->
          <!-- <div > -->
          <!-- <img class="pleaseImg" src="../../../../static/im/wating.gif" alt=""> -->
          <!-- </div> -->
          <!-- <div class=""  v-for="(item,index) in video" :key="index" :id="item.account" >
            <img class="pleaseImg" src="../../../../static/im/wating.gif" alt="">
          </div>-->
        </div>
        <div class="myvideo" id="myvideoChat"></div>
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
    <!-- 电子处方 -->
    <el-dialog :before-close="closeDialog"
      class="allDialog"
      title="电子处方"
      :visible.sync="doctorVisible"
      :append-to-body="true"
      width="60%"
      style="height:90vh;"
    >
      <el-row class="PrescriptionHead" id="electronicPrescription">
        <el-col :md="16" :sm="16" :xs="16" class="electronicPrescription">
          <div>
            <h3>河南省第三人民医院</h3>
            <p style="letter-spacing: 19px;padding-left: 21px;border-bottom: 1px dashed #ccc;">电子处方筏</p>
          </div>

          <div class="baseData">
            <div>
              <span>姓名:</span>
              <el-input type="text" class="inputstle" v-model="newDoctor.patientName"></el-input>
            </div>
            <div>
              <span>性别:</span>
              <el-input type="text" class="inputstle" v-model="newDoctor.patientSex"></el-input>
            </div>
            <div>
              <span>年龄:</span>
              <el-input type="text" class="inputstle" v-model="newDoctor.patientAge"></el-input>
            </div>
          </div>
          <div class="baseData">
            <div>
              <span>科室/病区:</span>
              <el-input type="text" class="inputstle" v-model="newDoctor.departementName"></el-input>
            </div>
            <div>
              <span>开具日期:</span>
              <el-date-picker v-model="newDoctor.issueTime  " type="date" class="inputstle"></el-date-picker>
            </div>
          </div>
          <div class="primaryDiagnosis">
            <label>临床诊断</label>
            <span>{{newDoctor.diagnosis}}病毒性感冒【初步诊断】</span>
          </div>
          <b>R:</b>
          <div>
            <!-- <div
              v-for="(item, i) in newDoctor.bsPrescription.bsPrescriptionSchedules"
              :key="i"
              style="border-bottom: 1px dashed #ccc;padding:10px;"  >
              <el-row>
                <el-col :md="6" :sm="8" :xs="8" class="drug">
                  <span :title="item.drugsName">{{item.drugsName}}</span>
                </el-col>
                <el-col :md="8" :sm="8" :xs="8" class="counter">
                  <div style="padding-top:7px">
                    ×
                    <el-input-number
                      v-model="item.drugsAmount"
                      :min="1"
                      :max="30"
                      label="描述文字"
                      size="mini"
                    ></el-input-number>
                    <span>{{item.drugsRetailUnit}}</span>
                  </div>
                </el-col>
                <el-col :md="5" :sm="8" :xs="8">
                  <p style="text-align:center">{{item.drugsPrice}}元</p>
                </el-col>
                <el-col :md="3" :sm="8" :xs="8">
                  <i
                    class="el-icon-delete-solid"
                    title="删除当前行药品"
                    style=" ;padding-left: 40px;"
                    @click="deleteDrug(i)"
                  ></i>
                </el-col>
              </el-row>
              <el-row class="counter">
                <el-col :md="18" :sm="18" :xs="18">
                  <span>用量：</span>
                  每
                  <el-input-number
                    v-model="item.dosageDay"
                    :min="1"
                    :max="30"
                    @change="handleChange(i)"
                    label="描述文字"
                    size="mini"
                  ></el-input-number>日
                  <el-input-number
                    v-model="item.dosageTime"
                    :min="1"
                    @change="handleChange(i)"
                    :max="30"
                    label="描述文字"
                    size="mini"
                  ></el-input-number>次
                </el-col>
                <el-col :md="6" :sm="6" :xs="6" class="Medication_compliance">
                  <span>
                    每次
                    <el-input size="mini" v-model="item.dosageMini" @blur="handleChange(i)"></el-input>
                  </span>
                </el-col>
              </el-row>
              <el-row style="line-height:42px">
                <el-col :md="12" :sm="6" :xs="6" class="Medication_compliance">
                  <span>
                    用法
                    <el-input size="mini" placeholder="口服" v-model="item.drugsUsage"></el-input>
                  </span>
                </el-col>
              </el-row>
            </div> -->
          </div>

          <div style="padding-top:10px;">
            备注
            <el-input
              type="textarea"
              v-model="newDoctor.remark"
              rows="4"
              maxlength="50"
              placeholder="请输入少于50个字"
            ></el-input>
          </div>
          <div class="doctor">
            <el-row>
              <el-col :offset="13" :md="11" :sm="6" :xs="6" id="signature">
                <label>医生(签章)：</label>
                <img src="newDoctor.doctorSignatureUrl" alt />
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="15" :md="9" :sm="6" :xs="6" id="signature">
                <b>
                  金额：
                  <span>{{newDoctor.bsPrescription.totalAmount}}</span>元
                </b>
              </el-col>
            </el-row>
          </div>
          <div class="comfirm">
            <el-button size="medium" @click="doctorVisible=false">确认</el-button>
            <el-button size="medium" @click="doctorVisible=false">取消</el-button>
          </div>
        </el-col>
        <el-col :md="8" :sm="8" :xs="8" class="choiceDrug" id="add">
          <b>选择药品</b>
          <div class="choiceDrg">
            <el-input
              placeholder="药品名称"
              clearable
              @clear="clearCondition"
              size="mini"
              v-model="fineDrugName"
            ></el-input>
            <el-button size="mini" style="margin-left:5px;" @click="handleFineDrug">搜索</el-button>
          </div>
          <div
            class="choiceDrg"
            style="border-bottom:1px solid #ccc"
            v-for="(item,i) of druglish"
            :key="i"
          >
            <div>
              <b class="padding">{{item.drugsName}}</b>
              <p class="font_size padding">
                规格
                <b style="margin-left:5px">{{item.drugsSpec}}</b>
              </p>
              <p class="font_size padding">
                零售单位
                <b style="margin-left:5px">{{item.drugsRetailUnit}}</b>
              </p>
            </div>
            <div class="font_size padding">
              <el-button size="mini" @click="addDrugToLeft(i)">添加</el-button>
              <p class="instructions" @click="checkInstructions(i)">查看说明</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import NetCall from "@/views/yunxinIM/im/sdk/NIM_Web_Netcall_v6.2.0.js";
import NETCALLSDK from "@/views/yunxinIM/im/js/netcall.js";
import Audio from "@/views/yunxinIM/media/audio.vue";
import {
  getDoctor,
  getUserIngInquiry,
  findDoctor,
  updateInquiry,
  itemKey
} from "@/api/im/checkIm.js";
import { drugsList } from "@/api/inquiry/BsInquiry.js";

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
export default {
  name: "Talk",
  components: {
    "im-audio": Audio
    // "family-report-select": FamilyReportSelect,
    // "medical-record-add-select": MedicalRecordAddSelect
  },
  data() {
    return {
      druglish: [],
      fineDrugName: "",
      activeNames: [],
      doctor1Visible:false,
      newDoctor: {
        doctorName: "",
        patientCode: "",
        doctorCode: "",
        inquiryType: "",
        healthAssistantCode: "",
        chiefComplaint: "",
        diagnosis: "",
        currentMedicalHistory: "",
        pastMedicalHistory: "",
        inquiryStatus: "",
        patientName: "",
        patientSex: "",
        patientAge: "",
        inquiryNumber: "",
        diseasesCode: "",
        archivesNumber: "",
        bsPrescription: {
          inquiryNumber: "",
          patientName: "",
          patientSex: "",
          issueTime: "",
          departementName: "",
          diagnosis: null,
          archivesNumber: "",
          doctorSignatureUrl: "",
          totalAmount: null,
          doctorCode: "",
          doctorName: "",
          departmentCode: "",
          patientAge: "",
          appUserCode: "",
          bsPrescriptionSchedules: [{}]
        }
      },
      recipt: {
        medicalHistory: "",
        previousHistory: "",
        diagnose: "",
        textarea: "",
        username: "夏普乔丹",
        sex: "女",
        age: "56岁",
        department: "内科",
        changeCount: "1",
        changeNum: "1",
        dataNum: "每次",
        number: "",
        every: "",
        day: ""
      },
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
      customsysmsg: {},
      teamCustom: {},
      time: "",
      num: "",
      getSign: "",
      sign: {},
      members: {},
      countIn: {
        patientCode: "",
        doctorCode: "",
        healthAssistantCode: ""
      },
      pageQuery: {
        page: 1,
        limit: 10
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
        userinfoContent: false
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
        friendList: true,
        family: false
      },
      disabled: {
        history: true,
        dataReport: true,
        medicalRecordAdd: true
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
        account: "1127883100102197248",
        //网易云密码
        token: "9d12a4174e3edd6cabfbe30dee823730",
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
    closeDialog(done) {
      let _this=this
      done();
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules=[]
    },
    // 同步高度
    synchronHeight() {
      let _this = this;
      setTimeout(() => {
        var synchronousHeight = document.getElementsByClassName(
          "electronicPrescription"
        )[0].clientHeight;
        document.getElementsByClassName("choiceDrug")[0].style.height =
          synchronousHeight + "px";
        _this.addAllPrice();
      }, 100);
    },
    // 计算总价格
    addAllPrice() {
      var price = 0;
      for (const iterator of this.newDoctor.bsPrescription
        .bsPrescriptionSchedules) {
        price += iterator.drugsPrice;
      }
      this.newDoctor.bsPrescription.totalAmount = price;
    },
    // 删除处方中的药品
    deleteDrug(index) {
      let _this = this;
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules.splice(index, 1);
      _this.addAllPrice();
      _this.synchronHeight();
    },
    // 清空刷新药品列表
    clearCondition() {
      this.handleFineDrug();
    },
    //添加处方药品
    addDrugToLeft(index) {
      let _this = this,
        drug = _this.druglish[index];
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules.push({
        prescriptionCode: "",
        drugsName: drug.drugsName,
        drugsSpec: drug.drugsSpec,
        drugsPrice: drug.drugsPrice,
        drugsRetailUnit: drug.drugsRetailUnit,
        drugsUsage: 1,
        dosage: "",
        dosageDay: "",
        dosageTime: "",
        dosageMini: "",
        drugsCode: 1,
        drugsAmount: 1
      });
      _this.synchronHeight();
    },
    /**
     * 滚动加载
     */
    handleScroll() {
      let _this = this;
      let container = document.getElementById("add");
      let bottomPosition =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      if (bottomPosition <= 1) {
        _this.pageQuery.page += 1;
        drugsList(_this.pageQuery).then(res => {
          if (res.code == 0) {
            _this.druglish = _this.druglish.concat(res.value.records);
          }
        });
      }
    },
    // 清空刷新药品列表
    clearCondition() {
      let _this = this;
      _this.handleFineDrug();
    },
    // 药品搜索
    handleFineDrug() {
      let _this = this;
      // if (_this.fineDrugName) {
      let pageQuery = {
        page: 1,
        limit: 10
      };
      pageQuery.param = _this.fineDrugName;
      drugsList(pageQuery).then(res => {
        if (res.code == 0) {
          _this.$set(_this, "druglish", res.value.records);
        }
      });
    },
    clearCondition() {},
    // 创建就诊记录
    createClinic() {
      let _this = this;
      _this.dissTeam();
      // updateInquiry().then(res=>{

      // })
    },
    // 保存就诊草稿
    saveClinic() {},
    // 处方弹窗
    createChufang() {
      let _this = this;
      _this.doctorVisible = true;
      setTimeout(() => {
        document
          .getElementById("add")
          .addEventListener("scroll", this.handleScroll);
      }, 100);
    },
    //  添加药品数量
    handleChange() {},
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

      this.$confirm("确认将该医生加入聊天中, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // window.nim.deleteSession({
      //   id: _this.nim.activeTalker.id,
      //   done: function(error, obj) {
      //     console.log(error);
      //     console.log(obj);
      //     console.log('删除服务器上的会话' + (!error?'成功':'失败'));
      //   }
      // });
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
            // _this.getMemberTeam();
            _this.teamGroup.teamid = obj.team.teamId;
            _this.teamGroup.teamName = obj.team.name;
            _this.teamGroup.accountArr = obj.team.accounts;
            // 将群id传至服务器

            // window.nim.getTeamMembers({
            //   teamId: obj.team.teamId,
            //   done: getTeamMembersDone
            // });
            // function getTeamMembersDone(error, obj) {
            //   console.log(error);
            //   console.log(obj);
            //   console.log("获取群成员" + (!error ? "成功" : "失败"));
            //   if (!error) {
            //     for (var item of obj.members) {
            //       findDoctor({doctorCode:item.account}).then(res => {
            //         console.log(res);
            //         if(res.value.length==0){

            //         }
            //       });
            //     }
            //   }
            // }
            // var checkCode=JSON.parse(obj.)
            // switch()
          }
          console.log(error);
          console.log(obj);
          console.log(
            "创建" + obj.team.type + "群" + (!error ? "成功" : "失败")
          );
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
      window.nim
        .createChannel({
          channelName: Math.ceil(Math.random() * 10000000), //必填
          // channelName: 123456789,
          webrtcEnable: true, // 是否支持WebRTC方式接入，可选，默认为不开启,
          pushConfig: true
        })
        .then(function(obj) {
          // channelName 房间号
          // webrtcEnable webRtc模式
          _this.closeUI("nc", "open");
          _this.closeUI("nc_memberList", "open"); //打开视频框
          _this.myNetCall.createMembergroup(obj, function() {
            (function() {
              var content = {
                type: "type",
                value: "value"
              };
              var Roomaccount = [];
              var list = JSON.parse(_this.teamSroom.teamAll);
              var name = _this.teamSroom.name;
              for (var item of list) {
                Roomaccount.push(item.account);
              }
              content = JSON.stringify({
                room: obj.channelName,
                members: Roomaccount,
                teamid: _this.to,
                teamName: name
              });
              window.nim.sendCustomSysMsg({
                scene: "team",
                to: _this.to,
                content: content,
                sendToOnlineUsersOnly: false,
                apnsText: _this.teamGroup.teamName + "邀请您通话",
                done: function(error, msg) {
                  // 主叫多人视频-存退出之后加入房间
                  _this.customsysmsg = msg.content;
                  console.log(
                    "发送" +
                      msg.scene +
                      "自定义系统通知" +
                      (!error ? "成功" : "失败") +
                      ", id=" +
                      msg.idClient
                  );
                  console.log(error);
                  console.log(msg);
                }
              });
              var tipname = _this.getSign.name;
              var tip = tipname + "发起了视频聊天";
              window.nim.sendTipMsg({
                scene: "team",
                to: _this.to,
                tip: tip
              });
            })();
            // }
          }); //加入房间
          // 预定房间成功后的上层逻辑操作
          // eg: 初始化房间UI显示
          // eg: 加入房间
        });
    },
    // 离开房间
    leaveRoom() {
      let _this = this;
      _this.$refs.susp.style.display = "block";
      // _this.callTimerMany = setTimeout(function() {
      //   _this.$refs.susp.style.display = "none";
      // }, 300000);
      _this.myNetCall.leaveRoom();
    },
    // 获取医生标识
    getdoctorSign(sign) {
      let _this = this;
      findDoctor({ doctorCode: sign }).then(res => {
        _this.$set(_this, "sign", res.value[0]);
        console.log(_this.sign);
      });
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
      _this.myNetCall.calling(_this.talker, "", "p2p"); //拨通电话
    },
    telSuccess() {
      //接电话
      let _this = this;
      _this.closeAllUI();
      _this.closeUI("nc", "open"); //打开视频框
      _this.closeUI("nc_talking", "open"); //打开视频连接

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
    // 解散群组
    dissTeam() {
      var _this = this;
      // var teamId="team-"+
      // var teamAll=JSON.parse(_this.teamSroom.teamAll)
      // var accounts=[];
      var teamId = _this.teamSroom.teamId;
      // for(var item of teamAll){
      //   accounts.push(item.account)
      // }
      // console.log(accounts)
      window.nim.dismissTeam({
        teamId: teamId,
        // accounts: accounts,
        done: function(error, obj) {
          console.log(error);
          console.log(obj);
          console.log("解散群" + (!error ? "成功" : "失败"));
        }
      });
      // window.nim.deleteSession({
      //   scene: _this.nim.activeTalker.scene,
      //   to: _this.nim.activeTalker.to,
      //   done: function(error, obj) {
      //     console.log(error);
      //     console.log(obj);
      //     console.log("删除服务器上的会话" + (!error ? "成功" : "失败"));
      //   }
      // });
      // console.log(_this.nim.activeTalker)

      // window.nim.deleteLocalSession({
      //   id: _this.nim.activeTalker.id,
      //   done: deleteLocalSessionDone
      // });
      // function deleteLocalSessionDone(error, obj) {
      //   console.log(error);
      //   console.log(obj);
      //   console.log("删除本地会话" + (!error ? "成功" : "失败"));
      // }
    },
    init() {
      let boxl = document.getElementById("bl");
      let boxlTitle = document.getElementById("bl-title");
      let boxlFriend = document.getElementById("bl-friend");
      // boxlFriend.style.height =
      //   boxl.clientHeight - boxlTitle.clientHeight + "px";
      // console.log(boxlFriend.clientHeight);
    },
    connectSDK() {
      //连接IM SDK
      let _this = this;
      window.nim = SDK.NIM.getInstance({
        appKey: _this.$config.appkey,
        account: _this.nim.account,
        token: _this.nim.token,
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
          // for (var item of teams) {
          //   nim.getTeamMembers({
          //     teamId: item.teamId,
          //     done: getTeamMembersDone
          //   });
          //   function getTeamMembersDone(error, obj) {
          //     console.log(error);
          //     console.log(obj);
          //     console.log("获取群成员" + (!error ? "成功" : "失败"));
          //     if (!error) {
          //       for (var item of obj.members) {
          //         nim.getTeamMemberByTeamIdAndAccount({
          //           teamId: obj.teamId,
          //           account: item.account,
          //           done: getTeamMemberDone
          //         });
          //         function getTeamMemberDone(error, obj) {
          //           console.log(error);
          //           console.log(obj);
          //           console.log("获取群成员" + (!error ? "成功" : "失败"));
          //           if (!error) {
          //             onTeamMember(obj);
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
        },
        onmyinfo: function(user) {
          //获取IM 医生信息
          _this.$set(_this.nim, "doctorInfo", user);
          _this.$nextTick(function() {
            _this.loading.doctorInfo = false; //loading
          });
        },
        onmsg: function(msg) {
          console.log("收到消息", msg.scene, msg.type, msg);
        },
        oncustomsysmsg: function(sysMsg) {
          var content = JSON.parse(sysMsg.content);
          switch (content.id) {
            case 3:
              if (sysMsg.status == "success") {
                _this.$set(_this, "customsysmsg", sysMsg);
                _this.closeUI("nc", "open");
                _this.closeUI("nc_acceptMany", "open");
                if (_this.hide.Rcontent == false) {
                  _this.hide.Rcontent = true;
                  _this.$bus.emit("rcontent", 935);
                }
                _this.clears();
                _this.getUseInfo(sysMsg.from, function(val) {
                  _this.$set(_this, "accepter", val);

                  // _this.talkVue.accepter.nick = custom.CurrentMember;
                });
                _this.callTimerMany = setTimeout(function() {
                  // if (!netcall.callAccepted) {
                  console.log("超时未接听, hangup");
                  _this.closeUI("nc", "open");
                  _this.closeUI("nc_acceptMany", "open");
                  _this.myNetCall.LeaveVideo();
                  // }
                }, 30000);
              }
              break;
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
    },
    mergeFriend() {
      //nim.session 中提取好友
      let _this = this;

      if (_this.nim.session.length == 0) {
        return false;
      }
      console.log(_this.nim.session);

      // for(_this.nim.session.le)

      //清空好友列表
      _this.$set(_this.nim, "friends", []);

      for (let i = 0; i < _this.nim.session.length; i++) {
        // 					if (_this.nim.session[i].lastMsg.type == "notification") {
        // 					} else {
        // 						_this.nim.friends.push(_this.nim.session[i]);
        // 					}
        (function(that) {
          that.getUseInfo(_this.nim.session[i].lastMsg.target, function(users) {
            _this.$set(_this.nim.session[i], "userinfo", users);
            // debugger
            for (var item of _this.teamCustom) {
              if (_this.nim.session[i].to == item.teamId) {
                _this.nim.session[i].custom = { name: item.name };
              }
            }

            that.nim.friends.push(_this.nim.session[i]);
          });
        })(_this);
      }
      _this.loading.friendList = false;
    },
    // 视频通话
    tellonOther() {
      let _this = this;
      _this.telOn();
    },
    handleSelectFirend(val) {
      //选择某个好友时
      let _this = this;
      // debugger;
      console.log(val);

      //  _this.hide.Rcontent = true;
      // _this.hide.userinfoContent=true
      // _this.$bus.emit("rcontent", 935);

      if (val.scene == "p2p") {
        window.nim.setCurrSession(val.id); //重置当前会话
        _this.patient.headerImg = val.userinfo.avatar;
        _this.patient.userName = val.userinfo.nick;
        var objCode = {
          // healthAssistantCode: _this.getSign.id,
          healthAssistantCode: "1127883100102197248",
          patientCode: val.userinfo.account
        };
        getUserIngInquiry(objCode).then(res => {
          // debugger
          console.log(res);
          if (res.value == null) {
            _this.hide.Rcontent = true;
            _this.$bus.emit("rcontent", 570);
            _this.hide.userinfoContent = false;
          } else {
            _this.hide.Rcontent = true;
            _this.hide.userinfoContent = true;
            _this.$bus.emit("rcontent", 935);
            _this.$set(_this, "form", res.value);
            sessionStorage.setItem("updateInfo", JSON.stringify(res.value));
          }
        });
        _this.otherGroup.push({
          account: val.userinfo.account,
          nick: val.userinfo.nick,
          avatar: val.userinfo.avatar
        });
      } else if (val.scene == "team") {
        window.nim.setCurrSession(val.id); //重置当前会话
        for (let item of _this.teamCustom) {
          if (val.to == item.teamId) {
            _this.patient.userName = val.custom.name;
            _this.$set(_this.teamSroom, "teamAll", item.custom);
            _this.$set(_this.teamSroom, "name", item.name);
            _this.$set(_this.teamSroom, "teamId", item.teamId);
            _this.findTeam(item.custom);
          }
        }
      }

      _this.to = val.to;

      // _this.$refs.Rcontent.display="block"
      _this.talker.to = val.to;
      // _this.talker.avatar=val.userinfo.avatar

      _this.$set(_this.nim, "activeTalker", val);

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
        setTimeout(() => {
          _this.$nextTick(function() {
            getUserIngInquiry(_this.lists).then(res => {
              // debugger
              console.log(res);
              if (res.value == null) {
                _this.hide.Rcontent = true;
                _this.$bus.emit("rcontent", 570);
                _this.hide.userinfoContent = false;
              } else {
                _this.hide.Rcontent = true;
                _this.hide.userinfoContent = true;
                _this.$bus.emit("rcontent", 935);
                _this.$set(_this, "newDoctor", res.value);
              }
            });
          });
        }, 1000);
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
          if (tempMsg.type == "notification") {
            continue;
          }
          if (tempMsg.scene == "p2p") {
            window.nim.getUser({
              account: tempMsg.target,
              done: function(error, user) {
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
          // //消息滚动底部
          _this.handleScrollToBottom();
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
    },
    // addFriend() {
    // 	//新增
    // 	let _this = this;
    // 	for (var i in _this.nim.friends) {
    // 		if (i == parseInt(_this.test.no)) {
    // 			_this.nim.friends.splice(i, 1);
    // 			break;
    // 		}
    // 	}
    // 	_this.$nextTick(function() {
    // 		_this.nim.friends.unshift(a);
    // 	});
    // },
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
    lilili() {
      let _this = this;
      _this.$bus.on("msg", res => {
        _this.getSign = JSON.parse(res);
        _this.getdoctorSign(_this.getSign.id);
        _this.nim.account = _this.getSign.wangyiName;
        _this.nim.token = _this.getSign.wangyiPassword;
        _this.connectSDK();
      });
    }
  },
  created() {
    let _this = this;
    _this.$bus.on("show", res => {
      _this.getSign = JSON.parse(sessionStorage.getItem("getInfo"));
      _this.getdoctorSign(_this.getSign.id);
      _this.nim.account = _this.getSign.wangyiName;
      _this.nim.token = _this.getSign.wangyiPassword;
      _this.connectSDK();
    });
  },
  mounted() {
    let _this = this;
    _this.init();
    _this.handleFineDrug();
    _this.connectSDK(); //连接IM SDK
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
  bottom: 50%;
  width: 50px;
  height: 50px;
  z-index: 200;
  line-height: 50px;
  text-align: center;
  color: #fff;
  border: 1px solid rgb(201, 148, 2);
  background: rgb(201, 148, 2);
  border-radius: 50%;
  display: none;
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
  border-top: 2px solid black;
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
  background: #fff;
  border-radius: 4px;
  z-index: 2900;
  z-index: 99999999;
  display: none;
}
.member-list .video {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
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
  border: 1px solid #ddd;
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
.memberVideo .pleaseImg {
  position: absolute;
  width: 230px;
  height: 230px;
}

.r-userinfo {
  position: absolute;
  top: 0;
  left: 870px;
  height: 100%;
  /* left: 900px; */
  border: 1px solid #ddd;
  width: 365px;
  background: #f2f2f2;
  z-index: 700;
  /* display: none; */
}
.r-userinfo >>> .el-collapse-item__header {
  background-color: #f2f2f2;
  border: none;
  width: 85%;
  margin: 0 auto;
}
.r-userinfo >>> .el-collapse-item__content {
  border: none;
  background-color: #f2f2f2;
  width: 85%;
  margin: 0 auto;
}
.r-userinfo >>> .el-collapse-item__wrap {
  background-color: #f2f2f2;
}
.patient-img {
  margin-left: 100px;
  width: 64px;
  height: 64px;
}
.patient-img > img {
  border-radius: 50%;
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
}
.parient-flex {
  width: 85%;
  margin: 5% auto;
  display: flex;
  justify-content: space-between;
}
.parient-flexstart {
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: flex-start;
}
.axisLine {
  width: 85%;
  margin: 6px auto;
  border: 1px solid #ddd;
}
.parient-auto {
  width: 85%;
  margin: 0 auto;
}
.parient-btn {
  text-align: center;
  width: 85%;
  margin: 15px auto;
}
.parient-btn > button {
  margin: 10px 8px;
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
}
.textarea-p2p {
  width: 100%;
  height: 80px;
}
fieldset {
  border: none !important;
}
.ebook-recipe > .left-recipe {
  width: 60%;
}
.ebook-recipe > .right-recipe {
  width: 40%;
  border-left: 1px solid #888;
}
.ebook-recipe {
  display: flex;
  justify-content: space-between;
  height: 100%;
  font-size: 12px;
}
/* 处方弹窗 */
.left-head {
  text-align: center;
  border-bottom: 1px dashed #888;
}
.left-head > .fontsize16 {
  font-size: 16px;
  font-weight: bold;
}
.left-head > :nth-child(2) {
  padding: 12px;
}
.left-baseinfo {
  width: 90%;
  margin: 0 auto;
}
.left-baseinfo > div {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
}
.left-baseinfo > div span {
  display: inline-block;
  border-bottom: 1px solid #ddd;
}
.el-dialog {
  width: 75% !important;
}
.recipe-title {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.Rmedit {
  position: relative;
  width: 95%;
  margin: 0 auto;
  border: 1px solid red;
  border-bottom: 1px solid #ddd;
}
.Rmedit > div {
  padding: 7px 7px;
}
.Rmedit .el-icon-delete {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 26px;
  vertical-align: middle;
  cursor: pointer;
}
.recipe-count {
  display: inline-block;
  padding-top: 7px;
}
.recipe-record {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  margin: 12px 12px;
}
.record-one > div {
  padding: 3px 3px;
}
.remark {
  margin-left: 12px;
}
.remark > p {
  margin: 5px 5px;
}
.btnlook > a {
  display: block;
  padding: 10px;
  color: #238efa;
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
.el-icon-video-play {
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
  left: 50px;
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
  width: 100%;
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
