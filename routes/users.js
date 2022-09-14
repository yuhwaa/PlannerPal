const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, usersController.getUsers)

module.exports = router