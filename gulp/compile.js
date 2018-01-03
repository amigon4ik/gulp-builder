var gulp    = require('gulp'),
    $       = require('gulp-load-plugins')(),
    helpers = require('./helpers.js'),
    path    = require('path');

module.exports = {
    sassConfig: function() {
        return {
            outputStyle: 'compressed', // nested, compact, expanded, compressed
            browsers: [],
            src: [],
            dir: '',
            output: ''
        };
    },
    sass: function(config) {
        return gulp.src(config.src)
            .pipe($.sass({
                outputStyle: config.outputStyle
            })
                .on('error', $.sass.logError))
            .pipe($.autoprefixer({
                browsers: config.browsers
            }))
            .pipe($.rename(config.output))
            .pipe(gulp.dest(config.dir + '/css'));
    },
    stylesConfig: function () {
        return {
            src: [],
            dir: '',
            output: ''
        };
    },
    styles: function (config) {
        var fontRegex = new RegExp(/\.(otf|eot|svg|ttf|woff|woff2)$/i);
        return gulp.src(config.src)
            .pipe(
                $.rewriteCss({
                    destination: config.dir,
                    adaptPath: function (ctx) {
                        var isCss = ctx.sourceFile.match(/\.[css]+$/i);
                        // process css only
                        if (isCss[0] === '.css') {
                            return path.join('fonts/', helpers.baseName(ctx.targetFile));
                        }
                    }
                })
            )
            .pipe($.concat(config.output))
            .pipe($.cleanCss())
            .pipe(gulp.dest(config.dir + '/css'));
    },
    scriptsConfig: function () {
        return {
            src: [],
            dir: '',
            output: ''
        };
    },
    scripts: function (config) {
        return gulp.src(config.src)
            .pipe($.concat(config.output))
            .pipe($.uglify())
            .pipe(gulp.dest(config.dir + '/js'));
    },
    fontsConfig: function () {
        return {
            src: [],
            dir: ''
        };
    },
    fonts: function (config) {
        return gulp.src(config.src)
            .pipe(gulp.dest(config.dir + '/css/fonts'));
    }
};