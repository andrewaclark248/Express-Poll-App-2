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

    var userName = req.body.email
    var password = req.body.password

    const adminUser = await models.User.create({ userName: userName, password: password, role: "General", adminId: resp.locals.current_user.id});
  
    resp.redirect("/users");

}