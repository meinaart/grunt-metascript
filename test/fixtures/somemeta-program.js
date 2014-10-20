MetaScript(1,0,0);
if (typeof WHAT === 'undefined') WHAT = false;
if (typeof VERSION === 'undefined') VERSION = '1.0.0';
  write('// Line expressions\n');
  write('\n');
if (WHAT) {
  write('console.log("WHAT\'s true");\n');
} else {
  write('console.log("WHAT\'s false");\n');
}
  write('\n');
  write('// Block expressions\n');
  write('\n');
if (WHAT)
  write('console.log("WHAT\'s true");\n');
else
  write('console.log("WHAT\'s false");\n');
  write('\n');
  write('console.log(');
if (WHAT) {
  write('"WHAT\'s true"+');
} else {
  write('"WHAT\'s false"+');
}
  write('"");\n');
  write('\n');
  write('// Snippets\n');
  write('\n');
  write('// before snippet\n');
//...
function bleh() {}
//.
  write('// after snippet\n');
  write('\n');
  write('// ?= expressions\n');
  write('\n');
  write('MyLibrary.VERSION = ');
write(JSON.stringify(VERSION));
  write(';\n');
  write('// or, alternatively, if VERSION is always string-safe:\n');
  write('MyLibrary.VERSION = "');
write(VERSION);
  write('";\n');
  write('// or, alternatively, if you don\'t mind a missing trailing semicolon:\n');
  write('MyLibrary.VERSION = ');
write(JSON.stringify(VERSION));
writeln();
  write('// or, alternatively, if you like it procedural:\n');
  write('MyLibrary.VERSION = ');
write(JSON.stringify(VERSION))
  write(';\n');
  write('// or, if you like it as a number even if you shouldn\'t:\n');
  write('MyLibrary.VERSION = ');
write(JSON.stringify(parseFloat(VERSION)));
  write(';\n');
  write('\n');
  write('// Utility functions using __\n');
  write('\n');
myIndent = function(s) {
    write(indent(s+'\n', __));
}
__='    ';
myIndent('hello("world");');
  write('\n');
  write('// Macros\n');
  write('\n');
__='';
ASSERT_OFFSET = function(varname) {
  write('    if (');
write(varname);
  write(' < 0 || ');
write(varname);
  write(' > this.capacity()) {\n');
  write('        throw(new RangeError("Illegal ');
write(varname);
  write('"));\n');
  write('    }\n');
}
  write('function writeInt8(value, offset) {\n');
  write('    // Here the macro is used:\n');
__='    ';
ASSERT_OFFSET('offset');
  write('    // ...\n');
  write('}\n');
  write('      \n');
  write('// Indentation, includes and variable visibility\n');
  write('\n');
  write('// This will be indented (it\'s a ?= expression):\n');
  write('    ');
write('var i=0;');
writeln();
  write('// Just like this (it uses manual indentation):\n');
write(indent('var j=0;\n', 4));
  write('// Or this (it prepends __):\n');
write(__+'var k=0;\n');
  write('// But this will not:\n');
write('var k=0;\n');
  write('// Got it?\n');
  write('\n');
__='';
YEP = true;
var NOPE = false;
  write('// var NOPE = ');
write(NOPE);
writeln();
  write('// This will be indented:\n');
__='    ';
if (YEP) include("someinclude.js")
  write('    // indented once\n');
  write('// not indented\n');
  write('\n');
  write('// snip-snap\n');
  write('\n');
__='';
snip();
  write('console.log("snippet");\n');
var snippet = snap();
write(snippet + snippet);
writeln();
  write('    \n');
  write('// Before end\n');
