(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var BinaryPacker = global["BinaryPacker"];

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function BinaryPacker0x0001() {
}

//{@dev
BinaryPacker0x0001["repository"] = "https://github.com/uupaa/BinaryPacker0x0001.js"; // GitHub repository URL. http://git.io/Help
//}@dev

BinaryPacker0x0001["pack"]   = BinaryPacker0x0001_pack;   // BinaryPacker0x0001.pack(source:Any):Uint8Array
BinaryPacker0x0001["unpack"] = BinaryPacker0x0001_unpack; // BinaryPacker0x0001.unpack(source:Uint8Array, header:Object = null):Any

// --- implements ------------------------------------------
function BinaryPacker0x0001_pack(source) { // @arg Object - { x, y, w, h }
                                           // @ret Uint8Array
//{@dev
    $valid($type(source, "Object"), BinaryPacker0x0001_pack, "source");
//}@dev

// header
//  | size | keyword    | value                               |
//  |------|------------|-------------------------------------|
//  | 2    | signature  | "BP"       [0x42, 0x50]             |
//  | 2    | formatID   | 0x0001     [0x00, 0x01]             |
//  | 4    | bodyLength | 0x00000008 [0x00, 0x00, 0x00, 0x08] |
//
// body
//  | size | keyword    |                                     |
//  |------|------------|-------------------------------------|
//  | 2    | x          | 0x0000-0xffff                       |  --+
//  | 2    | y          | 0x0000-0xffff                       |    |
//  | 2    | w          | 0x0000-0xffff                       |    +-- 8 bytes
//  | 2    | h          | 0x0000-0xffff                       |  --+

    var headerSize = 2 + 2 + 4; // signature(2) + formatID(2) + bodyLength(4);
    var bodySize   = 8;
    var result = new Uint8Array(headerSize + bodySize);

    var x = source["x"];
    var y = source["y"];
    var w = source["w"];
    var h = source["h"];

    result.set([
        // --- header ---
        0x42, 0x50,             // signature
        0x00, 0x01,             // formatID
        0x00, 0x00, 0x00, 0x08, // bodyLength
        // --- body ---
        (x >> 8) & 0xff, x & 0xff,
        (y >> 8) & 0xff, y & 0xff,
        (w >> 8) & 0xff, w & 0xff,
        (h >> 8) & 0xff, h & 0xff,
    ]);
    return result;
}

function BinaryPacker0x0001_unpack(source,   // @arg Uint8Array
                                   header) { // @arg Object = null
                                             // @ret Object - { x, y, w, h }
//{@dev
    $valid($type(source, "Uint8Array"), BinaryPacker0x0001_unpack, "source");
//}@dev

    header = header || BinaryPacker["readHeader"](source);
    if (header && header["formatID"] === 0x0001) {

        var cursor = header["cursor"];
        var x = source[cursor++] << 8 | source[cursor++];
        var y = source[cursor++] << 8 | source[cursor++];
        var w = source[cursor++] << 8 | source[cursor++];
        var h = source[cursor++] << 8 | source[cursor++];

        return { "x": x, "y": y, "w": w, "h": h };
    }
    throw new TypeError("unsupported format");
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = BinaryPacker0x0001;
}
global["BinaryPacker0x0001" in global ? "BinaryPacker0x0001_" : "BinaryPacker0x0001"] = BinaryPacker0x0001; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

