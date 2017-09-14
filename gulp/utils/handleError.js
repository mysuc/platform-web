/*
 * 自定义错误处理
 * 错误输出
 * 解决报错 gulp task 中断问题
 */
var notify = require("gulp-notify"); // 用于报错时的提醒

module.exports = function(errObj, cb) {
    // 错误通知
    notify.onError(errObj.toString().replace(': ',':\n'))
        .apply(this, arguments);

    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') {
        this.emit('end');
    }
};