// 依赖引入文件夹下的文件
var requireDir = require('require-dir');

// 依赖归引入 gulp/tasks 下的文件, 递归子目录
requireDir('./gulp/tasks', {recurse:true});