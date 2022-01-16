const express = require('express');
const router = express.Router();
const loginService = require('../services/loginUser');
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"
const models = require("../models");
const RegisterUser = require("../services/registerUser").RegisterUser
const LoginUser = require("../services/loginUser").LoginUser


router.post('/register', register_post)
router.get('/register', register_get)
router.post('/', login_user)

module.exports = router;

async function register_post (req, resp) {
  var email = req.body.email
  var password = req.body.password
  var result = await RegisterUser.run({email, password});
  if(result.error) {
    return resp.render('index', { flashSucces: result.error, layout: 'login_page' });
  }
  
  resp.cookie("token", result.token);
  resp.render("home");
};

function register_get (req, resp) {
  resp.render("register",{ layout: 'login_page' })
}


async function login_user (req, resp ) {
  var email = req.body.email
  var password = req.body.password
  var result = await LoginUser.run({email, password});
  if (result.error) {
    return resp.render("index", { flashSucces: result.error, layout: 'login_page' });
  }
  else
  {
    resp.locals.isAdmin = result.isAdmin
    resp.cookie("token", result.token);
    return resp.render("home", { flashSucces: "You successfully logged in"});
  }


}


