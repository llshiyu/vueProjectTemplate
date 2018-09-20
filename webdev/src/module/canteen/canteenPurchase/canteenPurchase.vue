<template>
    <div>
        <div class="nav-pack clearfix">
            <div class="search-total-pakc">
                <div class="search-pack">
                    <div class="el-input-pack">
                        <el-input class="fr search-input" prefix-icon="el-icon-search" v-model.trim="keyword"
                                  @keyup.enter.native="searchOrder()" placeholder="输入商品名称"
                                  clearable></el-input>
                    </div>
                    <span class="search-text cursor-hand" @click="searchOrder()">搜索</span>
                </div>
            </div>
            <div class="total-pack cursor-hand">
                <i class="arrows-down cursor-hand"></i>
                <p class="cursor-hand" @click="goCanteenCart()">我的订货单（ {{ myStockNum }} ）</p>
                <div class="total-details-pack" v-if="getGoodsList && getGoodsList.length>0">
                    <p class="title"><span class="table-1">商品</span><span class="table-2">价格</span><span class="table-3">删除</span></p>
                    <div class="list-pack-height">
                        <div class="list-pack" v-for="obj in getGoodsList">
                            <p class="table-1"><span class="details-icon" :style="{  'background-image': obj.mainPic ?'url('+obj.mainPic+')':'' }"></span><span class="details-text" :title="obj.goodsName" @click="goCanteenDetails_2(obj)">{{  obj.goodsName,17 | textEllipsis  }}</span></p>
                            <p class="table-2 red"><span>¥</span>{{ obj.unitPrice.toFixed(2) }}×{{ obj.goodsNum }}</p>
                            <p class="table-3 padding-right5"><i class="delete-icon" @click="cartRemove(obj)"></i></p>
                        </div>
                    </div>

                    <p class="title bottom"><span class="table-1"><i class="title-text">合计</i><i class="red"><span>¥</span>{{ totalMoney }}</i></span><span class="go-see"><i @click="goCanteenCart()">去查看</i></span></p>
                </div>
                <div class="total-details-pack no-data-total-pack" v-else>
                    <i></i>
                    <p>我的订货单中还没有商品，赶快去选购吧</p>
                </div>


            </div>
        </div>
        <div class="nav-select-pack" v-if="( category.levelList && category.levelList.length>0 )||( merchantData.merchantShowData && merchantData.merchantShowData.supplierName )">
            <div class="select-list" v-for="(obj,index) in category.levelList"><p>{{ obj.name }}<i class="delete-icon cursor-hand" @click="removeCategory(index)"></i></p></div>
            <div class="select-list" v-if="merchantData.merchantShowData && merchantData.merchantShowData.supplierName"><p>{{ merchantData.merchantShowData.supplierName }}<i class="delete-icon cursor-hand" @click="removeMerchant()"></i></p></div>
        </div>


        <div class="commodity-select-pack" v-if="(category.data && category.data.length > 0) || (merchantData.merchantListData && merchantData.merchantListData.length > 0)">
            <div class="list-pack" v-if="category.data && category.data.length > 0">
                <p class="title">{{ category.parentObj.name || "品类" }}</p>
                <p class="list" :class="{ 'activated':isCategoryShowAll,'show-one-line':  category.data.length > 60 && !isCategoryShowAll}"><span class="cursor-hand" v-for="obj in category.data" @click="selectCategory(obj)">{{ obj.name }}</span><span class="have-more cursor-hand" @click="isCategoryShowAll = !isCategoryShowAll" v-if=" category.data.length > 60">{{ isCategoryShowAll?"收起":"更多" }}</span></p>
            </div>
            <div class="list-pack" v-if="merchantData.merchantListData && merchantData.merchantListData.length > 0">
                <p class="title">供应商</p>
                <p class="list"><span class="cursor-hand" v-for="obj in merchantData.merchantListData" @click="merchantShowDataChange(obj)">{{ obj.supplierName }}</span></p>
            </div>
        </div>
        <div class="cargo-list-pack">
            <!--首页-->
            <div class="cargo-list" v-for="obj in configList" v-if="!isSearch && obj.list && obj.list.length > 0">
                <div class="cargo-title clearfix">
                    <div class="search-total-pack-1">
                        <p class="title-nav">{{ obj.name }}</p>
                    </div>
                    <div class="right cursor-hand" @click="selectCategory(obj)">更多</div>
                </div>

                <div class="details-list-pack">
                    <div class="list-pack" v-for="(item,index) in obj.list" v-if="index<10">
                        <div class="pack">
                            <div class="img-pack cursor-hand" :style="{  'background-image': item.pics && item.pics[0] && item.pics[0].url?'url('+item.pics[0].url+')':'' }" @click="goCanteenDetails(item)"></div>
                            <div class="price-pack">
                                <span class="price"><i>¥</i><i>{{ item.unitPrice.toFixed(2) }}</i></span><span class="last cursor-hand" @click="addShopping(item)" v-if="item.stock>0">加入订货单</span><span class="last no-cargo cursor-hand" v-if="item.stock<=0">补货中</span><span
                                    class="add-subtract-pack"><i class="cursor-hand" @click="inputAddNum(item,-1)"></i><i><input
                                    type="number" step="0.01" v-model="item.addNum" placeholder="0" @input="inputAddNum(item)"></i><i class="cursor-hand" @click="inputAddNum(item,1)"></i></span>
                            </div>
                            <div class="text-explain cursor-hand" :title="item.name" @click="goCanteenDetails(item.id)">{{item.name,30 | textEllipsis}}</div>
                            <p class="text-annotation"><span class="text-num">库存量:{{ item.stock }}</span><span class="text-supply" :title="item.supplierName" v-if="item.supplierName">供应商:{{ item.supplierName,6 | textEllipsis }}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <!--搜索模块-->
            <div class="cargo-list" v-if="searchList && searchList.length && isSearch">
                <div class="details-list-pack">
                    <div class="list-pack" v-for="(item,index) in searchList">
                        <div class="pack">
                            <div class="img-pack" :style="{  'background-image': item.pics && item.pics[0] && item.pics[0].url?'url('+item.pics[0].url+')':'' }" @click="goCanteenDetails(item)"></div>
                            <div class="price-pack">
                                <span class="price"><i>¥</i><i>{{ item.unitPrice.toFixed(2) }}</i></span><span class="last cursor-hand" @click="addShopping(item)">加入订货单</span><span
                                    class="add-subtract-pack"><i class="cursor-hand" @click="inputAddNum(item,-1)"></i><i><input
                                    type="number" step="0.01" v-model="item.addNum" placeholder="0" @input="inputAddNum(item)"></i><i class="cursor-hand" @click="inputAddNum(item,1)"></i></span>
                            </div>
                            <div class="text-explain" :title="item.name" @click="goCanteenDetails(item.id)">{{item.name,30 | textEllipsis}}</div>
                            <p class="text-annotation"><span class="text-num">库存量:{{ item.stock }}</span><span class="text-supply" :title="item.supplierName" v-if="item.supplierName">供应商:{{ item.supplierName,6 | textEllipsis }}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="no-data" v-if="!isSearch && isGetGoodsAndMyOrdered">没有更多数据了~</p>
            <div class="no-search-pack" v-if="isSearch && isSearched && (searchList && searchList.length==0)">
                <i class="no-search-icon"></i>
                <p class="no-search-text">抱歉，没有找到相关商品</p>
            </div>

        </div>


        <div class="page-box" v-if="isSearch && totalNumber && totalNumber!=0">
            <Paging :totalNumber="totalNumber" :showActivePageIndex="searchData.page" :pageShowTotal="searchData.pageShowNum" @callBack="showPageClick"></Paging>
        </div>




    </div>


</template>

<script>
    import js from "./canteenPurchase.js"
    export default js
</script>

<style scoped>
    .no-search-pack{
        padding-top: 78px;
        padding-bottom: 30px;
        font-size: 15px;
        line-height: 21px;
        color: #4A4A4A;
        text-align: center;
    }

    .no-search-pack .no-search-icon{
        display: block;
        height: 120px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/no-search-icon.png");
    }
    .no-search-pack .no-search-text{
       margin-top: 30px;
    }


    .search-total-pack-1 {
        float: left;
        font-size: 16px;
        line-height: 20px;
        color: #FDFDFD;
        width: 60%;
    }
    .search-total-pack-1 .title-nav{
        background: #A3C7EC;
        border-radius: 1px;
        float: left;
        min-width: 127px;
        padding-left: 25px;
        padding-right: 25px;
        text-align: center;
        position: relative;
        line-height: 40px;
        font-weight: bold;
    }
    .search-total-pack-1 .title-nav:after{
        position: absolute;
        content: "";
        top: 0;
        left: 99.9%;
        border-left: 40px solid #A3C7EC;
        border-top: 40px solid transparent;

    }



    .nav-select-pack{
        overflow: hidden;
        padding-bottom: 20px;
    }
    .nav-select-pack .select-list{
        float: left;
        margin-right: 13px;
    }
    .nav-select-pack .select-list:not(:first-child){
        padding-left: 23px;
        position: relative;
    }
    .nav-select-pack .select-list:not(:first-child):before{
        content: "";
        position: absolute;
        left: 2px;
        right: 0;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/icon-skip.png");
        width: 7px;
        height: 32px;
    }

    .nav-select-pack .select-list p{
        position: relative;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 32px;
        padding-left: 10px;
        padding-right: 32px;
        background: #A3C7EC;
        border-radius: 2px;
    }
    .nav-select-pack .select-list p .delete-icon{
        position: absolute;
        top: 0;
        right: 5px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/delete-icon.png");
        width: 20px;
        height: 32px;
    }

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
    .total-pack:hover .total-details-pack{
        display: block;
    }
    .total-pack .total-details-pack.no-data-total-pack {
        font-size: 15px;
        line-height: 21px;
        color: #4A4A4A;
        text-align: center;
        padding-top: 106px;
        height: 379px;
    }
    .total-pack .total-details-pack.no-data-total-pack i{
        display: block;
        height: 120px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/no-data-total-icon.png");
    }
    .total-pack .total-details-pack.no-data-total-pack p{
        margin-top: 30px;
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
        width: 55%;
        float: left;
    }
    .total-pack .total-details-pack .table-1 .title-text{
        padding-right: 10px;
    }

    .total-pack .total-details-pack .table-2{
        width: 30%;
        float: left;
        text-align: center;
        word-wrap : break-word;
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
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 44px;
        height: 44px;
        background-image: url("./imgs/no-img.png");
    }
    .total-pack .total-details-pack .details-text{
        width: 150px;
        float: left;
        padding-left: 15px;
        padding-right: 15px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0){
        .total-pack .total-details-pack .details-text{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
        }
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

    .total-pack:hover .arrows-down {
        position: absolute;
        border-top: 0;
        border-bottom: 5px solid #fff;
    }
    .total-pack.activated .total-details-pack {
       display: block;
    }

    .commodity-select-pack {
        background: #F2F8FE;
        padding: 12px 0 12px 15px;
        font-size: 14px;
        color: #7E98AC;
        line-height: 24px;
        font-weight: bold;
    }

    .commodity-select-pack .list-pack .list {
        position: relative;
        padding: 16px 60px 0 2px;
    }
    .commodity-select-pack .list-pack .list .have-more{
        position: absolute;
        top: 16px;
        right: 0;
        margin-right: 0;
        padding-right: 30px;
        font-size: 16px;
        color: #409EFF;
    }
    .commodity-select-pack .list-pack .list .have-more:after{
        content: "";
        position: absolute;
        top: 6px;
        right: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/icon-skip.png");
        height: 10px;
        width: 10px;

        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .commodity-select-pack .list-pack .list.activated .have-more:after{
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        transform: rotate(270deg);
    }
    .commodity-select-pack .list-pack .list.show-one-line{
        height: 40px;
        overflow: hidden;
    }


    .commodity-select-pack .list-pack:not(:first-child) .list {
        border-top: 1px dashed #C8D3DE;
    }

    .commodity-select-pack .list-pack {
        position: relative;
        padding-bottom: 16px;
        padding-left: 70px;
    }
    .commodity-select-pack .list-pack:before{
        position: absolute;
        content: "";
        left: 55px;
        top: 23px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/icon-skip.png");
        height: 10px;
        width: 6px;
    }

    .commodity-select-pack .list-pack .list:before {
       /* position: absolute;
        content: "";
        left: -14px;
        top: 22px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/icon-skip.png");
        height: 10px;
        width: 6px;*/
    }

    .commodity-select-pack .list-pack .list span {
        padding-right: 30px;
        display: inline-block;
    }

    .commodity-select-pack .list-pack .title {
        position: absolute;
        top: 16px;
        left: 0;
        width: 45px;
        text-align: justify;
        height: 20px;
        overflow: hidden;
    }

    .commodity-select-pack .list-pack .title:after {
        display: inline-block;
        width: 100%;
        content: '';
    }

    .cargo-list-pack {
        margin-top: 30px;
        padding-bottom: 30px;
    }
    .cargo-list-pack .cargo-list{
        padding-bottom: 40px;
    }

    .cargo-list-pack .cargo-list .cargo-title {
        overflow: hidden;
    }

    .cargo-list-pack .cargo-title img {
        height: 40px;
        width: auto;
        float: left;
    }

    .cargo-list-pack .cargo-title .right {
        float: right;
        font-size: 16px;
        color: #409EFF;
        font-weight: bold;
        line-height: 40px;
        position: relative;
        padding-right: 16px;
    }

    .cargo-list-pack .cargo-title .right:after {
        position: absolute;
        right: 0;
        top: 0;
        content: "";
        height: 38px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/icon-skip.png");
        width: 6px;
    }

    .cargo-list-pack .cargo-list .details-list-pack {
        margin-top: 20px;
        margin-left: -10px;
        margin-right: -10px;
        overflow: hidden;
        max-height: 775px;
    }

    .cargo-list-pack .cargo-list .list-pack {
        padding: 0 10px 30px 10px;
        width: 328px;
        float: left;
    }
    .pack{
        border: 1px solid #EFEFEF;
    }

    .cargo-list .list-pack .img-pack {
        height: 212px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-image: url("./imgs/no-img.png");
    }

    .cargo-list .list-pack .price-pack {
        overflow: hidden;
        padding: 14px 15px;
        height: 52px;
    }

    .cargo-list .list-pack .price-pack span {

    }

    .cargo-list .list-pack .price-pack span:first-child {
        font-size: 18px;
        color: #FF4432;
        line-height: 28px;
        float: left;

    }

    .cargo-list .list-pack .price-pack .last {
        width: 80px;
        float: right;
        background: #409EFF;
        border-radius: 2px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #fff;

    }
    .cargo-list .list-pack .price-pack .last.no-cargo {
        background: #F5A623;
    }

    .add-subtract-pack {
        float: right;
        margin-right: 10px;
    }

    .cargo-list .list-pack .price-pack span:first-child i:first-child {
        font-size: 12px;
        /*line-height: 28px;*/
    }

    .add-subtract-pack {
        float: right;
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
    .cargo-list .list-pack .text-explain{
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        color: #3D474F;
        line-height: 24px;
        font-weight: bold;
        height: 48px;
    }
    .text-annotation{
        ont-size: 14px;
        color: #78818B;
        line-height: 28px;
        padding: 15px;
    }
    .text-annotation .text-num{
        display: inline-block;
        min-width: 95px;
    }
    .text-annotation .text-supply{
        display: inline-block;
        float: right;
        text-align: right;
        width: 175px;
    }

    .no-data{
        font-size: 18px;
        line-height: 25px;
        padding: 10px 15px;
        color: #566B93;
        text-align: center;
    }
</style>