const express = require('express')
const path = require('path')
const homeRoutes = require('../routes/homeRoutes')
var exphbs = require('express-handlebars');
//const cookieParser = require("cookie-parser");
const partialsPath = path.join(__dirname, '../views/partials')
const app = express()

//add cookie to http request
//app.use(cookieParser());

//css and images
app.use(express.static(path.join(__dirname, '../public')))

//imports bootstrap libary into app
app.use('/css', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/css"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/js"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/jquery/dist"))

//set default layout
var hbs = exphbs.create({
    defaultLayout: 'main'//,
    //helpers      : helpers,
    //partialsDir: [
    //    'shared/templates/',
    //    'views/partials/'
    //    ]
    });

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
var routes2 = require('../controllers/appController')
app.use('/', routes2);


//listen on port 3000
app.listen(3000, () => {console.log("server is up on port 3000")})
