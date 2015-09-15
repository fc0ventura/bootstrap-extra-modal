module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['src/js/<%= pkg.name %>.js', 'src/js/refactor.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: ['src/css/*.scss', 'src/css/**/*.scss'],
        tasks: ['sass']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> by Vasco Gaspar */\n/*! Last Updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/*.js',
        dest: 'dist/js/*.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/css/<%= pkg.name %>.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Comiple SCSS Files to CSS
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Whatch for file changes and run default tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass']);

};
