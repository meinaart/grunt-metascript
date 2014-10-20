// Line expressions

console.log("WHAT's true");

// Block expressions

console.log("WHAT's true");

console.log("WHAT's true"+"");

// Snippets

// before snippet
// after snippet

// ?= expressions

MyLibrary.VERSION = "1.0.0";
// or, alternatively, if VERSION is always string-safe:
MyLibrary.VERSION = "1.0.0";
// or, alternatively, if you don't mind a missing trailing semicolon:
MyLibrary.VERSION = "1.0.0"
// or, alternatively, if you like it procedural:
MyLibrary.VERSION = "1.0.0";
// or, if you like it as a number even if you shouldn't:
MyLibrary.VERSION = 1;

// Utility functions using __

    hello("world");

// Macros

function writeInt8(value, offset) {
    // Here the macro is used:
    if (offset < 0 || offset > this.capacity()) {
        throw(new RangeError("Illegal offset"));
    }
    // ...
}

// Indentation, includes and variable visibility

// This will be indented (it's a ?= expression):
    var i=0;
// Just like this (it uses manual indentation):
    var j=0;
// Or this (it prepends __):
    var k=0;
// But this will not:
var k=0;
// Got it?

// var NOPE = false
// This will be indented:
    console.log("included");

    // This will be indented once more:
        console.log("also included");

    // This should say 'undefined' as NOPE is not visible in other files:
    // undefined

    // This should say 'undefined' as filename is not visible in __runProgram:
    // undefined

    // indented once
// not indented

// snip-snap

console.log("snippet");
console.log("snippet");


// Before end
