const express = require('express')
const { register, registerAdmin, login, loginAdmin, refreshToken, logout, getUser, updateUser, updatePassword, sendEmailVerification, confirmVerificationEmail, createActiveKey, checkActiveKey, deleteActiveKey } = require('../resolver/auth')
const { verifyToken, isAdmin } = require('../middleware')
const router = express.Router()

router.get('/user', verifyToken, getUser)
router.post('/register', register)
router.post('/hospital/register', registerAdmin)
router.post('/login', login)
router.post('/verif/email', sendEmailVerification)
router.post('/confirm/email', confirmVerificationEmail)
router.post('/admin/login', loginAdmin)
router.get('/token', refreshToken)
router.put('/user/update', verifyToken, updateUser)
router.put('/user/update/password', verifyToken, updatePassword)
router.delete('/logout', logout)

router.post('/key/create', createActiveKey)
router.post('/key/check', checkActiveKey)

module.exports = router