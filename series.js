
var each = require('foreach/series')
  , walker = require('./src/walker')
  , fs = require('resultify/fs')

module.exports = walker(fs.lstat, each)
module.exports.withSyms = walker(fs.stat, each)