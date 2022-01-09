const express = require('express');
const router = express.Router();
const { cookieJwtAuthAdmin } = require('../services/cookieJwtAuthAdmin')
const models = require("../models");

router.get('/', cookieJwtAuthAdmin, index)
router.post('/create', cookieJwtAuthAdmin, create)

module.exports = router;

async function index (req, resp) {
    //pass all admin users
    //users
    const users = await models.User.findAll({
        where: {
          admin_id: resp.locals.current_user.id
        }
      });
    resp.render("polls/index", {users, users});
}

async function create (req, resp) {

    var poll_name = req.body.poll_name
    var users = [req.body.users_to_add].flat()
    var questions = [req.body.question].flat()

    //create admin poll 
    const createAdminPoll = await models.Polls.create({ name: poll_name, user_id: resp.locals.current_user.id, run_number: 1 });
    
    for (const question of questions) { 
      const createUserPoll = await models.Questions.create({ question: question, polls_id: createAdminPoll.id });
    }

    var userPolls = [];
    for (const user of users) { 
      var poll_user = await models.User.findOne({ where: { user_name: user } });
      const createUserPoll = await models.Polls.create({ name: poll_name, user_id: poll_user.id, original_poll_id: createAdminPoll.id });

      //create questions
      for (const question of questions) { 
        const saved_question = await models.Questions.create({ question: question, polls_id: createUserPoll.id });
      }
    }

    resp.render("home");

}


