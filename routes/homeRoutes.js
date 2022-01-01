const express = require('express')
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.index_page_get);

module.exports = router;

