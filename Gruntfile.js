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
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['css/animate.css', 'css/hover-min.css', 'css/icomoon.css',
                        'css/bootstrap.css', 'css/superfish.css', 'css/pnotify.custom.min.css', 'node_modules/mdi/css/materialdesignicons.css',
                        'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css', 'css/style.css']

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
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                 
                    'dist/index.html': 'index.html',
                    'dist/aula-particular.html': 'aula-particular.html'     
                }
            }
        },
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin'],
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
                tasks: ['htmlmin']
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'htmlmin', 'watch']);


};