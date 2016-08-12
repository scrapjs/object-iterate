'use strict'

const test = require('tape')
const Iterable = require('../dist/index')

test(' `Iterable` should be a function ' , (t) => {
  t.plan(1)
  t.equal(typeof Iterable, 'function')
  t.end()
})

test(' `Iterable` should accept only object ' , (t) => {
  t.plan(4)
  t.ok(Iterable({test: 'test'}))
  t.notOk(Iterable('beep'))
  t.notOk(Iterable([]))
  t.notOk(Iterable(2))
  t.end()
})

test(' `Iterable` should return correct object ' , (t) => {
  t.plan(1)
  t.equal(Iterable({}).toString(), '[object Object]')
  t.end()
})

test(' `Iterable.each` should be defined ' , (t) => {
  t.plan(1)
  t.ok(Iterable({}).each)
  t.end()
})

test(' `Iterable.map` should be defined ' , (t) => {
  t.plan(1)
  t.ok(Iterable({}).map)
  t.end()
})

test(' `Iterable.set` should be defined ' , (t) => {
  t.plan(1)
  t.ok(Iterable({}).set)
  t.end()
})

test(' `Iterable` methods should only iterate on actual props ' , (t) => {
  t.plan(1)
  var l = []

  Iterable({})
    .each((value) => {
      l.push(value)
    })

  Iterable({})
    .map((value) => {
      l.push(value)
    })

  Iterable({})
    .filter((value) => {
      l.push(value)
    })

  t.notOk(l.length)
  t.end()
})

test(' `Iterable.set` should set new prop on object ' , (t) => {
  t.plan(1)
  var obj = Iterable({}).set('boop', true)
  t.ok(obj.boop)
  t.end()
})

test(' `Iterable.kill` should remove existed prop ' , (t) => {
  t.plan(1)
  var obj = Iterable({ beep: true }).kill('beep')
  t.notOk(obj.beep)
  t.end()
})

test(' `Iterable.forceKill` should remove prop and update cache ' , (t) => {
  t.plan(1)
  var obj = Iterable({ beep: true }).forceKill('beep')
  var props = []
  obj.each(function (value, key) {
    push({value: value, key: key})
  })
  t.equal(props.length, 0)
  t.end()
})

test(' `Iterable.returnIterable` should return iterable copy of object', (t) => {
  t.plan(5)
  var iterable = Iterable({name: 'pikachu'}).returnIterable()
  var result = iterable.next()
  t.equal(result.done, false)
  t.equal(result.value.key, 'name')
  t.equal(result.value.value, 'pikachu')
  result = iterable.next()
  t.equal(result.done, true)
  t.equal(result.value, undefined)
  t.end()
})
