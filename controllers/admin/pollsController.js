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
          adminId: resp.locals.current_user.id
        }
      });
    resp.render("polls/index", {users, users});
}

async function create_poll (req, resp) {

    var pollName = req.body.poll_name
    var userNames = [req.body.users_to_add].flat()
    var questions = [req.body.question].flat()
    debugger


    //create transaction
    //create poll record
    var adminPoll = await models.Poll.create({ 
      name: pollName, 
      userId: resp.locals.current_user.id});

    //create poll run
    var pollRun = await adminPoll.createPollRun({ userId: adminPoll.userId });

    //create each UserPoll
    for(var userName of userNames) {
      var user = await models.User.findOne({ where: { userName: userName } });
      var userPoll = await pollRun.createUserPoll({userId: user.id})
      
      for(var question of questions){
        await userPoll.createQuestion({name: question})
      }
    }

    resp.render("home");
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

  resp.render("polls/poll_runs", {poll_runs: pollRuns, poll_id: pollId });
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
  var poll = await models.Poll.findOne({where: {id:  Number(req.params.id)}})

  //create PollRun
  var newPollRun = await poll.createPollRun()

  //Create UserPolls
  var allPollRuns = await poll.getPollRuns()
  var userPolls = await allPollRuns[0].getUserPolls()

  for(var userPoll of userPolls)
  {
    var user = await userPoll.getUser()
    debugger
    var newUserPoll = await newPollRun.createUserPoll({userId: user.id})
    var questions = await userPoll.getQuestions()
    for(var question of questions)
    {
      await newUserPoll.createQuestion({name: question.name})
    }
  }

  resp.render("home");
}


function get_run_number(poll){

}