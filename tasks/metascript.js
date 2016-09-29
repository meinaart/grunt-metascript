/* jshint node:true */
/*
 * grunt-metascript
 *
 * Grunt wrapper for https://www.npmjs.org/package/metascript
 *
 * Copyright (c) 2014 Meinaart van Straalen
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  'use strict';
  var PROGRAM = 'program';
  var TRANSFORM = 'transform';

  // Loglevels, from none to verbose
  var LOG_NONE = 0;
  var LOG_ERROR = 1;
  var LOG_INFO = 2;
  var LOG_TRACE = 3;

  var chalk = require('chalk');
  var MetaScript = require('metascript');

  var defaultOptions = {
    mode: PROGRAM,
    scope: {},
    logLevel: LOG_INFO,
    encoding: grunt.file.defaultEncoding,
    onlyUpdateWhenChanged: false
  };

  grunt.registerMultiTask('metascript', 'Process files with metascript.', function () {
    var options = this.options(defaultOptions);

    function log(message, logLevel) {
      if(options.logLevel !== LOG_NONE) {
        if(!logLevel) {
          logLevel = LOG_INFO;
        }
        if(logLevel <= options.logLevel) {
          grunt.log.writeln(message);
        }
      }
    }

    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        var source = grunt.file.read(src, {encoding: options.encoding});

        // Default destination to the same directory
        var dest = file.dest || src;
        var destExists = grunt.file.exists(dest);
        var logLevel = LOG_INFO;

        var action = 'Processed';
        if(!destExists) {
          action = 'Generated';
        }

        var result;
        try {
          if(options.mode === PROGRAM) {
            result = MetaScript.compile(source);
          } else if(options.mode === TRANSFORM) {
            result = MetaScript.transform(source, src, options.scope);
          } else {
            result = source;
          }
        } catch(exc) {
          log(exc, LOG_ERROR);
          grunt.fail.fatal(exc);
        }

        var write = true;
        if(result === source) {
          action = 'Unprocessed';
          if(destExists) {
            logLevel = LOG_TRACE;
          }
        }

        if(destExists && options.onlyUpdateWhenChanged) {
          var destSource = grunt.file.read(dest, {encoding: options.encoding});
          if(destSource === result) {
            action = 'Unchanged';
            logLevel = LOG_TRACE;
            write = false;
          }
        }

        if(write) {
          grunt.file.write(dest, result, {encoding: options.encoding});
        }

        log(chalk.green('✔ ') + chalk.bold(action + ': ') + dest, logLevel);
      });
    });
  });
};
