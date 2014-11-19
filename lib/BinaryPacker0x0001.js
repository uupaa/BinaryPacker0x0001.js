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

BinaryPacker0x0001["prototype"] = {
    "constructor":  BinaryPacker0x0001,         // new BinaryPacker0x0001():BinaryPacker0x0001
    "pack":         BinaryPacker0x0001_pack,    // BinaryPacker0x0001#pack(source:Any):Uint8Array
    "unpack":       BinaryPacker0x0001_unpack,  // BinaryPacker0x0001#unpack(source:Uint8Array):Any
};

// --- implements ------------------------------------------
function BinaryPacker0x0001_pack(source) { // @arg Object - { x, y, w, h }
                                           // @ret Uint8Array
//{@dev
    $valid($type(source, "Object"), BinaryPacker0x0001_pack, "source");
//}@dev

// header
//  | size | keyword    | value                 |
//  |------|------------|-----------------------|
//  | 2    | signature  | [0x42, 0x50] "BP"     |
//  | 4    | bodyLength | [0x08]                |
//  | 2    | formatID   | [0x00, 0x01] 0x0001   |
// body
//  | size | keyword    |                       |
//  |------|------------|-----------------------|
//  | 2    | x          | 0x0000-0xffff         |
//  | 2    | y          | 0x0000-0xffff         |
//  | 2    | w          | 0x0000-0xffff         |
//  | 2    | h          | 0x0000-0xffff         |
    var signatureSize  = 2;
    var bodyLengthSize = 4;
    var formatIDSize   = 2;
    var bodyLength     = 8;
    var result = new Uint8Array(signatureSize + bodyLengthSize + formatIDSize + bodyLength);

    var x = source["x"];
    var y = source["y"];
    var w = source["w"];
    var h = source["h"];

    result.set([
        // --- header ---
        0x66, 0x80,             // signatureSize
        0x00, 0x00, 0x00, 0x08, // bodyLength
        0x00, 0x01,             // formatID
        // --- body ---
        (x >> 8) & 0xff, x & 0xff,
        (y >> 8) & 0xff, y & 0xff,
        (w >> 8) & 0xff, w & 0xff,
        (h >> 8) & 0xff, h & 0xff,
    ]);
    return result;
}

function BinaryPacker0x0001_unpack(source) { // @arg Uint8Array
                                             // @ret Object|null - { x, y, w, h }
//{@dev
    $valid($type(source, "Uint8Array"), BinaryPacker0x0001_unpack, "source");
//}@dev

    var header = BinaryPacker.readHeader(source);
    if (header) {
        if (header["formatID"]   === 0x0001 &&
            header["bodyLength"] === 0x0008) {

            var cursor = header["cursor"];
            var x = source[cursor++] << 8 | source[cursor++];
            var y = source[cursor++] << 8 | source[cursor++];
            var w = source[cursor++] << 8 | source[cursor++];
            var h = source[cursor++] << 8 | source[cursor++];

            return { "x": x, "y": y, "w": w, "h": h };
        }
    }
    return null;
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
