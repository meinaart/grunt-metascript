/* global suite, test */
var assert = require('assert');
var fs = require('fs');
var grunt = require('grunt');

suite('grunt-metascript', function() {
  'use strict';

  function readFile(filename) {
    var contents = fs.readFileSync(filename, 'utf8');
    return contents.replace(/\r/g, '');
  }
  
  suite('generating:', function() {
    test('program mode', function() {
      assert.ok(fs.existsSync('out/somemeta-program.js'));
      assert.equal(readFile('out/somemeta-program.js'), readFile('test/fixtures/somemeta-program.js'));
    });

    test('transform mode', function() {
      assert.ok(fs.existsSync('out/somemeta-transform.js'));
      assert.equal(readFile('out/somemeta-transform.js'), readFile('test/fixtures/somemeta-transform.js'));
    });
  });

  suite('multiple files:', function() {
    test('exclude program', function() {
      assert.ok(!fs.existsSync('out/multi/somemeta-program.js'));
    });

    test('transformation', function() {
      grunt.file.recurse('out/multi/', function(abspath, rootdir, subdir, filename) {
        assert.ok(fs.existsSync(abspath));
        assert.equal(readFile(abspath), readFile('test/fixtures/multi/' + (subdir?subdir+'/':'') + filename));
      });
    });
  });

  suite('update unchanged files:', function() {
    test('file is unchanged', function() {
      assert.ok(fs.existsSync('out/nothing.js'));
      assert.equal(readFile('out/nothing.js'), readFile('test/in/nothing.js'));
    });

    test('file modified date is unchanged', function() {
      assert.ok(fs.existsSync('out/nothing.js'));
      assert.strictEqual(fs.statSync('test/in/nothing.js').mtime.toString(), fs.statSync('out/nothing.js').mtime.toString());
    });
  });
});
