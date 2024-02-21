const express=require('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const {mongo_connect}=require('./connection')
const {checkForAuthentication,restrictTo}=require('./middlewares/auth_middleware')
const UrlRoute=require('./routers/router')
const UserRoute=require('./routers/user_router')
const StaticRoute=require('./routers/static_router')
const URL=require('./models/model')
const app=express()
const port=8003

// Connecting to MongoDB
mongo_connect('mongodb://127.0.0.1:27017/URL')
.then(()=>console.log("MongoDb connected..."))

// Configuring Express settings
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

//routes
app.use("/url",restrictTo(['NORMAL','ADMIN']),UrlRoute)
app.use('/user',UserRoute)
app.use('/',StaticRoute)


// Redirecting route for short URLs
app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId
    const entry=await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push:
                {
                    visitHistory: {timestamp:Date.now()}
                }
            }
        )
        if (!entry) {
            return res.status(404).send('URL not found');
        }  
    res.redirect(entry.redirectUrl)
})

//Starting the express server
app.listen(port,()=>console.log("server started.."))


