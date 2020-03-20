/*Конфигурация и настройка сборки true-разработка*/
const isDevelopment = true;
const tempFolder = './';

//
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-csso');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

// SVG sprite
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');


const moduleJS = [
    tempFolder + 'js/main.js'
];

const vendorJs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
];


const vendorCss = [
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/normalize.css/normalize.css',
];


//scss
gulp.task('sass', function (done) { // Создаем таск "sass"
    gulp.src(tempFolder + 'css/main.scss') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(tempFolder + 'css/')); // Выгружаем результата в папку app/css

    done();
});

// scripts JS
gulp.task('build:js', function (done) {
    gulp.src(moduleJS)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(tempFolder + 'js/'));
    done();
});

/* -------- Объединение всех подключаемых плагинов в один файл -------- */
gulp.task('vendor:js', function (done) {
    gulp.src(vendorJs)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));

    done();
});


/*css*/
gulp.task('vendor:css', function (done) {
    gulp.src(vendorCss)
        .pipe(concat('vendor.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(tempFolder + 'css/'));
    done();
});
/*-------------------------------END----------------------------------------*/

/*SVG*/
// svg
gulp.task('build:svg', function (done) {
    gulp.src(tempFolder + 'images/icons/*.svg')
        // минифицируем svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // удалить все атрибуты fill, style and stroke в фигурах
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg',
                    example: {
                        dest: '../spriteSvgDemo.html' // демо html
                    }
                }
            }
        }))
        .pipe(gulp.dest(tempFolder + 'images/icons/'));
    done();
});
/*END SVG*/

// Выполнить билд проекта
gulp.task('build',
    gulp.series('sass', 'vendor:js', 'vendor:css', 'build:svg', function (done) {
    done();
}));




