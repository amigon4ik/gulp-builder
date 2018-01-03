var gulp    = require('gulp'),
    config  = require('./gulp/config.js'),
    helpers = require('./gulp/helpers.js'),
    compile = require('./gulp/compile.js'),
    path    = require('path');

function clean() {
    helpers.cleanDir(config.output.dist);
}

function compileSASS() {

    if (config.build.app.hasOwnProperty('sass')) {
        var src = config.build.app.sass;
        if (src.length) {
            var sassConfig = compile.sassConfig();
            sassConfig.outputStyle  = config.output.styles.outputStyle;
            sassConfig.browsers     = config.output.styles.browsers;
            sassConfig.src          = src;
            sassConfig.dir          = config.output.dist;
            sassConfig.output       = config.output.styles.app;
            compile.sass(sassConfig);
        }
    }

}

function compileScripts() {

    if (config.build.app.hasOwnProperty('scripts')) {
        var src = config.build.app.scripts;
        if (src.length) {
            var scriptsConfig = compile.scriptsConfig();
            scriptsConfig.src      = src;
            scriptsConfig.dir      = config.output.dist;
            scriptsConfig.output   = config.output.scripts.app;
            compile.scripts(scriptsConfig);
        }
    }

}

function compileVendorStyles() {

    var src = [], key, vendor, styles;

    for (key in config.build.vendors) {
        vendor = config.build.vendors[key];
        if (vendor.hasOwnProperty('styles')) {
            styles = vendor.styles;
            if (styles.length) {
                src = src.concat(styles);
            }
        }
    }

    if (src.length) {
        var stylesConfig = compile.stylesConfig();
        stylesConfig.src      = src;
        stylesConfig.dir      = config.output.dist;
        stylesConfig.output   = config.output.styles.vendors;
        compile.styles(stylesConfig);
    }

}

function compileVendorScripts() {

    var src = [], key, vendor, scripts;

    for (key in config.build.vendors) {
        vendor = config.build.vendors[key];
        if (vendor.hasOwnProperty('scripts')) {
            scripts = vendor.scripts;
            if (scripts.length) {
                src = src.concat(scripts);
            }
        }
    }

    if (src.length) {
        var scriptsConfig = compile.scriptsConfig();
        scriptsConfig.src      = src;
        scriptsConfig.dir      = config.output.dist;
        scriptsConfig.output   = config.output.scripts.vendors;
        compile.scripts(scriptsConfig);
    }

}

function compileFonts() {

    var src = [], key, vendor, fonts;

    for (key in config.build.vendors) {
        vendor = config.build.vendors[key];
        if (vendor.hasOwnProperty('fonts')) {
            fonts = vendor.fonts;
            if (fonts.length) {
                src = src.concat(fonts);
            }
        }
    }

    if (config.build.app.hasOwnProperty('fonts')) {
        fonts = src.concat(config.build.app.fonts);
        if (fonts.length) {
            src = src.concat(fonts);
        }
    }

    if (src.length) {
        var fontsConfig = compile.fontsConfig();
        fontsConfig.src = src;
        fontsConfig.dir = config.output.dist;
        compile.fonts(fontsConfig);
    }
}

gulp.task('default', function() {
    clean();
    compileSASS();
    compileScripts();
    compileVendorStyles();
    compileVendorScripts();
    compileFonts();
});