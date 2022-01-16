const express = require('express')
const path = require('path')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const flash = require('connect-flash');



const homeRoutes = require('../routes/homeRoutes')
var exphbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const partialsPath = path.join(__dirname, '../views/partials')
const app = express()
//const { cookieJwtAuth } = require('../services/cookieJwtAuthAdmin')

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

app.use(flash());



//add cookie to http request
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(cookieParser());

//process post request
app.use(express.json());


//css and images
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/public/javascript"))


//imports bootstrap libary into app
app.use('/css', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/css"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/js"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/jquery/dist"))

//set default layout
var hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    });

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs2.engine);
app.set('view engine', 'handlebars');

var appRoutes = require('../controllers/appController')
var loginRoutes = require('../controllers/loginController')
var usersRoutes = require('../controllers/admin/usersController')
var adminUsersRoutes = require('../controllers/admin/adminUsersController')
var generalUsersRoutes = require('../controllers/admin/generalUsersController')
var pollsRoutes = require('../controllers/admin/pollsController')
//var managePollsRoutes = require('../controllers/managePollsController')
var myPollsRoutes = require('../controllers/general/myPollsController')


app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes) 
app.use('/adminUsers', adminUsersRoutes)
app.use('/generalUsers', generalUsersRoutes)
app.use('/polls', pollsRoutes)
//app.use('/polls', managePollsRoutes)
app.use('/mypolls', myPollsRoutes)

 

//listen on port 3000
app.listen(3000, () => {console.log("server is up on port 3000")})
