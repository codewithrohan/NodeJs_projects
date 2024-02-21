const { Router } = require('express')
const User = require('../models/model_users')       // Import the User model

const router = Router()

// Route for rendering the login form
router.get('/login', (req, res) => {
    return res.render('login')
})

// Route for rendering the signup form
router.get('/signup', (req, res) => {
    return res.render('signup')
})

// Route for handling login form submission
router.post('/login', async (req, res) => {

    const { email, password } = req.body
    try {
        
        // Call the matchPasswordAndGenerateToken method on the User model to authenticate user
        const token = await User.matchPasswordAndGenerateToken(email, password)

        // Set a cookie named 'token' with the generated token and redirect to home page
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        // If authentication fails, render the login page with an error message
        return res.render('login', {
            error: 'Incorrect Email or Password'
        })
    }
})

// Route for handling logout
router.get('/logout', (req, res) => {

    
    res.clearCookie('token').redirect('/')
})

// Route for handling signup form submission
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body
    await User.create({
        fullName,
        email,
        password,
    })
    return res.redirect('/')
})


module.exports = router


