const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglifyJs = require('gulp-uglify');

const OUTDIR = './dist';

sass.compiler = require('node-sass');

exports.sass = function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            outputStyle: "compressed",
            includePaths: './node_modules'
        }).on('error', sass.logError))
        .pipe(gulp.dest(OUTDIR));
};

exports.html = function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false
        }))
        .pipe(gulp.dest(OUTDIR));
}

exports.js = function() {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [ '@babel/preset-env' ]
        }))
        .pipe(uglifyJs())
        .pipe(gulp.dest(OUTDIR));
}

exports.build = gulp.parallel(exports.sass, exports.html, exports.js)
exports.serve = function(cb) {
    browserSync.init({
        server: {
            baseDir: OUTDIR,
        }
    });

    gulp.watch('./src/**/*.scss', exports.sass);
    gulp.watch('./src/**/*.html', exports.html);
    gulp.watch('./src/**/*.js', exports.js);

    gulp.watch(OUTDIR+'/**/*.*', (done) => {
        browserSync.reload();
        done()
    });

    cb();
}
exports.default = gulp.series(exports.build, exports.serve)