<template>
  <div class="base baseLife">
    <div class="center">慢病档案</div>
    <el-form ref="form" label-position="left">
      <div class="border-box padd">
        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="档案编号：">
              <!-- <el-input v-model="form.archivesCode" maxlength="50" placeholder="请输入档案编号" :required="true"></el-input> -->
              <span>{{data.archivesCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="姓名：" prop="userName">
              <span>{{data.userName}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="性别：">
              <el-radio-group v-model="data.userSex" :disabled="true">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="年龄：">
              <span>{{data.userAge}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="身份证号：" prop="userCard">
              <span>{{data.userCard}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="医生：">
              <span>{{data.doctorName}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="婚姻状况：">
              <el-radio-group v-model="data.userMaritalStatus" :disabled="true">
                <el-radio :label="0">已婚</el-radio>
                <el-radio :label="1">未婚</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <!-- <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="建档日期">
              <el-date-picker v-model="data.createTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="职业:">
              <span>{{data.userOccupation}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="本人电话：">
              <span>{{data.userPhone}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="健康助理：">
              <span>{{data.healthAssistantName}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="出生日期:">
              <span>{{data.userBirth}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="工作单位：">
              <span>{{data.userWorkCompany}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="联系人电话：">
              <span>{{data.userContactsPhone}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="联系人姓名:">
              <span>{{data.userContacts}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="文化程度：">
              <span>{{data.userEducation}}</span>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="民族：">
              <span>{{data.nationality}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="9" :sm="12" :xs="24">
            <el-form-item label="常住地址：">
              <span>{{data.address}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="申报成功日期：">
              <span>{{data.applyDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="padd">
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="医疗费用支付方式：">
              <el-radio-group v-model="data.medicalPayMethod" :disabled="true">
                <el-radio :label="1">省医保</el-radio>
                <el-radio :label="2">市职工医保</el-radio>
                <el-radio :label="3">市居民医保</el-radio>
                <el-radio :label="4">商业医疗保险</el-radio>
                <el-radio :label="5">全公费</el-radio>
                <el-radio :label="6">自费</el-radio>
                <el-radio :label="7">其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="药物过敏史：">
              <el-radio-group v-model="data.hisDrugAllergy	" :disabled="true">
                <el-radio :label="1">无</el-radio>
                <el-radio :label="2">青霉素</el-radio>
                <el-radio :label="3">磺胺</el-radio>
                <el-radio :label="4">链霉素</el-radio>
                <el-radio :label="5">其他</el-radio>
                <el-input
                  :disabled="true"
                  v-model="data.hisDrugAllergyDesc"
                  class="miniWBIG"
                  v-if="data.hisDrugAllergy == 5"
                ></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="暴露史：">
              <el-radio-group v-model="data.exposureHistory" :disabled="true">
                <el-radio :label="0">无</el-radio>
                <el-radio :label="1">化学品</el-radio>
                <el-radio :label="2">毒物</el-radio>
                <el-radio :label="3">射线</el-radio>
                <el-radio :label="4">其他</el-radio>
                <el-input
                  :disabled="true"
                  v-model="data.exposureHistoryDesc"
                  class="miniWBIG"
                  v-if="data.exposureHistory == 4"
                ></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="遗传病史：">
              <el-radio-group v-model="data.geneticHistory" :disabled="true">
                <el-radio :label="0">有</el-radio>
                <el-radio :label="1">无</el-radio>
                <el-input
                  :disabled="true"
                  v-model="data.geneticHistoryDesc"
                  class="miniWBIG"
                  v-if="data.geneticHistory != 1"
                ></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="情绪：">
              <el-radio-group v-model="data.emotion" :disabled="true">
                <el-radio :label="1">情绪正常</el-radio>
                <el-radio :label="2">易紧张</el-radio>
                <el-radio :label="3">易焦虑</el-radio>
                <el-radio :label="4">易生气</el-radio>
                <el-radio :label="5">易激动</el-radio>
                <el-radio :label="6">易情绪低落</el-radio>
                <el-radio :label="7">压力大</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="padd">
        <el-collapse v-model="activeNames">
          <el-row>
            <h4>一般状况</h4>
            <el-form-item>
              <el-col :md="24" :sm="24" :xs="24">
                <div class="MstateColor">
                  <span>身高</span>
                  <el-input
                    size="mini"
                    class="miniW"
                    :disabled="true"
                    v-model="data.height"
                    type="number"
                  ></el-input>
                  <span>cm</span>
                  <span>体重</span>
                  <el-input
                    size="mini"
                    class="miniW"
                    :disabled="true"
                    v-model="data.weight"
                    type="number"
                  ></el-input>
                  <span>kg</span>
                  <span>体重指数</span>
                  <el-input
                    size="mini"
                    class="miniW"
                    :disabled="true"
                    v-model="data.weightIndex"
                    type="number"
                  ></el-input>
                  <span>kg/m 2</span>
                </div>
              </el-col>
              <el-col :md="24" :sm="24" :xs="24">
                <div class="MstateColor">
                  <span>腰围</span>
                  <el-input
                    size="mini"
                    class="miniW"
                    :disabled="true"
                    v-model="data.waist"
                    type="number"
                  ></el-input>
                  <span>cm</span>
                  <span>臀围</span>
                  <el-input
                    size="mini"
                    class="miniW"
                    :disabled="true"
                    v-model="data.hipline"
                    type="number"
                  ></el-input>
                  <span>cm</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <div class="stateLife">
            <el-row>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="自理情况：">
                  <el-radio-group v-model="data.selfCareAbility" :disabled="true">
                    <el-radio :label="1">自理</el-radio>
                    <el-radio :label="2">部分自理</el-radio>
                    <el-radio :label="3">完全不能自理</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="睡眠情况：">
                  <el-radio-group v-model="data.sleepCondition" :disabled="true">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">易醒</el-radio>
                    <el-radio :label="3">多梦</el-radio>
                    <el-radio :label="4">入眠困难</el-radio>
                    <el-radio :label="5">药物辅助</el-radio>
                    <el-radio :label="6">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="认知情况：">
                  <el-radio-group v-model="data.cognitiveSituation" :disabled="true">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">轻度痴呆</el-radio>
                    <el-radio :label="3">中度痴呆</el-radio>
                    <el-radio :label="4">重度痴呆</el-radio>
                    <el-radio :label="5">其他</el-radio>
                    <el-input
                      class="miniWBIG"
                      :disabled="true"
                      v-model="data.cognitionOther"
                      v-if="data.cognitiveSituation == 5"
                    ></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="大便情况：">
                  <el-radio-group v-model="data.stoolCondition" :disabled="true">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">失禁</el-radio>
                    <el-radio :label="3">便秘</el-radio>
                    <el-radio :label="4">腹泻</el-radio>
                    <el-radio :label="5">其他</el-radio>
                    <el-input
                      class="miniWBIG"
                      :disabled="true"
                      v-model="data.stoolOther"
                      v-if="data.stoolCondition == 5"
                    ></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="小便情况：">
                  <el-radio-group v-model="data.urinationCondition" :disabled="true">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">尿潴留</el-radio>
                    <el-radio :label="3">失禁</el-radio>
                    <el-radio :label="4">其他</el-radio>
                    <el-input
                      class="miniWBIG"
                      :disabled="true"
                      v-model="data.urinationOther"
                      v-if="data.urinationCondition == 4"
                    ></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <h4>既往史</h4>
            <el-col :md="24" :sm="12" :xs="24">
              <el-form-item label="生育史：">
                <el-input type="number" :disabled="true" class="miniW" v-model="data.sonQuit"></el-input>子
                <el-input type="number" :disabled="true" class="miniW" v-model="data.daughterQuit"></el-input>女
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="慢病史：">
                <el-radio-group v-model="data.chronicIllness" :disabled="true">
                  <el-radio :label="2">无</el-radio>
                  <el-radio :label="1">有</el-radio>
                </el-radio-group>
                <div v-if="data.chronicIllness == 1">
                  <template>
                    <el-table border :data="manBTable" style="width: 100%">
                      <el-table-column
                        prop="opsname"
                        label="疾病名称"
                        style="width:6vw;"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <span>{{scope.row.historyName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="确诊时间" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyDate}}</span>
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
                <el-radio-group v-model="data.operationHistory" :disabled="true">
                  <el-radio :label="2">无</el-radio>
                  <el-radio :label="1">有</el-radio>
                </el-radio-group>
                <div v-if="data.operationHistory == 1">
                  <template>
                    <el-table border :data="opsTable" style="width: 100%">
                      <el-table-column
                        prop="opsname"
                        label="手术名称"
                        style="width:6vw;"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <span>{{scope.row.historyName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="手术时间" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyDate}}</span>
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
                <el-radio-group :disabled="true" v-model="data.traumaHistory">
                  <el-radio :label="2">无</el-radio>
                  <el-radio :label="1">有</el-radio>
                </el-radio-group>
                <div v-if="data.traumaHistory == 1">
                  <template>
                    <el-table border :data="traumaTable" style="width: 100%">
                      <el-table-column prop="opsname" label="名称" style="width:6vw;" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="时间" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyDate}}</span>
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
                <el-radio-group :disabled="true" v-model="data.bloodHistory">
                  <el-radio :label="2">无</el-radio>
                  <el-radio :label="1">有</el-radio>
                </el-radio-group>
                <div v-if="data.bloodHistory == 1">
                  <template>
                    <el-table border :data="ftransfusionTable" style="width: 100%">
                      <el-table-column prop="opsname" label="名称" style="width:6vw;" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="opstime" label="时间" align="center">
                        <template slot-scope="scope">
                          <span>{{scope.row.historyDate}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 家族史 -->

          <el-row>
            <h4>家族史</h4>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="父亲：">
                <span>{{data.familyFather}}</span>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="母亲：">
                <span>{{data.familyMother}}</span>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="兄弟姐妹：">
                <span>{{data.familyBrother}}</span>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="子女：">
                <span>{{data.familyChildren}}</span>
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

          <div style="padding:20px 0">
            <h3>生活方式</h3>
          </div>
          <div>
            <h4>体育锻炼：</h4>
            <div class="MstateColor">
              <el-row>
                <el-col :md="24" :sm="24" :xs="24">
                  <el-form-item label="锻炼频率：">
                    <el-radio-group v-model="data.exerciseFrequency" :disabled="true">
                      <el-radio :label="1">每天</el-radio>
                      <el-radio :label="2">每周一次以上</el-radio>
                      <el-radio :label="3">偶尔</el-radio>
                      <el-radio :label="4">不锻炼</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :md="24" :sm="24" :xs="24">
                  <el-form-item>
                    每次锻炼时间：
                    <el-input class="miniW" :disabled="true" v-model="data.exerciseTime"></el-input>坚持锻炼时间：
                    <el-input class="miniW" :disabled="true" v-model="data.adhereExercise"></el-input>锻炼方式：
                    <el-input class="miniW" :disabled="true" v-model="data.exerciseMode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <h4>饮食情况：</h4>
            <el-row>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="口味：">
                  <el-radio-group v-model="data.flavor" :disabled="true">
                    <el-radio :label="1">咸</el-radio>
                    <el-radio :label="2">甜</el-radio>
                    <el-radio :label="3">酸</el-radio>
                    <el-radio :label="4">辣</el-radio>
                    <el-radio :label="5">油腻</el-radio>
                    <el-radio :label="6">清淡</el-radio>
                    <el-radio :label="7">无固定口味</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="饮食结构：">
                  <el-radio-group v-model="data.dietaryStructure" :disabled="true">
                    <el-radio :label="1">荤素均衡</el-radio>
                    <el-radio :label="2">荤食为主</el-radio>
                    <el-radio :label="3">素食为主</el-radio>
                    <el-radio :label="4">纯素食</el-radio>
                    <el-radio :label="5">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="烹饪习惯：">
                  <el-radio-group v-model="data.cookingHabits" :disabled="true">
                    <el-radio :label="1">蒸煮为主</el-radio>
                    <el-radio :label="2">煎炒为主</el-radio>
                    <el-radio :label="3">油炸烧烤为主</el-radio>
                    <el-radio :label="4">煲炖为主</el-radio>
                    <el-radio :label="5">卤制、腌制为主</el-radio>
                    <el-radio :label="6">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="每日食盐量(适合高血压患者)：">
                  <el-radio-group v-model="data.saltConsumption" :disabled="true">
                    <el-radio :label="1">轻(6k)</el-radio>
                    <el-radio :label="2">中(6-12k)</el-radio>
                    <el-radio :label="3">重(>12k)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div>
            <h4>吸烟史：</h4>
            <el-row>
              <el-col :md="12" :sm="24" :xs="24">
                <el-form-item label="吸烟状况：">
                  <el-radio-group v-model="data.smokingStatus" :disabled="true">
                    <el-radio :label="1">从不吸烟</el-radio>
                    <el-radio :label="2">已戒烟</el-radio>
                    <el-radio :label="3">吸烟</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="MstateColor">
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item>
                  日吸烟量：
                  <el-input class="miniW" :disabled="true" v-model="data.smokingVolume"></el-input>烟龄：
                  <el-input class="miniW" :disabled="true" v-model="data.smokingYear"></el-input>戒烟时间：
                  <el-input class="miniW" :disabled="true" v-model="data.smokingCessationTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <h4>饮酒史：</h4>
            <el-row>
              <el-col>
                <el-form-item label="是否戒酒：">
                  <el-radio-group v-model="data.abstinence" :disabled="true">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                    <el-input
                      class="miniWBIG"
                      :disabled="true"
                      v-model="data.abstinenceTime"
                      placeholder="请输入戒酒时间"
                      v-if="data.abstinence == 0"
                    ></el-input>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="饮酒量：">
                  <el-input class="miniWBIG" v-model="data.liquorQuit" placeholder="日饮酒量">
                     <template slot="append">（两）</template>  
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="饮酒频率：">
                  <el-radio-group v-model="data.frequencyOfDrinking" :disabled="true">
                    <el-radio :label="1">从不</el-radio>
                    <el-radio :label="2">偶尔</el-radio>
                    <el-radio :label="4">每天</el-radio>
                    <el-radio :label="3">经常(经常是指平均每周至少1次，连续6个月以上)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="健康知识：">
                  <el-checkbox-group v-model="healthKnowledge" :disabled="true">
                    <el-checkbox name="type" label="1">与医生交流</el-checkbox>
                    <el-checkbox name="type" label="2">电视网络报纸等</el-checkbox>
                    <el-checkbox name="type" label="3">健康知识讲座</el-checkbox>
                    <el-checkbox name="type" label="4">其他</el-checkbox>
                  </el-checkbox-group>
                  <el-input
                    class="miniWBIG"
                    v-model="form.healthKnowledgeDesc"
                    v-if="healthKnowledge == 4"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="中医认知">
                  <el-radio-group v-model="data.tcmCognition" :disabled="true">
                    <el-radio :label="1">信任</el-radio>
                    <el-radio :label="2">不信任</el-radio>
                    <el-radio :label="3">其他</el-radio>
                  </el-radio-group>
                  <el-input
                    class="miniWBIG"
                    :disabled="true"
                    v-model="data.tcmCognitionDesc"
                    v-if="data.tcmCognition == 3"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :md="24" :sm="12" :xs="24">
                <el-form-item label="您认为自己健康状况如何?">
                  <el-radio-group v-model="data.healthAssessment" :disabled="true">
                    <el-radio :label="1">非常好</el-radio>
                    <el-radio :label="2">良好</el-radio>
                    <el-radio :label="3">一般</el-radio>
                    <el-radio :label="4">较差</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :md="24" :sm="24" :xs="24">
                <el-form-item label="在健康方面，您希望我们为您提供什么帮助?">
                  <el-checkbox-group v-model="healthHlep">
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
                <el-col :md="8" :sm="12" :xs="24">
                  <div>以上内容经核实确认,真实,可靠,与本人信息一致</div>
                </el-col>
                <el-col :md="16" :sm="12" :xs="24">
                  <el-form-item label="签字：">
                    本人:
                    <el-input :disabled="true" class="miniW" v-model="sign1" @blur="signBlur(1)"></el-input>/
                    家属:
                    <el-input :disabled="true" class="miniW" v-model="sign2" @blur="signBlur(2)"></el-input>时间：
                    <span>{{data.cteateTime}}</span>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-row>
          </div>
        </el-collapse>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["lentivirus"],
  data() {
    return {
      activeNames: ["1", "2", "3", "4"],
      healthKnowledge: [],
      healthHlep: [],
      data: "",
      list: [],
      sign1: "",
      sign2: "",
      manBTable: [],
      opsTable: [],
      traumaTable: [],
      ftransfusionTable: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    getMYinfo(val) {
      let _this = this;
      _this.$set(_this, "data", val);

      _this.list = _this.data.bsArchivesPastHistories;

      if (_this.data.signature == 1) {
        _this.sign1 = _this.data.sign;
      } else if (_this.data.signature == 2) {
        _this.sign2 = _this.data.sign;
      }
      // 慢病史、输血史、手术史、外伤史判断
      for (let item of _this.list) {
        if (item.historyType == 1) {
          _this.manBTable.push(item);
        }
        if (item.historyType == 2) {
          _this.opsTable.push(item);
        }
        if (item.historyType == 3) {
          _this.traumaTable.push(item);
        }
        if (item.historyType == 4) {
          _this.ftransfusionTable.push(item);
        }
      }

      // for(let item of _this.list){

      // }
      // for(let item of _this.list){

      // }
      // for(let item of _this.list){

      // }
      this.chansformbox();
    },
    chansformbox() {
      let _this = this;
      let formvalue = {};
      formvalue.healthKnowledge = _this.data.healthKnowledge;
      formvalue.healthHlep = _this.data.healthHlep;
      for (const item in formvalue) {
        if (formvalue[item] != null) {
          this[item] = formvalue[item].split("/");
        }
      }
    }
  }
};
</script>

<style scoped>
.center {
  background-color: transparent;
}
.el-collapse {
  border: none;
}
.float-bing {
  list-style: none;
  padding: 0;
  width: 900px;
}
.float-bing > li {
  float: left;
  font-size: 16px;
  padding-left: 14px;
}
.family >>> .el-select .el-tag__close.el-icon-close {
  display: none !important;
}
.family >>> .el-select .el-tag {
  background-color: transparent !important;
}
.border-box >>> .el-input {
  width: 50%;
}
</style>
