const express = require('express')
const { createRole, getsRole } = require('../resolver/role')
const router = express.Router()

router.post('/', createRole)
router.get('/', getsRole)

module.exports = router
