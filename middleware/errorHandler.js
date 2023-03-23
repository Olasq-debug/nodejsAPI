const { logEvents } = require('./logsEvents')

const errorHandler = ((err, req, res, next) => {
    console.log(err.stack)
    logEvents(`${err.name}\t${err.message}\n`, 'errorLog.txt')
    next()
})

module.exports = errorHandler