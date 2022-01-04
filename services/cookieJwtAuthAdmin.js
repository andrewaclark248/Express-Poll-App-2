const jwt = require("jsonwebtoken");
//const { Model } = require("sequelize/dist");
const KEY = "mysomethingkey"


exports.cookieJwtAuthAdmin = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, KEY);
    if(user.role != "Admin") 
    {
      throw "expection"
      
    }
    next();

  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

