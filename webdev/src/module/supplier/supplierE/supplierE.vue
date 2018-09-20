<template>
    <div class="supplier-enter">

        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/supplierEnter' }">商品录入</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/supplierEditExcel' }">商品编辑</el-breadcrumb-item>
        </el-breadcrumb>


    </div>
</template>



<style scoped>
    @import "../../../assets/css/reset.css";
    @import "../../../assets/css/supplier.css";
</style>

<style scoped lang="less" rel="stylesheet/less">
    .supplier-enter{
        min-width: 890px;
    }
    .header-title{
        font-size: 16px;
        font-weight: bold;
        height:40px;
        margin-top: 30px;
        line-height: 40px;
        position: relative;
        color: #000000;
    }
    .search-total-pakc {
        float: left;
        font-size: 16px;
        line-height: 20px;
        color: #FDFDFD;
        width: 60%;
    }
    .search-total-pakc .title-nav{
        background: #A3C7EC;
        border-radius: 1px;
        width: 127px;
        text-align: center;
        position: relative;
        line-height: 40px;
        font-weight: bold;
    }
    .search-total-pakc .title-nav:after{
        position: absolute;
        content: "";
        top: 0;
        left: 99%;
        border-left: 40px solid #A3C7EC;
        border-top: 40px solid transparent;

    }
    .left-line{
        width: 2px;
        height: 13px;
        position: absolute;
        left: 0;
        top: 13px;
        background-color: #A3C7EC;
    }
    .header-title{
        .title-button-1,.title-button-2{
            position: absolute;
            width:160px;
            height:40px;
            font-size: 20px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            top:0;
            font-weight: normal;
        }
        .title-button-1{
            right:220px;
            border: 1px solid #409EFF;
            color: #409EFF;
        }
        .title-button-2{
            right:40px;
            color: #FFFFFF;
            background-color: #409EFF;
        }
    }
    .list-type{
        margin-bottom: 22px;
        position: relative;
        font-size: 16px;
        line-height: 30px;
    }
    .list-type{
        .left-text{
            display: inline-block;
            padding-right:20px;
            width: 125px;
            text-align: right;
        }

        .content-text{
            display: inline-block;
            position: relative;
            font-size: 14px;
            color: #777E8C;
        }
    }

    .must-have-star:before {
        content: "*";
        font-size: 18px;
        line-height: 24px;
        color: #FB6041;
        position: absolute;
        top: 50%;
        left: -12px;
        margin-top: 2px;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }

    .add-pic{
        width: 80px;
        height: 80px;
        display: inline-block;
        position: absolute;
        cursor: pointer;
        top:0;
    }
    .pic-des{
        position: absolute;
        left: 128px;
        bottom: 10px;
        font-size: 14px;
        color: #409EFF;
        letter-spacing: 0;
        text-align: right;
        line-height: 14px;
    }
    .el-select-mid{
        width:120px;
    }
    .stock-des{
        font-size: 14px;
        color: #777E8C;
        line-height: 14px;
        margin-left: 10px;
    }
    .no-mgb{
        margin-bottom: 0;
    }
    .mid-num{
        font-size: 14px;
        color: #AEAEAE;
        line-height: 14px;
    }
    .goods-pic-list{
        width:80px;
        height:80px;
        float: left;
        background-color:  #EFEFEF;
        background-size: 100% 100%;
        margin-right: 40px;
    }
    .main-tip{
        position: absolute;
        font-size: 14px;
        color: #AEAEAE;
        letter-spacing: 0;
        line-height: 14px;
        top: 32px;
        left: 140px;
    }
    .mn-total-dialog{
        width: 100%;
        height: 100%;
        min-height: 768px;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        top: 0;
        left: 0;
    }
    .preview{
        width:80px;
        margin-top: 20px;
        margin-left: 130px;
        border: 1px solid #409EFF;
        border-radius: 2px;
        font-size: 14px;
        color: #409EFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 30px;
    }
    .bottom-button-list{
        margin-top: 30px;
        margin-left: 130px;
    }
    .bottom-button-list{
        span{
            display: inline-block;
            height:30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
        }
        .save{
            width:80px;
            background: #409EFF;
            border-radius: 2px;
            color: #FFFFFF;
        }
        .cancel{
            width: 80px;
            margin-left: 20px;
            background: #F8F8F8;
            border: 1px solid #EAEDF1;
            border-radius: 2px;
            color: #2B3642;
        }
        .online{
            width:134px;
            margin-left: 20px;
            background: #409EFF;
            border-radius: 2px;
            color: #FFFFFF;
        }
    }
    .mn-dialog{
        min-width: 680px;
        width:43.9%;
        height:73%;
        padding: 0 20px  ;
        position: absolute;
        border-radius: 2px;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
    }
    .mn-dialog{
        .mn-title{
            font-size: 20px;
            color: #4A4A4A;
            line-height: 58px;
            font-weight: bold;
        }
        .close-icon{
            width:18px;
            height:18px;
            position: absolute;
            top:20px;
            right:20px;
            cursor: pointer;
        }
        .mn-add-pic{
            width:80px;
            height:30px;
            border: 1px solid #409EFF;
            border-radius: 2px;
            font-size: 14px;
            color: #409EFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 30px;
            margin-top: 20px;
        }
        .pic-content-box{
            width: 100%;
            height: 60%;
            overflow: auto;
            margin-top: 20px;
        }
        .mn-button-list{
            margin-top: 10px;
            width:100%;
            text-align: center;
        }
        .button-ok{
            display: inline-block;
            width:80px;
            height:30px;
            background: #409EFF;
            border-radius: 2px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 30px;
        }
        .button-cancel{
            display: inline-block;
            width:80px;
            height:30px;
            background: #F8F8F8;
            border: 1px solid #EAEDF1;
            border-radius: 2px;
            font-size: 14px;
            color: #2B3642;
            text-align: center;
            line-height: 30px;
            margin-left: 20px;
        }
        .pic-type-box{
            width: 25%;
            height: 50%;
            padding-right: 5%;
            padding-bottom: 8%;
            float: left;
        }
        .pic-type-box:first-child{
            margin-left: 0;
        }
        .pic-goods{
            width: 90%;
            height: 90%;
            background-color: #EFEFEF;
            background-size: 100% 100%;
            background-repeat: no-repeat;

        }
        .pic-type-name{
            width:100%;
            margin-top: 20px;
            height:14px;
            line-height: 14px;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
        }
    }
    .active{
        border:2px solid #409EFF;
    }
    .pic-goods-tip{
        margin-top: 120px;
        text-align: center;
    }
</style>