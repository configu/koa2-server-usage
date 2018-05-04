const Validatorjs = require('validatorjs');
const { ValidatedError } = require('../common/error');
Validatorjs.useLang('zh');

// register rules
// Validatorjs.register('telephone', function (value, requirement, attribute) { // requirement parameter defaults to null
//   return value.match(/^\d{3}-\d{3}-\d{4}$/);
// }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

// Object 对象
Validatorjs.register('object', (value) => {
  const type = Object.prototype.toString.call(value);
  return type === '[object Object]' || type === '[object Array]';
}, ':attribute的格式有误.');

/**
 * 继承 validatorjs 的 class，拓展一些方法

 * TODO JSON 校验。json-validator
 */
class myValidator extends Validatorjs {
  constructor(params) {
    const { data, rules, customName, customErrorMessages } = params;

    super(data, rules, customErrorMessages);
    // 默认改 attributes 名
    this.setAttributeNames(customName);
  }
  // 把错误信息统一转成字符串
  errmsgHandle() {
    const error = this.errors.all();
    return Object.keys(error).reduce((result, cur) => {
      return result + error[cur].join(';') + '\n';
    }, '');
  }

  // 现架构的默认校验方法，出错，直接 throw error
  myCheck() {
    if (this.fails()) {
      throw new ValidatedError(this.errmsgHandle());
    }
  }
}


module.exports = myValidator;