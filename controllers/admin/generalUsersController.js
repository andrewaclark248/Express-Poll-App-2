const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../../services/cookieJwtAuthAdmin')
const models = require("../../models");

router.get('/', cookieJwtAuthAdmin, index)
router.post('/add', cookieJwtAuthAdmin, add)

module.exports = router;

async function index (req, resp) {
    resp.render("users/addGeneralUser");
}

async function add (req, resp) {

    var username = req.body.email
    var password = req.body.password
    var admin_id = resp.locals.current_user.id 

    const adminUser = await models.User.create({ user_name: username, password_hash: password, role: "General", admin_id: admin_id});
  
    resp.redirect("/users");

}