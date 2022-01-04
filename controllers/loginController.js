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
  //debugger
  const token = jwt.sign(user, KEY, { expiresIn: "1h" });
  //process.env.MY_SECRET
  resp.cookie("token", token);
  resp.redirect("home");
    //var result = loginService.register(req.body)

    //result
      // is success then redirect to homepage
    //result no success
      //redirect to login page with error returned

    //resp.render('index');
};

function register_get (req, resp) {
  resp.render("register")

  ///result... user exists
    //redirect to homeController/page
  //no user does not exist
    //redirect back to login page with error

}/** */


async function login_user (req, resp ) {
  var username = req.body.email
  var password = req.body.password

  var user = await models.User.findOne({ where: { user_name: username } });
  var userAsJson = JSON.stringify(user)

  if (user)
  {

    if(user.password_hash == password)
    {

      const token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });

      resp.cookie("token", token);

      return resp.render("home");
    }

  }
  return resp.render("index", {layout: 'login_page' });

}


