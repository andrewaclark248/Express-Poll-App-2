const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");

router.get('/', cookieJwtAuthAdmin, my_primary_method)

module.exports = router;

async function my_primary_method (req, resp) {
    var x = resp.locals.role;
    var users = await models.User.findAll();
    resp.render("users",  {users: users});
}

