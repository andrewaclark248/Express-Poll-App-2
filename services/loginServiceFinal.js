const Interactor = require('interactor');
const models = require("../models");

class LoginServiceFinal extends Interactor {
    static async run(context) {

    try{
        var user = await models.User.create({ userName: context.email, password: context.password });
    }catch(e){
        context.error = e
    }
    const token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });

    return {error: context.error, token: token}
  }
 
    async rollback() {
        // rollback in case of an error thrown in run()
    }
}

module.exports = { LoginServiceFinal }

