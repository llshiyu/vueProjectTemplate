<template>
    <div class="file-process" v-show="isShowFileProcess">
        <div class="file-content-box">
            <div class="file-content-name">{{fileProName}}</div>
            <div class="file-upload-p">
                <div class="file-real-in" :style="{  'width':fileWidth+'%' }"></div>
            </div>
            <div class="file-content-ing">
                <div class="file-left">上传中</div>
                <div class="file-right">{{fileWidth}}%</div>
            </div>
        </div>

    </div>
</template>

<script>


    export default {
        name: 'fileProcess',
        data() {
            return {
                fileWidthArray:[0,20,40,60,80,100],
                fileWidth:0,
            }
        },
        model: {
            prop: 'value',
        },
        props: {
            isShowFileProcess: {
                type: Boolean,
                default: false
            },
            fileProName:{
                type: String,
                default: ''
            }
        },
        watch: {
            isShowFileProcess(val) {

                if(val){
                    this.isShowFileProcess=true
                }else{
                    this.fileWidth = this.fileWidthArray[5]
                    this.isShowFileProcess=false
                }
            }
        },
        mounted() {
            for(let i=0;i<5;i++){
                this.fileWidth = this.fileWidthArray[i]
            }
          /*  for (var i = 0; i < 5; i++) {
                (function(j) { // j = i
                    setTimeout(function() {
                        return function(){
                            debugger
                            this.fileWidth = this.fileWidthArray[j]
//                            console.log(new Date, j);
                        }
                    }, 1000);
                })(i);
            }*/
           /* for(let i=0;i<5;i++){
                (function() { // j = i

                    setTimeout(function() {
                        return function(){

                        }
                    }.bind(this), 3000);
                    })(i);
            }*/



        },
        methods: {

        }
    }
</script>

<style lang="less">
   .file-process{
       position: fixed;
       top:0;
       right:0;
       bottom: 0;
       left:0;
       width:100%;
       height:100%;
       z-index: 99999999999999;
   }
    .file-process{
        .file-content-box{
            position: absolute;
            width:350px;
            height: 150px;
            background-color: #fff;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            padding: 50px 30px 30px 30px;
            border: 1px solid #F1F5F9;
            box-shadow: 0 10px 20px 0 rgba(116,136,162,0.16);
            border-radius: 2px;
        }
        .file-upload-p{
            margin-top: 10px;
            width:290px;
            height:6px;
            background: #F0F0F0;
            border-radius: 100px;
            position: relative;
        }
        .file-content-name{
            font-size: 16px;
            color: #0A1C3F;
            letter-spacing: 0;
            text-align: left;
            line-height: 16px;
            font-weight: bold;
        }
        .file-content-ing{
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 12px;
            overflow: hidden;
            margin-top: 8px;
        }
        .file-left{
            float: left;
        }
        .file-right{
            float: right;
        }
        .file-real-in{
            background: #409EFF;
            border-radius: 10px 0 0 10px;
            position: absolute;
            height: 8px;
        }
    }

</style>