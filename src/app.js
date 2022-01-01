const express = require('express')
const path = require('path')
const homeRoutes = require('../routes/homeRoutes')
var exphbs = require('express-handlebars');

const app = express()

const partialsPath = path.join(__dirname, '../views/partials')


app.use(express.static(path.join(__dirname, '../public')))
app.use('/css', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/css"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/bootstrap/dist/js"))
app.use('/js', express.static("/Users/andrewclark/github/express-poll-app-2/node_modules/jquery/dist"))

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
//app.set('view engine', 'hbs')
//hbs.registerPartials(partialsPath)
//app.engine('hbs', hbs({defaultLayout: 'main'}))


//use routes
app.use(homeRoutes)

//app.get('', (req, res) => {
//    res.render('index', {
//        title: 'This is a poll. Please advise'
//    })
//})



app.listen(3000, () => {console.log("server is up on port 3000")})
//app.get('/admin/home')
//app.get('employee/home')