const express=require('express')
const router=express.Router()
const {HandleUserSignUp,HandleUserLogin}=require('../controllers/user_controller')
router.post('/',HandleUserSignUp)
router.post('/login',HandleUserLogin)
module.exports=router