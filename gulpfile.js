const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const webpack = require('webpack-stream');

gulp.task('default', ['clean', 'es', 'lib', 'dist'], () => {
    // console.log('Package is ok');
});

gulp.task('clean', () => {
    rimraf.sync('lib');
    rimraf.sync('es');
    rimraf.sync('dist');
})

gulp.task('es', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: [["@babel/preset-env", { targets: { esmodules: true }, useBuiltIns: "entry", corejs: 3 }]]
        }))
        .pipe(gulp.dest('es'));
});

gulp.task('lib', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: [["@babel/preset-env", { targets: { esmodules: false }, useBuiltIns: "entry", corejs: { version: 3, proposals: true } }]]
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('dist', () => {

});