import Api from '../axios'

const apiURL = {

    // 品类列表
    getTypeList: '/goods/type/list',
    getGoodsType: '/goods/goodsType/list',
    // 单位列表
    getUnitList: '/goods/unit/list',
    // 获取商品列表
    getGoodsList: '/goods/list',
    // 获取商品详情页
    getGoodsDetail: '/goods/detail',

    // 地址列表
    getAddressList: '/account/address/list',
    // 获取用户信息
    getUserInfo: '/account/info',

    // 获取进货单—首页右上角获取
    getCartList: '/cart/list',
    // 加入购物车
    cartSave: '/cart/save',
    // 再次购买
    cartSaveList: '/cart/savelist',
    // 获取我的进货单详情
    getCartDetail: '/cart/detail',
    // 操作我的进货单商品（增减数量）
    cartUpdate: '/cart/update',
    // 操作我的进货单商品（删除，包括批量删除）
    cartRemove: '/cart/remove',
    // 操作我的进货单 选中
    cartSelect: '/cart/select',
    // 操作我的进货单  加减数量
    cartAddNum: '/cart/addnum',

    // 提交我的进货单
    orderSave: '/order/save',
    // 获取我的订单
    getOrderList: '/order/list',
    // 提交我的订单-确认收货
    orderReceiver: '/order/receiverconfirm',
    // 获取收货单
    getOrderDetail: '/order/getbyid',
    bigsubmitorder: '/order/bigsubmitorder',


    // 获取首页列表
    getGoodsAndMyOrder: '/goods/getGoodsAndMyOrder',
    // 获取首页商家列表
    getSupplier: '/goods/getSupplier',
    // 获取详情
    getGoodsInfo: '/goods/getGoodsInfo',
    // 获取搜索页商品列表和我的进货单数量
    getGoods: '/goods/getGoods',
    // 获取供应商列表
    getRoleList: '/user/role/list',
    // 获取购物车列表
    getGoodslist: '/cart/goodslist',


}

export default {
    getTypeList(obj) {
        return Api.post(apiURL.getTypeList, obj)
    },
    getGoodsType(obj) {
        return Api.post(apiURL.getGoodsType, obj)
    },
    getUnitList(obj) {
        return Api.post(apiURL.getUnitList, obj)
    },
    getGoodsList(obj) {
        return Api.post(apiURL.getGoodsList, obj)
    },
    getGoodsDetail(obj) {
        return Api.post(apiURL.getGoodsDetail, obj)
    },


    getAddressList(obj) {
        return Api.post(apiURL.getAddressList, obj)
    },
    getUserInfo(obj) {
        return Api.post(apiURL.getUserInfo, obj)
    },


    getCartList(obj) {
        return Api.post(apiURL.getCartList, obj)
    },
    cartSave(obj) {
        return Api.post(apiURL.cartSave, obj)
    },
    cartSaveList(obj) {
        return Api.post(apiURL.cartSaveList, obj)
    },
    getCartDetail(obj) {
        return Api.post(apiURL.getCartDetail, obj)
    },
    cartUpdate(obj) {
        return Api.post(apiURL.cartUpdate, obj)
    },
    cartRemove(obj) {
        return Api.post(apiURL.cartRemove, obj)
    },
    cartSelect(obj) {
        return Api.post(apiURL.cartSelect, obj)
    },
    cartAddNum(obj) {
        return Api.post(apiURL.cartAddNum, obj)
    },


    orderSave(obj) {
        return Api.post(apiURL.orderSave, obj)
    },
    getOrderList(obj) {
        return Api.post(apiURL.getOrderList, obj)
    },
    orderReceiver(obj) {
        return Api.post(apiURL.orderReceiver, obj)
    },
    getOrderDetail(obj) {
        return Api.post(apiURL.getOrderDetail, obj)
    },
    getBigsubmitOrder(obj) {
        return Api.post(apiURL.bigsubmitorder, obj)
    },
    getGoodsAndMyOrder(obj) {
        return Api.post(apiURL.getGoodsAndMyOrder, obj)
    },
    getSupplier(obj) {
        return Api.post(apiURL.getSupplier, obj)
    },
    getGoodsInfo(obj) {
        return Api.post(apiURL.getGoodsInfo, obj)
    },
    getGoods(obj) {
        return Api.post(apiURL.getGoods, obj)
    },
    getRoleList(obj) {
        return Api.post(apiURL.getRoleList, obj)
    },
    getGoodslist(obj) {
        return Api.post(apiURL.getGoodslist, obj)
    }
}
