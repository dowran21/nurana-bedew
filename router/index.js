const express = require('express')
const router = new express.Router()
const AdminRouter = require('./AdminRouter.js')
const UserRouter = require('./UserRouter.js')

router.use('/admin', AdminRouter)
router.use('/user', UserRouter)

module.exports = router