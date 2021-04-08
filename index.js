const PORT = process.env.PORT ?? 3000

import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Стартовая страница')
})


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
