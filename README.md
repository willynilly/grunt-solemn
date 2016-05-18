# grunt-solemn

> A grunt task for detecting inappropriate language in your code.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-solemn --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-solemn');
```

## The "solemn" task

### Overview
In your project's Gruntfile, add a section named `solemn` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  solemn: {
    options: {
    },
    files: {
      'css': ['styles/*.css'],
      'js': ['scripts/*.js']
    },
  },
});
```

### Options

#### options.dictionaries
Type: `array`
Default value: `[]`

An array value that includes a list of paths for custom dictionaries.  Each dictionary is a JSON file with the following format:

```js
{
  "word1": ["category1", "category3"],
  "word2": ["category2"],
  "word3": ["category1"]
  "word4": ["category2", "category3", "category4"]
}
```

Every word must have at least one category.  If multiple dictionaries are specified, words and their categories are merged.  

#### options.exitOnViolation
Type: `Boolean`
Default value: `false`

A boolean value that is used to determine if grunt should exit if it finds a violation.



### Usage Examples

#### Default Options

```js
grunt.initConfig({
  solemn: {
    options: {},
    files: {
      'css': ['styles/*.css'],
      'js': ['scripts/*.js']
    },
  },
});
```

#### Custom Options

```js
grunt.initConfig({
  solemn: {
    options: {
      exitOnViolation: true,
      dictionaries: ['dictionary1.json', 'dictionary2.json']
    },
    files: {
      'css': ['styles/*.css'],
      'js': ['scripts/*.js']
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
