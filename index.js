
var walker = require('./src/walker')
var each = require('foreach/async')
var fs = require('lift-result/fs')

/**
 * iterate over each file in `dir`
 *
 * @param {String} dir
 * @param {Function} fn
 * @return {Result}
 */

module.exports = walker(fs.lstat, each)
module.exports.withSyms = walker(fs.stat, each)