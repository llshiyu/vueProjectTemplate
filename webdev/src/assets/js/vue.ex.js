import Vue from 'vue'
import vueExSource from './vue.ex.source'
/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/**
 * 判断是否为emoji
 * @param substring
 * @returns {boolean}true包含表情，false不包含表情
 */
function isEmojiCharacter(substring) {
    for ( var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
            }
        }
    }
}
//表情
Vue.validator('emoji', {
    message: function (field) {
         return  vueExSource[field] + '不能包含表情符号'
    },
    check: function (val) {
        if (!val) {
            return true;
        }
        return !isEmojiCharacter(val);
    }
});
//邮箱
Vue.validator('email', {
    message: '请填写正确的邮箱地址',
    check: function (val) {
        if (!val) {
            return true;
        }
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }
});

Vue.validator('realName', {
    message: '请填写正确的真实姓名',
    check: function (val) {
        if (!val) {
            return true;
        }
        return /^[\u4e00-\u9fa5\s]{1,10}$/.test(val)
    }
});

Vue.validator('noSpaceName', {
    message: '姓名中不能包含数字、字母、符号 、空格',
    check: function (val) {
        if (!val) {
            return true;
        }
        return !/[\s0-9a-zA-Z\w]/.test(val)
    }
});

/*必填*/
/*Vue.validator('required', {
    message: function (field) {
        debugger;
        return  vueExSource[field] + '不能为空' ;
    },
    check: function(val){
        return val.replace(/(^\s*)|(\s*$)/g,"")!=''
    }//Vue.validator('required')
});*/

/*限定最大长度*/
Vue.validator('maxlength', {
    message: function (field, length) {
        return vueExSource[field] + '长度能超过' + length;
    },
    check: Vue.validator('maxlength')
});
/*限定最大长度*/
Vue.validator('minlength', {
    message: function (field, length) {
        return vueExSource[field] + '长度不能小于' + length;
    },
    check: Vue.validator('minlength')
});

export default{
    isValidate: function (self, af) {
        if (!self.$validate) {
            return false
        }
        self.$validate(true);
        if (af.invalid) {
            var errors = [];
            for (var i in af) {
                if (typeof(af[i]) == "object" && af[i].errors && af[i].errors[0] && af[i].errors[0].message) {
                    errors.push(af[i].errors[0]);
                    //return af[i].errors[0].message
                }
            }
            return errors;
        }
        return true;
    }
}