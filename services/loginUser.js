const Interactor = require('interactor');
const models = require("../models");
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

class LoginUser extends Interactor {
    static async run(context) {
    var token = null;
    try{
        var user = await models.User.findOne({ where: { userName: context.email } });
        
        if (user){
            if(user.password == context.password)
            {
                token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });
                context.isAdmin  = (user.role == "Admin") ? true : false;
            }

        } else
        {
            context.error = "User cannot be found"
        }


    }catch(e){
        context.error = e.message
    }

    return {error: context.error, token: token, isAdmin: context.isAdmin }
  }
 
    async rollback() {
        // rollback in case of an error thrown in run()
    }
}

module.exports = { LoginUser }

