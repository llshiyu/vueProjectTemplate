import {getQueryStringHr} from '../../../assets/js/util'


export default {
  data() {
    return {
      detailsActivated:false,

      //测试数据
      bgImg:"url('./static/imgs/bg-demo.jpg')",
      Img:'./static/imgs/bg-demo.jpg',
      textFake:"防静电萨克放假啊圣诞快乐发驾驶的卡拉就粉色的卡啦就发打开拉斯积分啦看大声叫了发动机三啦方对接按时看房间大萨克拉江东父老三看老夫打算和了"


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


    },



  },

  /**
   * 监控数据
   */
  watch: {
    $route(to, from){

    }
  }


}
