<template>
    <div class="canteen-cart-big"  v-if="response">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>采购货源</el-breadcrumb-item>
            <el-breadcrumb-item>我的订货单</el-breadcrumb-item>
        </el-breadcrumb>
       <div class="step-box">
           <div class="steps">
               <el-steps :space="158" :active="1" finish-status="success">
                   <el-step title="我的订货单" class="steps-word"></el-step>
                   <el-step title="确认订单信息" class="steps-word"></el-step>
                   <el-step title="成功提交订单" class="steps-word"></el-step>
               </el-steps>
           </div>
       </div>

        <div class="title-box clearfix">
            <div class="small-title fl">全部商品{{cartList|getStartTotalNumber}}</div>
            <div class="small-title-square fl"></div>
        </div>

        <div class="cart-list-box">
            <div class="table-thead flex-box">
                <div class="table-th flex-1" style="min-width: 260px">
                    <el-checkbox v-model="checkedAll" @change="checkedAllChange($event)">商品信息</el-checkbox>
                </div>
                <div class="text-align-center table-th" style="width:160px;">单价(元)</div>
                <div class="text-align-center table-th" style="width: 160px;display: inline-block">数量(件)</div>
                <div class="text-align-center table-th" style="width: 150px">金额</div>
                <div class="text-align-center table-th width100">操作</div>
            </div>

            <div v-if="cartList.length>0">
                <div class="order-table-box" v-for="(item,index) of cartList" :key="index">
                    <div class="order-table-head">
                        <span><el-checkbox v-model="checkedList[index].checkParent"
                                           @change="checkedParentChange($event,index)"></el-checkbox></span>
                        <span class="head-middle-span">供应商：{{item.supplierName}}</span>
                        <span>联系人：{{item.supplierContact}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.supplierContactPhone}}</span>
                    </div>
                    <div class="table-tr flex-box" v-for="(item2,index2) of item.subCartGoodsVoList" :key="index2">
                        <div class="table-td flex-1 flex-box" style="min-width: 260px">
                            <el-checkbox class="" v-model="checkedList[index].checkChildList[index2]"
                                         @change="checkedChildChange($event,index,index2)"></el-checkbox>
                            <img :src="item2.goodsMainPic" class="shop-img fl" v-if="item2.goodsMainPic">
                            <img src="../../../assets/img/img.png" class="shop-img " v-else>
                            <div class="shop-name  flex-1" :title="item2.goodsName">
                                {{item2.goodsName}}
                            </div>
                        </div>
                        <div class="text-align-left table-td" style="width: 160px;"><span class="price-size"><span
                                class="small-size">￥</span>{{item2.goodsPrice&&item2.goodsPrice.toFixed(2)}}</span>/{{item2.goodsNetContent}}{{item2.goodsNetContentUnit}}
                        </div>
                        <div class="text-align-center table-td relative-td" style="width: 160px">
                            <div class="count-num-box clearfix">
                                <i class="fl no-border-right" @click="contNum(item2,-1)">-</i>
                                <el-input type="tel" @keyup.native="keyupNum(item2)" class="fl num-input" maxlength="3"
                                          v-model="item2.goodsNum"  @blur="contNum(item2)"></el-input>
                                <i class="fl no-border-left" @click="contNum(item2,1)">+</i>
                            </div>
                        </div>
                        <div class="text-align-center table-td" style="width: 150px">
                                <span class="price-size"><span
                                        class="small-size">￥</span>{{item2|getGoodsTotalPrice}}</span></div>
                        <div class="text-align-center table-td width100 td-del" style="cursor: pointer" @click="delShop(item2,item)">
                            删除
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-list" v-else>
                <img src="../../../assets/img/emptyGoods.png" class="nolist-img">
                <div class="nolist-txt">您还未添加商品，赶快去选商品吧</div>
                <div class="nolist-txt nolist-txt2">去<span class="empty-blue cursor-pointer" @click="goHome()">采购货源</span>页添加商品</div>
            </div>

            <div class="table-footer flex-box" v-if="cartList.length>0">
                <div class="table-th flex-1" style="min-width: 200px">
                    <el-checkbox v-model="checkedAll" @change="checkedAllChange($event)">全选</el-checkbox>
                    <span :class="allDel ? 'footerdel' : 'footerdeepcolor'" @click="delShop()">批量删除</span>
                </div>
                <div class="text-align-center table-th" style="width: 150px;min-width: 140px">
                    商品数量<span class="price-size">{{cartList,checkedList|getTotalNumber}} 件</span>
                </div>
                <div class="text-align-center table-th" style="width: 180px;min-width: 140px">
                    总金额 <span class="price-size"><span class="small-size">￥</span>{{cartList,checkedList|getTotalPrice}}</span>
                </div>
                <div @click="goCofirm()" :class="confirmHight ? 'addconfirm' : 'lightconfirm'">
                    确认
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "canteen-cart-big",
        data() {
            return {
                checked: false,
                checkedAll: false, // 列表上下的全选
                checkedList: [], // 表格里所有的全选
                multipleSelection: [],
                cartList: [],
                confirmHight: true,
                response: false, // 加载完成
                allDel: true,
            }
        },
        mounted(){
            this.init();
        },
        filters: {
            getGoodsTotalPrice(item) {
                let goodsTotalPrice;
                goodsTotalPrice = item.goodsNum * item.goodsPrice*1;
                item.goodsTotalPrice = goodsTotalPrice.toFixed(2);
                return goodsTotalPrice.toFixed(2)
            }, // 获取每一个商品的总计
            getTotalNumber(item, checkedList) {
                let totalNumber = 0;
                for (let i = 0; i < item.length; i++) {
                    for (let j = 0; j < item[i].subCartGoodsVoList.length; j++) {
                        if (checkedList[i].checkChildList[j]) {
                            totalNumber += item[i].subCartGoodsVoList[j].goodsNum*1;
                        }
                    }
                }
                item.totalNumber = totalNumber;
                return totalNumber;
            }, // 获取总数量
            getStartTotalNumber(item) {
                let totalNumber = 0;
                for (let i = 0; i < item.length; i++) {
                    for (let j = 0; j < item[i].subCartGoodsVoList.length; j++) {
                        totalNumber += item[i].subCartGoodsVoList[j].goodsNum * 1;
                    }
                }
                item.totalNumber = totalNumber;
                return totalNumber;
            }, // 获取总数量
            getTotalPrice(item, checkedList) {
                let totalPrice = 0;
                for (let i = 0; i < item.length; i++) {
                    for (let j = 0; j < item[i].subCartGoodsVoList.length; j++) {
                        if (checkedList[i].checkChildList[j]) {
                            totalPrice += item[i].subCartGoodsVoList[j].goodsTotalPrice*1;
                        }
                    }
                }
                item.totalPrice = totalPrice.toFixed(2);
                return totalPrice.toFixed(2);
            }, // 获取总金额
        },
        methods: {
            init(){
                this.getCanteenOrderList();
            },
            keyupNum(item){
                item.goodsNum=item.goodsNum.replace(/[^\d]/g,'')
            }, // 只能输入数字
            goHome() {
                this.$router.push({
                    'name': 'canteenPurchase',
                })
            }, // 去采购货源首页
            //获取list列表
            getCanteenOrderList(){
                let param = {};
                this.$api.canteen.getCartList(param).then(res => {
                    if (res.meta.code == 0) {
                        if(res.data&&res.data.subCartVoList){
                            this.cartList = res.data.subCartVoList;
                            this.getCheckList(res.data.subCartVoList);
                        }
                        this.response = true;
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                    if( this.cartList.totalPrice == 0 && this.cartList.totalNumber == 0 ){
                        this.confirmHight = false;
                    }else{
                        this.confirmHight = true;
                    }
                })
            },
            getCheckList(cartList) {
                // checkedList: [
                //     {
                //         checkParent: false,
                //         checkChildList: [ false,true]
                //     }
                // ],
                let checkedList = [];
                for (let i = 0; i < cartList.length; i++) {
                    checkedList[i] = {};
                    checkedList[i].checkParent = false;
                    checkedList[i].t = 0;
                    checkedList[i].checkChildList = [];
                    for (let j = 0; j < cartList[i].subCartGoodsVoList.length; j++) {
                        if (!cartList[i].subCartGoodsVoList[j].isSelect) {
                            checkedList[i].checkChildList[j] = true;
                            checkedList[i].t++;
                        } else {
                            checkedList[i].checkChildList[j] = false;
                        }
                    }
                }
                this.checkedList = checkedList;

                this.setCheckedParentAndAll();
            }, // 根据cartList获取checkedList
            //确认按钮
            goCofirm(){
                if( this.cartList.totalPrice != 0 && this.cartList.totalNumber != 0 ){
                    this.$router.push({name:"canteenConfirmOrder"})
                }
            },
            contNum(item, i) {
                let isAjax = true;
                if (i) {
                    item.goodsNum = item.goodsNum * 1 + i * 1;
                }
                if (item.goodsNum > 999) {
                    isAjax = false;
                    item.goodsNum = 999;
                } else if (item.goodsNum < 1) {
                    isAjax = false;
                    item.goodsNum = 1;
                } else {
                    isAjax = true;
                }

                let idArr = [];
                idArr.push(item.id);
                let param = {
                    subCartGoodsId: item.id,
                    goodsNum: item.goodsNum,
                    goodsId: item.goodsId,
                    cartId: item.cartId
                };
                if (isAjax) {
                    this.addNumAjax(param);
                }
            }, // 加减数量
            addNumAjax(param) {
                this.$api.canteen.cartAddNum(param).then(res => {
                    if (res.meta.code == 0) {
                        this.getCanteenOrderList();
                    }else if(res.meta.code==300003){
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: '您输入的商品数量超过我的订货单数量限制，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    }else if(res.meta.code==300001){
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: '您输入的商品数量超过库存，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    } else {
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 加减数量ajax
            getCartId() {
                let cartId = '';
                for (let i = 0; i < this.checkedList.length; i++) {
                    for (let j = 0; j < this.checkedList[i].checkChildList.length; j++) {
                        if (this.checkedList[i].checkChildList[j]) {
                            cartId = this.cartList[i].subCartGoodsVoList[j].cartId;
                        }
                    }
                }
                return cartId;
            }, // 获取选中的cartId
            delShop(item2) {
                let idArr = [];
                let cartId;
                let delFlag = false;
                let delTitle = '';
                if (item2) { // 单个删除
                    idArr.push(item2.id);
                    cartId = item2.cartId;
                    delFlag = true;
                    delTitle = '确认要将所选商品删除？';
                } else {
                    cartId = this.getCartId();
                    idArr = this.getCheckArr();
                    if (idArr.length <= 0) {
                        this.$message({
                            message: '请选择商品',
                            type: 'warning'
                        });
                    } else {
                        delFlag = true;
                    }
                    delTitle = '确认要将所选商品全部删除？';
                }
                if (delFlag) {
                    this.$confirm(delTitle, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let param = {
                            subCartGoodsIds: idArr,
                            cartId: cartId
                        };
                        this.delShopAjax(param);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }

            }, // 删除商品
            delShopAjax(param) {
                this.$api.canteen.cartRemove(param).then(res => {
                    if (res.meta.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getCanteenOrderList();
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 删除商品接口
            selectShopAjax(param) {
                this.$api.canteen.cartSelect(param).then(res => {
                    if (res.meta.code == 0) {
                        this.getCanteenOrderList();
                    }else if(res.meta.code==300003){
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: '您输入的商品数量超过我的订货单数量限制，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    }else if(res.meta.code==300001){
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: '您输入的商品数量超过库存，请重新输入！',
                            duration: 1000,
                            center: true
                        });
                    } else {
                        this.getCanteenOrderList();
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 选中、未选中商品接口
            checkedChildChange(event, i, j) {
                this.checkedList[i].checkChildList[j] = event;
                this.setCheckParentT(i);
                // this.setCheckedParentAndAll();

                let selectIdArr = [];
                selectIdArr.push(this.cartList[i].subCartGoodsVoList[j].id);
                let cartId = this.cartList[i].subCartGoodsVoList[j].cartId;
                let goodsNum = this.cartList[i].subCartGoodsVoList[j].goodsNum;
                let goodsId = this.cartList[i].subCartGoodsVoList[j].goodsId;
                let param = {
                    subCartGoodsIds: selectIdArr,
                    isSelect: event ? 0 : 1,
                    goodsNum: goodsNum,
                    goodsId: goodsId,
                    cartId: cartId
                };
                this.selectShopAjax(param)
            }, // 表格里的checkChild改变
            setCheckParentT(i) {
                this.checkedList[i].t = 0;
                for (let j = 0; j < this.cartList[i].subCartGoodsVoList.length; j++) {
                    if (this.checkedList[i].checkChildList[j]) {
                        this.checkedList[i].t++;
                    }
                }
            },  // 根据checkedChild设置CheckParentT
            checkedParentChange(event, i) {
                for (let j = 0; j < this.checkedList[i].checkChildList.length; j++) {
                    this.checkedChildChange(event, i, j);
                }
            },  // 表格里的checkedParentChange改变
            checkedAllChange(event) {
                for (let i = 0; i < this.checkedList.length; i++) {
                    this.checkedParentChange(event, i)
                }
            },  // 表头和表尾的checkedAll改变
            getCheckArr() {
                let idArr = [];
                for (let i = 0; i < this.checkedList.length; i++) {
                    for (let j = 0; j < this.checkedList[i].checkChildList.length; j++) {
                        if (this.checkedList[i].checkChildList[j]) {
                            idArr.push(this.cartList[i].subCartGoodsVoList[j].id);
                        }
                    }
                 }
                 return idArr;
            },// 获取当前选中的所有id  数组形式
            setCheckedParentAndAll() {
                let t = 0;
                for (let i = 0; i < this.checkedList.length; i++) {
                    if (this.checkedList[i].t === this.checkedList[i].checkChildList.length) {
                        this.checkedList[i].checkParent = true;
                        t++;
                    } else {
                        this.checkedList[i].checkParent = false;
                    }
                }
                if (t === this.checkedList.length && t!=0) {
                    this.checkedAll = true
                } else {
                    this.checkedAll = false
                }

                if (this.getCheckArr().length > 0) {
                    this.allDel = false;
                } else {
                    this.allDel = true;
                }

                this.$options.filters['getTotalNumber'](this.cartList, this.checkedList);
                this.$options.filters['getTotalPrice'](this.cartList, this.checkedList);
            }, // 根据CheckParentT设置checkParent和checkedAll状态

            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                font-size: 20px;
                color: #FFFFFF;
                text-align: center;
                padding: 6px 10px;
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
        .cart-list-box {
            .table-thead {
                background: #F6F5F5;
                padding: 20px 47px;
                .table-th {
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 16px;
                }
            }
            .order-table-box {
                border-bottom: 1px solid #EAEDF1;
                .order-table-head {
                    font-size: 16px;
                    color: #409EFF;
                    line-height: 14px;
                    padding: 22px 47px;
                    .head-middle-span {
                        margin: 0 40px 0 20px;
                    }
                    span {
                        display: inline-block;
                    }
                }
                .shop-img {
                    border: 1px solid #EFEFEF;
                    margin-left: 24px;
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
                    font-size: 14px;
                    color: #FF4432;
                    line-height: 24px;
                }
                .table-tr {
                    padding: 20px 47px;
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
            }
            .no-list {
                .nolist-txt2 {
                    margin-top: 16px;
                }
                .empty-blue {
                    color: #409EFF;
                }
            }
            .footer-tips {
                font-size: 16px;
                color: #F5A623;
                line-height: 20px;
                padding: 22px 47px;
                .tips-img {
                    width: 20px;
                    height: 20px;
                    margin-right: 17px;
                }
            }
            .table-footer {
                background: #F6F5F5;
                padding: 7.5px 47px;
                line-height: 55px;
                .table-th {
                    font-size: 16px;
                    color: #2B3642;
                    line-height: 40px;
                    min-width: 40px;
                }
                .footerdel {
                    font-size: 16px;
                    color: #A3C7EC;
                    line-height: 16px;
                    margin-left: 40px;
                    cursor: pointer;
                }
                .footerdeepcolor {
                    font-size: 16px;
                    color: #409EFF;
                    line-height: 16px;
                    margin-left: 40px;
                    cursor: pointer;
                }
                .footer-time {
                    font-size: 20px;
                }
              .addconfirm{
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
                  cursor:pointer
              }
                .lightconfirm{
                    height: 40px;
                    display: inline-block;
                    background: #A3C7EC;
                    border-radius: 2px;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 40px;
                    width: 124px;
                    min-width: 124px;
                }
            }
            .el-checkbox__label {
                font-size: 16px;
                color: #2B3642;
                line-height: 16px;
                min-width: 40px;
                padding-left: 24px;
            }
        }
    }
</style>
<style lang="less">
    .canteen-cart-big {
        .num-input {
            input {
                height: 100%;
                line-height: 100%;
                border-radius: 0;
                position: absolute;
                top: 0;
                left: 0;
                padding: 0 5px;
            }
        }
        .cart-list-box {
            .el-checkbox__label {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #2B3642;
                line-height: 16px;
                min-width: 40px;
                padding-left: 24px;
            }
        }
    }
</style>
