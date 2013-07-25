/*
* assemble-jekyll
* https://github.com/hariadi/
*
* Copyright (c) 2013 Hariadi Hinta
* Licensed under the MIT license.
*/


(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      jshint: {
        options: {
          jshintrc: ".jshintrc"
        },
        gruntfile: ["Gruntfile.js"],
        bootstrap: {
          options: {
            jshintrc: "component/js/.jshintrc"
          },
          files: {
            src: ["component/js/*.js"]
          }
        }
      },
      less: {
        development: {
          files: [
            {
              "src/assets/css/assemble.css": "component/assemble/theme.less"
            }, {
              "src/assets/css/bootstrap.css": "component/less/bootstrap.less"
            }
          ]
        },
        production: {
          options: {
            yuicompress: true
          },
          files: {
            "src/assets/css/assemble.min.css": "component/assemble/theme.less"
          }
        }
      },

      concat: {
        options: {
          stripBanners: false
        },
        bootstrap: {
          src: ['component/js/*.js'],
          dest: 'src/assets/js/bootstrap.js'
        }
      },

      uglify: {
        options: {
          banner: "/**\n" + " * Bootstrap.js v3.0.0 by @fat & @mdo\n" + " * Copyright <%= grunt.template.today(\"yyyy\") %> Twitter, Inc.\n" + " * http://www.apache.org/licenses/LICENSE-2.0.txt\n" + " * \n" + " * Build: <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + " */\n",
          compress: {
            global_defs: {
              DEBUG: false
            },
            dead_code: true
          }
        },
        files: {
          "src/assets/js/bootstrap.min.js": ["<%= concat.bootstrap.dest %>"]
        }
      },
      assemble: {
        options: grunt.file.readYAML("config/site.yml"),
        pages: {
          files: {
            "dist/": ["src/templates/pages/*.hbs"],
            "dist/_includes/": ["src/templates/pages/_includes/*.hbs"],
            "dist/_layouts/": ["src/templates/pages/_layouts/*.hbs"]
          }
        }
      },
      clean: {
        assemble: {
          src: ["dist/**/*.html", "dist/assets"]
        }
      },
      copy: {
        font: {
          files: [
            {
              expand: true,
              cwd: "component/",
              src: ["fonts/**"],
              dest: "src/assets/"
            }, {
              expand: true,
              cwd: "src/",
              src: ["assets/**"],
              dest: "dist/"
            }
          ]
        }
      }
    });
    grunt.loadNpmTasks("assemble");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    /*
    * assemble-jekyll task
    * 1. jshint
    * 2. Compile LESS to CSS
    * 3. uglifyjs
    * 4. Assemble [clean,assemble]
    * 6. Copy bootstrap component -> src/assets
    */

    return grunt.registerTask("default", ["jshint", "less", "uglify", "clean", "assemble", "copy"]);
  };

}).call(this);
