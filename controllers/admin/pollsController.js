const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../../services/cookieJwtAuthAdmin')
const models = require("../../models");
const { Op } = require("sequelize");
const { sequelize } = require('../../models') // import connection


router.get('/', cookieJwtAuthAdmin, new_poll)
router.post('/create', cookieJwtAuthAdmin, create_poll)
router.get('/list', cookieJwtAuthAdmin, list)
router.get('/:id/show', cookieJwtAuthAdmin, show)
router.get('/poll_run/:id', cookieJwtAuthAdmin, poll_run)
router.get('/:id/resend_poll', cookieJwtAuthAdmin, resend_poll)
router.get('/user_response/:id', cookieJwtAuthAdmin, view_user_reponse)

module.exports = router;

async function new_poll (req, resp) {
    const users = await models.User.findAll({
        where: {
          admin_id: resp.locals.current_user.id
        }
      });
    resp.render("polls/index", {users, users});
}

async function create_poll (req, resp) {

    var poll_name = req.body.poll_name
    var users = [req.body.users_to_add].flat()
    var questions = [req.body.question].flat()


    const admin_poll = await models.Poll.create({ 
      name: poll_name, 
      user_id: resp.locals.current_user.id, 
      run_number: 1 });

    for (const question of questions) { 
      await admin_poll.createQuestion({name: question, user_id: admin_poll.user_id});
    }
    
    var userPolls = [];
    for (const user of users) { 
      var poll_user = await models.User.findOne({ where: { user_name: user } });
      const user_poll = await admin_poll.createUserPoll({ user_id: poll_user.id });

      for (const question of questions) { 
        await user_poll.createQuestion({name: question})
      }
    } 

    resp.render("home");
}




//list all polls for admin user
async function list (req, resp) {
  const polls = await models.Poll.findAll({
      where: {
          user_id: resp.locals.current_user.id,
          run_number: 1
      }
    });
  
  resp.render("polls/manage",  {polls: polls});
}

async function show (req, resp) {
  var poll_id = Number(req.params.id)

  //get original poll
  const original_poll = await models.Poll.findOne({
    where: {
        id: poll_id
    }
  });

  //get poll runs
  const poll_runs = await models.Poll.findAll({
    where: {
      original_poll_id: original_poll.id
    }
  });

  poll_runs.push(original_poll)
  resp.render("polls/poll_runs", {poll_runs: poll_runs, poll_id: poll_id });
}

async function poll_run (req, resp) {
  var poll_id = Number(req.params.id)
  var poll = await models.Poll.findOne({ where: {id: poll_id}})
  var user_responses =  await poll.getUserPolls({include: [{model: models.User}]})
  //var userResponses = await models.Polls.findAll({original_poll_id: poll_run.id, run_number: poll_run.run_number, include: models.User})
  debugger
  var page_label = "some label"
  resp.render("polls/poll_run", {userResponses: user_responses, page_label: page_label});
}

async function view_user_reponse (req, resp) {
  var poll_id = Number(req.params.id)
  var poll = await models.UserPoll.findOne({ where: {id: poll_id}})
  var questions = await poll.getQuestions()

  resp.render("polls/user_response", {questions: questions});
}


async function resend_poll (req, resp) {
  var poll = await models.Poll.findOne({where: {id:  Number(req.params.id)}})
  var questions = await models.Question.findAll({where: {poll_id: poll.id}})
  
  var run_number = 1+poll.run_number

  const admin_poll = await models.Poll.create({ 
    name: poll.name, 
    user_id: resp.locals.current_user.id, 
    run_number: run_number,
    original_poll_id: poll.id
   });

  for (const question of questions) { 
    await admin_poll.createQuestion({name: question.name, user_id: admin_poll.user_id});
  }
  
  var userPolls = await poll.getUserPolls({include: [{ model: models.User }]})//models.UserPoll.findAll({where: {poll_id: poll.id}, })
  
  for (const poll of userPolls) { 
    const user_poll = await admin_poll.createUserPoll({ user_id: poll.User.id });

    for (const question of questions) { 
      await user_poll.createQuestion({name: question.name})
    }
  } 

  resp.render("home");
}

