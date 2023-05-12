const router = require('express').Router()
const registerController  = require('../controller/register')

router.post('/register' , async(req, res) => {
    registerController.register(req, res)
})

module.exports = router;