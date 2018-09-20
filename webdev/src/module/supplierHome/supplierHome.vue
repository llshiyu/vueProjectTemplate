<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu :default-active="leftDefauleActive" class="el-menu-vertical-demo" @open="openMenu" unique-opened="true">
                    <el-submenu index="1">
                            <template slot="title">
                                <img src="../../assets/img/orderIcon.png">
                                <span slot="title">订单管理</span>
                            </template>
                            <el-menu-item index="1-1" @click="goPage('处理中订单')"> 处理中订单</el-menu-item>
                            <el-menu-item index="1-2" @click="goPage('历史订单')"> 历史订单</el-menu-item>
                            <el-menu-item index="1-3" @click="goPage('买家收货单')"> 买家收货单</el-menu-item>
                    </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <img src="../../assets/img/shopIcon.png">
                                <span slot="title">商品管理</span>
                            </template>
                            <el-menu-item index="2-1" @click="goPage('我的商品')"> 我的商品</el-menu-item>
                            <el-menu-item index="2-2" @click="goPage('商品录入')"> 商品录入</el-menu-item>
                        </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main>

                <keep-alive>
                    <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!($route.meta && $route.meta.keepAlive)"></router-view>

                <!--<router-view></router-view>-->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import '../../assets/css/reset.css'
    import '../../assets/css/common.css'
    import {_setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5} from '../../assets/js/util'
    import Header from '../../components/header/header'
    export default {
        name: 'supplierHome',
        components: {
            Header
        },
        data() {
            return {
                leftDefauleActive: '1-1', // 左侧菜单默认展开哪个
            };
        },
        mounted() {
            this.init();
        },
        watch:{
            '$route' (to, from) {
                this.showActive(this.$route.name);
            }
        },
        methods: {
            init() {
                _setTitle('网上交易系统-供应商端');
                this.goPage(this.$route.name); // 默认打开哪个页面
                this.showActive(this.$route.name);// 默认打开哪个子菜单
            },
            openMenu(e){
                let t = this.leftDefauleActive.slice(0,1);
                if(e!=t){
                    if(e==1){
                        this.goPage('处理中订单')
                    }else if(e==2){
                        this.goPage('我的商品')
                    }
                }
            },
            showActive(name){
                let leftActive = '';
                switch (name) {
                    case 'supplierHome':
                    case 'supplierOrder':
                    case '处理中订单':
                        leftActive = '1-1';
                        break;
                    case 'supplierHistoryOrder':
                    case '历史订单':
                        leftActive = '1-2';
                        break;
                    case 'supplierHistoryOrderDetail':
                        leftActive = '1-2';
                        break;
                    case 'supplierReceiverOrder':
                    case '买家收货单':
                        leftActive = '1-3';
                        break;
                    case 'supplierReceiverOrderDetail':
                        leftActive = '1-3';
                        break;
                    case 'mySupplier':
                    case '我的商品':
                        leftActive = '2-1';
                        break;
                    case 'supplierEnter':
                    case '商品录入':
                        leftActive = '2-2';
                        break;
                    case 'supplierDetail':
                        leftActive = '2-1';
                        break;
                    case 'supplierPreviewGoods':
                        leftActive = '2-1';
                        break;
                    case 'supplierEdit':
                        leftActive = '2-1';
                        break;
                    case 'supplierPreview':
                        leftActive = '2-2';
                        break;
                    case 'supplierEditExcel':
                        leftActive = '2-2';
                        break;
                    case 'supplierE':
                        leftActive = '2-2';
                        break;

                    default:
                        leftActive = '1-1';
                        break;
                }
                this.leftDefauleActive = leftActive;
            },
           // 获取左侧菜单数据
            goPage(name) {
                let jumpName = '';
                switch (name) {
                    case 'supplierHome':
                    case 'supplierOrder':
                    case '处理中订单':
                        jumpName = 'supplierOrder';
                        break;
                    case 'supplierHistoryOrder':
                    case '历史订单':
                        jumpName = 'supplierHistoryOrder';
                        break;
                    case 'supplierReceiverOrder':
                    case '买家收货单':
                        jumpName = 'supplierReceiverOrder';
                        break;
                    case 'mySupplier':
                    case '我的商品':
                        jumpName = 'mySupplier';
                        break;
                    case 'supplierEnter':
                    case '商品录入':
                        jumpName = 'supplierEnter';
                        break;
                }
                if(jumpName){
                    this.$router.push({
                        'name': jumpName,
                    })
                }
            }, // 左侧点菜单跳页--根据name判断去哪个页面
        }
    }
</script>
<style lang="less" scoped>
    .el-breadcrumb {
        margin-bottom: 20px\0;
    }

    .el-container {
        width: 100%;
        height: 100%;
    }
</style>
<style lang="less">

</style>