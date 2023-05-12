const express = require('express')
const { createRME, getRME, getsRME, getCountRME, vertifikasiRME, getsRMEisPublic } = require('../resolver/rme')
const { verifyToken, isPublic, isHospital } = require('../middleware')
const router = express.Router();

router.post('/', isHospital, createRME)
router.get('/:random', verifyToken, getRME)
router.get('/', verifyToken, getsRME)
router.get('/count/all', isHospital, getCountRME)
router.get('/get/vertifikasi', isHospital, vertifikasiRME)
router.get('/public/get', isPublic, getsRMEisPublic)

module.exports = router