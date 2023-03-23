const express = require('express')
const router = express.Router()
const userAuthController = require('../../controller/userAuthController')

router.post('/', userAuthController.registerHandler)

module.exports = router