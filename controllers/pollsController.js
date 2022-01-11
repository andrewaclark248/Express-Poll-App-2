const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");
const { Op } = require("sequelize");

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

    //create admin poll 
    const createAdminPoll = await models.Polls.create({ name: poll_name, user_id: resp.locals.current_user.id, run_number: 1 });
    
    for (const question of questions) { 
      const createUserPoll = await models.Questions.create({ question: question, polls_id: createAdminPoll.id, user_id:  resp.locals.current_user.id});
    }

    var userPolls = [];
    for (const user of users) { 
      var poll_user = await models.User.findOne({ where: { user_name: user } });
      const createUserPoll = await models.Polls.create({ name: poll_name, user_id: poll_user.id, original_poll_id: createAdminPoll.id, run_number: 1 });

      //create questions
      for (const question of questions) { 
        const saved_question = await models.Questions.create({ question: question, polls_id: createUserPoll.id, user_id:  poll_user.id });
      }
    }

    resp.render("home");

}




//list all polls for admin
async function list (req, resp) {
    
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

async function poll_run (req, resp) {
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
  
  var page_label = "Name: "+ userResponses[0].name +  ": Run #" + userResponses[0].run_number.toString()
  
  resp.render("polls/poll_run", {userResponses: userResponses, page_label: page_label});
}

async function view_user_reponse (req, resp) {
var user_poll_id = Number(req.params.id)
var poll_run = await models.Polls.findOne({ where: {id: user_poll_id}})
var questions = await models.Questions.findAll({ where: {polls_id: poll_run.id}})

resp.render("polls/user_response", {questions: questions});
}


async function resend_poll (req, resp) {
  //suppose to be original poll_id

  var original_poll = await models.Polls.findOne({where: {id:  Number(req.params.id)}})
  var questions = await models.Questions.findAll({where: {polls_id: original_poll.id}})
  
  var run_number = 1+original_poll.run_number

  const createAdminPoll = await models.Polls.create({ name: original_poll.name, user_id: resp.locals.current_user.id, run_number: run_number, original_poll_id: original_poll.id});

  for (const question of questions)
  {
    const createUserPoll = await models.Questions.create({ question: question.question, polls_id: createAdminPoll.id, user_id:  resp.locals.current_user.id});
  }

  var usersFromOriginalPoll = await models.Polls.findAll({
    where: {
      [Op.and]: [
        { original_poll_id: original_poll.id },
        { run_number: 1 }
      ]
    },
    include: models.User
  })

  for (const poll of usersFromOriginalPoll) { 
    const createUserPoll = await models.Polls.create({ name: poll.name, user_id: poll.user_id, original_poll_id: original_poll.id, run_number: createAdminPoll.run_number});

    //create questions
    for (const question of questions) { 
      const saved_question = await models.Questions.create({ question: question.question, polls_id: createUserPoll.id, user_id: poll.user_id });
    }

  }

  resp.render("home");
}

