const fs = require('fs-extra');
const path = require('path');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpInclude = require('gulp-include');
const gulpIf = require('gulp-if');
const autoprefixer = require('autoprefixer');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpReplace = require('gulp-replace');
const image2base64 = require('./image2base64/index.js');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const babel = require('gulp-babel');
const del = require('del');

// 清除任务
function task_clean() {
    return del(['dist', 'cache']);
}
// html任务
function task_html() {
    return gulp
        .src(`./src/index.html`, { allowEmpty: true })
        .pipe(image2base64({ srcAttr: 'crs', attribute: 'src' }))
        .pipe(gulp.dest('./cache'));
}
// css任务
function task_css() {
    return gulp
        .src(`./src/index.scss`, { allowEmpty: true })
        .pipe(gulpSass({ outputStyle: 'compressed' }))
        .pipe(gulpPostcss([autoprefixer({})]))
        .pipe(gulp.dest('./cache'));
}

// js任务
function task_js() {
    return (
        gulp
            //
            .src(`./src/index.js`, { allowEmpty: true })
            .pipe(
                gulpInclude({
                    extensions: 'js',
                    hardFail: true,
                    separateInputs: true,
                    includePaths: ['./src/js']
                })
            )
            .pipe(
                babel({
                    presets: ['@babel/env']
                })
            )
            // .pipe(
            //     gulpIf(
            //         process.env.NODE_ENV === 'production',
            //         javascriptObfuscator({
            //             compact: true,
            //             controlFlowFlattening: true,
            //             controlFlowFlatteningThreshold: 0.75,
            //             deadCodeInjection: true,
            //             deadCodeInjectionThreshold: 0.4,
            //             debugProtection: false,
            //             debugProtectionInterval: 0,
            //             disableConsoleOutput: true,
            //             identifierNamesGenerator: 'hexadecimal',
            //             log: false,
            //             numbersToExpressions: true,
            //             renameGlobals: false,
            //             selfDefending: true,
            //             simplify: true,
            //             splitStrings: true,
            //             splitStringsChunkLength: 10,
            //             stringArray: true,
            //             stringArrayCallsTransform: true,
            //             stringArrayCallsTransformThreshold: 0.75,
            //             stringArrayEncoding: ['base64'],
            //             stringArrayIndexShift: true,
            //             stringArrayRotate: true,
            //             stringArrayShuffle: true,
            //             stringArrayWrappersCount: 2,
            //             stringArrayWrappersChainedCalls: true,
            //             stringArrayWrappersParametersMaxCount: 4,
            //             stringArrayWrappersType: 'function',
            //             stringArrayThreshold: 0.75,
            //             transformObjectKeys: true,
            //             unicodeEscapeSequence: false
            //         })
            //     )
            // )
            .pipe(gulp.dest('./cache'))
    );
}

// 用户脚本任务
function task_userscript() {
    return gulp
        .src(`./src/user.script.js`, { allowEmpty: true })
        .pipe(gulpReplace('/*index.html*/', fs.readFileSync('./cache/index.html')))
        .pipe(gulpReplace('/*index.css*/', fs.readFileSync('./cache/index.css')))
        .pipe(gulpReplace('/*vue.js*/', fs.readFileSync('./src/js/vue.min.js')))
        .pipe(gulpReplace('/*jquery.js*/', fs.readFileSync('./src/js/jquery.slim.min.js')))
        .pipe(gulpReplace('/*dayjs.js*/', fs.readFileSync('./src/js/dayjs.min.js')))
        .pipe(gulpReplace('/*index.js*/', fs.readFileSync('./cache/index.js')))
        .pipe(gulp.dest('./dist'));
}

function task_build() {
    return gulp.series(task_clean, task_html, task_css, task_js, task_userscript);
}
if (process.env.NODE_ENV === 'development') {
    gulp.watch(['src/**/*'], task_build());
}

exports.default = task_build();
