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
        src: ['**/*.js', '!somemeta-program.js'],
        dest: 'out/multi/'
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
  grunt.registerTask('default', ['clean', 'jshint', 'metascript', 'simplemocha']);
  grunt.registerTask('dev', ['watch']);


};