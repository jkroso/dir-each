
# dir-each

  higher order functions for iterating over files

## Getting Started

_With npm_  

	$ npm install dir-each --save

then in your app:

```js
var each = require('dir-each')
```

## API

  - [each()](#each)

### each(dir:String, fn:Function)

  iterate over each file in `dir` and apply `fn`

```js
var files = 0
each(process.env.HOME, function(path){
  console.log(path)
  files++
}).read(function(){
  console.log('you own %d files', files)
})
```

## Running the tests

```bash
$ npm install
$ make test
```
