<template>
  <div class="base baseLife">
    <div class="center">慢病档案</div>
    <el-form ref="form" :model="form" label-position="left" :rules="rules">
      <div class="border-box padd">
        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="档案编号：" prop="archivesCode">
              <el-input v-model="form.archivesCode" @keyup.native="form.archivesCode=form.archivesCode.replace(/[^\w]/g,'');"   maxlength="50" placeholder="请输入档案编号" :required="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="姓名：" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入内容" :required="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="性别：" prop="userSex">
              <el-radio-group v-model="form.userSex" :required="true">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="年龄：" prop="userAge">
              <el-input type="number" min="0" placeholder="请输入您的年龄" v-model="form.userAge" :required="true" @keyup.native="proving($event)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">

          <el-col :md="6" :sm="12" :xs="24">
           <el-form-item label="身份证号：" prop="userCard">
              <el-input v-model="form.userCard"  maxlength="18" placeholder="请输入身份证号" :required="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="婚姻状况：">
              <el-radio-group v-model="form.userMaritalStatus">
                <el-radio label="0">已婚</el-radio>
                <el-radio label="1">未婚</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="职业：">
              <el-input v-model="form.userOccupation" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
         <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="常住地址：" prop="address">
              <el-input v-model="form.address" placeholder="请输入您的常住地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="本人电话：" prop="userPhone">
              <el-input v-model="form.userPhone"  maxlength="11" placeholder="请输入本人电话" :required="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="健康助理：" prop="uname">
              <el-input v-model="form.healthAssistantName" placeholder="请输入健康助理" :required="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="出生日期：">
              <el-date-picker v-model="form.userBirth" value-format="yyyy-MM-dd" type="date" placeholder="选择出生日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="工作单位：">
              <el-input v-model="form.userWorkCompany"  placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
         <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="联系人电话：">
              <el-input v-model="form.userContactsPhone"  maxlength="11" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="联系人姓名：">
              <el-input v-model="form.userContacts" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="文化程度：">
              <el-input v-model="form.userEducation" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="民族：">
              <el-input v-model="form.nationality" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

           <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="申报成功日期：">
              <el-date-picker v-model="form.applyDate" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="padd">
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="医疗费用支付方式：">
              <el-radio-group v-model="form.medicalPayMethod">
                <el-radio label="1">省医保</el-radio>
                <el-radio label="2">市职工医保</el-radio>
                <el-radio label="3">市居民医保</el-radio>
                <el-radio label="4">商业医疗保险</el-radio>
                <el-radio label="5">全公费</el-radio>
                <el-radio label="6">自费</el-radio>
                <el-radio label="7">其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="药物过敏史：">
              <el-radio-group v-model="form.hisDrugAllergy	">
                <el-radio label="1">无</el-radio>
                <el-radio label="2">青霉素</el-radio>
                <el-radio label="3">磺胺</el-radio>
                <el-radio label="4">链霉素</el-radio>
                <el-radio label="5">其他</el-radio>
                <el-input v-model="form.hisDrugAllergyDesc" class="miniWBIG"  v-if="form.hisDrugAllergy == 5"></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="暴露史：">
              <el-radio-group v-model="form.exposureHistory">
                <el-radio label="0">无</el-radio>
                <el-radio label="1">化学品</el-radio>
                <el-radio label="2">毒物</el-radio>
                <el-radio label="3">射线</el-radio>
                <el-radio label="4">其他</el-radio>
                <el-input  v-model="form.exposureHistoryDesc" class="miniWBIG" v-if="form.exposureHistory == 4"></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="遗传病史：">
              <el-radio-group v-model="form.geneticHistory">
                <el-radio label="0">有</el-radio>
                <el-radio label="1">无</el-radio>
                <el-input  v-model="form.geneticHistoryDesc" class="miniWBIG" v-if="form.geneticHistory != 1"></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="情绪：">
              <el-radio-group v-model="form.emotion">
                <el-radio label="1">情绪正常</el-radio>
                <el-radio label="2">易紧张</el-radio>
                <el-radio label="3">易焦虑</el-radio>
                <el-radio label="4">易生气</el-radio>
                <el-radio label="5">易激动</el-radio>
                <el-radio label="6">易情绪低落</el-radio>
                <el-radio label="7">压力大</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="partition"></div>

      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" class="padd">
          <template slot="title">
            <h4>一般状况</h4>
          </template>
          <el-row>
            <el-form-item>
              <el-col :md="24" :sm="24" :xs="24">
                <div class="MstateColor">
                  <span>身高</span>
                  <el-input size="mini" min="0" class="miniW" v-model="form.height" type="number" @keyup.native="proving($event)"></el-input>
                  <span>cm</span>
                  <span>体重</span>
                  <el-input size="mini" min="0" class="miniW" v-model="form.weight" type="number" @keyup.native="proving1($event)"></el-input>
                  <span>kg</span>
                  <span>体重指数</span>
                  <el-input size="mini" min="0" class="miniW" v-model="form.weightIndex" type="number" @keyup.native="proving1($event)"></el-input>
                  <span>kg/m 2</span>
                </div>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <div class="MstateColor">
                  <span>腰围</span>
                  <el-input size="mini" min="0" class="miniW" v-model="form.waist" type="number" @keyup.native="proving($event)"></el-input>
                  <span>cm</span>
                  <span>臀围</span>
                  <el-input size="mini" min="0" class="miniW" v-model="form.hipline" type="number" @keyup.native="proving($event)"></el-input>
                  <span>cm</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <div class="stateLife">
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="自理情况：">
                  <el-radio-group v-model="form.selfCareAbility">
                    <el-radio label="1">自理</el-radio>
                    <el-radio label="2">部分自理</el-radio>
                    <el-radio label="3">完全不能自理</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="睡眠情况：">
                  <el-radio-group v-model="form.sleepCondition">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">易醒</el-radio>
                    <el-radio label="3">多梦</el-radio>
                    <el-radio label="4">入眠困难</el-radio>
                    <el-radio label="5">药物辅助</el-radio>
                    <el-radio label="6">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="认知情况：">
                  <el-radio-group v-model="form.cognitiveSituation">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">轻度痴呆</el-radio>
                    <el-radio label="3">中度痴呆</el-radio>
                    <el-radio label="4">重度痴呆</el-radio>
                    <el-radio label="5">其他</el-radio>
                    <el-input class="miniWBIG"  v-model="form.cognitionOther" v-if="form.cognitiveSituation == 5"></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="大便情况：">
                  <el-radio-group v-model="form.stoolCondition">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">失禁</el-radio>
                    <el-radio label="3">便秘</el-radio>
                    <el-radio label="4">腹泻</el-radio>
                    <el-radio label="5">其他</el-radio>
                    <el-input class="miniWBIG" v-model="form.stoolOther" v-if="form.stoolCondition == 5"></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="小便情况：">
                  <el-radio-group v-model="form.urinationCondition">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">尿潴留</el-radio>
                    <el-radio label="3">失禁</el-radio>
                    <el-radio label="4">其他</el-radio>
                    <el-input class="miniWBIG" v-model="form.urinationOther" v-if="form.urinationCondition == 4"></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

        <div class="partition"></div>

        <el-collapse-item name="2" class="padd">
          <template slot="title">
            <h4>既往史</h4>
          </template>
          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="生育史：">
                <el-input type="number" min="0" class="miniW" v-model="form.sonQuit" @keyup.native="proving($event)"></el-input>子
                <el-input type="number" min="0" class="miniW" v-model="form.daughterQuit" @keyup.native="proving($event)"></el-input>女
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="慢病史：">
                <el-radio-group
                  v-model="form.chronicIllness"

                >
                  <el-radio label="2">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <div v-if="form.chronicIllness == 1">
                  <template>
                    <el-table
                      border
                      :data="manBTable"
                      style="width: 100%"
                      :header-cell-style="{background:tableHead}"
                    >
                      <el-table-column
                        prop="opsname"
                        label="疾病名称"
                        style="width:6vw;"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.historyName"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="确诊时间" align="center">
                        <template slot-scope="scope">
                          <el-date-picker v-model="scope.row.historyDate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                          <img
                            src="../../../../static/png/add.png"
                            alt
                            @click="addrow(manBTable,{dataType:1,historyType:1})"
                          >
                          <img
                            src="../../../../static/png/del.png"
                            alt
                            @click.prevent="delrow(scope.$index,manBTable)"
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="手术史：">
                <el-radio-group
                  v-model="form.operationHistory"
                >
                  <el-radio label="2">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <div v-if="form.operationHistory == 1">
                  <template>
                    <el-table
                      border
                      :data="opsTable"
                      style="width: 100%"
                      :header-cell-style="{background:tableHead}"
                    >
                      <el-table-column
                        prop="opsname"
                        label="手术名称"
                        style="width:6vw;"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.historyName"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="手术时间" align="center">
                        <template slot-scope="scope">
                          <el-date-picker v-model="scope.row.historyDate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                          <img
                            src="../../../../static/png/add.png"
                            alt
                            @click="addrow(opsTable,{dataType:1,historyType:2})"
                          >
                          <img
                            src="../../../../static/png/del.png"
                            alt
                            @click.prevent="delrow(scope.$index,opsTable)"
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="外伤史：" prop="servin">
                <el-radio-group
                  v-model="form.traumaHistory"
                >
                  <el-radio label="2">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <div v-if="form.traumaHistory == 1">
                  <template>
                    <el-table
                      border
                      :data="traumaTable"
                      style="width: 100%"
                      :header-cell-style="{background:tableHead}"
                    >
                      <el-table-column prop="opsname" label="名称" style="width:6vw;" align="center">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.historyName"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="时间" align="center">
                        <template slot-scope="scope">
                          <el-date-picker v-model="scope.row.historyDate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                          <img
                            src="../../../../static/png/add.png"
                            alt
                            @click="addrow(traumaTable,{dataType:1,historyType:3})"
                          >
                          <img
                            src="../../../../static/png/del.png"
                            alt
                            @click.prevent="delrow(scope.$index,traumaTable)"
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="输血史：">
                <el-radio-group
                  v-model="form.bloodHistory"
                >
                  <el-radio label="2">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <div v-if="form.bloodHistory == 1">
                  <template>
                    <el-table
                      border
                      :data="ftransfusionTable"
                      style="width: 100%"
                      :header-cell-style="{background:tableHead}"
                    >
                      <el-table-column prop="opsname" label="名称" style="width:6vw;" align="center">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.historyName"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="时间" align="center">
                        <template slot-scope="scope">
                         <el-date-picker v-model="scope.row.historyDate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                          <img
                            src="../../../../static/png/add.png"
                            alt
                            @click="addrow(ftransfusionTable,{dataType:1,historyType:4})"
                          >
                          <img
                            src="../../../../static/png/del.png"
                            alt
                            @click.prevent="delrow(scope.$index,transfusionTable)"
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <!-- 家族史 -->
        <div class="partition"></div>

        <el-collapse-item name="3" class="family padd">
          <template slot="title">
            <h4>家族史</h4>
          </template>
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="父亲：">
                <el-select
                  v-model="familyFather"
                  multiple
                  placeholder="--请选择--"
                  @change="changeJoin(familyFather,1)"
                >
                  <el-option
                    v-for="item in father"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >{{item.label}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="母亲：">
                <el-select
                  v-model="familyMother"
                  multiple
                  placeholder="--请选择--"
                  @change="changeJoin(familyMother,2)"
                >
                  <el-option
                    v-for="item in father"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >{{item.label}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="兄弟姐妹：">
                <el-select
                  v-model="familyBrother"
                  multiple
                  placeholder="--请选择--"
                  @change="changeJoin(familyBrother,3)"
                >
                  <el-option
                    v-for="item in father"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >{{item.label}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="子女：">
                <el-select
                  v-model="familyChildren"
                  multiple
                  placeholder="--请选择--"
                  @change="changeJoin(familyChildren,4)"
                >
                  <el-option
                    v-for="item in father"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >{{item.label}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <div>
                <ul class="float-bing">
                  <li>1、无</li>
                  <li>2、高血压</li>
                  <li>3、糖尿病</li>
                  <li>4、冠心病</li>
                  <li>5、慢性阻塞性肺疾病</li>
                  <li>6、恶性肿瘤</li>
                  <li>7、脑卒中</li>
                  <li>8、严重精神障碍</li>
                  <li>9、结核病</li>
                  <li>10、肝炎</li>
                  <li>11、先天畸形</li>
                  <li>12、其他</li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>

        <div class="partition"></div>

        <el-collapse-item name="4" class="padd">
          <template slot="title">
            <h3>生活方式</h3>
          </template>
          <div>
            <h4>体育锻炼：</h4>
            <div  class="MstateColor">
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="锻炼频率：">
                  <el-radio-group v-model="form.exerciseFrequency">
                    <el-radio label="1">每天</el-radio>
                    <el-radio label="2">每周一次以上</el-radio>
                    <el-radio label="3">偶尔</el-radio>
                    <el-radio label="4">不锻炼</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item>
                  每次锻炼时间：
                  <el-input class="miniW" v-model="form.exerciseTime"></el-input>坚持锻炼时间：
                  <el-input class="miniW" v-model="form.adhereExercise"></el-input>锻炼方式：
                  <el-input class="miniW" v-model="form.exerciseMode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
          </div>
          <div>
            <h4>饮食情况：</h4>
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="口味：">
                  <el-radio-group v-model="form.flavor">
                    <el-radio label="1">咸</el-radio>
                    <el-radio label="2">甜</el-radio>
                    <el-radio label="3">酸</el-radio>
                    <el-radio label="4">辣</el-radio>
                    <el-radio label="5">油腻</el-radio>
                    <el-radio label="6">清淡</el-radio>
                    <el-radio label="7">无固定口味</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="饮食结构：">
                  <el-radio-group v-model="form.dietaryStructure">
                    <el-radio label="1">荤素均衡</el-radio>
                    <el-radio label="2">荤食为主</el-radio>
                    <el-radio label="3">素食为主</el-radio>
                    <el-radio label="4">纯素食</el-radio>
                    <el-radio label="5">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="烹饪习惯：">
                  <el-radio-group v-model="form.cookingHabits">
                    <el-radio label="1">蒸煮为主</el-radio>
                    <el-radio label="2">煎炒为主</el-radio>
                    <el-radio label="3">油炸烧烤为主</el-radio>
                    <el-radio label="4">煲炖为主</el-radio>
                    <el-radio label="5">卤制、腌制为主</el-radio>
                    <el-radio label="6">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="每日食盐量(适合高血压患者)：">
                  <el-radio-group v-model="form.saltConsumption">
                    <el-radio label="1">轻(6k)</el-radio>
                    <el-radio label="2">中(6-12k)</el-radio>
                    <el-radio label="3">重(>12k)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div>
            <h4>吸烟史：</h4>
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="吸烟状况：">
                  <el-radio-group v-model="form.smokingStatus">
                    <el-radio label="1">从不吸烟</el-radio>
                    <el-radio label="2">已戒烟</el-radio>
                    <el-radio label="3">吸烟</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="MstateColor">
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item>
                  
                  日吸烟量：
                  <el-input class="miniW" min="0" v-model="form.smokingVolume" type="number" @keyup.native="proving($event)"></el-input>烟龄：
                  <el-input class="miniW" v-model="form.smokingYear"></el-input>戒烟时间：
                  <el-input class="miniW" v-model="form.smokingCessationTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h4>饮酒史：</h4>
            <el-row>
              <el-col>
                <el-form-item label="是否戒酒：">
                  <el-radio-group v-model="form.abstinence">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                    <el-input
                      class="miniWBIG"
                      v-model="form.abstinenceTime"
                      placeholder="请输入戒酒时间"
                       v-if="form.abstinence == 0"
                    ></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="饮酒量：">
                  <el-input class="miniWBIG" v-model="form.liquorQuit" placeholder="日饮酒量">
                     <template slot="append">（两）</template>  
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="饮酒频率：">
                  <el-radio-group v-model="form.frequencyOfDrinking">
                    <el-radio label="1">从不</el-radio>
                    <el-radio label="2">偶尔</el-radio>
                    <el-radio label="4">每天</el-radio>
                    <el-radio label="3">经常(经常是指平均每周至少1次，连续6个月以上)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="健康知识：">
                  <el-checkbox-group v-model="healthKnowledge" @change="checkboxChange(healthKnowledge,2)">
                    <el-checkbox name="type" label="1">与医生交流</el-checkbox>
                    <el-checkbox name="type" label="2">电视网络报纸等</el-checkbox>
                    <el-checkbox name="type" label="3">健康知识讲座</el-checkbox>
                    <el-checkbox name="type" label="4">其他</el-checkbox>
                  </el-checkbox-group>
                  <el-input class="miniWBIG" v-model="form.healthKnowledgeDesc" v-if="healthKnowledge == 4"></el-input>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="中医认知">
                  <el-radio-group v-model="form.tcmCognition">
                    <el-radio label="1">信任</el-radio>
                    <el-radio label="2">不信任</el-radio>
                    <el-radio label="3">其他</el-radio>
                  </el-radio-group>
                  <el-input class="miniWBIG" v-model="form.tcmCognitionDesc"  v-if="form.tcmCognition == 3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="您认为自己健康状况如何?">
                  <el-radio-group v-model="form.healthAssessment">
                    <el-radio label="1">非常好</el-radio>
                    <el-radio label="2">良好</el-radio>
                    <el-radio label="3">一般</el-radio>
                    <el-radio label="4">较差</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="在健康方面，您希望我们为您提供什么帮助?">
                  <el-checkbox-group v-model="healthHlep" @change="checkboxChange(healthHlep,1)">
                    <el-checkbox name="type" label="1">饮食</el-checkbox>
                    <el-checkbox name="type" label="2">运动</el-checkbox>
                    <el-checkbox name="type" label="3">其他</el-checkbox>
                  </el-checkbox-group>
                  <el-input class="miniWBIG" v-model="form.healthHlepDesc" v-if="healthHlep == 3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="MstateColor">
            <el-row>
              <el-form-item>
                <el-col :md="8" :sm="24" :xs="24">
                  <div>以上内容经核实确认,真实,可靠,与本人信息一致</div>
                </el-col>
                <el-col :md="16" :sm="12" :xs="24">
                  <el-form-item label="签字：">
                    本人:
                    <el-input class="miniW" v-model="sign1" @blur="signBlur(1)"></el-input>/
                    家属:
                    <el-input class="miniW" v-model="sign2" @blur="signBlur(2)"></el-input>时间：
                    <span>{{getDate | time}}</span>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="btn">
        <el-button type="success" @click="saveForm()">保存档案</el-button>
        <el-button type="warning" @click="confirmForm()">确认建档</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// 调用接口
import form from "@/assets/js/form.js";
import { insertBsArchives } from "@/api/sys/base.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Checkcard, isvalidUsername, validateMobile } from "@/utils/validate";
export default {
  data() {
    return {
      rules: {
        userPhone: [
          { required: true, message: "请输入手机号码" , trigger: 'blur'},
          { validator: validateMobile }
        ],
        userName: [{ required: true, message: "请输入您的姓名" , trigger: 'blur'}],
        archivesCode: [{ required: true, message: "请输入档案编号,只能输入数字或者字母" , trigger: 'blur'}],
        userCard: [
          { required: true, message: "请输入您的身份证号" , trigger: 'blur'},
          { validator: Checkcard }
        ],
        address: [
          { required: true, message: "请输入您的住址" , trigger: 'blur'},
        ],
       userSex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        userAge: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
      },
      tableHead: "rgba(228,248,245,1)",
      father: form,
      sign1:"",
      sign2:"",
      activeNames: ["1", "2", "3", "4"],
      familyFather: ["1"],
      familyMother: ["1"],
      familyBrother: ["1"],
      familyChildren: ["1"],
      healthHlep:[],
      healthKnowledge: [],
      form: {
        archivesCode:"",
        stoolOther:"",
        urinationOther:"",
        cognitionOther:"",
        sign:"",
        nationality:"",
        userName: "",
        userPhone: "",
        userSex: "",
        userAge: "",
        address: "",
        userCard: "",
        userOccupation: "",
        operationHistory: "2",
        bloodHistory: "2",
        traumaHistory: "2",
        chronicIllness: "2",
        healthAssistantCode: "",
        doctorCode: "",
        doctorName: "",
        healthAssistantName: "",
        applyDate: "",
        userBirth: "",
        userWorkCompany: "",
        userContacts: "",
        userContactsPhone: "",
        userEducation: "",
        userMaritalStatus: "",
        isDeleted: "",
        height: "",
        weight: "",
        weightIndex: "",
        waist: "",
        hipline: "",
        selfCareAbility: "",
        sleepCondition: "",
        cognitiveSituation: "",
        stoolCondition: "",
        urinationCondition: "",
        geneticHistory: "",
        geneticHistoryDesc: "",
        emotion: "",
        exerciseFrequency: "",
        exerciseTime: "",
        adhereExercise: "",
        exerciseMode: "",
        flavor: "",
        dietaryStructure: "",
        cookingHabits: "",
        saltConsumption: "",
        smokingStatus: "",
        smokingYear: "",
        smokingVolume: "",
        smokingCessationTime: "",
        abstinence: "",
        abstinenceTime: "",
        frequencyOfDrinking: "",
        healthKnowledge: "",
        healthKnowledgeDesc: "",
        tcmCognition: "",
        tcmCognitionDesc: "",
        healthAssessment: "",
        healthProblem: "",
        sonQuit: "",
        daughterQuit: "",
        healthHlep: "",
        healthHlepDesc: "",
        hisDrugAllergy: "",
        hisDrugAllergyDesc: "",
        medicalPayMethod: "",
        exposureHistory: "",
        exposureHistoryDesc: "",
        liquorQuit: "",
        dataStatus: "",
        familyFather: "1",
        familyMother: "1",
        familyBrother: "1",
        familyChildren: "1",
        signature:"",
        bsArchivesPastHistories: []
      },
      Histories:[],
      opsTable: [{ historyType: 2, dataType: 1 }],
      traumaTable: [{ historyType: 3, dataType: 1 }],
      manBTable: [{ historyType: 1, dataType: 1 }],
      ftransfusionTable: [{ historyType: 4, dataType: 1 }],
      getDate: new Date(),
      user: this.$store.state.user.dataUser,
    };
  },
  mounted() {
    this.form.healthAssistantCode=this.$store.state.user.dataUser.id
    this.form.healthAssistantName=this.user.name
  },
  methods: {
    // 签名
    signBlur(val){
      let _this=this
      if(val==1){
        _this.form.sign=_this.sign1;
        _this.form.signature=val;
      }else if(val==2){
        _this.form.sign=_this.sign2;
        _this.form.signature=val;
      }
    },
    checkboxChange(value, code) {
      let _this = this;
      let val = _this.usual.changeString(value);
      switch (code) {
        case 1:
          _this.form.healthHlep = val.family;
          break;

        case 2:
          _this.form.healthKnowledge = val.family;
          break;
      }


    },
    // 提交数据
    create(){
       let _this = this;
      for (let i = 0;i < _this.opsTable.length && _this.form.operationHistory == 1;i++) {
        _this.Histories.push(_this.opsTable[i]);
      }
      for (let i = 0;i < _this.traumaTable.length && _this.form.traumaHistory == 1;i++
      ) {
        _this.Histories.push(_this.traumaTable[i]);
      }
      for (let i = 0;i < _this.manBTable.length && _this.form.chronicIllness == 1;i++
      ) {
        _this.Histories.push(_this.manBTable[i]);
      }
      for (let i = 0;i < _this.ftransfusionTable.length && _this.form.bloodHistory == 1;i++
      ) {
        _this.Histories.push(_this.ftransfusionTable[i]);
      }
      _this.form.bsArchivesPastHistories=_this.Histories
      let bsArchives = _this.form;
          insertBsArchives(bsArchives).then(res => {
        // 操作数据成功
         if(res.code==0){
         this.$message({
          message: res.msg,
          type: 'success'
        });
          _this.$router.push("/manB/manBIng")
         }else{
           this.$message({
          message: res.msg,
          type: 'error'
        });
         }
        });
      },
    // 确认建档
    confirmForm() {
      let _this=this
       if(_this.form.userName!=""||_this.form.userPhone!=""||_this.form.userSex!=""||_this.form.userCard!=""||_this.form.userAge!=""||_this.form.address!=""){
         this.form.dataStatus=0
          this.create()
      }else{
        this.$message.error("必填数据不能为空")
         document.getElementsByClassName('el-row')[0].scrollIntoView()
      }
    },
    // 保存档案---状态码:3
    saveForm() {
          let _this=this
       if(_this.form.userName!=""||_this.form.userPhone!=""||_this.form.userSex!=""||_this.form.userCard!=""||_this.form.userAge!=""||_this.form.address!=""){
         this.form.dataStatus=3
          this.create()
      }else{
        this.$message.error("必填数据不能为空")
         document.getElementsByClassName('el-row')[0].scrollIntoView()
      }
    },
    // 家族史-数组转字符串
       changeJoin(val, type) {
      if (type == 1) {
       if(val[0]==1){
         val.splice(0,1)
       }
        for (let i = 0; i < val.length; i++) {
          if(val[i]==1){
            val.length=0;
             this.familyFather=["1"]
            val=["1"]
          }
        }
        this.form.familyFather = val.join("/");
      }
      if (type == 2) {
         if(val[0]==1){
         val.splice(0,1)
       }
        for (let i = 0; i < val.length; i++) {
          if(val[i]==1){
            val.length=0;
             this.familyMother=["1"]
            val=["1"]
          }
        }
        this.form.familyMother = val.join("/");
      }
      if (type == 3) {
         if(val[0]==1){
         val.splice(0,1)
       }
        for (let i = 0; i < val.length; i++) {
          if(val[i]==1){
            val.length=0;
            this.familyBrother=["1"]
            val=["1"]
          }
        }
        this.form.familyBrother = val.join("/");
      }
      if (type == 4) {
        if(val[0]==1){
         val.splice(0,1)
       }
        for (let i = 0; i < val.length; i++) {
          if(val[i]==1){
            val.length=0;
            this.familyChildren=["1"]
            val=["1"]
          }
        }
        this.form.familyChildren = val.join("/");
      }
    },
    //表格-添加行
    addrow(table, type) {
      let _this = this;
      (_this.form.bsArchivesPastHistories = []),
        _this.usual.addRow(table, type);
    },
    // 删除行
    delrow(index, rows) {
      let _this = this;
      _this
        .$confirm("此操作将永久删除该行记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$message({
            type: "success",
            message: "删除成功!"
          });
          _this.usual.delRow(index, rows);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style scoped>
.dis {
  display: none;
}
.el-collapse {
  border: none;
}

.btn {
  padding: 15px;
  text-align: center;
  background-color: #e9f2f5;
}
.float-bing {
  list-style: none;
  padding: 0;
}
.float-bing > li {
  float: left;
  padding-left: 14px;
}
.family >>> .el-select .el-tag__close.el-icon-close {
  display: none !important;

}
.family >>> .el-select .el-tag {
  background-color: transparent !important;
}
.border-box >>> .el-input {
  width: 60%;
}
.baseLife>>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
.baseLife>>>.el-form--label-left .el-form-item__label {
    font-size: 14px;
    font-weight: normal;
}

.MstateColor{
  color:#606266
}
 .miniWBIG>>>.el-input-group__append{
   border:none;
   border-bottom: 1px solid #ccc;
   background:#fff;
}

</style>
