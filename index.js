'use strict';
var formatter = require('typescript-formatter');
var typescript = require('typescript');
var loaderUtils = require('loader-utils');

var loadDefaultOptions = function loadDefaultOptions(options){
  options.replace = options.replace !== false;
  options.tsconfig = options.tsconfig !== false;
  options.tslint = options.tslint !== false;
  options.editorconfig = options.editorconfig !== false;
  options.tsfmt = options.tsfmt !== false;
};

module.exports = function (source, map) {
  var fileName = this.resourcePath,
    formattedFile, callback, options;

  this.cacheable();

  callback = this.async();
  options = loaderUtils.parseQuery(this.query);

  loadDefaultOptions(options);

  formatter.processFiles([fileName], options)
    .then(function (result) {
      formattedFile = result[fileName];
      callback(null, formattedFile.dest, map);
    })
    .catch(function (error) {
      debugger;
      callback(error);
    });
};