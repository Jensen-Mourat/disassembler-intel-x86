"use strict";
exports.__esModule = true;
var b = require("benny");
var mergeMap_1 = require("../src/helper/mergeMap");
var m1 = new Map().set('1', 'a');
var m2 = new Map().set('2', 'b');
var m3 = new Map().set('2', 'b');
var m4 = new Map().set('2', 'b');
b.suite('map merge', b.add('m2 ', function () {
    mergeMap_1.mergeMap(m1, m2, m3, m4);
}), b.add('m3', function () {
    mergeMap_1.mergeMapsMany(m1, m2, m3, m4);
}), b.cycle(), b.complete());
