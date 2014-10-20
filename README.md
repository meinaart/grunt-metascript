# grunt-metascript [![Build Status](https://travis-ci.org/meinaart/grunt-metascript.svg?branch=master)](https://travis-ci.org/meinaart/grunt-metascript)

Grunt wrapper for [MetaScript](https://github.com/dcodeIO/MetaScript)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-metascript --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-metascript');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation

```javascript
grunt.initConfig({
  metascript: {
    program: {
      options: {
        mode: 'program', /* can be either "program" or "transform" */
        scope: { /* object with variables required in MetaScript scope */
          WHAT: true
        }
      },
      src: 'test/in/somemeta.js',
      dest: 'out/somemeta-program.js',
    }
  },
});
grunt.loadNpmTasks('grunt-metascript');
```

Configuration follow the multi-task standard configuration format: http://gruntjs.com/configuring-tasks

```javascript
grunt.initConfig({
  metascript: {
    options: {
      mode: 'program',
      scope: { WHAT: true }
    },
    expand: true,
    cwd: 'src/',
    src: '**/*.js',
    dest: 'dist/'
  }
});
grunt.loadNpmTasks('grunt-metascript');
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## License
Copyright (c) 2014 Meinaart van Straalen
Licensed under the MIT license.
