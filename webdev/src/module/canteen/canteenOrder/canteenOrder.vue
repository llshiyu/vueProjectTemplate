<template>
    <div class="canteen-order" v-if="response">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/canteenOrder' }">我的订单</el-breadcrumb-item>
        </el-breadcrumb>
        <!--样式在assets/css/order-->
        <div class="order-header-box flex-box">
            <div class="order-title-box clearfix">
                <div class="order-title fl">全部</div>
                <div class="order-title-square fl"></div>
            </div>
            <div class="search-box clearfix flex-1">
                <el-button class="fr search-btn" type="primary" @click="searchOrder()">订单搜索</el-button>
                <el-input prefix-icon="el-icon-search" class="fr search-input" v-model.trim="orderSearch"
                          @keyup.enter.native="searchOrder()" placeholder="输入商品标题、订单号或厂家名称进行搜索" clearable></el-input>
            </div>
        </div>
        <!--样式在assets/css/order-->
        <div class="order-list">
            <div class="table-thead flex-box">
                <div class="table-th flex-1">商品信息</div>
                <div class="text-align-center table-th width130">单价</div>
                <div class="text-align-center table-th width130">数量</div>
                <div class="text-align-center table-th width150">总金额</div>
                <div class="text-align-center table-th width150">交易操作</div>
            </div>
            <div v-if="orderList&&orderList.length>0">
                <div class="order-box" :class="item.subOrderList.length>1?'has-border':''"
                     v-for="(item,index) of orderList"
                     :key="index">
                    <div class="parent-title">
                        <span>{{item.createTime | analyseTime('6')}}</span>
                        <span>订单号：{{item.orderNum}}</span>
                        <span>送达时间：{{item.sendToTime | analyseTime('6')}}</span>
                    </div>
                    <div class="child-box" v-for="(item2,index2) of item.subOrderList" :key="index2">
                        <div class="child-title">
                            <!--<span v-if="item.subOrderList.length<=1">{{item.createTime | analyseTime('6')}}</span>-->
                            <span>订单号：{{item2.orderNum}}</span>
                            <span :title="item2.supplierName">供应商：{{item2.supplierName,20 | textEllipsis}}</span>
                            <span>联系人：{{item2.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{item2.supplierContactPhone}}</span>
                        </div>
                        <div class="child-cont">
                            <div class="cont-tr flex-box" v-for="(item3,index3) of item2.subOrderGoodsList"
                                 :key="index3">
                                <div class="flex-1 cont-td clearfix flex-box"
                                     :class="index3!==(item2.subOrderGoodsList.length-1)?'border-bottom':''">
                                    <img :src="item3.goodsMainPic" class="shop-img fl" v-if="item3.goodsMainPic">
                                    <img src="../../../assets/img/img.png" class="shop-img fl" v-else>
                                    <div class="shop-name fl flex-1" :title="item3.goodsName">
                                        {{item3.goodsName}}
                                    </div>
                                </div>
                                <div class="text-align-center cont-td width130"
                                     :class="index3!==(item2.subOrderGoodsList.length-1)?'border-bottom':''">
                                    <i class="price-size td-txt"><span
                                            class="small-size">￥</span>{{item3.goodsPrice.toFixed(2)}}</i>
                                </div>
                                <div class="text-align-center cont-td border-right width130"
                                     :class="index3!==(item2.subOrderGoodsList.length-1)?'border-bottom':''">
                                    <div class="td-txt">{{item3.goodsNeedNum}}</div>
                                </div>
                                <div class="text-align-center cont-td border-right width150"
                                     :class="index3===item2.subOrderGoodsList.length?'border-bottom':''">
                                    <i class="price-size td-txt" v-if="index3===0"><span class="small-size">￥</span>{{item2.needTotalPrice.toFixed(2)}}</i>
                                </div>
                                <div class="text-align-center cont-td width150"
                                     :class="index3===item2.subOrderGoodsList.length?'border-bottom':''">
                                    <div class="td-txt" v-if="index3===0">
                                        <!--返回值中takeStatus 0-未确认收货  1-采购商确认收货  2-供应商收货-->
                                        <div class="cursor-pointer td-btn" @click="showReceiverDialog(item2,item)"
                                             v-if="item2.takeStatus==0">
                                            确认收货
                                        </div>
                                        <div class="td-btn" v-else>
                                            <div class="cursor-pointer" @click="showOrderDialog(item2,item)">查看收货单</div>
                                            <div class="btn-status-noconfirm td-margin-top" v-if="item2.takeStatus==1">
                                                供应商确认中
                                            </div>
                                            <div class="btn-status-confirm td-margin-top" v-if="item2.takeStatus==2">
                                                供应商已确认
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-box">
                    <Paging :totalNumber="page.totalNumber" :showActivePageIndex="page.thisPage" :pageShowTotal="page.pageShowNum" @callBack="showPage"></Paging>
                </div>
            </div>
            <div class="no-list" v-else>
                <img src="../../../assets/img/noShop.png" class="nolist-img">
                <div class="nolist-txt">暂未发现订单信息</div>
            </div>
        </div>

        <!--确认收货弹窗-->
        <el-dialog :visible.sync="dialogReceiverOrder" @close="closeReceiverDialog()" class="receiver-dialog">
            <div class="dialog-title" slot="title">
                <span>{{recevierOrderList.createTime| analyseTime('6')}}</span>
                <span>订单号 : {{recevierOrderList.orderNum}}</span>
                <span>送达时间 : {{recevierOrderList.sendToTime| analyseTime('6')}}</span>
                <span class="" :title="recevierOrderList.supplierName">供应商 : {{recevierOrderList.supplierName,20 | textEllipsis}}</span>
                <span class="">联系人：{{recevierOrderList.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{recevierOrderList.supplierContactPhone}}</span>
            </div>
            <el-table :data="recevierOrderListData">
                <el-table-column label="商品信息">
                    <template slot-scope="scope">
                        <div class="clearfix">
                            <img :src="scope.row.goodsMainPic" class="shop-img fl" v-if="scope.row.goodsMainPic">
                            <img src="../../../assets/img/img.png" class="shop-img fl" v-else>
                            <div class="shop-name fl" :title="scope.row.goodsName">{{scope.row.goodsName}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="goodsPrice" label="单价" width="130">
                    <template slot-scope="scope">
                        <i class="price-size"><span class="small-size">￥</span>{{scope.row.goodsPrice.toFixed(2)}}</i>
                    </template>
                </el-table-column>
                <el-table-column property="goodsNeedNum" label="需求量" width="80"></el-table-column>
                <el-table-column label="实际收货量" width="150">
                    <template slot-scope="scope">
                        <el-form :rules="dialogRules" :model="scope.row" :ref="'goodsNumForm'+scope.row.id">
                            <el-form-item label="" prop="goodsRealNum">
                                <el-input type="tel" @keyup.native="keyupNum(scope.row)" maxlength="4" v-model.trim="scope.row.goodsRealNum"></el-input>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="实付金额" width="130">
                    <template slot-scope="scope">
                        <i class="price-size"><span class="small-size">￥</span>{{scope.row.goodsRealNum,scope.row.goodsPrice,scope.row
                            | getRealTotalPrice}}</i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dialog-tips"><i class="el-icon-warning"></i>收货人与采购人为同一人，默认是该用户的联系人。</div>
            <div class="dialog-footer" slot="footer">
                <div class="dialog-count">
                    <span>收货数量<i class="price-size">{{recevierOrderListData,recevierOrderList|getTotalNum}} 件</i></span>
                    <span>实付款<i class="price-size"><span class="small-size">￥</span>{{ recevierOrderListData,recevierOrderList|getTotalPrice }}</i></span>
                </div>
                <div class="dialog-btn" :class="receiverBtnNoClick?'dialog-no-btn':''">
                    <el-button type="primary" @click="orderReceiver(recevierOrderList)">确认收货</el-button>
                </div>
            </div>
        </el-dialog>
        <!--确认收货弹窗结束-->

        <!--查看收货单弹窗-->
        <RecevierOrder :myOrderList="myOrderList" :dialogOrder="dialogOrder"
                       @closeRecevierOrder="closeOrderDialog()" v-if="dialogOrder"></RecevierOrder>
        <!--查看收货单弹窗结束-->
    </div>
</template>

<script>
    import {analyseTime, timeDiff} from '../../../assets/js/util'
    import RecevierOrder from '../../../components/common/recevierOrder'
    import Paging from '../../../components/common/Paging'

    export default {
        name: "canteenOrder",
        components: {
            RecevierOrder,Paging
        },
        data() {
            var validateGoodsRealNum = (rule, value, callback) => {
                if (value === '' || value < 0) {
                    callback(new Error('请填写实际收货量信息'));
                } else {
                    callback();
                }
            };
            return {
                //"takeStatus": "是否确认收货-0待收货1采购方确认收货2供应方确认收货4.已取消",
                orderList: [], // 订单列表
                response: false, // 加载完成
                orderSearch: '', // 搜索字段
                page: {
                    pageShowNum: 10, // 每页展示多少条
                    totalNumber: '', // 总条数
                    thisPage: 1, // 当前第几页
                    thisTotalNumber: '', // 当前页总条数
                },
                dialogReceiverOrder: false, // 确认收货弹窗
                dialogOrder: false, // 查看收货单弹窗
                recevierOrderList: {}, // 确认收货弹窗里list
                recevierOrderListData: [], // 确认收货弹窗里表格data
                dialogRules: {
                    goodsRealNum: [
                        { required: true, message: '请填写实际收货量信息', trigger: 'blur' },
                        {validator: validateGoodsRealNum, trigger: 'blur'}
                    ],
                }, // 确认收货弹窗中的input校验
                bigOrderId: '', // 确认收货要的大订单id
                receiverBtnNoClick: false, // 确认收货按钮的不可点击状态
                myOrderList: {}, // 我的收货单弹窗list
            }
        },
        mounted() {
            this.init()
        },
        computed: {}, // 计算属性
        filters: {
            getRealTotalPrice: function (num, price, row) {
                if (num > 0) {
                    row.goodsTotalPrice = (num * price).toFixed(2);
                    return (num * price).toFixed(2);
                } else {
                    return 0;
                }
            }, // 获取实付金额
            getTotalPrice: function (item, row) {
                let totalPrice = 0;
                item.forEach((key) => {
                    totalPrice += key.goodsPrice * key.goodsRealNum;
                });
                row.realTotalPrice = totalPrice.toFixed(2);
                return totalPrice.toFixed(2);
            }, // 获取弹窗列表总价钱
            getTotalNum: function (item, row) {
                let totalNum = 0;
                item.forEach((key) => {
                    totalNum += key.goodsRealNum * 1;
                });
                row.realTotalNum = totalNum;
                return totalNum;
            }, // 获取弹窗列表总数量
        }, // 过滤器
        methods: {
            init() {
                this.getOrderList();
            },
            keyupNum(item){
                item.goodsRealNum=item.goodsRealNum.replace(/[^\d]/g,'')
                if(item.goodsRealNum){
                    this.receiverBtnNoClick = false;
                }else{
                    this.receiverBtnNoClick = true;
                }
            }, // 只能输入数字
            searchOrder() {
                this.page.thisPage = 1;
                this.getOrderList()
            }, // 搜索
            getOrderList() {
                let param = {
                    goodsName: this.orderSearch, // 查询 商品名
                    // orderId: "",  // 大订单id
                    // orderNum: "",  // 大订单号
                    pageNum: this.page.thisPage,  //  当前页
                    pageSize: this.page.pageShowNum,  //  每页展示多少条
                    // receiverId: 0, // 收货人id
                    // subOrderId: "",  // 小订单id
                    // subOrderNum: "", // 小订单号
                    // supplierId: 0,  // 供应商id
                    // supplierName: "",  // 供应商名
                    takeStatus: 0  // 0:我的订单 1：历史订单 2：我的收货单v     返回值中takeStatus 0-未确认收货  1-采购商确认收货  2-供应商收货
                };
                this.$api.canteen.getOrderList(param).then(res => {
                    if (res.meta.code == 0) {
                        if(res.data&&res.data.list){
                            this.orderList = res.data.list;
                            this.page.thisPage = res.data.pageNum;  // 当前第几页
                            // this.page.pageShowNum = res.data.pageSize; // 每页展示多少条
                            this.page.totalNumber = res.data.total; // 总条数
                            this.page.thisTotalNumber = res.data.size; // 当前页总条数
                        }
                        this.response = true;
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 获取订单列表
            orderReceiver(item) {
                let t=0,l=item.subOrderGoodsList.length;
                for(let i=0;i<l;i++){
                    this.$refs['goodsNumForm'+item.subOrderGoodsList[i].id].validate((valid) => {
                        if (valid) {
                            t++
                        } else {
                            return false;
                        }
                    });
                }
                if(t===l){
                    let param = {
                        "id": item.id,  //  小订单id
                        "realTotalNum": item.realTotalNum,
                        "realTotalPrice": item.realTotalPrice,
                        "orderId": this.bigOrderId,// 大订单id
                        "subOrderGoodsList": item.subOrderGoodsList
                    };
                    this.$api.canteen.orderReceiver(param).then(res => {
                        if (res.meta.code == 0) {
                            this.closeReceiverDialog();
                            this.getOrderList();
                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                    })
                }else{
                    // console.log('有商品的收货数量没有填写')
                }
            }, // 确认收货
            clearForm(){
                for(let i=0;i<this.recevierOrderListData.length;i++){
                    this.$refs['goodsNumForm'+this.recevierOrderListData[i].id].resetFields();
                }
                this.receiverBtnNoClick = false;
            }, // 表单重置
            showReceiverDialog(item, parentItem) {
                item.createTime = parentItem.createTime; // 提交时间
                item.sendToTime = parentItem.sendToTime; // 送达时间

                // item.list.forEach((key) => {
                //     key.newNeedTotalNum = key.needTotalNum
                // });  // 实际收货量

                this.recevierOrderList = item;
                this.recevierOrderListData = item.subOrderGoodsList;
                this.bigOrderId = parentItem.id; // 大订单id
                this.dialogReceiverOrder = true;
            }, // 展示确认收货弹窗
            closeReceiverDialog() {
                this.dialogReceiverOrder = false;
                this.clearForm();
            }, // 关闭确认收货弹窗
            showOrderDialog(item, parentItem) {
                let param = {
                    "subOrderId": item.id // 小订单id
                };
                this.$api.canteen.getOrderDetail(param).then(res => {
                    if (res.meta.code == 0) {
                        this.myOrderList = res.data;
                        this.dialogOrder = true;
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 展示收货单弹窗
            closeOrderDialog() {
                this.dialogOrder = false;
            }, // 关闭收货单弹窗
            showPage(thisPage,selectShowNumber){
                this.page.thisPage = thisPage;
                this.getOrderList();
            }, // 分页
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

    .canteen-order {

        .receiver-dialog {
            .dialog-title {
                padding: 16px 40px 16px 20px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #434B6C;
                line-height: 30px;
                background: #F7F7F7;
                span {
                    margin-right: 20px;
                    /*width: 30%;*/
                    display: inline-block;
                }
            }
            .shop-img {
                width: 90px;
                height: 90px;
                border: 1px solid #EFEFEF;
                margin-right: 15px;
            }
            .shop-name {
                width: 50%;
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
            .dialog-tips {
                text-align: left;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #F5A623;
                line-height: 16px;
                margin-top: 20px;
                i {
                    color: #E98F36;
                    margin-right: 10px;
                }
                span {
                    margin-right: 20px;
                }
            }
            .dialog-footer {
                .dialog-count {
                    margin: 30px 0 22px;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #7E98AC;
                    text-align: right;
                    span {
                        margin-right: 30px;
                    }
                }
                .dialog-btn {
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
                .dialog-no-btn{
                    button {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
</style>