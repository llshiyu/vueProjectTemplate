<template>
    <div class="supplier-receiver-detail" v-if="response">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/supplierReceiverOrder' }">买家收货单</el-breadcrumb-item>
            <el-breadcrumb-item>买家收货单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-detail-box">
            <div class="order-title-box clearfix">
                <div class="order-title fl">买家收货单详情</div>
                <div class="order-title-square fl"></div>
            </div>
            <div id="printContent">
                <div class="print-content">
                    <ul class="order-info clearfix">
                        <li class="">订单号：{{detailData.orderNum}}</li>
                        <li class="">订单时间：{{detailData.createTime | analyseTime('6')}}</li>
                        <li class="">供应商：{{detailData.supplierName}}</li>
                        <li class="">供应商联系人：{{detailData.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{detailData.supplierContactPhone}}</li>
                        <li class="">收货人：{{detailData.receiverContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{detailData.receiverContactPhone}}</li>
                        <li class="">收货地址：{{detailData.receiverAddress}} </li>
                        <li class="">收货时间：{{detailData.takeTime | analyseTime('6')}}</li>
                        <li class="">送达时间：{{detailData.sendToTime | analyseTime('6')}}</li>
                        <li class="li-msg">采购方留言：{{detailData.leaveMessage}}</li>
                    </ul>
                    <div class="detail-table-box">
                        <div class="table-thead flex-box">
                            <div class="table-th flex-1 padding-left22" style="min-width: 110px">商品信息</div>
                            <div class="text-align-center table-th width130">商品种类</div>
                            <div class="text-align-center table-th width130">单价</div>
                            <div class="text-align-center table-th width150">需求量</div>
                            <div class="text-align-center table-th width150">实际收货量</div>
                            <div class="text-align-center table-th width150">实付金额</div>
                        </div>
                        <div class="table-tbody">
                            <div class="cont-tr flex-box" v-for="(item,index) of detailData.subOrderGoodsList" :key="index">
                                <div class="flex-1 cont-td shop-name padding-left22 border-bottom" style="min-width: 110px">
                                    {{item.goodsName}}
                                </div>
                                <div class="text-align-center cont-td width130 border-bottom">{{item.goodsTypeName}}
                                </div>
                                <div class="text-align-center cont-td width130 border-bottom">￥{{item.goodsPrice.toFixed(2)}}</div>
                                <div class="text-align-center cont-td width150 border-bottom">{{item.goodsNeedNum}}
                                </div>
                                <div class="text-align-center cont-td border-right width150 border-bottom">
                                    {{item.goodsRealNum}}
                                </div>
                                <div class="text-align-center cont-td width150"
                                     :class="index===detailData.subOrderGoodsList.length-1?'border-bottom':''">
                                    {{index===0?'￥'+detailData.realTotalPrice.toFixed(2):''}}
                                </div>
                            </div>
                            <div class="cont-foot">
                                <span class="foot-div">商品总数<span
                                        class="price-size">{{detailData.realTotalNum}} 件</span></span>
                                <span class="foot-div">总实付款<span class="price-size"><span class="small-size">￥</span>{{detailData.realTotalPrice.toFixed(2)}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <el-button type="primary" @click="printOrder()">打印订单</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {analyseTime, timeDiff} from '../../../assets/js/util'
    import '../../../assets/js/printThis'

    export default {
        name: "supplierHistoryOrderDetail",
        components: {},
        data() {
            return {
                //"takeStatus": "是否确认收货-0待收货1采购方确认收货2供应方确认收货4.已取消",
                detailData: {}, // 订单列表
                response: false, // 加载完成
            }
        },
        mounted() {
            this.init()
        },
        computed: {}, // 计算属性
        filters: {}, // 过滤器
        methods: {
            init() {
                if(!this.$route.params.id){
                    this.$router.push({
                        path: '/supplierReceiverOrder',
                    })
                }else{
                    this.getOrderList();
                }
            },
            getOrderList() {
                let param = {
                    "subOrderId": this.$route.params.id // 小订单id
                };
                this.$api.canteen.getOrderDetail(param).then(res => {
                    if (res.meta.code == 0) {
                        this.detailData = res.data;
                        this.response = true;
                    }else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 获取订单列表
            printOrder() {
                $("#printContent").printThis({
                    debug: true,
                    importCSS: true,
                    importStyle: true,
                    printContainer: true,
                    loadCSS: "/main.css",
                    pageTitle: "订单详情",
                    removeInline: false,
                    printDelay: 333,
                    header: null,
                    formValues: true
                });
            }, // 打印订单
        }
    }
</script>

<style lang="less" scoped>
    .limit-line(@line) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: @line;
        overflow: hidden;
    }

    .supplier-receiver-detail {
        .order-detail-box {
            margin-top: 40px;
            border: 1px solid #EFEFEF;
            padding: 24px 50px;
        }
        .order-title {
            width: 140px;
        }
        .btn-box {
            margin-top: 30px;
            text-align: right;
            .el-button {
                background: #409EFF;
                border-radius: 2px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                line-height: 20px;
            }
        }
    }
    .print-content{
        .order-info {
            background: #F7F7F7;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #434B6C;
            line-height: 30px;
            padding: 16px 20px;
            li {
                float: left;
                /*width: 24%;*/
                min-width: 214px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                margin-right: 10px;
            }
            .li-msg {
                display: block;
                width: 100%;
            }
        }
        .detail-table-box {
            border-bottom: 1px solid #EAEDF1;
            margin-top: 20px;
            .width130 {
                width: 130px;
            }
            .width150 {
                width: 150px;
            }

            .border-bottom {
                border-bottom: 1px solid #EAEDF1;
            }
            .border-right {
                border-right: 1px solid #EAEDF1;
            }
            .has-border {
                border: 1px solid #EAEDF1;
            }
            .padding-left22 {
                padding-left: 22px !important;
            }
            .table-thead {
                background: #F6F5F5;
                padding: 12px 0;
                .table-th {
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 16px;
                }
            }
            .cont-tr {
                &:nth-of-type(2n) {
                    .cont-td {
                        background: #FCFCFC;
                        &:last-child {
                            background: #ffffff;
                        }
                    }
                }
                .cont-td {
                    padding: 20px 0 14px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #777E8C;
                    line-height: 20px;
                }
                .td-btn {
                    color: #0099FF;
                }
            }
            .shop-name {

            }
            .cont-foot {
                text-align: right;
                padding: 20px 0;
                .foot-div {
                    margin-right: 30px;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #7E98AC;
                }
            }
        }
    }
</style>
<style lang="less">
</style>