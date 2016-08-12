const Iterable = (obj) => {
  const isobject =
  (obj) => (typeof obj === 'object' && ({}).toString.call(obj) === '[object Object]')

  if (!isobject(obj)) return

  var cache = Object.keys(obj)
  var l = cache.length

  function each (cb) {
    if (!l) return
    cache.forEach((k) => {
      cb(obj[k], k, obj)
    })
    return obj
  }

  function map (cb) {
    if (!l) return
    return Iterable(cache.reduce((acc, k) => {
      acc[k] = cb(obj[k], k, o) || obj[k]
      return acc
    }, {}))
  }

  function filter (cb) {
    if (!l) return
    return Iterable(cache.reduce((acc, k) => {
      if (cb(obj[k], k, o))
        acc[k] = obj[k]
      return acc
    }, {}))
  }

  function updateCache (key) {
    cache.push(key)
    l = cache.length
  }

  function set (k, v) {
    updateCache(k)
    obj[k] = v
    return obj
  }

  function kill (prop) {
    if (!l) return
    if (!(prop in obj)) return
    delete obj[prop]
    return obj
  }

  function force () {
    cache = Object.keys(obj)
    l = cache.length
    return obj
  }

  function forceKill (prop) {
    kill(prop)
    return force()
  }

  function returnIterable () {
    var keys = cache.slice()
    return {
      next: () => {
        var key = keys.splice(0, 1)[0]
        return (key)
          ? {done: false, value: {key, value: obj[key]}}
          : {done: true, value: undefined}
      }
    }
  }

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map },
    filter: { value: filter },
    force: { value: force },
    kill: { value: kill },
    forceKill: { value: forceKill },
    returnIterable: {value: returnIterable}
  })

  return obj
}

module.exports = Iterable
