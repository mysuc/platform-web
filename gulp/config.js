// var app = path.resolve('../app'),   // 项目源代码目录
//     bin = path.resolve('../bin');   // 输出目录
var src = 'app',   // 项目源代码目录
    bin = 'bin';   // 输出目录

module.exports = {
    src: src,
    bin: bin,
    // 服务
    service: {
        root: [bin, bin+'/views'],
        port: 8080
    },
    // 配置
    config: {
        src: src+ '/config/**/*',
        base: src+ '/config',
        dest: bin + '/config'
    },
    // 视图配置
    views: {
        src: src+ '/views/**/*.html',
        base: src+ '/views',
        dest: bin + '/views'
    },
    // 样式
    styles: {
        app: {
            src: 'app/**/*.{css,scss}'
        },
        vendor: {
            src: 'vendor/**/*.css'
        },
        dest: bin + '/assets/styles'
    },
    scripts: {
        app: {
            src: 'app/**/*.{js,coffee}',
            base: 'app'
        },
        vendor: {
            src: [
                'vendor/jquery.js',
                'vendor/require.js',
            ]
        },
        dest: bin + '/assets/scripts'

    },
    // 图片处理
    images: {
        src: [
            src + '/images/others/**/*'
        ],
        base: src + '/images/others',
        dest: bin + '/assets/images/others'
    },

    // 雪碧图配置
    sprites: {
        src: src + '/images/*.png',
        imgName: 'icons.png', // 合并后图片地址
        cssName: 'icons.scss', // 合并后 css 样式地址
        cssDest: src + '/styles',
        imgDest: bin + '/assets/images'
    }
};