import {getQueryStringHr} from './assets/js/util';
export default {
	requestUrl:{
		code:function(){
			let code =  getQueryStringHr("toon_code") || getQueryStringHr("code") || sessionStorage.getItem("toon_code") ;
			sessionStorage.setItem("toon_code",code) ;
				return decodeURIComponent( code  )
		}
	},
	//请求返回状态码
	respCode:{
		SUCCESS:'0',
		FAIL:'201',
		ERROR:'202',
		SESSION_TIMEOUT:'MAIL5001',   //用户会话信息已过期
		TOONCODE_TIMEOUT:'MAIL5002' ,   //toonCode过期
		TOKEN_TIMEOUT:'MAIL5000'    //会话过期
	}

}
