<template>
    <div class="detail-pack">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mySupplier' }">我的商品库</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/supplierDetail' }">商品详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nav-pack clearfix">
            <div class="search-total-pakc">
                <p class="title-nav">商品详情</p>
            </div>
            <div class="total-pack cursor-hand" :class="{ 'activated':detailsActivated }">
                <i class="arrows-down cursor-hand"></i>
                <div class="total-details-pack">
                    <p class="title"><span class="table-1">商品</span><span class="table-2">价格</span><span class="table-3">删除</span></p>
                    <div class="list-pack-height">
                        <div class="list-pack" v-for="i in 10">
                            <p class="table-1"><span class="details-icon" :style="{  'background-image':bgImg  }"></span><span class="details-text" :title="textFake">{{  textFake,17 | textEllipsis  }}</span></p>
                            <p class="table-2 red"><span>¥</span>4.3</p>
                            <p class="table-3 padding-right5"><i class="delete-icon"></i></p>
                        </div>
                    </div>

                    <p class="title bottom"><span class="table-1"><i class="title-text">合计</i><i class="red"><span>¥</span>37262.6</i></span><span class="go-see"><i>去看看</i></span></p>
                </div>
            </div>
        </div>
        <div class="details-nav-pack">
            <div class="left-pack">
                <div class="left-img" :style="{  'background-image': imgData.showImg && imgData.showImg.data && imgData.showImg.data?'url('+imgData.showImg.data+')':'' }"></div>
                <div class="right-img-pack" v-if=" imgData.list &&  imgData.list.length>0">
                    <i class="img-list cursor-hand" v-for="(item,index) in imgData.list" :style="{  'background-image': item && item.url?'url('+item.url+')':'' }" v-if="index < 6&&item.url!=''" @click="changeImg(index,item)"></i>
                </div>
            </div>
            <div class="right-pack">
                <div class="details-information">
                    <p class="information-title">供货商介绍</p>
                    <div class="information-content-pack">
                        <p class="content-text">供货商名称：{{ supplierData.supplierName }}</p>
                        <p class="content-text">供货商地址：{{ supplierData.defaultAddressName }}</p>
                        <p class="content-text">经营范围：{{ supplierData.businessScope }}</p>
                        <p class="content-text">联系人：{{ supplierData.contact }}</p>
                        <p class="content-text">企业联系电话：{{ supplierData.contactPhone }}</p>
                        <p class="content-text">企业固定电话：{{ supplierData.fixedPhone }}</p>
                        <p class="content-text">企业认证信息：<span class="img-pack"><img :src="supplierData.businessLicenseScanning"></span></p>
                        <p class="content-button-text">企业营业执照</p>
                    </div>
                </div>
            </div>
            <div class="middle-pack">
                <p class="middle-title">{{ pageCommodityData.name }}</p>
                <p class="middle-price"><span>¥</span>{{ pageCommodityData.unitPrice &&pageCommodityData.unitPrice.toFixed(2) }}</p>
                <div class="middle-foot">
                    <p class="p"><span class="title">重量单位</span><span>{{ pageCommodityData.netContent }}{{ pageCommodityData.netContentUnitName }}&nbsp;/&nbsp;件</span></p>
                    <p class="p"><span class="title">库存量</span><span  style="color:#FF4432;">{{ pageCommodityData.stock }}</span></p>
                </div>
                <div v-if="pageCommodityData.status!==1" class="goods-edit-button" @click="goEdit">商品编辑</div>
            </div>
        </div>

        <div class="explain-pack">
            <div class="clearfix">
                <div class="search-total-pakc">
                    <p class="title-nav">商品说明</p>
                </div>
            </div>


            <div class="commodity-select-pack">
                <div class="list-pack">
                    <p class="title">商品品牌</p>
                    <p class="list"><span>{{ pageCommodityData.brand }}</span></p>
                </div>
                <div class="list-pack">
                    <p class="title">商品名称</p>
                    <p class="list">
                        <span class="goods-name-over" :title="pageCommodityData.name">{{ pageCommodityData.name }}</span>
                        <span>商品编号<i class="list-right-text">{{ pageCommodityData.goodsCode }}</i></span>
                        <span>单件商品规格<i class="list-right-text">{{ pageCommodityData.netContent }} {{ pageCommodityData.netContentUnitName }}</i></span>
                        <span>商品产地<i class="list-right-text">{{ pageCommodityData.originPlace }}</i></span>
                        <span>分类<i class="list-right-text">{{ pageCommodityData.typeName }}</i></span>
                        <span v-if="pageCommodityData.imported!=''">国产/进口<i class="list-right-text">{{ pageCommodityData.imported }}</i></span>
                        <span v-if="pageCommodityData.level!=''">等级<i class="list-right-text">{{ pageCommodityData.level }}</i></span>
                        <span v-if="pageCommodityData.processingMode!=''">加工方式<i class="list-right-text">{{ pageCommodityData.processingMode}}</i></span>
                        <span v-if="pageCommodityData.category!=''">品种<i class="list-right-text">{{ pageCommodityData.category }}</i></span>
                        <span v-if="pageCommodityData.storageStatus!=''">保存状态<i class="list-right-text">{{ pageCommodityData.storageStatus}}</i></span>
                        <span v-if="pageCommodityData.feedingMode!=''">饲养方式<i class="list-right-text">{{ pageCommodityData.feedingMode }}</i></span>
                        <span v-if="pageCommodityData.waters!=''">海水/淡水<i class="list-right-text">{{ pageCommodityData.waters}}</i></span>
                        <span v-if="pageCommodityData.containSugar!=''">是否含糖<i class="list-right-text">{{ pageCommodityData.containSugar }}</i></span>
                        <span v-if="pageCommodityData.flavor!=''">口味<i class="list-right-text">{{ pageCommodityData.flavor }}</i></span>
                    </p>
                </div>
            </div>

            <div class="explain-content-pack">

                <div v-html="pageCommodityData.description"></div>
                <div><img :src="pageCommodityData.securityPhoto" class="credential-img"></div>
            </div>


        </div>
    </div>


</template>

<script>
    import js from "./supplierDetails.js"
    export default js
</script>

<style scoped lang="less" rel="stylesheet/less">
    .detail-pack{
        min-width: 1240px;
    }
    .credential-img{
        width: auto;
        height: auto!important;
        display: block;
    }
    .goods-name-over{
        width: 250px;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    /************************ explain-pack *************************/

    .explain-pack{
        margin-top: 60px;
    }
    .commodity-select-pack {
        margin-top: 20px;
        background: #F2F8FE;
        padding: 14px 0 14px 15px;
        font-size: 14px;
        color: #7E98AC;
        line-height: 20px;
        font-weight: bold;
    }

    .commodity-select-pack .list-pack .list {
        position: relative;
        padding: 16px 2px;
    }
    .commodity-select-pack .list-pack .list .list-right-text{
        margin-left: 10px;
    }

    .commodity-select-pack .list-pack:not(:first-child) .list {
        border-top: 1px dashed #C8D3DE;
    }

    .commodity-select-pack .list-pack {
        position: relative;
        padding-left: 70px;
    }

    .commodity-select-pack .list-pack .list span {
        padding-right: 80px;
        display: inline-block;
    }

    .commodity-select-pack .list-pack .title {
        position: absolute;
        top: 16px;
        left: 0;
        width: 60px;
        /*text-align: justify;*/
        height: 20px;
        overflow: hidden;
    }

    .commodity-select-pack .list-pack .title:after {
        display: inline-block;
        width: 100%;
        content: '';
    }

    .explain-content-pack {
        font-size: 16px;
        color: #7E98AC;
        line-height: 30px;
    }
    .explain-content-pack .content-text{
        margin-top: 20px;
    }
    .explain-content-pack .img-list-pack{
        overflow: hidden;
        padding-top: 8px;
    }
    .explain-content-pack img{
        margin-right: 74px;
        float: left;
        height: 260px;
        width: auto;
        background: #FFFFFF;
        border: 1px solid #EFEFEF;
        margin-top: 30px;
    }




    /************************ right-pack *************************/

    .details-information{
        min-height: 636px;
        border: 1px solid #EFEFEF;
        border-radius: 2px;

        font-size: 16px;
        color: #7FA3C6;
        line-height: 26px;
    }
    .details-information .information-title{
        font-size: 18px;
        line-height: 58px;
        color: #3D474F;
        background: #F2F8FE;
        padding: 0 20px;
        font-weight: bold;
    }
    .details-information .information-content-pack{
        padding: 14px 20px;
    }
    .details-information .information-content-pack .content-text{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .details-information .information-content-pack .content-button-text{
        text-align: center;
        margin-top: 3px;
    }
    .content-text .img-pack{
        display: block;
        width: 100%;
        padding-top: 12px;
    }
    .content-text .img-pack img{
        width: 100%;
        height: auto;
        display: block;
    }




    /************************ details-nav-pack *************************/
    .details-nav-pack{
        position: relative;
        padding-left: 568px;
        padding-right: 365px;
        min-height: 636px;
        overflow: hidden;
    }
    .details-nav-pack .left-pack{
        float: left;
        left: 0;
        right: 0;
        margin-left: -568px;
        width: 568px;
    }
    .details-nav-pack .right-pack{
        float: right;
        overflow: hidden;
        margin-right: -365px;
        width: 365px;
    }
    .details-nav-pack .middle-pack{
        width: 100%;
        padding: 0 40px 60px 0;
        position: relative;
        min-height: 636px;
    }

    .details-nav-pack .left-img,.details-nav-pack .img-list{
        display: block;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;

        background-image: url("./imgs/no-img.png");
    }
    .details-nav-pack .left-img{
        width: 538px;
        height: 538px;
        display: block;
        border: 1px solid #EFEFEF;
        border-radius: 2px;
    }
    .details-nav-pack .img-list{
        float: left;
        width: 73px;
        height: 73px;
        /*margin-right: 20px;*/
        border: 1px solid #EFEFEF;
        border-radius: 2px;
    }
    .details-nav-pack .img-list:not(:first-child){
        margin-left: 20px;
    }
    .details-nav-pack .right-img-pack{
        margin-top: 25px;
        overflow: hidden;
        /*margin-left: 20px;*/
        /*height: 636px;*/
    }

    .details-nav-pack .middle-pack .middle-title{
        font-size: 20px;
        color: #3D474F;
        line-height: 30px;
        font-weight: bold;
    }
    .details-nav-pack .middle-pack .middle-price{
        font-weight: bold;
        font-size: 30px;
        color: #FF4432;
        line-height: 70px;
        background: #F2F8FE;
        padding-left: 14px;
        padding-right: 14px;
        margin-top: 30px;
    }
    .details-nav-pack .middle-pack .middle-foot{
        font-size: 16px;
        color: #3D474F;
        line-height: 24px;
        margin-top: 40px;
    }
    .details-nav-pack .middle-pack .middle-foot .p{
        overflow: hidden;
    }
    .details-nav-pack .middle-pack .middle-foot .p span{
        float: left;
    }
    .details-nav-pack .middle-pack .middle-foot .p span:first-child{
        width: 84px;
    }
    .details-nav-pack .middle-pack .middle-foot .p:not(:first-child){
        margin-top: 18px;
    }
    .details-nav-pack .middle-pack .middle-price span{
        font-size: 15px;
    }


    .details-nav-pack .middle-pack .middle-foot-button{
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .details-nav-pack .middle-pack .middle-foot-button .button{
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 40px;
        width: 187px;

        background: #409EFF;
        border-radius: 2px;
    }

    /************************ 货物加减 ***********************/

    .cargo-list .list-pack .price-pack span:first-child i:first-child {
        font-size: 12px;
        /*line-height: 28px;*/
    }

    .add-subtract-pack {
        float: left;
        margin-right: 10px;
        border: 1px solid #EAEDF1;
        border-radius: 2px;
        overflow: hidden;
        height: 24px;
    }

    .add-subtract-pack i:first-child {
        float: left;
        width: 24px;
        height: 24px;
        border-right: 1px solid #EAEDF1;
        position: relative;
        background: #F8F8F8;
    }

    .add-subtract-pack i:first-child:before, .add-subtract-pack i:first-child + i + i:before {
        content: "";
        display: block;
        width: 13px;
        height: 1px;
        background: #979797;
        position: absolute;
        left: 6px;
        top: 11px;
    }

    .add-subtract-pack i:first-child + i + i {
        position: relative;
        float: left;
        width: 24px;
        height: 24px;
        border-left: 1px solid #EAEDF1;
        background: #F8F8F8;
    }

    .add-subtract-pack i:first-child + i + i:after {
        content: "";
        display: block;
        width: 1px;
        height: 13px;
        background: #979797;
        position: absolute;
        left: 12px;
        top: 5px;
    }

    .add-subtract-pack i:first-child + i {
        float: left;
        width: 50px;
    }

    .add-subtract-pack i:first-child + i input {
        width: 100%;
        height: 24px;
        line-height: 20px;
        font-size: 16px;
        padding-left: 5px;
        padding-right: 6px;
        text-align: center;
    }


    /************************ nav-pack *************************/

    .nav-pack {
        padding-bottom: 30px;
    }

    .total-pack .total-details-pack {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        font-size: 14px;
        color: #333333;
        line-height: 24px;
        padding-top: 20px;
        width: 420px;
        background-color: #FFFFFF;
        box-shadow: 0 0 2px 0 rgba(119,119,119,0.30);
        z-index: 500;
    }
    .total-pack .total-details-pack .list-pack-height{
        max-height: 320px;
        overflow: auto;
        padding-left: 30px;
        padding-right: 30px;

    }
    .total-pack .total-details-pack .list-pack-height{
        max-height: 320px;
        overflow: auto;


    }

    .total-pack .total-details-pack .list-pack-height::-webkit-scrollbar{
        width:2px;
        height:2px;
    }
    .total-pack .total-details-pack .list-pack-height::-webkit-scrollbar-track{
        background: #f6f6f6;
        border-radius:2px;
    }
    .total-pack .total-details-pack .list-pack-height::-webkit-scrollbar-thumb{
        background: #aaa;
        border-radius:2px;
    }

    .total-pack .total-details-pack .title {
        font-size: 14px;
        color: #7E98AC;
        line-height: 20px;
        width: 100%;
        overflow: hidden;
        padding-left: 30px;
        padding-right: 30px;
    }
    .total-pack .total-details-pack .title.bottom {
        border-top: 1px solid #E3EAF1;
        padding-top: 7px;
        padding-bottom: 7px;
    }
    .total-pack .total-details-pack .title .go-see{
        float: right;
        line-height: 45px;
    }
    .total-pack .total-details-pack .title .go-see i{
        display: inline-block;
        line-height: 34px;
        background: #409EFF;
        border-radius: 2px;
        text-align: center;
        width: 97px;
        font-size: 14px;
        color: #FFFFFF;
    }

    .total-pack .total-details-pack .list-pack {
        padding-top: 13px;
        padding-bottom: 13px;
        font-size: 14px;
        color: #333333;
        line-height: 22px;
        overflow: hidden;
    }
    .total-pack .red{
        color: #FF4432;
        line-height: 44px;
    }
    .total-pack .red span{
        font-size: 12px;
    }


    .total-pack .total-details-pack .table-1{
        width: 65%;
        float: left;
    }
    .total-pack .total-details-pack .table-1 .title-text{
        padding-right: 10px;
    }

    .total-pack .total-details-pack .table-2{
        width: 20%;
        float: left;
        text-align: center;
    }
    .total-pack .total-details-pack .table-3{
        width: 15%;
        float: left;
        text-align: right;
    }
    .total-pack .total-details-pack .table-3.padding-right5{
        padding-right: 5px;
    }
    .total-pack .total-details-pack .delete-icon{

        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/delete-icon-2.png");
        width: 20px;
        height: 48px;

    }
    .total-pack .total-details-pack .delete-icon:hover{
        background-image: url("./imgs/delete-icon-3.png");
    }


    .total-pack .total-details-pack .details-icon{
        float: left;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 44px;
        height: 44px;
    }
    .total-pack .total-details-pack .details-text{
        width: 172px;
        float: left;
        padding-left: 15px;
        padding-right: 15px;
    }
    .total-pack .total-details-pack .details-text:hover{
        color: #409EFF;
    }

    .search-total-pakc {
        float: left;
        font-size: 16px;
        line-height: 20px;
        color: #FDFDFD;
        width: 60%;
        margin-top: 30px;
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

    .total-pack {
        position: relative;
        float: right;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 40px;
        min-width: 163px;
        padding-left: 14px;
        padding-right: 33px;
        background: #409EFF;
        border-radius: 1px;
    }

    .total-pack .arrows-down {
        position: absolute;
        border-top: 5px solid #fff;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 0px;
        top: 17px;
        right: 14px;
    }

    .total-pack.activated .arrows-down {
        position: absolute;
        border-top: 0;
        border-bottom: 5px solid #fff;
    }
    .total-pack.activated .total-details-pack {
        display: block;
    }
    .explain-content-pack{
        img{
            width:auto;
            height:auto;
        }

    }
    .goods-edit-button{
        background: #409EFF;
        border-radius: 2px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 40px;
        width:187px;
        height:40px;
        position: absolute;
        bottom: 0;
        cursor: pointer;
    }
</style>