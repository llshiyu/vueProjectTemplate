import Api from '../axios'

const apiURL = {
    // 订单管理 处理中订单 订单发货状态
    orderSuborderList: '/order/suborder/list',
    // 商品管理 我的商品列表
    getSuppliedGoodsById: '/goods/getSuppliedGoodsById',
    // 商品管理 商品编辑
    goodsUpdate: '/goods/update',
    // 商品录入 – 手动
    SupplierAddGoods: '/goods/SupplierAddGoods',
    // 补货
    goodsAddstock: '/goods/addstock',
    // 上架下架
    goodsShelf: '/goods/shelf',
    //分类接口
    typeList : '/goods/type/list',

    // 获取订单列表
    getOrderList: '/order/supplierlist',
    // 提交我的订单-确认收货
    orderReceiver: '/order/supplierconfirm',
    //查询模板图片
    getPhoto:'/photo/getPhoto',
    //上传模板图片
    uploadPhoto:'/photo/uploadPhoto',
    //单位列表
    unitList:'/goods/unit/list',
    //商品详情
    getGoodsInfo:'/goods/getGoodsInfo',
    //获取供货商信息
    getRoleInfo:'/user/role/list',
    SupplierUpdateGoods:'/goods/SupplierUpdateGoods',
    listtemp:'/goods/listtemp',

    //保存至商品库
    addGoodsBatch:'goods/addGoodsBatch',
    // excel保存
    updatetemp:'/goods/updatetemp',
    //excel上架
    SupplierAddGoods:'/goods/SupplierAddGoods',
    //excel导入详情
    getbyidtemp:'goods/getbyidtemp',
    //获取excel模板路径
    getExcelTemplate:'/photo/getExcelTemplate',

}

export default {
    orderSuborderList(obj) {
        return Api.post(apiURL.orderSuborderList, obj)
    },
    getGoodsList(obj) {
        return Api.post(apiURL.getGoodsList, obj)
    },
    goodsUpdate(obj) {
        return Api.post(apiURL.goodsUpdate, obj)
    },
    goodsSave(obj) {
        return Api.post(apiURL.goodsSave, obj)
    },
    goodsAddstock(obj) {
        return Api.post(apiURL.goodsAddstock, obj)
    },
    goodsShelf(obj) {
        return Api.post(apiURL.goodsShelf, obj)
    },
    typeList(obj) {
        return Api.post(apiURL.typeList, obj)
    },
    getOrderList(obj){
        return Api.post(apiURL.getOrderList, obj)
    },
    orderReceiver(obj) {
        return Api.post(apiURL.orderReceiver, obj)
    },
    getSuppliedGoodsById(obj) {
        return Api.post(apiURL.getSuppliedGoodsById, obj)
    },
    getPhoto(obj) {
        return Api.post(apiURL.getPhoto, obj)
    },
    uploadPhoto(obj) {
        return Api.post(apiURL.uploadPhoto, obj)
    },
    SupplierAddGoods(obj) {
        return Api.post(apiURL.SupplierAddGoods, obj)
    },
    unitList(obj) {
        return Api.post(apiURL.unitList, obj)
    },
    getGoodsInfo(obj) {
        return Api.post(apiURL.getGoodsInfo, obj)
    },
    getRoleInfo(obj) {
        return Api.post(apiURL.getRoleInfo, obj)
    },
    SupplierUpdateGoods(obj) {
        return Api.post(apiURL.SupplierUpdateGoods, obj)
    },
    listtemp(obj) {
        return Api.post(apiURL.listtemp, obj)
    },
    addGoodsBatch(obj) {
        return Api.post(apiURL.addGoodsBatch, obj)
    },
    updatetemp(obj) {
        return Api.post(apiURL.updatetemp, obj)
    },
    SupplierAddGoods(obj) {
        return Api.post(apiURL.SupplierAddGoods, obj)
    },
    getbyidtemp(obj) {
        return Api.post(apiURL.getbyidtemp, obj)
    },
   /* getExcelTemplate(obj) {
        return Api.post(apiURL.getExcelTemplate, obj)
    },*/
    getExcelTemplate() {
        return Api.get2(apiURL.getExcelTemplate)
    },

}
