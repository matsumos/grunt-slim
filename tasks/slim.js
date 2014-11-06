/*
 * grunt-slim
 * https://github.com/matsumos/grunt-slim
 *
 * Copyright (c) 2012-2014 Sindre Sorhus, Keiichiro Matsumoto, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var dargs = require('dargs');
  var async     = require('async');

  grunt.registerMultiTask('slim', 'Compile Slim to HTML', function() {
    var options = this.options();
    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');
    process.stdout.setMaxListeners(0);
    process.stderr.setMaxListeners(0);

    async.each(this.files, function(f, next) {
      var bundleExec = options.bundleExec;
      if (bundleExec) {
        delete options.bundleExec;
      }
      var args = [f.dest, '--stdin'].concat(dargs(options));

      var max = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      // support for variables
      var variables = "";

      grunt.util._.forEach(options.variables, function(val,key){
        variables = variables + '- ' + key + '="' + val + '"' + "\n";
      });

      max = variables + max;

      // Make sure grunt creates the destination folders
      grunt.file.write(f.dest, '');

      var win32exe = 'slimrb.bat';
      var nixexe = 'slimrb';
      var exeFile = process.platform === 'win32' ? win32exe : nixexe;

      if (bundleExec) {
        args.unshift(exeFile);
        args.unshift('exec');
        exeFile = 'bundle';
      }

      var slim = grunt.util.spawn({
        cmd: exeFile,
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have Ruby and Slim installed and in your PATH for\n' +
            'this task to work. More info:\n' +
            'https://github.com/matsumos/grunt-slim'
          );
        }
        next(error);
      });

      slim.stdin.write(new Buffer(max));
      slim.stdin.end();
      slim.stdout.pipe(process.stdout);
      slim.stderr.pipe(process.stderr);
    }, cb);
  });
};
