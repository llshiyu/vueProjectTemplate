<template>
    <div class="login-background">
        <div class="login-box">
            <el-form label-position="right" :model="formLogin" :rules="loginRules" ref="loginForm">
                <h1 class="login-title">管理平台</h1>
                <el-form-item  prop="username">
                    <el-input maxlength="11" v-model.trim="formLogin.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input maxlength="14" type="password" @keyup.enter.native="loginButton()"
                              onpaste="return false" v-model.trim="formLogin.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="code"  class="clearfix">
                    <el-input class="code-input fl" maxlength="4" v-model.trim="formLogin.code"
                              @keyup.enter.native="loginButton()" placeholder="请输入验证码"></el-input>
                    <img :src="codeImg" class="code-img fl cursor-pointer" @click="getCode()">
                </el-form-item>
                <el-form-item class="btn-item">
                    <el-button type="primary" @click="loginButton()">登录</el-button>
                </el-form-item>
                <div class="login-tips">
                    查看 <span class="cursor-pointer tips-txt" @click="showUserDialog()">《用户须知》</span>
                </div>
                <div class="foot-tips">
                    主管单位：北京市机关事务管理局
                </div>
            </el-form>
        </div>
        <div class="login-pop"></div>
        <!--用户须知弹窗-->
        <div class="login-dialog" v-if="dialogUser">
            <div class="dialog-title">用户须知</div>
            <div class="dialog-cont">
                <p>平台供应商需根据经营性质，持有国家或行业规定的证照；需拥有良好的商业信誉，达到与企业资质相应的信用等级，且无重大不良信用记录；需在食品生产、仓储、销售、配送、售后及信息化对接等方面具备一定的实力，能够很好地为采购单位提供服务，具有承担相应风险与责任的能力；提供的食品应符合食品安全法规定的食品安全标准；在食品采购单价上能够给予相应的优惠，且价格曲线保持相对平稳。</p>
                <p>为保证系统用户和信息安全，用户名需实名登录，不允许泄露个人账户信息给其他人。供应商提供的信息需经机管局审核后才可对外发布。</p>
            </div>
            <div class="dialog-btn"><el-button @click="closeUserDialog">返回登录</el-button></div>
        </div>
        <!--用户须知弹窗结束-->
    </div>
</template>
<script>
    import {_setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5} from '../../assets/js/util'

    export default {
        data() {
            var regularPwd = /^(?![0-9]+$)[0-9A-Za-z]{6,14}$/; // 密码验证规则，由字母或字母和数字组合
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {

                    callback();
                }
            };
            var validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {

                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {

                    callback();
                }
            };
            return {
                formLogin: {
                    username: '', // 用户名
                    password: '', // 密码
                    code: '' // 验证码
                }, // 登录form值
                loginRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {validator: validatePwd, trigger: 'blur'}
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        {validator: validateCode, trigger: 'blur'}
                    ],
                }, // 登录校验
                dialogUser: false,
                codeImg: '',
                codeKey:''
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                if (this.$route.name == 'login') {
                    _setTitle('网上交易系统');
                }
                this.clearForm();
                this.getCode();
            },
            getCode() {
                this.$api.common.getCode().then(res => {
                    if (res.meta.code == 0) {
                        this.codeImg = 'data:image/png;base64,'+res.data.base64;
                        this.codeKey = res.data.key
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 获取验证码
            showUserDialog(){
                this.dialogUser = true;
            }, // 展示用户须知弹窗
            closeUserDialog(){
                this.dialogUser = false;
            }, // 关闭用户须知弹窗
            loginButton() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        // console.log(this.formLogin.password, calcuMD5(this.formLogin.password));
                        this.loginAjax();
                    } else {
                        return false;
                    }
                });
            }, // 点击登录
            loginAjax() {
                let param = {
                    account: this.formLogin.username,
                    password: this.formLogin.password,
                    validateCode: this.formLogin.code,
                    key: this.codeKey
                };
                this.$api.common.login(param).then(res => {
                    if (res.meta.code == 0) {
                        _sessionStorage('type', res.data.type); // 0管理员 1采购端 2供应商端
                        _sessionStorage('user', res.data.name);
                        _sessionStorage('contact', res.data.contact); // 默认收货人
                        _sessionStorage('contactPhone', res.data.contactPhone); // 默认收货人电话
                        _sessionStorage('defaultAddressName', res.data.defaultAddressName); // 小食堂地址
                        _sessionStorage('defaultCanteenName', res.data.defaultCanteenName); // 小食堂地址a区
                        _sessionStorage('userId', res.data.id);
                        _sessionStorage('sessionId',res.data.sessionId);
                        _sessionStorage('specifications',res.data.specifications + ""); // 0大食堂 1小食堂
                        // console.log(res.data.type)
                        if (res.data.type == 1) { // 采购端
                            this.$router.push({
                                path: '/canteenHome',
                            })
                        } else if (res.data.type == 2) { // 供应商端
                            this.$router.push({
                                path: '/supplierHome',
                            })
                        } else {
                            this.$router.push({
                                path: '/user',
                            })
                            console.log(res.data.type)
                        }
                        // setTimeout(()=>{
                        //     this.clearForm()
                        // },0)
                    }else if(res.meta.code==200009){
                        this.getCode();
                        this.$message.error({
                            message: '验证码输入错误',
                            duration: 1000,
                            center: true
                        });
                        this.formLogin.code = ''
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })

            }, // 登录ajax
            clearForm(){
                this.$refs['loginForm'].resetFields();
            } // 表单重置
        }
    }
</script>
<style lang="less" scoped>
    .login-background {
        height: 100%;
        background: url("../../assets/img/loginBg.png") repeat-x;
        background-size: cover;  //只支持IE9+
        -webkit-background-size: cover; //webkit核心
        -moz-background-size: cover; //FF核心
        -o-background-size: cover; //应该是Opera核心吧，反正不是IE的，就先不管它了
        position: relative;
        overflow: auto;
        padding: 15.6% 16.3% 17.3% 20.2%;
        .login-box ,.login-dialog {
            z-index: 9;
            position: absolute;
            /*top: 169px;*/
            /*left: 387px;*/
            top: 15.6%;
            bottom: 17.3%;
            left: 20.2%;
            right: 51.4%;
            width: 568px;
            height: 730px;
            /*width: 29.6%;*/
            /*height: 67.6%;*/
            background: #E8F1FC;
            box-shadow: 0 12px 22px 0 rgba(26,112,192,0.17);
            border-radius: 25px;
            text-align: center;
            /*padding: 125px 104px 89px;*/
            padding: 125px 84px 89px;
            .login-title {
                font-family: FZZZHONGJW--GB1-0;
                font-size: 40px;
                /*font-size: 5.2%;*/
                color: #232F49;
                margin-bottom: 73px;
            }
            .el-form-item {
                margin-bottom: 30px;
            }
            .code-input {
                /*width: 216px;*/
                width: 252px;
            }
            .code-img {
                width: 134px;
                height: 54px;
                margin-left: 10px;
            }
            .login-tips{
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #9DAFB9;
                letter-spacing: 0;
                .tips-txt{
                    color: #009FFF;
                }
            }
            .foot-tips{
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #6699FF;
                margin-top: 63px;
            }
        }
        .login-dialog{
            .dialog-title{
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #365474;
                letter-spacing: 0;
                text-align: center;
                line-height: 24px;
                margin-bottom: 38px;
            }
            .dialog-cont{
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #527AA0;
                letter-spacing: 0;
                line-height: 30px;
                text-align: left;
                height: 376px;
                overflow: auto;
                p{
                    text-indent: 20px;
                }
            }
            .dialog-btn{
                margin-top: 38px;
                button{
                    border: 1px solid #009FFF;
                    box-shadow: 0 5px 14px 0 rgba(50,110,255,0.20);
                    border-radius: 2px;
                    color: #009FFF;
                }
            }
        }
        .login-pop{
            background: url("../../assets/img/loginPopBg.png") repeat-x;
            background-size: cover;  //只支持IE9+
            -webkit-background-size: cover; //webkit核心
            -moz-background-size: cover; //FF核心
            -o-background-size: cover; //应该是Opera核心吧，反正不是IE的，就先不管它了
            position: absolute;
            /*top: 251px;*/
            /*left: 822px;*/
            top: 23.2%;
            bottom: 22.9%;
            left: 42.8%;
            right: 16.3%;
            width: 807px;
            height: 588px;
            /*width: 42%;*/
            /*height: 54.4%;*/
            border-radius: 25px;
        }
    }
</style>
<style lang="less">
    .login-box {
        .el-form-item__error{
            background: url("../../assets/img/redTips.png") no-repeat 2px 4px;
            background-size: 14px;
            padding-left: 24px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FB6041;
            letter-spacing: 0;
        }
        .el-form-item__content {
            /*width: 360px;*/
            width: 100%;
            height: 54px;
            /*width: 18.8%;*/
        }
        .el-form-item__label {
            color: #fff;
        }
        .el-input__inner {
            /*width: 360px;*/
            width: 100%;
            height: 54px;
        }
        .code-input{

        }
        .btn-item {
            margin-top: 25px;
            height: 54px;
            .el-form-item__content {
                margin-left: 0 !important;
                width: 100%;
                height: 100%;
                .el-button {
                    width: 100%;
                    height: 100%;
                    font-family: PingFangSC-Regular;
                    font-size: 20px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 14px;
                }
            }
        }
        .code-input {
            input {
                width: 100%;
            }
        }
    }
</style>