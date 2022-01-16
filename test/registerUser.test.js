"use strict";

var expect = require('chai').expect;
var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();
const RegisterUser = require("../services/registerUser").RegisterUser


var UserMock = dbMock.define('user', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'test@example.com'
});

describe('Math', function() {
    describe('#abs()', function() {
        it('should return positive value of given negative number', function() {
            expect(Math.abs(-5)).to.be.equal(5);
        });
    });
});
describe('test service', function() {
    describe('series of test', function() {
        it.only('returns a value', async function() {
            var email = "mytestemail@gmail.com"
            var password = "password1"
            var result = await RegisterUser.run({email, password});
            var myuser = await UserMock.findOne({
                                    where: {
                                        firstName: 'Jane'
                                            }
                                        });

            expect(result.error).to.be.equal(undefined);
            expect(result.token).to.not.equal(null);
        });                                
    });
});