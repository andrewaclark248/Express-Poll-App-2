const Interactor = require('interactor');
const models = require("../models");


class ResendPoll extends Interactor {
    static async run(context) {
        if (context.pollId == null){
            context.error = "Sorry, an error occurred while resending the poll."
        }
        var poll = await models.Poll.findOne({where: {id:  context.pollId}})

        if (poll == null){
            context.error = "Sorry, an error occurred while resending the poll."
        }

        if (context.error){
            return {error: context.error}
        }
        
        //create PollRun
        var newPollRun = await poll.createPollRun()

        //Create UserPolls
        var allPollRuns = await poll.getPollRuns()
        var userPolls = await allPollRuns[0].getUserPolls()

        for(var userPoll of userPolls)
        {
            var user = await userPoll.getUser()
            
            var newUserPoll = await newPollRun.createUserPoll({userId: user.id, status: models.UserPoll.NOT_STARTED})
            var questions = await userPoll.getQuestions()
            for(var question of questions)
            {
            await newUserPoll.createQuestion({name: question.name})
            }
        }

        return {error: context.error}

    }

 
 
    async rollback() {
        // rollback in case of an error thrown in run()
    }
}

module.exports = { ResendPoll }

