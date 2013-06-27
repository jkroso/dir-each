
var decorate = require('when/decorate')
  , each = require('foreach/series')
  , fs = require('resultify/fs')
  , join = require('path').join
  , kids = fs.readdir
  , stat = fs.lstat

module.exports = decorate(walk)
module.exports.plain = walk

/**
 * iterate over each file in `dir`
 * 
 * @param {String} dir
 * @param {Function} fn
 * @return {Result}
 */

function walk(dir, fn){
	return each(kids(dir), function(name){
		var path = join(dir, name)
		return stat(path).then(function(stat){
			if (stat.isFile()) return fn(path)
			if (stat.isDirectory()) return walk(path, fn)
		})
	})
}