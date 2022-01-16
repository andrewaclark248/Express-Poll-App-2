const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"
const models = require("../models");


exports.cookieJwtAuthGeneralUser = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    res.locals.current_user = user
    
    if (user.role != models.User.ADMIN_ROLE)
    {
      res.locals.isAdmin = false}
    else
    {
      res.locals.isAdmin = true
      res.locals.adminId = user.id

    }
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};