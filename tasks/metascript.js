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

  var chalk = require('chalk');
  var MetaScript = require('metascript');

  var defaultOptions = {
    mode: PROGRAM,
    scope: {},
    encoding: grunt.file.defaultEncoding,
    onlyUpdateWhenChanged: false
  };

  grunt.registerMultiTask('metascript', 'Process files with metascript.', function () {
    var options = this.options(defaultOptions);

    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        var source = grunt.file.read(src, {encoding: options.encoding});

        // Default destination to the same directory
        var dest = file.dest || src;
        var destExists = grunt.file.exists(dest);

        var action = 'Processed';
        if(!destExists) {
          action = 'Generated';
        }

        var result;
        if(options.mode === PROGRAM) {
          result = MetaScript.compile(source);
        } else if(options.mode === TRANSFORM) {
          result = MetaScript.transform(source, src, options.scope);
        } else {
          result = source;
        }

        var write = true;
        if(result === source) {
          action = 'Unprocessed';
        }

        if(destExists && options.onlyUpdateWhenChanged) {
          var destSource = grunt.file.read(dest, {encoding: options.encoding});
          if(destSource === result) {
            action = 'Unchanged (not updated)';
            write = false;
          }
        }

        if(write) {
          grunt.file.write(dest, result, {encoding: options.encoding});
        }

        grunt.log.writeln(chalk.green('✔ ') + chalk.bold(action + ': ') + dest);
      });
    });
  });
};