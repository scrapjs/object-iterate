var objective = require('./dist/index');

var t = objective({test: 'test'})
  .each(function (value, _,  obj) {
    console.log(obj)
  })
  .map(function (value, _, obj) {
    return 'hacked'
  })


console.log(t.each(function (value) {
  console.log(value)
}).filter(function (value) {
  return value !== 'hacked'
}))
