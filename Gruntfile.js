module.exports = function (grunt) {

  //config the things
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true
      },
      'default': {
        files: {
          'public/build/js/master.min.js' : [
            'public/js/app/reader.js',
            'public/js/app/entities/**/*.js'
            'public/js/app/select_module/**/*.js',
            'public/js/app/read_module/**/*.js',
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['default'],
        options: {
          debounceDelay: 500,
          reload: true
        }
      }
    },
    jsHint: {}
  });

  //load the things
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //register the things
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('observe', ['watch']);


};
