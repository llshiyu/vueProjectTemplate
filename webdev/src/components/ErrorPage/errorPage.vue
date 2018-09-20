<!--错误页-->
<template>
    <div class="diaBox" v-show=isDiaBox @click="refresh">
	    <div class="page_mark"></div>
	    <div class="page_contain">
	    	<img src="./img/warning2x.png" />
	        <div class="page_title" v-html="warningText"></div>
	    </div>
	</div>
</template>
<script>
    const warningTexts=[
        '网络不稳定，请稍后重试',
        '此刻系统繁忙，请稍后重试',
        '当前实名认证授权已过期,<br>本应用将在5秒后关闭'
    ];
    export default {
        el: '.error-page',
        data() {
          return {
            isDiaBox:false,
            config:{
              icon:'',
              msg:''
            },
            callback:Function,
            warningText:''
          }
        },
        methods:{
            /**
             *
             * @param callbackFn
             * @param type 文本显示类型
             */
            show: function(option){
                this.isDiaBox = true;
                let intt=parseInt(option && option.type || 0);
                this.warningText=warningTexts[intt];
            },
			/**
			 *
			 * @param callbackFn
			 * @param type
			 */
			showDetail: function(param){
				if(param){
					if(param.callback){
						this.callback = param.callback;
					}
					if(param.msg){
						this.warningText=param.msg;
					}
					else {
						let intt=parseInt(param.type)||0;
						this.warningText=warningTexts[intt];
					}
					this.isDiaBox = true;
				}
			},
            refresh: function(callbackFn){
                this.callback = callbackFn;
            	if(this.callback){
               		this.callback();
               		this.isDiaBox = false;
            	}
            },
            close:function(){
            	this.isDiaBox = false;
            }
        }

    };
</script>
<style scoped>
.page_mark{height: 100%;width: 100%;position: fixed;left: 0;top: 0;background: #fff;z-index: 1000;opacity: 1;}
.page_contain{
    min-height: 105px;
    width: 270px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    top: 25%;
    left:50%;
    z-index: 1001;
    text-align: center;
    margin-top: -52.5px;
    margin-left: -135px;
    display: inline-block;
}
.page_contain img{
	height: 70px;
	width:70px;
	margin-bottom:40px
}
.page_contain .page_title{font-size: 16px;
	color: #4A4A4A;
	letter-spacing: 0;
	line-height: 22px;}


</style>
