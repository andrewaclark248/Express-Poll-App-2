const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");
const { Op } = require("sequelize");


router.get('/manage', cookieJwtAuthAdmin, index)
router.get('/:id/show', cookieJwtAuthAdmin, show)
router.get('/poll_run/:id', cookieJwtAuthAdmin, view_poll_run)
router.get('/:id/resend_poll', cookieJwtAuthAdmin, resend_poll)

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
    var poll_id = Number(req.params.id)
    //get all poll runs for a poll


    //get original poll
    const original_poll = await models.Polls.findOne({
      where: {
          id: poll_id
      }
    });

    //get poll runs
    const poll_runs = await models.Polls.findAll({
      where: {
        [Op.and]: [
          {original_poll_id: poll_id},
          {user_id: resp.locals.current_user.id}
        ]
      }
    });
    poll_runs.push(original_poll)
    
    resp.render("polls/poll_runs", {poll_runs: poll_runs, poll_id: poll_id });
}

async function view_poll_run (req, resp) {
    var poll_id = Number(req.params.id)
    var poll_run = await models.Polls.findOne({ where: {id: poll_id}})
    //var userResponses = await models.Polls.findAll({original_poll_id: poll_run.id, run_number: poll_run.run_number, include: models.User})
    var userResponses = await models.Polls.findAll({
        [Op.and]: [
            { original_poll_id: poll_run.id },
            { run_number: Number(poll_run.run_number) }
          ],
        include: models.User
    })
    debugger
    var page_label = "Name: "+ userResponses[0].name +  ": Run #" + userResponses[0].run_number.toString()
    
    resp.render("polls/poll_run", {userResponses: userResponses, page_label: page_label});
}


async function resend_poll (req, resp) {
    //suppose to be original poll_id

    var original_poll = await models.Polls.findOne({id:  Number(req.params.id)})

    //get users for a pol
    var users_polls = await models.Polls.findOne({original_poll_id: original_poll.id})

    //create poll for each user

    //create questions for each user

    resp.render("home");
  }
  
  