const jwt = require("jsonwebtoken");
//const { Model } = require("sequelize/dist");
const KEY = "mysomethingkey"


exports.cookieJwtAuthAdmin = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    res.locals.current_user = user

    if (user.role != "Admin")
    {
      res.locals.isAdmin = false
    }
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

