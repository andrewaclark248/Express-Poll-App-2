const models = require("../models");
const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

//register user
async function register( username, password ) {
    var user = null;
    try {
        user = await models.User.create({ userName: username, password: password });
    } catch(e) {
        debugger
    }
    const token = jwt.sign(user.toJSON(), KEY, { expiresIn: "1h" });
    return token;
}


module.exports = {
    register
};
