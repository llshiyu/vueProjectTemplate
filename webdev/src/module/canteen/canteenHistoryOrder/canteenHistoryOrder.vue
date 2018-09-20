<template>
    <div class="canteen-history-order" v-if="response">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>历史订单</el-breadcrumb-item>
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
                    <!-- 如果只有一个子订单不展示母订单加 v-if="item.subOrderList.length>1" -->
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
                                        <div class="cursor-pointer td-btn" @click="showOrderDetail(item2,item)">
                                            订单详情
                                        </div>
                                        <div class="cursor-pointer td-btn td-margin"
                                             @click="showOrderDialog(item2,item)">
                                            查看收货单
                                        </div>
                                        <div class="cursor-pointer td-btn" @click="buyAgain(item2,item)">
                                            再次购买
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-box">
                    <Paging :totalNumber="page.totalNumber" :pageShowTotal="page.pageShowNum" :showActivePageIndex="page.thisPage"
                            @callBack="showPage"></Paging>
                </div>
            </div>
            <div class="no-list" v-else>
                <img src="../../../assets/img/noShop.png" class="nolist-img">
                <div class="nolist-txt">暂未发现订单信息</div>
            </div>
        </div>

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
        name: "canteenHistoryOrder",
        components: {
            RecevierOrder, Paging
        },
        data() {
            return {
                //"takeStatus": "是否确认收货-0待收货1采购方确认收货2供应方确认收货4.已取消",
                orderList: [], // 订单列表
                response: false, // 加载完成
                orderSearch: '', // 搜索字段
                page: {
                    pageShowNum: 10, // 每页展示多少条
                    totalNumber: 100, // 总条数
                    thisPage: 1, // 当前第几页
                    thisTotalNumber: '', // 当前页总条数
                },
                dialogOrder: false, // 查看收货单弹窗
                myOrderList: {}, // 我的收货单弹窗list
            }
        },
        mounted() {
            this.init()
        },
        computed: {}, // 计算属性
        filters: {}, // 过滤器
        methods: {
            init() {
                this.getOrderList();
            },
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
                    takeStatus: 1  // 0:我的订单 1：历史订单  ：我的收货单v     返回值中takeStatus 0-未确认收货  1-采购商确认收货  2-供应商收货
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
            showOrderDetail(item, parentItem) {
                this.$router.push({
                    'name': 'canteenHistoryOrderDetail',
                    params: {id: item.id}
                })
            }, // 展示订单详情页
            buyAgain(item, parentItem) {
                let shopList = [];
                let obj = {};
                for (let i = 0; i < item.subOrderGoodsList.length; i++) {
                    obj.goodsId = item.subOrderGoodsList[i].goodsId;
                    obj.goodsNum = item.subOrderGoodsList[i].goodsRealNum;
                    obj.supplierId = item.supplierId;
                    shopList.push(obj)
                }
                let param = shopList;
                this.$api.canteen.cartSaveList(param).then(res => {
                    if (res.meta.code == 0) {
                        this.$router.push({
                            'name': 'canteenCart',
                        })
                    }else if(res.meta.code==300003){
                        this.$message.error({
                            message: '您输入的商品数量超过我的订货单数量限制，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    }else if(res.meta.code==300001){
                        this.$message.error({
                            message: '您输入的商品数量超过库存，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 再次购买
            showPage(thisPage, selectShowNumber) {
                this.page.thisPage = thisPage;
                this.getOrderList();
            }, // 分页
        }
    }
</script>

<style lang="less" scoped>
    .canteen-history-order {

    }
</style>