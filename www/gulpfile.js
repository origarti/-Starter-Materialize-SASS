// Install all gulp plugins at once
// npm install gulp --save-dev & npm install gulp-sass --save-dev & npm install gulp-autoprefixer --save-dev & npm install gulp-minify-css --save-dev & npm install gulp-uglify --save-dev & npm install gulp-rename --save-dev & npm install gulp-concat --save-dev & npm install gulp-notify --save-dev & npm install gulp-plumber --save-dev & npm install gulp-imagemin --save-dev & npm install gulp-uncss --save-dev

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concate = require('gulp-concat');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');


/*
==========================================================
                    SASS
            ______________________
SASS compil -> Autoprefixr -> Uncss (remove non used CSS rules in *.html) ->
==========================================================
*/

gulp.task('materializeCSS', function(){
    gulp.src('assets/sass/materialize/materialize.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(rename("materialize.min.css"))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('style', function(){
    gulp.src('assets/sass/style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer())
    /*.pipe(uncss({
        html: ['*.html'],
        ignore: [
            ".fade",".fade.in",".collapse",".collapse.in",".collapsing",".alert-danger",".open",
            /\.open/,
            /\.popover/,
            /\.tooltip/,
            /\.modal/,
            /\.carousel/,
            /\.slide/,
            /\.tabs/,
            /\.tab/,
            /\.tabpanel/,
            /\.afix/,
            /\.glyphicon/
       ]
    }))*/
    .pipe(minifyCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./dist/css'));
});


/*
==========================================================
                  Javascript
                ______________________

==========================================================
*/
gulp.task('customJS', function(){
    gulp.src('assets/js/main.js')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename("custom.min.js"))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('materializeJS', function(){
    gulp.src([
      'assets/js/materialize/global.js',
      'assets/js/materialize/jquery.easing.1.3.js',
      'assets/js/materialize/hammer.min.js',
      'assets/js/materialize/velocity.min.js',
      'assets/js/materialize/animation.js',
      'assets/js/materialize/collapsible.js',
      'assets/js/materialize/dropdown.js',
      'assets/js/materialize/leanModal.js',
      'assets/js/materialize/materialbox.js',
      'assets/js/materialize/parallax.js',
      'assets/js/materialize/tabs.js',
      'assets/js/materialize/tooltip.js',
      'assets/js/materialize/waves.js',
      'assets/js/materialize/toasts.js',
      'assets/js/materialize/sideNav.js',
      'assets/js/materialize/scrollspy.js',
      'assets/js/materialize/forms.js',
      'assets/js/materialize/character_counter.js',
      'assets/js/materialize/slider.js',
      'assets/js/materialize/cards.js',
      'assets/js/materialize/pushpin.js',
      'assets/js/materialize/button.js',
      'assets/js/materialize/transitions.js',
      'assets/js/materialize/scrollFire.js',
      'assets/js/materialize/date_picker/picker.js',
      'assets/js/materialize/date_picker/picker.date.js'
    ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concate("materialize.js"))
    .pipe(uglify())
    .pipe(rename("materialize.min.js"))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('script',['materializeJS', 'customJS'],  function(){
    gulp.src([
        //'dist/js/materialize.min.js',
        'dist/js/custom.min.js'
    ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    //.pipe(concate("main.js"))
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('dist/js/'));
});
/*
==========================================================
              Images
        ______________________

==========================================================
*/
gulp.task('images', function() {
    return gulp.src([
      'assets/pic/*.{gif,jpg,png,svg}',
      'assets/pic/*/*.{gif,jpg,png,svg}'
    ])
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('dist/pic/'));
});
/*
==========================================================
              Watch
         ___________________

    Déclencher une tâche particulière 
    si certains fichiers sont modifiés

==========================================================
*/
gulp.task('watch', function(){
    gulp.watch('assets/js/main.js', ['script']);
    gulp.watch('assets/js/materialize/*.js', ['materializeJS']);
    gulp.watch('assets/sass/*/*.scss', ['style']);
    gulp.watch('assets/sass/style.scss', ['style']);
    gulp.watch('*.html', ['style']);
});


/*
==========================================================
            Tache "Gulp" par Default
==========================================================
*/

gulp.task('default', ['style', 'script', 'images', 'watch'], function(){

});