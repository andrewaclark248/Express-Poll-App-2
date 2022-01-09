const express = require('express');
const router = express.Router();
const { cookieJwtAuthGeneralUser } = require('../services/cookieJwtAuthGeneralUser')
const models = require("../models");

router.get('/', cookieJwtAuthGeneralUser, index)
router.get('/edit/:id', cookieJwtAuthGeneralUser, edit)
router.post('/update', cookieJwtAuthGeneralUser, update)

module.exports = router;

async function index (req, resp) {

    var unanswered_polls = await models.Polls.findAll({
        where: {
            user_id: resp.locals.current_user.id
        }
    });

    resp.render("myPolls/index", {unanswered_polls: unanswered_polls});
}

async function edit (req, resp) {
    var poll_id = Number(req.params.id)
    var questions = await models.Questions.findAll({
        where: {
            polls_id: poll_id
        }
    });

    resp.render("myPolls/edit", {questions: questions});
}


async function update (req, resp) {
    debugger
    var answers = req.body
    for (var a in answers) {
        var question_id = Number(a.slice(-2))
        var question = await models.Questions.findOne({
            where: {
                id: question_id
            }
        });
        //answers[a]
        //update answer
        debugger
    }
    resp.render("myPolls/edit");
}



