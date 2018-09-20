import {getQueryStringHr, sessionData,_sessionStorage} from '../../../assets/js/util'


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
            showBreadcrumb:"0",
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


    },

    /**
     * keep-alive,组件被激活时执行
     */
    activated(){
        this.init();
    },

    /**
     * vue的DOM挂载之后执行
     */
    mounted(){
        this.init();
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

            this.showBreadcrumb = _sessionStorage('showBreadcrumb')

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
            this.$forceUpdate()
        },



        /**
         * 获取详情
         */
        getGoodsInfoFun(){

            var data = _sessionStorage('localDataMn').cargoObj

            console.log(data)
            this.pageCommodityData =  data;
            //更新图片
            this.imgData.list = data.arrImage || [];
            this.imgData.showImg.index = 0;
            this.imgData.showImg.data =  data.arrImage[0].url;


        },

        /**
         * 获取供应商信息
         */
        getRoleListFun(){
            var _this = this;
            var id = _sessionStorage('userId')
            var param = {
                "id": id
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


    },

  /*  beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
        next();
    },*/

    /**
     * 监控数据
     */
    watch: {
        $route(to, from){

        },

    }


}
