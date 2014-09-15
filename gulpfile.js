var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pkg = require('./package.json'),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('reload', function() {
    return gulp.src('**/*.html')
            .pipe(connect.reload());
});

gulp.task('watch', ['connect'], function() {
    gulp.watch('PSDGuides.js', ['reload']);
    gulp.watch('**/*.html', ['reload']);
});

gulp.task('dist', function() {
    return gulp.src(['PSDGuides.js'])
        .pipe(rename(function(path) {
            path.basename += '.min';
        }))
        .pipe(uglify())
        .pipe(header(banner, {pkg : pkg}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['watch']);

