var gulp = require('gulp'),
    del = require('del'),                       // 删除目录或文件
    merge = require('merge-stream'),            // 合并流
    spritesmith = require('gulp.spritesmith'),  // 雪碧图
    plumber = require('gulp-plumber'),              // 去掉默认的报错逻辑
    handleError = require('../utils/handleError'),  // 自定义错误处理逻辑
    config = require('../config').sprites;      // 配置文件

// 生成雪碧图
gulp.task('sprites', function () {
    var spriteData = gulp.src(config.src)
        .pipe(plumber(handleError)) // 错误保持启动，彻底解决 gulp 因报错而中断的问题
        // 自动合并雪碧图
        .pipe(spritesmith({
            imgName: config.imgName, // 合并后图片名称
            cssName: config.cssName, // 合并后 css 样式名称
            padding: 5,  // 合并时两个图片的间距
            algorithm: 'binary-tree', // 二叉树排列
            cssTemplate: function (data) {
                var arr = [];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+":before {"+
                        "\tdisplay: block;\n"+
                        "\tcontent: '';\n"+
                        "\twidth: "+sprite.px.width+";\n"+
                        "\theight: "+sprite.px.height+";\n"+
                        "\tbackground: url('../images/"+sprite.escaped_image+"') "+sprite.px.offset_x+" "+sprite.px.offset_y+" no-repeat;\n"+
                        "}\n");
                });
                return arr.join("");
            }
        }));
    // 处理合并后的雪碧图
    var iconStream = spriteData.img
        // .pipe(buffer())// 将资源包裹成流的样式
        .pipe(gulp.dest(config.imgDest));

    // 样式文件输出
    var cssStream = spriteData.css
        .pipe(gulp.dest(config.cssDest));

    // 两个流合并输出 ( 默认一个 task 只能输出一个)
    return merge(iconStream, cssStream);
});


// 清理雪碧图
gulp.task('sprites:clean', function() {
    return del([
        config.imgDest + '/' + config.imgName,
        config.cssDest + '/' + config.cssName
    ], {force:true});
});