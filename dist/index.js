'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var objective = function objective(obj) {
  var isobject = function isobject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && {}.toString.call(obj) === '[object Object]';
  };

  if (!isobject(obj)) return;

  var cache = Object.keys(obj);
  var l = cache.length;

  var each = function each(cb) {
    if (!l) return;

    cache.forEach(function (k) {
      cb(obj[k], k, obj);
    });

    return obj;
  };

  var updateCache = function updateCache(key) {
    cache.push(key);
    leng = cache.length;
  };

  var set = function set(k, v) {
    updateCache(k);
    obj[k] = v;
  };

  var map = function map(cb) {
    if (!l) return;

    var o = cache.reduce(function (acc, k) {
      acc[k] = cb(obj[k], k, o) || obj[k];
      return acc;
    }, {});

    // return iterable object
    return objective(o);
  };

  Object.defineProperties(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map }
  });

  return obj;
};

module.exports = objective;