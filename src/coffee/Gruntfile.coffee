###
* assemble-jekyll
* https://github.com/hariadi/
*
* Copyright (c) 2013 Hariadi Hinta
* Licensed under the MIT license.
###
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    # conf: grunt.file.readYAML('config/config.yml'), // uncomment if you want use YAML as config file
    jshint:
      options:
        jshintrc: ".jshintrc"

      globals:
        jQuery: true

      gruntfile: ["Gruntfile.js"]
      bootstrap:
        options:
          jshintrc: "component/js/.jshintrc"

        files:
          src: ["component/js/*.js"]


    # Compile LESS with grunt-contrib-less
    less:
      development:
        files: [
          "src/assets/css/assemble.css": "component/assemble/theme.less"
        ,
          "src/assets/css/bootstrap.css": "component/less/bootstrap.less"
        ]

      production:
        options:
          yuicompress: true

        files:
          "src/assets/css/assemble.min.css": "component/assemble/theme.less"


    # grunt-uglify don't have multi target per source
    uglify:
      development:
        options:
          banner: "/* Build: <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
          beautify: true
          preserveComments: "all"

        files:
          "src/assets/js/bootstrap.js": ["component/js/bootstrap-transition.js", "component/js/bootstrap-alert.js", "component/js/bootstrap-button.js", "component/js/bootstrap-carousel.js", "component/js/bootstrap-collapse.js", "component/js/bootstrap-dropdown.js", "component/js/bootstrap-modal.js", "component/js/bootstrap-tooltip.js", "component/js/bootstrap-popover.js", "component/js/bootstrap-scrollspy.js", "component/js/bootstrap-tab.js", "component/js/bootstrap-typeahead.js", "component/js/bootstrap-affix.js"]

      production:
        options:
          banner: "/**\n" + " * Bootstrap.js v3.0.0 by @fat & @mdo\n" + " * Copyright <%= grunt.template.today(\"yyyy\") %> Twitter, Inc.\n" + " * http://www.apache.org/licenses/LICENSE-2.0.txt\n" + " * \n" + " * Build: <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + " */\n"
          compress:
            global_defs:
              DEBUG: false

            dead_code: true

        files:
          "src/assets/js/bootstrap.min.js": ["component/js/bootstrap-transition.js", "component/js/bootstrap-alert.js", "component/js/bootstrap-button.js", "component/js/bootstrap-carousel.js", "component/js/bootstrap-collapse.js", "component/js/bootstrap-dropdown.js", "component/js/bootstrap-modal.js", "component/js/bootstrap-tooltip.js", "component/js/bootstrap-popover.js", "component/js/bootstrap-scrollspy.js", "component/js/bootstrap-tab.js", "component/js/bootstrap-typeahead.js", "component/js/bootstrap-affix.js"]


    # Site generator
    assemble:
      options: grunt.file.readYAML("config/site.yml")
      pages:
        files:
          "dist/": ["src/templates/pages/*.hbs"]
          "dist/_includes/": ["src/templates/pages/_includes/*.hbs"]
          "dist/_layouts/": ["src/templates/pages/_layouts/*.hbs"]

    clean:
      assemble:
        src: ["dist/**/*.html", "dist/assets"]

    # Copy compiled/minified assets to dist
    copy:
      font:
        files: [
          expand: true
          cwd: "component/"
          src: ["fonts/**"]
          dest: "src/assets/"
        ,
          expand: true
          cwd: "src/"
          src: ["assets/**"]
          dest: "dist/"
        ]

    coffee:
      compile:
        files:
          "Gruntfile.js": "src/coffee/Gruntfile.coffee"

    # Release management
    release:
      options:
        bump: true
        add: false
        commit: false
        tag: false
        push: false
        pushTags: false
        npm: false


  # Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks "assemble"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-release"

  ###
  * assemble-jekyll task
  * 1. jshint
  * 2. Compile LESS to CSS {developmen|production}
  * 3. uglifyjs {developmen|production}
  * 4. Assemble [clean,assemble]
  * 5. Release {major|minor|patch}
  * 6. Copy bootstrap component -> src/assets
  ###
  grunt.registerTask "default", ["jshint", "less", "uglify", "clean", "assemble", "copy"]
