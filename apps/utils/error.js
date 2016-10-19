/**
 * Created by cr on 2016/8/19.
 */
const util = require('util');

//抽象的错误类基类
var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error';
}
util.inherits(AbstractError, Error)
AbstractError.prototype.name = 'Abstract Error';

//json异常类
var JsonError = function (code,msg) {
    this.code = code;
    this.msg = msg;
    JsonError.super_.call(this, msg, this.constructor);
}
util.inherits(JsonError, AbstractError)
JsonError.prototype.name = 'JsonError Error';

//page异常类
var PageError = function (code,msg) {
    this.code = code;
    this.msg = msg;
    PageError.super_.call(this, msg, this.constructor);
}
util.inherits(PageError, AbstractError)
PageError.prototype.name = 'PageError Error';

//
module.exports = {
    JsonError: JsonError,
    PageError:PageError
}