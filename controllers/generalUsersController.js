const express = require('express');
const router = express.Router();
const { cookieJwtAuthGeneralUser } = require('../services/cookieJwtAuthGeneralUser')
const models = require("../models");

router.get('/', cookieJwtAuthGeneralUser, index)
router.post('/add', cookieJwtAuthGeneralUser, add)

module.exports = router;

async function index (req, resp) {
    resp.render("users/addGeneralUser");
}

async function add (req, resp) {

    var username = req.body.email
    var password = req.body.password

    const adminUser = await models.User.create({ user_name: username, password_hash: password, role: "General" });
  
    resp.redirect("/users");

}