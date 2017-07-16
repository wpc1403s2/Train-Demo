/**
 * Created by wpc on 2017/7/3.
 */
var gulp = require('gulp'),
    uglify=require('gulp-uglify');
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    compass = require('gulp-compass');

gulp.task('default', function() {
    return runSequence(['clean'], ['build'], ['serve', 'watch']);
});

gulp.task('clean', function(callback) {
    return del('./dist/', callback);
});

gulp.task('build', function(callback) {
    return runSequence(['compass', 'html','img','js'], callback);
});

gulp.task('compass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(compass({
            config_file: 'src/config.rb',
            css: 'src/stylesheets',
            sass: 'src/sass'
        }))
        .on('error',function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'));
})
gulp.task('img',function () {
    return gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./dist/images/'));

})
gulp.task('js',function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
})
gulp.task('serve', function() {
    browserSync.init({
        server: './dist',
        port: 8888
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('watch', function() {
    return gulp.watch([
        './src/**/*.html',
        './src/**/*.scss',
        './src/**/*.js'
    ], function() {
        return runSequence(['build'], ['reload']);
    })
});