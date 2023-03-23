const path = require('path')
const fs = require('fs')
const fspromises = require('fs/promises')
const { format } = require('date-fns')
const { v4:uuid } = require('uuid')

const logEvents = async (message, logFile) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}`
    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fspromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fspromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)

    } catch (err) {
        console.log(err)
    }
}

const logger = ((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'eventLog.txt')
    next()
});





module.exports = { logEvents, logger }
