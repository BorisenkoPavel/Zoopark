var syntax        = 'sass', // Syntax: sass or scss;
    gulpversion   = '4'; // Gulp version: 3 or 4

var gulp                    = require('gulp'),
    sass                    = require('gulp-sass'),
    browserSync             = require('browser-sync'),
    concat                  = require('gulp-concat'),
    terser                  = require('gulp-terser'),
    cleancss                = require('gulp-clean-css'),
    rename                  = require('gulp-rename'),
    autoprefixer            = require('gulp-autoprefixer'),
    notify                  = require('gulp-notify'),
    rsync                   = require('gulp-rsync'),
    plumber                 = require('gulp-plumber'),
    pug                     = require('gulp-pug')
    svgSprite               = require('gulp-svg-sprite'),
    svgmin                  = require('gulp-svgmin'),
    cheerio                 = require('gulp-cheerio'),
    replace                 = require('gulp-replace'),
    // imagemin                = require('gulp-imagemin'),
    // imageminJpegRecompress  = require('imagemin-jpeg-recompress'),
    // pngquant                = require('imagemin-pngquant'),
    cache                   = require('gulp-cache'),
    imgPATH                 = {
                              "input": ["dev/img/**/*.{png,jpg,gif,svg}",
                                  '!dev/img/svg/*'],
                              "ouput": "app/img/"
                              };
    svgPath                 = {
                                "input": "dev/img/svg/*.svg",
                                "output": "app/img/svg/"
															};
// const del                   = require('del');

// gulp.task('clean', function(){
//   return del('app/**', {force:true});
// });

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
});

gulp.task('styles', function() {
  return gulp.src('dev/scss/**/*.'+syntax+'')
  .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
  .pipe(rename({ suffix: '.min', prefix : '' }))
  .pipe(autoprefixer(['last 15 versions']))
  .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
  return gulp.src([
    // 'node_modules/bootstrap/js/dist/.js',
    'node_modules/swiper/dist/js/swiper.min.js',
    'node_modules/aos/dist/aos.js',
    // 'node_modules/svg4everybody/dist/svg4everybody.min.js',
    'dev/js/common.js', // Always at the end
    ])
  .pipe(concat('scripts.min.js'))
  .pipe(terser()) // Mifify js (opt.)
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
  return gulp.src('app/**')
  .pipe(rsync({
    root: 'app/',
    hostname: 'username@yousite.com',
    destination: 'yousite/public_html/',
    // include: ['*.htaccess'], // Includes files to deploy
    exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
    recursive: true,
    archive: true,
    silent: false,
    compress: true
  }))
});

gulp.task('pug', function() {
  return gulp.src(['dev/pug/*.pug', 'dev/pug/pages/*.pug'])
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('fonts', () => {
  return gulp.src('dev/fonts/**/*.*')
    .pipe(gulp.dest('app/fonts/'));
});

gulp.task('svg', () => {
  return gulp.src(svgPath.input)
      .pipe(svgmin({
          js2svg: {
              pretty: true
          }
      }))
      .pipe(cheerio({
          run: function ($) {
              $('[fill]').removeAttr('fill');
              $('[stroke]').removeAttr('stroke');
              $('[style]').removeAttr('style');
          },
          parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
          mode: {
              symbol: {
                  sprite: "sprite.svg"
              }
          }
      }))
      .pipe(gulp.dest(svgPath.output));
});

gulp.task('img:dev', () => {
  return gulp.src(imgPATH.input).pipe(gulp.dest(imgPATH.ouput));
});

// gulp.task('img:build', () => {
//   return gulp.src(imgPATH.input)
//       .pipe(cache(imagemin([
//           imagemin.gifsicle({interlaced: true}),
//           imagemin.jpegtran({progressive: true}),
//           imageminJpegRecompress({
//               loops: 5,
//               min: 70,
//               max: 75,
//               quality: 'medium'
//           }),
//           imagemin.svgo(),
//           // imagemin.optipng({optimizationLevel: 3}),
//           // pngquant({quality: '65-70', speed: 5})
//       ], {
//           verbose: true
//       })))
//       .pipe(gulp.dest(imgPATH.ouput));
// });

// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel('styles', 'scripts', 'fonts', 'pug','svg')
// ));
// , 'img:build'
if (gulpversion == 3) {
  gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
    gulp.watch('app/scss/**/*.'+syntax+'', ['styles']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
    gulp.watch('app/*.html', ['code'])
  });
  gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
  gulp.task('watch', function() {
    gulp.watch(['dev/scss/**/*.'+syntax+'', 'dev/scss/**/*.scss'], gulp.parallel('styles'));
    gulp.watch(['libs/**/*.js', 'dev/js/common.js'], gulp.parallel('scripts'));
    gulp.watch('app/*.html', gulp.parallel('code'))
    gulp.watch('dev/pug/**/*.pug', gulp.parallel('pug'))
    gulp.watch('dev/fonts/**/*.*', gulp.parallel('fonts'))
    gulp.watch(['dev/img/general/**/*.{png,jpg,gif}',
    'dev/img/content/**/*.{png,jpg,gif}'], gulp.parallel('img:dev'));
    gulp.watch('dev/img/svg/*.svg', gulp.parallel('svg'));
  });
  gulp.task('default', gulp.parallel('styles', 'fonts', 'scripts', 'pug', 'watch','svg', 'img:dev', 'browser-sync' ));
}
