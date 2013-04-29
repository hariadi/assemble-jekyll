/*
 * assemble-jekyll
 * https://github.com/hariadi/
 *
 * Copyright (c) 2013 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Release management
    release: {
      options: {
        bump: true,
        add: true,
        commit: true,
        tag: false,
        push: false,
        pushTags: false,
        npm: false
      }
    },
    
    // Site generator
    assemble: {
      options: grunt.file.readYAML('config/site.yml'),
      pages: {
        files: {
          'dist/': ['src/templates/pages/*.hbs'],
          'dist/_includes/': ['src/templates/pages/_includes/*.hbs'],
          'dist/_layouts/': ['src/templates/pages/_layouts/*.hbs']
        }        
      }
    },

    // Before generating any new files, 
    // remove any previously-created files.
    clean: {
      dest: {
        src: [ 'dist/**/*.html' ]
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-release');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
