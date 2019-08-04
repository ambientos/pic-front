const   gulp = require('gulp'),
        autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        browsersync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),

        path = {
            src: 'src',
            dist: 'dist',
            js: 'js',
            scss: 'scss',
            css: 'css'
        },

        files = {
            html: [path.dist, '**', '*.html'].join('/'),
            js: [path.dist, path.js, '**', '*.js'].join('/'),
            css: [path.dist, path.css, '**', '*.css'].join('/'),
            scss: [path.src, path.scss, '**', '*.scss'].join('/')
        }
        

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: path.dist
        },
        port: 3000
    })

    done()
}


// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload()
    done()
}


// CSS task
function cssGenerate() {
    return gulp
        .src( files.scss )
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest( [path.dist, path.css].join('/') ))
        .pipe(browsersync.stream())
}


// Watch files
function watchFiles() {
    gulp.watch( files.scss, cssGenerate )
    gulp.watch(
        [
            files.html,
            files.js
        ],
        browserSyncReload
    )
}


const watch = gulp.parallel(watchFiles, browserSync)

exports.css = cssGenerate

exports.default = gulp.series(cssGenerate, watch)
