module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                files: {
                    'assets/css/app.css' : 'src/scss/app.scss'
                }
            },
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'assets/css/app.css' : 'src/scss/app.scss'
                }
            }
        },
        watch: {
            hbs: {
                files: [
                    'src/templates/**/*.hbs'
                ],
                tasks: ['includereplace:dev']
            },
            
            css: {
                files: [
                    'src/scss/**/*.scss',
                ],
                tasks: ['sass:dev']
            },
            js: {
                files: [
                    'src/js/**/*.js'
                ],
                tasks: ['concat']
            }
        },

        concat: {
            options: {
                separator: ';'
            },            
            dev: {
                options: {
                    sourceMap: true
                },
                src: [
                    'src/js/**/*.js'
                ],
                dest: 'assets/js/app.js'
            },
            
            dist: {
                options: {
                    sourceMap: false
                },
                src: [
                    'src/js/**/*.js'
                ],
                dest: 'assets/js/app.js'
            }
        },
        
        includereplace: {
            dev: {
                options: {
                    includesDir: 'src/templates/dev-templates/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/templates/',
                        src: [
                            '*.hbs'
                        ],
                        dest: ''
                    }
                ]
            },
            dist: {
                options: {
                    includesDir: 'src/templates/dist-templates/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/templates/',
                        src: [
                            '*.hbs'
                        ],
                        dest: ''
                    }
                ]
            }
        },
        
        clean: {
            default: {
                src: [
                    'assets/css',
                    'assets/images',
                    'assets/js',
                    '*.hbs'
                ]
            },
            
            nonMinifiedFiles: {
                src: [
                    'assets/css/**/*.css',
                    'assets/js/**/*.js',
                    '!assets/css/**/*.min.css',
                    '!assets/js/**/*.min.js'
                ]
            }
        },
        
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: '**',
                        dest: 'assets/images/'
                    }
                ]
            }
        },
        
        cssmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/css',
                        src: '**/*.css',
                        dest: 'assets/css/',
                        ext: '.min.css'
                    }
                ]
            }
        },
        
        uglify: {
            dist: {
                options: {
                    mangle: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/js/',
                        src: '**/*.js',
                        dest: 'assets/js/',
                        ext: '.min.js'
                    }
                ]
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-include-replace');
    
    grunt.registerTask('default',[
        'clean', 
        'copy', 
        'sass:dev', 
        'concat:dev', 
        'includereplace:dev', 
        'watch'
    ]);
    
    grunt.registerTask('dist',[
        'clean', 
        'copy', 
        'sass:dist', 
        'cssmin:dist', 
        'concat:dist', 
        'uglify:dist',
        'clean:nonMinifiedFiles',
        'includereplace:dist'
    ]);
};