module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    }
  });

  grunt.registerTask('default', ['copy:all']);
};
