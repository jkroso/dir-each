
var each = require('foreach/async/promise')
  , promisify = require('promisify')
  , fs = require('fs')
  , readDir = promisify(fs.readdir)
  , stat = promisify(fs.stat)
  , join = require('path').join

module.exports = walk

/**
 * iterate over each file in `dir`
 * 
 * @param {String} dir
 * @param {Function} fn
 * @return {Promise} null
 */

function walk(dir, fn){
	return readDir(dir).then(function(names){
		return each(names, function(name){
			var path = join(dir, name)
			return stat(path).then(function(stat){
				if (stat.isFile()) return fn(path)
				if (stat.isDirectory()) return walk(path, fn)
			})
		})
	})
}
