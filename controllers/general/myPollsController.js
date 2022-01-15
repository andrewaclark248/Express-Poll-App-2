const express = require('express');
const router = express.Router();
const { cookieJwtAuthGeneralUser } = require('../../services/cookieJwtAuthGeneralUser')
const models = require("../../models");

router.get('/', cookieJwtAuthGeneralUser, index)
router.get('/edit/:id', cookieJwtAuthGeneralUser, edit)
router.post('/update', cookieJwtAuthGeneralUser, update)

module.exports = router;

async function index (req, resp) {

    var unansweredPolls = await models.UserPoll.findAll({
        where: {
            userId: resp.locals.current_user.id
        },
        include: {
            model: models.PollRun, // UserSurveys have many Answers
            include: {
              model: models.Poll // survey question definition
            }
          }
    });
    debugger
    resp.render("myPolls/index", {unanswered_polls: unansweredPolls});
}

async function edit (req, resp) {
    var userPollId = Number(req.params.id)
    var questions = await models.Question.findAll({
        where: {
            userPollId: userPollId
        }
    });

    resp.render("myPolls/edit", {questions: questions});
}


async function update (req, resp) {
    
    var answers = req.body//Object.keys(answers)
    
    for (var a of Object.keys(answers)) {
        var questionId = Number(a)
        var question = await models.Question.findOne({
            where: {
                id: questionId
            }
        });
        await question.update({ answer: JSON.parse(answers[a]) })
    }
    resp.render("home");
}



