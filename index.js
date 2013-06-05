
var each = require('foreach/async')
  , fs = require('promisify/fs')
  , join = require('path').join
  , kids = fs.readdir
  , stat = fs.lstat

module.exports = walk

/**
 * iterate over each file in `dir`
 * 
 * @param {String} dir
 * @param {Function} fn
 * @return {Promise} null
 */

function walk(dir, fn){
	return kids(dir).then(function(names){
		return each(names, function(name){
			var path = join(dir, name)
			return stat(path).then(function(stat){
				if (stat.isFile()) return fn(path)
				if (stat.isDirectory()) return walk(path, fn)
			})
		})
	})
}
