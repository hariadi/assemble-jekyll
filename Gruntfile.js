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

    // Project metadata
    pkg   : grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,
    site  : grunt.file.readYAML('_config.yml'),
    pages : grunt.file.readJSON('src/data/pages.json'),

    config: {
      src: 'src',
      dist: '<%= site.dest %>',
      bootstrap: '<%= vendor %>/bootstrap/less',
      jquery: '<%= vendor %>/jquery',
      holder: '<%= vendor %>/holderjs',
      highlight: '<%= vendor %>/highlightjs'
    },

    /**
     * Lint JavaScript
     */
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Compile LESS to CSS
     */
    less: {
      options: {
        paths: ['<%= config.bootstrap %>', '<%= config.src %>/theme/components'],
      },
      bootstrap: {
        src: ['<%= config.src %>/theme/theme.less'],
        dest: '<%= assemble.options.assets %>/css/blog.css'
      }
    },

    /**
     * Build HTML from templates and data
     */
    assemble: {
      options: {
        flatten: true,

        // Custom property for _config.yml
        site: '<%= site %>',

        // Extensions
        helpers: ['helper-prettify', 'helper-compose', '<%= config.src %>/templates/helpers/*.js'],
        permalinks: {
          preset: 'pretty'
        },
        // Templates and data
        data: ['data/**/*.{json,yml}'],
        partials: ['<%= config.src %>/templates/includes/*.hbs'],
        layoutdir: '<%= config.src %>/templates/layouts',
        layout: 'default.hbs',

        // Site variables
        assets: '<%= site.dest %>/assets',
        root: '<%= site.dest %>',
      },
      // Generate the main pages of the site.
      site: {
        files: {
          '<%= site.dest %>/': ['<%= config.src %>/templates/*.hbs']
        }
      },
      // Generate posts from "./data/pages.json"
      blog: {
        options: {
          layout: 'blog.hbs',
          engine: 'handlebars'
        },
        files: {
          '<%= site.dest %>/blog/': ['templates/list.hbs', '<%= config.src %>/posts/*.md']
        }
      }
    },

    /**
     * Copy vendor dist to assets
     */
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'vendor/bootstrap/dist/',
        src: [
          'js/*',
          'fonts/*'],
        dest: '<%= assemble.options.assets %>/'
      },
      bootstrapcss: {
        expand: true,
        cwd: 'vendor/bootstrap/assets/',
        src: [
          'js/*',
          'fonts/*'],
        dest: '<%= assemble.options.assets %>/'
      },
      jquery: {
        src: '<%= config.jquery %>/jquery.min.js',
        dest: '<%= assemble.options.assets %>/js/jquery.js'
      },
      holder: {
        src: '<%= config.holder %>/holder.js',
        dest: '<%= assemble.options.assets %>/js/holder.js'
      },
      highlight: {
        src: '<%= config.highlight %>/highlight.pack.js',
        dest: '<%= assemble.options.assets %>/js/highlight.js'
      },
    },

    /**
     * Before generating any new files,
     * clean out files from previous build.
     */
    clean: {
      example: ['<%= site.dest %>/**/*.html']
    },

    /**
     * Run predefined tasks whenever watched file
     * patterns are added, changed or deleted.
     */
    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit']
      },
      design: {
        files: ['Gruntfile.js', '<%= less.options.paths %>/*.less', '<%= config.src %>/templates/**/*.hbs'],
        tasks: ['design']
      }
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');


  // Build HTML, compile LESS and watch for changes.
  grunt.registerTask('design', ['clean', 'assemble', 'less:bootstrap', 'watch:design', 'connect']);

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'copy', 'assemble']);
};
