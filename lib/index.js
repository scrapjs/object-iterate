const Iterable = (obj) => {
  const isobject =
    (obj) =>
      typeof obj === 'object' && ({}).toString.call(obj) === '[object Object]'

  if (!isobject(obj)) return

  var cache = Object.keys(obj)
  var l = cache.length

  var each =
    (cb) => {
      if (!l) return

      cache.forEach((k) => {
        cb(obj[k], k, obj)
      })

      return obj
    }

  var updateCache =
    (key) => {
      cache.push(key)
      l = cache.length
    }

  var set =
    (k ,v) => {
      updateCache(k)
      obj[k] = v

      return obj
    }

  var map =
    (cb) => {
      if (!l) return

      var o = cache.reduce((acc, k) => {
        acc[k] = cb(obj[k], k, o) || obj[k]
        return acc;
      }, {})

      return Iterable(o)
    }

  var filter =
    (cb) => {
      if (!l) return

      var o = cache.reduce((acc, k) => {
        if (cb(obj[k], k, o))
          acc[k] = obj[k]

        return acc;
      }, {})

      return Iterable(o)
    }

  var kill =
    (prop) => {
      if (!l) return

      if (!(prop in obj)) return
      delete obj[prop]

      return obj
    }

  var force =
    () => {
      cache = Object.keys(obj)
      l = cache.length
      return obj
    }

  var forceKill =
    (prop) => {
      kill(prop)
      return force()
    }

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map },
    filter: { value: filter },
    force: { value: force },
    kill: { value: kill },
    forceKill: { value: forceKill }
  })

  return obj
}

module.exports = Iterable;
