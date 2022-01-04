const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

exports.cookieJwtAuthGeneralUser = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    if (req.user == user)
    {next();}
    else{throw "error"}
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};