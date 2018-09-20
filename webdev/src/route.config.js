import util from './assets/js/util';
import MessageBox from 'toon-ui/lib/components/msgbox'

export default [
    // 登录
    {
        path: '/',
        name: 'login',
        component: function (resolve) {
            require(['./module/login/login.vue'], resolve)
        }
    },
    {
        path: '/user',
        name: 'user',
        component: function (resolve) {
            require(['./module/user/user.vue'], resolve)
        }
    },
    {
        path: '/shop',
        name: 'shop',
        component: function (resolve) {
            require(['./module/shop/shop.vue'], resolve)
        }
    },
    // 采购端-食堂 首页
    {
        path: '/canteenHome',
        name: 'canteenHome',
        component: function (resolve) {
            require(['./module/canteenHome/canteenHome.vue'], resolve)
        },
        children: [
            {
                path: '/canteenPurchase',
                name: 'canteenPurchase',
                component: function (resolve) {
                    require(['./module/canteen/canteenPurchase/canteenPurchase.vue'], resolve)
                },
                meta: {keepAlive: true}
            }, // 采购货源
            {
                path: '/canteenDetails',
                name: 'canteenDetails',
                component: function (resolve) {
                    require(['./module/canteen/canteenDetails/canteenDetails.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 采购货源详情
            {
                path: '/canteenCart',
                name: 'canteenCart',
                component: function (resolve) {
                    require(['./module/canteen/canteenCart/canteenCart.vue'], resolve)
                },
                meta: {keepAlive: false},
                children:[
                    {
                        path: '/canteenCartSmall',
                        name: 'canteenCartSmall',
                        component: function (resolve) {
                            require(['./module/canteen/canteenCartSmall/canteenCartSmall.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    }, // 采购货源-小食堂
                    {
                        path: '/canteenCartBig',
                        name: 'canteenCartBig',
                        component: function (resolve) {
                            require(['./module/canteen/canteenCartBig/canteenCartBig.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },  // 采购货源-大食堂
                ]
            },// 我的订货单

            {
                path: '/canteenConfirmOrder',
                name: 'canteenConfirmOrder',
                component: function (resolve) {
                    require(['./module/canteen/canteenConfirmOrder/canteenConfirmOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 大食堂 确认订单信息
            {
                path: '/canteenConfirmSuccess',
                name: 'canteenConfirmSuccess',
                component: function (resolve) {
                    require(['./module/canteen/canteenConfirmSuccess/canteenConfirmSuccess.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 大食堂 确认订单信息成功

            {
                path: '/canteenOrder',
                name: 'canteenOrder',
                component: function (resolve) {
                    require(['./module/canteen/canteenOrder/canteenOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 我的订单
            {
                path: '/canteenHistoryOrder',
                name: 'canteenHistoryOrder',
                component: function (resolve) {
                    require(['./module/canteen/canteenHistoryOrder/canteenHistoryOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 历史订单
            {
                path: '/canteenHistoryOrderDetail/:id',
                name: 'canteenHistoryOrderDetail',
                component: function (resolve) {
                    require(['./module/canteen/canteenHistoryOrderDetail/canteenHistoryOrderDetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 历史订单详情
            {
                path: '/canteenReceiverOrder',
                name: 'canteenReceiverOrder',
                component: function (resolve) {
                    require(['./module/canteen/canteenReceiverOrder/canteenReceiverOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 我的收货单
            {
                path: '/canteenReceiverOrderDetail/:id',
                name: 'canteenReceiverOrderDetail',
                component: function (resolve) {
                    require(['./module/canteen/canteenReceiverOrderDetail/canteenReceiverOrderDetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 我的收货单详情
        ]
    },
    // 供应商 首页
    {
        path: '/supplierHome',
        name: 'supplierHome',
        component: function (resolve) {
            require(['./module/supplierHome/supplierHome.vue'], resolve)
        },
        children: [

            {
                path: '/supplierOrder',
                name: 'supplierOrder',
                component: function (resolve) {
                    require(['./module/supplier/supplierOrder/supplierOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            },// 处理中订单
            {
                path: '/supplierHistoryOrder',
                name: 'supplierHistoryOrder',
                component: function (resolve) {
                    require(['./module/supplier/supplierHistoryOrder/supplierHistoryOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            },// 历史订单
            {
                path: '/supplierHistoryOrderDetail/:id',
                name: 'supplierHistoryOrderDetail',
                component: function (resolve) {
                    require(['./module/supplier/supplierHistoryOrderDetail/supplierHistoryOrderDetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            }, // 历史订单详情页
            {
                path: '/supplierReceiverOrder',
                name: 'supplierReceiverOrder',
                component: function (resolve) {
                    require(['./module/supplier/supplierReceiverOrder/supplierReceiverOrder.vue'], resolve)
                },
                meta: {keepAlive: false}
            },// 买家收货单
            {
                path: '/supplierReceiverOrderDetail/:id',
                name: 'supplierReceiverOrderDetail',
                component: function (resolve) {
                    require(['./module/supplier/supplierReceiverOrderDetail/supplierReceiverOrderDetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            },// 买家收货单详情
            {
                path: '/mySupplier',
                name: 'mySupplier',
                component: function (resolve) {
                    require(['./module/supplier/mySupplier/mySupplier.vue'], resolve)
                },
                meta: {keepAlive: false}
            },// 我的商品
            {
                path: '/supplierDetail/:id/:supplierId',
                name: 'supplierDetail',
                component: function (resolve) {
                    require(['./module/supplier/supplierDetail/supplierDetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            },//商品详情
            {
                path: '/supplierEdit',
                name: 'supplierEdit',
                component: function (resolve) {
                    require(['./module/supplier/supplierEdit/supplierEdit.vue'], resolve)
                },
                meta: {keepAlive: true}
            },//商品编辑
            {
                path: '/supplierEditExcel',
                name: 'supplierEditExcel',
                component: function (resolve) {
                    require(['./module/supplier/supplierEditExcel/supplierEditExcel.vue'], resolve)
                },
                meta: {keepAlive: true}
            },//商品编辑
            {
                path: '/supplierPreview',
                name: 'supplierPreview',
                component: function (resolve) {
                    require(['./module/supplier/supplierPreview/supplierPreview.vue'], resolve)
                },
                meta: {keepAlive: false}
            },//商品预览
            {
                path: '/supplierPreviewGoods',
                name: 'supplierPreviewGoods',
                component: function (resolve) {
                    require(['./module/supplier/supplierPreviewGoods/supplierPreviewGoods.vue'], resolve)
                },
                meta: {keepAlive: false}
            },//商品预览（在编辑时候预览）
            {
                path: '/supplierEnter',
                name: 'supplierEnter',
                component: function (resolve) {
                    require(['./module/supplier/supplierEnter/supplierEnter.vue'], resolve)
                },
                meta: {keepAlive: true}
            },// 商品录入
        ]
    }
]