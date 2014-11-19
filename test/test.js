var ModuleTestBinaryPacker0x0001 = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;

return new Test("BinaryPacker0x0001", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true, // test the primary module and secondary module
    }).add([
        testBinaryPacker0x0001,
    ]).run().clone();

function testBinaryPacker0x0001(test, pass, miss) {

    var formatID = 0x0001; // RECT
    var source = {
            x: 1, y: 2, w: 101, h: 102
        };

    var bp = new BinaryPacker();
    var packed = bp.pack(source, formatID);
    var result = bp.unpack(packed);

    if (source.x === result.x &&
        source.y === result.y &&
        source.w === result.w &&
        source.h === result.h) {

        test.done(pass());
    } else {
        test.done(miss());
        console.log("ERROR");
    }
}

})((this || 0).self || global);

