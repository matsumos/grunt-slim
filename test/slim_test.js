var grunt = require('grunt');

exports.slim = {
  compile: function(test) {
    'use strict';
    test.expect(2);

    var slim = grunt.file.read('tmp/slim.html');
    var expected = grunt.file.read('test/expected/compile.html');
    test.equal(slim, expected, 'should compile Slim to HTML');

    var slimPretty = grunt.file.read('tmp/slim-pretty.html');
    var expectedPretty = grunt.file.read('test/expected/compile-pretty.html');
    test.equal(slimPretty, expectedPretty, 'should compile Slim to pretty HTML');

    test.done();
  }
};
