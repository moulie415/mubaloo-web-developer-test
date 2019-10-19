const express = require('express')
const os = require('os')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

// fetch get username from os info and send back
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

// log survey to console
app.post('/api/submitForm', req => console.log(req.body))

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`))
