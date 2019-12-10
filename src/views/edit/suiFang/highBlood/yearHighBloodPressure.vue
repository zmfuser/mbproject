<template>
    <div class="base">
        <div class="allhightbp">
            <el-form ref="form">
                <h3>高血压病年度评估表</h3>
                <el-row>
                    <!-- <el-form-item label="姓名">
                        <el-col :md="9" :sm="12" :xs="24">
                            <el-input type="text" v-model="userName"></el-input>
                        </el-col>
                    </el-form-item> -->
                </el-row>
                <el-row :gutter="20">
                    <el-form-item>
                        <el-col :md="4" :sm="12" :xs="24">
                            <div>时间</div>
                        </el-col>
                        <el-col :md="20" :sm="12" :xs="24">
                            <el-date-picker v-model="rDay" type="date"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-form-item>
                        <el-col :md="4" :sm="12" :xs="24">
                            <div>危险因素及分层</div>
                        </el-col>
                        <el-col :md="10" :sm="12" :xs="24">
                            <el-radio v-model="allRadio.way" label="无变化"></el-radio>
                            <el-radio v-model="allRadio.way" label="有变化"></el-radio>
                        </el-col>
                        <el-col :md="10" :sm="12" :xs="24">
                            增多的危险因素
                            <el-input></el-input>
                            减少的危险因素
                            <el-input></el-input>
                            当前危险分层
                            <el-input></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-form-item>
                        <el-col :md="4" :sm="12" :xs="24">
                            <div>生活方式</div>
                        </el-col>
                        <el-col :md="10" :sm="12" :xs="24">
                            <el-radio v-model="allRadio.way" label="无变化"></el-radio>
                            <el-radio v-model="allRadio.way" label="有变化"></el-radio>
                        </el-col>
                        <el-col :md="10" :sm="12" :xs="24">
                            吸烟
                            <el-input></el-input>
                            摄盐量
                            <el-input></el-input>
                            运动
                            <el-input></el-input>
                            睡眠
                            <el-input></el-input>
                            心理
                            <el-input></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-col :md="4" :sm="12" :xs="24">
                            <div>年度内伴随临床疾病</div>
                        </el-col>
                        <el-col :md="20" :sm="12" :xs="24">
                            <el-input type="textarea" rows="2"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-form-item>
                        <el-col :md="4" :sm="24" :xs="24">
                            <div>辅助检查</div>
                        </el-col>
                        <el-col :md="10" :sm="24" :xs="24">
                            肝功能：
                            <el-input placeholder="请输入内容" v-model="auxiliary.Cereal_third">
                                <template slot="prepend">血清谷丙转氨酶</template>
                                <template slot="append">u/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.straw">
                                <template slot="prepend">血清谷草转氨酶</template>
                                <template slot="append">mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.all">
                                <template slot="prepend"> 总胆红素</template>
                                <template slot="append">ummol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood">
                                <template slot="prepend"> 空腹血糖</template>
                                <template slot="append">mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood">
                                <template slot="prepend">餐后2小时血糖</template>
                                <template slot="append">mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood">
                                <template slot="prepend">糖化血红蛋白</template>
                                <template slot="append">%</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood">
                                <template slot="prepend">血同型膀胱氨酸</template>
                                <template slot="append">mmol/l</template>
                            </el-input>


                            血脂
                            <el-input placeholder="请输入内容" v-model="auxiliary.combination">
                                <template slot="prepend"> 结合胆红素</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>

                            肾功：
                            <el-input placeholder="请输入内容" v-model="auxiliary.Serum_creatinine">
                                <template slot="prepend">血肌酐</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood_urea">
                                <template slot="prepend"> 血尿素氨</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Blood_uric">
                                <template slot="prepend"> 血尿酸</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                        </el-col>
                        <el-col :md="10" :sm="24" :xs="24">
                            血脂：<el-input placeholder="请输入内容" v-model="auxiliary.cholesterol">
                                <template slot="prepend">总胆固醇</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.triglycerides">
                                <template slot="prepend"> 甘油三酯</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.Low_density">
                                <template slot="prepend">低密度脂蛋白胆固醇</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.High_density">
                                <template slot="prepend"> 高密度脂蛋白胆固醇</template>
                                <template slot="append">u/mmol/l</template>
                            </el-input>
                            <el-input placeholder="请输入内容" v-model="auxiliary.other">
                                <template slot="prepend">其他</template>
                            </el-input>
                            心电图
                            <el-checkbox-group v-model="classification">
                                <el-checkbox label="正常" name="type"></el-checkbox>
                                <el-checkbox label="异常" name="type"></el-checkbox>
                            </el-checkbox-group>
                            异常描述：
                            <el-input></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>


                <el-row>
                    <el-form-item>
                        <el-col :md="4" :sm="24" :xs="24">
                            <div>患者自我评价</div>
                        </el-col>
                        <el-col :md="20" :sm="24" :xs="24">
                            <el-checkbox-group v-model="accordingCheckedList">
                                <el-checkbox label="1">良好</el-checkbox>
                                <el-checkbox label="2">一般</el-checkbox>
                                <el-checkbox label="3">差</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userName: '',
                rDay: '',
                age: '',
                tableData: [],
                checked: true,
                allRadio: {

                    way: '',
                    medicine: '',
                    medicName: '',
                    Adverse_reactions: '',
                },
                radio2: 2,
                classification: [],
                symptoms: [],
                danger: [],
                dangerOther: '',


                clinicalDisease: [],
                signs: {
                    bloodPressure: '',
                    heartRate: '',
                    other: '',
                },
                life: {
                    smoking: '',
                    smokingTarget: '',
                    drinking: '',
                    drinkingTarget: '',
                    sports: '',
                    target: '',
                },
                saltCheckedList: [],
                psychologicalCheckedList: [],
                sleepCheckedList: [],
                accordingCheckedList: [],
                auxiliary: {
                    Blood: '',
                    Cereal_third: '',
                    straw: '',
                    all: '',
                    combination: '',
                    Serum_creatinine: '',
                    Blood_urea: '',
                    Blood_uric: '',
                    cholesterol: '',
                    triglycerides: '',
                    Low_density: '',
                    High_density: '',
                    other: '',
                },
                Drug: {
                    drug1: '',
                    usage1: '',
                    drug2: '',
                    usage2: '',
                    drug3: '',
                    usage3: '',
                },
                hospital: {
                    time: '',
                    category: '',
                },
                doctor: {
                    doctor: '',
                    Health: '',
                },
                textarea: '',
            }
        },
        methods: {

        },
    }
</script>
<style lang="">
    /* #allHighBP{
        width: 100%;
        border:1px solid red;
    }
    .allhightbp{
        
    } */
</style>