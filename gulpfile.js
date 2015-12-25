/**
 * Created by Mark Slepkov on 25.12.15.
 */
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var paths = {
    stylus: {
        src: 'src/**/*.styl',
        main: 'src/css/main.styl',
        dest: 'dist/css/'
    },
    coffee: {
        src: 'src/**.coffee',
        dest: 'dist/'
    },
    project_html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    },
    plugins_tmpl: {
        src: ['bower_components/marionette-select/dist/**/tmpl/**'],
        dest: 'dist/apps/'
    },
    js:{
        src: {
            entry: "src/init",
            compiled: "dist/**/*.js"
        }
    }
};

//gulp.task('coffee', function(){
//    gulp.src(paths.coffee.src).pipe(coffee()).pipe(gulp.dest(paths.coffee.dest))
//});

gulp.task('stylus', function(){
    gulp.src(paths.stylus.main)
        .pipe(stylus())
        .pipe(gulp.dest(paths.stylus.dest))
});

gulp.task('html', function(){
    gulp.src(paths.plugins_tmpl.src).pipe(gulp.dest(paths.plugins_tmpl.dest));
    gulp.src(paths.project_html.src).pipe(gulp.dest(paths.project_html.dest));

});

var gutil = require("gulp-util");
var webpack = require("webpack");
//var WebpackDevServer = require("webpack-dev-server");

gulp.task('webpack', function(callback){
    webpack({
        // config here
        //watch: true,
        entry: paths.js.src.entry,
        output: {
            path: "dist/",
            publicPath: '/',
            filename: 'build.js',
            library: 'jquery'
        },
        module:{
            loaders: [
			    { test: /\.coffee$/, loader: "coffee" }
		    ]
        },
        resolve: {
            modulesDirectories: ['', './', 'src', 'bower_components'],
            extensions: ["", ".js", ".coffee"],
            alias: {
                marionette: 'backbone.marionette'
            }
        },
        devtool: "source-map",
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                warnings: false,
                drop_console: true,
                unsafe: true
            }),
            new webpack.ResolverPlugin([
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                ],
                ["normal", "loader"]
            )
        ]
    },
    function(err, stats){
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback()
    })
});

gulp.task('watch', function() {
    gulp.watch([paths.stylus.src], ['stylus']);
    gulp.watch([paths.project_html.src], ['html']);
    gulp.watch([paths.coffee.src], ['webpack']);
    //gulp.watch([paths.js.src.compiled, paths.js.src.entry], ['webpack']);
});
gulp.task("build", ['coffee', 'stylus', 'html', 'webpack']);
gulp.task("default", ['build']);