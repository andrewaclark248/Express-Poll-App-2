const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");
const { Op } = require("sequelize");


router.get('/manage', cookieJwtAuthAdmin, index)
router.get('/show', cookieJwtAuthAdmin, show)
router.get('/poll_run', cookieJwtAuthAdmin, view_poll_run)

module.exports = router;

//list all polls for admin
async function index (req, resp) {
    
    const polls = await models.Polls.findAll({
        where: {
            user_id: resp.locals.current_user.id
        }
      });
    //var polls = await models.Polls.findAll({ where: { user_id: resp.locals.current_user.id } });
    
    resp.render("polls/manage",  {polls: polls});
}

//list all polls run (find by original_poll_id)
async function show (req, resp) {
    var poll_id = req.body.poll_id
    //(original_poll_id: poll_id, user_id: resp.locals.current_user.id)
    const poll_runs = await models.Polls.findAll({
        where: {
            original_poll_id: poll_id || null,
            user_id: resp.locals.current_user.id
        }
      });
    
    var poll_name = poll_runs[0].name
    resp.render("polls/poll_runs", {poll_runs: poll_runs, poll_name: poll_name});
}

async function view_poll_run (req, resp) {

    resp.render("polls/poll_run");
}
