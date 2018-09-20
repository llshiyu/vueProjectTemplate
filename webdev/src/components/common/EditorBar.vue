<template>
    <div class="editor">
        <span v-show="isShowMes" class="showMes">请输入商品介绍内容</span>

        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text">
        </div>

        <!--<div id="editbox" ref="editbox"></div>-->

    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'Editorbar',
        data() {
            return {
                isShowMes: true,
                editor: null,
                info_: null,
                curLen: '' // 内容长度
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            },
            isShowMes:{
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear()
                    this.info_ = null
                }
            },
            value(val) {

                // 使用 v-model 时，设置初始值
                this.editor.txt.html(val)
                if(val){
                    this.isShowMes=false
                }else{
                    this.isShowMes=true
                }


            }
        },
        mounted() {
            this.setEditor()
        },
        methods: {
            setEditor() {

                console.log(this.value, 666)

                // this.editor = new E('#editbox');

                this.editor = new E(this.$refs.toolbar, this.$refs.editor)

                this.editor.customConfig.showLinkImg = false
                this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
                this.editor.customConfig.uploadImgServer = configM.comUrl + configM.uploadUrl// 配置服务器端地址
                this.editor.customConfig.uploadImgHeaders = {}// 自定义 header
                this.editor.customConfig.uploadFileName = '' // 后端接受上传文件的参数名
                this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 将图片大小限制为 2M
                this.editor.customConfig.uploadImgMaxLength = 999 // 限制一次最多上传 3 张图片
                this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

                // 配置菜单
                this.editor.customConfig.menus = [
                    'image', // 插入图片
                    // 'head', // 标题
                    // 'bold', // 粗体
                    // 'fontSize', // 字号
                    // 'fontName', // 字体
                    // 'italic', // 斜体
                    // 'underline', // 下划线
                    // 'strikeThrough', // 删除线
                    // 'foreColor', // 文字颜色
                    // 'backColor', // 背景颜色
                    // 'link', // 插入链接
                    // 'list', // 列表
                    // 'justify', // 对齐方式
                    // 'quote', // 引用
                    // 'emoticon', // 表情
                    // 'table', // 表格
                    // 'video', // 插入视频
                    // 'code', // 插入代码
                    // 'undo', // 撤销
                    // 'redo' // 重复
                ]
                this.editor.customConfig.uploadImgHooks = {
                    fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                    },
                    success: (xhr, editor, result) => {
                        // 图片上传成功回调
                        console.log('succ', result)
                    },
                    timeout: (xhr, editor) => {
                        // 网络超时的回调
                    },
                    error: (xhr, editor) => {

                    },
                    customInsert: (insertImg, result, editor) => {
                        // 图片上传成功，插入图片的回调
                        insertImg(result.data[0].url)
                    }
                }
                this.editor.customConfig.onchange = (html) => {



                    this.info_ = html // 绑定当前逐渐地值
                  /*  var str =  val.replace(/<.*?>/ig,"");
                    console.log(str)*/
                    this.setCurLen();

                    if (this.curLen > 0) {
                        this.isShowMes = false
                    } else {

                        this.isShowMes = true
                    }
                    this.$emit('change', this.info_) // 将内容同步到父组件中




                }

                // 创建富文本编辑器
                this.editor.create()

                if (this.value) {

                    this.editor.txt.text(this.value);
                    this.setCurLen()
                    if (this.curLen > 0) {
                        this.isShowMes = false
                    } else {
                        this.isShowMes = true
                    }

                }

            },
            setCurLen() {
                this.curHtml = this.editor.txt.text();
                let str = this.curHtml.split('&nbsp;').join(".").trim();
                this.curLen = str.length || 0
            },
        }
    }
</script>

<style lang="less">
    .editor {
        height: 210px;
        width: 400px;
        margin: 0 auto;
        position: relative;
        .showMes {
            position: absolute;
            width: 100%;
            height: 40px;
            text-align: left;
            top: 53px;
            padding: 0 0 0 11px;
            /*margin-top: 65px;*/
            box-sizing: border-box;
            font-size: 14px;
            color: #AEAEAE;
            letter-spacing: 0;
            line-height: 20px;
        }
        .toolbar {
            border: 1px solid #EAEDF1;
            border-bottom: none;
        }

        .text {
            border: 1px solid #EAEDF1;
            border-top: none;
            height: 200px;
            z-index: 100 !important;
        }

        .w-e-text {
            overflow-y: auto;
        }
    }
    .w-e-toolbar .w-e-menu {
        position: relative;
        text-align: center;
        padding: 5px 10px;
        cursor: pointer;
        z-index: 100 !important;
    }

</style>