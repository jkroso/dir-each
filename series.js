
var each = require('foreach/series')
var walker = require('./src/walker')
var fs = require('lift-result/fs')

module.exports = walker(fs.lstat, each)
module.exports.withSyms = walker(fs.stat, each)