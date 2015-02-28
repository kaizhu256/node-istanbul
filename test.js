/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  maxlen: 96,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function () {
  /*
    this function will test this module
  */
  'use strict';
  var app;



  // run shared js-env code
  (function () {
    // init app
    app = {};
    app.modeJs = (function () {
      try {
        return module.exports && typeof process.versions.node === 'string' &&
          typeof require('http').createServer === 'function' && 'node';
      } catch (errorCaughtNode) {
        return typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser';
      }
    }());
    app.istanbul_lite = app.modeJs === 'browser'
      ? window.istanbul_lite
      : require('./index.js');
    app.utility2 = app.modeJs === 'browser'
      ? window.utility2
      : require('utility2');
  }());
  switch (app.modeJs) {



  // run browser js-env code
  case 'browser':
    // export app
    window.app = app;
    app.istanbulLiteInputTextareaDiv = document.querySelector('.istanbulLiteInputTextareaDiv');
    app._coverAndEval_default_test = function (onError) {
      /*
        this function test coverAndEval's default handling behavior
      */
      var data, value;
      // save value
      value = app.istanbulLiteInputTextareaDiv.value;
      // test default handling behavior
      app.istanbulLiteInputTextareaDiv.value = 'console.log("hello world");';
      data = app.istanbul_lite.coverAndEval();
      // validate data
      app.utility2.assert(data.indexOf('<tr>' +
        '<td class="line-count">1</td>' +
        '<td class="line-coverage"><span class="cline-any cline-yes">1</span></td>' +
        '<td class="text"><pre class="prettyprint lang-js">' +
          'console.log("hello world");</pre>' +
        '</td>' +
        '</tr>') >= 0, data);
      // test syntax-error handling behavior
      app.istanbulLiteInputTextareaDiv.value = 'syntax-error!';
      data = app.istanbul_lite.coverAndEval();
      // validate data
      app.utility2.assert(data.indexOf('<pre>') === 0, data);
      // restore value
      app.istanbulLiteInputTextareaDiv.value = value;
      app.istanbul_lite.coverAndEval();
      onError();
    };
    app.utility2.testRun(app);
    break;



  // run node js-env code
  case 'node':
    // require modules
    app.fs = require('fs');
    app.path = require('path');
    app._coverageReportCreate_default_test = function (onError) {
      /*
        this function test coverageReportCreate's default handling behavior
      */
      var dir;
      app.utility2.testMock([
        // suppress console.log
        [console, { log: app.utility2.nop }]
      ], onError, function (onError) {
        dir = process.env.npm_config_dir_tmp +
          '/coverage.tmp/' + Math.random() + '/' + Math.random();
        app.istanbul_lite.coverageReportCreate({
          coverage: {},
          // test mkdirpSync handling behavior
          dir: dir
        });
        try {
          app.istanbul_lite.coverageReportCreate({
            coverage: {},
            // test mkdirpSync error handling behavior
            dir: dir + '/index.html'
          });
        } catch (errorCaught) {
          // validate error occurred
          app.utility2.assert(errorCaught instanceof Error, errorCaught);
          onError();
        }
      });
    };
    app._testPage_default_test = function (onError) {
      /*
        this function will test the test-page's default handling behavior
      */
      app.utility2.phantomTest({
        url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
          '?modeTest=phantom&' +
          '_testSecret={{_testSecret}}&' +
          'timeoutDefault=' + app.utility2.timeoutDefault
      }, onError);
    };
    // init server-assets
    [{
      cache: '/assets/istanbul-lite.js',
      coverage: 'istanbul-lite',
      file: __dirname + '/index.js'
    }, {
      cache: '/test/test.js',
      coverage: 'istanbul-lite',
      file: __filename
    }, {
      cache: '/',
      data: app.utility2.textFormat(String() +
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
          '<meta charset="UTF-8">\n' +
          '<link rel="stylesheet" href="/assets/utility2.css">\n' +
          '<style>\n' +
            '* {\n' +
              'box-sizing: border-box;\n' +
            '}\n' +
            'body {\n' +
              'background-color: #fff;\n' +
              'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
            '}\n' +
            'body > div {\n' +
              'margin-top: 20px;\n' +
            '}\n' +
            '.testReportDiv {\n' +
              'display: none;\n' +
            '}\n' +
            'textarea {\n' +
              'font-family: monospace;\n' +
              'height: 8em;\n' +
              'width: 100%;\n' +
            '}\n' +
          '</style>\n' +
          '<title>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</title>\n' +
        '</head>\n' +
        '<body>\n' +
          '<div class="ajaxProgressDiv" style="display: none;">\n' +
            '<div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n' +
          '</div>\n' +
          '<h1>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n' +
          '<h3>{{envDict.npm_package_description}}</h3>\n' +
          '<div>\n' +
            '<div>edit or paste script below to cover and eval</div>\n' +
            '<div><textarea class="istanbulLiteInputTextareaDiv">if (true) {\n' +
              'console.log("hello");\n' +
            '} else {\n' +
              'console.log("bye");\n' +
            '}</textarea></div>\n' +
          '</div>\n' +
          '<div class="istanbulLiteCoverageDiv"></div>\n' +
          '<div class="testReportDiv"></div>\n' +
          '<script src="/assets/istanbul-lite.js"></script>\n' +
          '<script src="/assets/utility2.js"></script>\n' +
          '<script>window.utility2.envDict = {\n' +
            'npm_package_description: "{{envDict.npm_package_description}}",\n' +
            'npm_package_name: "{{envDict.npm_package_name}}",\n' +
            'npm_package_version: "{{envDict.npm_package_version}}"\n' +
          '};\n' +
          'document.querySelector(\n' +
            '".istanbulLiteInputTextareaDiv"\n' +
          ').addEventListener("keyup", window.istanbul_lite.coverAndEval);\n' +
          'window.istanbul_lite.coverAndEval();</script>\n' +
          '<script src="/test/test.js"></script>\n' +
        '</body>\n' +
        '</html>\n' +
        String(), { envDict: app.utility2.envDict })
    }].forEach(function (options) {
      console.log('cache and parse ' + options.file);
      // cache and parse the file
      app.utility2.fileCacheAndParse(options);
    });
    // init server-middlewares
    app.serverMiddlewareList = [
      function (request, response, onNext) {
        /*
          this user-defined middleware will override the builtin test-middleware
        */
        switch (request.urlPathNormalized) {
        case '/':
        case '/assets/istanbul-lite.js':
        case '/test/test.js':
          response.end(app.utility2.fileCacheDict[request.urlPathNormalized].data);
          break;
        // default to next middleware
        default:
          onNext();
        }
      },
      // builtin test-middleware
      app.utility2.testMiddleware
    ];
    // run server-test
    app.utility2.testRunServer(app);
    app.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (app.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        app.utility2.jslint_lite.jslintAndPrint(app.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      app.utility2.onFileModifiedRestart(file);
    });
    // init repl debugger
    app.utility2.replStart({ app: app });
    break;
  }
}());
