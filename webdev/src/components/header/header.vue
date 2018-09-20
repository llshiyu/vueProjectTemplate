<template>
    <div class="clearfix header-box" v-if="response">
        <div class="header-title fl">食堂食品网上采购平台</div>
        <div class="header-line fl"></div>
        <div class="header-subtitle fl">{{subtitle}}</div>
        <div class="header-quit fr" @click="quit()">退出</div>
        <div class="header-oblique-line fr"></div>
        <div class="header-user fr">欢迎您，{{user}}</div>
        <div class="header-img fr">
            <img src="../../assets/img/userIcon.png">
        </div>
    </div>
</template>

<script>
    import { _sessionStorage} from '../../assets/js/util'

    export default {
        name: "header",
        data(){
            return {
                subtitle: '',
                response: false,
                user: ''
            }
        },
        activated(){
            this.init()
        },
        mounted() {
          this.init()
        },
        methods:{
            init(){
                let type =  _sessionStorage('type');// 0管理员 1采购端 2供应商端
                this.subtitle = type==1?'采购端':type==2?'供应商端':'';
                this.user = _sessionStorage('user');
                this.response = true;
                this.$forceUpdate();
            },
            quit() {
                this.$confirm('确定退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param={
                        id :  _sessionStorage('userId')
                    }
                    this.$api.common.logout(param).then(res => {
                        if (res.meta.code == 0) {
                            _sessionStorage('user', '');
                            _sessionStorage('userId', '');
                            _sessionStorage('subtitle','');
                            _sessionStorage('sessionId','');
                            _sessionStorage('type', '');
                            _sessionStorage('specifications', '');
                            _sessionStorage('defaultAddressName', '');
                            _sessionStorage('defaultCanteenName', '');
                            _sessionStorage('contact', '');
                            _sessionStorage('contactPhone', '');
                            this.user='';
                            this.$router.push({
                                'name': 'login',
                            });
                            this.$message({
                                type: 'success',
                                message: '退出成功!'
                            });
                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                            this.$router.push({
                                'name': 'login',
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }, // 退出
        }
    }
</script>

<style lang="less" scoped>
    .header-box{
        color: #ffffff;
        .header-title {
            font-family: FZZZHONGJW--GB1-0;
            font-size: 30px;
            color: #FFFFFF;
        }
        .header-line{
            height: 20px;
            width: 2px;
            background: #ffffff;
            margin: 8px 10px;
            opacity: 0.4;
        }
        .header-subtitle{
            font-family: FZZZHONGJW--GB1-0;
            font-size: 24px;
            color: #FFFFFF;
        }
        .header-img{
            width: 36px;
            height: 36px;
            border-radius: 100%;
            margin-right: 20px;
            img{
                border-radius: 100%;
                width:100%;
                height:auto;
            }
        }
        .header-user{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
        }
        .header-oblique-line{
            transform:rotate(36deg);
            -o-transform:rotate(36deg);
            -moz-transform:rotate(36deg);
            -webkit-transform:rotate(36deg);
            margin: 10px 14px;
            opacity: 0.4;
            background: #FFFFFF;
            height: 16px;
            width: 2px;
        }
        .header-quit {
            cursor: pointer;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            &:hover {
                /*color: #3a8ee6;*/
            }
        }
        .header-update {
            cursor: pointer;
            margin-right: 20px;
            &:hover {
                color: #3a8ee6;
            }
        }
    }
</style>