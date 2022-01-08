const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");

router.get('/manage', cookieJwtAuthAdmin, index)

module.exports = router;

async function index (req, resp) {
    
    const polls = await models.Polls.findAll({
        where: {
            user_id: resp.locals.current_user.id
        }
      });
    debugger
    //var polls = await models.Polls.findAll({ where: { user_id: resp.locals.current_user.id } });
    
    resp.render("polls/manage",  {polls: polls});
}
