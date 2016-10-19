var gulp=require('gulp');
var fileinclude=require('gulp-file-include');//替换@@合并html
var inject=require('gulp-inject-string')// 尝试对html中的变量进行替换
var sequence=require('gulp-sequence'); // 任务的 顺序 还是异步执行

var rename=require('gulp-rename');
var changed=require('gulp-changed');
//var gulpif=require('gulp-if');

//var imagemin=require('gulp-imagemin'); // 图片压缩
//var pngquant=require('imagemin-pngquant');

var eslint=require('gulp-eslint'); // js文件检查

var  copy=require('gulp-file-copy');

var clean=require('gulp-clean');// 清除文件
var minimist=require('minimist'); // 获取参数
var minifyCss = require('gulp-minify-css'); //- 压缩CSS为一行；
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//- 路径替换
var uglify = require('gulp-uglify');//js混淆
var sourcemaps=require("gulp-sourcemaps");//map
var filter = require("gulp-filter");//过滤

var less=require('gulp-less');
// 自动加上 css3 前缀
var LessPluginAutoPrefix = require("less-plugin-autoprefix")

// 自动加上 css 前缀
var  autoprefix = new LessPluginAutoPrefix({browsers: [
	"ie >= 7",
	"ie_mob >= 8",
	"ff >= 26",
	"chrome >= 30",
	"safari >= 6",
	"opera >= 23",
	"ios >= 5",
	"android >= 2.3",
	"bb >= 10",
]})
var source={

}
var config={
	mock:{
		js:'http://localhost:3100/statics/scripts',
		css:'http://localhost:3100/statics/styles',
		img:'http://localhost:3100/statics/images',
		basepath:'http://localhost:3100',
		htmlbasepath:'http://localhost:3100/web/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	dev:{
		js:'http://localhost:3100/statics/scripts',
		css:'http://localhost:3100/statics/styles',
		img:'http://localhost:3100/statics/images',
		basepath:'http://localhost:3100',
		htmlbasepath:'http://localhost:3100/web/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	wire:{
		js:'http://localhost:3100/statics/scripts',
		css:'http://localhost:3100/statics/styles',
		img:'http://localhost:3100/statics/images',
		basepath:'http://localhost:3100',
		htmlbasepath:'http://localhost:3100/web/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	test:{
		js:'https://dev.huangjinqianbao.com/GBankerWebApp/statics/scripts',
		css:'https://dev.huangjinqianbao.com/GBankerWebApp/statics/styles',
		img:'https://dev.huangjinqianbao.com/GBankerWebApp/statics/images',
		basepath:'https://dev.huangjinqianbao.com/GBankerWebApp',
		htmlbasepath:'https://dev.huangjinqianbao.com/GBankerWebApp/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	test2:{
		js:'https://dev.huangjinqianbao.com/GBankerWebApp2/statics/scripts',
		css:'https://dev.huangjinqianbao.com/GBankerWebApp2/statics/styles',
		img:'https://dev.huangjinqianbao.com/GBankerWebApp2/statics/images',
		basepath:'https://dev.huangjinqianbao.com/GBankerWebApp2',
		htmlbasepath:'https://dev.huangjinqianbao.com/GBankerWebApp2/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	test3:{
		js:'https://dev.huangjinqianbao.com/GBankerWebApp3/statics/scripts',
		css:'https://dev.huangjinqianbao.com/GBankerWebApp3/statics/styles',
		img:'https://dev.huangjinqianbao.com/GBankerWebApp3/statics/images',
		basepath:'https://dev.huangjinqianbao.com/GBankerWebApp3',
		htmlbasepath:'https://dev.huangjinqianbao.com/GBankerWebApp3/html',
		shareBasePath:'https://dev.huangjinqianbao.com/GBankerWebWapOld/'
	},
	online:{
		js:'https://static02.huangjinqianbao.com/GBankerWebApp/statics/scripts',
		css:'https://static02.huangjinqianbao.com/GBankerWebApp/statics/styles',
		img:'https://static02.huangjinqianbao.com/GBankerWebApp/statics/images',
		basepath:'https://m.g-banker.com/GBankerWebApp',
		htmlbasepath:'https://m.g-banker.com/GBankerWebApp/html',
		shareBasePath:"https://m.g-banker.com/"
	}
}
var knownOptions = {
	string: 'env',
	default:{ env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

var path={
}
gulp.task("path",function(){
	if(options.env=='test'){
		path = config.test;
	}else if(options.env=='mock'){
		path = config.mock;
	}else if(options.env=='online'){
		path = config.online;
	}else if(options.env=='test2'){
		path = config.test2;
	}else if(options.env=='test3'){
		path = config.test3;
	}else if(options.env=="wire"){
		path = config.wire;
	} else{
		path=config.wire;
	}
	console.log("path=="+path.basepath);
})
/**将less解析为css到styles**/
gulp.task("less",function(){
	return gulp.src(['statics/less/main.less'])
			.pipe(sourcemaps.init())
			.pipe(less(less({
				plugins:[autoprefix]
			})))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('statics/styles/'))
})
 
/* 模板制作  */
gulp.task("lessTemplete",function(){
	return gulp.src(['statics/less/page/templete/*.less']) 
		.pipe(less(less({
			plugins:[autoprefix]
		}))) 
		.pipe(gulp.dest('statics/styles/templete/')) 
}) 

/* 模板less文件 */
gulp.task("lessTpl",function(){
	return gulp.src(['statics/styles/tpl/**/*']) 
		.pipe(gulp.dest('statics/styles/tpl/'))  
		.pipe(gulp.dest('web/statics/styles/tpl/'))     
})

//打包线上代码
gulp.task('css', function() {
	return gulp.src(['statics/styles/**/*.css'])
			.pipe(minifyCss())                                      //- 压缩处理成一行
			.pipe(rev())                                            //- 文件名加MD5后缀
			.pipe(gulp.dest('web/statics/styles'))               //- 输出文件本地
			.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
			.pipe(gulp.dest('rev/css'));                          //- 将 rev-manifest.json 保存到 rev 目录内
});
gulp.task('js', function() {
	return gulp.src(['statics/scripts/**/*.js'])
			.pipe(uglify())
			.pipe(rev())
			.pipe(gulp.dest('web/statics/scripts'))
			.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
			.pipe(gulp.dest('rev/js'));                           //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('devcss', function() {
	gulp.src(['statics/styles/**/*.css','!statics/styles/tpl/**/*'])                                     //- 压缩处理成一行
			.pipe(changed('web/statics/styles'))
			.pipe(rev())                                            //- 文件名加MD5后缀
			.pipe(gulp.dest('web/statics/styles'))               //- 输出文件本地
			.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
			.pipe(gulp.dest('rev/css'));//- 将 rev-manifest.json 保存到 rev 目录内

	gulp.src(['statics/styles/main.css.map'])
			.pipe(gulp.dest('web/statics/styles'))
});
gulp.task('devjs', function() {
	return gulp.src(['statics/scripts/**/*.js','!statics/scripts/common/ckeditor/**/*'])
			.pipe(changed('web/statics/scripts')) 
			.pipe(rev()) 
			.pipe(gulp.dest('web/statics/scripts'))
			.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
			.pipe(gulp.dest('rev/js'));                           //- 将 rev-manifest.json 保存到 rev 目录内
}); 
gulp.task('devmv', function() {
	return gulp.src(['statics/scripts/common/ckeditor/**/*'])
			.pipe(gulp.dest('web/statics/scripts/common/ckeditor'));  
});

gulp.task("devimg",function(){
	return gulp.src(['statics/images/**/*'])
			.pipe(changed('web/statics/images'))
			.pipe(gulp.dest('web/statics/images'))
})

gulp.task('rev', function() {
	return gulp.src(['rev/**/*.json','web/html/**/*.html'])   //读取 rev-manifest.json 文件以及需要进行js,css名替换的文件
			.pipe(revCollector())                                  //- 执行文件内js,css名的替换
			.pipe(gulp.dest('web/html'));                     //- 替换后的文件输出的目录
});


//在html中引入公共文件 进行解析 在html中得到公共文件
gulp.task("fileinclude",function(){
	return gulp.src(['html/**/*.html','!html/shared/**/*.html'])
			.pipe(fileinclude({
				prefix: '@@',
				basepath: 'html/shared'}))
			.pipe(gulp.dest('web/html'))
})
//替换得到html中的路径 
gulp.task('inject',function(){
	return gulp.src(['web/html/**/*.html'])
			.pipe(inject.replace('<%=jsUrl%>',path.js))
			.pipe(inject.replace('<%=cssUrl%>',path.css))
			.pipe(inject.replace('<%=imgUrl%>',path.img))
			.pipe(inject.replace('<%=basePath%>',path.basepath))
			.pipe(inject.replace('<%=htmlbasePath%>',path.htmlbasepath))
			.pipe(inject.replace('<%=shareBasePath%>',path.shareBasePath))
			.pipe(gulp.dest('web/html'))
})

gulp.task('imagemin',function(){
	return gulp.src(['statics/images/**/*'])
			/*.pipe(imagemin({
			 progressive:true,
			 svgoPlugins:[{removeViewBox:false}],
			 use:[pngquant()]
			 }))*/
			.pipe(gulp.dest('web/statics/images'))
})
gulp.task('jslint', function () {
	return gulp.src(['statics/scripts/**/*.js','!node_modules/**'])
			.pipe(changed('web/statics/scripts'))
			.pipe(eslint({useEslintrc: false}))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});
gulp.task('clean:html',function(){
	return gulp.src('web/html')
			.pipe(clean());
})
gulp.task('clean',function(){
	return gulp.src('web')
			.pipe(clean())
})
gulp.task('watch',function(){
	gulp.watch(['html/**/*.html','statics/**/*'],['dev']);
})

gulp.task('dev', function(cb) {
	sequence('clean','path','jslint','less','lessTemplete','lessTpl','devcss','devjs','devmv','devimg','fileinclude','inject','rev',cb);
});

//上线打包
gulp.task('build', function(cb) {
	sequence('clean','path','jslint','less','lessTemplete','lessTpl','css','js','devmv','imagemin','fileinclude','inject','rev',cb);
});

