/*
TODO
    remove rimraf in favor to https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
    NEW FILES REFRESH BROWSERSYNCH PLEASE : http://stackoverflow.com/questions/22391527/gulps-gulp-watch-not-triggered-for-new-or-deleted-files
    gulp serve --prod --bsdev ( add contexts, dev groups some options, prod others)
    contexts --prod --dev
    copy images --images optimizationLevel
DONE
    minifing template not working
    gulp serve --cssconcat --appconcat --min --vconcat
    gulp newer, not clean! incremental deploy
    DETACHED APP FILES
    DETACHED CSS FILES
    minify allvendors js css
    remove contexts from default task
    allconcat, concat
    gulp --min minify every vendor
    livereload ok
    --bsdev
    iterate on all $.util.env variables !!!
    heyholis-nando.project
    gulp deploy
*/

var DIST            = './dist/',
DIST_CSS            = DIST + 'assets/css/',
DIST_IMG            = DIST + 'assets/img/',
DIST_APP            = DIST + 'assets/js/',
DIST_VENDOR         = DIST + 'assets/vendor/',
DIST_FONTS          = DIST + 'assets/fonts/',
DIST_HTML           = DIST,
DIST_TPL            = DIST + 'templates/';

var SRC             = './src/',
SRC_CSS             = SRC + 'css/',
SRC_SASS            = SRC + 'sass/',
SRC_LESS            = SRC + 'less/',
SRC_APP             = SRC + 'app/',
SRC_IMG             = SRC + 'images/',
SRC_FONTS           = SRC + 'fonts/',
SRC_HTML            = SRC + 'html/',
SRC_TPL             = SRC + 'templates/',
SRC_MOCK            = SRC + 'mockdata/',
SRC_VENDOR          = './bower_components/';

var BUILD           = './build/'
var TEMP            = './tmp/';
// var TEMP            = './.tmp/';

var VENDOR_PATH     = 'assets/vendor/';

var pkg             = require("./package.json");
var config          = require("./config.json");

var fs              = require('fs');
var read            = require('fs-readdir-recursive')

var gulp            = require('gulp');
var $               = require('gulp-load-plugins')();
var notify          = require('gulp-notify');
var refresh         = require('gulp-livereload');
var wiredep         = require('wiredep').stream;
var runSequence     = require('run-sequence');
var lr              = require('tiny-lr');
var http            = require('http');
var path            = require('path');
var ecstatic        = require('ecstatic');
var browserSync     = require('browser-sync');
var es              = require('event-stream');
var bourbon         = require('node-bourbon');
var mainBowerFiles  = require('main-bower-files');
var bower           = require('bower');
var lazypipe        = require('lazypipe');

// filters
var gulpFilter      = require('gulp-filter');
var jsFilter        = gulpFilter('**/**.js');
var sassFilter      = gulpFilter('**/**.scss');
var cssFilter       = gulpFilter('**/**.css');

var AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    'safari 5',
    'ie 8',
    'ie 9',
    'ie 10',
    'opera 12.1',
    'ios 6',
    'android 4'
];

var context          = 'dev';

var sassStyle        = 'expanded';
// var minified         = false;
// var sourceMap        = true;
// var isLivereload     = false;
// var bsdev            = true;
// var vendorsConcat    = true;
// var appConcat        = false;
// var processImages    = false;
// var cssConcat        = false;

var processImages   = ( $.util.env.img ) ? true : false;
var minified        = ( $.util.env.min ) ? true : false;
var isLivereload    = ( $.util.env.livereload ) ? true : false;
var bsdev           = ( $.util.env.bsdev ) ? true : false;
var vendorsConcat   = ( $.util.env.vconcat ) ? true : false; // concatenated vendor files
var appConcat       = ( $.util.env.appconcat ) ? true : false; // detached app files
var cssConcat       = ( $.util.env.cssconcat ) ? true : false; // detached css files
var stripDebug      = ( $.util.env.nodebug ) ? true : false; // removes console.log from app files
var noLint          = ( $.util.env.nolint ) ? true : false; // no app linting

var allcss          = 'all.css';
var alljs           = 'all.js';
var allvendors      = (minified) ? 'all-vendors.min' : 'all-vendors';
var sassStyle       = (minified) ? 'compressed' : 'expanded';
var vendors         = (vendorsConcat) ? 'vendors-concat' : 'bower-get-files';

// livereload
var lr              = lr();
var serverPort      = 3000;
var livereloadPort  = 3666; // 35729 didnt work
var reload          = browserSync.reload;
var livereload      = function (evt, filepath) {
    lr.changed({
        body: {
            files: path.relative(__dirname, filepath)
        }
    });
    $.util.log(evt, filepath, '> ', path.relative(__dirname, filepath) );
};

// process images
gulp.task('images', function () {
    if (processImages) {
        return gulp.src([
                SRC_IMG + '**/*'
            ])
            .pipe($.plumber())
            .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
            .pipe(gulp.dest( DIST_IMG ))
            .pipe($.if ( isLivereload, refresh(lr) ))
            .pipe($.size({showFiles: true}));
            // .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    } else {
        return gulp.src( SRC_IMG + '**/*')
            .pipe(gulp.dest( DIST_IMG ))
            .pipe($.if ( isLivereload, refresh(lr) ))
            .pipe($.size({title: 'images', showFiles:true}));
    }
});

// just copies the fonts
gulp.task('fonts', function () {
    return gulp.src( SRC_FONTS + '**/*')
        .pipe(gulp.dest( DIST_FONTS ))
        .pipe($.if ( isLivereload, refresh(lr) ))
        .pipe($.size({title: 'fonts', showFiles:true}));
});

// gulp deploy --bueno (reads users from ./config.json)
// gulp deploy
gulp.task('deploy', ['default'], function () {

    var deploy_path;
    var user;

    Object.keys(config.deploy).forEach(function(_user) {
        if ($.util.env[_user]===true) {
            user = _user;
            deploy_path = config.deploy[_user];
        }
    });

    deploy_path = (!user || user === 'build') ? config.deploy.build : deploy_path;

    if (deploy_path && deploy_path !== ''){
        return gulp.src([
            DIST + '*',
            DIST + '*/**'
        ], {
            dot: true
        }).pipe(gulp.dest( deploy_path ))
        .pipe($.size({title: user, showFiles:true}));
    } else {
        $.util.log($.util.colors.red('usage: gulp deploy --user'));
        return;
    }
});

// copy all files from root level (src) [robots.txt, humans.txt, manifest.webapp ] to ./dist
gulp.task('copy', function () {
    return gulp.src([
        'src/humans.txt',
        'src/robots.txt',
        'src/mockdata/**/*'
        // '!src/**.html',
    ], {
        dot: true,
        base: 'src'
    }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy', showFiles:true}));
});

// process sass and css
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    var cssFiles  = gulp.src( SRC_CSS  + '**/**.css' )
        .pipe( $.changed( DIST_CSS, {extension: '.css'}) )
        .pipe( $.autoprefixer(AUTOPREFIXER_BROWSERS) )
        .pipe( minified ? $.csso() : $.util.noop() );

    var sassFiles = gulp.src( SRC_SASS + '**/**.scss')
        .pipe( $.plumber() )
        .pipe( $.changed( DIST_CSS, {extension: '.css'}) )
        .pipe($.rubySass({
            style     : sassStyle,
            precision : 3,
            sourcemap : false
        }))
        .pipe( $.autoprefixer(AUTOPREFIXER_BROWSERS) )
        .on('error', $.util.log );

    return es.merge( cssFiles, sassFiles )
        // .pipe($.debug({verbose: true}))
        .pipe( $.plumber() )
        .pipe( $.tap(function(file, t) {
            // always separate ie.css
            var filename = path.basename(file.path);
            if ( filename === 'ie.css') {
                return gulp.src(file.path)
                    .pipe( $.size({title: 'styles', showFiles:true}) )
                    .pipe( gulp.dest( DIST_CSS ) )
                    .pipe( $.if ( isLivereload, refresh(lr) ));
            }
        }))
        .pipe( cssConcat ? $.concat( allcss ) : $.util.noop() )
        .pipe( $.size({title: 'styles', showFiles:true}) )
        // hack to not add .min suffix to .map files
        .pipe( minified ? $.rename(function(path){
            if (path.extname !== '.map') {
                if (path.basename.indexOf('min') === -1) {
                    path.basename = path.basename + '.min';
                }
            } else {
                path.basename = path.basename;
                path.suffix = '';
            }
        }) : $.util.noop() )
        .pipe( gulp.dest( DIST_CSS ) )
        .pipe( $.if ( isLivereload, refresh(lr) ));
});

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function getFiles(dir) {
    return read(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file));
      });
}

// wires each app js into html
function getAppScripts(){
    var appScripts = '';
    var appFiles = getFiles( SRC_APP );
    // var distAppRel = DIST_APP.replace(DIST, '');
    var distAppRel = getRelativePath( DIST_APP );
    appFiles.forEach(function(fileName){
        if (!fileName.match('.bak')) {
            fileName = (minified && fileName.match('.js')) ? fileName.replace('.js', '.min.js') : fileName;
            appScripts += '\t<script src="' + distAppRel + fileName +'"></script>\n';
        }
    });
    return appScripts;
}

function getRelativePath( path ) {
    return path.replace(DIST, '');
}

// wires each app js into html
function getAppCSS(){
    var appCSS     = '';
    var cssFiles   = getFiles( SRC_CSS );
    var sassFiles  = getFiles( SRC_SASS );
    var distCSSRel = getRelativePath( DIST_CSS );
    sassFiles.forEach(function(fileName){
        if (!fileName.match('.bak')) {
            fileName = (minified && fileName.match('.scss')) ? fileName.replace('.scss', '.min.css') : fileName.replace('.scss', '.css');
            appCSS += '\t<link rel="stylesheet" href="' + distCSSRel + fileName +'" type="text/css" />\n';
        }
    });
    cssFiles.forEach(function(fileName){
        if (!fileName.match('.bak') && (fileName !== 'ie.css') ) {
            fileName = (minified && fileName.match('.css')) ? fileName.replace('.css', '.min.css') : fileName;
            appCSS += '\t<link rel="stylesheet" href="' + distCSSRel + fileName +'" type="text/css" />\n';
        }
    });
    return appCSS;
}

gulp.task('html', function () {

    // wires all components added via bower
    var wiresAll_but_IEhelpers = lazypipe()
        .pipe(wiredep,
        {
            ignorePath: '../../bower_components/',
            exclude: [ /html5shiv/, /respond/ ],
            dependencies: true,
            devDependencies: false,
            fileTypes: {
                html: {
                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"](.+)['"]>/gi,
                        css: /<link.*href=['"](.+)['"]/gi
                    },
                    replace: {
                        js: '<script src="'+ VENDOR_PATH + '{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="'+ VENDOR_PATH + '{{filePath}}" />'
                    }
                }
            }
        });

    // wires html5shiv and respond.js in order to have media queries and html5 tags in IE8, IE9
    var wiresIEhelpers = lazypipe()
        .pipe(wiredep,
        {
            ignorePath: '../../bower_components/',
            exclude: [
                /^(?:(?!respond|html5shiv).)*$/
            ],
            dependencies: true,
            devDependencies: false,
            overrides: {
                'respond': {
                  'main': [
                    "./dest/respond.min.js"
                  ]
                },
                'html5shiv': {
                  'main': [
                    './dist/html5shiv.min.js'
                  ]
                }
            },
            fileTypes: {
                html: {
                    block: /(([ \t]*)<!--\s*ieonly:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endieonly\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"](.+)['"]>/gi
                    },
                    replace: {
                        js: '<!--[if lt IE 8]><script src="'+ VENDOR_PATH + '{{filePath}}"></script><![endif]-->',
                    }
                }
            },
        });

    // wires all src/js into one single file
    alljs = (minified) ? 'all.min.js' : alljs;
    var wiresAppConcatJS = lazypipe()
        .pipe($.replace, /\<\!\-\-\ alljs\ \-\-\>/, '<script src="' + getRelativePath( DIST_APP ) + alljs + '"></script>');

    var wiresAppSeparateJS = lazypipe()
        .pipe($.replace, /\<\!\-\-\ appEveryJS\ \-\-\>/, getAppScripts() );

    // wires all compiled css
    allcss = (minified) ? 'all.min.css' : allcss;
    var wiresAppConcatCSS = lazypipe()
        .pipe($.replace, /\<\!\-\-\ allcss\ \-\-\>/, '<link rel="stylesheet" href="assets/css/' + allcss + '" type="text/css" />' );

    // wires every css
    var wiresAppEveryCSS = lazypipe()
        .pipe($.replace, /\<\!\-\-\ allcss\ \-\-\>/, getAppCSS() );

    // wires all concatenated Vendors
    var wiresAllConcatVendors = lazypipe()
        .pipe($.replace, /\<\!\-\-\ vendorcss\ \-\-\>/, '<link rel="stylesheet" href="' + getRelativePath( DIST_VENDOR ) + allvendors + '.css" type="text/css" />' )
        .pipe($.replace, /\<\!\-\-\ vendorjs\ \-\-\>/, '<script src="' + getRelativePath( DIST_VENDOR ) + allvendors + '.js"></script>');

    // wires only bootstrap
    var wiresBootstrap = lazypipe()
        .pipe($.replace, /\<\!\-\-\ bootstrapcss\ \-\-\>/, '<link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.css" />')
        .pipe($.replace, /\<\!\-\-\ bootstrapjs\ \-\-\>/, '<script src="assets/vendor/bootstrap/dist/js/bootstrap.js"></script>');

    return gulp.src( SRC_HTML + '**/**.html' )
        // .pipe($.debug({verbose: true}))
        .pipe( $.changed( DIST_HTML, {extension: '.html'}) )
        .pipe( appConcat ? wiresAppConcatJS() : wiresAppSeparateJS() )
        .pipe( vendorsConcat ? wiresAllConcatVendors() : wiresAll_but_IEhelpers() )
        .pipe( wiresIEhelpers() )
        .pipe( cssConcat ? wiresAppConcatCSS() : wiresAppEveryCSS() )
        .pipe( bsdev ? wiresBootstrap() : $.util.noop() )
        .pipe( minified ?
            $.htmlmin({
                removeComments     : true,
                collapseWhitespace : true,
                preserveLineBreaks : true
            })
        : $.util.noop() )
        .pipe(gulp.dest( DIST_HTML ))
        .pipe($.if ( isLivereload, refresh(lr) ))
        .pipe($.size({showFiles: true}));
});

gulp.task('_templates', function() {
    return gulp.src( SRC_TPL + '**/**.html' )
        // .pipe($.debug({verbose: true}))
        .pipe($.plumber())
        .pipe( $.changed( DIST_TPL, {extension: '.html'}) )
        .pipe( minified ?
            $.htmlmin({
                removeComments     : true,
                collapseWhitespace : true,
                preserveLineBreaks : false
            })
        : $.util.noop() )
        .pipe(gulp.dest( DIST_TPL ))
        .pipe($.if ( isLivereload, refresh(lr) ))
        .pipe($.size({showFiles: true}));
});

gulp.task('app',  function() {
    return gulp.src([
            SRC_APP + '**/**.js'
        ])
        // .pipe(debug({verbose: true}))
        .pipe( $.plumber())
        .pipe( $.changed( DIST_APP, {extension: '.js'}) )
        .pipe( noLint ? $.util.noop() : $.jshint() )
        .pipe( noLint ? $.util.noop() : $.jshint.reporter('jshint-stylish') )
        .pipe( stripDebug ? $.stripDebug() : $.util.noop() )
        .pipe( appConcat ? $.concat( alljs ) : $.util.noop() )
        .pipe( minified ? $.uglify() : $.util.noop() )
        .pipe( minified ? $.rename({ suffix: '.min' }) : $.util.noop() )
        .pipe( gulp.dest( DIST_APP ) )
        .pipe( $.if ( isLivereload, refresh(lr) ) )
        .pipe( $.size( {showFiles: true} ) );
});

gulp.task('bower-get-files', function() {
    var file_relative_path;
    return gulp.src( mainBowerFiles({
        paths: {
            bowerJson      : './bower.json',
            bowerDirectory : './bower_components',
            debugging      : true
        }
    }), { base: './bower_components' } )
    .pipe($.tap(function(file, t) {
        var lastForwardSlash = file.relative.lastIndexOf('/');
        if (lastForwardSlash !== -1) {
            var fileName = file.relative.substring(lastForwardSlash + 1);
        }
        file_relative_path = file.relative.replace('/' + fileName, '');
        // console.log(path.basename(file.path))
        if ( ( path.extname(file.path) === '.css' || path.extname(file.path) === '.js' ) && (path.basename(file.path).search('min')) == -1 ) {
            return gulp.src(file.path)
                .pipe( (minified && path.extname(file.path) === '.css') ? $.csso()   : $.util.noop() )
                .pipe( (minified && path.extname(file.path) === '.js')  ? $.uglify() : $.util.noop() )
                .pipe(gulp.dest( DIST_VENDOR + file_relative_path ));
        } else {
            return gulp.src(file.path)
                .pipe(gulp.dest( DIST_VENDOR + file_relative_path ));
        }
    }))
});

/* BOOTSTRAP LESS */
gulp.task('bower-get-bootstrap-files', function() {
    return gulp.src( mainBowerFiles({
        paths: {
            bowerDirectory : './bower_components',
            bowerJson      : './bower-bootstrap.json',
            debugging      : true
        }
    }), { base: './bower_components' } )
    .pipe(gulp.dest( TEMP ));
});

gulp.task('bootstrap-prepare-less', ['bower-get-bootstrap-files'],  function() {
    return gulp.src( SRC_LESS + 'bootstrap/variables.less')
        .pipe(gulp.dest( TEMP + 'bootstrap/less/' ));
});

gulp.task('bootstrap-compile-less', ['bootstrap-prepare-less'], function() {
    return gulp.src( TEMP + 'bootstrap/less/bootstrap.less/' )
        .pipe($.plumber())
        .pipe($.less())
        .pipe( (minified) ? $.csso()   : $.util.noop() )
        .pipe(gulp.dest( DIST_VENDOR + 'bootstrap/dist/css/' ))
        .pipe($.if ( isLivereload, refresh(lr) ));
});

gulp.task('vendors-concat', function() {

    if ( bsdev ) {

        return gulp.src( mainBowerFiles({
            paths: {
                bowerJson      : './bower.json',
                bowerDirectory : './bower_components',
                debugging      : true
            },
            filter: /^(?:(?!bootstrap.css).)*$/
        }), { base: './bower_components' } )

        .pipe( processVendorsJS() )
        .pipe( gulp.dest( DIST_VENDOR ) )

        .pipe( processVendorsCSS() )
        .pipe( gulp.dest( DIST_VENDOR ) )

        .pipe(cssFilter.restore() )
        .pipe($.size({showFiles: true}))
        .pipe( gulp.dest( DIST_VENDOR ) )

    } else {

        return gulp.src( mainBowerFiles({
            paths: {
                bowerDirectory : './bower_components',
                bowerJson      : './bower.json',
                debugging      : true
            }
        }), { base: './bower_components' } )
        // .pipe($.plumber())

        .pipe( minified ? $.if('*.js', $.uglify() ) : $.util.noop() )
        .pipe( $.if('*.js', $.concat('all-vendors.js') ))
        .pipe( minified ? $.if('*.js',  $.rename({ suffix: '.min' }) ) : $.util.noop() )
        .pipe( $.size({showFiles: true}) )

        .pipe( minified ? $.if('*.css', $.csso() ) : $.util.noop() )
        .pipe( $.if('*.css', $.concat('all-vendors.css') ))
        .pipe( minified ? $.if('*.css',  $.rename({ suffix: '.min' }) ) : $.util.noop() )
        .pipe( $.size({showFiles: true}) )
        .pipe( gulp.dest( DIST_VENDOR) );
    }

});

// Updates the Bower dependencies based on the bower.json file
gulp.task('bower-update', function(next) {

    var needsUpdate = false;

    gulp.src('bower.json')
        .pipe(require('gulp-newer')('.build'))
        .pipe(gulp.dest('.build')) // todo: don't do this if the bower install fails
    .on('close', function() {
        if (!needsUpdate) {
            next();
        }
    })
    .on('error', function(error) {
        if (!needsUpdate) {
            next(error);
        }
    })
    .on('data', function() {
        // updated bower.json
        needsUpdate = true;
        $.util.log('Updating Bower Dependencies');
        bower.commands.install([], {}, {
            interactive: false
        })
        .on('end', function() {
            $.util.log('Bower Dependencies Updated');
            next();
        })
        .on('log', function(log) {
            if (log.level == 'action' && log.id == 'install') {
                $.util.log('Added Bower Dependency: ' + log.message);
            }
        })
        .on('error', function(error) {
            $.util.error('Bower Error:', error);
            next(error);
        });
    })
});

gulp.task('clean', function() {

    var deploy_path = [ DIST, TEMP, BUILD ];
    Object.keys(config.deploy).forEach(function(_user) {
        if (config.deploy[_user] !== 'build') {
            deploy_path.push(config.deploy[_user]);
        }
    });

    return gulp.src( deploy_path, {read: false})
        .pipe($.rimraf({ force: true }));
});

gulp.task('default', function (callback) {

    $.util.log($.util.colors.blue(" _                _           _ _         "));
    $.util.log($.util.colors.blue("| |              | |         | (_)        "));
    $.util.log($.util.colors.blue("| |__   ___ _   _| |__   ___ | |_ ___     "));
    $.util.log($.util.colors.blue("| '_ \\ / _ \\ | | | '_ \\ / _ \\| | / __|"));
    $.util.log($.util.colors.blue("| | | |  __/ |_| | | | | (_) | | \\__ \\  "));
    $.util.log($.util.colors.blue("|_| |_|\\___|\\__, |_| |_|\\___/|_|_|___/ "));
    $.util.log($.util.colors.blue("             __/ |                        "));
    $.util.log($.util.colors.blue("            |___/                         "));


    $.util.log($.util.colors.red('---=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---'));
    $.util.log($.util.colors.green( ' ---=== HeyHolis building ' + context + ' ===---'));
    $.util.log($.util.colors.red('---=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---'));

    if (bsdev) {
        runSequence(
            'clean',
            'copy',
            'bootstrap-compile-less',
            'styles',
            'app',
            '_templates',
            vendors,
            'html',
            'images',
            'fonts',
            callback
        );
    } else {
        runSequence(
            'clean',
            'copy',
            'styles',
            'app',
            vendors,
            '_templates',
            'html',
            'images',
            'fonts',
            callback
        );
    }
});

gulp.task('serve', ['default'], function () {

    // gulp serve --livereload
    if ( isLivereload ) {

        // livereload
        http.createServer(ecstatic({
            root       : __dirname + '/dist',
            defaultExt : 'html',
            autoIndex  : true
        })).listen( serverPort );
        $.util.log($.util.colors.blue('HTTP server listening on port ' + serverPort));

        lr.listen(livereloadPort);
        $.util.log($.util.colors.blue('LiveReload Server listening on port '+ livereloadPort));

        gulp.watch([ SRC_HTML + '**/**.html' ], [ 'html' ]);
        gulp.watch([ SRC_TPL  + '**/**.html' ], [ '_templates' ]);
        gulp.watch([ SRC_CSS  + '**/**.css', SRC_SASS + '**/**.scss' ], ['styles']);
        if (bsdev) {
            gulp.watch([ SRC_LESS + '**/bootstrap/**.less' ], ['bootstrap-compile-less']);
        }
        gulp.watch([ SRC_APP  + '**/**.js' ], ['app' ]);
        gulp.watch([ SRC_MOCK  + '**/**' ], ['copy' ]);
        gulp.watch([ SRC_IMG  + '**/**' ]);

        // gulp.watch([ SRC_HTML + '**/**.html' ], ['html' ])._watcher.on('all', livereload);
        // gulp.watch([ SRC_TPL  + '**/**.html' ], ['_templates' ])._watcher.on('all', livereload);
        // gulp.watch([ SRC_CSS  + '**/**.css', SRC_SASS + '**/*.scss' ], ['styles'])._watcher.on('all', livereload);
        // gulp.watch([ SRC_APP + '**/**.js' ], ['app' ])._watcher.on('all', livereload);
        // gulp.watch([ SRC_IMG + '**/**' ])._watcher.on('all', livereload);

    } else {

        // gulp serve
        // BROWSER SYNC, PORRA !

        browserSync.init(
            {
            server: {
                baseDir: './dist/'
            },
            index     : 'index.html',
            debugInfo : true,
            notify    : false,
            open      : false,
            ghostMode : {
                clicks   : true,
                location : true,
                forms    : true,
                scroll   : true
            },
            // proxy: "local.dev",
            port: serverPort
        });

        if (bsdev) {
            gulp.watch([ SRC_LESS + '**/bootstrap/**.less' ], ['bootstrap-compile-less', reload]);
        }
        gulp.watch([ SRC_HTML + '**/**.html' ], [ 'html', reload]);
        gulp.watch([ SRC_TPL      + '**/**.html' ], [ '_templates', reload ]);
        gulp.watch([ SRC_CSS  + '**/**.css', SRC_SASS + '**/**.scss' ], ['styles', reload]);
        gulp.watch([ SRC_APP  + '**/**.js' ], ['app', reload]);
        gulp.watch([ SRC_IMG  + '**/**' ], ['images', reload]);
        gulp.watch([ SRC_MOCK + '**/**' ], ['copy', reload]);
    }

});

gulp.task('help', function(next) {

    $.util.log('--- ' + pkg.name + ' ---');
    $.util.log('--- version: ' + pkg.version );
    $.util.log('--- author: ' + pkg.author );
    $.util.log('');

    $.util.log('See all of the available tasks:');
    $.util.log('$ gulp -T');
    $.util.log('');

    $.util.log('Run a server with BrowserSync (default):');
    $.util.log('$ gulp serve');
    $.util.log('');

    $.util.log('Run server with LiveReload:');
    $.util.log('$ gulp serve --livereload');
    $.util.log('');

    $.util.log('Minify all HTML, CSS and JS:');
    $.util.log('$ gulp serve --min');
    $.util.log('');

    $.util.log('Concatenate all vendor files:');
    $.util.log('$ gulp serve --vconcat');
    $.util.log('');

    $.util.log('Concatenate all css files:');
    $.util.log('$ gulp serve --cssconcat');
    $.util.log('');

    $.util.log('Concatenate all app files:');
    $.util.log('$ gulp serve --appconcat');
    $.util.log('');

    $.util.log('Remove all console.log() from app files:');
    $.util.log('$ gulp serve --nodebug');
    $.util.log('');

    $.util.log('Disable all app linting:');
    $.util.log('$ gulp serve --nolint');
    $.util.log('');

    $.util.log('Edit Bootstrap\'s \'variables.less\' on-the-fly:');
    $.util.log('$ gulp serve --bsdev');
    $.util.log('');

    $.util.log('Deploy files:');
    $.util.log('$ gulp deploy');
    $.util.log('$ gulp deploy --appconcat --cssconcat --vconcat --min');
    $.util.log('');

    $.util.log('Deploy files using a user config (reads users from ./config.json):');
    $.util.log('$ gulp deploy --bueno');
    $.util.log('');

});
