const Interactor = require('interactor');
const models = require("../models");


class CreatePoll extends Interactor {
    static async run(context) {
        if (context.pollName == null){
            context.error = "Could not find poll."
        }
        if (context.userNames == null){
            context.error = "You must provide a user."
        }
        if (context.questions == null){
            context.error = "You must provide a question."
        }        
        if (context.error)
        {
            return {error: context.error}
        }
        
        //create poll record
        var adminPoll = await models.Poll.create({ 
            name: context.pollName, 
            userId: context.currentUserId});

        //create poll run
        var pollRun = await adminPoll.createPollRun({ userId: adminPoll.userId });
        debugger
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

