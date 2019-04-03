/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/widget/widget.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./env.js":
/*!****************!*\
  !*** ./env.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    baseUrl: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:5000'
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/zoid/dist/zoid.frame.js":
/*!**********************************************!*\
  !*** ./node_modules/zoid/dist/zoid.frame.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {!function(root, factory) {
     true ? module.exports = factory() : undefined;
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        }, __webpack_require__.t = function(value, mode) {
            if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return {}.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var interface_namespaceObject = {};
        function _extends() {
            return (_extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }).apply(this, arguments);
        }
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
                var _toString = {}.toString;
                if (_toString) {
                    var name = _toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        __webpack_require__.r(interface_namespaceObject), __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
            return weakmap_CrossDomainSafeWeakMap;
        });
        var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
        function flushActive() {
            if (!activeCount && flushPromise) {
                var promise = flushPromise;
                flushPromise = null, promise.resolve();
            }
        }
        function startActive() {
            activeCount += 1;
        }
        function endActive() {
            activeCount -= 1, flushActive();
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
                this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
                this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
                this.handlers = [], handler) {
                    var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                    startActive();
                    try {
                        handler(function(res) {
                            isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                        }, function(err) {
                            isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                        });
                    } catch (err) {
                        return endActive(), void this.reject(err);
                    }
                    endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            var _proto = ZalgoPromise.prototype;
            return _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0, this.value = result, this.dispatch(), this;
            }, _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err), setTimeout(function() {
                                throw err;
                            }, 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }, 1), this.dispatch(), this;
            }, _proto.asyncReject = function(error) {
                return this.errorHandled = !0, this.reject(error), this;
            }, _proto.dispatch = function() {
                var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0, startActive();
                    for (var _loop = function(i) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                        if (resolved) try {
                            result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                        } catch (err) {
                            return promise.reject(err), "continue";
                        } else if (rejected) {
                            if (!onError) return promise.reject(_this3.error), "continue";
                            try {
                                result = onError(_this3.error);
                            } catch (err) {
                                return promise.reject(err), "continue";
                            }
                        }
                        result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                        result.errorHandled = !0) : utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                            promise.resolve(res);
                        }, function(err) {
                            promise.reject(err);
                        }) : promise.resolve(result);
                    }, i = 0; i < handlers.length; i++) _loop(i);
                    handlers.length = 0, this.dispatching = !1, endActive();
                }
            }, _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise();
                return this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                }), this.errorHandled = !0, this.dispatch(), promise;
            }, _proto.catch = function(onError) {
                return this.then(void 0, onError);
            }, _proto.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then(function(result) {
                    return ZalgoPromise.try(onFinally).then(function() {
                        return result;
                    });
                }, function(err) {
                    return ZalgoPromise.try(onFinally).then(function() {
                        throw err;
                    });
                });
            }, _proto.timeout = function(time, err) {
                var _this4 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout(function() {
                    _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                }, time);
                return this.then(function(result) {
                    return clearTimeout(timeout), result;
                });
            }, _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            }, ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                    return value.then(resolve, reject);
                }) : new ZalgoPromise().resolve(value);
            }, ZalgoPromise.reject = function(error) {
                return new ZalgoPromise().reject(error);
            }, ZalgoPromise.asyncReject = function(error) {
                return new ZalgoPromise().asyncReject(error);
            }, ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise(), count = promises.length, results = [];
                if (!count) return promise.resolve(results), promise;
                for (var _loop2 = function(i) {
                    var prom = promises[i];
                    if (prom instanceof ZalgoPromise) {
                        if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                    } else if (!utils_isPromise(prom)) return results[i] = prom, count -= 1, "continue";
                    ZalgoPromise.resolve(prom).then(function(result) {
                        results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                    }, function(err) {
                        promise.reject(err);
                    });
                }, i = 0; i < promises.length; i++) _loop2(i);
                return 0 === count && promise.resolve(results), promise;
            }, ZalgoPromise.hash = function(promises) {
                var result = {};
                return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                    return ZalgoPromise.resolve(promises[key]).then(function(value) {
                        result[key] = value;
                    });
                })).then(function() {
                    return result;
                });
            }, ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    return possiblyUnhandledPromiseHandlers.push(handler), {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            }, ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    return endActive(), ZalgoPromise.reject(err);
                }
                return endActive(), ZalgoPromise.resolve(result);
            }, ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise(function(resolve) {
                    setTimeout(resolve, _delay);
                });
            }, ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            }, ZalgoPromise.flush = function() {
                return promise = flushPromise = flushPromise || new ZalgoPromise(), flushActive(), 
                promise;
                var promise;
            }, ZalgoPromise;
        }();
        function isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        var PROTOCOL = {
            MOCK: "mock:",
            FILE: "file:",
            ABOUT: "about:"
        }, WILDCARD = "*", WINDOW_TYPE = {
            IFRAME: "iframe",
            POPUP: "popup"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {}
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {}
        }
        function canReadFromWindow(win) {
            try {
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            var location = (win = win || window).location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
            if (protocol === PROTOCOL.ABOUT) {
                var parent = getParent(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function utils_getDomain(win) {
            var domain = getActualDomain(win = win || window);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
        }
        function isSameDomain(win) {
            if (!function(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                if (utils_getDomain(window) === utils_getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function assertSameDomain(win) {
            if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
            return win;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== function(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
                } catch (err) {}
                return result;
            }(child).indexOf(parent);
        }
        function getFrames(win) {
            var frames, len, result = [];
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            try {
                len = frames.length;
            } catch (err) {}
            if (0 === len) return result;
            if (len) {
                for (var i = 0; i < len; i++) {
                    var frame = void 0;
                    try {
                        frame = frames[i];
                    } catch (err) {
                        continue;
                    }
                    result.push(frame);
                }
                return result;
            }
            for (var _i = 0; _i < 100; _i++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
                var frame = _getFrames2[_i3];
                result.push(frame);
                for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
            }
            return result;
        }
        function getTop(win) {
            if (win) {
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
                    var frame = _getAllChildFrames4[_i7];
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            if (!top) throw new Error("Can not determine top window");
            return [].concat(getAllChildFrames(top), [ top ]);
        }
        var iframeWindows = [], iframeFrames = [];
        function isWindowClosed(win, allowMock) {
            void 0 === allowMock && (allowMock = !0);
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            var iframeIndex = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && function(frame) {
                    if (!frame.contentWindow) return !0;
                    if (!frame.parentNode) return !0;
                    var doc = frame.ownerDocument;
                    return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                }(frame)) return !0;
            }
            return !1;
        }
        function getAncestor(win) {
            return getOpener(win = win || window) || getParent(win) || void 0;
        }
        function anyMatch(collection1, collection2) {
            for (var _i17 = 0; _i17 < collection1.length; _i17++) for (var item1 = collection1[_i17], _i19 = 0; _i19 < collection2.length; _i19++) if (item1 === collection2[_i19]) return !0;
            return !1;
        }
        function getDistanceFromTop(win) {
            void 0 === win && (win = window);
            for (var distance = 0, parent = win; parent; ) (parent = getParent(parent)) && (distance += 1);
            return distance;
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
            1));
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === WILDCARD || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function getDomainFromUrl(url) {
            return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : utils_getDomain();
        }
        function onCloseWindow(win, callback, delay, maxtime) {
            var timeout;
            return void 0 === delay && (delay = 1e3), void 0 === maxtime && (maxtime = 1 / 0), 
            function check() {
                if (isWindowClosed(win)) return timeout && clearTimeout(timeout), callback();
                maxtime <= 0 ? clearTimeout(timeout) : (maxtime -= delay, timeout = setTimeout(check, delay));
            }(), {
                cancel: function() {
                    timeout && clearTimeout(timeout);
                }
            };
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === {}.toString.call(obj)) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            return !1;
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var objectIDs, awaitFrameLoadPromises, defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
                counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
                function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap(), testKey = {};
                        return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap();
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            return _proto._cleanupClosedWindows = function() {
                for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                    }
                }
            }, _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            }, _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var name = this.name, entry = key[name];
                    entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    });
                } else {
                    this._cleanupClosedWindows();
                    var keys = this.keys, values = this.values, index = util_safeIndexOf(keys, key);
                    -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
                }
            }, _proto.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (!this.isSafeToReadWrite(key)) {
                    this._cleanupClosedWindows();
                    var index = util_safeIndexOf(this.keys, key);
                    if (-1 === index) return;
                    return this.values[index];
                }
                var entry = key[this.name];
                if (entry && entry[0] === key) return entry[1];
            }, _proto.delete = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.delete(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var entry = key[this.name];
                    entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                } else {
                    this._cleanupClosedWindows();
                    var keys = this.keys, index = util_safeIndexOf(keys, key);
                    -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
                }
            }, _proto.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return !0;
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                }
                return this._cleanupClosedWindows(), -1 !== util_safeIndexOf(this.keys, key);
            }, _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                return this.set(key, value), value;
            }, CrossDomainSafeWeakMap;
        }();
        function base64encode(str) {
            if ("function" == typeof btoa) return btoa(str);
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
            throw new Error("Can not find window.btoa or Buffer");
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap(), null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        return uid || (uid = typeof obj + ":" + uniqueID(), objectIDs.set(obj, uid)), uid;
                    }(val) + "]" : val;
                });
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        function memoizePromise(method) {
            var cache = {};
            function memoizedPromiseFunction() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = method.apply(this, arguments).finally(function() {
                    delete cache[key];
                }), cache[key]);
            }
            return memoizedPromiseFunction.reset = function() {
                cache = {};
            }, memoizedPromiseFunction;
        }
        function inlineMemoize(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
        }
        function src_util_noop() {}
        function once(method) {
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        }
        function stringifyError(err, level) {
            if (void 0 === level && (level = 1), level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack, message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
            } catch (newErr) {
                return "Error while stringifying error: " + stringifyError(newErr, level + 1);
            }
        }
        function stringify(item) {
            return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : {}.toString.call(item);
        }
        function extend(obj, source) {
            if (!source) return obj;
            if (Object.assign) return Object.assign(obj, source);
            for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function safeInterval(method, time) {
            var timeout;
            return function loop() {
                timeout = setTimeout(function() {
                    method(), loop();
                }, time);
            }(), {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isDefined(value) {
            return null != value;
        }
        function util_isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        function util_getOrSet(obj, key, getter) {
            if (obj.hasOwnProperty(key)) return obj[key];
            var val = getter();
            return obj[key] = val, val;
        }
        function cleanup(obj) {
            var tasks = [], cleaned = !1;
            return {
                set: function(name, item) {
                    return cleaned || (obj[name] = item, this.register(function() {
                        delete obj[name];
                    })), item;
                },
                register: function(method) {
                    cleaned ? method() : tasks.push(once(method));
                },
                all: function() {
                    var results = [];
                    for (cleaned = !0; tasks.length; ) {
                        var task = tasks.pop();
                        results.push(task());
                    }
                    return promise_ZalgoPromise.all(results).then(src_util_noop);
                }
            };
        }
        function assertExists(name, thing) {
            if (null == thing) throw new Error("Expected " + name + " to be present");
            return thing;
        }
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
        }
        function waitForDocumentReady() {
            return inlineMemoize(waitForDocumentReady, function() {
                return new promise_ZalgoPromise(function(resolve) {
                    if (isDocumentReady()) return resolve();
                    var interval = setInterval(function() {
                        if (isDocumentReady()) return clearInterval(interval), resolve();
                    }, 10);
                });
            });
        }
        function parseQuery(queryString) {
            return inlineMemoize(parseQuery, function() {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) return params;
                for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                    var pair = _queryString$split2[_i2];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }, [ queryString ]);
        }
        function extendQuery(originalQuery, props) {
            return void 0 === props && (props = {}), props && Object.keys(props).length ? (void 0 === (obj = _extends({}, parseQuery(originalQuery), props)) && (obj = {}), 
            Object.keys(obj).filter(function(key) {
                return "string" == typeof obj[key];
            }).map(function(key) {
                return urlEncode(key) + "=" + urlEncode(obj[key]);
            }).join("&")) : originalQuery;
            var obj;
        }
        function appendChild(container, child) {
            container.appendChild(child);
        }
        function isElement(element) {
            return element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument;
        }
        function getElementSafe(id, doc) {
            return void 0 === doc && (doc = document), isElement(id) ? id : "string" == typeof id ? doc.querySelector(id) : void 0;
        }
        function elementReady(id) {
            return new promise_ZalgoPromise(function(resolve, reject) {
                var name = stringify(id), el = getElementSafe(id);
                if (el) return resolve(el);
                if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                var interval = setInterval(function() {
                    return (el = getElementSafe(id)) ? (clearInterval(interval), resolve(el)) : isDocumentReady() ? (clearInterval(interval), 
                    reject(new Error("Document is ready and element " + name + " does not exist"))) : void 0;
                }, 10);
            });
        }
        function PopupOpenError(message) {
            this.message = message;
        }
        function awaitFrameLoad(frame) {
            if ((awaitFrameLoadPromises = awaitFrameLoadPromises || new weakmap_CrossDomainSafeWeakMap()).has(frame)) {
                var _promise = awaitFrameLoadPromises.get(frame);
                if (_promise) return _promise;
            }
            var promise = new promise_ZalgoPromise(function(resolve, reject) {
                frame.addEventListener("load", function() {
                    (function(frame) {
                        if (function() {
                            for (var i = 0; i < iframeWindows.length; i++) {
                                var closed = !1;
                                try {
                                    closed = iframeWindows[i].closed;
                                } catch (err) {}
                                closed && (iframeFrames.splice(i, 1), iframeWindows.splice(i, 1));
                            }
                        }(), frame && frame.contentWindow) try {
                            iframeWindows.push(frame.contentWindow), iframeFrames.push(frame);
                        } catch (err) {}
                    })(frame), resolve(frame);
                }), frame.addEventListener("error", function(err) {
                    frame.contentWindow ? resolve(frame) : reject(err);
                });
            });
            return awaitFrameLoadPromises.set(frame, promise), promise;
        }
        function awaitFrameWindow(frame) {
            return awaitFrameLoad(frame).then(function(loadedFrame) {
                if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                return loadedFrame.contentWindow;
            });
        }
        function dom_iframe(options, container) {
            void 0 === options && (options = {});
            var style = options.style || {}, frame = function(tag, options, container) {
                void 0 === tag && (tag = "div"), void 0 === options && (options = {}), tag = tag.toLowerCase();
                var el, styleText, doc, element = document.createElement(tag);
                if (options.style && extend(element.style, options.style), options.class && (element.className = options.class.join(" ")), 
                options.id && element.setAttribute("id", options.id), options.attributes) for (var _i6 = 0, _Object$keys2 = Object.keys(options.attributes); _i6 < _Object$keys2.length; _i6++) {
                    var key = _Object$keys2[_i6];
                    element.setAttribute(key, options.attributes[key]);
                }
                if (options.styleSheet && (el = element, styleText = options.styleSheet, void 0 === doc && (doc = window.document), 
                el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText))), 
                options.html) {
                    if ("iframe" === tag) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    element.innerHTML = options.html;
                }
                return element;
            }("iframe", {
                attributes: _extends({
                    allowTransparency: "true"
                }, options.attributes || {}),
                style: _extends({
                    backgroundColor: "transparent",
                    border: "none"
                }, style),
                html: options.html,
                class: options.class
            }), isIE = window.navigator.userAgent.match(/MSIE|Edge/i);
            return frame.hasAttribute("id") || frame.setAttribute("id", uniqueID()), awaitFrameLoad(frame), 
            container && function(id, doc) {
                void 0 === doc && (doc = document);
                var element = getElementSafe(id, doc);
                if (element) return element;
                throw new Error("Can not find element: " + stringify(id));
            }(container).appendChild(frame), (options.url || isIE) && frame.setAttribute("src", options.url || "about:blank"), 
            frame;
        }
        function addEventListener(obj, event, handler) {
            return obj.addEventListener(event, handler), {
                cancel: function() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function destroyElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element);
        }
        function isElementClosed(el) {
            return !el || !el.parentNode;
        }
        function onResize(el, handler, _temp) {
            var _ref2 = void 0 === _temp ? {} : _temp, _ref2$width = _ref2.width, width = void 0 === _ref2$width || _ref2$width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$interval = _ref2.interval, interval = void 0 === _ref2$interval ? 100 : _ref2$interval, _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, currentWidth = el.offsetWidth, currentHeight = el.offsetHeight;
            handler({
                width: currentWidth,
                height: currentHeight
            });
            var observer, timeout, check = function() {
                var newWidth = el.offsetWidth, newHeight = el.offsetHeight;
                (width && newWidth !== currentWidth || height && newHeight !== currentHeight) && handler({
                    width: newWidth,
                    height: newHeight
                }), currentWidth = newWidth, currentHeight = newHeight;
            };
            return void 0 !== win.ResizeObserver ? (observer = new win.ResizeObserver(check)).observe(el) : void 0 !== win.MutationObserver ? ((observer = new win.MutationObserver(check)).observe(el, {
                attributes: !0,
                childList: !0,
                subtree: !0,
                characterData: !1
            }), win.addEventListener("resize", check)) : function loop() {
                check(), timeout = setTimeout(loop, interval);
            }(), {
                cancel: function() {
                    observer.disconnect(), window.removeEventListener("resize", check), clearTimeout(timeout);
                }
            };
        }
        function isPerc(str) {
            return "string" == typeof str && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return "string" == typeof str && /^[0-9]+px$/.test(str);
        }
        function toPx(val) {
            return function(val) {
                if ("number" == typeof val) return val;
                var match = val.match(/^([0-9]+)(px|%)$/);
                if (!match) throw new Error("Could not match css value from " + val);
                return parseInt(match[1], 10);
            }(val) + "px";
        }
        function toCSS(val) {
            return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
        }
        PopupOpenError.prototype = Object.create(Error.prototype);
        var MESSAGE_NAME = {
            METHOD: "postrobot_method",
            HELLO: "postrobot_hello",
            OPEN_TUNNEL: "postrobot_open_tunnel"
        }, constants_WILDCARD = "*", SERIALIZATION_TYPE = {
            CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
            CROSS_DOMAIN_FUNCTION: "cross_domain_function",
            CROSS_DOMAIN_WINDOW: "cross_domain_window"
        };
        function global_getGlobal(win) {
            return void 0 === win && (win = window), win !== window ? win.__post_robot_10_0_14__ : win.__post_robot_10_0_14__ = win.__post_robot_10_0_14__ || {};
        }
        var getObj = function() {
            return {};
        };
        function globalStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            util_getOrSet(global_getGlobal(), key, function() {
                var store = defStore();
                return {
                    has: function(storeKey) {
                        return store.hasOwnProperty(storeKey);
                    },
                    get: function(storeKey, defVal) {
                        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
                    },
                    set: function(storeKey, val) {
                        return store[storeKey] = val, val;
                    },
                    del: function(storeKey) {
                        delete store[storeKey];
                    },
                    getOrSet: function(storeKey, getter) {
                        return util_getOrSet(store, storeKey, getter);
                    },
                    reset: function() {
                        store = defStore();
                    },
                    keys: function() {
                        return Object.keys(store);
                    }
                };
            });
        }
        var WildCard = function() {};
        function getWildcard() {
            var global = global_getGlobal();
            return global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard(), global.WINDOW_WILDCARD;
        }
        function windowStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            globalStore("windowStore").getOrSet(key, function() {
                var winStore = new weakmap_CrossDomainSafeWeakMap(), getStore = function(win) {
                    return winStore.getOrSet(win, defStore);
                };
                return {
                    has: function(win) {
                        return getStore(win).hasOwnProperty(key);
                    },
                    get: function(win, defVal) {
                        var store = getStore(win);
                        return store.hasOwnProperty(key) ? store[key] : defVal;
                    },
                    set: function(win, val) {
                        return getStore(win)[key] = val, val;
                    },
                    del: function(win) {
                        delete getStore(win)[key];
                    },
                    getOrSet: function(win, getter) {
                        return util_getOrSet(getStore(win), key, getter);
                    }
                };
            });
        }
        function getInstanceID() {
            return globalStore("instance").getOrSet("instanceID", uniqueID);
        }
        function getHelloPromise(win) {
            return windowStore("helloPromises").getOrSet(win, function() {
                return new promise_ZalgoPromise();
            });
        }
        function sayHello(win, _ref3) {
            return (0, _ref3.send)(win, MESSAGE_NAME.HELLO, {
                instanceID: getInstanceID()
            }, {
                domain: constants_WILDCARD,
                timeout: -1
            }).then(function(_ref4) {
                var origin = _ref4.origin, instanceID = _ref4.data.instanceID;
                return getHelloPromise(win).resolve({
                    win: win,
                    domain: origin
                }), {
                    win: win,
                    domain: origin,
                    instanceID: instanceID
                };
            });
        }
        function getWindowInstanceID(win, _ref5) {
            var send = _ref5.send;
            return windowStore("windowInstanceIDPromises").getOrSet(win, function() {
                return sayHello(win, {
                    send: send
                }).then(function(_ref6) {
                    return _ref6.instanceID;
                });
            });
        }
        function markWindowKnown(win) {
            windowStore("knownWindows").set(win, !0);
        }
        var _SERIALIZER, TYPE = {
            FUNCTION: "function",
            ERROR: "error",
            PROMISE: "promise",
            REGEX: "regex",
            DATE: "date",
            ARRAY: "array",
            OBJECT: "object",
            STRING: "string",
            NUMBER: "number",
            BOOLEAN: "boolean",
            NULL: "null",
            UNDEFINED: "undefined"
        };
        function isSerializedType(item) {
            return "object" == typeof item && null !== item && "string" == typeof item.__type__;
        }
        function determineType(val) {
            return void 0 === val ? TYPE.UNDEFINED : null === val ? TYPE.NULL : Array.isArray(val) ? TYPE.ARRAY : "function" == typeof val ? TYPE.FUNCTION : "object" == typeof val ? val instanceof Error ? TYPE.ERROR : "function" == typeof val.then ? TYPE.PROMISE : "[object RegExp]" === {}.toString.call(val) ? TYPE.REGEX : "[object Date]" === {}.toString.call(val) ? TYPE.DATE : TYPE.OBJECT : "string" == typeof val ? TYPE.STRING : "number" == typeof val ? TYPE.NUMBER : "boolean" == typeof val ? TYPE.BOOLEAN : void 0;
        }
        function serializeType(type, val) {
            return {
                __type__: type,
                __val__: val
            };
        }
        var _DESERIALIZER, SERIALIZER = ((_SERIALIZER = {})[TYPE.FUNCTION] = function() {}, 
        _SERIALIZER[TYPE.ERROR] = function(_ref) {
            return serializeType(TYPE.ERROR, {
                message: _ref.message,
                stack: _ref.stack,
                code: _ref.code
            });
        }, _SERIALIZER[TYPE.PROMISE] = function() {}, _SERIALIZER[TYPE.REGEX] = function(val) {
            return serializeType(TYPE.REGEX, val.source);
        }, _SERIALIZER[TYPE.DATE] = function(val) {
            return serializeType(TYPE.DATE, val.toJSON());
        }, _SERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _SERIALIZER), defaultSerializers = {}, DESERIALIZER = ((_DESERIALIZER = {})[TYPE.FUNCTION] = function() {
            throw new Error("Function serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.ERROR] = function(_ref2) {
            var stack = _ref2.stack, code = _ref2.code, error = new Error(_ref2.message);
            return error.code = code, error.stack = stack + "\n\n" + error.stack, error;
        }, _DESERIALIZER[TYPE.PROMISE] = function() {
            throw new Error("Promise serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.REGEX] = function(val) {
            return new RegExp(val);
        }, _DESERIALIZER[TYPE.DATE] = function(val) {
            return new Date(val);
        }, _DESERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _DESERIALIZER), defaultDeserializers = {};
        function cleanupProxyWindows() {
            for (var idToProxyWindow = globalStore("idToProxyWindow"), _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(); _i2 < _idToProxyWindow$keys2.length; _i2++) {
                var id = _idToProxyWindow$keys2[_i2];
                idToProxyWindow.get(id).shouldClean() && idToProxyWindow.del(id);
            }
        }
        function getSerializedWindow(id, win, _ref) {
            var windowName, send = _ref.send;
            return {
                id: id,
                type: getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME,
                getInstanceID: memoizePromise(function() {
                    return getWindowInstanceID(win, {
                        send: send
                    });
                }),
                close: function() {
                    return promise_ZalgoPromise.try(function() {
                        win.close();
                    });
                },
                getName: function() {
                    return promise_ZalgoPromise.try(function() {
                        if (!isWindowClosed(win)) return windowName;
                    });
                },
                focus: function() {
                    return promise_ZalgoPromise.try(function() {
                        win.focus();
                    });
                },
                isClosed: function() {
                    return promise_ZalgoPromise.try(function() {
                        return isWindowClosed(win);
                    });
                },
                setLocation: function(href) {
                    return promise_ZalgoPromise.try(function() {
                        if (isSameDomain(win)) try {
                            if (win.location && "function" == typeof win.location.replace) return void win.location.replace(href);
                        } catch (err) {}
                        win.location = href;
                    });
                },
                setName: function(name) {
                    return promise_ZalgoPromise.try(function() {
                        (win = assertSameDomain(win)).name = name, win.frameElement && win.frameElement.setAttribute("name", name), 
                        windowName = name;
                    });
                }
            };
        }
        new promise_ZalgoPromise(function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(function() {
                if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
            }, 10);
        });
        var window_ProxyWindow = function() {
            function ProxyWindow(serializedWindow, actualWindow, _ref2) {
                var send = _ref2.send;
                this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, 
                this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.serializedWindow = serializedWindow, 
                this.actualWindowPromise = new promise_ZalgoPromise(), this.send = send, actualWindow && this.setWindow(actualWindow);
            }
            var _proto = ProxyWindow.prototype;
            return _proto.getType = function() {
                return this.serializedWindow.type;
            }, _proto.isPopup = function() {
                return this.getType() === WINDOW_TYPE.POPUP;
            }, _proto.isIframe = function() {
                return this.getType() === WINDOW_TYPE.IFRAME;
            }, _proto.setLocation = function(href) {
                var _this = this;
                return this.serializedWindow.setLocation(href).then(function() {
                    return _this;
                });
            }, _proto.setName = function(name) {
                var _this2 = this;
                return this.serializedWindow.setName(name).then(function() {
                    return _this2;
                });
            }, _proto.close = function() {
                var _this3 = this;
                return this.serializedWindow.close().then(function() {
                    return _this3;
                });
            }, _proto.focus = function() {
                var _this4 = this;
                return promise_ZalgoPromise.try(function() {
                    return promise_ZalgoPromise.all([ _this4.isPopup() && _this4.serializedWindow.getName().then(function(name) {
                        name && window.open("", name);
                    }), _this4.serializedWindow.focus() ]);
                }).then(function() {
                    return _this4;
                });
            }, _proto.isClosed = function() {
                return this.serializedWindow.isClosed();
            }, _proto.getWindow = function() {
                return this.actualWindow;
            }, _proto.setWindow = function(win) {
                this.actualWindow = win, this.serializedWindow = getSerializedWindow(this.serializedWindow.id, win, {
                    send: this.send
                }), this.actualWindowPromise.resolve(win);
            }, _proto.awaitWindow = function() {
                return this.actualWindowPromise;
            }, _proto.matchWindow = function(win) {
                var _this5 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this5.actualWindow ? win === _this5.actualWindow : promise_ZalgoPromise.all([ _this5.getInstanceID(), getWindowInstanceID(win, {
                        send: _this5.send
                    }) ]).then(function(_ref3) {
                        var match = _ref3[0] === _ref3[1];
                        return match && _this5.setWindow(win), match;
                    });
                });
            }, _proto.unwrap = function() {
                return this.actualWindow || this;
            }, _proto.getInstanceID = function() {
                return this.serializedWindow.getInstanceID();
            }, _proto.serialize = function() {
                return this.serializedWindow;
            }, _proto.shouldClean = function() {
                return this.actualWindow && isWindowClosed(this.actualWindow);
            }, ProxyWindow.unwrap = function(win) {
                return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
            }, ProxyWindow.serialize = function(win, _ref4) {
                var send = _ref4.send;
                return cleanupProxyWindows(), ProxyWindow.toProxyWindow(win, {
                    send: send
                }).serialize();
            }, ProxyWindow.deserialize = function(serializedWindow, _ref5) {
                var on = _ref5.on, send = _ref5.send;
                return cleanupProxyWindows(), globalStore("idToProxyWindow").getOrSet(serializedWindow.id, function() {
                    return new ProxyWindow(serializedWindow, null, {
                        on: on,
                        send: send
                    });
                });
            }, ProxyWindow.isProxyWindow = function(obj) {
                return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
            }, ProxyWindow.toProxyWindow = function(win, _ref6) {
                var send = _ref6.send;
                if (cleanupProxyWindows(), ProxyWindow.isProxyWindow(win)) return win;
                var realWin = win;
                return windowStore("winToProxyWindow").getOrSet(win, function() {
                    var id = uniqueID(), proxyWindow = new ProxyWindow(getSerializedWindow(id, realWin, {
                        send: send
                    }), realWin, {
                        send: send
                    });
                    return globalStore("idToProxyWindow").set(id, proxyWindow);
                });
            }, ProxyWindow;
        }();
        function addMethod(id, val, name, source, domain) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            window_ProxyWindow.isProxyWindow(source) ? proxyWindowMethods.set(id, {
                val: val,
                name: name,
                domain: domain,
                source: source
            }) : (proxyWindowMethods.del(id), methodStore.getOrSet(source, function() {
                return {};
            })[id] = {
                domain: domain,
                name: name,
                val: val,
                source: source
            });
        }
        function lookupMethod(source, id) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            return methodStore.getOrSet(source, function() {
                return {};
            })[id] || proxyWindowMethods.get(id);
        }
        function function_serializeFunction(destination, domain, val, key, _ref3) {
            !function(_ref) {
                var on = _ref3.on;
                globalStore("builtinListeners").getOrSet("functionCalls", function() {
                    return on(MESSAGE_NAME.METHOD, {
                        domain: constants_WILDCARD
                    }, function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data, id = data.id, name = data.name, meth = lookupMethod(source, id);
                        if (!meth) throw new Error("Could not find method '" + data.name + "' with id: " + data.id + " in " + utils_getDomain(window));
                        var methodSource = meth.source, domain = meth.domain, val = meth.val;
                        return promise_ZalgoPromise.try(function() {
                            if (!matchDomain(domain, origin)) throw new Error("Method '" + data.name + "' domain " + JSON.stringify(util_isRegex(meth.domain) ? meth.domain.source : meth.domain) + " does not match origin " + origin + " in " + utils_getDomain(window));
                            if (window_ProxyWindow.isProxyWindow(methodSource)) return methodSource.matchWindow(source).then(function(match) {
                                if (!match) throw new Error("Method call '" + data.name + "' failed - proxy window does not match source in " + utils_getDomain(window));
                            });
                        }).then(function() {
                            return val.apply({
                                source: source,
                                origin: origin
                            }, data.args);
                        }, function(err) {
                            return promise_ZalgoPromise.try(function() {
                                if (val.onError) return val.onError(err);
                            }).then(function() {
                                throw err.stack && (err.stack = "Remote call to " + name + "()\n\n" + err.stack), 
                                err;
                            });
                        }).then(function(result) {
                            return {
                                result: result,
                                id: id,
                                name: name
                            };
                        });
                    });
                });
            }();
            var id = val.__id__ || uniqueID();
            destination = window_ProxyWindow.unwrap(destination);
            var name = val.__name__ || val.name || key;
            return window_ProxyWindow.isProxyWindow(destination) ? (addMethod(id, val, name, destination, domain), 
            destination.awaitWindow().then(function(win) {
                addMethod(id, val, name, win, domain);
            })) : addMethod(id, val, name, destination, domain), serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
                id: id,
                name: name
            });
        }
        function serializeMessage(destination, domain, obj, _ref) {
            var _serialize, on = _ref.on, send = _ref.send;
            return function(obj, serializers) {
                void 0 === serializers && (serializers = defaultSerializers);
                var result = JSON.stringify(obj, function(key) {
                    var val = this[key];
                    if (isSerializedType(this)) return val;
                    var type = determineType(val);
                    if (!type) return val;
                    var serializer = serializers[type] || SERIALIZER[type];
                    return serializer ? serializer(val, key) : val;
                });
                return void 0 === result ? TYPE.UNDEFINED : result;
            }(obj, ((_serialize = {})[TYPE.PROMISE] = function(val, key) {
                return function(destination, domain, val, key, _ref) {
                    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
                        then: function_serializeFunction(destination, domain, function(resolve, reject) {
                            return val.then(resolve, reject);
                        }, key, {
                            on: _ref.on,
                            send: _ref.send
                        })
                    });
                }(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.FUNCTION] = function(val, key) {
                return function_serializeFunction(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.OBJECT] = function(val) {
                return isWindow(val) || window_ProxyWindow.isProxyWindow(val) ? serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, window_ProxyWindow.serialize(val, {
                    send: send
                })) : val;
            }, _serialize));
        }
        function deserializeMessage(source, origin, message, _ref2) {
            var _deserialize, on = _ref2.on, send = _ref2.send;
            return function(str, deserializers) {
                if (void 0 === deserializers && (deserializers = defaultDeserializers), str !== TYPE.UNDEFINED) return JSON.parse(str, function(key, val) {
                    if (isSerializedType(this)) return val;
                    var type, value;
                    if (isSerializedType(val) ? (type = val.__type__, value = val.__val__) : (type = determineType(val), 
                    value = val), !type) return value;
                    var deserializer = deserializers[type] || DESERIALIZER[type];
                    return deserializer ? deserializer(value, key) : value;
                });
            }(message, ((_deserialize = {})[SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE] = function(serializedPromise) {
                return new promise_ZalgoPromise(serializedPromise.then);
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION] = function(serializedFunction) {
                return function(source, origin, _ref4, _ref5) {
                    var id = serializedFunction.id, name = serializedFunction.name, send = _ref5.send, getDeserializedFunction = function(opts) {
                        function crossDomainFunctionWrapper() {
                            var _arguments = arguments;
                            return window_ProxyWindow.toProxyWindow(source, {
                                send: send
                            }).awaitWindow().then(function(win) {
                                var meth = lookupMethod(win, id);
                                if (meth && meth.val !== crossDomainFunctionWrapper) return meth.val.apply({
                                    source: window,
                                    origin: utils_getDomain()
                                }, _arguments);
                                var options = {
                                    domain: origin,
                                    fireAndForget: opts.fireAndForget
                                }, _args = [].slice.call(_arguments);
                                return send(win, MESSAGE_NAME.METHOD, {
                                    id: id,
                                    name: name,
                                    args: _args
                                }, options).then(function(res) {
                                    if (!opts.fireAndForget) return res.data.result;
                                });
                            }).catch(function(err) {
                                throw err;
                            });
                        }
                        return void 0 === opts && (opts = {}), crossDomainFunctionWrapper.__name__ = name, 
                        crossDomainFunctionWrapper.__origin__ = origin, crossDomainFunctionWrapper.__source__ = source, 
                        crossDomainFunctionWrapper.__id__ = id, crossDomainFunctionWrapper.origin = origin, 
                        crossDomainFunctionWrapper;
                    }, crossDomainFunctionWrapper = getDeserializedFunction();
                    return crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({
                        fireAndForget: !0
                    }), crossDomainFunctionWrapper;
                }(source, origin, 0, {
                    on: on,
                    send: send
                });
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW] = function(serializedWindow) {
                return window_ProxyWindow.deserialize(serializedWindow, {
                    on: (_ref8 = {
                        on: on,
                        send: send
                    }).on,
                    send: _ref8.send
                });
                var _ref8;
            }, _deserialize));
        }
        var SEND_MESSAGE_STRATEGIES = {};
        function send_sendMessage(win, domain, message, _ref) {
            var _serializeMessage, on = _ref.on, send = _ref.send;
            if (isWindowClosed(win)) throw new Error("Window is closed");
            for (var serializedMessage = serializeMessage(win, domain, ((_serializeMessage = {}).__post_robot_10_0_14__ = _extends({
                id: uniqueID(),
                origin: utils_getDomain(window)
            }, message), _serializeMessage), {
                on: on,
                send: send
            }), strategies = Object.keys(SEND_MESSAGE_STRATEGIES), errors = [], _i2 = 0; _i2 < strategies.length; _i2++) {
                var strategyName = strategies[_i2];
                try {
                    SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                } catch (err) {
                    errors.push(err);
                }
            }
            if (errors.length === strategies.length) throw new Error("All post-robot messaging strategies failed:\n\n" + errors.map(stringifyError).join("\n\n"));
        }
        SEND_MESSAGE_STRATEGIES.postrobot_post_message = function(win, serializedMessage, domain) {
            (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ constants_WILDCARD ]).map(function(dom) {
                return 0 === dom.indexOf(PROTOCOL.FILE) ? constants_WILDCARD : dom;
            }).forEach(function(dom) {
                win.postMessage(serializedMessage, dom);
            });
        }, SEND_MESSAGE_STRATEGIES.postrobot_global = function(win, serializedMessage) {
            if (function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            }(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) {
                if (!isSameDomain(win)) throw new Error("Post message through global disabled between different domain windows");
                if (!1 !== isSameTopWindow(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                var foreignGlobal = global_getGlobal(win);
                if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                foreignGlobal.receiveMessage({
                    source: window,
                    origin: utils_getDomain(),
                    data: serializedMessage
                });
            }
        };
        var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
        function getResponseListener(hash) {
            return globalStore("responseListeners").get(hash);
        }
        function deleteResponseListener(hash) {
            globalStore("responseListeners").del(hash);
        }
        function isResponseListenerErrored(hash) {
            return globalStore("erroredResponseListeners").has(hash);
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain, requestListeners = windowStore("requestListeners");
            if (win === constants_WILDCARD && (win = null), domain === constants_WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            for (var _i4 = 0, _ref3 = [ win, getWildcard() ]; _i4 < _ref3.length; _i4++) {
                var winQualifier = _ref3[_i4];
                if (winQualifier) {
                    var nameListeners = requestListeners.get(winQualifier);
                    if (nameListeners) {
                        var domainListeners = nameListeners[name];
                        if (domainListeners) {
                            if (domain && "string" == typeof domain) {
                                if (domainListeners[domain]) return domainListeners[domain];
                                if (domainListeners[__DOMAIN_REGEX__]) for (var _i6 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__]; _i6 < _domainListeners$__DO2.length; _i6++) {
                                    var _domainListeners$__DO3 = _domainListeners$__DO2[_i6], listener = _domainListeners$__DO3.listener;
                                    if (matchDomain(_domainListeners$__DO3.regex, domain)) return listener;
                                }
                            }
                            if (domainListeners[constants_WILDCARD]) return domainListeners[constants_WILDCARD];
                        }
                    }
                }
            }
        }
        var RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {}).postrobot_message_request = function(source, origin, message, _ref) {
            var on = _ref.on, send = _ref.send, options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin
            });
            function sendResponse(type, ack, response) {
                void 0 === response && (response = {}), message.fireAndForget || isWindowClosed(source) || send_sendMessage(source, origin, _extends({
                    type: type,
                    ack: ack,
                    hash: message.hash,
                    name: message.name
                }, response), {
                    on: on,
                    send: send
                });
            }
            return promise_ZalgoPromise.all([ sendResponse("postrobot_message_ack"), promise_ZalgoPromise.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                return options.handler({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }).then(function(data) {
                return sendResponse("postrobot_message_response", "success", {
                    data: data
                });
            }, function(error) {
                return sendResponse("postrobot_message_response", "error", {
                    error: error
                });
            }) ]).then(src_util_noop).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                throw err;
            });
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_ack = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                if (source !== options.win) throw new Error("Ack source does not match registered window");
                options.ack = !0;
            }
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_response = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var pattern, options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (pattern = options.domain, 
                Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString()));
                if (source !== options.win) throw new Error("Response source does not match registered window");
                deleteResponseListener(message.hash), "error" === message.ack ? options.promise.reject(message.error) : "success" === message.ack && options.promise.resolve({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }
        }, _RECEIVE_MESSAGE_TYPE);
        function receive_receiveMessage(event, _ref2) {
            var on = _ref2.on, send = _ref2.send, receivedMessages = globalStore("receivedMessages");
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, message = function(message, source, origin, _ref) {
                var parsedMessage, on = _ref.on, send = _ref.send;
                try {
                    parsedMessage = deserializeMessage(source, origin, message, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    return;
                }
                if (parsedMessage && "object" == typeof parsedMessage && null !== parsedMessage && (parsedMessage = parsedMessage.__post_robot_10_0_14__) && "object" == typeof parsedMessage && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
            }(event.data, source, origin, {
                on: on,
                send: send
            });
            message && (markWindowKnown(source), receivedMessages.has(message.id) || (receivedMessages.set(message.id, !0), 
            isWindowClosed(source) && !message.fireAndForget || (0 === message.origin.indexOf(PROTOCOL.FILE) && (origin = PROTOCOL.FILE + "//"), 
            RECEIVE_MESSAGE_TYPES[message.type](source, origin, message, {
                on: on,
                send: send
            }))));
        }
        function on_on(name, options, handler) {
            if (!name) throw new Error("Expected name");
            if ("function" == typeof options && (handler = options, options = {}), !handler) throw new Error("Expected handler");
            (options = options || {}).name = name, options.handler = handler || options.handler;
            var win = options.window, domain = options.domain, requestListener = function addRequestListener(_ref4, listener) {
                var name = _ref4.name, win = _ref4.win, domain = _ref4.domain, requestListeners = windowStore("requestListeners");
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _i8 = 0, _win2 = win; _i8 < _win2.length; _i8++) listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: _win2[_i8]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i10 = 0; _i10 < listenersCollection.length; _i10++) listenersCollection[_i10].cancel();
                        }
                    };
                }
                if (Array.isArray(domain)) {
                    for (var _listenersCollection = [], _i12 = 0, _domain2 = domain; _i12 < _domain2.length; _i12++) _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _domain2[_i12]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i14 = 0; _i14 < _listenersCollection.length; _i14++) _listenersCollection[_i14].cancel();
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                if (win && win !== constants_WILDCARD || (win = getWildcard()), domain = domain || constants_WILDCARD, 
                existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var regexListeners, regexListener, nameListeners = requestListeners.getOrSet(win, function() {
                    return {};
                }), domainListeners = util_getOrSet(nameListeners, name, function() {
                    return {};
                }), strDomain = domain.toString();
                return util_isRegex(domain) ? (regexListeners = util_getOrSet(domainListeners, __DOMAIN_REGEX__, function() {
                    return [];
                })).push(regexListener = {
                    regex: domain,
                    listener: listener
                }) : domainListeners[strDomain] = listener, {
                    cancel: function() {
                        delete domainListeners[strDomain], regexListener && (regexListeners.splice(regexListeners.indexOf(regexListener, 1)), 
                        regexListeners.length || delete domainListeners[__DOMAIN_REGEX__]), Object.keys(domainListeners).length || delete nameListeners[name], 
                        win && !Object.keys(nameListeners).length && requestListeners.del(win);
                    }
                };
            }({
                name: name,
                win: win,
                domain: domain
            }, {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: win,
                domain: domain || constants_WILDCARD,
                name: name
            });
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        var src_bridge, send_send = function send(win, name, data, options) {
            var domain = (options = options || {}).domain || constants_WILDCARD, responseTimeout = options.timeout || -1, childTimeout = options.timeout || 5e3, fireAndForget = options.fireAndForget || !1;
            return promise_ZalgoPromise.try(function() {
                return function(name, win, domain) {
                    if (!name) throw new Error("Expected name");
                    if (domain && "string" != typeof domain && !Array.isArray(domain) && !util_isRegex(domain)) throw new TypeError("Expected domain to be a string, array, or regex");
                    if (isWindowClosed(win)) throw new Error("Target window is closed");
                }(name, win, domain), function(win, domain, childTimeout, _ref) {
                    var send = _ref.send;
                    return promise_ZalgoPromise.try(function() {
                        return function(parent, child) {
                            var actualParent = getAncestor(child);
                            if (actualParent) return actualParent === parent;
                            if (child === parent) return !1;
                            if (getTop(child) === child) return !1;
                            for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) if (_getFrames8[_i15] === child) return !0;
                            return !1;
                        }(window, win) ? function(win, timeout, name) {
                            void 0 === timeout && (timeout = 5e3), void 0 === name && (name = "Window");
                            var promise = getHelloPromise(win);
                            return -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms"))), 
                            promise;
                        }(win, childTimeout) : util_isRegex(domain) ? sayHello(win, {
                            send: send
                        }) : {
                            domain: domain
                        };
                    }).then(function(_ref2) {
                        return _ref2.domain;
                    });
                }(win, domain, childTimeout, {
                    send: send
                });
            }).then(function(targetDomain) {
                if (!matchDomain(domain, targetDomain)) throw new Error("Domain " + stringify(domain) + " does not match " + stringify(targetDomain));
                domain = targetDomain;
                var logName = name === MESSAGE_NAME.METHOD && data && "string" == typeof data.name ? data.name + "()" : name, promise = new promise_ZalgoPromise(), hash = name + "_" + uniqueID();
                if (!fireAndForget) {
                    var responseListener = {
                        name: name,
                        win: win,
                        domain: domain,
                        promise: promise
                    };
                    !function(hash, listener) {
                        globalStore("responseListeners").set(hash, listener);
                    }(hash, responseListener);
                    var reqPromises = windowStore("requestPromises").getOrSet(win, function() {
                        return [];
                    });
                    reqPromises.push(promise), promise.catch(function() {
                        !function(hash) {
                            globalStore("erroredResponseListeners").set(hash, !0);
                        }(hash), deleteResponseListener(hash);
                    });
                    var totalAckTimeout = function(win) {
                        return windowStore("knownWindows").get(win, !1);
                    }(win) ? 1e4 : 2e3, totalResTimeout = responseTimeout, ackTimeout = totalAckTimeout, resTimeout = totalResTimeout, interval = safeInterval(function() {
                        return isWindowClosed(win) ? promise.reject(new Error("Window closed for " + name + " before " + (responseListener.ack ? "response" : "ack"))) : responseListener.cancelled ? promise.reject(new Error("Response listener was cancelled for " + name)) : (ackTimeout = Math.max(ackTimeout - 500, 0), 
                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - 500, 0)), responseListener.ack || 0 !== ackTimeout ? 0 === resTimeout ? promise.reject(new Error("No response for postMessage " + logName + " in " + utils_getDomain() + " in " + totalResTimeout + "ms")) : void 0 : promise.reject(new Error("No ack for postMessage " + logName + " in " + utils_getDomain() + " in " + totalAckTimeout + "ms")));
                    }, 500);
                    promise.finally(function() {
                        interval.cancel(), reqPromises.splice(reqPromises.indexOf(promise, 1));
                    }).catch(src_util_noop);
                }
                return send_sendMessage(win, domain, {
                    type: "postrobot_message_request",
                    hash: hash,
                    name: name,
                    data: data,
                    fireAndForget: fireAndForget
                }, {
                    on: on_on,
                    send: send
                }), fireAndForget ? promise.resolve() : promise;
            });
        };
        function setup_serializeMessage(destination, domain, obj) {
            return serializeMessage(destination, domain, obj, {
                on: on_on,
                send: send_send
            });
        }
        function setup_deserializeMessage(source, origin, message) {
            return deserializeMessage(source, origin, message, {
                on: on_on,
                send: send_send
            });
        }
        function setup_toProxyWindow(win) {
            return window_ProxyWindow.toProxyWindow(win, {
                send: send_send
            });
        }
        function lib_global_getGlobal(win) {
            if (void 0 === win && (win = window), !isSameDomain(win)) throw new Error("Can not get global for window on different domain");
            return win.__zoid_9_0_22__ || (win.__zoid_9_0_22__ = {}), win.__zoid_9_0_22__;
        }
        function getProxyObject(obj) {
            return {
                get: function() {
                    var _this = this;
                    return promise_ZalgoPromise.try(function() {
                        if (_this.source && _this.source !== window) throw new Error("Can not call get on proxy object from a remote window");
                        return obj;
                    });
                }
            };
        }
        var ZOID = "zoid", POST_MESSAGE_DELEGATE = ZOID + "_delegate", POST_MESSAGE_ALLOW_DELEGATE = ZOID + "_allow_delegate", PROP_TYPE = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number",
            ARRAY: "array"
        }, PROP_SERIALIZATION = {
            JSON: "json",
            DOTIFY: "dotify",
            BASE64: "base64"
        }, CONTEXT = WINDOW_TYPE, src_constants_WILDCARD = "*", DEFAULT_DIMENSIONS = {
            WIDTH: "300px",
            HEIGHT: "150px"
        }, EVENT = {
            RENDER: "zoid-render",
            RENDERED: "zoid-rendered",
            DISPLAY: "zoid-display",
            ERROR: "zoid-error",
            CLOSE: "zoid-close",
            PROPS: "zoid-props",
            RESIZE: "zoid-resize"
        };
        function normalizeChildProp(component, props, key, value, helpers) {
            var prop = component.getPropDefinition(key);
            return prop && "function" == typeof prop.childDecorate ? prop.childDecorate(_extends({
                value: value
            }, helpers)) : value;
        }
        function parseChildWindowName(windowName) {
            return inlineMemoize(parseChildWindowName, function() {
                if (!windowName) throw new Error("No window name");
                var _windowName$split = windowName.split("__"), zoidcomp = _windowName$split[1], name = _windowName$split[2], encodedPayload = _windowName$split[3];
                if (zoidcomp !== ZOID) throw new Error("Window not rendered by zoid - got " + zoidcomp);
                if (!name) throw new Error("Expected component name");
                if (!encodedPayload) throw new Error("Expected encoded payload");
                try {
                    return JSON.parse(function(str) {
                        if ("undefined" != typeof window && "function" == typeof window.atob) return window.atob(str);
                        if ("undefined" != typeof Buffer) return Buffer.from(str, "base64").toString("utf8");
                        throw new Error("Can not find window.atob or Buffer");
                    }(encodedPayload));
                } catch (err) {
                    throw new Error("Can not decode window name payload: " + encodedPayload + ": " + stringifyError(err));
                }
            }, [ windowName ]);
        }
        function getChildPayload() {
            try {
                return parseChildWindowName(window.name);
            } catch (err) {}
        }
        var child_ChildComponent = function() {
            function ChildComponent(component) {
                var _this = this;
                this.component = void 0, this.props = void 0, this.context = void 0, this.parent = void 0, 
                this.parentDomain = void 0, this.parentComponentWindow = void 0, this.onPropHandlers = void 0, 
                this.autoResize = void 0, promise_ZalgoPromise.try(function() {
                    _this.component = component, _this.onPropHandlers = [];
                    var childPayload = getChildPayload();
                    if (!childPayload) throw new Error("No child payload found");
                    if ("9_0_21" !== childPayload.version) throw new Error("Parent window has zoid version " + childPayload.version + ", child window has version 9_0_21");
                    var parent = childPayload.parent, domain = childPayload.domain, exports = childPayload.exports, props = childPayload.props;
                    _this.context = childPayload.context, _this.parentComponentWindow = _this.getParentComponentWindow(parent), 
                    _this.parentDomain = domain, _this.parent = setup_deserializeMessage(_this.parentComponentWindow, domain, exports), 
                    _this.checkParentDomain(domain);
                    var initialProps = _this.getPropsByRef(_this.parentComponentWindow, domain, props);
                    return _this.setProps(initialProps, domain), markWindowKnown(_this.parentComponentWindow), 
                    _this.watchForClose(), _this.parent.init(_this.buildExports());
                }).then(function() {
                    return _this.watchForResize();
                }).catch(function(err) {
                    _this.onError(err);
                });
            }
            var _proto = ChildComponent.prototype;
            return _proto.getHelpers = function() {
                var _this2 = this;
                return {
                    focus: function() {
                        return _this2.focus();
                    },
                    close: function() {
                        return _this2.close();
                    },
                    resize: function(_ref) {
                        return _this2.resize({
                            width: _ref.width,
                            height: _ref.height
                        });
                    },
                    onError: function(err) {
                        return _this2.onError(err);
                    },
                    onProps: function(handler) {
                        return _this2.onProps(handler);
                    },
                    getParent: function() {
                        return _this2.parentComponentWindow;
                    },
                    getParentDomain: function() {
                        return _this2.parentDomain;
                    }
                };
            }, _proto.checkParentDomain = function(domain) {
                if (!matchDomain(this.component.allowedParentDomains, domain)) throw new Error("Can not be rendered by domain: " + domain);
            }, _proto.onProps = function(handler) {
                this.onPropHandlers.push(handler);
            }, _proto.getPropsByRef = function(parentComponentWindow, domain, _ref2) {
                var props, type = _ref2.type, uid = _ref2.uid;
                if ("raw" === type) props = _ref2.value; else if ("uid" === type) {
                    if (!isSameDomain(parentComponentWindow)) throw new Error("Parent component window is on a different domain - expected " + utils_getDomain() + " - can not retrieve props");
                    var global = lib_global_getGlobal(parentComponentWindow);
                    props = assertExists("props", global && global.props[uid]);
                }
                if (!props) throw new Error("Could not find props");
                return setup_deserializeMessage(parentComponentWindow, domain, props);
            }, _proto.getParentComponentWindow = function(ref) {
                var win, n, type = ref.type;
                if ("opener" === type) return assertExists("opener", getOpener(window));
                if ("parent" === type) return assertExists("parent", (win = window, void 0 === (n = ref.distance) && (n = 1), 
                function(win, n) {
                    void 0 === n && (n = 1);
                    for (var parent = win, i = 0; i < n; i++) {
                        if (!parent) return;
                        parent = getParent(parent);
                    }
                    return parent;
                }(win, getDistanceFromTop(win) - n)));
                if ("global" === type) {
                    var uid = ref.uid, ancestor = getAncestor(window);
                    if (!ancestor) throw new Error("Can not find ancestor window");
                    for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor); _i2 < _getAllFramesInWindow2.length; _i2++) {
                        var frame = _getAllFramesInWindow2[_i2];
                        if (isSameDomain(frame)) {
                            var global = lib_global_getGlobal(frame);
                            if (global && global.windows && global.windows[uid]) return global.windows[uid];
                        }
                    }
                }
                throw new Error("Unable to find " + type + " parent component window");
            }, _proto.getProps = function() {
                return this.props = this.props || {}, this.props;
            }, _proto.setProps = function(props, origin, isUpdate) {
                void 0 === isUpdate && (isUpdate = !1);
                var helpers = this.getHelpers(), existingProps = this.getProps();
                extend(existingProps, function(parentComponentWindow, component, props, origin, helpers, isUpdate) {
                    void 0 === isUpdate && (isUpdate = !1);
                    for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(props); _i2 < _Object$keys2.length; _i2++) {
                        var key = _Object$keys2[_i2], prop = component.getPropDefinition(key);
                        if (!prop || !prop.sameDomain || origin === utils_getDomain(window) && isSameDomain(parentComponentWindow)) {
                            var value = normalizeChildProp(component, 0, key, props[key], helpers);
                            result[key] = value, prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                        }
                    }
                    if (!isUpdate) for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(); _i4 < _component$getPropNam2.length; _i4++) {
                        var _key = _component$getPropNam2[_i4];
                        props.hasOwnProperty(_key) || (result[_key] = normalizeChildProp(component, 0, _key, props[_key], helpers));
                    }
                    return result;
                }(this.parentComponentWindow, this.component, props, origin, helpers, isUpdate));
                for (var _i4 = 0, _this$onPropHandlers2 = this.onPropHandlers; _i4 < _this$onPropHandlers2.length; _i4++) _this$onPropHandlers2[_i4].call(this, existingProps);
            }, _proto.watchForClose = function() {
                var _this3 = this;
                window.addEventListener("beforeunload", function() {
                    _this3.parent.checkClose.fireAndForget();
                }), window.addEventListener("unload", function() {
                    _this3.parent.checkClose.fireAndForget();
                }), onCloseWindow(this.parentComponentWindow, function() {
                    _this3.destroy();
                });
            }, _proto.getAutoResize = function() {
                var _ref3 = this.autoResize || this.component.autoResize || {}, _ref3$width = _ref3.width, _ref3$height = _ref3.height, _ref3$element = _ref3.element, element = void 0 === _ref3$element ? "body" : _ref3$element;
                return {
                    width: void 0 !== _ref3$width && _ref3$width,
                    height: void 0 !== _ref3$height && _ref3$height,
                    element: element = getElementSafe(element)
                };
            }, _proto.watchForResize = function() {
                var _this4 = this;
                return waitForDocumentReady().then(function() {
                    if (document.body) return document.body;
                    throw new Error("Document ready but document.body not present");
                }).then(function() {
                    var _this4$getAutoResize = _this4.getAutoResize(), width = _this4$getAutoResize.width, height = _this4$getAutoResize.height, element = _this4$getAutoResize.element;
                    element && (width || height) && _this4.context !== CONTEXT.POPUP && onResize(element, function(_ref4) {
                        _this4.resize({
                            width: width ? _ref4.width : void 0,
                            height: height ? _ref4.height : void 0
                        });
                    }, {
                        width: width,
                        height: height
                    });
                });
            }, _proto.buildExports = function() {
                var self = this;
                return {
                    updateProps: function(props) {
                        var _this5 = this;
                        return promise_ZalgoPromise.try(function() {
                            return self.setProps(props, _this5.__origin__, !0);
                        });
                    },
                    close: function() {
                        return promise_ZalgoPromise.try(function() {
                            return self.destroy();
                        });
                    }
                };
            }, _proto.resize = function(_ref5) {
                return this.parent.resize.fireAndForget({
                    width: _ref5.width,
                    height: _ref5.height
                });
            }, _proto.close = function() {
                return this.parent.close();
            }, _proto.destroy = function() {
                return promise_ZalgoPromise.try(function() {
                    window.close();
                });
            }, _proto.focus = function() {
                return promise_ZalgoPromise.try(function() {
                    window.focus();
                });
            }, _proto.onError = function(err) {
                var _this6 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this6.parent && _this6.parent.onError) return _this6.parent.onError(err);
                    throw err;
                });
            }, ChildComponent;
        }(), RENDER_DRIVERS = {};
        function props_getQueryParam(prop, key, value) {
            return promise_ZalgoPromise.try(function() {
                return "function" == typeof prop.queryParam ? prop.queryParam({
                    value: value
                }) : "string" == typeof prop.queryParam ? prop.queryParam : key;
            });
        }
        function getQueryValue(prop, key, value) {
            return promise_ZalgoPromise.try(function() {
                return "function" == typeof prop.queryValue && isDefined(value) ? prop.queryValue({
                    value: value
                }) : value;
            });
        }
        RENDER_DRIVERS[CONTEXT.IFRAME] = {
            openOnClick: !1,
            openFrame: function() {
                return getProxyObject(dom_iframe({
                    attributes: _extends({
                        title: this.component.name
                    }, this.component.attributes.iframe)
                }));
            },
            open: function(proxyFrame) {
                var _this = this;
                if (!proxyFrame) throw new Error("Expected proxy frame to be passed");
                return proxyFrame.get().then(function(frame) {
                    return awaitFrameWindow(frame).then(function(win) {
                        var element, handler, interval, frameWatcher = (element = frame, handler = once(handler = function() {
                            return _this.close();
                        }), isElementClosed(element) ? handler() : interval = safeInterval(function() {
                            isElementClosed(element) && (interval.cancel(), handler());
                        }, 50), {
                            cancel: function() {
                                interval && interval.cancel();
                            }
                        });
                        return _this.clean.register(function() {
                            return frameWatcher.cancel();
                        }), _this.clean.register(function() {
                            return destroyElement(frame);
                        }), _this.clean.register(function() {
                            return function(win) {
                                for (var _i2 = 0, _requestPromises$get2 = windowStore("requestPromises").get(win, []); _i2 < _requestPromises$get2.length; _i2++) _requestPromises$get2[_i2].reject(new Error("Window cleaned up before response")).catch(src_util_noop);
                            }(win);
                        }), setup_toProxyWindow(win);
                    });
                });
            },
            openPrerenderFrame: function() {
                return getProxyObject(dom_iframe({
                    attributes: _extends({
                        name: "__zoid_prerender_frame__" + this.component.name + "_" + uniqueID() + "__",
                        title: "prerender__" + this.component.name
                    }, this.component.attributes.iframe)
                }));
            },
            openPrerender: function(proxyWin, proxyPrerenderFrame) {
                var _this2 = this;
                if (!proxyPrerenderFrame) throw new Error("Expected proxy frame to be passed");
                return proxyPrerenderFrame.get().then(function(prerenderFrame) {
                    return _this2.clean.register(function() {
                        return destroyElement(prerenderFrame);
                    }), awaitFrameWindow(prerenderFrame).then(function(prerenderFrameWindow) {
                        return assertSameDomain(prerenderFrameWindow);
                    }).then(function(win) {
                        return setup_toProxyWindow(win);
                    });
                });
            },
            delegate: [ "getProxyContainer", "renderContainer", "openFrame", "openPrerenderFrame", "prerender", "open", "openPrerender" ]
        };
        var parent_ParentComponent = function() {
            function ParentComponent(component, props) {
                var _this = this;
                this.component = void 0, this.driver = void 0, this.clean = void 0, this.event = void 0, 
                this.initPromise = void 0, this.handledErrors = void 0, this.props = void 0, this.state = void 0, 
                this.child = void 0, this.proxyWin = void 0, this.initPromise = new promise_ZalgoPromise(), 
                this.handledErrors = [], this.props = {}, this.clean = cleanup(this), this.state = {}, 
                this.component = component, this.setupEvents(props.onError), this.setProps(props), 
                this.component.registerActiveComponent(this), this.clean.register(function() {
                    return _this.component.destroyActiveComponent(_this);
                }), this.watchForUnload();
            }
            var _proto = ParentComponent.prototype;
            return _proto.setupEvents = function(onError) {
                var triggered, handlers, _this2 = this;
                this.event = (triggered = {}, handlers = {}, {
                    on: function(eventName, handler) {
                        var handlerList = handlers[eventName] = handlers[eventName] || [];
                        handlerList.push(handler);
                        var cancelled = !1;
                        return {
                            cancel: function() {
                                cancelled || (cancelled = !0, handlerList.splice(handlerList.indexOf(handler), 1));
                            }
                        };
                    },
                    once: function(eventName, handler) {
                        var listener = this.on(eventName, function() {
                            listener.cancel(), handler();
                        });
                        return listener;
                    },
                    trigger: function(eventName) {
                        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
                        var handlerList = handlers[eventName], promises = [];
                        if (handlerList) for (var _loop = function(_i2) {
                            var handler = handlerList[_i2];
                            promises.push(promise_ZalgoPromise.try(function() {
                                return handler.apply(void 0, args);
                            }));
                        }, _i2 = 0; _i2 < handlerList.length; _i2++) _loop(_i2);
                        return promise_ZalgoPromise.all(promises).then(src_util_noop);
                    },
                    triggerOnce: function(eventName) {
                        if (triggered[eventName]) return promise_ZalgoPromise.resolve();
                        triggered[eventName] = !0;
                        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
                        return this.trigger.apply(this, [ eventName ].concat(args));
                    }
                }), this.event.on(EVENT.RENDER, function() {
                    return _this2.props.onRender();
                }), this.event.on(EVENT.DISPLAY, function() {
                    return _this2.props.onDisplay();
                }), this.event.on(EVENT.RENDERED, function() {
                    return _this2.props.onRendered();
                }), this.event.on(EVENT.CLOSE, function() {
                    return _this2.props.onClose();
                }), this.event.on(EVENT.PROPS, function(props) {
                    return _this2.props.onProps(props);
                }), this.event.on(EVENT.ERROR, function(err) {
                    return _this2.props && _this2.props.onError ? _this2.props.onError(err) : onError ? onError(err) : _this2.initPromise.reject(err).then(function() {
                        setTimeout(function() {
                            throw err;
                        }, 1);
                    });
                });
            }, _proto.render = function(target, container, context) {
                var _this3 = this;
                return promise_ZalgoPromise.try(function() {
                    _this3.component.log("render"), _this3.driver = RENDER_DRIVERS[context];
                    var uid = ZOID + "-" + _this3.component.tag + "-" + uniqueID(), domain = _this3.getDomain(), initialDomain = _this3.getInitialDomain();
                    _this3.component.checkAllowRender(target, domain, container), target !== window && _this3.delegate(context, target);
                    var tasks = {};
                    return tasks.init = _this3.initPromise, tasks.buildUrl = _this3.buildUrl(), tasks.onRender = _this3.event.trigger(EVENT.RENDER), 
                    tasks.getProxyContainer = _this3.getProxyContainer(container), tasks.openFrame = _this3.openFrame(), 
                    tasks.openPrerenderFrame = _this3.openPrerenderFrame(), tasks.renderContainer = promise_ZalgoPromise.all([ tasks.getProxyContainer, tasks.openFrame, tasks.openPrerenderFrame ]).then(function(_ref) {
                        return _this3.renderContainer(_ref[0], {
                            context: context,
                            uid: uid,
                            proxyFrame: _ref[1],
                            proxyPrerenderFrame: _ref[2]
                        });
                    }), tasks.open = _this3.driver.openOnClick ? _this3.open() : tasks.openFrame.then(function(proxyFrame) {
                        return _this3.open(proxyFrame);
                    }), tasks.openPrerender = promise_ZalgoPromise.all([ tasks.open, tasks.openPrerenderFrame ]).then(function(_ref2) {
                        return _this3.openPrerender(_ref2[0], _ref2[1]);
                    }), tasks.setState = promise_ZalgoPromise.all([ tasks.open.then(function(proxyWin) {
                        return _this3.proxyWin = proxyWin, _this3.setProxyWin(proxyWin);
                    }) ]), tasks.prerender = promise_ZalgoPromise.all([ tasks.openPrerender, tasks.setState ]).then(function(_ref3) {
                        return _this3.prerender(_ref3[0], {
                            context: context,
                            uid: uid
                        });
                    }), tasks.loadUrl = promise_ZalgoPromise.all([ tasks.open, tasks.buildUrl, tasks.setWindowName, tasks.prerender ]).then(function(_ref4) {
                        return _ref4[0].setLocation(_ref4[1]);
                    }), tasks.buildWindowName = tasks.open.then(function(proxyWin) {
                        return _this3.buildWindowName({
                            proxyWin: proxyWin,
                            initialDomain: initialDomain,
                            domain: domain,
                            target: target,
                            context: context,
                            uid: uid
                        });
                    }), tasks.setWindowName = promise_ZalgoPromise.all([ tasks.open, tasks.buildWindowName ]).then(function(_ref5) {
                        return _ref5[0].setName(_ref5[1]);
                    }), tasks.watchForClose = tasks.open.then(function(proxyWin) {
                        _this3.watchForClose(proxyWin);
                    }), tasks.onDisplay = promise_ZalgoPromise.all([ tasks.renderContainer, tasks.prerender ]).then(function() {
                        return _this3.event.trigger(EVENT.DISPLAY);
                    }), tasks.openBridge = tasks.open.then(function(proxyWin) {
                        return _this3.openBridge(proxyWin, initialDomain, context);
                    }), tasks.runTimeout = tasks.loadUrl.then(function() {
                        return _this3.runTimeout();
                    }), tasks.onRender = tasks.init.then(function() {
                        return _this3.event.trigger(EVENT.RENDERED);
                    }), promise_ZalgoPromise.hash(tasks);
                }).catch(function(err) {
                    return promise_ZalgoPromise.all([ _this3.onError(err), _this3.destroy(err) ]).then(function() {
                        throw err;
                    });
                }).then(src_util_noop);
            }, _proto.getProxyContainer = function(container) {
                return promise_ZalgoPromise.try(function() {
                    return elementReady(container);
                }).then(function(containerElement) {
                    return getProxyObject(containerElement);
                });
            }, _proto.buildWindowName = function(_ref6) {
                var childPayload = this.buildChildPayload({
                    proxyWin: _ref6.proxyWin,
                    initialDomain: _ref6.initialDomain,
                    domain: _ref6.domain,
                    target: _ref6.target,
                    context: _ref6.context,
                    uid: _ref6.uid
                });
                return "__" + ZOID + "__" + this.component.name + "__" + base64encode(JSON.stringify(childPayload)) + "__";
            }, _proto.getPropsRef = function(proxyWin, initialDomain, domain, uid) {
                var value = setup_serializeMessage(proxyWin, domain, this.getPropsForChild(domain)), propRef = initialDomain === utils_getDomain() ? {
                    type: "uid",
                    uid: uid
                } : {
                    type: "raw",
                    value: value
                };
                if ("uid" === propRef.type) {
                    var global = lib_global_getGlobal(window);
                    global.props = global.props || {}, global.props[uid] = value, this.clean.register(function() {
                        delete global.props[uid];
                    });
                }
                return propRef;
            }, _proto.buildChildPayload = function(_temp) {
                var _ref7 = void 0 === _temp ? {} : _temp, proxyWin = _ref7.proxyWin, initialDomain = _ref7.initialDomain, domain = _ref7.domain, _ref7$target = _ref7.target, target = void 0 === _ref7$target ? window : _ref7$target, context = _ref7.context, uid = _ref7.uid;
                return {
                    uid: uid,
                    context: context,
                    version: "9_0_21",
                    domain: utils_getDomain(window),
                    tag: this.component.tag,
                    parent: this.getWindowRef(target, initialDomain, uid, context),
                    props: this.getPropsRef(proxyWin, initialDomain, domain, uid),
                    exports: setup_serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin))
                };
            }, _proto.setProxyWin = function(proxyWin) {
                var _this4 = this;
                return promise_ZalgoPromise.try(function() {
                    _this4.proxyWin = proxyWin;
                });
            }, _proto.getHelpers = function() {
                var _this5 = this;
                return {
                    state: this.state,
                    event: this.event,
                    close: function() {
                        return _this5.close();
                    },
                    focus: function() {
                        return _this5.focus();
                    },
                    resize: function(_ref8) {
                        return _this5.resize({
                            width: _ref8.width,
                            height: _ref8.height
                        });
                    },
                    onError: function(err) {
                        return _this5.onError(err);
                    },
                    updateProps: function(props) {
                        return _this5.updateProps(props);
                    }
                };
            }, _proto.setProps = function(props, isUpdate) {
                void 0 === isUpdate && (isUpdate = !1), this.component.validate && this.component.validate({
                    props: props
                });
                var helpers = this.getHelpers();
                !function(component, props, inputProps, helpers, isUpdate) {
                    void 0 === isUpdate && (isUpdate = !1), extend(props, inputProps = inputProps || {});
                    for (var propNames = isUpdate ? [] : [].concat(component.getPropNames()), _i2 = 0, _Object$keys2 = Object.keys(inputProps); _i2 < _Object$keys2.length; _i2++) {
                        var key = _Object$keys2[_i2];
                        -1 === propNames.indexOf(key) && propNames.push(key);
                    }
                    for (var aliases = [], state = helpers.state, close = helpers.close, focus = helpers.focus, onError = helpers.onError, _i4 = 0; _i4 < propNames.length; _i4++) {
                        var _key = propNames[_i4], propDef = component.getPropDefinition(_key), value = inputProps[_key];
                        if (propDef) {
                            var alias = propDef.alias;
                            if (alias && (!isDefined(value) && isDefined(inputProps[alias]) && (value = inputProps[alias]), 
                            aliases.push(alias)), propDef.value && (value = propDef.value({
                                props: props,
                                state: state,
                                close: close,
                                focus: focus,
                                onError: onError
                            })), !isDefined(value) && propDef.default && (value = propDef.default({
                                props: props,
                                state: state,
                                close: close,
                                focus: focus,
                                onError: onError
                            })), isDefined(value) && ("array" === propDef.type ? !Array.isArray(value) : typeof value !== propDef.type)) throw new TypeError("Prop is not of type " + propDef.type + ": " + _key);
                            props[_key] = value;
                        }
                    }
                    for (var _i6 = 0; _i6 < aliases.length; _i6++) delete props[aliases[_i6]];
                    for (var _i8 = 0, _Object$keys4 = Object.keys(props); _i8 < _Object$keys4.length; _i8++) {
                        var _key2 = _Object$keys4[_i8], _propDef = component.getPropDefinition(_key2), _value = props[_key2];
                        _propDef && (isDefined(_value) && _propDef.validate && _propDef.validate({
                            value: _value,
                            props: props
                        }), isDefined(_value) && _propDef.decorate && (props[_key2] = _propDef.decorate({
                            value: _value,
                            props: props,
                            state: state,
                            close: close,
                            focus: focus,
                            onError: onError
                        })));
                    }
                    for (var _i10 = 0, _component$getPropNam2 = component.getPropNames(); _i10 < _component$getPropNam2.length; _i10++) {
                        var _key3 = _component$getPropNam2[_i10];
                        if (!1 !== component.getPropDefinition(_key3).required && !isDefined(props[_key3])) throw new Error('Expected prop "' + _key3 + '" to be defined');
                    }
                }(this.component, this.props, props, helpers, isUpdate);
            }, _proto.buildUrl = function() {
                var propsDef, props, params, _this6 = this;
                return (propsDef = _extends({}, this.component.props, this.component.builtinProps), 
                props = this.props, params = {}, promise_ZalgoPromise.all(Object.keys(props).map(function(key) {
                    var prop = propsDef[key];
                    if (prop) return promise_ZalgoPromise.resolve().then(function() {
                        var value = props[key];
                        if (value && prop.queryParam) return value;
                    }).then(function(value) {
                        if (null != value) return promise_ZalgoPromise.all([ props_getQueryParam(prop, key, value), getQueryValue(prop, 0, value) ]).then(function(_ref) {
                            var result, queryParam = _ref[0], queryValue = _ref[1];
                            if ("boolean" == typeof queryValue) result = queryValue.toString(); else if ("string" == typeof queryValue) result = queryValue.toString(); else if ("object" == typeof queryValue && null !== queryValue) {
                                if (prop.serialization === PROP_SERIALIZATION.JSON) result = JSON.stringify(queryValue); else if (prop.serialization === PROP_SERIALIZATION.BASE64) result = btoa(JSON.stringify(queryValue)); else if (prop.serialization === PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
                                    result = function dotify(obj, prefix, newobj) {
                                        for (var key in void 0 === prefix && (prefix = ""), void 0 === newobj && (newobj = {}), 
                                        prefix = prefix ? prefix + "." : prefix, obj) obj.hasOwnProperty(key) && null != obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                                            return "object" != typeof val;
                                        }) ? newobj["" + prefix + key + "[]"] = obj[key].join(",") : obj[key] && "object" == typeof obj[key] ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                                        return newobj;
                                    }(queryValue, key);
                                    for (var _i12 = 0, _Object$keys6 = Object.keys(result); _i12 < _Object$keys6.length; _i12++) {
                                        var dotkey = _Object$keys6[_i12];
                                        params[dotkey] = result[dotkey];
                                    }
                                    return;
                                }
                            } else "number" == typeof queryValue && (result = queryValue.toString());
                            params[queryParam] = result;
                        });
                    });
                })).then(function() {
                    return params;
                })).then(function(query) {
                    return function(url, options) {
                        void 0 === options && (options = {});
                        var originalUrl, originalHash, query = options.query || {}, hash = options.hash || {}, _url$split = url.split("#");
                        originalHash = _url$split[1];
                        var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
                        originalUrl = _originalUrl$split[0];
                        var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
                        return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
                        originalUrl;
                    }(function(url) {
                        if (0 !== getDomainFromUrl(url).indexOf(PROTOCOL.MOCK)) return url;
                        throw new Error("Mock urls not supported out of test mode");
                    }(_this6.component.getUrl(_this6.props)), {
                        query: query
                    });
                });
            }, _proto.getDomain = function() {
                return this.component.getDomain(this.props);
            }, _proto.getInitialDomain = function() {
                return this.component.getInitialDomain(this.props);
            }, _proto.getPropsForChild = function(domain) {
                for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(this.props); _i2 < _Object$keys2.length; _i2++) {
                    var key = _Object$keys2[_i2], prop = this.component.getPropDefinition(key);
                    prop && !1 === prop.sendToChild || prop && prop.sameDomain && !matchDomain(domain, utils_getDomain(window)) || (result[key] = this.props[key]);
                }
                return result;
            }, _proto.updateProps = function(props) {
                var _this7 = this;
                return this.setProps(props, !0), this.initPromise.then(function() {
                    if (_this7.child) return _this7.child.updateProps(_this7.getPropsForChild(_this7.getDomain())).catch(function(err) {
                        if (_this7.child && _this7.proxyWin) return _this7.checkClose(_this7.proxyWin).then(function() {
                            if (_this7.child) throw err;
                        });
                    });
                });
            }, _proto.openFrame = function() {
                var _this8 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this8.driver.openFrame) return _this8.driver.openFrame.call(_this8);
                });
            }, _proto.openPrerenderFrame = function() {
                var _this9 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this9.driver.openPrerenderFrame) return _this9.driver.openPrerenderFrame.call(_this9);
                });
            }, _proto.open = function(proxyFrame) {
                var _this10 = this;
                return promise_ZalgoPromise.try(function() {
                    _this10.component.log("open");
                    var windowProp = _this10.props.window;
                    return windowProp ? (_this10.clean.register(function() {
                        return windowProp.close();
                    }), setup_toProxyWindow(windowProp)) : _this10.driver.open.call(_this10, proxyFrame);
                }).then(function(proxyWin) {
                    return _this10.proxyWin = proxyWin, proxyWin;
                });
            }, _proto.openPrerender = function(proxyWin, proxyPrerenderFrame) {
                var _this11 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this11.driver.openPrerender.call(_this11, proxyWin, proxyPrerenderFrame);
                });
            }, _proto.focus = function() {
                var _this12 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this12.proxyWin) return _this12.proxyWin.focus().then(src_util_noop);
                });
            }, _proto.delegate = function(context, target) {
                var _this13 = this;
                this.component.log("delegate");
                for (var props = {}, _i4 = 0, _this$component$getPr2 = this.component.getPropNames(); _i4 < _this$component$getPr2.length; _i4++) {
                    var propName = _this$component$getPr2[_i4];
                    this.component.getPropDefinition(propName).allowDelegate && (props[propName] = this.props[propName]);
                }
                for (var overridesPromise = send_send(target, POST_MESSAGE_DELEGATE + "_" + this.component.name, {
                    context: context,
                    props: props,
                    overrides: {
                        event: this.event,
                        close: function() {
                            return _this13.close();
                        },
                        onError: function(err) {
                            return _this13.onError(err);
                        }
                    }
                }).then(function(_ref9) {
                    var data = _ref9.data;
                    return _this13.clean.register(data.destroy), data.overrides;
                }).catch(function(err) {
                    throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + stringifyError(err));
                }), _loop = function(_i6, _this$driver$delegate2) {
                    var key = _this$driver$delegate2[_i6];
                    _this13[key] = function() {
                        var _this14 = this, _arguments = arguments;
                        return overridesPromise.then(function(overrides) {
                            return overrides[key].apply(_this14, _arguments);
                        });
                    };
                }, _i6 = 0, _this$driver$delegate2 = this.driver.delegate; _i6 < _this$driver$delegate2.length; _i6++) _loop(_i6, _this$driver$delegate2);
            }, _proto.getWindowRef = function(target, domain, uid, context) {
                if (domain === utils_getDomain(window)) {
                    var global = lib_global_getGlobal(window);
                    return global.windows = global.windows || {}, global.windows[uid] = window, this.clean.register(function() {
                        delete global.windows[uid];
                    }), {
                        type: "global",
                        uid: uid
                    };
                }
                return context === CONTEXT.POPUP ? {
                    type: "opener"
                } : {
                    type: "parent",
                    distance: getDistanceFromTop(window)
                };
            }, _proto.watchForClose = function(proxyWin) {
                var _this15 = this, cancelled = !1;
                return this.clean.register(function() {
                    cancelled = !0;
                }), promise_ZalgoPromise.delay(2e3).then(function() {
                    return proxyWin.isClosed();
                }).then(function(isClosed) {
                    return isClosed ? (_this15.component.log("detect_close_child"), _this15.close()) : cancelled ? void 0 : _this15.watchForClose(proxyWin);
                });
            }, _proto.watchForUnload = function() {
                var _this16 = this, unloadWindowListener = addEventListener(window, "unload", once(function() {
                    _this16.component.log("navigate_away"), _this16.destroy(new Error("Window navigated away"));
                }));
                this.clean.register(unloadWindowListener.cancel);
            }, _proto.runTimeout = function() {
                var _this17 = this;
                return promise_ZalgoPromise.try(function() {
                    var timeout = _this17.props.timeout;
                    if (timeout) return _this17.initPromise.timeout(timeout, new Error("Loading component timed out after " + timeout + " milliseconds"));
                });
            }, _proto.initChild = function(child) {
                var _this18 = this;
                return promise_ZalgoPromise.try(function() {
                    _this18.clean.set("child", child), _this18.initPromise.resolve();
                });
            }, _proto.buildParentExports = function(win) {
                var _this19 = this, onError = function(err) {
                    return _this19.onError(err);
                }, init = function(child) {
                    return _this19.initChild(child);
                };
                return init.onError = onError, {
                    init: init,
                    close: function() {
                        return _this19.close();
                    },
                    checkClose: function() {
                        return _this19.checkClose(win);
                    },
                    resize: function(_ref10) {
                        return _this19.resize({
                            width: _ref10.width,
                            height: _ref10.height
                        });
                    },
                    onError: onError
                };
            }, _proto.resize = function(_ref11) {
                var _this20 = this, width = _ref11.width, height = _ref11.height;
                return promise_ZalgoPromise.try(function() {
                    _this20.event.trigger(EVENT.RESIZE, {
                        width: width,
                        height: height
                    });
                });
            }, _proto.checkClose = function(win) {
                var _this21 = this;
                return win.isClosed().then(function(closed) {
                    return closed ? _this21.close() : promise_ZalgoPromise.delay(200).then(function() {
                        return win.isClosed();
                    }).then(function(secondClosed) {
                        if (secondClosed) return _this21.close();
                    });
                });
            }, _proto.close = function() {
                var _this22 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this22.component.log("close"), _this22.event.trigger(EVENT.CLOSE);
                }).then(function() {
                    return _this22.child && _this22.child.close.fireAndForget().catch(src_util_noop), 
                    _this22.destroy(new Error("Window closed"), !1);
                });
            }, _proto.prerender = function(proxyPrerenderWin, _ref12) {
                var _this23 = this, context = _ref12.context, uid = _ref12.uid;
                return promise_ZalgoPromise.try(function() {
                    var prerenderTemplate = _this23.component.prerenderTemplate;
                    if (prerenderTemplate) {
                        var prerenderWindow = proxyPrerenderWin.getWindow();
                        if (prerenderWindow && isSameDomain(prerenderWindow) && function(win) {
                            try {
                                if (!win.location.href) return !0;
                                if ("about:blank" === win.location.href) return !0;
                            } catch (err) {}
                            return !1;
                        }(prerenderWindow)) {
                            var doc = (prerenderWindow = assertSameDomain(prerenderWindow)).document, el = _this23.renderTemplate(prerenderTemplate, {
                                context: context,
                                uid: uid,
                                doc: doc
                            });
                            if (el) {
                                if (el.ownerDocument !== doc) throw new Error("Expected prerender template to have been created with document from child window");
                                !function(win, el) {
                                    var tag = el.tagName.toLowerCase();
                                    if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                                    for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length; ) documentElement.removeChild(documentElement.children[0]);
                                    for (;el.children.length; ) documentElement.appendChild(el.children[0]);
                                }(prerenderWindow, el);
                                var _ref13 = _this23.component.autoResize || {}, _ref13$width = _ref13.width, width = void 0 !== _ref13$width && _ref13$width, _ref13$height = _ref13.height, height = void 0 !== _ref13$height && _ref13$height, _ref13$element = _ref13.element, element = void 0 === _ref13$element ? "body" : _ref13$element;
                                (element = getElementSafe(element, doc)) && (width || height) && onResize(element, function(_ref14) {
                                    _this23.resize({
                                        width: width ? _ref14.width : void 0,
                                        height: height ? _ref14.height : void 0
                                    });
                                }, {
                                    width: width,
                                    height: height,
                                    win: prerenderWindow
                                });
                            }
                        }
                    }
                });
            }, _proto.renderTemplate = function(renderer, _ref15) {
                var _this24 = this;
                return renderer.call(this, {
                    container: _ref15.container,
                    context: _ref15.context,
                    uid: _ref15.uid,
                    doc: _ref15.doc,
                    frame: _ref15.frame,
                    prerenderFrame: _ref15.prerenderFrame,
                    focus: function() {
                        return _this24.focus();
                    },
                    close: function() {
                        return _this24.close();
                    },
                    state: this.state,
                    props: this.props,
                    tag: this.component.tag,
                    dimensions: this.component.dimensions,
                    event: this.event
                });
            }, _proto.renderContainer = function(proxyContainer, _ref16) {
                var _this25 = this, proxyFrame = _ref16.proxyFrame, proxyPrerenderFrame = _ref16.proxyPrerenderFrame, context = _ref16.context, uid = _ref16.uid;
                return promise_ZalgoPromise.all([ proxyContainer.get().then(elementReady), proxyFrame ? proxyFrame.get() : null, proxyPrerenderFrame ? proxyPrerenderFrame.get() : null ]).then(function(_ref17) {
                    var container = _ref17[0], innerContainer = _this25.renderTemplate(_this25.component.containerTemplate, {
                        context: context,
                        uid: uid,
                        container: container,
                        frame: _ref17[1],
                        prerenderFrame: _ref17[2],
                        doc: document
                    });
                    if (innerContainer) return appendChild(container, innerContainer), _this25.clean.register(function() {
                        return destroyElement(innerContainer);
                    }), getProxyObject(innerContainer);
                });
            }, _proto.destroy = function(err, trigger) {
                var _this26 = this;
                return void 0 === trigger && (trigger = !0), promise_ZalgoPromise.try(function() {
                    return err || (trigger = !1, err = new Error("Component destroyed")), _this26.component.log("destroy"), 
                    _this26.onError(err, trigger);
                }).then(function() {
                    return _this26.clean.all();
                });
            }, _proto.onError = function(err, trigger) {
                var _this27 = this;
                return void 0 === trigger && (trigger = !0), promise_ZalgoPromise.try(function() {
                    if (-1 === _this27.handledErrors.indexOf(err)) return _this27.handledErrors.push(err), 
                    _this27.initPromise.asyncReject(err), trigger ? _this27.event.trigger(EVENT.ERROR, err) : void 0;
                });
            }, _proto.openBridge = function(proxyWin, domain, context) {}, ParentComponent;
        }(), delegate_DelegateComponent = function() {
            function DelegateComponent(component, source, options) {
                var _this = this;
                this.component = void 0, this.source = void 0, this.context = void 0, this.driver = void 0, 
                this.props = void 0, this.clean = void 0, this.focus = void 0, this.resize = void 0, 
                this.renderTemplate = void 0, this.close = void 0, this.onError = void 0, this.event = void 0, 
                this.component = component, this.context = options.context, this.driver = RENDER_DRIVERS[options.context], 
                this.clean = cleanup(this), this.focus = parent_ParentComponent.prototype.focus, 
                this.resize = parent_ParentComponent.prototype.resize, this.renderTemplate = parent_ParentComponent.prototype.renderTemplate, 
                this.props = {};
                for (var _i2 = 0, _Object$keys2 = Object.keys(options.props); _i2 < _Object$keys2.length; _i2++) {
                    var propName = _Object$keys2[_i2], propDef = this.component.getPropDefinition(propName);
                    propDef && propDef.allowDelegate && options.props[propName] && (this.props[propName] = options.props[propName]);
                }
                this.close = options.overrides.close, this.onError = options.overrides.onError, 
                this.event = options.overrides.event, this.component.registerActiveComponent(this), 
                this.clean.register(function() {
                    return _this.component.destroyActiveComponent(_this);
                }), this.watchForSourceClose(source);
            }
            var _proto = DelegateComponent.prototype;
            return _proto.getDelegate = function() {
                var _this2 = this;
                return {
                    overrides: this.getOverrides(),
                    destroy: function() {
                        return _this2.destroy();
                    }
                };
            }, _proto.watchForSourceClose = function(source) {
                var _this3 = this, closeSourceWindowListener = onCloseWindow(source, function() {
                    return _this3.destroy();
                }, 3e3);
                this.clean.register(closeSourceWindowListener.cancel);
            }, _proto.getOverrides = function() {
                for (var overrides = {}, self = this, _loop = function(_i4, _this$driver$delegate2) {
                    var key = _this$driver$delegate2[_i4];
                    overrides[key] = function() {
                        return parent_ParentComponent.prototype[key].apply(self, arguments);
                    }, overrides[key].__name__ = key;
                }, _i4 = 0, _this$driver$delegate2 = this.driver.delegate; _i4 < _this$driver$delegate2.length; _i4++) _loop(_i4, _this$driver$delegate2);
                return overrides;
            }, _proto.destroy = function() {
                return this.clean.all();
            }, DelegateComponent;
        }(), CLASS = {
            VISIBLE: "visible",
            INVISIBLE: "invisible"
        };
        function defaultContainerTemplate(_ref) {
            var uid = _ref.uid, frame = _ref.frame, prerenderFrame = _ref.prerenderFrame, doc = _ref.doc, props = _ref.props, event = _ref.event, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
            if (frame && prerenderFrame) {
                var div = doc.createElement("div");
                div.setAttribute("id", uid);
                var style = doc.createElement("style");
                return props.cspNonce && style.setAttribute("nonce", props.cspNonce), style.appendChild(doc.createTextNode("\n            #" + uid + " {\n                display: inline-block;\n                position: relative;\n                width: " + width + ";\n                height: " + height + ";\n            }\n\n            #" + uid + " > iframe {\n                display: inline-block;\n                position: absolute;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                transition: opacity .2s ease-in-out;\n            }\n\n            #" + uid + " > iframe." + CLASS.INVISIBLE + " {\n                opacity: 0;\n            }\n\n            #" + uid + " > iframe." + CLASS.VISIBLE + " {\n                opacity: 1;\n        }\n        ")), 
                div.appendChild(frame), div.appendChild(prerenderFrame), div.appendChild(style), 
                prerenderFrame.classList.add(CLASS.VISIBLE), frame.classList.add(CLASS.INVISIBLE), 
                event.on(EVENT.RENDERED, function() {
                    prerenderFrame.classList.remove(CLASS.VISIBLE), prerenderFrame.classList.add(CLASS.INVISIBLE), 
                    frame.classList.remove(CLASS.INVISIBLE), frame.classList.add(CLASS.VISIBLE), setTimeout(function() {
                        destroyElement(prerenderFrame);
                    }, 1);
                }), event.on(EVENT.RESIZE, function(_ref2) {
                    var newWidth = _ref2.width, newHeight = _ref2.height;
                    "number" == typeof newWidth && (div.style.width = toCSS(newWidth)), "number" == typeof newHeight && (div.style.height = toCSS(newHeight));
                }), div;
            }
        }
        function defaultPrerenderTemplate(_ref) {
            var doc = _ref.doc, props = _ref.props, html = doc.createElement("html"), body = doc.createElement("body"), style = doc.createElement("style"), spinner = doc.createElement("div");
            return spinner.classList.add("spinner"), props.cspNonce && style.setAttribute("nonce", props.cspNonce), 
            html.appendChild(body), body.appendChild(spinner), body.appendChild(style), style.appendChild(doc.createTextNode("\n            html, body {\n                width: 100%;\n                height: 100%;\n            }\n\n            .spinner {\n                position: fixed;\n                max-height: 60vmin;\n                max-width: 60vmin;\n                height: 40px;\n                width: 40px;\n                top: 50%;\n                left: 50%;\n                box-sizing: border-box;\n                border: 3px solid rgba(0, 0, 0, .2);\n                border-top-color: rgba(33, 128, 192, 0.8);\n                border-radius: 100%;\n                animation: rotation .7s infinite linear;\n            }\n\n            @keyframes rotation {\n                from {\n                    transform: translateX(-50%) translateY(-50%) rotate(0deg);\n                }\n                to {\n                    transform: translateX(-50%) translateY(-50%) rotate(359deg);\n                }\n            }\n        ")), 
            html;
        }
        var props_defaultNoop = function() {
            return src_util_noop;
        }, props_decorateOnce = function(_ref) {
            return once(_ref.value);
        }, component_Component = function() {
            function Component(options) {
                this.tag = void 0, this.name = void 0, this.url = void 0, this.domain = void 0, 
                this.bridgeUrl = void 0, this.props = void 0, this.builtinProps = void 0, this.dimensions = void 0, 
                this.autoResize = void 0, this.allowedParentDomains = void 0, this.defaultContext = void 0, 
                this.attributes = void 0, this.containerTemplate = void 0, this.prerenderTemplate = void 0, 
                this.validate = void 0, this.driverCache = void 0, this.xprops = void 0, this.logger = void 0, 
                this.propNames = void 0, function(options) {
                    if (!options) throw new Error("Expected options to be passed");
                    if (!options.tag || !options.tag.match(/^([a-z0-9]+-)+[a-z0-9]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                    if (function(options) {
                        if (options.props && "object" != typeof options.props) throw new Error("Expected options.props to be an object");
                        var PROP_TYPE_LIST = function(obj) {
                            var result = [];
                            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                            return result;
                        }(PROP_TYPE);
                        if (options.props) for (var _i2 = 0, _Object$keys2 = Object.keys(options.props); _i2 < _Object$keys2.length; _i2++) {
                            var key = _Object$keys2[_i2], prop = options.props[key];
                            if (!prop || "object" != typeof prop) throw new Error("Expected options.props." + key + " to be an object");
                            if (!prop.type) throw new Error("Expected prop.type");
                            if (-1 === PROP_TYPE_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + PROP_TYPE_LIST.join(", "));
                            if (prop.required && prop.default) throw new Error("Required prop can not have a default value");
                            if (prop.type === PROP_TYPE.FUNCTION && prop.queryParam && !prop.queryValue) throw new Error("Do not pass queryParam for function prop");
                        }
                    }(options), options.dimensions) {
                        if (options.dimensions && !isPx(options.dimensions.width) && !isPerc(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                        if (options.dimensions && !isPx(options.dimensions.height) && !isPerc(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                    }
                    if (options.defaultContext && options.defaultContext !== CONTEXT.IFRAME && options.defaultContext !== CONTEXT.POPUP) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                    if (!options.url) throw new Error("Must pass url");
                    if ("string" != typeof options.url && "function" != typeof options.url) throw new TypeError("Expected url to be string or function");
                    if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
                    if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
                }(options), this.tag = options.tag, this.name = this.tag.replace(/-/g, "_"), this.allowedParentDomains = options.allowedParentDomains || src_constants_WILDCARD;
                var global = lib_global_getGlobal();
                if (global.components = global.components || {}, global.components[this.tag]) throw new Error("Can not register multiple components with the same tag: " + this.tag);
                this.builtinProps = {
                    window: {
                        type: "object",
                        sendToChild: !1,
                        required: !1,
                        allowDelegate: !0,
                        validate: function(_ref2) {
                            var value = _ref2.value;
                            if (!isWindow(value) && !window_ProxyWindow.isProxyWindow(value)) throw new Error("Expected Window or ProxyWindow");
                        },
                        decorate: function(_ref3) {
                            return setup_toProxyWindow(_ref3.value);
                        }
                    },
                    timeout: {
                        type: "number",
                        required: !1,
                        sendToChild: !1
                    },
                    close: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref4) {
                            return _ref4.close;
                        }
                    },
                    focus: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref5) {
                            return _ref5.focus;
                        }
                    },
                    resize: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref6) {
                            return _ref6.resize;
                        }
                    },
                    cspNonce: {
                        type: "string",
                        required: !1
                    },
                    getParent: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref7) {
                            return _ref7.getParent;
                        }
                    },
                    getParentDomain: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref8) {
                            return _ref8.getParentDomain;
                        }
                    },
                    onDisplay: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onRendered: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onRender: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onClose: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onError: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref9) {
                            return _ref9.onError;
                        }
                    },
                    onProps: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        childDecorate: function(_ref10) {
                            return _ref10.onProps;
                        }
                    }
                }, this.props = options.props || {};
                var _ref = options.dimensions || {}, _ref$width = _ref.width, _ref$height = _ref.height;
                this.dimensions = {
                    width: void 0 === _ref$width ? DEFAULT_DIMENSIONS.WIDTH : _ref$width,
                    height: void 0 === _ref$height ? DEFAULT_DIMENSIONS.HEIGHT : _ref$height
                }, this.url = options.url, this.domain = options.domain, this.bridgeUrl = options.bridgeUrl, 
                this.attributes = options.attributes || {}, this.attributes.iframe = this.attributes.iframe || {}, 
                this.attributes.popup = this.attributes.popup || {}, this.defaultContext = options.defaultContext || CONTEXT.IFRAME, 
                this.autoResize = options.autoResize, this.containerTemplate = options.containerTemplate ? options.containerTemplate : defaultContainerTemplate, 
                this.prerenderTemplate = options.prerenderTemplate ? options.prerenderTemplate : defaultPrerenderTemplate, 
                this.validate = options.validate, this.logger = options.logger || {
                    debug: src_util_noop,
                    info: src_util_noop,
                    warn: src_util_noop,
                    error: src_util_noop
                }, this.registerChild(), this.listenDelegate(), global.components[this.tag] = this;
            }
            var _proto = Component.prototype;
            return _proto.getPropNames = function() {
                if (this.propNames) return this.propNames;
                for (var propNames = Object.keys(this.props), _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps); _i2 < _Object$keys2.length; _i2++) {
                    var key = _Object$keys2[_i2];
                    -1 === propNames.indexOf(key) && propNames.push(key);
                }
                return this.propNames = propNames, propNames;
            }, _proto.getPropDefinition = function(name) {
                return this.props[name] || this.builtinProps[name];
            }, _proto.driver = function(name, dep) {
                throw new Error("Driver support not enabled");
            }, _proto.registerChild = function() {
                if (this.isChild()) {
                    if (window.xprops) throw new Error("Can not register " + this.name + " as child - can not attach multiple components to the same window");
                    var child = new child_ChildComponent(this);
                    window.xprops = this.xprops = child.getProps();
                }
            }, _proto.listenDelegate = function() {
                var _this = this;
                on_on(POST_MESSAGE_ALLOW_DELEGATE + "_" + this.name, function() {
                    return !0;
                }), on_on(POST_MESSAGE_DELEGATE + "_" + this.name, function(_ref2) {
                    var _ref2$data = _ref2.data;
                    return new delegate_DelegateComponent(_this, _ref2.source, {
                        context: _ref2$data.context,
                        props: _ref2$data.props,
                        overrides: _ref2$data.overrides
                    }).getDelegate();
                });
            }, _proto.canRenderTo = function(win) {
                return send_send(win, POST_MESSAGE_ALLOW_DELEGATE + "_" + this.name).then(function(_ref3) {
                    return _ref3.data;
                }).catch(function() {
                    return !1;
                });
            }, _proto.getUrl = function(props) {
                return "function" == typeof this.url ? this.url({
                    props: props
                }) : this.url;
            }, _proto.getInitialDomain = function(props) {
                return this.domain && "string" == typeof this.domain ? this.domain : getDomainFromUrl(this.getUrl(props));
            }, _proto.getDomain = function(props) {
                return util_isRegex(this.domain) ? this.domain : this.getInitialDomain(props);
            }, _proto.getBridgeUrl = function() {
                if (this.bridgeUrl) return this.bridgeUrl;
            }, _proto.isChild = function() {
                var payload = getChildPayload();
                return Boolean(payload && payload.tag === this.tag);
            }, _proto.getDefaultContainer = function(context, container) {
                if (container) {
                    if ("string" != typeof container && !isElement(container)) throw new TypeError("Expected string or element selector to be passed");
                    return container;
                }
                if (context === CONTEXT.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
            }, _proto.getDefaultContext = function(context, props) {
                if (props.window) return setup_toProxyWindow(props.window).getType();
                if (context) {
                    if (context !== CONTEXT.IFRAME && context !== CONTEXT.POPUP) throw new Error("Unrecognized context: " + context);
                    return context;
                }
                return this.defaultContext;
            }, _proto.init = function(props) {
                var _this2 = this, parent = new parent_ParentComponent(this, props = props || {}), _render = function(target, container, context) {
                    return promise_ZalgoPromise.try(function() {
                        if (!isWindow(target)) throw new Error("Must pass window to renderTo");
                        return context = _this2.getDefaultContext(context, props), container = _this2.getDefaultContainer(context, container), 
                        parent.render(target, container, context);
                    });
                };
                return _extends({}, parent.getHelpers(), {
                    render: function(container, context) {
                        return _render(window, container, context);
                    },
                    renderTo: function(target, container, context) {
                        return _render(target, container, context);
                    }
                });
            }, _proto.checkAllowRender = function(target, domain, container) {
                if (target !== window) {
                    if (!isSameTopWindow(window, target)) throw new Error("Can only renderTo an adjacent frame");
                    var origin = utils_getDomain();
                    if (!matchDomain(domain, origin) && !isSameDomain(target)) throw new Error("Can not render remotely to " + domain.toString() + " - can only render to " + origin);
                    if (container && "string" != typeof container) throw new Error("Container passed to renderTo must be a string selector, got " + typeof container + " }");
                }
            }, _proto.log = function(event, payload) {
                this.logger.info(this.name + "_" + event, payload);
            }, _proto.registerActiveComponent = function(instance) {
                var global = lib_global_getGlobal();
                global.activeComponents = global.activeComponents || [], global.activeComponents.push(instance);
            }, _proto.destroyActiveComponent = function(instance) {
                var global = lib_global_getGlobal();
                global.activeComponents = global.activeComponents || [], global.activeComponents.splice(global.activeComponents.indexOf(instance), 1);
            }, Component;
        }();
        function create(options) {
            var _ref3, on, send, global;
            global_getGlobal().initialized || (global_getGlobal().initialized = !0, on = (_ref3 = {
                on: on_on,
                send: send_send
            }).on, send = _ref3.send, (global = global_getGlobal()).receiveMessage = global.receiveMessage || function(message) {
                return receive_receiveMessage(message, {
                    on: on,
                    send: send
                });
            }, function(_ref5) {
                var on = _ref5.on, send = _ref5.send;
                globalStore().getOrSet("postMessageListener", function() {
                    return addEventListener(window, "message", function(event) {
                        !function(event, _ref4) {
                            var on = _ref4.on, send = _ref4.send, source = event.source || event.sourceElement, origin = event.origin || event.originalEvent && event.originalEvent.origin, data = event.data;
                            if ("null" === origin && (origin = PROTOCOL.FILE + "//"), source) {
                                if (!origin) throw new Error("Post message did not have origin domain");
                                receive_receiveMessage({
                                    source: source,
                                    origin: origin,
                                    data: data
                                }, {
                                    on: on,
                                    send: send
                                });
                            }
                        }(event, {
                            on: on,
                            send: send
                        });
                    });
                });
            }({
                on: on_on,
                send: send_send
            }), function(_ref7) {
                var on = _ref7.on, send = _ref7.send;
                globalStore("builtinListeners").getOrSet("helloListener", function() {
                    var listener = on(MESSAGE_NAME.HELLO, {
                        domain: constants_WILDCARD
                    }, function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin;
                        return getHelloPromise(source).resolve({
                            win: source,
                            domain: origin
                        }), {
                            instanceID: getInstanceID()
                        };
                    }), parent = getAncestor();
                    return parent && sayHello(parent, {
                        send: send
                    }).catch(src_util_noop), listener;
                });
            }({
                on: on_on,
                send: send_send
            }));
            var component = new component_Component(options), init = function(props) {
                return component.init(props);
            };
            return init.driver = function(name, dep) {
                return component.driver(name, dep);
            }, init.isChild = function() {
                return component.isChild();
            }, init.canRenderTo = function(win) {
                return component.canRenderTo(win);
            }, init.xprops = component.xprops, init;
        }
        function destroyAll() {
            src_bridge && src_bridge.destroyBridges();
            var results = [], global = lib_global_getGlobal();
            for (global.activeComponents = global.activeComponents || []; global.activeComponents.length; ) results.push(global.activeComponents[0].destroy(new Error("zoid desroyed all"), !1));
            return promise_ZalgoPromise.all(results).then(src_util_noop);
        }
        var destroyComponents = destroyAll;
        function component_destroy() {
            var listener;
            destroyAll(), delete window.__zoid_9_0_22__, function() {
                for (var responseListeners = globalStore("responseListeners"), _i2 = 0, _responseListeners$ke2 = responseListeners.keys(); _i2 < _responseListeners$ke2.length; _i2++) {
                    var hash = _responseListeners$ke2[_i2], listener = responseListeners.get(hash);
                    listener && (listener.cancelled = !0), responseListeners.del(hash);
                }
            }(), (listener = globalStore().get("postMessageListener")) && listener.cancel(), 
            delete window.__post_robot_10_0_14__;
        }
        __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
            return PopupOpenError;
        }), __webpack_require__.d(__webpack_exports__, "create", function() {
            return create;
        }), __webpack_require__.d(__webpack_exports__, "destroy", function() {
            return component_destroy;
        }), __webpack_require__.d(__webpack_exports__, "destroyComponents", function() {
            return destroyComponents;
        }), __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
            return destroyAll;
        }), __webpack_require__.d(__webpack_exports__, "Component", function() {
            return component_Component;
        }), __webpack_require__.d(__webpack_exports__, "PROP_TYPE", function() {
            return PROP_TYPE;
        }), __webpack_require__.d(__webpack_exports__, "PROP_SERIALIZATION", function() {
            return PROP_SERIALIZATION;
        }), __webpack_require__.d(__webpack_exports__, "CONTEXT", function() {
            return CONTEXT;
        }), __webpack_require__.d(__webpack_exports__, "EVENT", function() {
            return EVENT;
        });
    } ]);
});
//# sourceMappingURL=zoid.frame.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/zoid/dist/zoid.js":
/*!****************************************!*\
  !*** ./node_modules/zoid/dist/zoid.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {!function(root, factory) {
     true ? module.exports = factory() : undefined;
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        }, __webpack_require__.t = function(value, mode) {
            if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return {}.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var interface_namespaceObject = {};
        function _extends() {
            return (_extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }).apply(this, arguments);
        }
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
                var _toString = {}.toString;
                if (_toString) {
                    var name = _toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        __webpack_require__.r(interface_namespaceObject), __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
            return weakmap_CrossDomainSafeWeakMap;
        });
        var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
        function flushActive() {
            if (!activeCount && flushPromise) {
                var promise = flushPromise;
                flushPromise = null, promise.resolve();
            }
        }
        function startActive() {
            activeCount += 1;
        }
        function endActive() {
            activeCount -= 1, flushActive();
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
                this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
                this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
                this.handlers = [], handler) {
                    var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                    startActive();
                    try {
                        handler(function(res) {
                            isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                        }, function(err) {
                            isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                        });
                    } catch (err) {
                        return endActive(), void this.reject(err);
                    }
                    endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            var _proto = ZalgoPromise.prototype;
            return _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0, this.value = result, this.dispatch(), this;
            }, _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err), setTimeout(function() {
                                throw err;
                            }, 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }, 1), this.dispatch(), this;
            }, _proto.asyncReject = function(error) {
                return this.errorHandled = !0, this.reject(error), this;
            }, _proto.dispatch = function() {
                var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0, startActive();
                    for (var _loop = function(i) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                        if (resolved) try {
                            result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                        } catch (err) {
                            return promise.reject(err), "continue";
                        } else if (rejected) {
                            if (!onError) return promise.reject(_this3.error), "continue";
                            try {
                                result = onError(_this3.error);
                            } catch (err) {
                                return promise.reject(err), "continue";
                            }
                        }
                        result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                        result.errorHandled = !0) : utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                            promise.resolve(res);
                        }, function(err) {
                            promise.reject(err);
                        }) : promise.resolve(result);
                    }, i = 0; i < handlers.length; i++) _loop(i);
                    handlers.length = 0, this.dispatching = !1, endActive();
                }
            }, _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise();
                return this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                }), this.errorHandled = !0, this.dispatch(), promise;
            }, _proto.catch = function(onError) {
                return this.then(void 0, onError);
            }, _proto.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then(function(result) {
                    return ZalgoPromise.try(onFinally).then(function() {
                        return result;
                    });
                }, function(err) {
                    return ZalgoPromise.try(onFinally).then(function() {
                        throw err;
                    });
                });
            }, _proto.timeout = function(time, err) {
                var _this4 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout(function() {
                    _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                }, time);
                return this.then(function(result) {
                    return clearTimeout(timeout), result;
                });
            }, _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            }, ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                    return value.then(resolve, reject);
                }) : new ZalgoPromise().resolve(value);
            }, ZalgoPromise.reject = function(error) {
                return new ZalgoPromise().reject(error);
            }, ZalgoPromise.asyncReject = function(error) {
                return new ZalgoPromise().asyncReject(error);
            }, ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise(), count = promises.length, results = [];
                if (!count) return promise.resolve(results), promise;
                for (var _loop2 = function(i) {
                    var prom = promises[i];
                    if (prom instanceof ZalgoPromise) {
                        if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                    } else if (!utils_isPromise(prom)) return results[i] = prom, count -= 1, "continue";
                    ZalgoPromise.resolve(prom).then(function(result) {
                        results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                    }, function(err) {
                        promise.reject(err);
                    });
                }, i = 0; i < promises.length; i++) _loop2(i);
                return 0 === count && promise.resolve(results), promise;
            }, ZalgoPromise.hash = function(promises) {
                var result = {};
                return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                    return ZalgoPromise.resolve(promises[key]).then(function(value) {
                        result[key] = value;
                    });
                })).then(function() {
                    return result;
                });
            }, ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    return possiblyUnhandledPromiseHandlers.push(handler), {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            }, ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    return endActive(), ZalgoPromise.reject(err);
                }
                return endActive(), ZalgoPromise.resolve(result);
            }, ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise(function(resolve) {
                    setTimeout(resolve, _delay);
                });
            }, ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            }, ZalgoPromise.flush = function() {
                return promise = flushPromise = flushPromise || new ZalgoPromise(), flushActive(), 
                promise;
                var promise;
            }, ZalgoPromise;
        }();
        function isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        var PROTOCOL = {
            MOCK: "mock:",
            FILE: "file:",
            ABOUT: "about:"
        }, WILDCARD = "*", WINDOW_TYPE = {
            IFRAME: "iframe",
            POPUP: "popup"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {}
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {}
        }
        function canReadFromWindow(win) {
            try {
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            var location = (win = win || window).location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
            if (protocol === PROTOCOL.ABOUT) {
                var parent = getParent(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function utils_getDomain(win) {
            var domain = getActualDomain(win = win || window);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
        }
        function isSameDomain(win) {
            if (!function(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                if (utils_getDomain(window) === utils_getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function assertSameDomain(win) {
            if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
            return win;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== function(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
                } catch (err) {}
                return result;
            }(child).indexOf(parent);
        }
        function getFrames(win) {
            var frames, len, result = [];
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            try {
                len = frames.length;
            } catch (err) {}
            if (0 === len) return result;
            if (len) {
                for (var i = 0; i < len; i++) {
                    var frame = void 0;
                    try {
                        frame = frames[i];
                    } catch (err) {
                        continue;
                    }
                    result.push(frame);
                }
                return result;
            }
            for (var _i = 0; _i < 100; _i++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
                var frame = _getFrames2[_i3];
                result.push(frame);
                for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
            }
            return result;
        }
        function getTop(win) {
            if (win) {
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
                    var frame = _getAllChildFrames4[_i7];
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            if (!top) throw new Error("Can not determine top window");
            return [].concat(getAllChildFrames(top), [ top ]);
        }
        var iframeWindows = [], iframeFrames = [];
        function isWindowClosed(win, allowMock) {
            void 0 === allowMock && (allowMock = !0);
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            var iframeIndex = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && function(frame) {
                    if (!frame.contentWindow) return !0;
                    if (!frame.parentNode) return !0;
                    var doc = frame.ownerDocument;
                    return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                }(frame)) return !0;
            }
            return !1;
        }
        function utils_getUserAgent(win) {
            return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _i9 = 0; _i9 < winFrames.length; _i9++) {
                var childFrame = winFrames[_i9];
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame)) return childFrame;
                } catch (err) {}
            }
            try {
                if (-1 !== winFrames.indexOf(win.frames[name])) return win.frames[name];
            } catch (err) {}
            try {
                if (-1 !== winFrames.indexOf(win[name])) return win[name];
            } catch (err) {}
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            return getOpener(win = win || window) || getParent(win) || void 0;
        }
        function anyMatch(collection1, collection2) {
            for (var _i17 = 0; _i17 < collection1.length; _i17++) for (var item1 = collection1[_i17], _i19 = 0; _i19 < collection2.length; _i19++) if (item1 === collection2[_i19]) return !0;
            return !1;
        }
        function getDistanceFromTop(win) {
            void 0 === win && (win = window);
            for (var distance = 0, parent = win; parent; ) (parent = getParent(parent)) && (distance += 1);
            return distance;
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
            1));
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === WILDCARD || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function getDomainFromUrl(url) {
            return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : utils_getDomain();
        }
        function onCloseWindow(win, callback, delay, maxtime) {
            var timeout;
            return void 0 === delay && (delay = 1e3), void 0 === maxtime && (maxtime = 1 / 0), 
            function check() {
                if (isWindowClosed(win)) return timeout && clearTimeout(timeout), callback();
                maxtime <= 0 ? clearTimeout(timeout) : (maxtime -= delay, timeout = setTimeout(check, delay));
            }(), {
                cancel: function() {
                    timeout && clearTimeout(timeout);
                }
            };
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === {}.toString.call(obj)) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            return !1;
        }
        function normalizeMockUrl(url) {
            if (0 !== getDomainFromUrl(url).indexOf(PROTOCOL.MOCK)) return url;
            throw new Error("Mock urls not supported out of test mode");
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var objectIDs, awaitFrameLoadPromises, defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
                counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
                function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap(), testKey = {};
                        return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap();
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            return _proto._cleanupClosedWindows = function() {
                for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                    }
                }
            }, _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            }, _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var name = this.name, entry = key[name];
                    entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    });
                } else {
                    this._cleanupClosedWindows();
                    var keys = this.keys, values = this.values, index = util_safeIndexOf(keys, key);
                    -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
                }
            }, _proto.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (!this.isSafeToReadWrite(key)) {
                    this._cleanupClosedWindows();
                    var index = util_safeIndexOf(this.keys, key);
                    if (-1 === index) return;
                    return this.values[index];
                }
                var entry = key[this.name];
                if (entry && entry[0] === key) return entry[1];
            }, _proto.delete = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.delete(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var entry = key[this.name];
                    entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                } else {
                    this._cleanupClosedWindows();
                    var keys = this.keys, index = util_safeIndexOf(keys, key);
                    -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
                }
            }, _proto.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return !0;
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                }
                return this._cleanupClosedWindows(), -1 !== util_safeIndexOf(this.keys, key);
            }, _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                return this.set(key, value), value;
            }, CrossDomainSafeWeakMap;
        }();
        function base64encode(str) {
            if ("function" == typeof btoa) return btoa(str);
            if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
            throw new Error("Can not find window.btoa or Buffer");
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap(), null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        return uid || (uid = typeof obj + ":" + uniqueID(), objectIDs.set(obj, uid)), uid;
                    }(val) + "]" : val;
                });
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        function memoizePromise(method) {
            var cache = {};
            function memoizedPromiseFunction() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = method.apply(this, arguments).finally(function() {
                    delete cache[key];
                }), cache[key]);
            }
            return memoizedPromiseFunction.reset = function() {
                cache = {};
            }, memoizedPromiseFunction;
        }
        function inlineMemoize(method, logic, args) {
            void 0 === args && (args = []);
            var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
            return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
        }
        function src_util_noop() {}
        function once(method) {
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        }
        function stringifyError(err, level) {
            if (void 0 === level && (level = 1), level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack, message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
            } catch (newErr) {
                return "Error while stringifying error: " + stringifyError(newErr, level + 1);
            }
        }
        function stringify(item) {
            return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : {}.toString.call(item);
        }
        function extend(obj, source) {
            if (!source) return obj;
            if (Object.assign) return Object.assign(obj, source);
            for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function safeInterval(method, time) {
            var timeout;
            return function loop() {
                timeout = setTimeout(function() {
                    method(), loop();
                }, time);
            }(), {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isDefined(value) {
            return null != value;
        }
        function util_isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        function util_getOrSet(obj, key, getter) {
            if (obj.hasOwnProperty(key)) return obj[key];
            var val = getter();
            return obj[key] = val, val;
        }
        function cleanup(obj) {
            var tasks = [], cleaned = !1;
            return {
                set: function(name, item) {
                    return cleaned || (obj[name] = item, this.register(function() {
                        delete obj[name];
                    })), item;
                },
                register: function(method) {
                    cleaned ? method() : tasks.push(once(method));
                },
                all: function() {
                    var results = [];
                    for (cleaned = !0; tasks.length; ) {
                        var task = tasks.pop();
                        results.push(task());
                    }
                    return promise_ZalgoPromise.all(results).then(src_util_noop);
                }
            };
        }
        function assertExists(name, thing) {
            if (null == thing) throw new Error("Expected " + name + " to be present");
            return thing;
        }
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
        }
        function waitForDocumentReady() {
            return inlineMemoize(waitForDocumentReady, function() {
                return new promise_ZalgoPromise(function(resolve) {
                    if (isDocumentReady()) return resolve();
                    var interval = setInterval(function() {
                        if (isDocumentReady()) return clearInterval(interval), resolve();
                    }, 10);
                });
            });
        }
        function parseQuery(queryString) {
            return inlineMemoize(parseQuery, function() {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) return params;
                for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                    var pair = _queryString$split2[_i2];
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            }, [ queryString ]);
        }
        function extendQuery(originalQuery, props) {
            return void 0 === props && (props = {}), props && Object.keys(props).length ? (void 0 === (obj = _extends({}, parseQuery(originalQuery), props)) && (obj = {}), 
            Object.keys(obj).filter(function(key) {
                return "string" == typeof obj[key];
            }).map(function(key) {
                return urlEncode(key) + "=" + urlEncode(obj[key]);
            }).join("&")) : originalQuery;
            var obj;
        }
        function appendChild(container, child) {
            container.appendChild(child);
        }
        function isElement(element) {
            return element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument;
        }
        function getElementSafe(id, doc) {
            return void 0 === doc && (doc = document), isElement(id) ? id : "string" == typeof id ? doc.querySelector(id) : void 0;
        }
        function elementReady(id) {
            return new promise_ZalgoPromise(function(resolve, reject) {
                var name = stringify(id), el = getElementSafe(id);
                if (el) return resolve(el);
                if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                var interval = setInterval(function() {
                    return (el = getElementSafe(id)) ? (clearInterval(interval), resolve(el)) : isDocumentReady() ? (clearInterval(interval), 
                    reject(new Error("Document is ready and element " + name + " does not exist"))) : void 0;
                }, 10);
            });
        }
        function PopupOpenError(message) {
            this.message = message;
        }
        function awaitFrameLoad(frame) {
            if ((awaitFrameLoadPromises = awaitFrameLoadPromises || new weakmap_CrossDomainSafeWeakMap()).has(frame)) {
                var _promise = awaitFrameLoadPromises.get(frame);
                if (_promise) return _promise;
            }
            var promise = new promise_ZalgoPromise(function(resolve, reject) {
                frame.addEventListener("load", function() {
                    (function(frame) {
                        if (function() {
                            for (var i = 0; i < iframeWindows.length; i++) {
                                var closed = !1;
                                try {
                                    closed = iframeWindows[i].closed;
                                } catch (err) {}
                                closed && (iframeFrames.splice(i, 1), iframeWindows.splice(i, 1));
                            }
                        }(), frame && frame.contentWindow) try {
                            iframeWindows.push(frame.contentWindow), iframeFrames.push(frame);
                        } catch (err) {}
                    })(frame), resolve(frame);
                }), frame.addEventListener("error", function(err) {
                    frame.contentWindow ? resolve(frame) : reject(err);
                });
            });
            return awaitFrameLoadPromises.set(frame, promise), promise;
        }
        function awaitFrameWindow(frame) {
            return awaitFrameLoad(frame).then(function(loadedFrame) {
                if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                return loadedFrame.contentWindow;
            });
        }
        function dom_iframe(options, container) {
            void 0 === options && (options = {});
            var style = options.style || {}, frame = function(tag, options, container) {
                void 0 === tag && (tag = "div"), void 0 === options && (options = {}), tag = tag.toLowerCase();
                var el, styleText, doc, element = document.createElement(tag);
                if (options.style && extend(element.style, options.style), options.class && (element.className = options.class.join(" ")), 
                options.id && element.setAttribute("id", options.id), options.attributes) for (var _i6 = 0, _Object$keys2 = Object.keys(options.attributes); _i6 < _Object$keys2.length; _i6++) {
                    var key = _Object$keys2[_i6];
                    element.setAttribute(key, options.attributes[key]);
                }
                if (options.styleSheet && (el = element, styleText = options.styleSheet, void 0 === doc && (doc = window.document), 
                el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText))), 
                options.html) {
                    if ("iframe" === tag) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    element.innerHTML = options.html;
                }
                return element;
            }("iframe", {
                attributes: _extends({
                    allowTransparency: "true"
                }, options.attributes || {}),
                style: _extends({
                    backgroundColor: "transparent",
                    border: "none"
                }, style),
                html: options.html,
                class: options.class
            }), isIE = window.navigator.userAgent.match(/MSIE|Edge/i);
            return frame.hasAttribute("id") || frame.setAttribute("id", uniqueID()), awaitFrameLoad(frame), 
            container && function(id, doc) {
                void 0 === doc && (doc = document);
                var element = getElementSafe(id, doc);
                if (element) return element;
                throw new Error("Can not find element: " + stringify(id));
            }(container).appendChild(frame), (options.url || isIE) && frame.setAttribute("src", options.url || "about:blank"), 
            frame;
        }
        function addEventListener(obj, event, handler) {
            return obj.addEventListener(event, handler), {
                cancel: function() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function destroyElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element);
        }
        function isElementClosed(el) {
            return !el || !el.parentNode;
        }
        function onResize(el, handler, _temp) {
            var _ref2 = void 0 === _temp ? {} : _temp, _ref2$width = _ref2.width, width = void 0 === _ref2$width || _ref2$width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$interval = _ref2.interval, interval = void 0 === _ref2$interval ? 100 : _ref2$interval, _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, currentWidth = el.offsetWidth, currentHeight = el.offsetHeight;
            handler({
                width: currentWidth,
                height: currentHeight
            });
            var observer, timeout, check = function() {
                var newWidth = el.offsetWidth, newHeight = el.offsetHeight;
                (width && newWidth !== currentWidth || height && newHeight !== currentHeight) && handler({
                    width: newWidth,
                    height: newHeight
                }), currentWidth = newWidth, currentHeight = newHeight;
            };
            return void 0 !== win.ResizeObserver ? (observer = new win.ResizeObserver(check)).observe(el) : void 0 !== win.MutationObserver ? ((observer = new win.MutationObserver(check)).observe(el, {
                attributes: !0,
                childList: !0,
                subtree: !0,
                characterData: !1
            }), win.addEventListener("resize", check)) : function loop() {
                check(), timeout = setTimeout(loop, interval);
            }(), {
                cancel: function() {
                    observer.disconnect(), window.removeEventListener("resize", check), clearTimeout(timeout);
                }
            };
        }
        function isPerc(str) {
            return "string" == typeof str && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return "string" == typeof str && /^[0-9]+px$/.test(str);
        }
        function toNum(val) {
            if ("number" == typeof val) return val;
            var match = val.match(/^([0-9]+)(px|%)$/);
            if (!match) throw new Error("Could not match css value from " + val);
            return parseInt(match[1], 10);
        }
        function toPx(val) {
            return toNum(val) + "px";
        }
        function toCSS(val) {
            return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
        }
        function normalizeDimension(dim, max) {
            if ("number" == typeof dim) return dim;
            if (isPerc(dim)) return parseInt(max * toNum(dim) / 100, 10);
            if (isPx(dim)) return toNum(dim);
            throw new Error("Can not normalize dimension: " + dim);
        }
        PopupOpenError.prototype = Object.create(Error.prototype);
        var MESSAGE_NAME = {
            METHOD: "postrobot_method",
            HELLO: "postrobot_hello",
            OPEN_TUNNEL: "postrobot_open_tunnel"
        }, BRIDGE_NAME_PREFIX = "__postrobot_bridge__", constants_WILDCARD = "*", SERIALIZATION_TYPE = {
            CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
            CROSS_DOMAIN_FUNCTION: "cross_domain_function",
            CROSS_DOMAIN_WINDOW: "cross_domain_window"
        };
        function global_getGlobal(win) {
            return void 0 === win && (win = window), win !== window ? win.__post_robot_10_0_14__ : win.__post_robot_10_0_14__ = win.__post_robot_10_0_14__ || {};
        }
        var getObj = function() {
            return {};
        };
        function globalStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            util_getOrSet(global_getGlobal(), key, function() {
                var store = defStore();
                return {
                    has: function(storeKey) {
                        return store.hasOwnProperty(storeKey);
                    },
                    get: function(storeKey, defVal) {
                        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
                    },
                    set: function(storeKey, val) {
                        return store[storeKey] = val, val;
                    },
                    del: function(storeKey) {
                        delete store[storeKey];
                    },
                    getOrSet: function(storeKey, getter) {
                        return util_getOrSet(store, storeKey, getter);
                    },
                    reset: function() {
                        store = defStore();
                    },
                    keys: function() {
                        return Object.keys(store);
                    }
                };
            });
        }
        var WildCard = function() {};
        function getWildcard() {
            var global = global_getGlobal();
            return global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard(), global.WINDOW_WILDCARD;
        }
        function windowStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            globalStore("windowStore").getOrSet(key, function() {
                var winStore = new weakmap_CrossDomainSafeWeakMap(), getStore = function(win) {
                    return winStore.getOrSet(win, defStore);
                };
                return {
                    has: function(win) {
                        return getStore(win).hasOwnProperty(key);
                    },
                    get: function(win, defVal) {
                        var store = getStore(win);
                        return store.hasOwnProperty(key) ? store[key] : defVal;
                    },
                    set: function(win, val) {
                        return getStore(win)[key] = val, val;
                    },
                    del: function(win) {
                        delete getStore(win)[key];
                    },
                    getOrSet: function(win, getter) {
                        return util_getOrSet(getStore(win), key, getter);
                    }
                };
            });
        }
        function getInstanceID() {
            return globalStore("instance").getOrSet("instanceID", uniqueID);
        }
        function getHelloPromise(win) {
            return windowStore("helloPromises").getOrSet(win, function() {
                return new promise_ZalgoPromise();
            });
        }
        function sayHello(win, _ref3) {
            return (0, _ref3.send)(win, MESSAGE_NAME.HELLO, {
                instanceID: getInstanceID()
            }, {
                domain: constants_WILDCARD,
                timeout: -1
            }).then(function(_ref4) {
                var origin = _ref4.origin, instanceID = _ref4.data.instanceID;
                return getHelloPromise(win).resolve({
                    win: win,
                    domain: origin
                }), {
                    win: win,
                    domain: origin,
                    instanceID: instanceID
                };
            });
        }
        function getWindowInstanceID(win, _ref5) {
            var send = _ref5.send;
            return windowStore("windowInstanceIDPromises").getOrSet(win, function() {
                return sayHello(win, {
                    send: send
                }).then(function(_ref6) {
                    return _ref6.instanceID;
                });
            });
        }
        function awaitWindowHello(win, timeout, name) {
            void 0 === timeout && (timeout = 5e3), void 0 === name && (name = "Window");
            var promise = getHelloPromise(win);
            return -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms"))), 
            promise;
        }
        function markWindowKnown(win) {
            windowStore("knownWindows").set(win, !0);
        }
        var _SERIALIZER, TYPE = {
            FUNCTION: "function",
            ERROR: "error",
            PROMISE: "promise",
            REGEX: "regex",
            DATE: "date",
            ARRAY: "array",
            OBJECT: "object",
            STRING: "string",
            NUMBER: "number",
            BOOLEAN: "boolean",
            NULL: "null",
            UNDEFINED: "undefined"
        };
        function isSerializedType(item) {
            return "object" == typeof item && null !== item && "string" == typeof item.__type__;
        }
        function determineType(val) {
            return void 0 === val ? TYPE.UNDEFINED : null === val ? TYPE.NULL : Array.isArray(val) ? TYPE.ARRAY : "function" == typeof val ? TYPE.FUNCTION : "object" == typeof val ? val instanceof Error ? TYPE.ERROR : "function" == typeof val.then ? TYPE.PROMISE : "[object RegExp]" === {}.toString.call(val) ? TYPE.REGEX : "[object Date]" === {}.toString.call(val) ? TYPE.DATE : TYPE.OBJECT : "string" == typeof val ? TYPE.STRING : "number" == typeof val ? TYPE.NUMBER : "boolean" == typeof val ? TYPE.BOOLEAN : void 0;
        }
        function serializeType(type, val) {
            return {
                __type__: type,
                __val__: val
            };
        }
        var _DESERIALIZER, SERIALIZER = ((_SERIALIZER = {})[TYPE.FUNCTION] = function() {}, 
        _SERIALIZER[TYPE.ERROR] = function(_ref) {
            return serializeType(TYPE.ERROR, {
                message: _ref.message,
                stack: _ref.stack,
                code: _ref.code
            });
        }, _SERIALIZER[TYPE.PROMISE] = function() {}, _SERIALIZER[TYPE.REGEX] = function(val) {
            return serializeType(TYPE.REGEX, val.source);
        }, _SERIALIZER[TYPE.DATE] = function(val) {
            return serializeType(TYPE.DATE, val.toJSON());
        }, _SERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _SERIALIZER), defaultSerializers = {}, DESERIALIZER = ((_DESERIALIZER = {})[TYPE.FUNCTION] = function() {
            throw new Error("Function serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.ERROR] = function(_ref2) {
            var stack = _ref2.stack, code = _ref2.code, error = new Error(_ref2.message);
            return error.code = code, error.stack = stack + "\n\n" + error.stack, error;
        }, _DESERIALIZER[TYPE.PROMISE] = function() {
            throw new Error("Promise serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.REGEX] = function(val) {
            return new RegExp(val);
        }, _DESERIALIZER[TYPE.DATE] = function(val) {
            return new Date(val);
        }, _DESERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _DESERIALIZER), defaultDeserializers = {};
        function needsBridgeForBrowser() {
            return !!utils_getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i);
        }
        function needsBridgeForWin(win) {
            return !isSameTopWindow(window, win);
        }
        function needsBridgeForDomain(domain, win) {
            if (domain) {
                if (utils_getDomain() !== getDomainFromUrl(domain)) return !0;
            } else if (win && !isSameDomain(win)) return !0;
            return !1;
        }
        function needsBridge(_ref) {
            var win = _ref.win, domain = _ref.domain;
            return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
        }
        function getBridgeName(domain) {
            var sanitizedDomain = (domain = domain || getDomainFromUrl(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
            return BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
        }
        function isBridge() {
            return Boolean(window.name && window.name === getBridgeName(utils_getDomain()));
        }
        var documentBodyReady = new promise_ZalgoPromise(function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(function() {
                if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
            }, 10);
        });
        function registerRemoteWindow(win) {
            windowStore("remoteWindowPromises").getOrSet(win, function() {
                return new promise_ZalgoPromise();
            });
        }
        function findRemoteWindow(win) {
            var remoteWinPromise = windowStore("remoteWindowPromises").get(win);
            if (!remoteWinPromise) throw new Error("Remote window promise not found");
            return remoteWinPromise;
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            findRemoteWindow(win).resolve(function(remoteWin, remoteDomain, message) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if (!matchDomain(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                sendMessage.fireAndForget(message);
            });
        }
        function rejectRemoteSendMessage(win, err) {
            findRemoteWindow(win).reject(err).catch(src_util_noop);
        }
        function linkWindow(_ref3) {
            for (var win = _ref3.win, name = _ref3.name, domain = _ref3.domain, popupWindowsByName = globalStore("popupWindowsByName"), popupWindowsByWin = windowStore("popupWindowsByWin"), _i2 = 0, _popupWindowsByName$k2 = popupWindowsByName.keys(); _i2 < _popupWindowsByName$k2.length; _i2++) {
                var winName = _popupWindowsByName$k2[_i2];
                isWindowClosed(popupWindowsByName.get(winName).win) && popupWindowsByName.del(winName);
            }
            var details = popupWindowsByWin.getOrSet(win, function() {
                return name ? popupWindowsByName.getOrSet(name, function() {
                    return {
                        win: win,
                        name: name
                    };
                }) : {
                    win: win
                };
            });
            if (details.win && details.win !== win) throw new Error("Different window already linked for window: " + (name || "undefined"));
            if (name) {
                if (details.name && details.name !== name) throw new Error("Different window already linked for name " + name + ": " + details.name);
                details.name = name, popupWindowsByName.set(name, details);
            }
            return domain && (details.domain = domain, registerRemoteWindow(win)), popupWindowsByWin.set(win, details), 
            details;
        }
        function setupBridge(_ref) {
            var windowOpen, on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage;
            windowOpen = window.open, window.open = function(url, name, options, last) {
                var win = windowOpen.call(this, normalizeMockUrl(url), name, options, last);
                return win ? (linkWindow({
                    win: win,
                    name: name,
                    domain: url ? getDomainFromUrl(url) : null
                }), win) : win;
            }, function(_ref) {
                var on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage, popupWindowsByName = globalStore("popupWindowsByName");
                on(MESSAGE_NAME.OPEN_TUNNEL, function(_ref2) {
                    var source = _ref2.source, origin = _ref2.origin, data = _ref2.data, bridgePromise = globalStore("bridges").get(origin);
                    if (!bridgePromise) throw new Error("Can not find bridge promise for domain " + origin);
                    return bridgePromise.then(function(bridge) {
                        if (source !== bridge) throw new Error("Message source does not matched registered bridge for domain " + origin);
                        if (!data.name) throw new Error("Register window expected to be passed window name");
                        if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                        if (!popupWindowsByName.has(data.name)) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                        if (!popupWindowsByName.get(data.name).domain) throw new Error("We do not have a registered domain for window " + data.name);
                        if (popupWindowsByName.get(data.name).domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + popupWindowsByName.get(data.name).domain);
                        return registerRemoteSendMessage(popupWindowsByName.get(data.name).win, origin, data.sendMessage), 
                        {
                            sendMessage: function(message) {
                                if (window && !window.closed) {
                                    var winDetails = popupWindowsByName.get(data.name);
                                    if (winDetails) try {
                                        receiveMessage({
                                            data: message,
                                            origin: winDetails.domain,
                                            source: winDetails.win
                                        }, {
                                            on: on,
                                            send: send
                                        });
                                    } catch (err) {
                                        promise_ZalgoPromise.reject(err);
                                    }
                                }
                            }
                        };
                    });
                });
            }({
                on: on,
                send: send,
                receiveMessage: receiveMessage
            }), function(_ref2) {
                var send = _ref2.send;
                global_getGlobal(window).openTunnelToParent = function(_ref3) {
                    var name = _ref3.name, source = _ref3.source, canary = _ref3.canary, sendMessage = _ref3.sendMessage, tunnelWindows = globalStore("tunnelWindows"), parentWindow = getParent(window);
                    if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                    var id = function(_ref) {
                        var name = _ref.name, source = _ref.source, canary = _ref.canary, sendMessage = _ref.sendMessage;
                        !function() {
                            for (var tunnelWindows = globalStore("tunnelWindows"), _i2 = 0, _tunnelWindows$keys2 = tunnelWindows.keys(); _i2 < _tunnelWindows$keys2.length; _i2++) {
                                var key = _tunnelWindows$keys2[_i2];
                                isWindowClosed(tunnelWindows[key].source) && tunnelWindows.del(key);
                            }
                        }();
                        var id = uniqueID();
                        return globalStore("tunnelWindows").set(id, {
                            name: name,
                            source: source,
                            canary: canary,
                            sendMessage: sendMessage
                        }), id;
                    }({
                        name: name,
                        source: source,
                        canary: canary,
                        sendMessage: sendMessage
                    });
                    return send(parentWindow, MESSAGE_NAME.OPEN_TUNNEL, {
                        name: name,
                        sendMessage: function() {
                            var tunnelWindow = tunnelWindows.get(id);
                            if (tunnelWindow && tunnelWindow.source && !isWindowClosed(tunnelWindow.source)) {
                                try {
                                    tunnelWindow.canary();
                                } catch (err) {
                                    return;
                                }
                                tunnelWindow.sendMessage.apply(this, arguments);
                            }
                        }
                    }, {
                        domain: constants_WILDCARD
                    });
                };
            }({
                on: on,
                send: send
            }), function(_ref) {
                var on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage;
                promise_ZalgoPromise.try(function() {
                    var win, opener = getOpener(window);
                    if (opener && needsBridge({
                        win: opener
                    })) return registerRemoteWindow(opener), (win = opener, windowStore("remoteBridgeAwaiters").getOrSet(win, function() {
                        return promise_ZalgoPromise.try(function() {
                            var frame = getFrameByName(win, getBridgeName(utils_getDomain()));
                            if (frame) return isSameDomain(frame) && isSameDomain(frame) && global_getGlobal(frame) ? frame : new promise_ZalgoPromise(function(resolve) {
                                var interval, timeout;
                                interval = setInterval(function() {
                                    if (frame && isSameDomain(frame) && global_getGlobal(frame)) return clearInterval(interval), 
                                    clearTimeout(timeout), resolve(frame);
                                }, 100), timeout = setTimeout(function() {
                                    return clearInterval(interval), resolve();
                                }, 2e3);
                            });
                        });
                    })).then(function(bridge) {
                        return bridge ? window.name ? global_getGlobal(bridge).openTunnelToParent({
                            name: window.name,
                            source: window,
                            canary: function() {},
                            sendMessage: function(message) {
                                if (window && !window.closed) try {
                                    receiveMessage({
                                        data: message,
                                        origin: this.origin,
                                        source: this.source
                                    }, {
                                        on: on,
                                        send: send
                                    });
                                } catch (err) {
                                    promise_ZalgoPromise.reject(err);
                                }
                            }
                        }).then(function(_ref2) {
                            var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                            if (source !== opener) throw new Error("Source does not match opener");
                            registerRemoteSendMessage(source, origin, data.sendMessage);
                        }).catch(function(err) {
                            throw rejectRemoteSendMessage(opener, err), err;
                        }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                    });
                });
            }({
                on: on,
                send: send,
                receiveMessage: receiveMessage
            });
        }
        function cleanupProxyWindows() {
            for (var idToProxyWindow = globalStore("idToProxyWindow"), _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(); _i2 < _idToProxyWindow$keys2.length; _i2++) {
                var id = _idToProxyWindow$keys2[_i2];
                idToProxyWindow.get(id).shouldClean() && idToProxyWindow.del(id);
            }
        }
        function getSerializedWindow(id, win, _ref) {
            var windowName, send = _ref.send;
            return {
                id: id,
                type: getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME,
                getInstanceID: memoizePromise(function() {
                    return getWindowInstanceID(win, {
                        send: send
                    });
                }),
                close: function() {
                    return promise_ZalgoPromise.try(function() {
                        win.close();
                    });
                },
                getName: function() {
                    return promise_ZalgoPromise.try(function() {
                        if (!isWindowClosed(win)) return windowName;
                    });
                },
                focus: function() {
                    return promise_ZalgoPromise.try(function() {
                        win.focus();
                    });
                },
                isClosed: function() {
                    return promise_ZalgoPromise.try(function() {
                        return isWindowClosed(win);
                    });
                },
                setLocation: function(href) {
                    return promise_ZalgoPromise.try(function() {
                        if (isSameDomain(win)) try {
                            if (win.location && "function" == typeof win.location.replace) return void win.location.replace(href);
                        } catch (err) {}
                        win.location = href;
                    });
                },
                setName: function(name) {
                    return promise_ZalgoPromise.try(function() {
                        linkWindow({
                            win: win,
                            name: name
                        }), (win = assertSameDomain(win)).name = name, win.frameElement && win.frameElement.setAttribute("name", name), 
                        windowName = name;
                    });
                }
            };
        }
        var window_ProxyWindow = function() {
            function ProxyWindow(serializedWindow, actualWindow, _ref2) {
                var send = _ref2.send;
                this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, 
                this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.serializedWindow = serializedWindow, 
                this.actualWindowPromise = new promise_ZalgoPromise(), this.send = send, actualWindow && this.setWindow(actualWindow);
            }
            var _proto = ProxyWindow.prototype;
            return _proto.getType = function() {
                return this.serializedWindow.type;
            }, _proto.isPopup = function() {
                return this.getType() === WINDOW_TYPE.POPUP;
            }, _proto.isIframe = function() {
                return this.getType() === WINDOW_TYPE.IFRAME;
            }, _proto.setLocation = function(href) {
                var _this = this;
                return this.serializedWindow.setLocation(href).then(function() {
                    return _this;
                });
            }, _proto.setName = function(name) {
                var _this2 = this;
                return this.serializedWindow.setName(name).then(function() {
                    return _this2;
                });
            }, _proto.close = function() {
                var _this3 = this;
                return this.serializedWindow.close().then(function() {
                    return _this3;
                });
            }, _proto.focus = function() {
                var _this4 = this;
                return promise_ZalgoPromise.try(function() {
                    return promise_ZalgoPromise.all([ _this4.isPopup() && _this4.serializedWindow.getName().then(function(name) {
                        name && window.open("", name);
                    }), _this4.serializedWindow.focus() ]);
                }).then(function() {
                    return _this4;
                });
            }, _proto.isClosed = function() {
                return this.serializedWindow.isClosed();
            }, _proto.getWindow = function() {
                return this.actualWindow;
            }, _proto.setWindow = function(win) {
                this.actualWindow = win, this.serializedWindow = getSerializedWindow(this.serializedWindow.id, win, {
                    send: this.send
                }), this.actualWindowPromise.resolve(win);
            }, _proto.awaitWindow = function() {
                return this.actualWindowPromise;
            }, _proto.matchWindow = function(win) {
                var _this5 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this5.actualWindow ? win === _this5.actualWindow : promise_ZalgoPromise.all([ _this5.getInstanceID(), getWindowInstanceID(win, {
                        send: _this5.send
                    }) ]).then(function(_ref3) {
                        var match = _ref3[0] === _ref3[1];
                        return match && _this5.setWindow(win), match;
                    });
                });
            }, _proto.unwrap = function() {
                return this.actualWindow || this;
            }, _proto.getInstanceID = function() {
                return this.serializedWindow.getInstanceID();
            }, _proto.serialize = function() {
                return this.serializedWindow;
            }, _proto.shouldClean = function() {
                return this.actualWindow && isWindowClosed(this.actualWindow);
            }, ProxyWindow.unwrap = function(win) {
                return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
            }, ProxyWindow.serialize = function(win, _ref4) {
                var send = _ref4.send;
                return cleanupProxyWindows(), ProxyWindow.toProxyWindow(win, {
                    send: send
                }).serialize();
            }, ProxyWindow.deserialize = function(serializedWindow, _ref5) {
                var on = _ref5.on, send = _ref5.send;
                return cleanupProxyWindows(), globalStore("idToProxyWindow").getOrSet(serializedWindow.id, function() {
                    return new ProxyWindow(serializedWindow, null, {
                        on: on,
                        send: send
                    });
                });
            }, ProxyWindow.isProxyWindow = function(obj) {
                return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
            }, ProxyWindow.toProxyWindow = function(win, _ref6) {
                var send = _ref6.send;
                if (cleanupProxyWindows(), ProxyWindow.isProxyWindow(win)) return win;
                var realWin = win;
                return windowStore("winToProxyWindow").getOrSet(win, function() {
                    var id = uniqueID(), proxyWindow = new ProxyWindow(getSerializedWindow(id, realWin, {
                        send: send
                    }), realWin, {
                        send: send
                    });
                    return globalStore("idToProxyWindow").set(id, proxyWindow);
                });
            }, ProxyWindow;
        }();
        function addMethod(id, val, name, source, domain) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            window_ProxyWindow.isProxyWindow(source) ? proxyWindowMethods.set(id, {
                val: val,
                name: name,
                domain: domain,
                source: source
            }) : (proxyWindowMethods.del(id), methodStore.getOrSet(source, function() {
                return {};
            })[id] = {
                domain: domain,
                name: name,
                val: val,
                source: source
            });
        }
        function lookupMethod(source, id) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            return methodStore.getOrSet(source, function() {
                return {};
            })[id] || proxyWindowMethods.get(id);
        }
        function function_serializeFunction(destination, domain, val, key, _ref3) {
            !function(_ref) {
                var on = _ref3.on;
                globalStore("builtinListeners").getOrSet("functionCalls", function() {
                    return on(MESSAGE_NAME.METHOD, {
                        domain: constants_WILDCARD
                    }, function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data, id = data.id, name = data.name, meth = lookupMethod(source, id);
                        if (!meth) throw new Error("Could not find method '" + data.name + "' with id: " + data.id + " in " + utils_getDomain(window));
                        var methodSource = meth.source, domain = meth.domain, val = meth.val;
                        return promise_ZalgoPromise.try(function() {
                            if (!matchDomain(domain, origin)) throw new Error("Method '" + data.name + "' domain " + JSON.stringify(util_isRegex(meth.domain) ? meth.domain.source : meth.domain) + " does not match origin " + origin + " in " + utils_getDomain(window));
                            if (window_ProxyWindow.isProxyWindow(methodSource)) return methodSource.matchWindow(source).then(function(match) {
                                if (!match) throw new Error("Method call '" + data.name + "' failed - proxy window does not match source in " + utils_getDomain(window));
                            });
                        }).then(function() {
                            return val.apply({
                                source: source,
                                origin: origin
                            }, data.args);
                        }, function(err) {
                            return promise_ZalgoPromise.try(function() {
                                if (val.onError) return val.onError(err);
                            }).then(function() {
                                throw err.stack && (err.stack = "Remote call to " + name + "()\n\n" + err.stack), 
                                err;
                            });
                        }).then(function(result) {
                            return {
                                result: result,
                                id: id,
                                name: name
                            };
                        });
                    });
                });
            }();
            var id = val.__id__ || uniqueID();
            destination = window_ProxyWindow.unwrap(destination);
            var name = val.__name__ || val.name || key;
            return window_ProxyWindow.isProxyWindow(destination) ? (addMethod(id, val, name, destination, domain), 
            destination.awaitWindow().then(function(win) {
                addMethod(id, val, name, win, domain);
            })) : addMethod(id, val, name, destination, domain), serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
                id: id,
                name: name
            });
        }
        function serializeMessage(destination, domain, obj, _ref) {
            var _serialize, on = _ref.on, send = _ref.send;
            return function(obj, serializers) {
                void 0 === serializers && (serializers = defaultSerializers);
                var result = JSON.stringify(obj, function(key) {
                    var val = this[key];
                    if (isSerializedType(this)) return val;
                    var type = determineType(val);
                    if (!type) return val;
                    var serializer = serializers[type] || SERIALIZER[type];
                    return serializer ? serializer(val, key) : val;
                });
                return void 0 === result ? TYPE.UNDEFINED : result;
            }(obj, ((_serialize = {})[TYPE.PROMISE] = function(val, key) {
                return function(destination, domain, val, key, _ref) {
                    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
                        then: function_serializeFunction(destination, domain, function(resolve, reject) {
                            return val.then(resolve, reject);
                        }, key, {
                            on: _ref.on,
                            send: _ref.send
                        })
                    });
                }(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.FUNCTION] = function(val, key) {
                return function_serializeFunction(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.OBJECT] = function(val) {
                return isWindow(val) || window_ProxyWindow.isProxyWindow(val) ? serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, window_ProxyWindow.serialize(val, {
                    send: send
                })) : val;
            }, _serialize));
        }
        function deserializeMessage(source, origin, message, _ref2) {
            var _deserialize, on = _ref2.on, send = _ref2.send;
            return function(str, deserializers) {
                if (void 0 === deserializers && (deserializers = defaultDeserializers), str !== TYPE.UNDEFINED) return JSON.parse(str, function(key, val) {
                    if (isSerializedType(this)) return val;
                    var type, value;
                    if (isSerializedType(val) ? (type = val.__type__, value = val.__val__) : (type = determineType(val), 
                    value = val), !type) return value;
                    var deserializer = deserializers[type] || DESERIALIZER[type];
                    return deserializer ? deserializer(value, key) : value;
                });
            }(message, ((_deserialize = {})[SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE] = function(serializedPromise) {
                return new promise_ZalgoPromise(serializedPromise.then);
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION] = function(serializedFunction) {
                return function(source, origin, _ref4, _ref5) {
                    var id = serializedFunction.id, name = serializedFunction.name, send = _ref5.send, getDeserializedFunction = function(opts) {
                        function crossDomainFunctionWrapper() {
                            var _arguments = arguments;
                            return window_ProxyWindow.toProxyWindow(source, {
                                send: send
                            }).awaitWindow().then(function(win) {
                                var meth = lookupMethod(win, id);
                                if (meth && meth.val !== crossDomainFunctionWrapper) return meth.val.apply({
                                    source: window,
                                    origin: utils_getDomain()
                                }, _arguments);
                                var options = {
                                    domain: origin,
                                    fireAndForget: opts.fireAndForget
                                }, _args = [].slice.call(_arguments);
                                return send(win, MESSAGE_NAME.METHOD, {
                                    id: id,
                                    name: name,
                                    args: _args
                                }, options).then(function(res) {
                                    if (!opts.fireAndForget) return res.data.result;
                                });
                            }).catch(function(err) {
                                throw err;
                            });
                        }
                        return void 0 === opts && (opts = {}), crossDomainFunctionWrapper.__name__ = name, 
                        crossDomainFunctionWrapper.__origin__ = origin, crossDomainFunctionWrapper.__source__ = source, 
                        crossDomainFunctionWrapper.__id__ = id, crossDomainFunctionWrapper.origin = origin, 
                        crossDomainFunctionWrapper;
                    }, crossDomainFunctionWrapper = getDeserializedFunction();
                    return crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({
                        fireAndForget: !0
                    }), crossDomainFunctionWrapper;
                }(source, origin, 0, {
                    on: on,
                    send: send
                });
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW] = function(serializedWindow) {
                return window_ProxyWindow.deserialize(serializedWindow, {
                    on: (_ref8 = {
                        on: on,
                        send: send
                    }).on,
                    send: _ref8.send
                });
                var _ref8;
            }, _deserialize));
        }
        var SEND_MESSAGE_STRATEGIES = {};
        function send_sendMessage(win, domain, message, _ref) {
            var _serializeMessage, on = _ref.on, send = _ref.send;
            if (isWindowClosed(win)) throw new Error("Window is closed");
            for (var serializedMessage = serializeMessage(win, domain, ((_serializeMessage = {}).__post_robot_10_0_14__ = _extends({
                id: uniqueID(),
                origin: utils_getDomain(window)
            }, message), _serializeMessage), {
                on: on,
                send: send
            }), strategies = Object.keys(SEND_MESSAGE_STRATEGIES), errors = [], _i2 = 0; _i2 < strategies.length; _i2++) {
                var strategyName = strategies[_i2];
                try {
                    SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                } catch (err) {
                    errors.push(err);
                }
            }
            if (errors.length === strategies.length) throw new Error("All post-robot messaging strategies failed:\n\n" + errors.map(stringifyError).join("\n\n"));
        }
        SEND_MESSAGE_STRATEGIES.postrobot_post_message = function(win, serializedMessage, domain) {
            (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ constants_WILDCARD ]).map(function(dom) {
                return 0 === dom.indexOf(PROTOCOL.FILE) ? constants_WILDCARD : dom;
            }).forEach(function(dom) {
                win.postMessage(serializedMessage, dom);
            });
        }, SEND_MESSAGE_STRATEGIES.postrobot_bridge = function(win, serializedMessage, domain) {
            if (needsBridgeForBrowser() || isBridge()) {
                if (isSameDomain(win)) throw new Error("Post message through bridge disabled between same domain windows");
                if (!1 !== isSameTopWindow(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                !function(win, domain, message) {
                    var messagingChild = isOpener(window, win), messagingParent = isOpener(win, window);
                    if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                    findRemoteWindow(win).then(function(sendMessage) {
                        return sendMessage(win, domain, message);
                    });
                }(win, domain, serializedMessage);
            }
        }, SEND_MESSAGE_STRATEGIES.postrobot_global = function(win, serializedMessage) {
            if (utils_getUserAgent(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) {
                if (!isSameDomain(win)) throw new Error("Post message through global disabled between different domain windows");
                if (!1 !== isSameTopWindow(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                var foreignGlobal = global_getGlobal(win);
                if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                foreignGlobal.receiveMessage({
                    source: window,
                    origin: utils_getDomain(),
                    data: serializedMessage
                });
            }
        };
        var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
        function getResponseListener(hash) {
            return globalStore("responseListeners").get(hash);
        }
        function deleteResponseListener(hash) {
            globalStore("responseListeners").del(hash);
        }
        function isResponseListenerErrored(hash) {
            return globalStore("erroredResponseListeners").has(hash);
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain, requestListeners = windowStore("requestListeners");
            if (win === constants_WILDCARD && (win = null), domain === constants_WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            for (var _i4 = 0, _ref3 = [ win, getWildcard() ]; _i4 < _ref3.length; _i4++) {
                var winQualifier = _ref3[_i4];
                if (winQualifier) {
                    var nameListeners = requestListeners.get(winQualifier);
                    if (nameListeners) {
                        var domainListeners = nameListeners[name];
                        if (domainListeners) {
                            if (domain && "string" == typeof domain) {
                                if (domainListeners[domain]) return domainListeners[domain];
                                if (domainListeners[__DOMAIN_REGEX__]) for (var _i6 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__]; _i6 < _domainListeners$__DO2.length; _i6++) {
                                    var _domainListeners$__DO3 = _domainListeners$__DO2[_i6], listener = _domainListeners$__DO3.listener;
                                    if (matchDomain(_domainListeners$__DO3.regex, domain)) return listener;
                                }
                            }
                            if (domainListeners[constants_WILDCARD]) return domainListeners[constants_WILDCARD];
                        }
                    }
                }
            }
        }
        var RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {}).postrobot_message_request = function(source, origin, message, _ref) {
            var on = _ref.on, send = _ref.send, options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin
            });
            function sendResponse(type, ack, response) {
                void 0 === response && (response = {}), message.fireAndForget || isWindowClosed(source) || send_sendMessage(source, origin, _extends({
                    type: type,
                    ack: ack,
                    hash: message.hash,
                    name: message.name
                }, response), {
                    on: on,
                    send: send
                });
            }
            return promise_ZalgoPromise.all([ sendResponse("postrobot_message_ack"), promise_ZalgoPromise.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                return options.handler({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }).then(function(data) {
                return sendResponse("postrobot_message_response", "success", {
                    data: data
                });
            }, function(error) {
                return sendResponse("postrobot_message_response", "error", {
                    error: error
                });
            }) ]).then(src_util_noop).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                throw err;
            });
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_ack = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                if (source !== options.win) throw new Error("Ack source does not match registered window");
                options.ack = !0;
            }
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_response = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var pattern, options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (pattern = options.domain, 
                Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString()));
                if (source !== options.win) throw new Error("Response source does not match registered window");
                deleteResponseListener(message.hash), "error" === message.ack ? options.promise.reject(message.error) : "success" === message.ack && options.promise.resolve({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }
        }, _RECEIVE_MESSAGE_TYPE);
        function receive_receiveMessage(event, _ref2) {
            var on = _ref2.on, send = _ref2.send, receivedMessages = globalStore("receivedMessages");
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, message = function(message, source, origin, _ref) {
                var parsedMessage, on = _ref.on, send = _ref.send;
                try {
                    parsedMessage = deserializeMessage(source, origin, message, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    return;
                }
                if (parsedMessage && "object" == typeof parsedMessage && null !== parsedMessage && (parsedMessage = parsedMessage.__post_robot_10_0_14__) && "object" == typeof parsedMessage && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
            }(event.data, source, origin, {
                on: on,
                send: send
            });
            message && (markWindowKnown(source), receivedMessages.has(message.id) || (receivedMessages.set(message.id, !0), 
            isWindowClosed(source) && !message.fireAndForget || (0 === message.origin.indexOf(PROTOCOL.FILE) && (origin = PROTOCOL.FILE + "//"), 
            RECEIVE_MESSAGE_TYPES[message.type](source, origin, message, {
                on: on,
                send: send
            }))));
        }
        function on_on(name, options, handler) {
            if (!name) throw new Error("Expected name");
            if ("function" == typeof options && (handler = options, options = {}), !handler) throw new Error("Expected handler");
            (options = options || {}).name = name, options.handler = handler || options.handler;
            var win = options.window, domain = options.domain, requestListener = function addRequestListener(_ref4, listener) {
                var name = _ref4.name, win = _ref4.win, domain = _ref4.domain, requestListeners = windowStore("requestListeners");
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _i8 = 0, _win2 = win; _i8 < _win2.length; _i8++) listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: _win2[_i8]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i10 = 0; _i10 < listenersCollection.length; _i10++) listenersCollection[_i10].cancel();
                        }
                    };
                }
                if (Array.isArray(domain)) {
                    for (var _listenersCollection = [], _i12 = 0, _domain2 = domain; _i12 < _domain2.length; _i12++) _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _domain2[_i12]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i14 = 0; _i14 < _listenersCollection.length; _i14++) _listenersCollection[_i14].cancel();
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                if (win && win !== constants_WILDCARD || (win = getWildcard()), domain = domain || constants_WILDCARD, 
                existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var regexListeners, regexListener, nameListeners = requestListeners.getOrSet(win, function() {
                    return {};
                }), domainListeners = util_getOrSet(nameListeners, name, function() {
                    return {};
                }), strDomain = domain.toString();
                return util_isRegex(domain) ? (regexListeners = util_getOrSet(domainListeners, __DOMAIN_REGEX__, function() {
                    return [];
                })).push(regexListener = {
                    regex: domain,
                    listener: listener
                }) : domainListeners[strDomain] = listener, {
                    cancel: function() {
                        delete domainListeners[strDomain], regexListener && (regexListeners.splice(regexListeners.indexOf(regexListener, 1)), 
                        regexListeners.length || delete domainListeners[__DOMAIN_REGEX__]), Object.keys(domainListeners).length || delete nameListeners[name], 
                        win && !Object.keys(nameListeners).length && requestListeners.del(win);
                    }
                };
            }({
                name: name,
                win: win,
                domain: domain
            }, {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: win,
                domain: domain || constants_WILDCARD,
                name: name
            });
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        var src_bridge, send_send = function send(win, name, data, options) {
            var domain = (options = options || {}).domain || constants_WILDCARD, responseTimeout = options.timeout || -1, childTimeout = options.timeout || 5e3, fireAndForget = options.fireAndForget || !1;
            return promise_ZalgoPromise.try(function() {
                return function(name, win, domain) {
                    if (!name) throw new Error("Expected name");
                    if (domain && "string" != typeof domain && !Array.isArray(domain) && !util_isRegex(domain)) throw new TypeError("Expected domain to be a string, array, or regex");
                    if (isWindowClosed(win)) throw new Error("Target window is closed");
                }(name, win, domain), function(win, domain, childTimeout, _ref) {
                    var send = _ref.send;
                    return promise_ZalgoPromise.try(function() {
                        return function(parent, child) {
                            var actualParent = getAncestor(child);
                            if (actualParent) return actualParent === parent;
                            if (child === parent) return !1;
                            if (getTop(child) === child) return !1;
                            for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) if (_getFrames8[_i15] === child) return !0;
                            return !1;
                        }(window, win) ? awaitWindowHello(win, childTimeout) : util_isRegex(domain) ? sayHello(win, {
                            send: send
                        }) : {
                            domain: domain
                        };
                    }).then(function(_ref2) {
                        return _ref2.domain;
                    });
                }(win, domain, childTimeout, {
                    send: send
                });
            }).then(function(targetDomain) {
                if (!matchDomain(domain, targetDomain)) throw new Error("Domain " + stringify(domain) + " does not match " + stringify(targetDomain));
                domain = targetDomain;
                var logName = name === MESSAGE_NAME.METHOD && data && "string" == typeof data.name ? data.name + "()" : name, promise = new promise_ZalgoPromise(), hash = name + "_" + uniqueID();
                if (!fireAndForget) {
                    var responseListener = {
                        name: name,
                        win: win,
                        domain: domain,
                        promise: promise
                    };
                    !function(hash, listener) {
                        globalStore("responseListeners").set(hash, listener);
                    }(hash, responseListener);
                    var reqPromises = windowStore("requestPromises").getOrSet(win, function() {
                        return [];
                    });
                    reqPromises.push(promise), promise.catch(function() {
                        !function(hash) {
                            globalStore("erroredResponseListeners").set(hash, !0);
                        }(hash), deleteResponseListener(hash);
                    });
                    var totalAckTimeout = function(win) {
                        return windowStore("knownWindows").get(win, !1);
                    }(win) ? 1e4 : 2e3, totalResTimeout = responseTimeout, ackTimeout = totalAckTimeout, resTimeout = totalResTimeout, interval = safeInterval(function() {
                        return isWindowClosed(win) ? promise.reject(new Error("Window closed for " + name + " before " + (responseListener.ack ? "response" : "ack"))) : responseListener.cancelled ? promise.reject(new Error("Response listener was cancelled for " + name)) : (ackTimeout = Math.max(ackTimeout - 500, 0), 
                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - 500, 0)), responseListener.ack || 0 !== ackTimeout ? 0 === resTimeout ? promise.reject(new Error("No response for postMessage " + logName + " in " + utils_getDomain() + " in " + totalResTimeout + "ms")) : void 0 : promise.reject(new Error("No ack for postMessage " + logName + " in " + utils_getDomain() + " in " + totalAckTimeout + "ms")));
                    }, 500);
                    promise.finally(function() {
                        interval.cancel(), reqPromises.splice(reqPromises.indexOf(promise, 1));
                    }).catch(src_util_noop);
                }
                return send_sendMessage(win, domain, {
                    type: "postrobot_message_request",
                    hash: hash,
                    name: name,
                    data: data,
                    fireAndForget: fireAndForget
                }, {
                    on: on_on,
                    send: send
                }), fireAndForget ? promise.resolve() : promise;
            });
        };
        function setup_serializeMessage(destination, domain, obj) {
            return serializeMessage(destination, domain, obj, {
                on: on_on,
                send: send_send
            });
        }
        function setup_deserializeMessage(source, origin, message) {
            return deserializeMessage(source, origin, message, {
                on: on_on,
                send: send_send
            });
        }
        function setup_toProxyWindow(win) {
            return window_ProxyWindow.toProxyWindow(win, {
                send: send_send
            });
        }
        function cleanUpWindow(win) {
            for (var _i2 = 0, _requestPromises$get2 = windowStore("requestPromises").get(win, []); _i2 < _requestPromises$get2.length; _i2++) _requestPromises$get2[_i2].reject(new Error("Window cleaned up before response")).catch(src_util_noop);
        }
        function lib_global_getGlobal(win) {
            if (void 0 === win && (win = window), !isSameDomain(win)) throw new Error("Can not get global for window on different domain");
            return win.__zoid_9_0_21__ || (win.__zoid_9_0_21__ = {}), win.__zoid_9_0_21__;
        }
        function getProxyObject(obj) {
            return {
                get: function() {
                    var _this = this;
                    return promise_ZalgoPromise.try(function() {
                        if (_this.source && _this.source !== window) throw new Error("Can not call get on proxy object from a remote window");
                        return obj;
                    });
                }
            };
        }
        src_bridge = {
            setupBridge: setupBridge,
            openBridge: function(url, domain) {
                var bridges = globalStore("bridges"), bridgeFrames = globalStore("bridgeFrames");
                return domain = domain || getDomainFromUrl(url), bridges.getOrSet(domain, function() {
                    return promise_ZalgoPromise.try(function() {
                        if (utils_getDomain() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                        var name = getBridgeName(domain);
                        if (getFrameByName(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                        var iframe = function(name, url) {
                            var iframe = document.createElement("iframe");
                            return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
                            iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
                            iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
                            iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
                            iframe.src = url, iframe;
                        }(name, url);
                        return bridgeFrames.set(domain, iframe), documentBodyReady.then(function(body) {
                            body.appendChild(iframe);
                            var bridge = iframe.contentWindow;
                            return new promise_ZalgoPromise(function(resolve, reject) {
                                iframe.addEventListener("load", resolve), iframe.addEventListener("error", reject);
                            }).then(function() {
                                return awaitWindowHello(bridge, 5e3, "Bridge " + url);
                            }).then(function() {
                                return bridge;
                            });
                        });
                    });
                });
            },
            linkWindow: linkWindow,
            linkUrl: function(win, url) {
                linkWindow({
                    win: win,
                    domain: getDomainFromUrl(url)
                });
            },
            isBridge: isBridge,
            needsBridge: needsBridge,
            needsBridgeForBrowser: needsBridgeForBrowser,
            hasBridge: function(url, domain) {
                return globalStore("bridges").has(domain || getDomainFromUrl(url));
            },
            needsBridgeForWin: needsBridgeForWin,
            needsBridgeForDomain: needsBridgeForDomain,
            destroyBridges: function() {
                for (var bridges = globalStore("bridges"), bridgeFrames = globalStore("bridgeFrames"), _i4 = 0, _bridgeFrames$keys2 = bridgeFrames.keys(); _i4 < _bridgeFrames$keys2.length; _i4++) {
                    var frame = bridgeFrames.get(_bridgeFrames$keys2[_i4]);
                    frame && frame.parentNode && frame.parentNode.removeChild(frame);
                }
                bridgeFrames.reset(), bridges.reset();
            }
        };
        var ZOID = "zoid", POST_MESSAGE_DELEGATE = ZOID + "_delegate", POST_MESSAGE_ALLOW_DELEGATE = ZOID + "_allow_delegate", PROP_TYPE = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number",
            ARRAY: "array"
        }, PROP_SERIALIZATION = {
            JSON: "json",
            DOTIFY: "dotify",
            BASE64: "base64"
        }, CONTEXT = WINDOW_TYPE, src_constants_WILDCARD = "*", DEFAULT_DIMENSIONS = {
            WIDTH: "300px",
            HEIGHT: "150px"
        }, EVENT = {
            RENDER: "zoid-render",
            RENDERED: "zoid-rendered",
            DISPLAY: "zoid-display",
            ERROR: "zoid-error",
            CLOSE: "zoid-close",
            PROPS: "zoid-props",
            RESIZE: "zoid-resize"
        };
        function normalizeChildProp(component, props, key, value, helpers) {
            var prop = component.getPropDefinition(key);
            return prop && "function" == typeof prop.childDecorate ? prop.childDecorate(_extends({
                value: value
            }, helpers)) : value;
        }
        function parseChildWindowName(windowName) {
            return inlineMemoize(parseChildWindowName, function() {
                if (!windowName) throw new Error("No window name");
                var _windowName$split = windowName.split("__"), zoidcomp = _windowName$split[1], name = _windowName$split[2], encodedPayload = _windowName$split[3];
                if (zoidcomp !== ZOID) throw new Error("Window not rendered by zoid - got " + zoidcomp);
                if (!name) throw new Error("Expected component name");
                if (!encodedPayload) throw new Error("Expected encoded payload");
                try {
                    return JSON.parse(function(str) {
                        if ("undefined" != typeof window && "function" == typeof window.atob) return window.atob(str);
                        if ("undefined" != typeof Buffer) return Buffer.from(str, "base64").toString("utf8");
                        throw new Error("Can not find window.atob or Buffer");
                    }(encodedPayload));
                } catch (err) {
                    throw new Error("Can not decode window name payload: " + encodedPayload + ": " + stringifyError(err));
                }
            }, [ windowName ]);
        }
        function getChildPayload() {
            try {
                return parseChildWindowName(window.name);
            } catch (err) {}
        }
        var child_ChildComponent = function() {
            function ChildComponent(component) {
                var _this = this;
                this.component = void 0, this.props = void 0, this.context = void 0, this.parent = void 0, 
                this.parentDomain = void 0, this.parentComponentWindow = void 0, this.onPropHandlers = void 0, 
                this.autoResize = void 0, promise_ZalgoPromise.try(function() {
                    _this.component = component, _this.onPropHandlers = [];
                    var childPayload = getChildPayload();
                    if (!childPayload) throw new Error("No child payload found");
                    if ("9_0_21" !== childPayload.version) throw new Error("Parent window has zoid version " + childPayload.version + ", child window has version 9_0_21");
                    var parent = childPayload.parent, domain = childPayload.domain, exports = childPayload.exports, props = childPayload.props;
                    _this.context = childPayload.context, _this.parentComponentWindow = _this.getParentComponentWindow(parent), 
                    _this.parentDomain = domain, _this.parent = setup_deserializeMessage(_this.parentComponentWindow, domain, exports), 
                    _this.checkParentDomain(domain);
                    var initialProps = _this.getPropsByRef(_this.parentComponentWindow, domain, props);
                    return _this.setProps(initialProps, domain), markWindowKnown(_this.parentComponentWindow), 
                    _this.watchForClose(), _this.parent.init(_this.buildExports());
                }).then(function() {
                    return _this.watchForResize();
                }).catch(function(err) {
                    _this.onError(err);
                });
            }
            var _proto = ChildComponent.prototype;
            return _proto.getHelpers = function() {
                var _this2 = this;
                return {
                    focus: function() {
                        return _this2.focus();
                    },
                    close: function() {
                        return _this2.close();
                    },
                    resize: function(_ref) {
                        return _this2.resize({
                            width: _ref.width,
                            height: _ref.height
                        });
                    },
                    onError: function(err) {
                        return _this2.onError(err);
                    },
                    onProps: function(handler) {
                        return _this2.onProps(handler);
                    },
                    getParent: function() {
                        return _this2.parentComponentWindow;
                    },
                    getParentDomain: function() {
                        return _this2.parentDomain;
                    }
                };
            }, _proto.checkParentDomain = function(domain) {
                if (!matchDomain(this.component.allowedParentDomains, domain)) throw new Error("Can not be rendered by domain: " + domain);
            }, _proto.onProps = function(handler) {
                this.onPropHandlers.push(handler);
            }, _proto.getPropsByRef = function(parentComponentWindow, domain, _ref2) {
                var props, type = _ref2.type, uid = _ref2.uid;
                if ("raw" === type) props = _ref2.value; else if ("uid" === type) {
                    if (!isSameDomain(parentComponentWindow)) throw new Error("Parent component window is on a different domain - expected " + utils_getDomain() + " - can not retrieve props");
                    var global = lib_global_getGlobal(parentComponentWindow);
                    props = assertExists("props", global && global.props[uid]);
                }
                if (!props) throw new Error("Could not find props");
                return setup_deserializeMessage(parentComponentWindow, domain, props);
            }, _proto.getParentComponentWindow = function(ref) {
                var win, n, type = ref.type;
                if ("opener" === type) return assertExists("opener", getOpener(window));
                if ("parent" === type) return assertExists("parent", (win = window, void 0 === (n = ref.distance) && (n = 1), 
                function(win, n) {
                    void 0 === n && (n = 1);
                    for (var parent = win, i = 0; i < n; i++) {
                        if (!parent) return;
                        parent = getParent(parent);
                    }
                    return parent;
                }(win, getDistanceFromTop(win) - n)));
                if ("global" === type) {
                    var uid = ref.uid, ancestor = getAncestor(window);
                    if (!ancestor) throw new Error("Can not find ancestor window");
                    for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor); _i2 < _getAllFramesInWindow2.length; _i2++) {
                        var frame = _getAllFramesInWindow2[_i2];
                        if (isSameDomain(frame)) {
                            var global = lib_global_getGlobal(frame);
                            if (global && global.windows && global.windows[uid]) return global.windows[uid];
                        }
                    }
                }
                throw new Error("Unable to find " + type + " parent component window");
            }, _proto.getProps = function() {
                return this.props = this.props || {}, this.props;
            }, _proto.setProps = function(props, origin, isUpdate) {
                void 0 === isUpdate && (isUpdate = !1);
                var helpers = this.getHelpers(), existingProps = this.getProps();
                extend(existingProps, function(parentComponentWindow, component, props, origin, helpers, isUpdate) {
                    void 0 === isUpdate && (isUpdate = !1);
                    for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(props); _i2 < _Object$keys2.length; _i2++) {
                        var key = _Object$keys2[_i2], prop = component.getPropDefinition(key);
                        if (!prop || !prop.sameDomain || origin === utils_getDomain(window) && isSameDomain(parentComponentWindow)) {
                            var value = normalizeChildProp(component, 0, key, props[key], helpers);
                            result[key] = value, prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                        }
                    }
                    if (!isUpdate) for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(); _i4 < _component$getPropNam2.length; _i4++) {
                        var _key = _component$getPropNam2[_i4];
                        props.hasOwnProperty(_key) || (result[_key] = normalizeChildProp(component, 0, _key, props[_key], helpers));
                    }
                    return result;
                }(this.parentComponentWindow, this.component, props, origin, helpers, isUpdate));
                for (var _i4 = 0, _this$onPropHandlers2 = this.onPropHandlers; _i4 < _this$onPropHandlers2.length; _i4++) _this$onPropHandlers2[_i4].call(this, existingProps);
            }, _proto.watchForClose = function() {
                var _this3 = this;
                window.addEventListener("beforeunload", function() {
                    _this3.parent.checkClose.fireAndForget();
                }), window.addEventListener("unload", function() {
                    _this3.parent.checkClose.fireAndForget();
                }), onCloseWindow(this.parentComponentWindow, function() {
                    _this3.destroy();
                });
            }, _proto.getAutoResize = function() {
                var _ref3 = this.autoResize || this.component.autoResize || {}, _ref3$width = _ref3.width, _ref3$height = _ref3.height, _ref3$element = _ref3.element, element = void 0 === _ref3$element ? "body" : _ref3$element;
                return {
                    width: void 0 !== _ref3$width && _ref3$width,
                    height: void 0 !== _ref3$height && _ref3$height,
                    element: element = getElementSafe(element)
                };
            }, _proto.watchForResize = function() {
                var _this4 = this;
                return waitForDocumentReady().then(function() {
                    if (document.body) return document.body;
                    throw new Error("Document ready but document.body not present");
                }).then(function() {
                    var _this4$getAutoResize = _this4.getAutoResize(), width = _this4$getAutoResize.width, height = _this4$getAutoResize.height, element = _this4$getAutoResize.element;
                    element && (width || height) && _this4.context !== CONTEXT.POPUP && onResize(element, function(_ref4) {
                        _this4.resize({
                            width: width ? _ref4.width : void 0,
                            height: height ? _ref4.height : void 0
                        });
                    }, {
                        width: width,
                        height: height
                    });
                });
            }, _proto.buildExports = function() {
                var self = this;
                return {
                    updateProps: function(props) {
                        var _this5 = this;
                        return promise_ZalgoPromise.try(function() {
                            return self.setProps(props, _this5.__origin__, !0);
                        });
                    },
                    close: function() {
                        return promise_ZalgoPromise.try(function() {
                            return self.destroy();
                        });
                    }
                };
            }, _proto.resize = function(_ref5) {
                return this.parent.resize.fireAndForget({
                    width: _ref5.width,
                    height: _ref5.height
                });
            }, _proto.close = function() {
                return this.parent.close();
            }, _proto.destroy = function() {
                return promise_ZalgoPromise.try(function() {
                    window.close();
                });
            }, _proto.focus = function() {
                return promise_ZalgoPromise.try(function() {
                    window.focus();
                });
            }, _proto.onError = function(err) {
                var _this6 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this6.parent && _this6.parent.onError) return _this6.parent.onError(err);
                    throw err;
                });
            }, ChildComponent;
        }(), RENDER_DRIVERS = {};
        function props_getQueryParam(prop, key, value) {
            return promise_ZalgoPromise.try(function() {
                return "function" == typeof prop.queryParam ? prop.queryParam({
                    value: value
                }) : "string" == typeof prop.queryParam ? prop.queryParam : key;
            });
        }
        function getQueryValue(prop, key, value) {
            return promise_ZalgoPromise.try(function() {
                return "function" == typeof prop.queryValue && isDefined(value) ? prop.queryValue({
                    value: value
                }) : value;
            });
        }
        RENDER_DRIVERS[CONTEXT.IFRAME] = {
            openOnClick: !1,
            openFrame: function() {
                return getProxyObject(dom_iframe({
                    attributes: _extends({
                        title: this.component.name
                    }, this.component.attributes.iframe)
                }));
            },
            open: function(proxyFrame) {
                var _this = this;
                if (!proxyFrame) throw new Error("Expected proxy frame to be passed");
                return proxyFrame.get().then(function(frame) {
                    return awaitFrameWindow(frame).then(function(win) {
                        var element, handler, interval, frameWatcher = (element = frame, handler = once(handler = function() {
                            return _this.close();
                        }), isElementClosed(element) ? handler() : interval = safeInterval(function() {
                            isElementClosed(element) && (interval.cancel(), handler());
                        }, 50), {
                            cancel: function() {
                                interval && interval.cancel();
                            }
                        });
                        return _this.clean.register(function() {
                            return frameWatcher.cancel();
                        }), _this.clean.register(function() {
                            return destroyElement(frame);
                        }), _this.clean.register(function() {
                            return cleanUpWindow(win);
                        }), setup_toProxyWindow(win);
                    });
                });
            },
            openPrerenderFrame: function() {
                return getProxyObject(dom_iframe({
                    attributes: _extends({
                        name: "__zoid_prerender_frame__" + this.component.name + "_" + uniqueID() + "__",
                        title: "prerender__" + this.component.name
                    }, this.component.attributes.iframe)
                }));
            },
            openPrerender: function(proxyWin, proxyPrerenderFrame) {
                var _this2 = this;
                if (!proxyPrerenderFrame) throw new Error("Expected proxy frame to be passed");
                return proxyPrerenderFrame.get().then(function(prerenderFrame) {
                    return _this2.clean.register(function() {
                        return destroyElement(prerenderFrame);
                    }), awaitFrameWindow(prerenderFrame).then(function(prerenderFrameWindow) {
                        return assertSameDomain(prerenderFrameWindow);
                    }).then(function(win) {
                        return setup_toProxyWindow(win);
                    });
                });
            },
            delegate: [ "getProxyContainer", "renderContainer", "openFrame", "openPrerenderFrame", "prerender", "open", "openPrerender" ]
        }, RENDER_DRIVERS[CONTEXT.POPUP] = {
            openOnClick: !0,
            open: function() {
                var _this3 = this;
                return promise_ZalgoPromise.try(function() {
                    var _this3$component$dime = _this3.component.dimensions, width = _this3$component$dime.width, height = _this3$component$dime.height, win = function(url, options) {
                        var width = (options = options || {}).width, height = options.height, top = 0, left = 0;
                        width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2))), 
                        height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                        var name = (options = _extends({
                            top: top,
                            left: left,
                            width: width,
                            height: height,
                            status: 1,
                            toolbar: 0,
                            menubar: 0,
                            resizable: 1,
                            scrollbars: 1
                        }, options)).name || "";
                        delete options.name;
                        var win, err, params = Object.keys(options).map(function(key) {
                            if (options[key]) return key + "=" + stringify(options[key]);
                        }).filter(Boolean).join(",");
                        try {
                            win = window.open("", name, params, !0);
                        } catch (err) {
                            throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                        }
                        if (isWindowClosed(win)) throw new PopupOpenError("Can not open popup window - blocked");
                        return window.addEventListener("unload", function() {
                            return win.close();
                        }), win;
                    }(0, _extends({
                        width: width = normalizeDimension(width, window.outerWidth),
                        height: height = normalizeDimension(height, window.outerWidth)
                    }, _this3.component.attributes.popup));
                    return _this3.clean.register(function() {
                        win.close(), cleanUpWindow(win);
                    }), setup_toProxyWindow(win);
                });
            },
            openPrerender: function(proxyWin) {
                return promise_ZalgoPromise.try(function() {
                    return proxyWin;
                });
            },
            delegate: [ "getProxyContainer", "renderContainer", "setProxyWin" ]
        };
        var parent_ParentComponent = function() {
            function ParentComponent(component, props) {
                var _this = this;
                this.component = void 0, this.driver = void 0, this.clean = void 0, this.event = void 0, 
                this.initPromise = void 0, this.handledErrors = void 0, this.props = void 0, this.state = void 0, 
                this.child = void 0, this.proxyWin = void 0, this.initPromise = new promise_ZalgoPromise(), 
                this.handledErrors = [], this.props = {}, this.clean = cleanup(this), this.state = {}, 
                this.component = component, this.setupEvents(props.onError), this.setProps(props), 
                this.component.registerActiveComponent(this), this.clean.register(function() {
                    return _this.component.destroyActiveComponent(_this);
                }), this.watchForUnload();
            }
            var _proto = ParentComponent.prototype;
            return _proto.setupEvents = function(onError) {
                var triggered, handlers, _this2 = this;
                this.event = (triggered = {}, handlers = {}, {
                    on: function(eventName, handler) {
                        var handlerList = handlers[eventName] = handlers[eventName] || [];
                        handlerList.push(handler);
                        var cancelled = !1;
                        return {
                            cancel: function() {
                                cancelled || (cancelled = !0, handlerList.splice(handlerList.indexOf(handler), 1));
                            }
                        };
                    },
                    once: function(eventName, handler) {
                        var listener = this.on(eventName, function() {
                            listener.cancel(), handler();
                        });
                        return listener;
                    },
                    trigger: function(eventName) {
                        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
                        var handlerList = handlers[eventName], promises = [];
                        if (handlerList) for (var _loop = function(_i2) {
                            var handler = handlerList[_i2];
                            promises.push(promise_ZalgoPromise.try(function() {
                                return handler.apply(void 0, args);
                            }));
                        }, _i2 = 0; _i2 < handlerList.length; _i2++) _loop(_i2);
                        return promise_ZalgoPromise.all(promises).then(src_util_noop);
                    },
                    triggerOnce: function(eventName) {
                        if (triggered[eventName]) return promise_ZalgoPromise.resolve();
                        triggered[eventName] = !0;
                        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
                        return this.trigger.apply(this, [ eventName ].concat(args));
                    }
                }), this.event.on(EVENT.RENDER, function() {
                    return _this2.props.onRender();
                }), this.event.on(EVENT.DISPLAY, function() {
                    return _this2.props.onDisplay();
                }), this.event.on(EVENT.RENDERED, function() {
                    return _this2.props.onRendered();
                }), this.event.on(EVENT.CLOSE, function() {
                    return _this2.props.onClose();
                }), this.event.on(EVENT.PROPS, function(props) {
                    return _this2.props.onProps(props);
                }), this.event.on(EVENT.ERROR, function(err) {
                    return _this2.props && _this2.props.onError ? _this2.props.onError(err) : onError ? onError(err) : _this2.initPromise.reject(err).then(function() {
                        setTimeout(function() {
                            throw err;
                        }, 1);
                    });
                });
            }, _proto.render = function(target, container, context) {
                var _this3 = this;
                return promise_ZalgoPromise.try(function() {
                    _this3.component.log("render"), _this3.driver = RENDER_DRIVERS[context];
                    var uid = ZOID + "-" + _this3.component.tag + "-" + uniqueID(), domain = _this3.getDomain(), initialDomain = _this3.getInitialDomain();
                    _this3.component.checkAllowRender(target, domain, container), target !== window && _this3.delegate(context, target);
                    var tasks = {};
                    return tasks.init = _this3.initPromise, tasks.buildUrl = _this3.buildUrl(), tasks.onRender = _this3.event.trigger(EVENT.RENDER), 
                    tasks.getProxyContainer = _this3.getProxyContainer(container), tasks.openFrame = _this3.openFrame(), 
                    tasks.openPrerenderFrame = _this3.openPrerenderFrame(), tasks.renderContainer = promise_ZalgoPromise.all([ tasks.getProxyContainer, tasks.openFrame, tasks.openPrerenderFrame ]).then(function(_ref) {
                        return _this3.renderContainer(_ref[0], {
                            context: context,
                            uid: uid,
                            proxyFrame: _ref[1],
                            proxyPrerenderFrame: _ref[2]
                        });
                    }), tasks.open = _this3.driver.openOnClick ? _this3.open() : tasks.openFrame.then(function(proxyFrame) {
                        return _this3.open(proxyFrame);
                    }), tasks.openPrerender = promise_ZalgoPromise.all([ tasks.open, tasks.openPrerenderFrame ]).then(function(_ref2) {
                        return _this3.openPrerender(_ref2[0], _ref2[1]);
                    }), tasks.setState = promise_ZalgoPromise.all([ tasks.open.then(function(proxyWin) {
                        return _this3.proxyWin = proxyWin, _this3.setProxyWin(proxyWin);
                    }) ]), tasks.prerender = promise_ZalgoPromise.all([ tasks.openPrerender, tasks.setState ]).then(function(_ref3) {
                        return _this3.prerender(_ref3[0], {
                            context: context,
                            uid: uid
                        });
                    }), tasks.loadUrl = promise_ZalgoPromise.all([ tasks.open, tasks.buildUrl, tasks.setWindowName, tasks.prerender ]).then(function(_ref4) {
                        return _ref4[0].setLocation(_ref4[1]);
                    }), tasks.buildWindowName = tasks.open.then(function(proxyWin) {
                        return _this3.buildWindowName({
                            proxyWin: proxyWin,
                            initialDomain: initialDomain,
                            domain: domain,
                            target: target,
                            context: context,
                            uid: uid
                        });
                    }), tasks.setWindowName = promise_ZalgoPromise.all([ tasks.open, tasks.buildWindowName ]).then(function(_ref5) {
                        return _ref5[0].setName(_ref5[1]);
                    }), tasks.watchForClose = tasks.open.then(function(proxyWin) {
                        _this3.watchForClose(proxyWin);
                    }), tasks.onDisplay = promise_ZalgoPromise.all([ tasks.renderContainer, tasks.prerender ]).then(function() {
                        return _this3.event.trigger(EVENT.DISPLAY);
                    }), tasks.openBridge = tasks.open.then(function(proxyWin) {
                        return _this3.openBridge(proxyWin, initialDomain, context);
                    }), tasks.runTimeout = tasks.loadUrl.then(function() {
                        return _this3.runTimeout();
                    }), tasks.onRender = tasks.init.then(function() {
                        return _this3.event.trigger(EVENT.RENDERED);
                    }), promise_ZalgoPromise.hash(tasks);
                }).catch(function(err) {
                    return promise_ZalgoPromise.all([ _this3.onError(err), _this3.destroy(err) ]).then(function() {
                        throw err;
                    });
                }).then(src_util_noop);
            }, _proto.getProxyContainer = function(container) {
                return promise_ZalgoPromise.try(function() {
                    return elementReady(container);
                }).then(function(containerElement) {
                    return getProxyObject(containerElement);
                });
            }, _proto.buildWindowName = function(_ref6) {
                var childPayload = this.buildChildPayload({
                    proxyWin: _ref6.proxyWin,
                    initialDomain: _ref6.initialDomain,
                    domain: _ref6.domain,
                    target: _ref6.target,
                    context: _ref6.context,
                    uid: _ref6.uid
                });
                return "__" + ZOID + "__" + this.component.name + "__" + base64encode(JSON.stringify(childPayload)) + "__";
            }, _proto.getPropsRef = function(proxyWin, initialDomain, domain, uid) {
                var value = setup_serializeMessage(proxyWin, domain, this.getPropsForChild(domain)), propRef = initialDomain === utils_getDomain() ? {
                    type: "uid",
                    uid: uid
                } : {
                    type: "raw",
                    value: value
                };
                if ("uid" === propRef.type) {
                    var global = lib_global_getGlobal(window);
                    global.props = global.props || {}, global.props[uid] = value, this.clean.register(function() {
                        delete global.props[uid];
                    });
                }
                return propRef;
            }, _proto.buildChildPayload = function(_temp) {
                var _ref7 = void 0 === _temp ? {} : _temp, proxyWin = _ref7.proxyWin, initialDomain = _ref7.initialDomain, domain = _ref7.domain, _ref7$target = _ref7.target, target = void 0 === _ref7$target ? window : _ref7$target, context = _ref7.context, uid = _ref7.uid;
                return {
                    uid: uid,
                    context: context,
                    version: "9_0_21",
                    domain: utils_getDomain(window),
                    tag: this.component.tag,
                    parent: this.getWindowRef(target, initialDomain, uid, context),
                    props: this.getPropsRef(proxyWin, initialDomain, domain, uid),
                    exports: setup_serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin))
                };
            }, _proto.setProxyWin = function(proxyWin) {
                var _this4 = this;
                return promise_ZalgoPromise.try(function() {
                    _this4.proxyWin = proxyWin;
                });
            }, _proto.getHelpers = function() {
                var _this5 = this;
                return {
                    state: this.state,
                    event: this.event,
                    close: function() {
                        return _this5.close();
                    },
                    focus: function() {
                        return _this5.focus();
                    },
                    resize: function(_ref8) {
                        return _this5.resize({
                            width: _ref8.width,
                            height: _ref8.height
                        });
                    },
                    onError: function(err) {
                        return _this5.onError(err);
                    },
                    updateProps: function(props) {
                        return _this5.updateProps(props);
                    }
                };
            }, _proto.setProps = function(props, isUpdate) {
                void 0 === isUpdate && (isUpdate = !1), this.component.validate && this.component.validate({
                    props: props
                });
                var helpers = this.getHelpers();
                !function(component, props, inputProps, helpers, isUpdate) {
                    void 0 === isUpdate && (isUpdate = !1), extend(props, inputProps = inputProps || {});
                    for (var propNames = isUpdate ? [] : [].concat(component.getPropNames()), _i2 = 0, _Object$keys2 = Object.keys(inputProps); _i2 < _Object$keys2.length; _i2++) {
                        var key = _Object$keys2[_i2];
                        -1 === propNames.indexOf(key) && propNames.push(key);
                    }
                    for (var aliases = [], state = helpers.state, close = helpers.close, focus = helpers.focus, onError = helpers.onError, _i4 = 0; _i4 < propNames.length; _i4++) {
                        var _key = propNames[_i4], propDef = component.getPropDefinition(_key), value = inputProps[_key];
                        if (propDef) {
                            var alias = propDef.alias;
                            if (alias && (!isDefined(value) && isDefined(inputProps[alias]) && (value = inputProps[alias]), 
                            aliases.push(alias)), propDef.value && (value = propDef.value({
                                props: props,
                                state: state,
                                close: close,
                                focus: focus,
                                onError: onError
                            })), !isDefined(value) && propDef.default && (value = propDef.default({
                                props: props,
                                state: state,
                                close: close,
                                focus: focus,
                                onError: onError
                            })), isDefined(value) && ("array" === propDef.type ? !Array.isArray(value) : typeof value !== propDef.type)) throw new TypeError("Prop is not of type " + propDef.type + ": " + _key);
                            props[_key] = value;
                        }
                    }
                    for (var _i6 = 0; _i6 < aliases.length; _i6++) delete props[aliases[_i6]];
                    for (var _i8 = 0, _Object$keys4 = Object.keys(props); _i8 < _Object$keys4.length; _i8++) {
                        var _key2 = _Object$keys4[_i8], _propDef = component.getPropDefinition(_key2), _value = props[_key2];
                        _propDef && (isDefined(_value) && _propDef.validate && _propDef.validate({
                            value: _value,
                            props: props
                        }), isDefined(_value) && _propDef.decorate && (props[_key2] = _propDef.decorate({
                            value: _value,
                            props: props,
                            state: state,
                            close: close,
                            focus: focus,
                            onError: onError
                        })));
                    }
                    for (var _i10 = 0, _component$getPropNam2 = component.getPropNames(); _i10 < _component$getPropNam2.length; _i10++) {
                        var _key3 = _component$getPropNam2[_i10];
                        if (!1 !== component.getPropDefinition(_key3).required && !isDefined(props[_key3])) throw new Error('Expected prop "' + _key3 + '" to be defined');
                    }
                }(this.component, this.props, props, helpers, isUpdate);
            }, _proto.buildUrl = function() {
                var propsDef, props, params, _this6 = this;
                return (propsDef = _extends({}, this.component.props, this.component.builtinProps), 
                props = this.props, params = {}, promise_ZalgoPromise.all(Object.keys(props).map(function(key) {
                    var prop = propsDef[key];
                    if (prop) return promise_ZalgoPromise.resolve().then(function() {
                        var value = props[key];
                        if (value && prop.queryParam) return value;
                    }).then(function(value) {
                        if (null != value) return promise_ZalgoPromise.all([ props_getQueryParam(prop, key, value), getQueryValue(prop, 0, value) ]).then(function(_ref) {
                            var result, queryParam = _ref[0], queryValue = _ref[1];
                            if ("boolean" == typeof queryValue) result = queryValue.toString(); else if ("string" == typeof queryValue) result = queryValue.toString(); else if ("object" == typeof queryValue && null !== queryValue) {
                                if (prop.serialization === PROP_SERIALIZATION.JSON) result = JSON.stringify(queryValue); else if (prop.serialization === PROP_SERIALIZATION.BASE64) result = btoa(JSON.stringify(queryValue)); else if (prop.serialization === PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
                                    result = function dotify(obj, prefix, newobj) {
                                        for (var key in void 0 === prefix && (prefix = ""), void 0 === newobj && (newobj = {}), 
                                        prefix = prefix ? prefix + "." : prefix, obj) obj.hasOwnProperty(key) && null != obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                                            return "object" != typeof val;
                                        }) ? newobj["" + prefix + key + "[]"] = obj[key].join(",") : obj[key] && "object" == typeof obj[key] ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                                        return newobj;
                                    }(queryValue, key);
                                    for (var _i12 = 0, _Object$keys6 = Object.keys(result); _i12 < _Object$keys6.length; _i12++) {
                                        var dotkey = _Object$keys6[_i12];
                                        params[dotkey] = result[dotkey];
                                    }
                                    return;
                                }
                            } else "number" == typeof queryValue && (result = queryValue.toString());
                            params[queryParam] = result;
                        });
                    });
                })).then(function() {
                    return params;
                })).then(function(query) {
                    return function(url, options) {
                        void 0 === options && (options = {});
                        var originalUrl, originalHash, query = options.query || {}, hash = options.hash || {}, _url$split = url.split("#");
                        originalHash = _url$split[1];
                        var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
                        originalUrl = _originalUrl$split[0];
                        var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
                        return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
                        originalUrl;
                    }(normalizeMockUrl(_this6.component.getUrl(_this6.props)), {
                        query: query
                    });
                });
            }, _proto.getDomain = function() {
                return this.component.getDomain(this.props);
            }, _proto.getInitialDomain = function() {
                return this.component.getInitialDomain(this.props);
            }, _proto.getPropsForChild = function(domain) {
                for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(this.props); _i2 < _Object$keys2.length; _i2++) {
                    var key = _Object$keys2[_i2], prop = this.component.getPropDefinition(key);
                    prop && !1 === prop.sendToChild || prop && prop.sameDomain && !matchDomain(domain, utils_getDomain(window)) || (result[key] = this.props[key]);
                }
                return result;
            }, _proto.updateProps = function(props) {
                var _this7 = this;
                return this.setProps(props, !0), this.initPromise.then(function() {
                    if (_this7.child) return _this7.child.updateProps(_this7.getPropsForChild(_this7.getDomain())).catch(function(err) {
                        if (_this7.child && _this7.proxyWin) return _this7.checkClose(_this7.proxyWin).then(function() {
                            if (_this7.child) throw err;
                        });
                    });
                });
            }, _proto.openFrame = function() {
                var _this8 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this8.driver.openFrame) return _this8.driver.openFrame.call(_this8);
                });
            }, _proto.openPrerenderFrame = function() {
                var _this9 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this9.driver.openPrerenderFrame) return _this9.driver.openPrerenderFrame.call(_this9);
                });
            }, _proto.open = function(proxyFrame) {
                var _this10 = this;
                return promise_ZalgoPromise.try(function() {
                    _this10.component.log("open");
                    var windowProp = _this10.props.window;
                    return windowProp ? (_this10.clean.register(function() {
                        return windowProp.close();
                    }), setup_toProxyWindow(windowProp)) : _this10.driver.open.call(_this10, proxyFrame);
                }).then(function(proxyWin) {
                    return _this10.proxyWin = proxyWin, proxyWin;
                });
            }, _proto.openPrerender = function(proxyWin, proxyPrerenderFrame) {
                var _this11 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this11.driver.openPrerender.call(_this11, proxyWin, proxyPrerenderFrame);
                });
            }, _proto.focus = function() {
                var _this12 = this;
                return promise_ZalgoPromise.try(function() {
                    if (_this12.proxyWin) return _this12.proxyWin.focus().then(src_util_noop);
                });
            }, _proto.delegate = function(context, target) {
                var _this13 = this;
                this.component.log("delegate");
                for (var props = {}, _i4 = 0, _this$component$getPr2 = this.component.getPropNames(); _i4 < _this$component$getPr2.length; _i4++) {
                    var propName = _this$component$getPr2[_i4];
                    this.component.getPropDefinition(propName).allowDelegate && (props[propName] = this.props[propName]);
                }
                for (var overridesPromise = send_send(target, POST_MESSAGE_DELEGATE + "_" + this.component.name, {
                    context: context,
                    props: props,
                    overrides: {
                        event: this.event,
                        close: function() {
                            return _this13.close();
                        },
                        onError: function(err) {
                            return _this13.onError(err);
                        }
                    }
                }).then(function(_ref9) {
                    var data = _ref9.data;
                    return _this13.clean.register(data.destroy), data.overrides;
                }).catch(function(err) {
                    throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + stringifyError(err));
                }), _loop = function(_i6, _this$driver$delegate2) {
                    var key = _this$driver$delegate2[_i6];
                    _this13[key] = function() {
                        var _this14 = this, _arguments = arguments;
                        return overridesPromise.then(function(overrides) {
                            return overrides[key].apply(_this14, _arguments);
                        });
                    };
                }, _i6 = 0, _this$driver$delegate2 = this.driver.delegate; _i6 < _this$driver$delegate2.length; _i6++) _loop(_i6, _this$driver$delegate2);
            }, _proto.getWindowRef = function(target, domain, uid, context) {
                if (domain === utils_getDomain(window)) {
                    var global = lib_global_getGlobal(window);
                    return global.windows = global.windows || {}, global.windows[uid] = window, this.clean.register(function() {
                        delete global.windows[uid];
                    }), {
                        type: "global",
                        uid: uid
                    };
                }
                return context === CONTEXT.POPUP ? {
                    type: "opener"
                } : {
                    type: "parent",
                    distance: getDistanceFromTop(window)
                };
            }, _proto.watchForClose = function(proxyWin) {
                var _this15 = this, cancelled = !1;
                return this.clean.register(function() {
                    cancelled = !0;
                }), promise_ZalgoPromise.delay(2e3).then(function() {
                    return proxyWin.isClosed();
                }).then(function(isClosed) {
                    return isClosed ? (_this15.component.log("detect_close_child"), _this15.close()) : cancelled ? void 0 : _this15.watchForClose(proxyWin);
                });
            }, _proto.watchForUnload = function() {
                var _this16 = this, unloadWindowListener = addEventListener(window, "unload", once(function() {
                    _this16.component.log("navigate_away"), _this16.destroy(new Error("Window navigated away"));
                }));
                this.clean.register(unloadWindowListener.cancel);
            }, _proto.runTimeout = function() {
                var _this17 = this;
                return promise_ZalgoPromise.try(function() {
                    var timeout = _this17.props.timeout;
                    if (timeout) return _this17.initPromise.timeout(timeout, new Error("Loading component timed out after " + timeout + " milliseconds"));
                });
            }, _proto.initChild = function(child) {
                var _this18 = this;
                return promise_ZalgoPromise.try(function() {
                    _this18.clean.set("child", child), _this18.initPromise.resolve();
                });
            }, _proto.buildParentExports = function(win) {
                var _this19 = this, onError = function(err) {
                    return _this19.onError(err);
                }, init = function(child) {
                    return _this19.initChild(child);
                };
                return init.onError = onError, {
                    init: init,
                    close: function() {
                        return _this19.close();
                    },
                    checkClose: function() {
                        return _this19.checkClose(win);
                    },
                    resize: function(_ref10) {
                        return _this19.resize({
                            width: _ref10.width,
                            height: _ref10.height
                        });
                    },
                    onError: onError
                };
            }, _proto.resize = function(_ref11) {
                var _this20 = this, width = _ref11.width, height = _ref11.height;
                return promise_ZalgoPromise.try(function() {
                    _this20.event.trigger(EVENT.RESIZE, {
                        width: width,
                        height: height
                    });
                });
            }, _proto.checkClose = function(win) {
                var _this21 = this;
                return win.isClosed().then(function(closed) {
                    return closed ? _this21.close() : promise_ZalgoPromise.delay(200).then(function() {
                        return win.isClosed();
                    }).then(function(secondClosed) {
                        if (secondClosed) return _this21.close();
                    });
                });
            }, _proto.close = function() {
                var _this22 = this;
                return promise_ZalgoPromise.try(function() {
                    return _this22.component.log("close"), _this22.event.trigger(EVENT.CLOSE);
                }).then(function() {
                    return _this22.child && _this22.child.close.fireAndForget().catch(src_util_noop), 
                    _this22.destroy(new Error("Window closed"), !1);
                });
            }, _proto.prerender = function(proxyPrerenderWin, _ref12) {
                var _this23 = this, context = _ref12.context, uid = _ref12.uid;
                return promise_ZalgoPromise.try(function() {
                    var prerenderTemplate = _this23.component.prerenderTemplate;
                    if (prerenderTemplate) {
                        var prerenderWindow = proxyPrerenderWin.getWindow();
                        if (prerenderWindow && isSameDomain(prerenderWindow) && function(win) {
                            try {
                                if (!win.location.href) return !0;
                                if ("about:blank" === win.location.href) return !0;
                            } catch (err) {}
                            return !1;
                        }(prerenderWindow)) {
                            var doc = (prerenderWindow = assertSameDomain(prerenderWindow)).document, el = _this23.renderTemplate(prerenderTemplate, {
                                context: context,
                                uid: uid,
                                doc: doc
                            });
                            if (el) {
                                if (el.ownerDocument !== doc) throw new Error("Expected prerender template to have been created with document from child window");
                                !function(win, el) {
                                    var tag = el.tagName.toLowerCase();
                                    if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                                    for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length; ) documentElement.removeChild(documentElement.children[0]);
                                    for (;el.children.length; ) documentElement.appendChild(el.children[0]);
                                }(prerenderWindow, el);
                                var _ref13 = _this23.component.autoResize || {}, _ref13$width = _ref13.width, width = void 0 !== _ref13$width && _ref13$width, _ref13$height = _ref13.height, height = void 0 !== _ref13$height && _ref13$height, _ref13$element = _ref13.element, element = void 0 === _ref13$element ? "body" : _ref13$element;
                                (element = getElementSafe(element, doc)) && (width || height) && onResize(element, function(_ref14) {
                                    _this23.resize({
                                        width: width ? _ref14.width : void 0,
                                        height: height ? _ref14.height : void 0
                                    });
                                }, {
                                    width: width,
                                    height: height,
                                    win: prerenderWindow
                                });
                            }
                        }
                    }
                });
            }, _proto.renderTemplate = function(renderer, _ref15) {
                var _this24 = this;
                return renderer.call(this, {
                    container: _ref15.container,
                    context: _ref15.context,
                    uid: _ref15.uid,
                    doc: _ref15.doc,
                    frame: _ref15.frame,
                    prerenderFrame: _ref15.prerenderFrame,
                    focus: function() {
                        return _this24.focus();
                    },
                    close: function() {
                        return _this24.close();
                    },
                    state: this.state,
                    props: this.props,
                    tag: this.component.tag,
                    dimensions: this.component.dimensions,
                    event: this.event
                });
            }, _proto.renderContainer = function(proxyContainer, _ref16) {
                var _this25 = this, proxyFrame = _ref16.proxyFrame, proxyPrerenderFrame = _ref16.proxyPrerenderFrame, context = _ref16.context, uid = _ref16.uid;
                return promise_ZalgoPromise.all([ proxyContainer.get().then(elementReady), proxyFrame ? proxyFrame.get() : null, proxyPrerenderFrame ? proxyPrerenderFrame.get() : null ]).then(function(_ref17) {
                    var container = _ref17[0], innerContainer = _this25.renderTemplate(_this25.component.containerTemplate, {
                        context: context,
                        uid: uid,
                        container: container,
                        frame: _ref17[1],
                        prerenderFrame: _ref17[2],
                        doc: document
                    });
                    if (innerContainer) return appendChild(container, innerContainer), _this25.clean.register(function() {
                        return destroyElement(innerContainer);
                    }), getProxyObject(innerContainer);
                });
            }, _proto.destroy = function(err, trigger) {
                var _this26 = this;
                return void 0 === trigger && (trigger = !0), promise_ZalgoPromise.try(function() {
                    return err || (trigger = !1, err = new Error("Component destroyed")), _this26.component.log("destroy"), 
                    _this26.onError(err, trigger);
                }).then(function() {
                    return _this26.clean.all();
                });
            }, _proto.onError = function(err, trigger) {
                var _this27 = this;
                return void 0 === trigger && (trigger = !0), promise_ZalgoPromise.try(function() {
                    if (-1 === _this27.handledErrors.indexOf(err)) return _this27.handledErrors.push(err), 
                    _this27.initPromise.asyncReject(err), trigger ? _this27.event.trigger(EVENT.ERROR, err) : void 0;
                });
            }, _proto.openBridge = function(proxyWin, domain, context) {
                var _this28 = this;
                return promise_ZalgoPromise.try(function() {
                    return proxyWin.awaitWindow();
                }).then(function(win) {
                    if (src_bridge && src_bridge.needsBridge({
                        win: win,
                        domain: domain
                    }) && !src_bridge.hasBridge(domain, domain)) {
                        var bridgeUrl = _this28.component.getBridgeUrl();
                        if (!bridgeUrl) throw new Error("Bridge needed to render " + context);
                        var bridgeDomain = getDomainFromUrl(bridgeUrl);
                        return src_bridge.linkUrl(win, domain), src_bridge.openBridge(normalizeMockUrl(bridgeUrl), bridgeDomain);
                    }
                });
            }, ParentComponent;
        }(), delegate_DelegateComponent = function() {
            function DelegateComponent(component, source, options) {
                var _this = this;
                this.component = void 0, this.source = void 0, this.context = void 0, this.driver = void 0, 
                this.props = void 0, this.clean = void 0, this.focus = void 0, this.resize = void 0, 
                this.renderTemplate = void 0, this.close = void 0, this.onError = void 0, this.event = void 0, 
                this.component = component, this.context = options.context, this.driver = RENDER_DRIVERS[options.context], 
                this.clean = cleanup(this), this.focus = parent_ParentComponent.prototype.focus, 
                this.resize = parent_ParentComponent.prototype.resize, this.renderTemplate = parent_ParentComponent.prototype.renderTemplate, 
                this.props = {};
                for (var _i2 = 0, _Object$keys2 = Object.keys(options.props); _i2 < _Object$keys2.length; _i2++) {
                    var propName = _Object$keys2[_i2], propDef = this.component.getPropDefinition(propName);
                    propDef && propDef.allowDelegate && options.props[propName] && (this.props[propName] = options.props[propName]);
                }
                this.close = options.overrides.close, this.onError = options.overrides.onError, 
                this.event = options.overrides.event, this.component.registerActiveComponent(this), 
                this.clean.register(function() {
                    return _this.component.destroyActiveComponent(_this);
                }), this.watchForSourceClose(source);
            }
            var _proto = DelegateComponent.prototype;
            return _proto.getDelegate = function() {
                var _this2 = this;
                return {
                    overrides: this.getOverrides(),
                    destroy: function() {
                        return _this2.destroy();
                    }
                };
            }, _proto.watchForSourceClose = function(source) {
                var _this3 = this, closeSourceWindowListener = onCloseWindow(source, function() {
                    return _this3.destroy();
                }, 3e3);
                this.clean.register(closeSourceWindowListener.cancel);
            }, _proto.getOverrides = function() {
                for (var overrides = {}, self = this, _loop = function(_i4, _this$driver$delegate2) {
                    var key = _this$driver$delegate2[_i4];
                    overrides[key] = function() {
                        return parent_ParentComponent.prototype[key].apply(self, arguments);
                    }, overrides[key].__name__ = key;
                }, _i4 = 0, _this$driver$delegate2 = this.driver.delegate; _i4 < _this$driver$delegate2.length; _i4++) _loop(_i4, _this$driver$delegate2);
                return overrides;
            }, _proto.destroy = function() {
                return this.clean.all();
            }, DelegateComponent;
        }(), CLASS = {
            VISIBLE: "visible",
            INVISIBLE: "invisible"
        };
        function defaultContainerTemplate(_ref) {
            var uid = _ref.uid, frame = _ref.frame, prerenderFrame = _ref.prerenderFrame, doc = _ref.doc, props = _ref.props, event = _ref.event, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
            if (frame && prerenderFrame) {
                var div = doc.createElement("div");
                div.setAttribute("id", uid);
                var style = doc.createElement("style");
                return props.cspNonce && style.setAttribute("nonce", props.cspNonce), style.appendChild(doc.createTextNode("\n            #" + uid + " {\n                display: inline-block;\n                position: relative;\n                width: " + width + ";\n                height: " + height + ";\n            }\n\n            #" + uid + " > iframe {\n                display: inline-block;\n                position: absolute;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                transition: opacity .2s ease-in-out;\n            }\n\n            #" + uid + " > iframe." + CLASS.INVISIBLE + " {\n                opacity: 0;\n            }\n\n            #" + uid + " > iframe." + CLASS.VISIBLE + " {\n                opacity: 1;\n        }\n        ")), 
                div.appendChild(frame), div.appendChild(prerenderFrame), div.appendChild(style), 
                prerenderFrame.classList.add(CLASS.VISIBLE), frame.classList.add(CLASS.INVISIBLE), 
                event.on(EVENT.RENDERED, function() {
                    prerenderFrame.classList.remove(CLASS.VISIBLE), prerenderFrame.classList.add(CLASS.INVISIBLE), 
                    frame.classList.remove(CLASS.INVISIBLE), frame.classList.add(CLASS.VISIBLE), setTimeout(function() {
                        destroyElement(prerenderFrame);
                    }, 1);
                }), event.on(EVENT.RESIZE, function(_ref2) {
                    var newWidth = _ref2.width, newHeight = _ref2.height;
                    "number" == typeof newWidth && (div.style.width = toCSS(newWidth)), "number" == typeof newHeight && (div.style.height = toCSS(newHeight));
                }), div;
            }
        }
        function defaultPrerenderTemplate(_ref) {
            var doc = _ref.doc, props = _ref.props, html = doc.createElement("html"), body = doc.createElement("body"), style = doc.createElement("style"), spinner = doc.createElement("div");
            return spinner.classList.add("spinner"), props.cspNonce && style.setAttribute("nonce", props.cspNonce), 
            html.appendChild(body), body.appendChild(spinner), body.appendChild(style), style.appendChild(doc.createTextNode("\n            html, body {\n                width: 100%;\n                height: 100%;\n            }\n\n            .spinner {\n                position: fixed;\n                max-height: 60vmin;\n                max-width: 60vmin;\n                height: 40px;\n                width: 40px;\n                top: 50%;\n                left: 50%;\n                box-sizing: border-box;\n                border: 3px solid rgba(0, 0, 0, .2);\n                border-top-color: rgba(33, 128, 192, 0.8);\n                border-radius: 100%;\n                animation: rotation .7s infinite linear;\n            }\n\n            @keyframes rotation {\n                from {\n                    transform: translateX(-50%) translateY(-50%) rotate(0deg);\n                }\n                to {\n                    transform: translateX(-50%) translateY(-50%) rotate(359deg);\n                }\n            }\n        ")), 
            html;
        }
        var props_defaultNoop = function() {
            return src_util_noop;
        }, props_decorateOnce = function(_ref) {
            return once(_ref.value);
        }, component_Component = function() {
            function Component(options) {
                this.tag = void 0, this.name = void 0, this.url = void 0, this.domain = void 0, 
                this.bridgeUrl = void 0, this.props = void 0, this.builtinProps = void 0, this.dimensions = void 0, 
                this.autoResize = void 0, this.allowedParentDomains = void 0, this.defaultContext = void 0, 
                this.attributes = void 0, this.containerTemplate = void 0, this.prerenderTemplate = void 0, 
                this.validate = void 0, this.driverCache = void 0, this.xprops = void 0, this.logger = void 0, 
                this.propNames = void 0, function(options) {
                    if (!options) throw new Error("Expected options to be passed");
                    if (!options.tag || !options.tag.match(/^([a-z0-9]+-)+[a-z0-9]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                    if (function(options) {
                        if (options.props && "object" != typeof options.props) throw new Error("Expected options.props to be an object");
                        var PROP_TYPE_LIST = function(obj) {
                            var result = [];
                            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                            return result;
                        }(PROP_TYPE);
                        if (options.props) for (var _i2 = 0, _Object$keys2 = Object.keys(options.props); _i2 < _Object$keys2.length; _i2++) {
                            var key = _Object$keys2[_i2], prop = options.props[key];
                            if (!prop || "object" != typeof prop) throw new Error("Expected options.props." + key + " to be an object");
                            if (!prop.type) throw new Error("Expected prop.type");
                            if (-1 === PROP_TYPE_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + PROP_TYPE_LIST.join(", "));
                            if (prop.required && prop.default) throw new Error("Required prop can not have a default value");
                            if (prop.type === PROP_TYPE.FUNCTION && prop.queryParam && !prop.queryValue) throw new Error("Do not pass queryParam for function prop");
                        }
                    }(options), options.dimensions) {
                        if (options.dimensions && !isPx(options.dimensions.width) && !isPerc(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                        if (options.dimensions && !isPx(options.dimensions.height) && !isPerc(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                    }
                    if (options.defaultContext && options.defaultContext !== CONTEXT.IFRAME && options.defaultContext !== CONTEXT.POPUP) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                    if (!options.url) throw new Error("Must pass url");
                    if ("string" != typeof options.url && "function" != typeof options.url) throw new TypeError("Expected url to be string or function");
                    if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
                    if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
                }(options), this.tag = options.tag, this.name = this.tag.replace(/-/g, "_"), this.allowedParentDomains = options.allowedParentDomains || src_constants_WILDCARD;
                var global = lib_global_getGlobal();
                if (global.components = global.components || {}, global.components[this.tag]) throw new Error("Can not register multiple components with the same tag: " + this.tag);
                this.builtinProps = {
                    window: {
                        type: "object",
                        sendToChild: !1,
                        required: !1,
                        allowDelegate: !0,
                        validate: function(_ref2) {
                            var value = _ref2.value;
                            if (!isWindow(value) && !window_ProxyWindow.isProxyWindow(value)) throw new Error("Expected Window or ProxyWindow");
                        },
                        decorate: function(_ref3) {
                            return setup_toProxyWindow(_ref3.value);
                        }
                    },
                    timeout: {
                        type: "number",
                        required: !1,
                        sendToChild: !1
                    },
                    close: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref4) {
                            return _ref4.close;
                        }
                    },
                    focus: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref5) {
                            return _ref5.focus;
                        }
                    },
                    resize: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref6) {
                            return _ref6.resize;
                        }
                    },
                    cspNonce: {
                        type: "string",
                        required: !1
                    },
                    getParent: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref7) {
                            return _ref7.getParent;
                        }
                    },
                    getParentDomain: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref8) {
                            return _ref8.getParentDomain;
                        }
                    },
                    onDisplay: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onRendered: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onRender: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onClose: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: props_defaultNoop,
                        decorate: props_decorateOnce
                    },
                    onError: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function(_ref9) {
                            return _ref9.onError;
                        }
                    },
                    onProps: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: props_defaultNoop,
                        childDecorate: function(_ref10) {
                            return _ref10.onProps;
                        }
                    }
                }, this.props = options.props || {};
                var _ref = options.dimensions || {}, _ref$width = _ref.width, _ref$height = _ref.height;
                this.dimensions = {
                    width: void 0 === _ref$width ? DEFAULT_DIMENSIONS.WIDTH : _ref$width,
                    height: void 0 === _ref$height ? DEFAULT_DIMENSIONS.HEIGHT : _ref$height
                }, this.url = options.url, this.domain = options.domain, this.bridgeUrl = options.bridgeUrl, 
                this.attributes = options.attributes || {}, this.attributes.iframe = this.attributes.iframe || {}, 
                this.attributes.popup = this.attributes.popup || {}, this.defaultContext = options.defaultContext || CONTEXT.IFRAME, 
                this.autoResize = options.autoResize, this.containerTemplate = options.containerTemplate ? options.containerTemplate : defaultContainerTemplate, 
                this.prerenderTemplate = options.prerenderTemplate ? options.prerenderTemplate : defaultPrerenderTemplate, 
                this.validate = options.validate, this.logger = options.logger || {
                    debug: src_util_noop,
                    info: src_util_noop,
                    warn: src_util_noop,
                    error: src_util_noop
                }, this.registerChild(), this.listenDelegate(), global.components[this.tag] = this;
            }
            var _proto = Component.prototype;
            return _proto.getPropNames = function() {
                if (this.propNames) return this.propNames;
                for (var propNames = Object.keys(this.props), _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps); _i2 < _Object$keys2.length; _i2++) {
                    var key = _Object$keys2[_i2];
                    -1 === propNames.indexOf(key) && propNames.push(key);
                }
                return this.propNames = propNames, propNames;
            }, _proto.getPropDefinition = function(name) {
                return this.props[name] || this.builtinProps[name];
            }, _proto.driver = function(name, dep) {
                throw new Error("Driver support not enabled");
            }, _proto.registerChild = function() {
                if (this.isChild()) {
                    if (window.xprops) throw new Error("Can not register " + this.name + " as child - can not attach multiple components to the same window");
                    var child = new child_ChildComponent(this);
                    window.xprops = this.xprops = child.getProps();
                }
            }, _proto.listenDelegate = function() {
                var _this = this;
                on_on(POST_MESSAGE_ALLOW_DELEGATE + "_" + this.name, function() {
                    return !0;
                }), on_on(POST_MESSAGE_DELEGATE + "_" + this.name, function(_ref2) {
                    var _ref2$data = _ref2.data;
                    return new delegate_DelegateComponent(_this, _ref2.source, {
                        context: _ref2$data.context,
                        props: _ref2$data.props,
                        overrides: _ref2$data.overrides
                    }).getDelegate();
                });
            }, _proto.canRenderTo = function(win) {
                return send_send(win, POST_MESSAGE_ALLOW_DELEGATE + "_" + this.name).then(function(_ref3) {
                    return _ref3.data;
                }).catch(function() {
                    return !1;
                });
            }, _proto.getUrl = function(props) {
                return "function" == typeof this.url ? this.url({
                    props: props
                }) : this.url;
            }, _proto.getInitialDomain = function(props) {
                return this.domain && "string" == typeof this.domain ? this.domain : getDomainFromUrl(this.getUrl(props));
            }, _proto.getDomain = function(props) {
                return util_isRegex(this.domain) ? this.domain : this.getInitialDomain(props);
            }, _proto.getBridgeUrl = function() {
                if (this.bridgeUrl) return this.bridgeUrl;
            }, _proto.isChild = function() {
                var payload = getChildPayload();
                return Boolean(payload && payload.tag === this.tag);
            }, _proto.getDefaultContainer = function(context, container) {
                if (container) {
                    if ("string" != typeof container && !isElement(container)) throw new TypeError("Expected string or element selector to be passed");
                    return container;
                }
                if (context === CONTEXT.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
            }, _proto.getDefaultContext = function(context, props) {
                if (props.window) return setup_toProxyWindow(props.window).getType();
                if (context) {
                    if (context !== CONTEXT.IFRAME && context !== CONTEXT.POPUP) throw new Error("Unrecognized context: " + context);
                    return context;
                }
                return this.defaultContext;
            }, _proto.init = function(props) {
                var _this2 = this, parent = new parent_ParentComponent(this, props = props || {}), _render = function(target, container, context) {
                    return promise_ZalgoPromise.try(function() {
                        if (!isWindow(target)) throw new Error("Must pass window to renderTo");
                        return context = _this2.getDefaultContext(context, props), container = _this2.getDefaultContainer(context, container), 
                        parent.render(target, container, context);
                    });
                };
                return _extends({}, parent.getHelpers(), {
                    render: function(container, context) {
                        return _render(window, container, context);
                    },
                    renderTo: function(target, container, context) {
                        return _render(target, container, context);
                    }
                });
            }, _proto.checkAllowRender = function(target, domain, container) {
                if (target !== window) {
                    if (!isSameTopWindow(window, target)) throw new Error("Can only renderTo an adjacent frame");
                    var origin = utils_getDomain();
                    if (!matchDomain(domain, origin) && !isSameDomain(target)) throw new Error("Can not render remotely to " + domain.toString() + " - can only render to " + origin);
                    if (container && "string" != typeof container) throw new Error("Container passed to renderTo must be a string selector, got " + typeof container + " }");
                }
            }, _proto.log = function(event, payload) {
                this.logger.info(this.name + "_" + event, payload);
            }, _proto.registerActiveComponent = function(instance) {
                var global = lib_global_getGlobal();
                global.activeComponents = global.activeComponents || [], global.activeComponents.push(instance);
            }, _proto.destroyActiveComponent = function(instance) {
                var global = lib_global_getGlobal();
                global.activeComponents = global.activeComponents || [], global.activeComponents.splice(global.activeComponents.indexOf(instance), 1);
            }, Component;
        }();
        function create(options) {
            var _ref3, on, send, global;
            global_getGlobal().initialized || (global_getGlobal().initialized = !0, on = (_ref3 = {
                on: on_on,
                send: send_send
            }).on, send = _ref3.send, (global = global_getGlobal()).receiveMessage = global.receiveMessage || function(message) {
                return receive_receiveMessage(message, {
                    on: on,
                    send: send
                });
            }, function(_ref5) {
                var on = _ref5.on, send = _ref5.send;
                globalStore().getOrSet("postMessageListener", function() {
                    return addEventListener(window, "message", function(event) {
                        !function(event, _ref4) {
                            var on = _ref4.on, send = _ref4.send, source = event.source || event.sourceElement, origin = event.origin || event.originalEvent && event.originalEvent.origin, data = event.data;
                            if ("null" === origin && (origin = PROTOCOL.FILE + "//"), source) {
                                if (!origin) throw new Error("Post message did not have origin domain");
                                receive_receiveMessage({
                                    source: source,
                                    origin: origin,
                                    data: data
                                }, {
                                    on: on,
                                    send: send
                                });
                            }
                        }(event, {
                            on: on,
                            send: send
                        });
                    });
                });
            }({
                on: on_on,
                send: send_send
            }), setupBridge({
                on: on_on,
                send: send_send,
                receiveMessage: receive_receiveMessage
            }), function(_ref7) {
                var on = _ref7.on, send = _ref7.send;
                globalStore("builtinListeners").getOrSet("helloListener", function() {
                    var listener = on(MESSAGE_NAME.HELLO, {
                        domain: constants_WILDCARD
                    }, function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin;
                        return getHelloPromise(source).resolve({
                            win: source,
                            domain: origin
                        }), {
                            instanceID: getInstanceID()
                        };
                    }), parent = getAncestor();
                    return parent && sayHello(parent, {
                        send: send
                    }).catch(src_util_noop), listener;
                });
            }({
                on: on_on,
                send: send_send
            }));
            var component = new component_Component(options), init = function(props) {
                return component.init(props);
            };
            return init.driver = function(name, dep) {
                return component.driver(name, dep);
            }, init.isChild = function() {
                return component.isChild();
            }, init.canRenderTo = function(win) {
                return component.canRenderTo(win);
            }, init.xprops = component.xprops, init;
        }
        function destroyAll() {
            src_bridge && src_bridge.destroyBridges();
            var results = [], global = lib_global_getGlobal();
            for (global.activeComponents = global.activeComponents || []; global.activeComponents.length; ) results.push(global.activeComponents[0].destroy(new Error("zoid desroyed all"), !1));
            return promise_ZalgoPromise.all(results).then(src_util_noop);
        }
        var destroyComponents = destroyAll;
        function component_destroy() {
            var listener;
            destroyAll(), delete window.__zoid_9_0_21__, function() {
                for (var responseListeners = globalStore("responseListeners"), _i2 = 0, _responseListeners$ke2 = responseListeners.keys(); _i2 < _responseListeners$ke2.length; _i2++) {
                    var hash = _responseListeners$ke2[_i2], listener = responseListeners.get(hash);
                    listener && (listener.cancelled = !0), responseListeners.del(hash);
                }
            }(), (listener = globalStore().get("postMessageListener")) && listener.cancel(), 
            delete window.__post_robot_10_0_14__;
        }
        __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
            return PopupOpenError;
        }), __webpack_require__.d(__webpack_exports__, "create", function() {
            return create;
        }), __webpack_require__.d(__webpack_exports__, "destroy", function() {
            return component_destroy;
        }), __webpack_require__.d(__webpack_exports__, "destroyComponents", function() {
            return destroyComponents;
        }), __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
            return destroyAll;
        }), __webpack_require__.d(__webpack_exports__, "Component", function() {
            return component_Component;
        }), __webpack_require__.d(__webpack_exports__, "PROP_TYPE", function() {
            return PROP_TYPE;
        }), __webpack_require__.d(__webpack_exports__, "PROP_SERIALIZATION", function() {
            return PROP_SERIALIZATION;
        }), __webpack_require__.d(__webpack_exports__, "CONTEXT", function() {
            return CONTEXT;
        }), __webpack_require__.d(__webpack_exports__, "EVENT", function() {
            return EVENT;
        });
    } ]);
});
//# sourceMappingURL=zoid.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/zoid/index.js":
/*!************************************!*\
  !*** ./node_modules/zoid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* @flow */
/* eslint import/no-commonjs: 0 */

// eslint-disable-next-line no-process-env
if (process.env.ZOID_FRAME_ONLY) {
    // $FlowFixMe
    module.exports = __webpack_require__(/*! ./dist/zoid.frame */ "./node_modules/zoid/dist/zoid.frame.js");
    module.exports.default = module.exports;
} else {
    // $FlowFixMe
    module.exports = __webpack_require__(/*! ./dist/zoid */ "./node_modules/zoid/dist/zoid.js");
    module.exports.default = module.exports;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/widget/scss/widget.scss":
/*!*************************************!*\
  !*** ./src/widget/scss/widget.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/widget/widget.tsx":
/*!*******************************!*\
  !*** ./src/widget/widget.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var zoid = __webpack_require__(/*! zoid */ "./node_modules/zoid/index.js");
__webpack_require__(/*! ./scss/widget.scss */ "./src/widget/scss/widget.scss");
var baseUrl = __webpack_require__(/*! ../../env */ "./env.js").baseUrl;
var app = zoid.create({
    tag: 'react-chat-zoid-component',
    url: baseUrl + '/widget',
    context: 'iframe',
    dimensions: {
        width: '1px',
        height: '1px'
    },
    autoResize: {
        width: true,
        height: true
    }
})({
    addClass: function (selector, className) {
        document.querySelector(selector).classList.add(className);
    },
    removeClass: function (selector, className) {
        document.querySelector(selector).classList.remove(className);
    },
    finishedLoading: function () {
        document.querySelector('#kothman-react-chat-widget-container')
            .classList.add('done-loading');
    }
});
window.ReactChatWidget = app;


/***/ })

/******/ });
//# sourceMappingURL=embed-widget.js.map