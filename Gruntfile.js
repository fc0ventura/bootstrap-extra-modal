module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['src/js/<%= pkg.name %>.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: ['src/css/*.css'],
        tasks: ['postcss']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> by Vasco Gaspar */\n/*! Last Updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        parser: require('postcss-scss'),
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')(), // minify the result
          require('precss')() // SASS like syntax
        ]
      },
      dist: {
        src: 'src/css/*.css',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // PostCSS Task
  grunt.loadNpmTasks('grunt-postcss');

  // Whatch for file changes and run default tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify'], ['postcss']);

};
