<template>
    <div class="user-box">
        <el-form ref="form" :model="form" label-width="180px" class="user-from">
            <el-form-item label="供应商名称：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：">
                <el-checkbox-group v-model="form.type" @change="checkChange($event,list)">
                    <el-checkbox :label="item.name"
                                 v-for="(item,index) of list" :key="index">{{item.name}}
                    </el-checkbox>
                </el-checkbox-group>

                <el-checkbox v-model="form.otherCheck">其他</el-checkbox>
                <el-input v-model="form.other"></el-input>
            </el-form-item>
            <el-form-item label="账号：">
                <el-input v-model="form.codeName"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
                <el-select v-model="form.address" placeholder=" 请选取地址">
                    <el-option :label="item.canteenName+ '  '+item.address" :value="item.id" v-for="(item,index) of addressList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人：">
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式：">
                <el-input v-model="form.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="账号密码：">
                <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="营业执照：">
                <input id="img_input" type="file" accept="image/*" @change="getPic"/>
                <label for="img_input"></label>
                <!--<div class="preview_box"></div>-->
                <img :src="this.form.pic" alt="">
            </el-form-item>

            <el-form-item label="上传Excel模板：">
                <input  type="file" accept="/*" @change="getExcel"/>
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
                    type: [],
                    name: '',
                    codeName:'',
                    address: '', // 用户地址
                    pwd:'',
                    other: '',
                    otherCheck: '',
                    contact:'',
                    userPhone: '', // 用户联系方式
                    excel:'' , // Excel
                    pic: '' // 图
                },
                list: [],
                addressList:[] // 用户地址
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getType();
                this.getAddress();
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
            },
            checkChange(e, a) {
                console.log(e, e.length, a)
            },
            onSubmit() {
                let param = {
                    type: 2, // 账号类型  // 0管理员 1采购端 2供应商端
                    "contactPhone": this.form.userPhone,// 用户联系方式
                    "addressId": this.form.address, // 用户地址
                    supplierName: this.form.name, // 供应商名称
                    "password": this.form.pwd,// 账号密码
                    account:this.form.codeName, // 账号
                    contact: this.form.contact, // 联系人
                    "businessLicenseScanning": this.form.pic, //tu
                    "businessScope": this.form.type.toString(), // 经营范围
                    "businessScopeOther": this.form.otherCheck ? this.form.other : '', // 经营范围qita
                };
                console.log(this.list, this.form.type)
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
            getType() {
                let param = {
                    parentId: 0
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        this.list = res.data
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },
            getExcel(e){
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读取文件
                var form_data = new FormData();
                var file_data = e.target.files[0];
                form_data.append("excel", file_data);
                this.$api.common.uploadAttachment().then(res => {
                    if (res.meta.code == 0) {
                        console.log(res)
                        // this.$api.common.uploadExcel(form_data).then(res => {
                        //     if (res.meta.code == 0) {
                        //         this.form.excel = res.data[0].url
                        //     } else {
                        //         this.$message.error({
                        //             message: res.meta.message,
                        //             duration: 1000,
                        //             center: true
                        //         });
                        //     }
                        // })
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })

            }, // 上传Excel
            getPic(e) {
                var file = e.target.files[0]; //获取图片资源
                // 只选择图片文件
                if (!file.type.match('image.*')) {
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读取文件
                // 渲染文件
                reader.onload = function (arg) {
                    var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
                    $(".preview_box").empty().append(img);
                }

                var form_data = new FormData();
                var file_data = e.target.files[0];
                // 把上传的数据放入form_data
                form_data.append("img", file_data);

                this.$api.common.uploadPic(form_data).then(res => {
                    if (res.meta.code == 0) {
                        this.form.pic = res.data[0].url
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .user-box {
        height: 100%;
        background: #fff;
        padding-top: 100px;
        .user-from {
            width: 50%;
            margin: 0 auto;
        }
        .preview_box img {
            width: 200px;
        }
    }
</style>