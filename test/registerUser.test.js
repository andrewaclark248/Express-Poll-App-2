"use strict";

var expect = require('chai').expect;
var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();
const RegisterUser = require("../services/registerUser").RegisterUser
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

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
describe('success', function() {
    it('successfully returns a token', async function() {
        var email = "mytestemail@gmail.com"
        var password = "password1"
        var result = await RegisterUser.run({email, password});

        expect(result.error).to.be.equal(undefined);
        expect(result.token).to.not.equal(null);
    });
    it('verifies token', async function() {
        var email = "mytestemail@gmail.com"
        var password = "password1"
        var result = await RegisterUser.run({email, password});

        var user = jwt.verify(result.token, KEY);
        var verified_email = user.userName
        debugger
        expect(result.token).to.not.equal(null);
        expect(verified_email).to.be.equal(email);

    });                                
});
describe('fails', function() {
    it('blank email', async function() {
        var email = ""
        var password = "password1"
        var result = await RegisterUser.run({email, password});

        expect(result.error).to.be.equal("Please provide a valid email");
    });
    it('blank passowrd', async function() {
        var email = "mytestemail@gmail.com"
        var password = ""
        var result = await RegisterUser.run({email, password});

        expect(result.error).to.be.equal("Please provide a password");
    });
    it('invalid email', async function() {
        var email = "mytestemail"
        var password = "password1"
        var result = await RegisterUser.run({email, password});

        expect(result.error).to.be.equal("Validation error: Validation isEmail on userName failed");
    });
                                         
});



/***
 * 
 *         var myuser = await UserMock.findOne({
                                where: {
                                    firstName: 'Jane'
                                        }
                                    });
 */