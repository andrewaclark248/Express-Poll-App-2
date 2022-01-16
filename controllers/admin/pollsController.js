const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../../services/cookieJwtAuthAdmin')
const models = require("../../models");
const { Op } = require("sequelize");
const { sequelize } = require('../../models') // import connection
const CreatePoll = require("../../services/createPoll").CreatePoll
const ResendPoll = require("../../services/resendPoll").ResendPoll


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
          adminId: resp.locals.current_user.id
        }
      });
    resp.render("polls/index", {users, users});
}

async function create_poll (req, resp) {
    var pollName = req.body.poll_name
    var userNames = [req.body.users_to_add].flat()
    var questions = [req.body.question].flat()
    var currentUserId = resp.locals.current_user.id

    var result = await CreatePoll.run({pollName, userNames, questions, currentUserId});
    if(result.error){
      return resp.render("home", { flashError: result.error});
    } else{
      return resp.render("home", { flashSucces: "You successfully created a poll."});
    }
}




//list all polls for admin user
async function list (req, resp) {
  var polls = await models.Poll.findAll({where: {userId: resp.locals.current_user.id}});
  
  resp.render("polls/manage",  {polls: polls});
}

async function show (req, resp) {
  var pollId = Number(req.params.id)

  //get original poll
  const pollRuns = await models.PollRun.findAll({
    where: {
      pollId: pollId
    }
  });

  var yes_count = 0
  var no_count = 0
  
  for(var pollRun of pollRuns) {
    var userPolls = await pollRun.getUserPolls()
    for(var userPoll of userPolls)
    {
      var questions = await userPoll.getQuestions()
      for(var question of questions)
      {
        question.answer ? yes_count++ : no_count++
      }
    }
  }

  var total = yes_count + no_count
  var percent_yes = (Math.floor((yes_count / total) * 100))
  var perecent_no = 100 - percent_yes

  resp.render("polls/poll_runs", {poll_runs: pollRuns, poll_id: pollId, percent_yes: percent_yes, perecent_no: perecent_no });
}

async function poll_run (req, resp) {
  var pollRunId = Number(req.params.id)
  var poll = await models.PollRun.findOne({ where: {id: pollRunId}})
  var userResponses =  await poll.getUserPolls({include: [{model: models.User}]})

  var page_label = "some label"
  resp.render("polls/poll_run", {userResponses: userResponses, page_label: page_label});
}

async function view_user_reponse (req, resp) {
  var userPollId = Number(req.params.id)
  var userPoll = await models.UserPoll.findOne({ where: {id: userPollId}})
  var questions = await userPoll.getQuestions()

  resp.render("polls/user_response", {questions: questions});
}


async function resend_poll (req, resp) {
  var pollId = Number(req.params.id)

  var result = await ResendPoll.run({pollId});
  if(result.error){
    return resp.render("home", { flashError: result.error});
  } else{
    return resp.render("home", { flashSucces: "You successfully resent a poll."});
  }

  resp.render("home");
}


function get_run_number(poll){

}