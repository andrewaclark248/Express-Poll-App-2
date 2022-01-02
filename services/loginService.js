const models = require("../models");

//register
async function register( username, password ) {
    const jane = await models.User.create({ user_name: username, password_hash: password });
    console.log("Jane's auto-generated ID:", jane.id);
    
    //create users
    //check if user already exists?

    //yes
        //return error
    //no
        //add user to db
        //create JWT

}

/** 
//authenticate
function authenticate(user) {
    //check if user exists
    
    //yes user exist
        // then add JWT
        // add JWT through loginService
    //no user does not exist
        //return error
}

function authorize(user) {
    
}*/


module.exports = {
    register/**,
    authenticate,
    authorize */
};
