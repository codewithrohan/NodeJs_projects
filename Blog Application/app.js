require("dotenv").config();       // This will load environment variables from .env file

const path = require("path");
const express = require('express')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')


// Importing routes and middleware
const userRoute = require('./routes/user_route')
const blogRoute = require('./routes/blog_route')


const { checkForAuthenticationCookie, } = require('./middlewares/auth_middleware')

const app = express()
const PORT = process.env.PORT || 8000

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"));


// Configuring the express app
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))


// Route for the home page
app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  })
})

//This are prefix for user and blog
app.use('/user', userRoute)
app.use('/blog', blogRoute)


//starting the server
app.listen(PORT, () => console.log(`Server started at ..${PORT}`))

