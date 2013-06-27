
var decorate = require('when/decorate')
  , kids = require('resultify/fs').readdir
  , join = require('path').join

/**
 * create a walker with dependencies injected
 * 
 * @param {Function} stat
 * @param {Function} each
 * @return {Function}
 */

module.exports = function(stat, each){
	var ƒ = decorate(walkDir)
	ƒ.plain = walkDir
	return ƒ
	function walkDir(dir, fn){
		return each(kids(dir), function(name){
			var path = join(dir, name)
			return stat(path).then(function(stat){
				if (stat.isFile()) return fn(path)
				if (stat.isDirectory()) return walkDir(path, fn)
			})
		})
	}
}