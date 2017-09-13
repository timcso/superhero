module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/vendor/jquery/dist/jquery.min.js', 'src/vendor/bootstrap/dist/js/bootstrap.min.js', 'src/vendor/angular/angular.js', 'src/vendor/angular-currency-filter/currencyModule.js', 'src/js/main.js', 'src/js/factory/*.js', 'src/js/controllers/*.js'],
        dest: 'build/js/all.js'
      }
    },
    watch: {
      scripts: {
      files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.jade', 'Gruntfile.js'],
      tasks: ['dev'],
      options: {
        spawn: false,
        }
      }
    },
    clean: ['build/**'],
    copy: {
      main: {
        files: [ {expand: true, cwd: 'src', src: ['**/*.html', 'img/*'], dest: 'build/', filter: 'isFile'},
                 {expand: true, cwd: 'src', src: ['vendor/**'], dest: 'build/', filter: 'isFile'}]
      }
    },
    jshint: {
      options: {
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "undef": true,
        "globals": {
          "jQuery": true,
          "module": true,
          "console": true
        }
      },
      all: ['Gruntfile.js', 'src/js/*.js'],
    },
    imagemin: {
        dynamic: {
            options: {
                optimizationLevel: 7
            },
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'build/img/'
            }]
        }
    },
    cssmin:{
      options:{
          shorthandCompacting: false,
          roundingPrecision: -1
      },
      target:{
        files: {
            'build/css/all.min.css': ['src/vendor/bootstrap/dist/css/bootstrap.min.css', 'src/vendor/bootstrap/dist/css/bootstrap-theme.min.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('dev', ['clean', 'copy', 'uglify', 'cssmin']);
  grunt.registerTask('default', ['watch']);

};
