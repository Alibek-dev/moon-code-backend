const PORT = process.env.PORT ?? 3000

const express = require('express')
const connectionDB = require('./src/modules/connectionDB')
const authMiddleware = require('./src/middlewaree/authMiddleware')
const bodyParser = require("body-parser")
const cors = require('cors')

// routes
const tasksRouter = require('./src/routes/tasksRouter')
const authRouter = require('./src/routes/authRouter')
const usersRouter = require('./src/routes/usersRouter')
const testsRouter = require('./src/routes/testsRouter')
const parcelsRouter = require('./src/routes/parcelsRouter')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/auth/', authRouter)
app.use('/api/', authMiddleware, tasksRouter)
app.use('/api/', authMiddleware, usersRouter)
app.use('/api/task/', authMiddleware, testsRouter)
app.use('/api/', authMiddleware, parcelsRouter)

app.get('/', (req, res) => {
    res.send('Стартовая страница')
})


app.listen(PORT, async () => {
    await connectionDB.sync()
    console.log(`App listening at http://localhost:${PORT}`)
})
