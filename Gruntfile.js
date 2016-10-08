// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'js/main.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/main.min.js': ['js/modernizr-2.6.2.min.js', 'js/jquery.min.js', 'js/jquery.easing.js',
                        'js/velocity.min.js', 'js/bootstrap.min.js', 'js/jquery.waypoints.min.js', 'js/hoverIntent.js',
                        'js/superfish.js', 'js/pnotify.custom.min.js', 'js/jquery-mask.js', 'node_modules/jquery-validation/dist/jquery.validate.js',
                        'node_modules/easy-autocomplete/dist/jquery.easy-autocomplete.js', 'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                        'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js', 'js/main.js']
                }
            }
        },
        imagemin: {
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'imgs/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
                    dest: 'dist/imgs/'                  // Destination path prefix
                }]
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['index.html'],
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        responsive_images: {
            dev: {
                options: {
                    sizes: [
                        {
                            width: 400
                        },
                        {
                            width: 800
                        }],
                },
                files: [{
                    expand: true,
                    cwd: 'dist/imgs',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg}'],   // Actual patterns to match
                    dest: 'dist/imgs/'
                }]
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [
                        // bootstrap
                        /\.fade/,
                        /\.modal/,
                        '.affix',
                        /\.tooltip/,
                        /\.popover/,
                        /\.collaps/,
                        /\.carousel-inner/,
                        /\.open/,
                        /\.in/,
                        '.visible-lg',
                        '.visible-md',
                        '.visible-sm',
                        '.visible-xs',
                        // Easy autocomplete
                        '.easy-autocomplete',
                        '.easy-autocomplete-container',
                        '.easy-autocomplete-container>ul',
                        '.easy-autocomplete-container>ul>li.selected',
                        '.eac-item'
                    ],
                    ignoreSheets: ['css/style.min.css', 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css']
                },
                files: {
                    'dist/css/style.min.css': ['index.html']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['dist/css/style.min.css', 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css']
                }
            }
        },
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['uncss', 'cssmin'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['js/modernizr-2.6.2.min.js', 'js/jquery.min.js', 'js/jquery.easing.js',
                    'js/velocity.min.js', 'js/bootstrap.min.js', 'js/jquery.waypoints.min.js', 'js/hoverIntent.js',
                    'js/superfish.js', 'js/pnotify.custom.min.js', 'js/main.js'],
                tasks: ['jshint', 'uglify'],
            },
            html: {
                files: ['index.html', 'aula-particular.html'],
                tasks: ['processhtml', 'htmlmin']
            }
        },
        browserSync: {
            bsFiles: {
                src: '**/*.*'
            },
            options: {
                server: {
                    baseDir: "dist/"
                },
                watchTask: true
            }
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'waws-prod-cq1-003.ftp.azurewebsites.windows.net',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'dist/',
                dest: '/site/wwwroot/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['jshint', 'uglify', 'htmlmin', 'uncss', 'cssmin', 'browserSync', 'watch']);
    grunt.registerTask('deploy', ['ftp-deploy']);


};