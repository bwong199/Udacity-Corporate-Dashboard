// include gulp
var gulp = require('gulp'); 
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
// include plug-ins
var rename = require('gulp-rename'); 
var jshint = require('gulp-jshint');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var ejs = require("gulp-ejs");

gulp.task('default', function () {
	return gulp.src('app/tmp', {read: false})
		.pipe(clean());
});
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.htm',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

gulp.src("./src/*.ejs")
  .pipe(ejs({
    msg: "Hello Gulp!"
  }))
  .pipe(gulp.dest("./build"));

// gulp.task('scripts', function(){
// 	console.log('Starting scripts task');
// 	return gulp.src('./src/scripts/*.js')
// 		.pipe(uglify()).on('error', function(e){
//             console.log(e);
//          })
// 		.pipe(gulp.dest('./build/scripts/'))
// });

// gulp.task('scripts', function() {
//   return gulp.src(['./src/scripts/*.js'])
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./build/scripts/'));
// });

// gulp.task('scripts', function(){
//     return gulp.src('./src/scripts/*.js')
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/scripts/'));
// });


gulp.task('scripts', function() {  
    return gulp.src('./src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/scripts/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});


gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  // watch for HTML changes
  gulp.watch('./src/*.htm', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  gulp.task('scripts', function() {
  return gulp.src(['./src/scripts/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build/scripts/'));
});

  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });
});

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});