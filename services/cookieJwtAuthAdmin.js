const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"
const models = require("../models");


exports.cookieJwtAuthAdmin = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    res.locals.current_user = user
    //debugger
    if (user.role != models.User.ADMIN_ROLE)
    {
      res.clearCookie("token");
      return res.redirect("/");    }
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

