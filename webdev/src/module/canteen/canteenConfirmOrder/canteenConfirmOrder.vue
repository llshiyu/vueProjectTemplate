<template>
    <div class="canteen-cart-big" v-if="response">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>采购货源</el-breadcrumb-item>
            <el-breadcrumb-item>我的订货单</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="step-box">
            <div class="steps">
                <el-steps :space="158" :active="2" finish-status="success">
                    <el-step title="我的订货单" class="steps-word"></el-step>
                    <el-step title="确认订单信息" class="steps-word"></el-step>
                    <el-step title="成功提交订单" class="steps-word"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="title-box clearfix">
            <div class="small-title fl">选择收货地址</div>
            <div class="small-title-square fl"></div>
        </div>

        <div class="address-box clearfix" :class="addressList.length>0&&showLine?'border-bottom':''">
            <div class="contact-name fl">{{contactName}}(收)<span class="select-blue"></span></div>
            <div class="default-address-box fl ">
                <div class="clearfix">
                    <span class="address-div fl" style="width:20%;min-width: 100px;" :title="addressName1">{{addressName1}}</span>
                    <span class="address-div fl" style="width:40%;min-width: 200px;" :title="addressName2">{{addressName2,40|textEllipsis}}</span>
                    <span class="address-div fl" style="width:10%;min-width: 100px;">{{contactPhone}}</span>
                    <span class="default-btn fl">默认地址</span>
                </div>
                <div class="clearfix cursor-pointer margin-top10" v-for="(item,index) in addressList" :key="index"
                     v-show="showLine" @mouseenter="addressHover(index)">
                    <span class="address-div fl" style="width:20%;min-width: 100px;" :title="item.canteenName">{{item.canteenName}}</span>
                    <span class="address-div fl" style="width:40%;min-width: 240px;" :title="item.address">{{item.address,40|textEllipsis}}</span>
                    <span class="address-div fl" style="width:10%;min-width: 100px;">{{contactPhone}}</span>
                    <span class="set-default-btn fl" v-show="showFlag===index && showLine"
                          @click="setDefaultAddress(item)">设为默认地址</span>
                </div>
            </div>
        </div>
        <div class="more-address-box cursor-pointer">
            <span @click="moreAddress()">{{showLine?'收起地址':'更多地址'}}</span><i :class="showLine?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </div>

        <div class="title-box margin-top40 margin-bottom20 clearfix">
            <div class="small-title fl">进货商品清单</div>
            <div class="small-title-square fl"></div>
        </div>
        <div  class="datetime-box">
            <div class="date-time">
                <span class="arrive-time">送达时间</span>
                <div class="block"  style="display: inline-block;">
                    <el-date-picker
                            v-model="startDateTime"
                            type="date"
                            placeholder="选择日期"
                            @change = "changeTime(startDateTime)"
                            :picker-options="pickerOptions1"
                            style="width: 150px;">
                    </el-date-picker>


                    <el-time-select v-if="changeTimeControl"
                            v-model="startTime"
                            :picker-options="{start: '00:00',step: '01:00',end: '08:00'}"
                            placeholder="选择时间" style="width: 150px;">
                    </el-time-select>
                    <el-time-select v-else
                                    v-model="startTime"
                                    :picker-options="{start: '00:00',step: '01:00',end: '23:00'}"
                                    placeholder="选择时间" style="width: 150px;">
                    </el-time-select>
                    <span >时</span>
                </div>
                <p class="go-back" @click="goList()">返回修改进货单</p>
            </div>
        </div>

        <div class="cart-list-box">
            <div class="table-thead flex-box">
                <div class="table-th flex-1" style="min-width: 233px" >
                    商品信息
                </div>
                <div class="text-align-center table-th" style="width:120px;">商品品类</div>
                <div class="text-align-center table-th" style="width: 150px">单价</div>
                <div class="text-align-center table-th" style="width: 150px">数量</div>
                <div class="text-align-center table-th" style="width: 150px">小计</div>
            </div>

            <div v-if="cartList.length>0">
                <div class="order-table-box" v-for="(item,index) of cartList" :key="index">
                    <div class="order-table-head">
                        <span class="head-middle-span">供货商：{{item.supplierName}}</span>
                        <span>联系人：{{item.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.supplierContactPhone}}</span>
                    </div>
                    <div class="table-tr flex-box" v-for="(item2,index2) of item.subCartGoodsVoList" :key="index2">
                        <div class="table-td flex-1 flex-box" style="min-width: 260px">
                            <img :src="item2.goodsMainPic" class="shop-img fl" v-if="item2.goodsMainPic">
                            <img src="../../../assets/img/img.png" class="shop-img " v-else>
                            <div class="shop-name  flex-1" :title="item2.goodsName">
                                {{item2.goodsName}}
                            </div>
                        </div>
                        <div class="text-align-center table-td" style="width:120px;">{{item2.goodsTypeName}}</div>
                        <div class="text-align-center table-td" style="width: 150px;"><span class="price-size"><span
                                class="small-size">￥</span>{{item2.goodsPrice.toFixed(2)}}</span>/{{item2.goodsNetContent}}{{item2.goodsNetContentUnit}}
                        </div>
                        <div class="text-align-center table-td relative-td" style="width: 150px">
                                {{item2.goodsNum }}
                        </div>
                        <div class="text-align-center table-td" style="width: 150px;">
                                <span class="price-size"><span
                                        class="small-size">￥</span>{{item2|getGoodsTotalPrice}}</span></div>
                    </div>
                    <div class="message-bottom">
                        <span class="smell-word">给供应商留言</span><input type="text" class="input-smell" maxlength="60" v-model="item.leaveMessage">
                        <span class="goods-mount">商品数量</span><span class="chinese-mountred">{{item.subCartGoodsVoList|getChildTotalNumber}}</span>
                        <span class="goods-mount">厂商商家合计</span><span class="chinese-mm">￥</span><span class="chinese-mountred">{{item.subCartGoodsVoList|getChildTotalPrice}}</span>
                    </div>
                </div>
            </div>

            <div class="no-list" v-else>
                <img src="../../../assets/img/emptyGoods.png" class="nolist-img">
                <div class="nolist-txt">您还未添加商品，赶快去选商品吧</div>
                <div class="nolist-txt nolist-txt2">去<span class="empty-blue cursor-pointer" @click="goHome()">采购货源</span>页添加商品</div>
            </div>
            <div class="table-footer" v-if="cartList.length>0">
                <div class="text-align-center table-th" style="width: 190px;min-width: 140px;">
                    商品数量 <span class="price-size">{{cartList|getTotalNumber}} 件</span>
                </div>
                <div class="text-align-center table-th" style="width: 180px;min-width: 140px;">
                    总金额 <span class="price-size"><span class="small-size">￥</span>{{cartList|getTotalPrice}}</span>
                </div>
                <div class="confirm" @click="getBigsubmit()">
                    提交订单
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {_sessionStorage} from '../../../assets/js/util'

    export default {
        data() {
            return {
                contactName: _sessionStorage('contact'), // 默认收货人
                contactPhone: _sessionStorage('contactPhone'), // 默认收货人电话
                addressName1: _sessionStorage('defaultCanteenName'), // 小食堂地址a区
                addressName2: _sessionStorage('defaultAddressName'), // 小食堂地址
                addressList: '', // 更多地址列表
                showFlag: 0,//设为默认地址
                showLine: false,//是否显示线，其它地址
                cartList: [], // 列表list
                subCartList: [],
                response: false, // 加载完成
                countdownTime: '', // 倒计时
                leaveMessage: "",
                startDateTime: "",
                id: "",
                addressName: "",
                canteenName: "",
                startTime: "08:00",
                supplierId: "",
                changeTimeControl: true,
                pickerOptions1: {
                    disabledDate(time) {
                        let Stamp;
                        Stamp = new Date();
                        let num = 7-Stamp.getDay()+1;
                        let nowAfter = Stamp.setDate(Stamp.getDate() + num); //下周一时间戳
                        let now = time.getTime() < Date.now() - 8.64e7; //禁止今天之前
                        return  now || time.getTime() > nowAfter;
                    }
                },
            }
        },
        mounted() {
            this.init();
        },
        filters: {
            getGoodsTotalPrice(item) {
                let goodsTotalPrice;
                goodsTotalPrice = (item.goodsNum * item.goodsPrice*1).toFixed(2);
                item.goodsTotalPrice = goodsTotalPrice;
                return goodsTotalPrice
            }, // 获取每一个商品的总计
            getTotalNumber(item) {
                let totalNumber = 0;
                for (let i = 0; i < item.length; i++) {
                    for (let j = 0; j < item[i].subCartGoodsVoList.length; j++) {
                            totalNumber += item[i].subCartGoodsVoList[j].goodsNum*1;
                    }
                }
                item.totalNumber = totalNumber;
                return totalNumber;
            }, // 获取总数量
            getChildTotalNumber(item) {
                let totalNumber = 0;
                for (let i = 0; i < item.length; i++) {
                        totalNumber += item[i].goodsNum*1;
                    }
                item.totalNumber = totalNumber;
                return totalNumber;
            }, // 获取商品总数量
            getTotalPrice(item) {
                let totalPrice = 0;
                for (let i = 0; i < item.length; i++) {
                    for (let j = 0; j < item[i].subCartGoodsVoList.length; j++) {
                        totalPrice += item[i].subCartGoodsVoList[j].goodsTotalPrice*1;
                    }
                }
                item.totalPrice = totalPrice.toFixed(2);
                return totalPrice.toFixed(2);
            }, // 获取总金额
            getChildTotalPrice(item) {
                let totalPrice = 0;
                for (let i = 0; i < item.length; i++) {
                    totalPrice += item[i].goodsNum * item[i].goodsPrice*1;
                }
                item.totalPrice = totalPrice.toFixed(2);
                return totalPrice.toFixed(2);
            }, // 获取商品总金额
        },
        methods: {
            init() {
                this.showLine = false; // 是否显示线，其它地址
                this.getCartList();
                this.getDate();
            },
            changeTime(startDateTime){
                var _this = this;
                _this.changeTimeControl = false; //23

                let Stamp;
                Stamp = new Date(new Date().toLocaleDateString())
                let num = 7-Stamp.getDay()+1;
                let a = Stamp.setDate(Stamp.getDate() + num);
                let sDateTime = new Date(a)
                 if( startDateTime.getTime() == sDateTime.getTime()){
                     _this.changeTimeControl = true; //8
                 }
            },
            getCartList() {
                let param = {
                    isSelect: 0,
                };
                this.$api.canteen.getCartList(param).then(res => {
                    if (res.meta.code == 0) {
                        if(res.data&&res.data.subCartVoList){
                            this.id = res.data.id;
                            this.addressName = res.data.addressName;
                            this.canteenName = res.data.canteenName;
                            this.cartList = res.data.subCartVoList || [];
                            for(let i=0; i<this.cartList.length;i++){
                                this.cartList[i].leaveMessage='';
                            }
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
                /*this.$api.canteen.getCartList(param).then(res => {
                    if (res.meta.code == 0) {
                        var obj = res.data ||{};
                        this.id = obj.id;
                        this.addressName = obj.addressName;
                        this.canteenName = obj.canteenName;
                        this.cartList = obj.subCartVoList || [];
                        for(var i=0; i<this.cartList.length;i++){
                            this.subCartList =  this.cartList[i].subCartGoodsVoList || [];
                            this.cartList[i].push(this.leaveMessage);
                        }
                        this.response = true;
                        console.log(this.response+ "oooooooooooooo")
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })*/
            }, // 获取列表
            getBigsubmit(){
                var param = {
                    "id": this.id,
                    "addressName": this.addressName,
                    "canteenName": this.canteenName,
                    "sendToTime": this.sendToTime(),
                    "subCartVoList": this.cartList,
                };
                this.$api.canteen.getBigsubmitOrder(param).then(res => {
                    if (res.meta.code == 0) {
                        this.supplierId = res.data;
                        console.log(this.supplierId,'code0');
                        this.$router.push({name:"canteenConfirmSuccess",params:{supplierId: this.supplierId}})
                    } else {
                        this.supplierId = "";
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                        console.log(this.supplierId,'error');
                        this.$router.push({name:"canteenConfirmSuccess",params:{supplierId: this.supplierId}})
                    }
                })
            },//提交按钮
            getAddressList() {
                let param = {
                    specifications : _sessionStorage('specifications') // 0大食堂 1小食堂
                };
                this.$api.common.getAddress(param).then(res => {
                    if (res.meta.code == 0) {
                        this.addressList = res.data;
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 获取更多地址
            addressHover(index) {
                this.showFlag = index
            }, // 地址滑动展示设为默认地址
            moreAddress() {
                this.showLine = !this.showLine;
                this.getAddressList();
            }, // 更多地址点击
            setDefaultAddress(item) {
                let param = {
                    "id": item.id,
                    specifications : _sessionStorage('specifications') // 0大食堂 1小食堂
                };
                this.$api.common.setDefaultAddress(param).then(res => {
                    if (res.meta.code == 0) {
                        this.showLine = false;
                        this.addressName1 = item.canteenName;
                        this.addressName2 = item.address;
                        _sessionStorage('defaultCanteenName', item.canteenName);
                        _sessionStorage('defaultAddressName', item.address);
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })

            }, // 设置默认地址
            goHome() {
                this.$router.push({
                    'name': 'canteenPurchase',
                })
            }, // 去采购货源首页

            //时间选择
            getTime(){
                var _this = this;
                var startType = new Date().getTime();
                var start = new Date(startType);
                var startHours = start.getHours()<10 ? '0' + start.getHours() : start.getHours() ;
                var startMinuts = start.getMinutes()<10 ? '0' + start.getMinutes() : start.getMinutes() ;
                _this.startTime = startHours + ":" + startMinuts
                return _this.startTime
            },
            sendToTime(){
                return  new Date(this.startDateTime +  " " +  this.startTime).getTime();
            },
            //日期选择
            getDate(){
                var _this = this;
                var Stamp;
                Stamp = new Date();
                var num = 7-Stamp.getDay()+1;
                Stamp.setDate(Stamp.getDate() + num);
                var year = Stamp.getFullYear(); //获取完整的年份(4位,1970-????)
                var month = Stamp.getMonth() +1; //获取当前月份(0-11,0代表1月)
                month = month< 10 ? '0'+month : month;
                var startDate = Stamp.getDate() < 10 ? '0'+Stamp.getDate() : Stamp.getDate();
                _this.startDateTime= year+"-"+month+'-'+startDate;
                return _this.startDateTime;
            },
            //返回列表
            goList(){
                var _this = this;
                _this.$router.push({name:"canteenCartBig"})
            },
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

    .canteen-cart-big {
        .step-box{
            display: flex;
            justify-content: center;
            .steps{
                margin-top: 50px;
                min-width:400px;
            }
        }
        .width100 {
            width: 100px;
        }
        .margin-top40 {
            margin-top: 40px !important;
        }
        .margin-top10 {
            margin-top: 10px !important;
        }
        .margin-bottom20 {
            margin-bottom: 20px !important;
        }
        .border-bottom {
            border-bottom: 1px solid #EAEDF1;
        }
        .title-box {
            margin-top: 16px;
            margin-bottom: 36px;
            .small-title {
                background: #A3C7EC;
                font-family: PingFangSC-Medium;
                font-size: 20px;
                color: #FFFFFF;
                text-align: center;
                padding: 6px 20px;
                width: 160px;
                height: 40px;
            }
            .small-title-square {
                width: 0;
                border-top: 20px solid transparent;
                border-bottom: 20px solid #A3C7EC;
                border-left: 15px solid #A3C7EC;
                border-right: 15px solid transparent;
            }
        }
        .datetime-box{
            min-width: 468px;
            position: relative;
            .date-time{
                position: absolute;
                top:  -63px;
                right:0px;
                .arrive-time{
                    display: inline-block;
                    width: 84px;
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 16px;
                }
                .go-back{
                    display: inline-block;
                    font-size: 16px;
                    color: #409EFF;
                    margin-left: 47px;
                    cursor: pointer;
                }
            }
        }
        .address-box {
            .contact-name {
                border: 1px solid #409EFF;
                font-size: 16px;
                color: #409EFF;
                display: inline-block;
                /*width: 100px;*/
                padding: 0 13px;
                line-height: 30px;
                text-align: center;
                position: relative;
                margin-right: 14px;
                .select-blue {
                    display: inline-block;
                    width: 28px;
                    height: 25px;
                    background: url("../../../assets/img/selectBlue.png") no-repeat;
                    -webkit-background-size: contain;
                    background-size: contain;
                    position: absolute;
                    right: -2px;
                    top: 6px;
                }
            }
            .default-address-box {
                width: 80%;
                min-width: 600px;
                .address-div {
                    line-height: 30px;
                    margin-right: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                }
                .default-btn {
                    background: #F5A623;
                    width: 100px;
                    height: 33px;
                    line-height: 33px;
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #3D474F;
                    text-align: center;
                }
                .set-default-btn {
                    font-size: 16px;
                    color: #409EFF;
                }
            }
        }
        .more-address-box {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #409EFF;
            margin-top: 20px;
        }
        .cart-list-box {
            .table-thead {
                background: #F6F5F5;
                padding: 20px 40px 20px 26px;
                .table-th {
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 16px;
                }
            }
            .order-table-box {
                border-bottom: 1px solid #EAEDF1;
                .order-table-head {
                    font-family: PingFangSC-Semibold;
                    font-size: 16px;
                    color: #409EFF;
                    line-height: 14px;
                    padding: 20px 40px 20px 26px;
                    .head-middle-span {
                        margin: 0 40px 0 0;
                    }
                    span {
                        display: inline-block;
                    }
                }
                .shop-img {
                    border: 1px solid #EFEFEF;
                    margin-right: 15px;
                    width: 90px;
                    height: 90px;
                }
                .shop-name {
                    padding: 15px 0;
                    min-width: 100px;
                    font-size: 14px;
                    color: #3D474F;
                    line-height: 34px;
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
                .td-del {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #FF4432;
                    line-height: 24px;
                }
                .table-tr {
                    padding: 20px 40px 20px 26px;
                    .table-td {
                        line-height: 60px;
                    }
                }
                .relative-td {
                    position: relative;
                }
                .count-num-box {
                    display: inline-block;
                    position: absolute;
                    top: 10px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    height: 30px;
                    width: 103px;
                    i {
                        background: #F8F8F8;
                        border: 1px solid #EAEDF1;
                        border-radius: 2px 0 0 2px;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        color: #777E8C;
                        font-size: 24px;
                        cursor: pointer;
                        -moz-user-select: none; /*火狐*/
                        -webkit-user-select: none; /*webkit浏览器*/
                        -ms-user-select: none; /*IE10*/
                        -khtml-user-select: none; /*早期浏览器*/
                        user-select: none;
                    }
                    .no-border-right {
                        border-right: none;
                    }
                    .no-border-left {
                        border-left: none;
                    }
                    .num-input {
                        width: 43px;
                        height: 30px;
                    }
                }
                .message-bottom{
                    display: block;
                    width: 100%;
                    background: #F2F8FE;
                    padding: 20px 40px 20px 26px;
                    text-align: right;
                    .smell-word{
                        display: inline-block;
                        font-size: 16px;
                        color: #2B3642;
                        line-height: 16px;
                    }
                    .goods-mount{
                        display: inline-block;
                        font-size: 14px;
                        color: #7E98AC;
                        margin-right: 0.5%;
                    }
                    .chinese-mountred{
                        font-size: 24px;
                        color: #FF4432;
                        line-height: 24px;
                        margin-right:2.1%;
                    }
                    .chinese-mm{
                        font-size: 12px;
                        color: #FF4432;
                        line-height: 12px;
                    }
                    .chinese-mountred{
                        font-size: 24px;
                        color: #FF4432;
                        line-height: 24px;
                        margin-right:2.1%;
                    }
                    .input-smell{
                        display: inline-block;
                        width: 27%;
                        height: 30px;
                        margin-left: 0.5%;
                        margin-right: 9.7%;
                        background-color: #ffffff;
                    }
                }
            }
            .no-list {
                .nolist-txt2 {
                    margin-top: 16px;
                }
                .empty-blue {
                    color: #409EFF;
                }
            }
            .table-footer {
                background: #F6F5F5;
                padding: 7.5px 47px;
                text-align: right;
                .table-th {
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 28px;
                    min-width: 40px;
                    display: inline-block;
                }
                .footer-del {
                    font-size: 16px;
                    color: #409EFF;
                    line-height: 16px;
                    margin-left: 40px;
                }
                .footer-time {
                    font-size: 20px;
                }
                .confirm{
                    height: 40px;
                    display: inline-block;
                    background: #409EFF;
                    border-radius: 2px;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 40px;
                    width: 124px;
                    min-width: 124px;
                    display: inline-block;
                    cursor: pointer;
                }
            }
        }
    }
</style>
