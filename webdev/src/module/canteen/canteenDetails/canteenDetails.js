import {getQueryStringHr} from '../../../assets/js/util'


export default {
    data() {
        return {
            id:"",  //详情id
            supplierId:"",  //供应商id

            detailsActivated: false,

            pageCommodityData:{}, //商品数据
            havePageCommodityData:false,


            imgData:{   //图片数据
                showImg:{
                    index:0,
                    data:{},
                },
                list:[]
            },

            //购物车列表
            getGoodsList:[],
            //供应商信息
            supplierData:{},
            //数量
            addCommodityNum:1,
        }
    },
    computed:{
        totalMoney(){
            var total = 0;
            if(this.getGoodsList && this.getGoodsList.length>0){
                for (var i=0;i<this.getGoodsList.length;i++){
                    total+= this.getGoodsList[i].unitPrice * this.getGoodsList[i].goodsNum
                }
            }
            return total.toFixed(2);
        },
        myStockNum(){
            var total = 0;
            console.log(this.getGoodsList,1111);
            if(this.getGoodsList && this.getGoodsList.length>0){
                for (var i=0;i<this.getGoodsList.length;i++){
                    total+= this.getGoodsList[i].goodsNum
                }
            }
            return total;
        }
    },
    /**
     * 数据绑定后还未生成Dom时执行（初次构建页面）
     */
    created: function () {

        this.init();
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
            //获取基础信息
            this.id = getQueryStringHr("id");
            this.supplierId = getQueryStringHr("supplierId");


            //获取页面数据
            this.getGoodsInfoFun();
            //获取我的订单列表
            this.getGoodslistFun();
            //获取供应商信息
            this.getRoleListFun()

        },
        /**
         * 改变图片
         * @param index
         * @param item
         */
        changeImg(index,item){
            this.imgData.showImg.index = index;
            this.imgData.showImg.data = item;
        },

        /**
         * 增加或者减少数量
         * @param item
         * @param num
         */
        addNum( num ){
            if(num){
                this.addCommodityNum =this.addCommodityNum*1 + num*1;
            }
            //最大值判断
            if (this.addCommodityNum < 1) {
                this.addCommodityNum = 1;
                return false
            }
            //最小值判断
            if (this.addCommodityNum > this.pageCommodityData.stock) {
                this.addCommodityNum = this.pageCommodityData.stock
            }
            if( this.addCommodityNum >999){
                this.addCommodityNum  = 999
            }
        },
        /**
         * 跳转购物车列表详情
         */
        goCanteenCart(){
            this.$router.push({name: 'canteenCart'});
        },
        /**
         * 增加或者减少数量
         * @param item
         * @param num
         */
        inputAddNum(item, num){
            if(num){
                item.addNum =item.addNum*1 + num*1;
            }
            debugger
            //最小值判断
            if (item.addNum < 1) {
                item.addNum = 1;
                return false
            }
            //最大值判断
            if(item.addNum>item.stock){
                item.addNum = item.stock
            }
            if(item.addNum>999){
                item.addNum = 999
            }
        },
        /**
         * 购物车跳转详情
         */
        goCanteenDetails_2(item){
            this.$router.replace({name: 'canteenDetails', query: {
                id: item.goodsId,
                supplierId:item.supplierId
            }});
            this.init();
            return false;

            var {href} = this.$router.resolve({
                name: 'canteenDetails',
                query: {
                    id: item.goodsId,
                    supplierId:item.supplierId
                }
            });
            window.open(href, '_blank')
        },
        /**
         * 获取详情
         */
        getGoodsInfoFun(){

            var _this = this;
            var param = {
                "id": this.id
            };
            this.$api.canteen.getGoodsInfo(param).then(res => {
                _this.havePageCommodityData = true;
                if (res.meta.code == 0) {
                    res.data = res.data || {};
                    //绑定数据
                    _this.pageCommodityData =  res.data;
                    //更新图片
                    _this.imgData.list = res.data.pics || [];
                    _this.imgData.showImg.index = 0;
                    _this.imgData.showImg.data =  res.data.pics[0];

                }  else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
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
         * 移出购物车
         * @param obj
         */
        cartRemove(obj){
            var _this = this;
            var param = {
                "cartId": obj.cartId,
                "subCartGoodsIds":  [ obj.subCartGoodsId ]
            };
            this.$api.canteen.cartRemove(param).then(res => {
                if (res.meta.code == 0) {
                    //更新购物车
                    _this.getGoodslistFun();

                }  else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })
        },
        /**
         * 获取供应商信息
         */
        getRoleListFun(){
            var _this = this;
            var param = {
                "id": this.supplierId
            };
            this.$api.canteen.getRoleList( param ).then(res => {
                if (res.meta.code == 0) {
                    //绑定数据
                    _this.supplierData = res.data;
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
        addShopping(){
            var _this = this;
            var param = {
                "goodsId": this.id,
                "goodsNum": this.addCommodityNum,
                "supplierId": this.supplierId
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

    },

    /**
     * 监控数据
     */
    watch: {
        $route(to, from){

        },
        addCommodityNum(val){
            if(val<0){
                this.addCommodityNum = 0;
            }else if(val>this.pageCommodityData.stock){
                this.addCommodityNum = this.pageCommodityData.stock;
            }


        }
    }


}
