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
    var users = req.body.users_to_add
    var questions = req.body.question

    //create admin poll 
    const createAdminPoll = await models.Polls.create({ name: poll_name, user_id: resp.locals.current_user.id });
    /****for (const questions in question) { 
      var user = await models.User.findOne({ where: { user_name: user } });
      const createUserPoll = await models.Questions.create({ question: poll_name, polls_id: createAdminPoll.id });
      userPolls.push(createUserPoll);
    }

    var userPolls = [];
    for (const users in user) { 
      var user = await models.User.findOne({ where: { user_name: user } });
      const createUserPoll = await models.Polls.create({ name: poll_name, user_id: user.id });

      //create questions
      for (const questions in question) { 
        const createUserPoll = await models.Questions.create({ question: poll_name, polls_id: createUserPoll.id });
      }
      userPolls.push(createUserPoll);
    }***/



    //create questions for each user


    //poll create originalpoll(original_poll_id: null, ) & create poll() for each user
    //questions
 

}