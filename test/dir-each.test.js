
var chai = require('./chai')
  , Result = require('result')
  , each = require('..')
  , fs = require('fs')

describe('dir-each', function(){
	it('should enumerate all files', function(done){
		var paths = []
		each(__dirname+'/fixtures/dir', function(path){
			fs.statSync(path).isFile().should.be.true
			paths.push(path)
		}).read(function(){
			paths.should.have.a.lengthOf(2).and.include(
				__dirname+'/fixtures/dir/1',
				__dirname+'/fixtures/dir/2/3.file'
			)
			done()
		})
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
		}).read(function(){
			paths.should.have.a.lengthOf(5).and.include(
				__dirname+'/fixtures/.dotfile',
				__dirname+'/fixtures/1.js',
				__dirname+'/fixtures/2.js',
				__dirname+'/fixtures/dir/1',
				__dirname+'/fixtures/dir/2/3.file'
			)
			done()
		})
	})
})
