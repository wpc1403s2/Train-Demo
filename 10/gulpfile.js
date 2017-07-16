'use strict';
var gulp = require('gulp');
var htmlmin=require('gulp-htmlmin');
var csso=require('gulp-csso');
var imagemin=require('gulp-imagemin');
var uglify=require('gulp-uglify');
var concatCss=require('gulp-concat-css')
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');   
var gulpSequence = require('gulp-sequence')

// 注册一个任务
gulp.task('css',function(){
    gulp.src('src/css/*.css')
    .pipe(concatCss('baidu.all.css'))
    .pipe(csso())
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe( rev.manifest() )
    .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('img',function(){
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});
gulp.task('js',function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe( rev.manifest() )
    .pipe( gulp.dest( 'rev/js' ) );
});
gulp.task('rev',function(){
    return gulp.src(['rev/*/*.json','src/*.html'])
    .pipe(revCollector({
        replaceReved: true
    }))
    .pipe(gulp.dest('transfer'));
});
gulp.task('html',['rev'],function(){
    gulp.src('transfer/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))

});
gulp.task('sequence', gulpSequence(['css','img','js','rev'],'html'));
// gulp.task('default',['css','img','js','rev','html'])