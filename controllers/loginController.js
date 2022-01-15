const express = require('express');
const router = express.Router();
const loginService = require('/Users/andrewclark/github/express-poll-app-2/services/loginService');
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"
const models = require("../models");


router.post('/register', register_post)
router.get('/register', register_get)
router.post('/', login_user)

module.exports = router;

function register_post (req, resp) {
  var result = loginService.register(req.body.email, req.body.password)
  const token = jwt.sign(user, KEY, { expiresIn: "1h" });
  resp.cookie("token", token);
  resp.redirect("home");
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


