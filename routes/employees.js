const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth')
const { all, add, remove, edit, employee } = require('../controllers/employees')

// /api/employees/:id
router.get('/:id', auth, employee)

// /api/employees/
router.get('/', auth, all)

// /api/employees/add
router.post('/add', auth, add)

// /api/employees/remove/:id
router.post('/remove/:id', auth, remove)

// /api/employees/edit/:id
router.put('/edit/:id', auth, edit)

module.exports = router
