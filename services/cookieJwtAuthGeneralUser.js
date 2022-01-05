const jwt = require("jsonwebtoken");
const KEY = "mysomethingkey"

exports.cookieJwtAuthGeneralUser = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    if (user.role != "Admin")
    {
      res.locals.isAdmin = false}
    else
    {
      res.locals.isAdmin = true
    }
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};