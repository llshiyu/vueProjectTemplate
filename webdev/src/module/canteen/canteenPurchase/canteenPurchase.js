import {getQueryStringHr, _sessionStorage} from '../../../assets/js/util'
import Paging from '../../../components/common/Paging'

export default {
    components: {
        Paging
    },
    data() {
        return {
            isCategoryShowAll:false, //是否展开全部

            //点击是否展开我的订单
            detailsActivated: false,
            //是否展示搜索页面
            isSearch: false,

            //种类数据
            category: {
                // categoryId:0,//品类id
                currentShowData: [],
                parentObj: {},
                data: [],
                levelList: [],
            },

            //商家数据
            merchantData: {
                merchantShowData: {},
                merchantListData: []
            },

            //总条数
            totalNumber: 0,   //总页数

            //首页列表
            configList: [],
            isGetGoodsAndMyOrdered: false,  //首页列表是否请求完成
            //搜索列表
            searchList: [],
            isSearched: false,
            //购物车列表
            getGoodsList: [],
            //购物车总金额
            // totalMoney:0,

            //页面搜索input
            keyword: "",

            //搜索数据
            searchData: {
                "page": 1,              //页数
                "pageShowNum": 60,          //分页条数

                "shopName": "",   //keyword
                "supplier": "", //供应商id
                "type": ""      //品类id
            }

        }
    },
    computed: {
        totalMoney(){
            var total = 0;
            if (this.getGoodsList && this.getGoodsList.length > 0) {
                for (var i = 0; i < this.getGoodsList.length; i++) {
                    total += this.getGoodsList[i].unitPrice * this.getGoodsList[i].goodsNum
                }
            }
            return total.toFixed(2);
        },
        myStockNum(){
            var total = 0;
            if (this.getGoodsList && this.getGoodsList.length > 0) {
                for (var i = 0; i < this.getGoodsList.length; i++) {
                    total += this.getGoodsList[i].goodsNum
                }
            }
            return total;
        }
    },
    /**
     * 数据绑定后还未生成Dom时执行（初次构建页面）
     */
    created: function () {


    },

    /**
     * keep-alive,组件被激活时执行
     */
    activated(){
        this.init()
    },
    /**
     * vue的DOM挂载之后执行
     */
    mounted(){

    },

    // vue内挂载其他方法
    methods: {
        /**
         * 页面加载
         */
        init(){
            //获取类品列表
            this.getTypeListFun();
            //获取供应商列表
            this.getSupplierFun();
            //获取首页类品列表
            this.getGoodsAndMyOrderFun();
            //获取我的订单列表
            this.getGoodslistFun();
        },

        /**
         * 点击搜索
         */
        searchOrder(){
            //格式化分页
            this.searchData.shopName = this.keyword.replace(/(^s*)|(s*$)/g, "");
            this.searchData.page = 1;             //页数
            //判断是否搜索（无搜索 、无选择供应商、无选择品类）
            if (this.searchData.shopName || this.merchantData.merchantShowData.supplierName || (this.category.levelList && this.category.levelList.length > 0)) {
                //打开搜索开关
                this.isSearch = true;
                this.getGoodsFun();
            } else {
                //关闭搜索开关
                this.isSearch = false;
                //获取首页类品列表
                this.getGoodsAndMyOrderFun();
            }


        },

        /**
         * 选择品类
         * @param obj
         */
        selectCategory(obj){
            this.category.parentObj = obj;

            var levelObj = ( obj.level||0 ) - 1;
            if(levelObj<0){
                levelObj = 0;
            }
            console.log(levelObj);
            this.category.levelList = this.category.levelList.slice(0, levelObj).concat(obj);

            //更新搜索品类id
            this.searchData.type = obj.id;

            //重新获取品类列表
            this.getTypeListFun();

            //清楚供应商选择选中状态并重新获取供应商
            this.merchantData.merchantShowData = {};
            this.getSupplierFun();
            //搜索商品
            this.searchOrder()
        },
        /**
         * 改变供应商
         * @param obj
         */
        merchantShowDataChange(obj){
            this.merchantData.merchantShowData = obj;
            //获取类品列表
            this.getTypeListFun();

            //更新供应商id
            this.searchData.supplier = obj.id;

            //搜索商品
            this.searchOrder()
        },

        /**
         * 删除品类
         * @param index
         */
        removeCategory(index){
            //重置类品数据
            this.category.levelList = this.category.levelList.slice(0, index);
            this.category.parentObj = this.category.levelList[index - 1] || {};


            if (this.category.parentObj.id) {
                this.searchData.type = this.category.parentObj.id
            } else {
                this.searchData.type = ""
            }
            //重新获取品类列表
            this.getTypeListFun();

            //清楚供应商选择选中状态并重新获取供应商
            this.merchantData.merchantShowData = {};
            this.getSupplierFun();
            //搜索商品
            this.searchOrder();
        },
        /**
         * 删除供应商
         * @param index
         */
        removeMerchant(){
            //重置类品数据
            this.merchantData.merchantShowData = {};

            //获取类品列表
            this.getTypeListFun();
            //删除供应商搜索条件
            this.searchData.supplier = "";
            //搜索商品
            this.searchOrder()
        },

        /**
         * 增加或者减少数量
         * @param item
         * @param num
         */
        inputAddNum(item, num){
            if (num) {
                item.addNum = item.addNum * 1 + num * 1;
            }
            //最小值判断
            if (item.addNum < 1) {
                item.addNum = 1;
                return false
            }
            //最大值判断
            if (item.addNum > item.stock) {
                item.addNum = item.stock
            }
            if (item.addNum > 999) {
                item.addNum = 999
            }
        },

        /**
         * 分页选择
         * @param index
         */
        showPageClick(index){
            this.searchData.page = index;
            this.getGoodsFun()
        },

        /**
         * 跳转详情
         */
        goCanteenDetails(item){
            this.$router.push({
                name: 'canteenDetails', query: {
                    id: item.id,
                    supplierId: item.supplierId
                }
            })
            return false;

            var {href} = this.$router.resolve({
                name: 'canteenDetails',
                query: {
                    id: item.id,
                    supplierId: item.supplierId
                }
            });
            window.open(href, '_blank')
        },
        /**
         * 购物车跳转详情
         */
        goCanteenDetails_2(item){
            this.$router.push({
                name: 'canteenDetails', query: {
                    id: item.goodsId,
                    supplierId: item.supplierId
                }
            });
            return false;

            var {href} = this.$router.resolve({
                name: 'canteenDetails',
                query: {
                    id: item.goodsId,
                    supplierId: item.supplierId
                }
            });
            window.open(href, '_blank')
        },

        /**
         * 跳转购物车列表详情
         */
        goCanteenCart(){
            this.$router.push({name: 'canteenCart'});
        },


        /**
         * 获取我的订单列表
         */
        getGoodslistFun(){

            var _this = this;
            this.$api.canteen.getGoodslist({}).then(res => {
                if (res.meta.code == 0) {
                    _this.getGoodsList = res.data || [];
                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })


        },
        /**
         * 获取商品类型列表
         */
        getTypeListFun(){
            var _this = this;
            var param = {

                "supplierId": null,
                "typeIdOne": null,
                "typeIdThree": null,
                "typeIdTwo": null
            };
            var level = (this.category.parentObj  && this.category.parentObj.level )||0 ;
            if( level == 1 ){
                param.typeIdOne = this.category.parentObj.id;
            }else if( level == 2 ){
                param.typeIdTwo = this.category.parentObj.id;
            }else if( level == 3 ){
                param.typeIdThree = this.category.parentObj.id;
            }
            param.supplierId =  this.merchantData.merchantShowData.id || null;

            this.$api.canteen.getGoodsType(param).then(res => {
                if (res.meta.code == 0) {
                    //绑定数据
                    _this.category.data = res.data;

                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })


        },
        /**
         * 获取商家列表
         */
        getSupplierFun(){
            var _this = this;
            var param = {};

            var level = (this.category.parentObj  && this.category.parentObj.level )||0 ;
            if( level == 1 ){
                param.typeIdOne = this.category.parentObj.id;
            }else if( level == 2 ){
                param.typeIdTwo = this.category.parentObj.id;
            }else if( level == 3 ){
                param.typeIdThree = this.category.parentObj.id;
            }

            this.$api.canteen.getSupplier(param).then(res => {
                if (res.meta.code == 0) {
                    //绑定数据
                    _this.merchantData.merchantListData = res.data;

                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
        },
        /**
         * 加入购物车
         * @param obj
         */
        addShopping(obj){
            var _this = this;
            var param = {
                "goodsId": obj.id,
                "goodsNum": obj.addNum,
                "supplierId": obj.supplierId
            };
            this.$api.canteen.cartSave(param).then(res => {
                if (res.meta.code == 0) {
                    //更新购物车
                    _this.getGoodslistFun();
                    _this.$message({
                        type: 'success',
                        message: '成功加入订货单!'
                    });
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
        },
        /**
         * 移出购物车
         * @param obj
         */
        cartRemove(obj){
            var _this = this;
            var param = {
                "cartId": obj.cartId,
                "subCartGoodsIds": [obj.subCartGoodsId]
            };
            this.$api.canteen.cartRemove(param).then(res => {
                if (res.meta.code == 0) {
                    //更新购物车
                    _this.getGoodslistFun();

                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
        },

        /**
         * 获取类品供应商列表
         */
        getGoodsAndMyOrderFun(){
            var _this = this;
            this.$api.canteen.getGoodsAndMyOrder({}).then(res => {
                _this.isGetGoodsAndMyOrdered = true;

                if (res.meta.code == 0) {
                    //添加商品加入购物车数量
                    var listData = res.data || [];
                    for (var i = 0; i < listData.length; i++) {
                        listData[i].list = listData[i].list || [];
                        for (var n = 0; n < listData[i].list.length; n++) {
                            listData[i].list[n].addNum = 1;
                        }
                    }
                    //挂载数据
                    _this.configList = listData;

                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
        },
        /**
         * 首页搜索
         */
        getGoodsFun(){
            var _this = this;
            //搜索数据
            var searchData = {
                "page": this.searchData.page,              //页数
                "pageShowNum": this.searchData.pageShowNum,          //分页条数
                "shopName": this.searchData.shopName,   //keyword
                "supplierId": this.searchData.supplier, //供应商id
            };

            var level = (this.category.parentObj  && this.category.parentObj.level )||0 ;
            if( level == 1 ){
                searchData.typeIdOne = this.searchData.type
            }else if( level == 2 ){
                searchData.typeIdTwo = this.searchData.type
            }else if( level == 3 ){
                searchData.typeIdThree = this.searchData.type
            }

            this.$api.canteen.getGoods(searchData).then(res => {
                if (res.meta.code == 0) {
                    res.data = res.data || {};
                    //添加商品加入购物车数量
                    var listData = res.data.list || [];
                    _this.totalNumber = res.data.total || 0;
                    for (var i = 0; i < listData.length; i++) {
                        listData[i].addNum = 1;
                    }
                    //挂载数据
                    _this.searchList = listData;
                    _this.isSearched = true;
                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
        },


    },

    /**
     * 监控数据
     */
    watch: {
        $route(to, from){
            console.log(from, 999999999999999999999)
        }
    }


}
