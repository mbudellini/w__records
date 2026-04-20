const router = require('express').Router()
     const controller = require('../controllers/discogsCollection_controller.js')

     router.get('/getCollection',controller.getCollection)

     module.exports = router