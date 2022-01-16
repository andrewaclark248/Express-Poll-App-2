const Interactor = require('interactor');
const models = require("../models");


class CreatePoll extends Interactor {
    static async run(context) {
        if (context.pollName.length == 0){
            context.error = "You must prorivde a poll name."
        }
        if (context.userNames[0] == undefined || context.userNames.length == 0){
            context.error = "You must provide a user."
        }
        if (context.questions[0].length == 0 || context.questions.length == 0){
            context.error = "You must provide a question."
        }        
        if (context.error)
        {
            return {error: context.error}
        }
        debugger
        //create poll record
        var adminPoll = await models.Poll.create({ name: context.pollName, 
                                                    userId: context.currentUserId});

        //create poll run
        var pollRun = await adminPoll.createPollRun({ userId: adminPoll.userId });
        
        //create each UserPoll
        for(var userName of context.userNames) {
            var user = await models.User.findOne({ where: { userName: userName } });
            var userPoll = await pollRun.createUserPoll({userId: user.id, status: models.UserPoll.NOT_STARTED})
            
            for(var question of context.questions){
            await userPoll.createQuestion({name: question})
            }
        
        
        }
        return {error: context.error}

    }

 
 
    async rollback() {
        // rollback in case of an error thrown in run()
    }
}

module.exports = { CreatePoll }

