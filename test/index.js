var test = require('tape');
var ob = require('../dist/index');

test(' `ob` should be a function ' , function  (t) {
  t.plan(1)
  t.equal(typeof ob, 'function')
  t.end()
})

test(' `ob` should accept only object ' , function (t) {
  t.plan(4)
  t.ok(ob({test: 'test'}))
  t.notOk(ob('beep'))
  t.notOk(ob([]))
  t.notOk(ob(2))
  t.end()
})

test(' `ob` should return correct object ' , function (t) {
  t.plan(1)
  t.equal(ob({}).toString(), '[object Object]')
  t.end()
})

test(' `ob.each` should be defined ' , function (t) {
  t.plan(1)
  t.ok(ob({}).each)
  t.end()
})

test(' `ob.map` should be defined ' , function (t) {
  t.plan(1)
  t.ok(ob({}).map)
  t.end()
})

test(' `ob.set` should be defined ' , function (t) {
  t.plan(1)
  t.ok(ob({}).set)
  t.end()
})

test(' `ob` methods should only iterate on actual props ' , function (t) {
  t.plan(1)
  var l = []

  ob({})
    .each(function (value) {
      l.push(value)
    })

  ob({})
    .map(function (value) {
      l.push(value)
    })

  t.notOk(l.length)
  t.end()
})



