/*
 * grunt-solemn
 * https://github.com/willynilly/grunt-solemn
 *
 * Copyright (c) 2016 Will Riley
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var SolemnJS = require('solemn-js');
var SolemnCSS = require('solemn-css');

var solemnjs = new SolemnJS();
var solemncss = new SolemnCSS();

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('solemn', 'A grunt task for detecting inappropriate language in your code.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            exitOnViolation: false,
        });

        if (options.dictionaries) {
            var d = solemncss.getDictionary();
            var shouldAppendWords = true;
            var shouldAppendCategoriesForWords = true;
            options.dictionaries = grunt.file.expand(options.dictionaries);
            _.forEach(options.dictionaries, function(jsonFilePath) {
                d.loadWords(jsonFilePath, shouldAppendWords, shouldAppendCategoriesForWords);
            });
            solemncss.setDictionary(d);
            solemnjs.setDictionary(d);
        }

        grunt.log.writeln('Solemn Testing Started');
        var violations = [];

        // Iterate over all specified file groups.
        var shouldExit = this.files.some(function(f) {
            var fileType = f.dest;
            var filepaths = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            var shouldExit = filepaths.some(function(filepath) {
                violations = violations.concat(getViolationsForFile(fileType, filepath));
                if (options.exitOnViolation && violations.length > 0) {
                    grunt.log.error(violations[0]);
                    return true;
                }
                return false;
            });

            return shouldExit;

        });

        if (shouldExit) {
            return false;
        }

        violations.forEach(function(v) {
            grunt.log.error(v);
        });

        if (violations.length === 0) {
            grunt.log.writeln('No violations found.');
        }
        grunt.log.writeln('Solemn Testing Completed');

    });

    function getViolationsForFile(fileType, filepath) {
        var violations = [];
        if (fileType === 'css') {
            violations = getViolationsForCSSFile(filepath);
        } else if (fileType === 'js') {
            violations = getViolationsForJSFile(filepath);
        }
        return violations;
    }

    function getViolationsForCSSFile(filepath) {
        var violations = solemncss.detect(filepath);
        violations = violations.map(function(v) {
            return solemncss.formatViolation(v);
        });
        return violations;
    }

    function getViolationsForJSFile(filepath) {
        var violations = solemnjs.detect(filepath);
        violations = violations.map(function(v) {
            return solemnjs.formatViolation(v);
        });
        return violations;
    }

};
