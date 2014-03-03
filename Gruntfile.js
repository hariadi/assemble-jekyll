/*
 * Generated on 2014-02-10
 * generator-assemble v0.4.8
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: grunt.file.readYAML('_config.yml'),

    watch: {
      assemble: {
        files: ['_{posts,includes,layouts}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dest %>/{,*/}*.html',
          '<%= config.dest %>/assets/{,*/}*.css',
          '<%= config.dest %>/assets/{,*/}*.js',
          '<%= config.dest %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dest %>'
          ]
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%= config.dest %>/assets',
        // after set this, layouts may be defined using only the name of the layout.
        layoutdir: '_layouts',
        // specify the extension to use for layouts, enabling layouts defined without an extension
        layoutext: '.hbs',
        // just call layout without extension
        layout: 'default',
        // include all partial with extension .hbs
        partials: '_includes/*.hbs',
        // npm module name or path to custom plugin, wildcard patterns may also be used
        plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
      },
      pages: {
        files: {
          '<%= config.dest %>/': ['_pages/*.hbs']
        }
      },
      blog: {
        options: {
          engine: 'handlebars',
          permalinks: {
            //structure: ':category',
            preset: 'pretty',
            filename: true
          }
        },
        files: {
          '<%= config.dest %>/blog/': ['_posts/*.md']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dest %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
