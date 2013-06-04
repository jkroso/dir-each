
var chai = require('./chai')
  , each = require('..')
  , fs = require('fs')

var pending = 0
function DummyPromise(){
	pending++
}
DummyPromise.prototype.then = function(onValue, onError){
	setTimeout(function(){
		--pending
		onValue()
	})
}

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

	it('should wait on promises before fulfilling', function (done) {
		each(__dirname+'/fixtures', function(path){
			return new DummyPromise
		}).read(function(){
			pending.should.equal(0)
			done()
		})
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
