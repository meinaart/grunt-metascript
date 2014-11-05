/* jshint node:true */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    metascript: {
      program: {
        options: {
          mode: 'program',
          scope: {
            WHAT: true
          }
        },
        dest: 'out/somemeta-program.js',
        src: 'test/in/somemeta.js'
      },
      transform: {
        options: {
          mode: 'transform',
          scope: {
            WHAT: true
          }
        },
        dest: 'out/somemeta-transform.js',
        src: 'test/in/somemeta.js'
      },
      multifile: {
        options: {
          mode: 'transform'
        },
        expand: true,
        cwd: 'test/in/',
        src: ['**/*.js', '!somemeta-program.js', '!nothing.js'],
        dest: 'out/multi/'
      },
      unchanged: {
        options: {
          mode: 'transform',
          onlyUpdateWhenChanged: true,
          logLevel: 3
        },
        expand: true,
        cwd: 'test/in/',
        src: 'nothing.js',
        dest: 'out/'
      }
    },
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/metascript.js']
    },
    clean: [
      'out/'
    ],
    copy: {
      nothing: {
        options: {
          timestamp: true,
          mode: true
        },
        src: 'test/in/nothing.js',
        dest: 'out/nothing.js'
      }
    },
    simplemocha: {
      options: {
        ui: 'tdd',
        reporter: 'spec'
      },
      all: {
        src: 'test/metascript.js'
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'copy','jshint', 'metascript', 'simplemocha']);
  grunt.registerTask('dev', ['watch']);


};