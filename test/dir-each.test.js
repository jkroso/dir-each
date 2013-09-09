
var series = require('../series')
var Result = require('result')
var chai = require('./chai')
var each = require('..')
var fs = require('fs')

describe('dir-each', function(){
	commonProperties(each)
})

describe('series', function(){
	commonProperties(series)

	it('should enumerate one after the other', function(done){
		var files = []
		series(__dirname + '/fixtures', function(path){
			if (files.length) {
				files[files.length - 1].state.should.equal('done')
			}
			var result = new Result
			files.push(result)
			setTimeout(function(){
				result.write(path)
			}, Math.random() * 10)
			return result
		}).then(function(){
			files.should.have.a.lengthOf(5)
			var i = 0
			return series(__dirname + '/fixtures', function(path){
				path.should.equal(files[i++].value)
			})
		}).node(done)
	})
})

function commonProperties(){
	it('should enumerate all files', function(done){
		var paths = []
		each(__dirname+'/fixtures/dir', function(path){
			fs.statSync(path).isFile().should.be.true
			paths.push(path)
		}).then(function(){
			paths.should.have.a.lengthOf(2).and.include(
				__dirname+'/fixtures/dir/1',
				__dirname+'/fixtures/dir/2/3.file'
			)
		}).node(done)
	})

	it('should wait on results before fulfilling', function(done){
		var results = []
		each(__dirname+'/fixtures', function(path){
			var result = new Result
			results.push(result)
			setTimeout(function(){
				result.write()
			}, 0)
			return result
		}).then(function(){
			results.forEach(function(res){
				res.state.should.eql('done')
			})
		}).node(done)
	})
	
	it('should ignore symlinks', function(done){
		var paths = []
		each(__dirname+'/fixtures', function(path){
			paths.push(path)
		}).then(function(){
			paths.should.have.a.lengthOf(5).and.include(
				__dirname+'/fixtures/.dotfile',
				__dirname+'/fixtures/1.js',
				__dirname+'/fixtures/2.js',
				__dirname+'/fixtures/dir/1',
				__dirname+'/fixtures/dir/2/3.file'
			)
		}).node(done)
	})

	describe('syms', function(){
		it('should follow symlinks', function(done){
			var paths = []
			each.withSyms(__dirname+'/fixtures', function(path){
				paths.push(path)
			}).then(function(){
				paths.should.have.a.lengthOf(6).and.include(
					__dirname+'/fixtures/.dotfile',
					__dirname+'/fixtures/target/file',
					__dirname+'/fixtures/1.js',
					__dirname+'/fixtures/2.js',
					__dirname+'/fixtures/dir/1',
					__dirname+'/fixtures/dir/2/3.file'
				)
			}).node(done)
		})
	})
}