const objective = (obj) => {
  var isobject =
    (obj) =>
      typeof obj === 'object' && ({}).toString.call(obj) === '[object Object]'

  if (!isobject(obj)) return

  var cache = Object.keys(obj)
  var l = cache.length

  var each = function (cb, o) {
    if (!l) return

    cache.forEach((k) => {
      cb(o || obj[k], k, obj)
    })

    return obj
  }

  var updateCache = function (key) {
    cache.push(key)
    leng = cache.length
  }

  var set = function (k ,v, o) {
    updateCache(k)

    return (o) ? o[k] = v : obj[k] = v
  }

  var map = function (cb, objekt) {
   if (!l) return

   var o = cache.reduce((acc, k) => {
     var io = objekt[k] || obj[k]
     acc[k] = cb(io, k, o) || io
     return acc;
   }, {})


   // define iterables on new object
   Object.defineProperties(o, {
     each: { value: (cb) => each.call(cb , o) },
     map: { value: (cb) => map.call(cb, o)},
     set: { value: (k, v) => set.call(k, v, o)}
   })

   return o
  }

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map }
  })

  return obj
}

module.exports = objective;
