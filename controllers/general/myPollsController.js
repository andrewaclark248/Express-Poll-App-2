const express = require('express');
const router = express.Router();
const { cookieJwtAuthGeneralUser } = require('../../services/cookieJwtAuthGeneralUser')
const models = require("../../models");

router.get('/', cookieJwtAuthGeneralUser, index)
router.get('/edit/:id', cookieJwtAuthGeneralUser, edit)
router.post('/update', cookieJwtAuthGeneralUser, update)
router.get('/update_poll_status/:id', cookieJwtAuthGeneralUser, update_poll_status)

module.exports = router;

async function index (req, resp) {

    var unansweredPolls = await models.UserPoll.findAll({
        where: {
            userId: resp.locals.current_user.id,
            status: models.UserPoll.NOT_STARTED
        },
        include: {
            model: models.PollRun, 
            include: {
              model: models.Poll
            }
          }
    });

    var inProgressPolls = await models.UserPoll.findAll({
        where: {
            userId: resp.locals.current_user.id,
            status: models.UserPoll.IN_PROGRESS
        },
        include: {
            model: models.PollRun, 
            include: {
              model: models.Poll 
            }
          }
    });
    
    var answeredPolls = await models.UserPoll.findAll({
        where: {
            userId: resp.locals.current_user.id,
            status: models.UserPoll.FINISHED
        },
        include: {
            model: models.PollRun,
            include: {
              model: models.Poll 
            }
          }
    });
    
    resp.render("myPolls/index", {unansweredPolls: unansweredPolls, inProgressPolls: inProgressPolls, answeredPolls: answeredPolls});
}

async function edit (req, resp) {
    var userPollId = Number(req.params.id)
    var questions = await models.Question.findAll({
        where: {
            userPollId: userPollId
        }
    });
    
    var userPoll = await questions[0].getUserPoll()

    var disableInput = (userPoll.status == models.UserPoll.FINISHED) ? true : false
    debugger
    resp.render("myPolls/edit", {questions: questions, userPollId: userPollId, disableInput: disableInput});
}


async function update (req, resp) {
    
    var userPollId = Number(req.body.userPollId)
    delete req.body["userPollId"];
    var answers = req.body
    
    for (var a of Object.keys(answers)) {
        var questionId = Number(a)
        var question = await models.Question.findOne({
            where: {
                id: questionId
            }
        });
        await question.update({ answer: JSON.parse(answers[a]) })
    }

    var userPoll = await models.UserPoll.findOne({where: {id: userPollId}})
    await userPoll.update({status: models.UserPoll.FINISHED})

    resp.render("home");
}

//ajax function
async function update_poll_status (req, resp) {
    var userPoll = await models.UserPoll.findOne({where: {id: Number(req.params.id)}})
    //debugger
    await userPoll.update({status: models.UserPoll.IN_PROGRESS})
    
}



