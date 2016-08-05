'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Iterable = function Iterable(obj) {
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
    l = cache.length;
  };

  var set = function set(k, v) {
    updateCache(k);
    obj[k] = v;

    return obj;
  };

  var map = function map(cb) {
    if (!l) return;

    var o = cache.reduce(function (acc, k) {
      acc[k] = cb(obj[k], k, o) || obj[k];
      return acc;
    }, {});

    return Iterable(o);
  };

  var filter = function filter(cb) {
    if (!l) return;

    var o = cache.reduce(function (acc, k) {
      if (cb(obj[k], k, o)) acc[k] = obj[k];

      return acc;
    }, {});

    return Iterable(o);
  };

  var kill = function kill(prop) {
    if (!l) return;

    if (!(prop in obj)) return;
    delete obj[prop];

    return obj;
  };

  var force = function force() {
    cache = Object.keys(obj);
    l = cache.length;
    return obj;
  };

  var forceKill = function forceKill(prop) {
    kill(prop);
    return force();
  };

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