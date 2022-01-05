const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");

router.get('/', cookieJwtAuthAdmin, index)
router.post('/add', cookieJwtAuthAdmin, add)

module.exports = router;

async function index (req, resp) {
    resp.render("users/add");
}

async function add (req, resp) {

    var username = req.body.email
    var password = req.body.password

    const adminUser = await models.User.create({ user_name: username, password_hash: password, role: "Admin" });
  
    resp.redirect("/users");

}