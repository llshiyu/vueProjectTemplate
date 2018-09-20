import {getQueryStringHr} from '../../../assets/js/util'


export default {
    data() {
        return {
            id:"",  //详情id
            supplierId:"",  //供应商id

            detailsActivated: false,

            pageCommodityData:{}, //商品数据
            imgData:{   //图片数据
                showImg:{},
                list:[]
            },

            //供应商信息
            supplierData:{},
            //数量
            addCommodityNum:1,

            //假文
            textFake:"xxxxxxxxxxxxxxxx"


        }
    },

    /**
     * 数据绑定后还未生成Dom时执行（初次构建页面）
     */
    created: function () {

        this.init();
    },

    /**
     * keep-alive,组件被激活时执行
     */
    activated(){

    },

    /**
     * vue的DOM挂载之后执行
     */
    mounted(){

    },

    /**
     * keep-alive,组件被移除时执行
     */
    deactivated(){

    },
    // vue内挂载其他方法
    methods: {
        /**
         * 页面加载
         */
        init(){
            //获取基础信息
            this.id = this.$route.params.id;
            this.supplierId = this.$route.params.supplierId;


            //获取页面数据
            this.getGoodsInfoFun();

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
            this.imgData.showImg.data = item.url;
            console.log(this.imgData.showImg.data)
            this.$forceUpdate()
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
                if (res.meta.code == 0) {
                    res.data = res.data || {};
                    //绑定数据
                    _this.pageCommodityData =  res.data;
                    //更新图片
                    _this.imgData.list = res.data.pics || [];
                    _this.imgData.showImg.index = 0;
                    _this.imgData.showImg.data =  res.data.pics[0].url;

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
         * 获取供应商信息
         */
        getRoleListFun(){
            var _this = this;
            var param = {
                "id": this.supplierId
            };
            this.$api.supplier.getRoleInfo(param).then(res => {
                if (res.meta.code == 0) {
                    //绑定数据
                    _this.supplierData = res.data;
                }else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })

        },

        goEdit(){
            this.$router.push({name:'supplierEdit',query:{id:this.id}})
        },


    },

    /**
     * 监控数据
     */
    watch: {
        $route(to, from){

        },

    }


}
