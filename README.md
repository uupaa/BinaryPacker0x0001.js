# BinaryPacker0x0001.js [![Build Status](https://travis-ci.org/uupaa/BinaryPacker0x0001.js.png)](http://travis-ci.org/uupaa/BinaryPacker0x0001.js)

[![npm](https://nodei.co/npm/uupaa.binarypacker0x0001.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.binarypacker0x0001.js/)

Rect pack/unpack for BinaryPacker.js

## Document

- [BinaryPacker0x0001.js wiki](https://github.com/uupaa/BinaryPacker0x0001.js/wiki/BinaryPacker0x0001)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)

## How to use

### Browser

```js
<script src="lib/BinaryPacker.js"></script>
<script src="lib/BinaryPacker0x0001.js"></script>
<script>

var formatID = 0x0001; // RECT
var object = { x: 0, y: 0, w: 100, h: 100 };
var bp = new BinaryPacker();
var packed = bp.pack(object, formatID);
var unpacked = bp.unpack(packed);

if ( object.x === unpacked.x &&
     object.y === unpacked.y &&
     object.w === unpacked.w &&
     object.h === unpacked.h) {
    console.log("OK");
} else {
    console.log("ERROR");
}
</script>
```

### WebWorkers

```js
importScripts("lib/BinaryPacker.js");
importScripts("lib/BinaryPacker0x0001.js"); // RECT

...
```

### Node.js

```js
var BinaryPacker = require("lib/BinaryPacker.js");
var BinaryPacker0x0001 = require("lib/BinaryPacker0x0001.js"); // RECT

...
```

