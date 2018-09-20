import Axios from 'axios'
import QS from 'querystring'
import Call from './call'
import {_sessionStorage} from "../js/util";


// TODO baseURL
// proxy的配置
// Axios.defaults.baseURL = '/webApp';

//测试url

var urls = configM.comUrl;//'http://172.28.27.69:8082'//

Axios.defaults.baseURL = urls;


Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// Axios.defaults.headers.post['Accept'] = '*/*'

// TODO 设置超时时间
Axios.defaults.timeout = 30000;

Axios.defaults.withCredentials = false;

// TODO http code 校验
Axios.defaults.validateStatus = function (status) {
    return status
}

// TODO GET 请求 params 序列化
Axios.defaults.paramsSerializer = function (params) {
    return QS.stringify(params)
}

// TODO 设置POST等请求 body 序列化
// Axios.defaults.transformRequest = [function (body) {
//   let data = body || {}
//   if (data instanceof window.FormData) {
//     return data
//   }
//   return QS.stringify(data)
// }]

// request拦截器
Axios.interceptors.request.use(config => {
    //请求时 去localStorage中取回用户信息
    if (_sessionStorage('sessionId')) {
        config.headers.sessionId = _sessionStorage('sessionId');
    }
    // 判断请求的类型
    // 如果是post请求就把默认参数拼到data里面
    // 如果是get请求就拼到params里面
    // console.log('sessionMessage',sessionMessage)
    // if(config.method === 'post') {
    //   let data = config.data;
    //   config.data = {
    //     userId: sessionMessage.userId,
    //     userName: sessionMessage.userName,
    //     orgId: sessionMessage.orgId,
    //     orgName: sessionMessage.orgName,
    //     ...data
    //   }
    // }
    // } else if(config.method === 'get') {
    //   config.params = {
    //     sessionId: sessionId,
    //     ...config.params
    //   }
    // }
    return config
}, error => {
    // Do something with request error
    return Promise.reject(error)
})


// TODO 设置统一请求拦截
Axios.interceptors.response.use(res => {
    if (res.status === 200) {
        //会话过期  当前会话已过期，请重新访问。
        // if(res.data.code == '9527'){
        //   //document.getElementById('loginForm').submit();
        //
        //   localStorage.removeItem('sessionMessage_set');
        //   sessionStorage.removeItem('loggedUser');
        //   window.location.href= configM.goIndex;
        //   return ;
        // }
        return Promise.resolve(res.data)
    }
    return Promise.reject(res.data)
}, error => {
    return Promise.reject(error)
})

/**
 * @description 统一 GET 请求---下载用
 * @param url
 */
function get2(url) {
    Axios.defaults.responseType = 'blob';
    return new Call((resolve, reject) => {
        Axios.get(url)
            .then(response => {
                if(response.meta.code == 200001){
                    console.log('response.meta.code == 200001')
                    vm.$message.error({
                        message: response.meta.message,
                        duration: 1000,
                        center: true
                    });
                    vm.$router.push({
                        'name': 'login',
                    });
                }
                resolve(response)
            })
            .catch(error => {
                console.log(url,'网络超时的URL',error);
                vm.$message.error({
                    message: '网络超时，请稍后重试',
                    duration: 1000,
                    center: true
                });
                reject(error)
            })
    })
}

/**
 * @description 统一 GET 请求
 * @param url
 * @param params --> GET 请求参数（***?name=walid&age=25）
 */
function get(url, params) {
    Axios.defaults.responseType = '';
    return new Call((resolve, reject) => {
        //给get请求后面追加时间戳
        let timestamp = (new Date()).valueOf();
        params.timestamp = timestamp
        Axios.get(url, {params: params})
            .then(response => {
                if(response.meta.code == 200001){
                    console.log('response.meta.code == 200001')
                    vm.$message.error({
                        message: response.meta.message,
                        duration: 1000,
                        center: true
                    });
                    vm.$router.push({
                        'name': 'login',
                    });
                }
                resolve(response)
            })
            .catch(error => {
                console.log(url,'网络超时的URL',error);
                vm.$message.error({
                    message: '网络超时，请稍后重试',
                    duration: 1000,
                    center: true
                });
                reject(error)
            })
    })
}

/**
 * @description 统一 POST 请求
 * @param url
 * @param body --> POST 请求 data
 */
function post(url, body) {
    Axios.defaults.responseType = '';
    return new Call((resolve, reject) => {
        Axios.post(url, body)
            .then(response => {
                if(response.meta.code == 200001){
                    console.log('response.meta.code == 200001')
                    vm.$message.error({
                        message: response.meta.message,
                        duration: 1000,
                        center: true
                    });
                    vm.$router.push({
                        'name': 'login',
                    });
                }
                resolve(response)
            })
            .catch(error => {
                console.log(url,'网络超时的URL',error);
                vm.$message.error({
                    message: '网络超时，请稍后重试',
                    duration: 1000,
                    center: true
                });
                reject(error)
            })
    })
}

function direct(url) {
    return urls + url
}

export default {
    get, post, direct, get2
}
