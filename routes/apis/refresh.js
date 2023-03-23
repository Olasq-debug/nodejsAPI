const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controller/refreshTokenController')

router.get('/', refreshTokenController.refreshTokenHandler)

module.exports = router