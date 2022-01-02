const express = require('express');
const router = express.Router();
const loginService = require('/Users/andrewclark/github/express-poll-app-2/services/loginService');
router.post('/register', register_post)
module.exports = router;

function register_post (req, resp) {
  var result = loginService.register(req.body.email, req.body.password)
  //debugger
  var req =req.body
  var x = 12;
    //var result = loginService.register(req.body)

    //result
      // is success then redirect to homepage
    //result no success
      //redirect to login page with error returned

    //resp.render('index');
};
/** 
function login_post (req, resp) {
  var result = loginService.authenticate(req.body)


  ///result... user exists
    //redirect to homeController/page
  //no user does not exist
    //redirect back to login page with error

}*/


