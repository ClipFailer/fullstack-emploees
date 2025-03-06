const express = require('express')
const router = express.Router()
const { login, register, current } = require('../controllers/users')
const { auth } = require('../middlewares/auth')

/* /api/users/login */
router.post('/login', login)

/* /api/users/register */
router.post('/register', register)

// /api/users/current
router.use('/current', auth, current)

module.exports = router
