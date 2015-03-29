var jade = require("jade");

var jade_string = [
    "doctype html",
    "html",
    "    body",
    "        #foo  I am a foo div!"
].join("\n");

var fn = jade.compile(jade_string, { pretty: true });
console.log( fn() );
