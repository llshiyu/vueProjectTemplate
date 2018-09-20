<template>
    <div id="app" style="height: 100%;">
        <keep-alive>
            <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!($route.meta && $route.meta.keepAlive)"></router-view>
    </div>
    <!--<router-view></router-view>-->
</template>

<script>
    import './assets/css/reset.css'
    import './assets/css/common.css'
    import "assets/js/jquery-2.0.3.min"

    export default {
        name: 'app',
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {}
    }
</script>
<style lang="less">
    @import "./assets/css/order.less";

    .el-main {
        padding-left: 40px !important;
    }

    .el-breadcrumb {
        padding-bottom: 20px;
        border-bottom: 1px solid #EFEFEF;
        .el-breadcrumb__item {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #76A4C9 !important;
            line-height: 20px;
            font-weight: normal;
            span {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #76A4C9 !important;
                line-height: 20px;
                font-weight: normal;
            }
        }
        .el-breadcrumb__inner.is-link {
            color: #409EFF !important;
            span {
                color: #409EFF !important;
            }
        }
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .flex-box {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }

    .flex-1 {
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        -o-flex: 1;
        -khtml-flex: 1;
        flex: 1;
    }

    .limit-one {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
    }

    .limit-line(@line) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: @line;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    // 公共头部
    .el-header {
        padding: 16px 40px 16px 30px !important;
        background: #409EFF;
        height: 70px !important;
        line-height: 36px;
    }

    .el-container {
        width: 100%;
        height: 100%;
    }

    // 左侧菜单
    .el-aside {
        background: #F2F8FE;
        color: #333;
        position: relative;
        overflow: visible;
        padding-top: 26px;
        height: 100%;
        width: auto !important;
        .el-menu {
            background: #F2F8FE;
            border: none;
        }
        .el-menu-item, .el-submenu__title {
            font-family: PingFangSC-Medium;
            font-size: 20px;
            color: #7FA3C6;
            padding: 0 20px;
            img {
                width: 22px;
                height: 22px;
                margin-right: 14px;
            }
        }
        .el-menu-item.is-active {
            background: #409EFF;
            border-radius: 1px;
            color: #FFFFFF;
        }
        .el-submenu__icon-arrow {
            margin-top: -1px;
        }
    }

    .el-main {
        background: #FFFFFF;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 400px;
    }

    // 暂无数据
    .no-list {
        text-align: center;
        margin-top: 78px;
        padding-bottom: 30px;
        border-bottom: 1px solid #EAEDF1;
        .nolist-img {
            width: 120px;
            height: 120px;
            margin-bottom: 30px;
        }
        .nolist-txt {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #4A4A4A;
            letter-spacing: 0;
            text-align: center;
        }
    }

    // 分页
    .page-box {
        text-align: right;
        margin-top: 30px;
        margin-bottom: 40px;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    // 查看收货单-弹窗
    .look-receiver-dialog {
        .el-dialog {
            width: 900px;
        }
        .el-dialog__body {
            padding-bottom: 10px;
            padding-top: 10px;
            .el-table thead {
                color: #000;
            }
            .el-form-item {
                input {
                    height: 30px;
                    width: 80%;
                }
            }
        }
    }

    // 查看订单-弹窗
    .look-order-dialog {
        .el-dialog {
            width: 900px;
        }
        .el-dialog__body {
            padding: 0;
            padding-bottom: 10px;
            padding-top: 10px;
            .el-table thead {
                color: #000;
            }
            .el-form-item {
                input {
                    height: 30px;
                    width: 80%;
                }
            }
        }
    }

    // 确认收货-弹窗
    .receiver-dialog {
        .el-dialog {
            width: 70%;
            min-width: 800px;
        }
        .el-table .cell {
            overflow: visible;
        }
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 30px 40px 22px;
            max-height: 300px;
            overflow: auto;
            .el-input {
                input {
                    background: #FFFFFF;
                    border: 1px solid #E8EAEB;
                    border-radius: 2px;
                }
            }
            .el-table th.is-leaf, .el-table td {
                border-bottom: 1px solid #EAEDF1;
            }
            .el-table thead {
                th {
                    background: #F6F5F5;
                    border-top: 1px solid #EAEDF1;
                    &:first-child {
                        padding-left: 20px;
                    }
                    div {
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #2B3642;
                        line-height: 16px;
                    }
                }
            }
            .el-form-item {
                margin: 0;
                input {
                    height: 30px;
                    width: 80%;
                }
            }
        }
        .el-dialog__footer {
            padding: 0 40px 40px 70px;
        }
    }

    .supplier-enter, .my-supplier {
        .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
            line-height: 30px;
        }
        .el-input {
            width: 156px;
            height: 30px !important;
        }
        .el-select .el-input.is-disabled .el-input__inner {
            cursor: not-allowed;
            height: 30px !important;
        }
        .quill-editor {
            width: 398px;
            height: 208px;
        }
        .ql-container.ql-snow {
            border: 1px solid #EAEDF1 !important;
            border-top: none !important;
            border-radius: 2px;
        }
        .ql-toolbar.ql-snow {
            border: 1px solid #EAEDF1 !important;
            border-bottom: none !important;
            border-radius: 2px;

        }
        .ql-snow .ql-editor img {
            max-width: 100%;
            width: auto;
            height: auto;
        }
        .el-input__inner {

            height: 30px;
            line-height: 30px;

        }
        .el-input__icon {

            line-height: 30px;
        }
        .el-table th {
            background: #F6F5F5;
            font-size: 16px;
            color: #2B3642;
            line-height: 30px;
        }
    }

    //步骤条1
    .el-step__title.is-success {
        color: #409EFF !important;
        margin-left: -29px;
    }
    .el-step__title.is-process {
        color: #A3C7EC !important;
        margin-left: -29px;
    }
    .el-step__title.is-wait {
        color: #A3C7EC !important;
        margin-left: -29px;
    }
    .el-step__title.is-process {
        font-weight: normal !important;;
        color: #409EFF;
    }
    .el-step__title.is-wait {
        color: #409EFF;
        margin-left: -29px;
    }
    .el-step__head.is-success{
        color: #409EFF !important;
        .el-step__line{
            background: #409EFF;
        }
        .el-step__icon.is-text{
            background: #409EFF;
            color: #FFFFFF;
            border-color:  #409EFF;
        }
        .el-step__icon-inner .is-status .el-icon-check{
            color: #FFFFFF;
        }
    }
    //步骤条2
    .el-step__head.is-process{
        .el-step__line{
            background: #A3C7EC;;
        }
        .el-step__icon.is-text{
            background: #A3C7EC;
            color: #FFFFFF;
            border-color:  #A3C7EC;
        }
        .el-step__icon-inner .is-status .el-icon-check{
            color: #FFFFFF;
        }
    }//步骤条3
    .el-step__head.is-wait{
        .el-step__line{
            background: #A3C7EC;;
        }
        .el-step__icon.is-text{
            background: #A3C7EC;
            color: #FFFFFF;
            border-color:  #A3C7EC;
        }
        .el-step__icon-inner .is-status .el-icon-check{
            color: #FFFFFF;
        }
    }
    .el-step__head.is-success{
        border-color: #409EFF !important;
    }
</style>