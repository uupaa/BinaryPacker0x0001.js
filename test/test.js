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
        testBinaryPacker0x0001_value,
        testBinaryPacker0x0001_isNumber,
        testBinaryPacker0x0001_isInteger,
    ]).run().clone();

function testBinaryPacker0x0001_value(test, pass, miss) {

    var result = new BinaryPacker0x0001(123.4).value();

    if (result === 123.4) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBinaryPacker0x0001_isNumber(test, pass, miss) {

    var result = [
            new BinaryPacker0x0001(123.4).isNumber(),  // true
            new BinaryPacker0x0001(123.0).isNumber()   // true
        ];

    if (!/false/.test(result.join())) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBinaryPacker0x0001_isInteger(test, pass, miss) {

    var result = [
           !new BinaryPacker0x0001(123.4).isInteger(), // !false -> true
            new BinaryPacker0x0001(123.0).isInteger()  // true
        ];

    if (!/false/.test(result.join())) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

})((this || 0).self || global);

