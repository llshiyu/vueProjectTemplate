<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu :default-active="leftDefauleActive" class="el-menu-vertical-demo" @open="openMenu" unique-opened="true">
                    <el-menu-item index="1" @click="goPage('采购货源')">
                        <img src="../../assets/img/cartIcon.png">
                        <span slot="title">采购货源</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <img src="../../assets/img/orderIcon.png">
                            <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="2-1" @click="goPage('我的订单')"> 我的订单</el-menu-item>
                        <el-menu-item index="2-2" @click="goPage('历史订单')"> 历史订单</el-menu-item>
                        <el-menu-item index="2-3" @click="goPage('我的收货单')"> 我的收货单</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
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
        name: 'canteenHome',
        components: {
            Header
        },
        data() {
            return {
                leftDefauleActive: '1', // 左侧菜单默认展开哪个
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
                _setTitle('网上交易系统-采购端');
                this.goPage(this.$route.name); // 默认打开哪个页面
                this.showActive(this.$route.name);// 默认打开哪个子菜单
            },
            openMenu(e){
                let t = this.leftDefauleActive.slice(0,1);
                if(e!=t){
                    if(e==2){
                        this.goPage('我的订单')
                    }
                }
            },
            showActive(name){
                let leftActive = '';
                switch (name) {
                    case 'canteenHome':
                    case 'canteenPurchase':
                    case '采购货源':
                        leftActive = '1';
                        break;
                    case 'canteenCart':
                        leftActive = '1';
                        break;
                    case 'canteenCartSmall':
                        leftActive = '1';
                        break;
                    case 'canteenConfirmSuccess':
                        leftActive = '1';
                        break;
                    case 'canteenCartBig':
                        leftActive = '1';
                        break;
                    case 'canteenConfirmOrder':
                        leftActive = '1';
                        break;
                    case 'canteenOrder':
                    case '我的订单':
                        leftActive = '2-1';
                        break;
                    case 'canteenHistoryOrder':
                    case '历史订单':
                        leftActive = '2-2';
                        break;
                    case 'canteenHistoryOrderDetail':
                        leftActive = '2-2';
                        break;
                    case 'canteenReceiverOrder':
                    case '我的收货单':
                        leftActive = '2-3';
                        break;
                    case 'canteenReceiverOrderDetail':
                        leftActive = '2-3';
                        break;
                    case 'canteenDetails':
                        leftActive = '1';
                        break;
                    default:
                        leftActive = '1';
                        break;
                }
                this.leftDefauleActive = leftActive;
            },
            goPage(name) {
                let jumpName = '';
                switch (name) {
                    case 'canteenHome':
                    case 'canteenPurchase':
                    case '采购货源':
                        jumpName = 'canteenPurchase';
                        break;
                    case 'canteenOrder':
                    case '我的订单':
                        jumpName = 'canteenOrder';
                        break;
                    case 'canteenHistoryOrder':
                    case '历史订单':
                        jumpName = 'canteenHistoryOrder';
                        break;
                    case 'canteenReceiverOrder':
                    case '我的收货单':
                        jumpName = 'canteenReceiverOrder';
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
        margin-bottom: 20px \0;
    }

</style>
<style lang="less">

</style>