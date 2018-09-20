<template>
    <div class="canteen-confirm-success">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>采购货源</el-breadcrumb-item>
            <el-breadcrumb-item>我的订货单</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="success">
            <div class="step-box">
                <div class="steps">
                    <el-steps :space="158" :active="3" finish-status="success">
                        <el-step title="我的订货单" class="steps-word"></el-step>
                        <el-step title="确认订单信息" class="steps-word"></el-step>
                        <el-step title="成功提交订单" class="steps-word"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="cont-box">
                <div class="middle-box">
                    <img src="../../../assets/img/success.png" class="cont-img">
                    <div class="cont-txt green-txt">已成功提交订单</div>
                    <div class="cont-txt">商品订单号：{{supplierId}}</div>
                    <div class="cont-txt grey-txt">可在订单管理中我的订单中查看</div>
                    <el-button class="cont-btn" @click="goPage('canteenOrder')">去查看</el-button>
                </div>
                <div class="tips-box"> 系统将在10S后自动跳转至采购货源首页 <span> {{countdownTime}} S</span></div>
            </div>
        </div>
        <div v-else>
        <div class="step-box">
            <div class="steps">
                <el-steps :space="158" :active="2" finish-status="success">
                    <el-step title="我的订货单" class="steps-word"></el-step>
                    <el-step title="确认订单信息" class="steps-word"></el-step>
                    <el-step title="成功提交订单" class="steps-word"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="cont-box">
            <div class="middle-box error-box">
                <img src="../../../assets/img/error.png" class="cont-img">
                <div class="cont-txt red-txt">订单提交失败</div>
                <div class="cont-txt grey-txt no-margin">订单提交失败，请点击重新提交按钮</div>
                <div class="cont-txt grey-txt">返回至确认订单页重新提交订单</div>
                <el-button class="cont-btn" @click="goPage('canteenConfirmOrder')">重新提交</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "canteen-confirm-success",
        data() {
            return {
                success: false,
                countdownTime: 10,
                setInt: null,
                supplierId: "",
            }
        },
        mounted() {
            this.supplierId = this.$route.params.supplierId;
            console.log(this.supplierId,999);
            if( this.supplierId == "" || this.supplierId===null){
                console.log('空 null',777);
                this.success = false;
                return false;
            }else if(this.supplierId == undefined){
                this.goPage('canteenPurchase');
                console.log('undefined',888)
            }else{
                this.success = true;
                this.init();
            }
        },
        methods: {
            init() {
                if(this.success){
                    this.setInt = setInterval(() => {
                        this.countdownTime--;
                        if (this.countdownTime <= 0) {
                            clearInterval(this.setInt);
                            this.countdownTime = 0;
                            this.goPage('canteenPurchase');
                        }
                    }, 1000)
                }
            },
            goPage(jumpName) {
                clearInterval(this.setInt);
                this.$router.push({
                    'name': jumpName,
                })
            }, // 跳转
            destroyed: function () {
                clearInterval(this.setInt);
            },//离开当前页面后执行
        }
    }
</script>

<style lang="less" scoped>
    .canteen-confirm-success {
        .step-box {
            display: flex;
            justify-content: center;
            margin-bottom: 94px;
            .steps {
                margin-top: 50px;
                min-width: 400px;
            }
        }
        .cont-box {
            text-align: center;
            .middle-box {
                margin-bottom: 100px;
                .cont-img {
                    width: 112px;
                    height: 112px;
                    margin-bottom: 30px;
                }
                .cont-txt {
                    font-family: PingFangSC-Regular;
                    font-size: 20px;
                    color: #3D474F;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .green-txt {
                    color: #8BC34A;
                }
                .grey-txt {
                    color: #999999;
                }
                .cont-btn {
                    width: 100px;
                    height: 40px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #409EFF;
                    line-height: 40px;
                    padding: 0;
                    border-radius: 2px;
                    text-align: center;
                    border: 1px solid #409EFF;
                }
            }
            .error-box {
                .grey-txt {
                    font-size: 16px;
                    color: #999999;
                    text-align: center;
                    line-height: 26px;
                }
                .red-txt {
                    color: #FB6041;
                }
                .no-margin {
                    margin-bottom: 0;
                }
            }
            .tips-box {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999999;
                text-align: center;
                line-height: 20px;
                span {
                    color: #409EFF;
                }
            }
        }
    }
</style>
<style lang="less">
    .canteen-confirm-success {

    }
</style>