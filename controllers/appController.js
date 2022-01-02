const express = require('express');
const router = express.Router();
router.get('/', index);     // public route
module.exports = router;

// Index page controller
function index (req, resp) {
    resp.render('index');
};

