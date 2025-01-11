import app from './express'

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Starting server on http://localhost:${port}`)
})
