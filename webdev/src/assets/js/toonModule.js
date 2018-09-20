var toonModule = (function(){
    return {
        axse: function (data, successfn, errorfn) {
            data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
            //var _port  = (location.href.indexOf("https://") > -1 ) ? 6781 : 6780 ;
            $.ajax({
                type: "post",
                data: data,
                //url: "//127.0.0.1:"+_port+"/getResult",
                url: "https://127.0.0.1:6781/getResult",
                dataType: "json",
                beforeSend:function(){
                },
                success: function (reg) {
                    successfn(reg);
                },
                error: function (e) {
                    errorfn(e);
                }
            });
        },
        /**
         * 关闭当前窗口
         */
        closeWindow: function(){
            var params={
                "functionType":1
            };
            window.location.href = "toon://mwap/window?params="+ JSON.stringify(params);
        }
    }
})();
export default toonModule;

function axse(data, successfn, errorfn) {
  data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
  var _port  = (location.href.indexOf("https://") > -1 ) ? 6781 : 6780 ;
  $.ajax({
    type: "post",
    data: data,
    url: "//127.0.0.1:"+_port+"/getResult",
    dataType: "json",
    beforeSend:function(){
    },
    success: function (reg) {
      successfn(reg);
    },
    error: function (e) {
      errorfn(e);
    }
  });
}

/**
 * 二维码扫码
 */
export function qrcodeScan (callback , errorHandler ) {
  let flagTimeRandom = new Date().getTime()+"";
  let params = {
    "flagId":flagTimeRandom,
    // "handleResult ":0
  };
  window.location.href = "toon://qrcode/scan?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback){callback(msg)}
  },function(){
    if(errorHandler){errorHandler()}
  } );
}

