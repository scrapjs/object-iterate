'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Iterable = function Iterable(obj) {
  var isobject = function isobject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && {}.toString.call(obj) === '[object Object]';
  };

  if (!isobject(obj)) return;

  var cache = Object.keys(obj);
  var l = cache.length;

  function each(cb) {
    if (!l) return;
    cache.forEach(function (k) {
      cb(obj[k], k, obj);
    });
    return obj;
  }

  function map(cb) {
    if (!l) return;
    return Iterable(cache.reduce(function (acc, k) {
      acc[k] = cb(obj[k], k, o) || obj[k];
      return acc;
    }, {}));
  }

  function filter(cb) {
    if (!l) return;
    return Iterable(cache.reduce(function (acc, k) {
      if (cb(obj[k], k, o)) acc[k] = obj[k];
      return acc;
    }, {}));
  }

  function updateCache(key) {
    cache.push(key);
    l = cache.length;
  }

  function set(k, v) {
    updateCache(k);
    obj[k] = v;
    return obj;
  }

  function kill(prop) {
    if (!l) return;
    if (!(prop in obj)) return;
    delete obj[prop];
    return obj;
  }

  function force() {
    cache = Object.keys(obj);
    l = cache.length;
    return obj;
  }

  function forceKill(prop) {
    kill(prop);
    return force();
  }

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map },
    filter: { value: filter },
    force: { value: force },
    kill: { value: kill },
    forceKill: { value: forceKill }
  });

  return obj;
};

module.exports = Iterable;