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
    
    jshint: {
      options: {
        jshintrc: 'components/js/.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'components/js/*.js'
      ]
    },
    
    /*
    jshint: {
      options: {
        jshintrc: 'components/js/.jshintrc'
      },
      beforeconcat: ['Gruntfile.js', 'components/js/*.js'],
      afterconcat: ['src/assets/js/*.js']
    },*/
    
    // Compile LESS with grunt-contrib-less
    less: {
      development: {
        files: {
          "src/assets/css/bootstrap.css": "components/less/bootstrap.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "src/assets/css/bootstrap.min.css": "components/less/bootstrap.less"
        }
      }
    },
    
    uglify: {
      development: {
        options: {
          banner: 
          '/* Build: <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: true,
          preserveComments: 'all'
        },
        files: {
          'src/assets/js/bootstrap.js': [
            'components/js/bootstrap-transition.js',
            'components/js/bootstrap-alert.js',
            'components/js/bootstrap-button.js',
            'components/js/bootstrap-carousel.js',
            'components/js/bootstrap-collapse.js',
            'components/js/bootstrap-dropdown.js',
            'components/js/bootstrap-modal.js',
            'components/js/bootstrap-tooltip.js',
            'components/js/bootstrap-popover.js',
            'components/js/bootstrap-scrollspy.js',
            'components/js/bootstrap-tab.js',
            'components/js/bootstrap-typeahead.js',
            'components/js/bootstrap-affix.js'
          ]
        }
      },
      production: {
        options: {
           banner: 
          '/**\n' +
          ' * Bootstrap.js v3.0.0 by @fat & @mdo\n' +
          ' * Copyright <%= grunt.template.today("yyyy") %> Twitter, Inc.\n' +
          ' * http://www.apache.org/licenses/LICENSE-2.0.txt\n' +
          ' * \n' +
          ' * Build: <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' */\n',
          compress: {
            global_defs: {
              "DEBUG": false
            },
            dead_code: true
          }
        },
        files: {
          'src/assets/js/bootstrap.min.js': [
            'components/js/bootstrap-transition.js',
            'components/js/bootstrap-alert.js',
            'components/js/bootstrap-button.js',
            'components/js/bootstrap-carousel.js',
            'components/js/bootstrap-collapse.js',
            'components/js/bootstrap-dropdown.js',
            'components/js/bootstrap-modal.js',
            'components/js/bootstrap-tooltip.js',
            'components/js/bootstrap-popover.js',
            'components/js/bootstrap-scrollspy.js',
            'components/js/bootstrap-tab.js',
            'components/js/bootstrap-typeahead.js',
            'components/js/bootstrap-affix.js'
          ]
        }
      }
    },
    
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
        src: [ 'dist/**/*.html', 'dist/assets' ]
      }
    },
    
    // Configuration to be run (and then tested).
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, cwd: 'src/', src: ['assets/**'], dest: 'dist/'}
        ]
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-release');
  

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
