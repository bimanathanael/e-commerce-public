require('dotenv').config()
const express = require('express')
const mainRoute = require('./routes/mainRoute')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',mainRoute)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

module.exports = app
