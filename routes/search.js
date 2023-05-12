const router = require('express').Router()
const cari = require('../controller/search')
const  verify = require('../middleware/verifyJwt')

router.get('/searchSurat/:npp' , verify ,async(req, res) => {
    cari.searchSurat(req, res)
})

module.exports = router;