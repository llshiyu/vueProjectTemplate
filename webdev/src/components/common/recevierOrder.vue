<template>
    <div>
        <div v-if="!isOrder">
            <!--查看收货单弹窗-->
            <!--供应商端 处理中订单 查看 有确认按钮，没有供应商 联系人 电话 -->
            <!--供应商端 历史订单 查看 没有有确认按钮，没有供应商 联系人 电话 -->
            <!--食堂端 历史订单 查看 没有有确认按钮，有供应商 联系人 电话， 有状态 -->
            <el-dialog :visible.sync="dialogOrder" class="look-receiver-dialog" @close="closeDialog">
                <div class="dialog-title" slot="title">
                    收货单
                </div>
                <div class="dialog-cont-title">
                    <i>
                        <span style="">{{myOrderList.createTime | analyseTime('6')}}</span>
                        <span style="">订单号：{{myOrderList.orderNum}}</span>
                        <span style="">送达时间：{{myOrderList.sendToTime | analyseTime('6')}}</span>
                        <span style="">收货时间：{{myOrderList.takeTime | analyseTime('6')}}</span>
                    </i>
                    <!--这里要判断是否展示-->
                    <i v-if="!isSupplier">
                        <span class="" style="":title="myOrderList.supplierName">供应商：{{myOrderList.supplierName,20 | textEllipsis}}</span>
                        <span class="" style="">联系人：{{myOrderList.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{myOrderList.supplierContactPhone}}</span>
                    </i>
                    <i v-else>
                        <span class="" style="">收货人：{{myOrderList.receiverContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{myOrderList.receiverContactPhone}}</span>
                        <span :title="myOrderList.receiverAddress">收货地址：{{myOrderList.receiverAddress,30 |
                            textEllipsis}}</span>
                    </i>
                    <!--这里-->
                </div>
                <div class="detail-table-box">
                    <div class="table-thead flex-box">
                        <div class="table-th flex-1 padding-left30">商品信息</div>
                        <div class="text-align-center table-th width100">商品种类</div>
                        <div class="text-align-center table-th" style="width: 130px">单价</div>
                        <div class="text-align-center table-th width100">需求量</div>
                        <div class="text-align-center table-th width100">实际收货量</div>
                        <div class="text-align-center table-th" style="width: 130px">实付金额</div>
                    </div>
                    <div class="table-tbody">
                        <div class="cont-tr flex-box" v-for="(item,index) of myOrderList.subOrderGoodsList"
                             :key="index">
                            <div class="flex-1 cont-td padding-left30 border-bottom clearfix flex-box">
                                <img :src="item.goodsMainPic" class="shop-img fl" v-if="item.goodsMainPic">
                                <img src="../../assets/img/noShop.png" class="shop-img fl" v-else>
                                <div class="shop-name fl flex-1" :title="item.goodsName">{{item.goodsName}}</div>
                            </div>
                            <div class="text-align-center cont-td width100 border-bottom">
                                <div class="td-txt">{{item.goodsTypeName}}</div>
                            </div>
                            <div class="text-align-center cont-td border-bottom" style="width: 130px">
                                <div class="td-txt price-size"><span class="small-size">￥</span>{{item.goodsPrice.toFixed(2)}}
                                </div>
                            </div>
                            <div class="text-align-center cont-td width100 border-bottom">
                                <div class="td-txt">{{item.goodsNeedNum}}</div>
                            </div>
                            <div class="text-align-center cont-td border-right width100 border-bottom">
                                <div class="td-txt">{{item.goodsRealNum}}</div>
                            </div>
                            <div class="text-align-center cont-td"
                                 :class="index===myOrderList.subOrderGoodsList.length-1?'border-bottom':''" style="width: 130px">
                                <div class="td-txt price-size">{{index===0?'￥'+myOrderList.realTotalPrice.toFixed(2):''}}</div>
                            </div>
                        </div>
                        <div class="cont-foot" v-if="!isSupplier">
                            <div class="dialog-tips">
                                <span>收货人：{{myOrderList.receiverContact}}</span>
                                <span>联系方式：{{myOrderList.receiverContactPhone}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dialog-footer" slot="footer">
                    <div class="dialog-count">
                        <span>收货数量：<i class="price-size">{{myOrderList.realTotalNum}}</i> 件</span>
                        <span style="margin-right: 0">实付款：<i class="price-size"><span class="small-size">￥</span>{{myOrderList.realTotalPrice.toFixed(2)}}</i></span>
                    </div>
                    <!--这里判断展示状态还是按钮或者不展示-->
                    <!--takeStatus 0-未确认收货  1-采购商确认收货  2-供应商收货-->
                    <!-- 供应商已确认 的样式加类名 dialog-status-confirm  -->
                    <div v-if="!isSupplier" class="margin-top10"
                         :class="myOrderList.takeStatus==2?'dialog-status-confirm':'dialog-status'">
                        状态：{{myOrderList.takeStatus==2?'供应商已确认':'待供应商确认'}}
                    </div>
                    <div class="dialog-btn" v-if="isSupplier&&!isComplete">
                        <el-button type="primary" @click="submitOrder(myOrderList)">确认</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--查看收货单弹窗结束-->
        </div>
        <div v-else>
            <!--查看订单弹窗-->
            <!--供应商端 买家收货单 查看 没有供应商 -->
            <!--食堂端 我的收货单 查看  有供应商  -->
            <el-dialog :visible.sync="dialogOrder" class="look-order-dialog" @close="closeDialog">
                <div class="dialog-title" slot="title">
                    订单
                </div>
                <div class="dialog-cont-title">
                    <span style="">{{myOrderList.createTime | analyseTime('6')}}</span>
                    <span style="">订单号：{{myOrderList.orderNum}}</span>
                    <span style="">送达时间：{{myOrderList.sendToTime | analyseTime('6')}}</span>
                    <i v-if="!isSupplier">
                        <span style="">供应商：{{myOrderList.supplierName,20 | textEllipsis}}</span>
                        <span class="" style="">联系人：{{myOrderList.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{myOrderList.supplierContactPhone}}</span>
                    </i>
                    <i v-else>
                        <span class="" style="">收货人：{{myOrderList.receiverContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{myOrderList.receiverContactPhone}}</span>
                        <span :title="myOrderList.receiverAddress">收货地址：{{myOrderList.receiverAddress,30 |
                            textEllipsis}}</span>
                    </i>
                </div>
                <div class="detail-table-box">
                    <div class="table-thead flex-box">
                        <div class="table-th flex-1 padding-left30">商品信息</div>
                        <!--<div class="text-align-center table-th width100">商品种类</div>-->
                        <div class="text-align-center table-th" style="width: 130px">单价</div>
                        <div class="text-align-center table-th width100">数量</div>
                        <div class="text-align-center table-th" style="width: 130px">总金额</div>
                    </div>
                    <div class="table-tbody">
                        <div class="cont-tr flex-box" v-for="(item,index) of myOrderList.subOrderGoodsList"
                             :key="index">
                            <div class="flex-1 cont-td padding-left30 border-bottom clearfix flex-box">
                                <img :src="item.goodsMainPic" class="shop-img fl" v-if="item.goodsMainPic">
                                <img src="../../assets/img/noShop.png" class="shop-img fl" v-else>
                                <div class="shop-name fl flex-1" :title="item.goodsName">{{item.goodsName}}</div>
                            </div>
                            <!--<div class="text-align-center cont-td width100 border-bottom"><div class="td-txt">{{item.goodsTypeName}}</div></div>-->
                            <div class="text-align-center cont-td border-bottom" style="width: 130px">
                                <div class="td-txt price-size"><span class="small-size">￥</span>{{item.goodsPrice.toFixed(2)}}
                                </div>
                            </div>
                            <div class="text-align-center cont-td width100 border-bottom border-right">
                                <div class="td-txt">{{item.goodsNeedNum}}</div>
                            </div>
                            <div class="text-align-center cont-td" style="width: 130px"
                                 :class="index===myOrderList.subOrderGoodsList.length-1?'border-bottom':''">
                                <div class="td-txt">
                                    <span v-if="index===0" class="price-size"><span class="small-size">￥</span>{{myOrderList.needTotalPrice.toFixed(2)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dialog-footer" slot="footer">
                    <div class="dialog-count">
                        <span>商品总数：<i class="price-size">{{myOrderList.needTotalNum}} 件</i></span>
                        <span style="margin-right: 0">总金额：<i class="price-size"><span class="small-size">￥</span>{{myOrderList.needTotalPrice.toFixed(2)}}</i></span>
                    </div>
                </div>
            </el-dialog>
            <!--查看订单弹窗结束-->
        </div>
    </div>

</template>

<script>
    import {analyseTime, timeDiff} from '../../assets/js/util'

    export default {
        name: "recevierOrder",
        props: ['myOrderList', 'dialogOrder', 'isOrder', 'isSupplier', 'isComplete'], // isOrder-是否是订单 isSupplier-是否是供应商端  isComplete-供应商的已完成的进货单
        data() {
            return {}
        },
        methods: {
            closeDialog() {
                this.$emit('closeRecevierOrder')
            }, // 关闭弹窗
            submitOrder(item) {
                this.$emit('submitOrder', item)
            } // 供应商端 处理中订单 点确定
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

    .look-receiver-dialog, .look-order-dialog {
        .dialog-title {
            font-family: PingFangSC-Medium;
            font-size: 20px;
            color: #4A4A4A;
            letter-spacing: 0;
            line-height: 20px;
        }
        .dialog-cont-title {
            padding-bottom: 4px;
            span {
                margin-right: 40px;
                /*width: 33%;*/
                display: inline-block;
                /*margin-bottom: 6px;*/
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #434B6C;
                line-height: 30px;
            }
            .width30 {
                width: 30%;
            }
        }
        .detail-table-box {
            margin-top: 20px;
            max-height: 300px;
            overflow: auto;
            .width80 {
                width: 80px;
            }
            .width100 {
                width: 100px;
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
            .padding-left30 {
                padding-left: 30px !important;
            }
            .table-thead {
                background: #F6F5F5;
                padding: 20px 0;
                padding-right: 10px;
                .table-th {
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 16px;
                }
            }
            .cont-tr {
                .cont-td {
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #3D474F;
                    line-height: 33px;
                    padding: 20px 0 28px;
                    position: relative;
                    .td-txt {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        margin: auto;
                        -webkit-transform: translateY(-50%);
                        -moz-transform: translateY(-50%);
                        -ms-transform: translateY(-50%);
                        -o-transform: translateY(-50%);
                        transform: translateY(-50%);
                    }
                    &:last-child{
                        .td-txt{
                            right: 10px;
                        }
                    }
                }
                .td-btn {
                    color: #0099FF;
                }
            }
            .shop-name {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #3D474F;
                line-height: 33px;
                padding: 15px 0;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
            }
            @media screen and (-webkit-min-device-pixel-ratio:0){
                .shop-name{
                    .limit-line(2);
                    white-space: normal;
                }
            }
            .shop-img {
                margin-right: 15px;
                width: 90px;
                height: 90px;
                border: 1px solid #EFEFEF;
            }
            .cont-foot {
                text-align: right;
                padding: 0 30px;
                .dialog-tips {
                    text-align: left;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #F5A623;
                    line-height: 16px;
                    margin-top: 33px;
                    i {
                        color: #E98F36;
                        margin-right: 10px;
                    }
                    span {
                        margin-right: 20px;
                    }
                }
            }
        }

        .dialog-footer {
            .dialog-count {
                /*margin: 30px 0 22px;*/
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #7E98AC;
                text-align: right;
                span {
                    margin-right: 30px;
                }
            }
            .dialog-btn {
                margin-top: 28px;
                button {
                    border-color: #409EFF;
                    background: #409EFF;
                    border-radius: 2px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 20px;
                    width: 124px;
                    height: 40px;
                    padding: 0;
                }
            }
            .dialog-status {
                font-family: PingFangSC-Semibold;
                font-size: 24px;
                color: #F5A623;
                line-height: 20px;
                margin-top: 28px;
            }
            .dialog-status-confirm {
                color: #8BC34A;
                font-family: PingFangSC-Semibold;
                font-size: 24px;
                line-height: 20px;
                margin-top: 28px;
            }
        }
    }

    .look-order-dialog {

    }
</style>