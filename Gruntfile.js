/*global module,require*/
var lrSnippet = require('connect-livereload')();
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var projectConfig = {
        src: '',
        dist: 'dist'
    };

    try {
        projectConfig.src = require('./bower.json').appPath || projectConfig.src;
    } catch (e) {}

    grunt.initConfig({
        config: projectConfig,
        clean: {
            build: '<%= config.dist %>'
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, projectConfig.src),
                            mountFolder(connect, projectConfig.src + 'tests')
                        ];
                    }
                }
            }
        }, less: {
            development: {
                options: {
                    paths: ['css/']
                },
                files: {
                    'css/console.css': 'css/console.less'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: 'css/*.less',
                tasks: ['less']
            },
            js: {
                files: 'js/*.js'
            },
            livereload: {
                files: [
                    '*.html',
                    'js/*.js'
                ]
            }
        }
    });

    grunt.registerTask('server', [
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('build', [
        'less'
    ]);

    grunt.registerTask('default', ['build']);
};
