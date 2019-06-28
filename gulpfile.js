const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();

//
//	Compila SASS e gera arquivo vomprimido
//
function compilaSass() {
	return gulp
		// Caminho do SASS
		.src('css/scss/*.scss')
		// Seta para comprimir o resultado css
		.pipe(sass({outputStyle: 'compressed'}))
		// Seta para o resultado css ser compativel com versões anteriores
		.pipe(autoprefixer({overrideBrowserslist: ['last 5 versions'],cascade: false}))
		// Caminho do css
		.pipe(gulp.dest('css/'))
		// Atualiza o Browser Sync
		.pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);


//
//	Verifica mudanças no html e cria servidor atualizado automaticamente
//
function browser() {
	browserSync.init({ server: {baseDir: "./"} });
}
gulp.task('browser-sync', browser);


//
//	Monitora mudanças nos arquivos
//
function watch() {
	gulp.watch('css/scss/*.scss', compilaSass);
}
gulp.task('watch', watch);


gulp.task('default', gulp.parallel('watch', 'browser-sync'));
//
//	No Linux pode haver erro de ENOPS
//	Usar o seguinte comanto:
//	'echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p'
//