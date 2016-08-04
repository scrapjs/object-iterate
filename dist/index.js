'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var objective = function objective(obj) {
  var isobject = function isobject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && {}.toString.call(obj) === '[object Object]';
  };

  if (!isobject(obj)) return;

  var cache = Object.keys(obj);
  var l = cache.length;

  var each = function each(cb, o) {
    if (!l) return;

    cache.forEach(function (k) {
      cb(o || obj[k], k, obj);
    });

    return obj;
  };

  var updateCache = function updateCache(key) {
    cache.push(key);
    leng = cache.length;
  };

  var set = function set(k, v, o) {
    updateCache(k);

    return o ? o[k] = v : obj[k] = v;
  };

  var map = function map(cb, objekt) {
    if (!l) return;

    var o = cache.reduce(function (acc, k) {
      var io = objekt[k] || obj[k];
      acc[k] = cb(io, k, o) || io;
      return acc;
    }, {});

    // define iterables on new object
    Object.defineProperties(o, {
      each: { value: function value(cb) {
          return each.call(cb, o);
        } },
      map: { value: function value(cb) {
          return map.call(cb, o);
        } },
      set: { value: function value(k, v) {
          return set.call(k, v, o);
        } }
    });

    return o;
  };

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map }
  });

  return obj;
};

module.exports = objective;