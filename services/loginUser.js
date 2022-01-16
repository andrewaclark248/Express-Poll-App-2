const Interactor = require('interactor');
const models = require("../models");
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

class LoginUser extends Interactor {
    static async run(context) {
    var token = null;

    if (context.email.length == 0){
        context.error = "Please provide a valid email"
    }
    if (context.password.length==0) {
        context.error = "Please provide a password"
    }
    
    if (context.error != null){
        return {error: context.error}
    }

    try{
        var user = await models.User.findOne({ where: { userName: context.email } });
        debugger
        if (user){
            if(user.password == context.password)
            {
                token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });
                context.isAdmin  = (user.role == models.User.ADMIN_ROLE) ? true : false;
                
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

