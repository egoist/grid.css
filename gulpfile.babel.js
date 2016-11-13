import gulp from 'gulp'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'

gulp.task('css', () => {
  gulp.src('./src/grid.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-discard-unused')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
})

gulp.task('compress', () => {
  gulp.src('./src/grid.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('cssnano')]))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('./src/*.css', ['css'])
})

gulp.task('build', ['css', 'compress'])

gulp.task('default', ['build', 'watch'])
