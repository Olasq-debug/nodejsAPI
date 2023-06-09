const express = require('express')
const router = express.Router()
const path = require('path')


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    res.status(301).sendFile(path.join(__dirname, '..', 'views', 'old-page.html'))
})

router.get('/404(.hmtl)?', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
})


module.exports = router