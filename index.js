const PORT = process.env.PORT ?? 3000

const express = require('express')
const connectionDB = require('./src/modules/connectionDB')
const authRouter = require('./src/routes/authRouter')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/auth/', authRouter)


app.get('/', (req, res) => {
    res.send('Стартовая страница')
})


app.listen(PORT, async () => {
    await connectionDB.sync()
    console.log(`App listening at http://localhost:${PORT}`)
})
