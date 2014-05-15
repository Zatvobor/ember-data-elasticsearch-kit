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

    connect: {
      server: {
        options: {
          base: '.',
          port: 9997
        }
      }
    },

    watch: {
      scripts: {
        files: ['spec/*.coffee', 'spec/index.html'],
        tasks: ['rerun:dev']
      }
    },

    rerun: {
      dev: {
        options: {
          tasks: ['dev']
        }
      }
    },

    clean: {
      bower: [
        'bower_components'
      ],
      node: [
        'node_modules'
      ],
      js: [
        'spec/ember-data-elasticsearch-kit_spec.js',
        'dist/ember-data-elasticsearch-kit.js',
        'dist/ember-data-elasticsearch-kit.min.js'
      ]
    },

    qunit: {
      local: {
        options: {
          urls: ['http://localhost:9997/spec/index.html']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-rerun');
  
  grunt.registerTask('build', ['coffee', 'uglify']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('dev', ['build', 'connect:server', 'watch']);
  grunt.registerTask('test', ['build', 'connect:server', 'qunit']);

};
