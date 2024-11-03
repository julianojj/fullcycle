import ejs from 'ejs'
import express from 'express'
import mysql from 'mysql2'
import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'fullcycle' },
    transports: [ new winston.transports.Console ]
})

const app = express()
const port = process.env.PORT || 3000
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true
});

connection.connect()

app.get('/people', async (req, res) => {
    const people = await getUsers()
    const html = await render(people)
    res.send(html)
})

const getUsers = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM People', (err, results) => {
            if (err) {
                logger.error('Error getting people', { error: err })
                reject(err)
                return
            }
            logger.info('People retrieved successfully', { people: results.length })
            resolve(results)
        })
    })
}

const render = (people) => {
    return ejs.renderFile('./template.ejs', {
        people
    })
}

app.listen(port, () => {
    console.log(`Starting server on port ${port}`)
})
