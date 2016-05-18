/*
 * grunt-solemn
 * https://github.com/willynilly/grunt-solemn
 *
 * Copyright (c) 2016 Will Riley
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        solemn: {
            default_options: {
                options: {},
                files: {
                    'css': ['test/fixtures/*.css'],
                    'js': ['test/fixtures/*.js']
                },
            },
            custom_options: {
                options: {
                    exitOnViolation: false,
                    dictionaries: ['test/fixtures/dictionary*.json']
                },
                files: {
                    'css': ['test/fixtures/test.css'],
                    'js': ['test/fixtures/test.js']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'solemn', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
