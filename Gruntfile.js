module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: { 'dist/ember-data-elasticsearch-kit.js': [ 
          'src/elasticsearch-adapter.coffee',
          'src/transforms.coffee',
          'src/query_dsl.coffee',
          'src/mapping_dsl.coffee',
          'src/bulk_dsl.coffee'
        ]}
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');


  grunt.registerTask('default', ['coffee']);
};
