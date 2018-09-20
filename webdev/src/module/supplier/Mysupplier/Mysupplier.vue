<template>
    <div class="my-supplier">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mySupplier' }">我的商品库</el-breadcrumb-item>
        </el-breadcrumb>

        <!--<div class="header-title">
            <span class="left-line"></span>
            <span>我的商品库</span>
        </div>-->
        <div class="search-total-pakc">
            <p class="title-nav">我的商品库</p>
        </div>
        <div class="select-box" v-if="isResponsed&&isLoadData">
            <span class="select-des-type">商品品类</span>
            <el-select v-model="goodsTypeValue" placeholder="全部" @change="getTypeValue">
                <el-option
                        v-for="item in goodsTypeArray"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <span class="select-des-status">商品状态</span>
            <el-select v-model="goodsStatusValue" placeholder="全部" @change="getStatusValue">
                <el-option
                        v-for="item in goodsStatusArray"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <div class="goods-in" @click="goEnter">商品录入</div>
        </div>
        <div class="my-supplier-table">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <div slot="empty" class="empty" >
                    <div class="noContent" v-if="isResponsed&&(goodsStatusValue!='全部'||goodsTypeValue!=0)">
                        <img   style="width: 120px;height: auto;margin-top: 100px" src="../../../assets/img/noShop.png" alt="">
                        <div  style="margin-top: 30px;margin-bottom: 60px">未发现相关的商品信息</div>

                    </div>
                    <div class="noContent" v-if="isResponsed&&goodsStatusValue=='全部'&&goodsTypeValue==0">
                        <img   style="width: 120px;height: auto;margin-top: 100px" src="../../../assets/img/noShop.png" alt="">
                        <div  style="margin-top: 30px;margin-bottom: 30px">未发现商品信息，快去上传商品吧</div>
                        <div style="display: inline-block;width: 100px;font-size: 16px;color: #FDFDFD;text-align: center;line-height: 30px;margin-left: 20px; background: #409EFF;border-radius: 2px;cursor: pointer; margin-bottom: 60px;"  @click="goEnter">商品录入</div>
                    </div>
                </div>
                <el-table-column
                        prop="index"
                        label="编号"
                >
                </el-table-column>
                <el-table-column label="商品信息" min-width="200">
                    <template slot-scope="scope">
                        <img class="table-icon" v-if="scope.row.icon==''" src="./images/nopic.png">
                        <img class="table-icon" v-else :src="scope.row.icon">
                        <span class="table-icon-des" :title="scope.row.name">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
               <!-- <el-table-column
                        prop="icon"
                        label="商品信息">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="">
                </el-table-column>-->
                <el-table-column
                        prop="typeName"
                        label="商品品类">
                </el-table-column>
                <el-table-column
                        prop="priceUnitShow"
                        label="单价/单位">
                </el-table-column>
                <el-table-column
                        prop="stock"
                        label="库存">
                </el-table-column>
                <el-table-column label="商品状态">
                    <template slot-scope="scope">

                        <span v-if="scope.row.statusText=='待上架'" class="status-1">{{scope.row.statusText}}</span>
                        <span v-if="scope.row.statusText=='已下架'" class="status-2">{{scope.row.statusText}}</span>
                        <span v-if="scope.row.statusText=='补货中'" class="status-3">{{scope.row.statusText}}</span>
                        <span v-if="scope.row.statusText=='货源充足'" class="status-4">{{scope.row.statusText}}</span>

                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="edit-button" @click="goDetail(scope.row.id,scope.row.supplierId)">查看</span>
                        <span class="edit-button" v-if="scope.row.status===5||scope.row.status===3" @click="goEdit(scope.row.id)">编辑</span>
                        <span class="edit-button" v-if="scope.row.status===5||scope.row.status===3" @click="goDelete(scope.row.id)">删除</span>
                        <span class="edit-button" v-if="scope.row.status===1" @click="goAddGoods(scope.row)">补货</span>
                        <span class="edit-button" v-if="scope.row.status===1" @click="offLine(scope.row.id)">下架</span>
                        <span class="edit-button" v-if="scope.row.status===3" @click="goOnline(scope.row.id)">上架商品</span>
                    <!--    <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->

                    </template>
                </el-table-column>



            </el-table>
        </div>


        <div class="page-box" v-if="tableData.length>0">
            <Paging :totalNumber="page.totalNumber" :pageShowTotal="page.pageSize" @callBack="showPage" :showActivePageIndex="page.pageNum"></Paging>
        </div>

        <!--补货弹窗-->
        <div class="all-div-m" v-show="showDiv">
            <div class="add-goods-div">
                <div class="add-goods-title">补货 <img src="./images/close.png" class="close-icon" @click="closePic"></div>
                <div class="add-goods-name" :title="divName">商品名称：{{divName}}</div>
                <div class="add-goods-stock">库存量：{{divStock}}</div>
                <div class="add-goods-stock-m must-have-star">补货量：</div>
                <el-form style="display: inline-block;margin-top: 8px" :model="obj" :rules="rules" ref="ruleForm" >
                    <el-form-item  prop="goodsNum">
                        <el-input style="width: 335px;"  oninput="if(value.length>4)value=value.slice(0,4)"  type="number" v-model.number="obj.goodsNum" placeholder="输入补货量" maxlength="4" ></el-input>
                    </el-form-item>
                </el-form>
                <span class="add-goods-des">商品总量(单件商品的数量)</span>
                <div class="mn-button-list">
                    <span class="button-ok" @click="addGoods">确认补货</span>
                    <span class="button-cancel" @click="closePic">取消补货</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Paging from '../../../components/common/Paging'

    export default {
        name: "mySupplier",
        components: {
            Paging
        },

        data() {
            return {
                showDiv:false,
                isResponsed:false,
                isLoadData:false,//是否录入过数据
                divStock:'',//弹窗库存量
                goodsAddId:'',//补货ID
                divName:'',
                goodsTypeArray:[{
                    id:0,
                    name:'全部'
                }],//商品品类
                goodsTypeValue:0,

                goodsStatusArray:[
                    {
                        id:null,
                        name:'全部'
                    },{
                        id:1,
                        name:'货源充足'
                    },{
                        id:1,
                        name:'补货中'
                    },{
                        id:5,
                        name:'待上架'
                    },{
                        id:3,
                        name:'已下架'
                    }
                 ],
                goodsStatusValue:'全部',

                tableData:[],//列表数据集合

                page: {
                    pageSize: 10, // 每页展示多少条
                    totalNumber: 0, // 总条数
                    pageNum: 1, // 当前第几页
                    thisTotalNumber: '', // 当前页总条数
                },
                obj:{
                  goodsNum:0
                },
                rules: {
                    goodsNum: [
                        {required: true, message: '请输入补货量', trigger: 'blur'},
                        { type: 'number', message: '请输入数字内容信息'}
                    ],
                },

            }
        },
        mounted() {
            this.goodsTypeArray=[{
                id:0,
                name:'全部'
            }]
            this.showDiv = false
            this.isResponsed= false
            this.divStock=''
            this.divName = ''
            this.goodsAddId = ''
            this.goodsStatusArray=[
                {
                id:null,
                name:'全部'
                },{
                    id:1,
                    name:'货源充足'
                },{
                    id:1,
                    name:'补货中'
                },{
                    id:5,
                    name:'待上架'
                },{
                    id:3,
                    name:'已下架'
                }
            ]
            this.getTypeList()
            this.getGoodsList()
        },
        computed: {

        }, // 计算属性

      /*  beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            to.meta.keepAlive = false;  // B 跳转到 A 时，让 A 缓存，即不刷新
            next();
        },*/

        methods: {


            getTypeList(){
                var param = {
                    parentId : 0
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.goodsTypeArray=[{
                            id:0,
                            name:'全部'
                        }]
                        for(let i in list){
                            this.goodsTypeArray.push(list[i])
                        }
                        this.goodsTypeValue = this.goodsTypeArray[0].id


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            getTypeValue(){
                this.page.pageNum=1
                this.getGoodsList();
            },

            getStatusValue(){
                this.page.pageNum=1
                this.getGoodsList();
            },

            closePic(){
                this.showDiv = false
            },
/*            addTwoNums(){



              if((this.divStock+this.obj.goodsNum)>9999){
                  this.$message.warning({
                      message: '库存量最高为9999，您输入的补货量与原库存之和超限',
                      duration: 2000,
                      center: true
                  });
                  return false
              }

            },*/

            goAddGoods(item){

                if(item.stock===9999){
                    this.$message.warning({
                        message: '目前库存量已满，不能补货',
                        duration: 1500,
                        center: true
                    });
                    return false
                }
                this.$refs.ruleForm.resetFields()
                this.showDiv = true
                this.divStock = item.stock
                this.divName = item.name
                this.goodsAddId = item.id

            },


            addGoods(){
                if(this.obj.goodsNum===''){
                    this.$message.warning({
                        message: '请输入补货量',
                        duration: 1500,
                        center: true
                    });
                    return false
                }
                if(this.obj.goodsNum<0){
                    this.$message.warning({
                        message: '请输入正确的补货量',
                        duration: 1500,
                        center: true
                    });
                    return false
                }
                if((this.divStock+this.obj.goodsNum)>9999){
                    this.$message.warning({
                        message: '库存量最高为9999，您输入的补货量与原库存之和超限',
                        duration: 2000,
                        center: true
                    });
                    return false
                }
                var param = {
                    id:this.goodsAddId,
                    stock:Number(this.divStock+this.obj.goodsNum)
                }
                this.$api.supplier.SupplierUpdateGoods(param).then(res => {
                    if (res.meta.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '补货成功!'
                        });

                        this.getGoodsList();
                        this.showDiv = false


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //获取商品列表
            getGoodsList(){
                if(this.goodsStatusValue==='货源充足'){
                    var param = {
                        pageNum: this.page.pageNum,
                        pageSize: 10,
                        status:1,
                        typeId:this.goodsTypeValue,
                        stock:1
                    }
                }
                else if(this.goodsStatusValue==='补货中'){
                    var param = {
                        pageNum: this.page.pageNum,
                        pageSize: 10,
                        status:1,
                        typeId:this.goodsTypeValue,
                        stock:0
                    }
                }else if(this.goodsStatusValue==='待上架'){
                    var param = {
                        pageNum: this.page.pageNum,
                        pageSize: 10,
                        status:5,
                        typeId:this.goodsTypeValue,
                    }
                }else if(this.goodsStatusValue==='已下架'){
                    var param = {
                        pageNum: this.page.pageNum,
                        pageSize: 10,
                        status:3,
                        typeId:this.goodsTypeValue,
                    }
                }else{
                    var param = {
                        pageNum: this.page.pageNum,
                        pageSize: 10,
                        status:null,
                        typeId:this.goodsTypeValue,
                    }
                }

                this.$api.supplier.getSuppliedGoodsById(param).then(res => {
                    this.isResponsed= true
                    if (res.meta.code == 0) {
                        var data = res.data||{}
                        var list = data.list||[]
                        this.page.totalNumber=data.total
                        this.tableData = list
                        if(this.tableData.length>0){
                            this.isLoadData = true
                            var iconUrl = ''
                            for(let i in this.tableData){
                                //索引
                                this.tableData[i].index = Number((this.page.pageNum-1)*10)+Number(i)+1
                                //单价
                                this.tableData[i].priceUnitShow = '¥'+this.tableData[i].unitPrice+'/'+this.tableData[i].netContent+this.tableData[i].netContentUnitName
                                //商品状态
                                if(this.tableData[i].status===1&&this.tableData[i].stock>0){
                                    this.tableData[i].statusText = '货源充足'
                                }else if(this.tableData[i].status===1&&this.tableData[i].stock===0){
                                    this.tableData[i].statusText = '补货中'
                                }else if(this.tableData[i].status===5){
                                    this.tableData[i].statusText = '待上架'
                                }else if(this.tableData[i].status===3){
                                    this.tableData[i].statusText = '已下架'
                                }

                                this.tableData[i].unitPrice = this.tableData[i].unitPrice.toFixed(2)
                                //处理表格中的图片（主图）
                                if(this.tableData[i].pics.length==0){
                                    iconUrl=''
                                }else{
                                    for(let j in this.tableData[i].pics){
                                        if(this.tableData[i].pics[j]){
                                            if(this.tableData[i].pics[j].isMain===1){
                                                iconUrl = this.tableData[i].pics[j].url
                                            }
                                        }else{
                                            iconUrl = ''
                                        }

                                    }
                                }
                                this.tableData[i].icon = iconUrl
                            }
                        }



                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1500,
                            center: true
                        });
                    }

                })
            },

            goEnter(){
                this.$router.push({name:'supplierEnter'})
            },

            showPage(thisPage,selectShowNumber){
                this.page.pageNum = thisPage;
                this.getGoodsList();
            }, // 分页

            //查看详情
            goDetail(id,supplierId){
                console.log(id,supplierId)
                this.$router.push({name:'supplierDetail',params:{id:id,supplierId:supplierId}})
               /* this.$router.push({name: 'supplierDetail', query: {
                    id: id,
                    supplierId:supplierId
                }})
                return false;

                var {href} = this.$router.resolve({
                    name: 'supplierDetail',
                    query: {
                        id: id,
                        supplierId:supplierId
                    }
                });
                window.open(href, '_blank')*/

            },

            //去编辑
            goEdit(id){
                this.$router.push({path:'/supplierEdit',query:{id:id}})
            },

            //下架
            offLine(id){

                var param={
                    id:id,
                    status:3
                }
                this.$confirm('商品下架后，采购端用户将无法看到此商品信息，确认下架？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.supplier.SupplierUpdateGoods(param).then(res => {
                        if (res.meta.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                            this.getGoodsList();


                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });

            },

            goOnline(id){
                var param={
                    id:id,
                    status:1
                }
                this.$confirm('点击后商品重新上架，确认上架？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.supplier.SupplierUpdateGoods(param).then(res => {
                        if (res.meta.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                            this.getGoodsList();


                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });

            },



            //删除
            goDelete(id){
                var param={
                    id:id,
                    status:4
                }
                this.$confirm('确认从商品库中将此条商品信息删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.supplier.SupplierUpdateGoods(param).then(res => {
                        if (res.meta.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getGoodsList();


                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },



        }
    }
</script>

<style scoped>
    @import "../../../assets/css/supplier.css";
</style>
<style scoped lang="less" rel="stylesheet/less">
    .my-supplier{
        min-width: 1300px;
    }
    .header-title{
        font-size: 16px;
        font-weight: bold;
        height:40px;
        margin-top: 30px;
        line-height: 40px;
        position: relative;
        padding-left: 12px;
        color: #000000;
    }
    .search-total-pakc {
        float: left;
        font-size: 16px;
        line-height: 20px;
        color: #FDFDFD;
        width: 100%;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .search-total-pakc .title-nav{
        background: #A3C7EC;
        border-radius: 1px;
        width: 127px;
        text-align: center;
        position: relative;
        line-height: 40px;
        font-weight: bold;
    }
    .search-total-pakc .title-nav:after{
        position: absolute;
        content: "";
        top: 0;
        left: 99%;
        border-left: 40px solid #A3C7EC;
        border-top: 40px solid transparent;

    }
    .all-div-m{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        right:0;
        bottom: 0;
        left:0;
        background: rgba(0,0,0,0.30);
        z-index: 99;
    }
    .add-goods-title{
        font-size: 16px;
        color: #424754;
        line-height: 16px;
    }
    .mn-button-list{
        margin-top: 30px;
        width:100%;
        text-align: center;
    }
    .add-goods-des{
        font-size: 14px;
        color: #AEAEAE;
        letter-spacing: 0;
        line-height: 14px;
        display: block;
    }
    .button-ok{
        display: inline-block;
        width:80px;
        height:30px;
        background: #409EFF;
        border-radius: 2px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 30px;
    }
    .button-cancel{
        display: inline-block;
        width:80px;
        height:30px;
        background: #F8F8F8;
        border: 1px solid #EAEDF1;
        border-radius: 2px;
        font-size: 14px;
        color: #2B3642;
        text-align: center;
        line-height: 30px;
        margin-left: 20px;
    }
    .add-goods-stock{
        margin-top: 15px;
        font-size: 14px;
        color: #3D474F;
        line-height: 30px;
        font-weight: bold;
    }
    .add-goods-stock-m{
        margin-top: 15px;
        font-size: 14px;
        color: #777E8C;
        letter-spacing: 0;
        line-height: 14px;
        text-indent: 10px;
        position: relative;
    }
    .must-have-star:before {
        content: "*";
        font-size: 18px;
        line-height: 24px;
        color: #FB6041;
        position: absolute;
        top: 50%;
        left: -10px;
        margin-top: 2px;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }
    .add-goods-name{
        margin-top: 20px;
        font-size: 14px;
        color: #3D474F;
        line-height: 30px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
    .add-goods-div{
        width: 400px;
        height: 340px;
        top: 50%;
        position: absolute;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: #ffffff;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
        border-radius: 2px;
        padding: 20px;
    }
    .close-icon{
        width:18px;
        height:18px;
        position: absolute;
        top:20px;
        right:20px;
        cursor: pointer;
    }
    .edit-button{
        font-size: 14px;
        color: #409EFF;
        line-height: 24px;
        display: inline-block;
        cursor: pointer;
    }
    .left-line{
        width: 2px;
        height: 13px;
        position: absolute;
        left: 0;
        top: 13px;
        background-color: #A3C7EC;
    }
    .select-box{
        margin-top: 90px;
    }
    .select-box{
        span{
            font-size: 14px;
            color: #777E8C;
            line-height: 14px;
            margin-right: 10px;
        }
        .select-des-status{
            margin-left: 40px;
        }
        .goods-in{
            display: inline-block;
            width:100px;
            font-size: 16px;
            color: #FDFDFD;
            text-align: center;
            line-height: 30px;
            margin-left: 20px;
            background: #409EFF;
            border-radius: 2px;
            cursor: pointer;
        }
    }
    .table-icon{
        width:90px;
        height:90px;
        background: #FFFFFF;
        border: 1px solid #EFEFEF;
    }
    .table-icon-des{
        position: absolute;
        top:27px;
        left:105px;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .table-icon-des{
            position: absolute;
            top:27px;
            left:105px;
            width: 70%;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
            white-space: normal;
        }
    }
    .my-supplier-table{
        margin-top: 20px;
    }
    .status-1{
        color: #F5A623;
    }
    .status-2{
        color: #FF4432;
    }
    .status-3{
        color: #515E65;
        opacity: 0.27;
    }
    .status-4{
        color: #8BC34A;
    }

</style>