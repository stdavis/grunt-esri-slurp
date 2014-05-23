/*
 * slurp-esri
 * github.com/steveoh/slurp-esri
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'src']
    },
    esri_slurp: {
      options: {
        version: '3.8'
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        pushTo: 'origin',
        commit: true
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-bump');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'esri_slurp']);

  grunt.registerTask('travis', ['jshint', 'esri_slurp', 'nodeunit']);
};