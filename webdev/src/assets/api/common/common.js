import Api from '../axios'

const apiURL = {
    // 登录
    login: '/user/login',
    // 退出
    logout: '/user/logout',
    // 获取地址
    getAddress: '/user/address/list',
    // 设置默认地址
    setDefaultAddress:'/user/address/default',
    // 获取验证码
    getCode: '/user/validatecode',
    // 获取手机验证码
    getPhoneCode: '/user/validatecode',

    saveUser:'/user/role/add',

    uploadPic: '/photo/uploadAttachment',

    uploadExcel: '/photo/uploadExcelTemplate',

    uploadAttachment:'/photo/uploadAttachment'

}

export default {
    login(obj) {
        return Api.post(apiURL.login, obj)
    },
    logout(obj) {
        return Api.post(apiURL.logout, obj)
    },
    getAddress(obj) {
        return Api.post(apiURL.getAddress, obj)
    },
    setDefaultAddress(obj) {
        return Api.post(apiURL.setDefaultAddress, obj)
    },
    getCode(obj) {
        return Api.post(apiURL.getCode, obj)
    },
    getPhoneCode(obj) {
        return Api.post(apiURL.getPhoneCode, obj)
    },

    saveUser(obj) {
        return Api.post(apiURL.saveUser, obj)
    },
    uploadPic(obj) {
        return Api.post(apiURL.uploadPic, obj)
    },
    uploadExcel(obj) {
        return Api.post(apiURL.uploadExcel, obj)
    },
    uploadAttachment(obj) {
        return Api.post(apiURL.uploadAttachment, obj)
    },
}
