# Integração Minha Oi :: Front-end
####using Bueno's [**Hey,Holis**](https://github.com/antenando/heyholis)

---
###Requirements

OS-X Linux, [**Node.js**](//nodejs.org/) and [**Ruby**](//www.ruby-lang.org/en/) installed

---
###Installation
[**Bower**](//bower.io) and [**Sass**](//sass-lang.com)
```
npm install -g gulp bower
gem install sass
```

---
###Hey,Holis dependencies
```
npm install
bower install
```

---
####Start the server with
``gulp serve``

---
####Output only

``gulp`` outputs ``/dist`` directory for current application

---
####Options

``--livereload`` uses [Livereload](http://livereload.com/) in order to update the browser automatically (default uses [BrowserSync](http://www.browsersync.io/))

``--min`` minifies CSS, JavaScript, HTML and dependencies' JS and CSS, and prefixes App and CSS filenames to ``.min``

``--bsdev`` uses ``/less/bootstrap/variables.less`` and compoles Bootstrap on-the-fly

``--vconcat`` concatenates all vendors' JavaScripts into one file (``all-vendors.js``) an all vendors' CSS into another (``all-vendors.css``)

``--appconcat`` concatenates all App's JavaScript files into one single file ``all.js``

``--cssconcat`` concatenates all App's SASS and CSS files into one single file ``all.css``

``--nodebug`` removes all ``console.log()`` statements from App's JS files

``--nolint`` disables JavaScript linting

---

####You may use them together

``gulp serve --min --cssconcat --appconcat --vconcat --nodebug --nolint``

Will serve 
* Minified HTML, CSS and JavaScript files
* concatenated SASS & CSS files
* concatenated App's JS files
* concatenated vendors' files
* stripped console.log messages from App's files
* no linting display

---
###Bower Dependencies

To install a new dependency, you may 
`bower install depName --save` to get the package and it will automatically be wired into the App ``(bower.json)``.

---

### Contribution
Just grab a to-do item and drop me a line. Help is much appreciated! ;) 

---

##### Features to be added: [ TO-DOs ] 
*(achtung, ugly list)*
* prod: gulp serve --min --cssconcat --vconcat --appconcat --nolint --nodebug
* heyholis.sh
* deploy.sh
* react (//www.npmjs.org/package/gulp-react)
* gulp.spritesmith
* [sprites](//www.mikestreety.co.uk/blog/an-advanced-gulpjs-file)
* [tarball](//github.com/jstuckey/gulp-gzip)
* change main icon
* boubon.io (//www.npmjs.org/package/node-bourbon)
* //blogs.atlassian.com/2014/08/flux-architecture-step-by-step/
* showdown
* fonts
* ~~sourcemaps~~
* //github.com/mikestreety/gulp
* //github.com/klei/gulp-inject
* gulp-combine-media-queries
* npm install onchange
* ember?
* //www.npmjs.org/package/node-neat
* //thoughtbot.com/sv/community
* //laravel-news.com/2014/03/using-bourbon-neat-with-gulp/
* //bitters.bourbon.io/example.html
* //blog.andyet.com/2014/08/13/opinionated-rundown-of-js-frameworks
* tests
    - gulp-expect-file
* ~~backbone.js~~
* ~~merge wsk~~
    * ~~gulp serve~~
    * ~~gulp (cria ./dist)~~
    * ~~gulp prod (all minified)~~
    * ~~gulp copy~~
    * ~~gulp fonts~~
    * ~~livereload is done~~
    * ~~prod or dev~~
* ~~gulp copy resources (favico.ico, robots.txt, humans.txt)~~
* ~~add gulp-newer to all tasks~~
    - ~~images~~
    - ~~styles~~
    - ~~app~~
    - ~~all-vendor~~
    - ~~html~~
    - ~~templates~~
* ~~[bootstrap-sass](//medium.com/@wizardzloy/customizing-bootstrap-with-gulp-js-and-bower-fafac8e3e1af)~~
* ~~//github.com/mikestreety/gulp/blob/master/gulpfile.js~~
* ~~[lazypipe](//www.npmjs.org/package/lazypipe)~~
* ~~html5shiv and respond.js out of all-vendors task~~
* ~~templates~~
* ~~devdependencies or dependencies~~
* ~~README.md~~
* ~~merge with master~~
* ~~merge with booking's~~
* ~~PROD VERSION WITH JS & CSS DEPENDENCIES, not concat~~

