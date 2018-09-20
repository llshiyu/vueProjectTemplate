require('es6-promise').polyfill();
import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './route.config'
// import axios from 'axios'
// import Api from './assets/api/axios'
import globalConfig from './assets/js/global-config'
import App from './App'
import {sessionId,number_format,_sessionStorage} from './assets/js/util'
import Toast from 'toon-ui/lib/components/toast'
import MessageBox from 'toon-ui/lib/components/msgbox'
import ErrorPage from './components/ErrorPage/index'
import appConfig from './app.config'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
import '../theme/index.css'
import ElementUI from 'element-ui';
import md5 from 'js-md5';
import Loading from 'toon-ui/lib/components/loading'
//import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.use(VueRouter)
Vue.use(globalConfig)

Vue.config.debug = true
Vue.config.devtools = false
Vue.config.silent = true


// 并且配置路由规则
const router = new VueRouter({
  mode: 'hash',
  routes: Routers
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine) {
    Toast({
      message: '无网络连接，请稍后重试',
      duration: 1000, // 持续时间，默认3000毫秒
    });
    return;
  }
  next();
})

router.afterEach(route  => {
  $(".no-data-msg").css("top","0px");
  $("input").blur();
  //解决 其他页面加载更多的问题
  //Util.moreAndMoreOnscroll(false);
  //$('#MoreAndMore_NoDataMsg').hide();
  ErrorPage.close();
  MessageBox.close();
  //$('#selectData_1').scroller('destroy');
})
window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/**
 * 数字字符串补零
 * @param num
 * @returns {*}
 */
function zeroFill (num) {
  if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
    return '0' + num;
  }
  return num;
}
/**
 * 格式化日期
 */
Vue.filter('DateFormat',function(timestamp,formatType){
  if(timestamp =='' || timestamp == undefined ||timestamp =='undefined' || timestamp == null){
    return "";
  }
  var backtime = '';
  var dateTime = new Date(parseInt(timestamp));
  var year = dateTime.getFullYear();  //获取年
  var month = dateTime.getMonth()+1;  //获取月份
  var date = dateTime.getDate();      //获取日
  var day = dateTime.getDay();        //获取星期
  var hour = dateTime.getHours();     //获取小时
  var minute = dateTime.getMinutes(); //获取分钟
  var second = dateTime.getSeconds(); //获取秒
  switch (formatType){
    case 1:
      backtime = year +"年" + zeroFill(month) +"月" + zeroFill(date) +"日";
      break;
    case 2:
      backtime = year +"-" + zeroFill(month) +"-" + zeroFill(date) +" " +zeroFill(hour) +":" +zeroFill(minute) +":" + zeroFill(second);
      break;
    case 3:
      backtime = year +"-" + zeroFill(month) +"-" + zeroFill(date);
      break;
    case 4:
      backtime = year +"-" + zeroFill(month) +"-" + zeroFill(date) +" " +zeroFill(hour) +":" +zeroFill(minute);
      break;
    default:
      backtime = year + "-" + month + "-" + date;
      break;
  }
  return backtime;
});
Vue.filter('textLength',function(val ,num){
  var length = val.replace(/[\r\n]/g,'**').length;
  if(length>num){
    length =num;
  }
  return length;
});
/**
 * 超过字数用省略号代替
 */
Vue.filter('textEllipsis',function(content,max){
    let str;
    if(content&&content.length > max){
      str = content.replace(/[\r\n]/g,'').trim().substr(0,max)+ "…";
    }else{
      str = content;
    }
    return str;
})

Vue.filter('mailStatus',function(obj){
  let mailNo = obj.mailNo;
  let mailStatus = obj.mailStatus;
  let className = {};
  if (mailStatus == 0 || mailStatus == 'AS1' || mailStatus == 'AS2' || mailStatus == 'AS3' || mailStatus == 'AS4') {
    className['send-status-1'] = true;
  } else if (mailStatus==1 || (mailNo && (mailStatus == '00' || mailStatus == '30' || mailStatus == '40' || mailStatus == '41' || mailStatus == '50' || mailStatus == '51'))) {
    className['send-status-2'] = true;
  } else {
    className['send-status-3'] = true;
  }
  return className
})
