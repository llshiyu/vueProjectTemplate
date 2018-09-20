<template>
    <div class="supplier-enter">

        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/supplierEnter' }">商品录入</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="header-title">
            <div class="search-total-pakc">
                <p class="title-nav">商品录入</p>
            </div>
            <div class="title-button-1" @click="getExcelTemplate">下载Excel模板</div>
            <el-upload
                    :show-file-list="false"
                    :before-upload="detailBeforeUploadE"
                    :on-error="uploadErrorE"
                    :on-success="handleSuccessE"
                    :action="uploadExcelFile">
                    <div class="title-button-2">Excel导入</div>

            </el-upload>


        </div>
        <!--商品品类-->
        <div v-show="!isExcelLoad">
            <div class="list-type " style="margin-top: 40px">
            <p class="left-text ">
                <span class="content-text must-have-star">商品品类</span>
            </p>
            <el-select v-model="cargoObj.firstTypeValue" placeholder="一级分类" @change="getSecondList">
                <el-option
                        v-for="item in firstTypeArray"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>

            <el-select style="margin-left: 15px" v-model="cargoObj.secondTypeValue" placeholder="二级分类" @change="getThirdList">
                <el-option
                        v-for="item in secondTypeArray"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>

            <el-select v-show="isShowThirdSelect" style="margin-left: 15px" v-model="cargoObj.thirdTypeValue" placeholder="三级分类">
                <el-option
                        v-for="item in thirdTypeArray"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            </div>
                <!--商品名称-->
            <div class="list-type no-mgb" >
                <p class="left-text">
                    <span class="content-text must-have-star">商品名称</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form :model="cargoObj" :rules="rules" ref="ruleForm0" >
                        <el-form-item  prop="name">
                            <el-input style="width: 335px !important;" type="text" v-model="cargoObj.name" placeholder="输入商品名称" maxlength="60"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
                <!--单件商品规格-->
            <div class="list-type no-mgb">
                <p class="left-text">
                    <span class="content-text must-have-star">单件商品规格</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm1" >
                        <el-form-item  prop="netContent">
                            <el-input type="text" v-model.number="cargoObj.netContent" placeholder="请输入净含量" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>

                    <span class="mid-num" style="margin-left: 20px;vertical-align: text-bottom;">*</span>
                    <span class="mid-num" style="margin-left: 6px">1</span>

                    <el-select  style="width: 120px;margin-left: 20px"  v-model="cargoObj.netContentUnit" placeholder="请选取单位">
                        <el-option
                                v-for="item in netUnitArray"
                                :key="item.id"
                                :label="item.unitName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--商品单价-->
            <div class="list-type no-mgb">
                <p class="left-text">
                    <span class="content-text must-have-star">商品单价</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm2" >
                        <el-form-item  prop="unitPrice">
                            <el-input type="number" oninput="if(value.length>10)value=value.slice(0,10)" v-model.number="cargoObj.unitPrice" placeholder="请输入商品单价" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>


                </div>

            </div>
                <!--库存量-->
            <div class="list-type no-mgb">
                <p class="left-text">
                    <span class="content-text must-have-star">库存量</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm3" >
                        <el-form-item  prop="stock">
                            <el-input type="number" oninput="if(value.length>4)value=value.slice(0,4)" v-model.number="cargoObj.stock" placeholder="请输入库存量" maxlength="4"></el-input>
                        </el-form-item>
                    </el-form>
                    <span class="stock-des">商品总量（单件商品的数量）</span>
                </div>

            </div>
                <!--商品品牌-->
            <div class="list-type no-mgb">
                <p class="left-text">
                    <span class="content-text must-have-star">商品品牌</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm4" >
                        <el-form-item  prop="brand">
                            <el-input type="text" v-model="cargoObj.brand" placeholder="输入商品品牌" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
                <!--商品产地-->
            <div class="list-type no-mgb">
                <p class="left-text">
                    <span class="content-text must-have-star">商品产地</span>
                </p>
                <div class="right-text" style="display: inline-block">
                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm5" >
                        <el-form-item  prop="originPlace">
                            <el-input type="text" v-model="cargoObj.originPlace" placeholder="请输入商品产地" maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
                <!--国产/进口：-->
            <div class="list-type" v-if="cargoObj.firstTypeValue==8531||cargoObj.firstTypeValue==8579||cargoObj.firstTypeValue==8626||cargoObj.firstTypeValue==8670||cargoObj.firstTypeValue==8713||cargoObj.secondTypeValue==8463||cargoObj.secondTypeValue==8469||cargoObj.secondTypeValue==8476||cargoObj.secondTypeValue==8481||cargoObj.secondTypeValue==8491">
                <p class="left-text">
                    <span class="content-text must-have-star">国产/进口</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-select class="el-select-mid"  v-model="cargoObj.imported" placeholder="请选择">
                        <el-option
                                v-for="item in importedArray"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--等级-->
            <div class="list-type no-mgb" v-if="cargoObj.secondTypeValue==8504">
                <p class="left-text">
                    <span class="content-text">等级</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm6" >
                        <el-form-item  prop="level">
                            <el-input type="text" v-model="cargoObj.level" placeholder="请输入等级" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                <!--加工方式-->
            <div class="list-type no-mgb" v-if="cargoObj.secondTypeValue==8509||cargoObj.secondTypeValue==8519||cargoObj.secondTypeValue==8525||cargoObj.secondTypeValue==8529">
                <p class="left-text">
                    <span class="content-text">加工方式</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm7" >
                        <el-form-item  prop="processingMode">
                            <el-input type="text" v-model="cargoObj.processingMode" placeholder="请输入加工方式" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                <!--品种-->
            <div class="list-type no-mgb" v-if="cargoObj.firstTypeValue==8579||cargoObj.secondTypeValue==8509||cargoObj.secondTypeValue==8519||cargoObj.secondTypeValue==8525||cargoObj.secondTypeValue==8529">
                <p class="left-text">
                    <span class="content-text must-have-star">品种</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm8" >
                        <el-form-item  prop="category">
                            <el-input type="text" v-model="cargoObj.category" placeholder="请输入品种" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                <!--保存状态-->
            <div class="list-type" v-if="cargoObj.secondTypeValue==8509||cargoObj.secondTypeValue==8519||cargoObj.secondTypeValue==8525||cargoObj.secondTypeValue==8529||cargoObj.firstTypeValue==8531||cargoObj.firstTypeValue==8579||cargoObj.firstTypeValue==8610||cargoObj.firstTypeValue==8626||cargoObj.firstTypeValue==8876">
                <p class="left-text">
                    <span class="content-text must-have-star">保存状态</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-select class="el-select-mid"  v-model="cargoObj.storageStatus" placeholder="请选择">
                        <el-option
                                v-for="item in storageStatusArray"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--饲养方式-->
            <div class="list-type" v-if="cargoObj.firstTypeValue==8579">
                <p class="left-text">
                    <span class="content-text must-have-star">饲养方式</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-select class="el-select-mid"  v-model="cargoObj.feedingMode" placeholder="请选择">
                        <el-option
                                v-for="item in feedingModeArray"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--海水/淡水：-->
            <div class="list-type" v-if="cargoObj.firstTypeValue==8626">
                <p class="left-text">
                    <span class="content-text must-have-star">海水/淡水</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-select class="el-select-mid"  v-model="cargoObj.waters" placeholder="请选择">
                        <el-option
                                v-for="item in watersArray"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--含糖/不含糖：-->
            <div class="list-type" v-if="cargoObj.firstTypeValue==8840">
                <p class="left-text">
                    <span class="content-text">含糖/不含糖</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-select class="el-select-mid"  v-model="cargoObj.containSugar" placeholder="请选择">
                        <el-option
                                v-for="item in containSugarArray"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </div>
            </div>
                <!--口味-->
            <div class="list-type no-mgb" v-if="cargoObj.firstTypeValue==8610">
                <p class="left-text">
                    <span class="content-text">口味</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm9" >
                        <el-form-item  prop="flavor">
                            <el-input type="text" v-model="cargoObj.flavor" placeholder="请输入口味" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                <!--单件容量-->
            <!--<div class="list-type no-mgb" v-if="cargoObj.firstTypeValue==8189">
                <p class="left-text">
                    <span class="content-text must-have-star">单件容量</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <el-form style="display: inline-block" :model="cargoObj" :rules="rules" ref="ruleForm10" >
                        <el-form-item  prop="capacity">
                            <el-input type="text" v-model="cargoObj.capacity" placeholder="请输入单件容量" maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>-->

                <!--商品图片-->
            <div class="list-type" style="height: 120px;">
                <p class="left-text">
                    <span class="content-text must-have-star" style="    top: -63px;">商品图片</span>
                </p>
                <div class="right-text"  style="display: inline-block;overflow: hidden; cursor:pointer">
                    <div class='goods-pic-list' v-for="(item,index) in arrImage" :style="'background-image: url('+item.url+');'" @click="openPicDiv(index)"></div>
                    <div class="main-tip" v-show="arrImage[0].url==''" @click="openPicDiv(0)">主图必选</div>
                </div>
                <span class="pic-des">从商品库添加商品图片</span>
            </div>
                <!--食品安全检疫证-->
            <div class="list-type" style="height: 80px;">
                <p class="left-text">
                    <span class="content-text must-have-star">商品相关证照</span>
                </p>
                <!--:show-file-list="false"-->
                <!--list-type="picture-card"-->
                <!--:on-format-error="handleFormatError"-->
                <!--list-type="picture-card"-->

                <div class="right-text" style="display: inline-block" >
                    <el-upload
                            :show-file-list="false"
                            :before-upload="detailBeforeUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-error="uploadError"
                            :on-success="handleSuccess"
                            :action="picUploadUrl">

                        <img v-if="!isHavePic" src="./images/add.png" class="add-pic">
                        <img v-else :src="cargoObj.securityPhoto" class="add-pic">
                    </el-upload>


                </div>

            </div>

                <!--商品介绍-->
            <div class="list-type" >
                <p class="left-text" style=" position: relative;top: -215px;">
                    <span class="content-text must-have-star">商品介绍</span>
                </p>
                <div class="right-text" style="display: inline-block">

                    <editor-bar @change="editorChange" v-model="editor.info" :isClear="isClear" :isShowMes="isShowMes"></editor-bar>
                    <!--<div id="editbox" ref="editbox"></div>-->
                    <!--<quill-editor
                            v-model="content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event,strValue,20)">
                    </quill-editor>-->
                </div>

            </div>

            <div class="preview" @click="preview">预览</div>

            <div class="bottom-button-list">
                <span class="save" @click="goSave(5)">保存</span>
                <span class="cancel" @click="goCancel">取消</span>
                <span class="online" @click="goSave(1)">直接上架商品</span>
            </div>


                <!--商品图片库弹框-->
            <div class="mn-total-dialog" v-show="showPicDiv">
                <div class="mn-dialog">
                    <div class="mn-title">商品图片库
                        <img src="./images/close.png" class="close-icon" @click="closePic">
                    </div>

                    <div class="select-box">
                        <el-select v-model="firstTypeValueS" placeholder="一级分类" @change="getSecondListS">
                            <el-option
                                    v-for="item in firstTypeArrayS"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                        <el-select style="margin-left: 15px" v-model="secondTypeValueS" placeholder="二级分类" @change="getThirdListS">
                            <el-option
                                    v-for="item in secondTypeArrayS"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                        <el-select style="margin-left: 15px" v-show="isShowThirdSelectS" v-model="thirdTypeValueS" placeholder="三级分类" @change="getImgList">
                            <el-option
                                    v-for="item in thirdTypeArrayS"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <el-upload
                            :show-file-list="false"
                            :before-upload="detailBeforeUpload1"
                            :on-preview="handlePictureCardPreview1"
                            :on-error="uploadError1"
                            :on-success="handleSuccess1"
                            :action="picUploadUrl">

                        <div class="mn-add-pic">新增图片</div>
                    </el-upload>


                    <div class="pic-content-box">
                        <div class="pic-type-box"  v-for="(item,index) in arrImageList" >
                            <div class='pic-goods'  v-bind:class="{ active: selectedIndex==index }" @click="selectPic(item,index)"  :style="'background-image: url('+item.url+');'"></div>
                            <p class="pic-type-name">{{item.name}}</p>
                        </div>
                        <div v-if="picGetted&&arrImageList.length===0" class="pic-goods-tip">未发现产品相关的图片，快去新增吧</div>

                    </div>

                    <div class="mn-button-list">
                        <span class="button-ok" @click="selectGoodsPic">确定</span>
                        <span class="button-cancel"  @click="closePic">取消</span>
                    </div>
                </div>
            </div>
        </div>
        <file-process :isShowFileProcess="isShowFileProcess" :fileProName="fileProName"></file-process>

        <div v-show="isExcelLoad">
            <div class="excel-total-des">
                <img src="./images/warning-icon.png" class="excel-warning-icon">
                总共导入{{excelTotal}}条商品信息，其中导入成功{{excelSuccess}}条，导入失败{{excelFail}}条
            </div>
            <div style="max-height:calc(100vh - 400px);overflow: auto">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="index"
                            label="编号"
                    >
                    </el-table-column>
                    <!--<el-table-column
                            prop="name"
                            label="商品名称"
                    >
                    </el-table-column>-->
                    <el-table-column label="商品名称" min-width="200">
                        <template slot-scope="scope">
                            <span :title="scope.row.name"  style="width:95%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="typeName"
                            label="商品品类">
                    </el-table-column>
                    <el-table-column
                            prop="priceUnitShow"
                            label="单价/单位">
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="库存">
                    </el-table-column>
                    <el-table-column label="商品状态">
                        <template slot-scope="scope">

                            <span v-if="scope.row.statusText=='待上架'" class="status-1">{{scope.row.statusText}}</span>
                            <span v-if="scope.row.statusText=='已下架'" class="status-2">{{scope.row.statusText}}</span>
                            <span v-if="scope.row.statusText=='补货中'" class="status-3">{{scope.row.statusText}}</span>
                            <span v-if="scope.row.statusText=='货源充足'" class="status-4">{{scope.row.statusText}}</span>

                        </template>
                    </el-table-column>

                    <el-table-column label="导入状态">
                        <template slot-scope="scope">

                            <span v-if="scope.row.importStatus==0" class="import-status-success">{{scope.row.importStatusText}}</span>
                            <span v-if="scope.row.importStatus==1" class="import-status-error">{{scope.row.importStatusText}}</span>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">

                            <span class="edit-button"  @click="goEdit(scope.row.id)">编辑</span>

                        </template>
                    </el-table-column>



                </el-table>


            </div>
            <div class="mn-button-list" style="margin-top: 40px">
                <span class="button-ok" style="width: 134px;" @click="saveToServer">保存至商品库</span>
                <span class="button-cancel"  @click="cancelToList">取消</span>
            </div>
        </div>



    </div>
</template>

<script>
    import  {sessionData,_sessionStorage} from '../../../assets/js/util'
    import { quillEditor } from 'vue-quill-editor'
    import EditorBar from '../../../components/common/EditorBar'
    import fileProcess from '../../../components/common/fileProcess'


    export default {
        name: "supplierEnter",
        components: {
            quillEditor,EditorBar,fileProcess
        },

        data() {
            return {
                editor: {
                    info: ''
                },
                excelTemplateUrl:'',
                isShowFileProcess:false,
                fileProName:'',//上传文件名字

                isClear: false,
                picGetted:false,
                isShowMes:true,
                isGeted:true,//节流
                isNeedGetData:'need',//是否需要刷新页面数据
                isExcelLoad:false,//是否是导入文件录入
                content:null,//富文本内容
                routeFrom: {},
                routeTo: {},
                arrImage:[{isMain:1,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''}],//6个商品图片
                arrImageList:[],//模板图片集合
                selectedIndex:-1,//默认没有选中的图片，设为值为-1
                arrImageIndex:0,//要上传第几张商品图片的角标，默认是主图，第一张
                arrImageSelectUrl:'',//商品图片库中选中的图片URL
                editorOption:{
                    modules:{
                        toolbar:[
                            ['image']
                        ]
                    },
                    placeholder:'输入商品介绍内容'
                },
                isHavePic:false,//上传检疫证有图片
                excelSuccess:'',
                excelTotal:'',
                excelFail:'',
                dialogImageUrl: '',
                dialogVisible: false,
                isShowThirdSelect:true,//是否显示第三个下拉框的标志
                isShowThirdSelectS:true,//是否显示弹框内第三个下拉框的标志
                showPicDiv:false,//商品图片库的显示标志
                picUploadUrl:configM.comUrl+configM.uploadUrl,
                uploadExcelFile:configM.comUrl+configM.uploadExcelFile+'?sessionId='+_sessionStorage('sessionId'),
                //一级分类
                firstTypeArray:[],

                //二级分类
                secondTypeArray:[],

                //三级分类
                thirdTypeArray:[],

                //一级分类（弹窗内）
                firstTypeArrayS:[],
                firstTypeValueS:'',
                //二级分类
                secondTypeArrayS:[],
                secondTypeValueS:'',
                //三级分类
                thirdTypeArrayS:[],
                thirdTypeValueS:'',

                //净含量单位
                netUnitArray:[

                ],

                //国产/进口
                importedArray:[
                    {
                        id:1,
                        text:"国产"
                    },
                    {
                        id:2,
                        text:"进口"
                    }
                ],

                //保存状态
                storageStatusArray:[
                    {
                        id:1,
                        text:"冷冻"
                    },
                    {
                        id:2,
                        text:"冷藏"
                    },
                    {
                        id:3,
                        text:"常温"
                    }
                ],
                feedingModeArray:[
                    {
                        id:1,
                        text:"散养"
                    },
                    {
                        id:2,
                        text:"饲养"
                    },
                    {
                        id:3,
                        text:"草饲"
                    }
                ],
                watersArray:[
                    {
                        id:1,
                        text:"海水"
                    },
                    {
                        id:2,
                        text:"淡水"
                    },

                ],
                containSugarArray:[
                    {
                        id:1,
                        text:"含糖"
                    },
                    {
                        id:2,
                        text:"不含糖"
                    },

                ],

                //商品基本参数
                cargoObj:{
                    firstTypeValue:'',
                    secondTypeValue:'',
                    thirdTypeValue:'',
                    name:'',//商品名称
                    netContent:'',//净含量
                    netContentUnit:'',//净含量单位
                    netContentUnitName:'',//净含量单位名称
                    unitPrice:'',//商品单价
                    stock:'',//库存量
                    brand:'',//商品品牌
                    originPlace:'',//商品产地
                    imported:'',//国产/进口
                    level:'',//等级
                    processingMode:'',//加工方式
                    category:'',//品种
                    storageStatus:'',//保存状态
                    feedingMode:'',//饲养方式
                    waters:'',//海水、淡水
                    containSugar:'',//是否含糖
                    flavor:'',//口味
                    capacity:'',//单件容量
                    securityPhoto:'',//食品检疫证
                    description:'',//商品介绍

                },
                rules: {
                    name:[
                        {required: true, message: '请输入商品名称', trigger: 'blur'},

                    ],
                    netContent:[
                        {required: true, message: '请输入净含量', trigger: 'blur'},
                        { type: 'number', message: '请输入数字内容信息'}
                    ],
                    unitPrice:[
                        {required: true, message: '请输入商品单价', trigger: 'blur'},
                        { type: 'number', message: '请输入数字内容信息'}
                    ],
                    stock:[
                        {required: true, message: '请输入库存量', trigger: 'blur'},
                        { type: 'number', message: '请输入数字内容信息'}
                    ],
                    brand:[
                        {required: true, message: '请输入商品品牌', trigger: 'blur'},
                    ],
                    originPlace:[
                        {required: true, message: '请输入商品产地', trigger: 'blur'},
                    ],
                    level:[
                        {required: false, message: '请输入等级', trigger: 'blur'},
                    ],
                    processingMode:[
                        {required: false, message: '请输入加工方式', trigger: 'blur'},
                    ],
                    category:[
                        {required: true, message: '请输入品种', trigger: 'blur'},
                    ],
                    flavor:[
                        {required: true, message: '请输入口味', trigger: 'blur'},
                    ],
                    capacity:[
                        {required: true, message: '请输入单件容量', trigger: 'blur'},
                    ],

                },


            }
        },
        beforeRouteEnter(to, from, next) {

            console.log(from.name)
            if(from.name==='supplierPreview'||from.name==='supplierEditExcel'||from.name==='supplierE'){
                _sessionStorage('isNeedGetData','notNeed')
            }else{
                _sessionStorage('isNeedGetData','need')
            }
            next();

        },
        mounted() {
            this.clean()
            this.getTypeList()
            this.getUnitList()


        },
        //this.routeFrom.name
        activated(){

            this.isNeedGetData = _sessionStorage('isNeedGetData')
            if(this.isNeedGetData==='need'){
                this.clean()
                this.getTypeList()
                this.getUnitList()
            }
            if(this.isExcelLoad){
                this.$api.supplier.listtemp({}).then(res => {
                    if (res.meta.code == 0) {
                        this.isExcelLoad = true
                        this.tableData=[]
                        var list = res.data||[]

                        this.tableData = list

                        this.$forceUpdate()
                        for(let i in this.tableData){
                            //索引
                            this.tableData[i].index = Number(i)+1
                            //单价
                            this.tableData[i].priceUnitShow = '¥'+this.tableData[i].unitPrice+'/'+this.tableData[i].netContent+this.tableData[i].netContentUnitName
                            //商品状态
                            if(this.tableData[i].status===1&&this.tableData[i].stock>0){
                                this.tableData[i].statusText = '货源充足'
                            }else if(this.tableData[i].status===1&&this.tableData[i].stock===0){
                                this.tableData[i].statusText = '补货中'
                            }else if(this.tableData[i].status===5){
                                this.tableData[i].statusText = '待上架'
                            }else if(this.tableData[i].status===3){
                                this.tableData[i].statusText = '已下架'
                            }else{
                                this.tableData[i].statusText = '不详'
                            }
                            this.tableData[i].unitPrice = this.tableData[i].unitPrice.toFixed(2)
                            if(this.tableData[i].importStatus===0){
                                this.tableData[i].importStatusText='成功'
                            }else{
                                this.tableData[i].importStatusText='失败'
                            }

                        }


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                    this.picGetted = true
                })

            }

        },
        computed: {

        }, // 计算属性

        methods: {
            editorChange(val){
                console.log(val,8888)


            }, // 富文本变化时触发
          /*  onEditorBlur(){//失去焦点事件
//                console.log(quillEditor.getLength())
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(e,strValue,decimalNum){//内容改变事件
                e.quill.deleteText(decimalNum,1,strValue);
            },*/

            //全部保存至商品库
            saveToServer(){
                this.$api.supplier.addGoodsBatch({}).then(res => {
                    if (res.meta.code == 0) {

                        this.$router.push({name:'mySupplier'})
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1500,
                            center: true
                        });
                    }
                    this.picGetted = true
                })
            },

            //取消跳转到列表页
            cancelToList(){
                this.$confirm('确认取消后，已上传信息将会丢失', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   window.location.reload()
                })

            },

            /**上传文件的一些钩子函数**/
            detailBeforeUpload(file) {
                this.fileProName = file.name
                console.log(file)
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png'||file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('图片上传失败，请重新上传');
                }
                if (!isLt2M) {
                    this.$message.error('图片上传失败，请重新上传');
                }
                if(isJPG&&isLt2M){
                    this.isShowFileProcess = true
                }
                return isJPG && isLt2M;

            },

            detailBeforeUploadE(file) {
                this.fileProName = file.name
//                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                console.log(file)
               const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

                if (!isExcel) {
                    this.$message.error('上传失败，请重新上传');
                }else{
                    this.isShowFileProcess = true
                }

                return isExcel ;

            },
            uploadErrorE(error, file, fileList){
                this.$message.error({
                    message: '上传失败，请重新上传',
                    duration: 1500,
                    center: true
                });
                this.isShowFileProcess = false
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            uploadError(error, file, fileList){
                this.$message.error({
                    message: '图片上传失败，请重新上传',
                    duration: 1500,
                    center: true
                });
                this.isShowFileProcess = false
            },

            handleSuccess (res, file) {
               console.log(res,file)
                this.cargoObj.securityPhoto = res.data[0].url
                this.isHavePic=true
                this.$message.success({
                    message: '上传成功',
                    duration: 1500,
                    center: true
                });
                this.isShowFileProcess = false
            },

            handleSuccessE (res, file) {
                console.log(res,file)
                this.isShowFileProcess = false
                if(res.meta.code==='0'){
                    this.$message.success({
                        message: '上传成功',
                        duration: 1500,
                        center: true
                    });
                    var data = res.data||{}
                    this.excelSuccess =data.success||'-'
                    this.excelFail =data.fail
                    this.excelTotal =data.success+data.fail


                    this.$api.supplier.listtemp({}).then(res => {
                        if (res.meta.code == 0) {
                            this.isExcelLoad = true
                            var list = res.data||[]

                            this.tableData = list


                            for(let i in this.tableData){
                                //索引
                                this.tableData[i].index = Number(i)+1
                                //单价
                                this.tableData[i].priceUnitShow = '¥'+this.tableData[i].unitPrice+'/'+this.tableData[i].netContent+this.tableData[i].netContentUnitName
                                //商品状态
                                if(this.tableData[i].status===1&&this.tableData[i].stock>0){
                                    this.tableData[i].statusText = '货源充足'
                                }else if(this.tableData[i].status===1&&this.tableData[i].stock===0){
                                    this.tableData[i].statusText = '补货中'
                                }else if(this.tableData[i].status===5){
                                    this.tableData[i].statusText = '待上架'
                                }else if(this.tableData[i].status===3){
                                    this.tableData[i].statusText = '已下架'
                                }else{
                                    this.tableData[i].statusText = '不详'
                                }
                                this.tableData[i].unitPrice = this.tableData[i].unitPrice.toFixed(2)
                                if(this.tableData[i].importStatus===0){
                                    this.tableData[i].importStatusText='成功'
                                }else{
                                    this.tableData[i].importStatusText='失败'
                                }

                            }


                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                        this.picGetted = true
                    })
                }else{
                    this.$message.error({
                        message: '上传文件内容有误，请重新上传',
                        duration: 1500,
                        center: true
                    });
                }




            },

            detailBeforeUpload1(file) {
                this.fileProName = file.name
                console.log(file)
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png'||file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('图片上传失败，请重新上传');
                }
                if (!isLt2M) {
                    this.$message.error('图片上传失败，请重新上传');
                }
                if(isJPG&&isLt2M){
                    this.isShowFileProcess = true
                }
                return isJPG && isLt2M;

            },

            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            uploadError1(error, file, fileList){
                this.isShowFileProcess = false
                this.$message.error({
                    message: '图片上传失败，请重新上传',
                    duration: 1000,
                    center: true
                });
            },

            handleSuccess1(res, file) {
                console.log(res,file)
                var data = res.data||[]
                var url = data[0].url||''
                var fileName = data[0].fileName||''
                this.uploadTypePic(url,fileName)
                this.$message.success({
                    message: '上传成功',
                    duration: 1000,
                    center: true
                });
                this.isShowFileProcess = false

            },
            /**上传文件的一些钩子函数**/



            /*******商品图片库的一些函数*********/
            //打开商品图片库
            openPicDiv(index){
                this.arrImageIndex = index
                this.selectedIndex = -1
                this.showPicDiv = true

            },
            //选中商品图片库的图片
            selectPic(item,index){
                if(this.selectedIndex===index){
                    this.selectedIndex=-1
                }else{
                    this.selectedIndex = index
                    this.arrImageSelectUrl = item.url
                }

            },
            //弹窗的确定事件
            selectGoodsPic(){
                if(this.selectedIndex===-1){
                    this.$message.error({
                        message: '请选择图片',
                        duration: 1500,
                        center: true
                    });
                    return false
                }
                this.showPicDiv = false
                this.arrImage[this.arrImageIndex].url = this.arrImageSelectUrl
            },
            //关闭商品图片库
            closePic(){
                this.showPicDiv = false
            },
            /*******商品图片库的一些函数*********/


            /**********录入页面的操作函数*************/
            //预览
            preview(){
                //得到净含量单位的名称
                for(let i in this.netUnitArray){
                    if(this.netUnitArray[i].id===this.cargoObj.netContentUnit){
                        this.cargoObj.netContentUnitName = this.netUnitArray[i].unitName
                    }
                }
                this.cargoObj.description = this.editor.info
                this.cargoObj.arrImage = this.arrImage
                var localData = {}
                //将数据存到本地
//                sessionData
                localData.cargoObj = this.cargoObj
                _sessionStorage('localDataMn',localData)
                _sessionStorage('showBreadcrumb',"0")
                this.$router.push({name:'supplierPreview'})
            },

            //保存
            goSave(status){
                if(this.isGeted){
                    var typeName = ''

                    //得到净含量单位的名称
                    for(let i in this.netUnitArray){
                        if(this.netUnitArray[i].id===this.cargoObj.netContentUnit){
                            this.cargoObj.netContentUnitName = this.netUnitArray[i].unitName
                        }
                    }

                    for(let i in this.firstTypeArray){
                        if(this.firstTypeArray[i].id===this.cargoObj.firstTypeValue){
                            typeName = this.firstTypeArray[i].name
                        }
                    }

                    this.cargoObj.description = this.editor.info
                    //所有情况的基本表单验证
                    if(!this.cargoObj.firstTypeValue){
                        this.$message.error({
                            message: '请选择商品分类',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.name){
                        this.$message.error({
                            message: '请输入商品名称',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.netContent){
                        this.$message.error({
                            message: '请输入净含量',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.netContentUnit){
                        this.$message.error({
                            message: '请选取单位',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.unitPrice){
                        this.$message.error({
                            message: '请输入商品单价',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    console.log(this.cargoObj.stock)
                    if(this.cargoObj.stock===''){
                        this.$message.error({
                            message: '请输入库存量',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.brand){
                        this.$message.error({
                            message: '请输入商品品牌',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.originPlace){
                        this.$message.error({
                            message: '请输入商品产地',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(this.arrImage[0].url===''){
                        this.$message.error({
                            message: '请选择商品图片',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.securityPhoto){
                        this.$message.error({
                            message: '请上传食品安全检疫证',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }
                    if(!this.cargoObj.description){
                        this.$message.error({
                            message: '请输入商品介绍',
                            duration: 1000,
                            center: true
                        });
                        return false
                    }

                    //国产、进口的条件验证
                    if(this.cargoObj.firstTypeValue==8531||this.cargoObj.firstTypeValue==8579||this.cargoObj.firstTypeValue==8626||this.cargoObj.firstTypeValue==8670||this.cargoObj.firstTypeValue==8713||this.cargoObj.secondTypeValue==8463||this.cargoObj.secondTypeValue==8469||this.cargoObj.secondTypeValue==8476||this.cargoObj.secondTypeValue==8481||this.cargoObj.secondTypeValue==8491){

                        if(!this.cargoObj.imported){
                            this.$message.error({
                                message: '请选择国产或者进口',
                                duration: 1000,
                                center: true
                            });
                            return false
                        }
                    }

                    //品种的条件验证
                    if(this.cargoObj.firstTypeValue==8579||this.cargoObj.secondTypeValue==8509||this.cargoObj.secondTypeValue==8519||this.cargoObj.secondTypeValue==8525||this.cargoObj.secondTypeValue==8529){
                        if(!this.cargoObj.category){
                            this.$message.error({
                                message: '请输入品种',
                                duration: 1000,
                                center: true
                            });
                            return false
                        }
                    }

                    //保存状态的条件验证
                    if(this.cargoObj.secondTypeValue==8509||this.cargoObj.secondTypeValue==8519||this.cargoObj.secondTypeValue==8525||this.cargoObj.secondTypeValue==8529||this.cargoObj.firstTypeValue==8531||this.cargoObj.firstTypeValue==8579||this.cargoObj.firstTypeValue==8610||this.cargoObj.firstTypeValue==8626||this.cargoObj.firstTypeValue==8876){
                        if(!this.cargoObj.storageStatus){
                            this.$message.error({
                                message: '请选择保存状态',
                                duration: 1000,
                                center: true
                            });
                            return false
                        }
                    }

                    //饲养方式的条件验证
                    if(this.cargoObj.firstTypeValue==8579){
                        if(!this.cargoObj.feedingMode){
                            this.$message.error({
                                message: '请选择饲养方式',
                                duration: 1000,
                                center: true
                            });
                            return false
                        }
                    }

                    //海水、淡水验证
                    if(this.cargoObj.firstTypeValue==8626){
                        if(!this.cargoObj.waters){
                            this.$message.error({
                                message: '请选择海水或者淡水',
                                duration: 1000,
                                center: true
                            });
                            return false
                        }
                    }





                    this.isGeted = false
                    var param={
                        typeId: this.cargoObj.firstTypeValue,
                        typeIdOne: this.cargoObj.secondTypeValue,
                        typeIdTwo: this.cargoObj.thirdTypeValue,//三个分类
                        name:this.cargoObj.name,//商品名称
                        netContent:this.cargoObj.netContent,//净含量
                        netContentUnit:this.cargoObj.netContentUnit,//净含量单位
                        netContentUnitName:this.cargoObj.netContentUnitName,//净含量单位名称
                        unitPrice:this.cargoObj.unitPrice,//商品单价
                        stock:this.cargoObj.stock,//库存量
                        brand:this.cargoObj.brand,//商品品牌
                        originPlace:this.cargoObj.originPlace,//商品产地
                        imported:this.cargoObj.imported,//国产/进口
                        level:this.cargoObj.level,//等级
                        processingMode:this.cargoObj.processingMode,//加工方式
                        category:this.cargoObj.category,//品种
                        storageStatus:this.cargoObj.storageStatus,//保存状态
                        feedingMode:this.cargoObj.feedingMode,//饲养方式
                        waters:this.cargoObj.waters,//海水、淡水
                        containSugar:this.cargoObj.containSugar,//是否含糖
                        flavor:this.cargoObj.flavor,//口味
                        capacity:this.cargoObj.capacity,//单件容量
                        securityPhoto:this.cargoObj.securityPhoto,//食品检疫证
                        pics:this.arrImage,//商品图片
                        description:this.cargoObj.description,
                        status:status,
                        typeName:typeName
                    }
                    this.$api.supplier.SupplierAddGoods(param).then(res => {
                        if (res.meta.code == 0) {
                            console.log(res)
                            this.$message.success({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                            this.$router.push({name:'mySupplier'})
                        } else {
                            this.$message.error({
                                message: res.meta.message,
                                duration: 1000,
                                center: true
                            });
                        }
                    })
                    this.isGeted=true
                }

            },

            //取消
            goCancel(){
                this.$confirm('取消后新填写信息将无法保存，确认取消？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name:'mySupplier'})
                })
            },

            //去编辑
            goEdit(id){
                this.$router.push({path:'/supplierEditExcel',query:{id:id}})
//                this.$router.push({path:'/supplierE'})


            },


            /**********录入页面的操作函数*************/


            /************录入页面的下拉框事件******************/
            getTypeList(){
                var param = {
                    parentId : 0
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.firstTypeArray=[]
                        this.firstTypeArrayS=[]
                        for(let i in list){
                            this.firstTypeArray.push(list[i])
                            this.firstTypeArrayS.push(list[i])
                        }

                        this.firstTypeValueS = list[0].id

                        //查询弹框内的第二个下拉框的数组
                        this.$api.supplier.typeList({parentId:list[0].id}).then(res => {
                            if (res.meta.code == 0) {
                                var list = res.data || []
                                this.secondTypeArrayS = []

                                for(let i in list){
                                    this.secondTypeArrayS.push(list[i])
                                }
                                this.secondTypeValueS = list[0].id

                                //查询弹框内第三个下拉框的数组
                                this.$api.supplier.typeList({parentId:list[0].id}).then(res => {
                                    if (res.meta.code == 0) {
                                        var list = res.data || []
                                        this.thirdTypeArrayS = []
                                        if(list.length==0){
                                            this.isShowThirdSelectS = false
                                            this.thirdTypeValueS = ''
                                        }else{
                                            this.isShowThirdSelectS = true
                                            for(let i in list){
                                                this.thirdTypeArrayS.push(list[i])
                                            }
                                            this.thirdTypeValueS = list[0].id
                                        }

                                        //查询默认选项的模板图片集合
                                        this.getTypePics()


                                    } else {
                                        this.$message.error({
                                            message: res.meta.message,
                                            duration: 1000,
                                            center: true
                                        });
                                    }
                                })



                            } else {
                                this.$message.error({
                                    message: res.meta.message,
                                    duration: 1000,
                                    center: true
                                });
                            }
                        })

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //选择第一分类后，获取第二分类，以及根据第二分类首项，查询出第三分类首项。
            getSecondList() {

                var param = {
                    parentId : this.cargoObj.firstTypeValue
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.secondTypeArray = []
                        for(let i in list){
                            this.secondTypeArray.push(list[i])
                        }
                        this.cargoObj.secondTypeValue = this.secondTypeArray[0].id


                        this.$api.supplier.typeList({parentId:list[0].id}).then(res => {
                            if (res.meta.code == 0) {
                                var list = res.data || []
                                this.thirdTypeArray = []
                                if(list.length==0){
                                    this.isShowThirdSelect = false
                                    this.thirdTypeValue = ''
                                }else{
                                    this.isShowThirdSelect = true
                                    for(let i in list){
                                        this.thirdTypeArray.push(list[i])
                                    }
                                    this.cargoObj.thirdTypeValue = this.thirdTypeArray[0].id
                                }


                            } else {
                                this.$message.error({
                                    message: res.meta.message,
                                    duration: 1000,
                                    center: true
                                });
                            }
                        })

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //选择第二分类后，获取第三分类，如没有则隐藏第三个下拉框。
            getThirdList() {
                var param = {
                    parentId : this.cargoObj.secondTypeValue
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.thirdTypeArray = []
                        if(list.length==0){
                            this.isShowThirdSelect = false
                            this.thirdTypeValue = ''
                        }else{
                            this.isShowThirdSelect = true
                            for(let i in list){
                                this.thirdTypeArray.push(list[i])
                            }
                            this.cargoObj.thirdTypeValue = this.thirdTypeArray[0].id
                        }


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },
            /************录入页面的下拉框事件******************/



            /************商品图片库的下拉框事件******************/
            //弹窗内的选择第一分类后，获取第二分类，以及根据第二分类首项，查询出第三分类首项。
            getSecondListS() {

                var param = {
                    parentId : this.firstTypeValueS
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.secondTypeArrayS = []
                        for(let i in list){
                            this.secondTypeArrayS.push(list[i])
                        }
                        this.secondTypeValueS = this.secondTypeArrayS[0].id


                        this.$api.supplier.typeList({parentId:list[0].id}).then(res => {
                            if (res.meta.code == 0) {
                                var list = res.data || []
                                this.thirdTypeArrayS = []
                                if(list.length==0){
                                    this.isShowThirdSelectS = false
                                    this.thirdTypeValueS = ''
                                }else{
                                    this.isShowThirdSelectS = true
                                    for(let i in list){
                                        this.thirdTypeArrayS.push(list[i])
                                    }
                                    this.thirdTypeValueS = this.thirdTypeArrayS[0].id
                                }
                                this.getTypePics()

                            } else {
                                this.$message.error({
                                    message: res.meta.message,
                                    duration: 1000,
                                    center: true
                                });
                            }
                        })

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //弹窗内的选择第二分类后，获取第三分类，如没有则隐藏第三个下拉框。
            getThirdListS() {
                var param = {
                    parentId : this.secondTypeValueS
                }
                this.$api.supplier.typeList(param).then(res => {
                    if (res.meta.code == 0) {
                        var list = res.data || []
                        this.thirdTypeArrayS = []
                        if(list.length==0){
                            this.isShowThirdSelectS = false
                            this.thirdTypeValueS = ''
                        }else{
                            this.isShowThirdSelectS = true
                            for(let i in list){
                                this.thirdTypeArrayS.push(list[i])
                            }
                            this.thirdTypeValueS = this.thirdTypeArrayS[0].id
                        }
                        this.getTypePics()


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //弹窗内的第三个下拉框选择后触发事件
            getImgList(){
               this.getTypePics()
            },
            /************商品图片库的下拉框事件******************/


            //获取模板图片
            getTypePics(){

                var param = {
                    goodsTypeId: this.firstTypeValueS,//第一分类id
                    typeOne: this.secondTypeValueS,//第二分类id
                    typeTwo: this.thirdTypeValueS,//第三分类id
                    pageNum:1,
                    pageSize:999999,
                }
                this.picGetted = false
                this.$api.supplier.getPhoto(param).then(res => {
                    if (res.meta.code == 0) {
                        var data = res.data||{}
                        var list = data.list||[]
                        this.arrImageList = []
                        for(let i in list){
                            this.arrImageList.push({
                                url:list[i].url,
                                name:list[i].photoName
                            })
                        }


                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                    this.picGetted = true
                })
            },


            //上传对应分类的模板图片
            uploadTypePic(url,fileName){
                var param = {

                    goodsTypeId: this.firstTypeValueS,//第一分类id
                    typeOne: this.secondTypeValueS,//第二分类id
                    typeTwo: this.thirdTypeValueS,//第三分类id
                    url: url,
                    photoName:fileName,

                }
                this.$api.supplier.uploadPhoto(param).then(res => {
                    if (res.meta.code == 0) {
                        console.log(res)
                        this.arrImageList.push({
                            url:url,
                            name:fileName
                        })

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },



            //获取单位列表
            getUnitList(){
                var param = {

                }
                this.$api.supplier.unitList(param).then(res => {
                    if (res.meta.code == 0) {
                        this.netUnitArray = []
                        console.log(res)
                        var data = res.data || []
                        for(let i in data){
                            this.netUnitArray.push({
                                id:data[i].id,
                                unitName:data[i].unitName,
                            })
                        }

                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //获取excel模板
            getExcelTemplate(){

                this.$api.supplier.getExcelTemplate().then(res => {
                    if (res.meta.code == 0) {
//                        this.excelTemplateUrl
                        let a = document.createElement('a');
                        a.href = window.URL.createObjectURL(res);// xhr.response is a blob
                        a.download = '模板.xlsx'; // Set the file name.
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            },

            //初始化函数
            clean(){
                this.editor.info=''
                this.content=null
                this.selectedIndex = -1
                this.arrImageIndex = 0
                this.arrImageSelectUrl = ''
                this.isGeted=true
                this.isShowThirdSelectS = true
                this.isShowThirdSelect = true
                this.isHavePic = false
                this.isExcelLoad = false
                this.arrImage=[{isMain:1,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''},{isMain:0,url:''}],//6个商品图片
                this.arrImageList=[]
                this.cargoObj={
                    firstTypeValue:'',
                        secondTypeValue:'',
                        thirdTypeValue:'',
                        name:'',//商品名称
                        netContent:'',//净含量
                        netContentUnit:'',//净含量单位
                        netContentUnitName:'',
                        unitPrice:'',//商品单价
                        stock:'',//库存量
                        brand:'',//商品品牌
                        originPlace:'',//商品产地
                        imported:'',//国产/进口
                        level:'',//等级
                        processingMode:'',//加工方式
                        category:'',//品种
                        storageStatus:'',//保存状态
                        feedingMode:'',//饲养方式
                        waters:'',//海水、淡水
                        containSugar:'',//是否含糖
                        flavor:'',//口味
                        capacity:'',//单件容量
                        securityPhoto:'',//食品检疫证
                        description:'',//商品介绍

                }


                this.$refs.ruleForm0.resetFields()
                this.$refs.ruleForm1.resetFields()
                this.$refs.ruleForm2.resetFields()
                this.$refs.ruleForm3.resetFields()
                this.$refs.ruleForm4.resetFields()
                this.$refs.ruleForm5.resetFields()


            },


        },
        /**
         * 监控数据
         */
        watch:{
            '$route' (to, from) {
                console.log(to,from)

            }
        },
    }
</script>

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
        cursor: pointer;
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
            cursor: pointer;
        }
        .cancel{
            width: 80px;
            margin-left: 20px;
            background: #F8F8F8;
            border: 1px solid #EAEDF1;
            border-radius: 2px;
            color: #2B3642;
            cursor: pointer;
        }
        .online{
            width:134px;
            margin-left: 20px;
            background: #409EFF;
            border-radius: 2px;
            color: #FFFFFF;
            cursor: pointer;
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
            cursor: pointer;
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
            cursor: pointer;
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
    .excel-total-des{
        font-size: 14px;
        color: #F5A623;
        line-height: 30px;
        margin-top: 34px;
        margin-bottom: 20px;
    }
    .excel-warning-icon{
        width: 20px;
        height: auto;
        position: relative;
        top: 5px;
        margin-right: 10px;
    }
    .edit-button{
        font-size: 14px;
        color: #409EFF;
        line-height: 24px;
        display: inline-block;
        cursor: pointer;
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
    .import-status-success{
        font-size: 14px;
        color: #8BC34A;
        line-height: 30px;
    }
    .import-status-error{
        font-size: 14px;
        color: #FF4432;
        line-height: 30px;
    }
    .status-1{
        color: #F5A623;
    }
    .status-2{
        color: #FF4432;
    }
    .status-3{
        color: #515E65;
        opacity: 0.27;
    }
    .status-4{
        color: #8BC34A;
    }

</style>