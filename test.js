/*jslint
  bitwise: true, browser: true,
  evil: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function () {
  /*
    this function will test this module
  */
  'use strict';
  var local;



  // run shared js-env code
  (function () {
    // init local
    local = {};
    local.modeJs = (function () {
      try {
        return module.exports && typeof process.versions.node === 'string' &&
          typeof require('http').createServer === 'function' && 'node';
      } catch (errorCaughtNode) {
        return typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser';
      }
    }());
    local.istanbul_lite = local.modeJs === 'browser'
      ? window.istanbul_lite
      : require('./index.js');
    local.utility2 = local.modeJs === 'browser'
      ? window.utility2
      : require('utility2');
  }());
  switch (local.modeJs) {



  // run browser js-env code
  case 'browser':
    window.local = local;
    local.evalAndCover = function () {
      var innerHTML;
      try {
        window.__coverage__ = window.__coverage__ || {};
        eval(window.istanbul_lite.instrumentSync(
          local.istanbulLiteEvalInputTextarea.value,
          '/input.js'
        ));
        innerHTML = '<style>\n' + local.istanbul_lite.baseCss
          .replace((/(.+\{)/g), function (match0) {
            return '.istanbulLiteCoverageReportDivDiv ' +
              match0.replace((/,/g), ', .istanbulLiteCoverageReportDivDiv ');
          })
          .replace('margin: 3em;', 'margin: 0;')
          .replace('margin-top: 10em;', 'margin: 20px;')
          .replace('position: fixed;', 'position: static;')
          .replace('width: 100%;', 'width: auto;') +
          '.istanbulLiteCoverageReportDiv {\n' +
            'border: 1px solid;\n' +
            'border-radius: 5px;\n' +
            'padding: 0 10px 10px 10px;\n' +
          '}\n' +
            '.istanbulLiteCoverageReportDivDiv {\n' +
            'border: 1px solid;\n' +
            'margin-top: 20px;\n' +
          '}\n' +
            '.istanbulLiteCoverageReportDivDiv a {\n' +
            'cursor: default;\n' +
            'pointer-events: none;\n' +
          '}\n' +
            '.istanbulLiteCoverageReportDivDiv .footer {\n' +
            'display: none;\n' +
          '}\n' +
          '</style>\n' +
          '<h2>coverage</h2>\n' +
          window.istanbul_lite.coverageReportWriteSync({
            coverage: { '/input.js': window.__coverage__['/input.js'] }
          });
      } catch (errorCaught) {
        innerHTML = '<pre>' + errorCaught.stack.replace((/</g), '&lt') + '</pre>';
      }
      document.querySelector('.istanbulLiteCoverageReportDiv').innerHTML = innerHTML;
      // cleanup __coverage__
      delete window.__coverage__['/input.js'];
      return innerHTML;
    };
    local.istanbulLiteEvalInputTextarea =
      document.querySelector('.istanbulLiteEvalInputTextarea');
    local.istanbulLiteEvalInputTextarea.addEventListener('keyup', local.evalAndCover);
    local.evalAndCover();
    local._evalAndCover_default_test = function (onError) {
      /*
        this function test evalAndCover's default handling behavior
      */
      var data;
      // test syntax-error handling behavior
      local.istanbulLiteEvalInputTextarea.value = 'syntax-error!';
      data = local.evalAndCover();
      // validate data
      local.utility2.assert(data.indexOf('<pre>') === 0, data);
      local.istanbulLiteEvalInputTextarea.value = 'console.log("hello world");';
      data = local.evalAndCover();
      // validate data
      local.utility2.assert(data.indexOf('<tr>' +
        '<td class="line-count">1</td>' +
        '<td class="line-coverage"><span class="cline-any cline-yes">1</span></td>' +
        '<td class="text"><pre class="prettyprint lang-js">' +
          'console.log("hello world");</pre>' +
        '</td>' +
        '</tr>') >= 0, data);
      onError();
    };
    local.utility2.testRun(local);
    break;



  // run node js-env code
  case 'node':
    // require modules
    local.fs = require('fs');
    local.path = require('path');
    local._coverageReportWriteSync_default_test = function (onError) {
      /*
        this function test coverageReportWriteSync's default handling behavior
      */
      var dir;
      dir = process.env.npm_config_dir_tmp +
        '/coverage.tmp/' + Math.random() + '/' + Math.random();
      local.istanbul_lite.coverageReportWriteSync({
        coverage: {},
        // test mkdirpSync handling behavior
        dir: dir
      });
      try {
        local.istanbul_lite.coverageReportWriteSync({
          coverage: {},
          // test mkdirpSync error handling behavior
          dir: dir + '/index.html'
        });
      } catch (errorCaught) {
        // validate error occurred
        local.utility2.assert(errorCaught instanceof Error, errorCaught);
        onError();
      }
    };
    local._testPage_default_test = function (onError) {
      /*
        this function will test the test-page's default handling behavior
      */
      local.utility2.phantomTest({
        url: 'http://localhost:' + local.utility2.envDict.npm_config_server_port +
          '?modeTest=phantom&' +
          '_testSecret={{_testSecret}}&' +
          'timeoutDefault=' + local.utility2.timeoutDefault
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
      data: local.utility2.textFormat('<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
          '<meta charset="UTF-8">\n' +
          '<title>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</title>\n' +
          '<link rel="stylesheet" href="/assets/utility2.css">\n' +
          '<style>\n' +
            '* {\n' +
              'box-sizing: border-box;\n' +
            '}\n' +
            'body {\n' +
              'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
              'margin: 10px;\n' +
            '}\n' +
            'body > div {\n' +
              'margin-top: 20px;\n' +
            '}\n' +
            'textarea {\n' +
              'font-family: monospace;\n' +
              'height: 8em;\n' +
              'width: 100%;\n' +
            '}\n' +
            '.testReportDiv {\n' +
              'display: none;\n' +
            '}\n' +
          '</style>\n' +
        '</head>\n' +
        '<body>\n' +
          '<!-- ajax-progress begin -->\n' +
          '<div class="ajaxProgressDiv" style="display: none;">\n' +
            '<div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n' +
          '</div>\n' +
          '<!-- ajax-progress end -->\n' +
          '<h1>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n' +
          '<h3>{{envDict.npm_package_description}}</h3>\n' +
          '<div class="mainAppDiv">\n' +
            '<div>edit / paste script below to eval and cover</div>\n' +
            '<div><textarea class="istanbulLiteEvalInputTextarea">if (true) {\n' +
              'console.log("hello");\n' +
            '} else {\n' +
              'console.log("bye");\n' +
            '}</textarea></div>\n' +
          '</div>\n' +
          '<!-- main-app end -->\n' +
          '<!-- coverage begin -->\n' +
          '<div class="istanbulLiteCoverageReportDiv"></div>\n' +
          '<!-- coverage end -->\n' +
          '<!-- test-report begin -->\n' +
          '<div class="testReportDiv"></div>\n' +
          '<!-- test-report end -->\n' +
          '<!-- script begin -->\n' +
          '<script src="/assets/utility2.js"></script>\n' +
          '<script>window.utility2.envDict = {\n' +
            'npm_package_description: "{{envDict.npm_package_description}}",\n' +
            'npm_package_name: "{{envDict.npm_package_name}}",\n' +
            'npm_package_version: "{{envDict.npm_package_version}}"\n' +
          '}</script>\n' +
          '<script src="/assets/istanbul-lite.js"></script>\n' +
          '<script src="/test/test.js"></script>\n' +
          '<!-- script end -->\n' +
        '</body>\n' +
        '</html>\n', { envDict: local.utility2.envDict })
    }].forEach(function (options) {
      console.log('cache and parse ' + options.file);
      // cache and parse the file
      local.utility2.fileCacheAndParse(options);
    });
    // init server-middlewares
    local.serverMiddlewareList = [
      function (request, response, onNext) {
        /*
          this user-defined middleware will override the builtin test-middleware
        */
        switch (request.urlPathNormalized) {
        case '/':
        case '/assets/istanbul-lite.js':
        case '/test/test.js':
          response.end(local.utility2.fileCacheDict[request.urlPathNormalized].data);
          break;
        // default to next middleware
        default:
          onNext();
        }
      },
      // builtin test-middleware
      local.utility2.testMiddleware
    ];
    // run server-test
    local.utility2.testRunServer(local);
    local.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (local.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        local.utility2.jslint_lite.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      local.utility2.onFileModifiedRestart(file);
    });
    // init repl debugger
    local.utility2.replStart({ local: local });
    break;
  }
}());
