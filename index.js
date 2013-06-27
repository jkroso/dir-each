
var each = require('foreach/async')
  , walker = require('./src/walker')
  , fs = require('resultify/fs')

/**
 * iterate over each file in `dir`
 * 
 * @param {String} dir
 * @param {Function} fn
 * @return {Result}
 */

module.exports = walker(fs.lstat, each)
module.exports.withSyms = walker(fs.stat, each)