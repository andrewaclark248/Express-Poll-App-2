const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
     res.send('hello express hahah')
})


app.listen(3000, () => {console.log("server is up on port 3000")})
//app.get('/admin/home')
//app.get('employee/home')