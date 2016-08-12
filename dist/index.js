'use strict';

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iterable = function Iterable(obj) {
  var isobject = function isobject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && {}.toString.call(obj) === '[object Object]';
  };

  if (!isobject(obj)) return;

  var cache = (0, _keys2.default)(obj);
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
    cache = (0, _keys2.default)(obj);
    l = cache.length;
    return obj;
  }

  function forceKill(prop) {
    kill(prop);
    return force();
  }

  function returnIterable() {
    return _regenerator2.default.mark(function _callee(obj) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = (0, _getIterator3.default)((0, _keys2.default)(obj));

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 12;
                break;
              }

              key = _step.value;
              _context.next = 9;
              return { key: key, value: obj[key] };

            case 9:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError) {
                _context.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })(obj);
  }

  (0, _defineProperties2.default)(obj, {
    set: { value: set },
    each: { value: each },
    map: { value: map },
    filter: { value: filter },
    force: { value: force },
    kill: { value: kill },
    forceKill: { value: forceKill },
    returnIterable: { value: returnIterable }
  });

  return obj;
};

module.exports = Iterable;
