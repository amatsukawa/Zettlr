#!/usr/bin/env node

var pandoc = require('pandoc-filter');
var Formula = pandoc.Formula

const AsciiMathParser = require('./asciimath2tex.js')
const parser = new AsciiMathParser()


function action({t: type, c: value},format,meta) {
    if (type === 'Math' && value.length == 2) {
        switch(value[0]['t']) {
            case 'DisplayMath':
            case 'InlineMath':
                latex = value[1].replace(/`(.*?)`/g, function(match, capture) {
                    return parser.parse(capture)
                })
                return Formula(value[0], latex)
        }
    }
}

pandoc.stdio(action);
