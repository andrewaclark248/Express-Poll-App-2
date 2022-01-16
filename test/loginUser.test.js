"use strict";

var expect = require('chai').expect;
var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();
const LoginUser = require("../services/loginUser").LoginUser
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"


describe('success', function() {
    it('successfully returns a token', async function() {
        var email = "adminuser@gmail.com"
        var password = "Password1"
        var result = await LoginUser.run({email, password});
        
        expect(result.error).to.be.equal(undefined);
        expect(result.token).to.not.equal(null);
    });
    it('verifies token', async function() {
        var email = "adminuser@gmail.com"
        var password = "Password1"
        var result = await LoginUser.run({email, password});

        var user = jwt.verify(result.token, KEY);
        var verified_email = user.userName
        
        expect(result.token).to.not.equal(null);
        expect(verified_email).to.be.equal(email);

    }); 
                              
});
describe('fails', function() {
    it('blank email', async function() {
        var email = ""
        var password = "password1"
        var result = await LoginUser.run({email, password});

        expect(result.error).to.be.equal("Please provide a valid email");
    });
    it('blank passowrd', async function() {
        var email = "mytestemail@gmail.com"
        var password = ""
        var result = await LoginUser.run({email, password});

        expect(result.error).to.be.equal("Please provide a password");
    });
    it('invalid email', async function() {
        var email = "userdoesnotexist@gmail.com"
        var password = "password1"
        var result = await LoginUser.run({email, password});

        expect(result.error).to.be.equal("User cannot be found");
    });
           
                                         
});

