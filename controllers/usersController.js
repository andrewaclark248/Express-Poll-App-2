const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')

router.get('/', cookieJwtAuthAdmin, my_primary_method)

module.exports = router;

function my_primary_method (req, resp) {
    resp.render("users");

}