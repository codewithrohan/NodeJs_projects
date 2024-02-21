const express=require('express')
const {HandleGenerateNewShortURL,HandelGetAnalytics}=require('../controllers/controller')
const router=express.Router()


router.post('/',HandleGenerateNewShortURL)
router.get('/analytics/:shortId',HandelGetAnalytics)

module.exports=router