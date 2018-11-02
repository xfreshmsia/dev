/** --------------------------------- Modify here ------------------------------ */
let appFolder = 'app'; // Put your everything (html, css, js, etc..) in 'app' folder
let distFolder = 'dist'; // distribution folder
/** ---------------------------------------------------------------------------- */


let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let runSequence = require('run-sequence');

let useref = require('gulp-useref');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');
let gulpIf = require('gulp-if');
let uglify = require('gulp-uglify-es').default;
let cssnano = require('gulp-cssnano');
let imagemin = require('gulp-imagemin');
let flatten = require('gulp-flatten');
let cache = require('gulp-cache');
let del = require('del');
let htmlmin = require('gulp-htmlmin');


// ------------------------------------- gulp - Serve app ---------------------------- //
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: appFolder,
            // routes: {
            //     "/node_modules": "node_modules"
            // }
        }
    })
});
gulp.task('sass', function() {
    return gulp.src(`${appFolder}/scss/**/*.scss`)
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest(`${appFolder}/css`))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(`${appFolder}/**/**/*.html`, browserSync.reload);
    gulp.watch(`${appFolder}/**/**/*.scss`, ['sass']);
    gulp.watch(`${appFolder}/**/**/*.css`, browserSync.reload);
    gulp.watch(`${appFolder}/**/**/*.js`, browserSync.reload);
});
gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

// ----------------------------------- gulp build ---------------------------------- //
gulp.task('useref', function() {
    return gulp.src(`${appFolder}/**/**/*.html`)
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.js', rev()))
        .pipe(gulpIf('*.css', rev()))
        .pipe(revReplace())
        .pipe(gulpIf('*.html', htmlmin({
            collapseWhitespace: true,
            // removeComments: true
        })))
        .pipe(gulp.dest(distFolder))
});
gulp.task('images', function() {
    return gulp.src(`${appFolder}/**/**/*.+(png|jpg|gif|svg)`)
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng(),
            imagemin.svgo([{
                removeViewBox: false
            }, {
                minifyStyles: false
            }])
        ], {
            verbose: true
        })))
        .pipe(gulp.dest(`${distFolder}`))
});
gulp.task('fonts', function() {
    return gulp.src(`${appFolder}/**/**/*.+(ttf|woff|woff2|eot|svg)`)
        .pipe(flatten())
        .pipe(gulp.dest(`${distFolder}/fonts`))
});
gulp.task('clean:dist', function() {
    return del.sync(distFolder);
});
// gulp serve - Serve distribution
gulp.task('serve-dist', function() {
    browserSync.init({
        server: {
            baseDir: distFolder
        },
    })
})

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['useref', 'images', 'fonts'], 'serve-dist',
        callback
    )
});