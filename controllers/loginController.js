const express = require('express');
const router = express.Router();
const loginService = require('/Users/andrewclark/github/express-poll-app-2/services/loginService');
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"
const models = require("../models");
const LoginService = require("/Users/andrewclark/github/express-poll-app-2/services/loginServiceFinal").LoginServiceFinal


router.post('/register', register_post)
router.get('/register', register_get)
router.post('/', login_user)

module.exports = router;

async function register_post (req, resp) {
  var email = req.body.email
  var password = req.body.password
  var result = await LoginService.run({email, password});
  
  resp.cookie("token", result.token);
  resp.render("home");
};

function register_get (req, resp) {
  resp.render("register")
}


async function login_user (req, resp ) {
  var userName = req.body.email
  var password = req.body.password

  var user = await models.User.findOne({ where: { userName: userName } });
  if (user){
    if(user.password == password)
    {
      const token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });
      resp.cookie("token", token);

      if (user.role == "Admin"){
        resp.locals.isAdmin = true
      }
      else{
        resp.locals.isAdmin = false
      }

      return resp.render("home");
    }

  }
  return resp.render("index", {layout: 'login_page' });

}


