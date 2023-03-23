const express = require('express')
const router = express.Router()
const userAuthoController = require('../../controller/userAuthoController')

router.post('/', userAuthoController.loginHandler)

module.exports = router