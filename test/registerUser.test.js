"use strict";

var expect = require('chai').expect;

describe('Math', function() {
    describe('#abs()', function() {
        it.only('should return positive value of given negative number', function() {
            expect(Math.abs(-5)).to.be.equal(6);
        });
    });
});