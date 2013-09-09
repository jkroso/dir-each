
var kids = require('lift-result/fs').readdir
var lift = require('lift-result')
var join = require('path').join

/**
 * create a walker with dependencies injected
 *
 * @param {Function} stat
 * @param {Function} each
 * @return {Function}
 */

module.exports = function(stat, each){
	return lift(function walkDir(dir, fn){
		return each(kids(dir), function(name){
			var path = join(dir, name)
			return stat(path).then(function(stat){
				if (stat.isFile()) return fn(path)
				if (stat.isDirectory()) return walkDir(path, fn)
			})
		})
	})
}