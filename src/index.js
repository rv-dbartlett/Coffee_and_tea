const express = require('express')
const app = express()
const port = 3000
const helloWorld = require('./hello.js')

app.get('/',helloWorld.hello)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))