<template>
    <div class="user-box">
        <router-link to="/shop">我的订货单-小食堂</router-link>
        <el-form ref="form" :model="form" label-width="180px" class="user-from">
            <el-form-item label="用户名称：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="账号：">
                <el-input v-model="form.codeName"></el-input>
            </el-form-item>
            <el-form-item label="账号密码：">
                <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
                <el-select v-model="form.address" placeholder=" 请选取地址">
                    <el-option :label="item.canteenName+ '  '+item.address" :value="item.id" v-for="(item,index) of addressList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户联系人：">
                <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式：">
                <el-input v-model="form.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="食堂规格：">
                    <el-radio v-model="form.type" label="0">大食堂</el-radio>
                    <el-radio v-model="form.type" label="1">小食堂</el-radio>
            </el-form-item>
            <el-form-item label="账号类型：">
                <el-radio v-model="form.userType" label="0">管理员</el-radio>
                <el-radio v-model="form.userType" label="1">采购端</el-radio>
                <el-radio v-model="form.userType" label="2">供应商端</el-radio>
            </el-form-item>
            <el-form-item label="邮箱地址：">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                form: {
                    name: '', // 用户名称
                    codeName: '', // 账号
                    pwd: '', // 账号密码
                    address: '', // 用户地址
                    user: '', // 用户联系人
                    userPhone: '', // 用户联系方式
                    type: '0', // 食堂规格 0-大食堂 1-小食堂
                    userType: '0', // 账号类型
                    email: '' // 邮箱地址
                },
                addressList:[] // 用户地址
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init(){
                this.getAddress();
            },
            onSubmit() {
                console.log('submit!',this.form);
                // form={
                //     name: '', // 用户名称
                //         codeName: '', // 账号
                //         pwd: '', // 账号密码
                //         address: '', // 用户地址
                //         user: '', // 用户联系人
                //         userPhone: '', // 用户联系方式
                //         type: '大食堂', // 食堂规格
                //         email: '' // 邮箱地址
                // },
                let param={
                    type: this.form.userType, // 账号类型  // 0管理员 1采购端 2供应商端
                    "addressId": this.form.address, // 用户地址
                    "contact":this.form.user,// 用户联系人
                    "contactPhone": this.form.userPhone,// 用户联系方式
                    "email": this.form.email, // 邮箱地址
                    "name": this.form.name,// 用户名称
                    "password": this.form.pwd,// 账号密码
                    "specifications": this.form.type, // 食堂规格 0-大食堂 1-小食堂
                    account:this.form.codeName // 账号
                };
                this.$api.common.saveUser(param).then(res => {
                    if (res.meta.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },
            getAddress(){
                this.$api.common.getAddress({}).then(res => {
                    if (res.meta.code == 0) {
                        this.addressList = res.data

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-box{
        height: 100%;
        background: #fff;
        padding-top: 100px;
        .user-from{
            width: 50%;
            margin: 0 auto;
        }
    }
</style>