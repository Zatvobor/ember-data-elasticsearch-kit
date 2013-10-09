module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: { 
          'dist/ember-data-elasticsearch-kit.js': [ 
            'src/ember-data-elasticsearch-kit.coffee',
            'src/elasticsearch-adapter.coffee',
            'src/transforms.coffee',
            'src/query_dsl.coffee',
            'src/mapping_dsl.coffee',
            'src/bulk_dsl.coffee'
          ],

          'spec/ember-data-elasticsearch-kit_spec.js': [
            'spec/env.coffee',
            'spec/*.coffee'
          ]
        }
      }
    },

    uglify: {
      options: { mangle: false, compress: false },

      dist: {
        src: 'dist/ember-data-elasticsearch-kit.js',
        dest: 'dist/ember-data-elasticsearch-kit.min.js'
      }
    },

    jasmine: {
      pivotal: {
        src: [
          'vendor/assets/javascripts/jquery.js',
          'vendor/assets/javascripts/handlebars.js',
          'vendor/assets/javascripts/ember.js',
          'vendor/assets/javascripts/ember-data.js',

          'dist/ember-data-elasticsearch-kit.js'
        ],

        options: {
          specs: 'spec/ember-data-elasticsearch-kit_spec.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  grunt.registerTask('default', ['coffee', 'uglify']);
  grunt.registerTask('spec', ['coffee', 'jasmine:pivotal']);
};
