const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");
const { Op } = require("sequelize");


router.get('/manage', cookieJwtAuthAdmin, index)
router.get('/show', cookieJwtAuthAdmin, show)
router.get('/poll_run/:id', cookieJwtAuthAdmin, view_poll_run)

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
    var poll_id = req.params.id
    var poll_run = await models.Polls.findOne({id:  poll_id})
    //var userResponses = await models.Polls.findAll({original_poll_id: poll_run.id, run_number: poll_run.run_number, include: models.User})
    var userResponses = await models.Polls.findAll({
        [Op.and]: [
            { original_poll_id: poll_run.id },
            { run_number: poll_run.run_number }
          ],
        include: models.User
    })
    debugger
    var page_label = "Name: "+ userResponses[0].name +  ": Run #" + userResponses[0].run_number.toString()
    
    resp.render("polls/poll_run", {userResponses, userResponses, page_label: page_label});
}
