#!/usr/bin/env node

var meow = require('meow');
var superTinyCompiler = require('../super-tiny-compiler');
var cli = meow();

console.log(superTinyCompiler.compiler(cli.input[0]));

