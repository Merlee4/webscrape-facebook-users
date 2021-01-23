const express = require('express')
const axi = require('./axi')

const app = express()

app.get('/', (req, res) => {
     res.send('<h1>Working</h1>')

})

app.get('/a', (req, res) => {
     res.send('<h2>No</h2>')
})

const port = 9100

app.listen(port, () => console.log(`Listening on port ${port}`))