var Iterable = require('./dist/index');

var obj = Iterable({test: true, test2: 'string'})
  .filter(function (value, key, obj) {
    return typeof value === 'boolean'
  })

console.log(obj);
