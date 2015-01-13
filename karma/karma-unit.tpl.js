module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      <% scripts.forEach( function ( file ) { %>'<%= file %>',
      <% }); %>
      'src/**/*.js',
      //'server/**/*.js',
      'src/**/*.coffee',
      'src/**/*.html'
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 
        'karma-jasmine', 
        'karma-chrome-launcher', 
        'karma-firefox-launcher', 
        'karma-coffee-preprocessor',
        'karma-ng-html2js-preprocessor',
        'karma-coverage'
    ],
    preprocessors: {
      '**/*.coffee': 'coffee',
      '**/*.html': 'html2js',
      //'server/**/*.js': ['coverage'],
      'src/**/*.js': ['coverage']
    },

    /**
     * How to report, by default.
     */
    reporters: [
        'dots',
        'progress', 
        'coverage'
    ],

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Firefox'//, 'Chrome'
    ],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },

    coverageReporter: {
      // type of file to output, use text to output to console
      //type : 'text',
      // directory where coverage results are saved
      //dir: 'test-results'
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
      // type lcov and dir coverage used by coveralls
      type: "lcov",
      dir: "coverage/"
    }
  });
};

