
/* Compilação SASS */

const sass = require('gulp-sass')(require('sass'));
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init()) /* inicia o mapeamento em caso de erro */
        .pipe(sass({
            outputStyle: 'compressed' /* comprime o arquivo */
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

/* Comprime imagens */

const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

/* Comprime códigos javascript */

const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate()) /* deixa o codigo ilegivel */
        .pipe(gulp.dest('./build/scripts'));
}

/* Faz com que o gulp fique olhando para qualquer alteração nos arquivos passados */
exports.default = function() {
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false},gulp.series(compilaSass));
    gulp.watch('./source/images/*',{ignoreInitial: false},gulp.series(comprimeImagens));
    gulp.watch('./source/scripts/*.js',{ignoreInitial: false},gulp.series(comprimeJavaScript));

}