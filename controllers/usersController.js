const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')

router.get('/', cookieJwtAuthAdmin, index)

module.exports = router;

function index (req, resp) {
    return resp.redirect("users");

}