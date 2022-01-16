const express = require('express')
const path = require('path')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var exphbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const app = express()

//helper method
const hbs2 = exphbs.create({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    if_eq: function(a, b, opts) {
      if(a == b) // Or === depending on your needs
        return opts.fn(this);
      else
        return opts.inverse(this);
    }
  }
});


//add cookie to http request
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(cookieParser());

//process post request
app.use(express.json());

//set default layout
var hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    });

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs2.engine);
app.set('view engine', 'handlebars');

//add routes
var appRoutes = require('../controllers/appController')
var loginRoutes = require('../controllers/loginController')
var usersRoutes = require('../controllers/admin/usersController')
var adminUsersRoutes = require('../controllers/admin/adminUsersController')
var generalUsersRoutes = require('../controllers/admin/generalUsersController')
var pollsRoutes = require('../controllers/admin/pollsController')
var myPollsRoutes = require('../controllers/general/myPollsController')

app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes) 
app.use('/adminUsers', adminUsersRoutes)
app.use('/generalUsers', generalUsersRoutes)
app.use('/polls', pollsRoutes)
app.use('/mypolls', myPollsRoutes)

//listen on port 3000
app.listen(3000, () => {console.log("server is up on port 3000")})
