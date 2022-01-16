const Interactor = require('interactor');
const models = require("../models");
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

class RegisterUser extends Interactor {
    static async run(context) {
    var token = null;
    try{
        var user = await models.User.create({ userName: context.email, password: context.password, role: models.User.GENERAL_ROLE });
        const token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });

    }catch(e){
        context.error = e.message
    }

    return {error: context.error, token: token}
  }
 
    async rollback() {
        // rollback in case of an error thrown in run()
    }
}

module.exports = { RegisterUser }

