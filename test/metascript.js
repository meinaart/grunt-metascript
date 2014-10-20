/* global suite, test */
/* jshint quotmark: false */
var assert = require('assert');
var fs = require('fs');
var grunt = require('grunt');

suite('grunt-metascript', function() {
  'use strict';

  function readFile(filename) {
    var contents = fs.readFileSync(filename, 'utf8');
    return contents.replace("\r", "");
  }
  
  suite('generating', function() {
    test('program mode', function() {
      assert.ok(fs.existsSync('out/somemeta-program.js'));
      assert.equal(readFile('out/somemeta-program.js'), readFile('test/fixtures/somemeta-program.js'));
    });

    test('transform mode', function() {
      assert.ok(fs.existsSync('out/somemeta-transform.js'));
      assert.equal(readFile('out/somemeta-transform.js'), readFile('test/fixtures/somemeta-transform.js'));
    });

    test('multiple files: exclude program', function() {
      assert.ok(!fs.existsSync('out/multi/somemeta-program.js'));
    });

    test('multiple files transformation', function() {
      grunt.file.recurse('out/multi/', function(abspath, rootdir, subdir, filename) {
        assert.ok(fs.existsSync(abspath));
        assert.equal(readFile(abspath), readFile('test/fixtures/multi/' + (subdir?subdir+'/':'') + filename));
      });
    });
  });
});
