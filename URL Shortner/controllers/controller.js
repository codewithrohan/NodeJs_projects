const shortid = require('shortid')
const URL=require('../models/model')

async function HandleGenerateNewShortURL(req,res)
{
    const body=req.body
    if(!body.url) {return res.status(400).json({msg:"bad request"})}

    const shortID=shortid()         // Generating a short ID for the URL

    // Create a new URL document in the database
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id              // Associating the URL with the user who created it
        
    })

    // Render the 'home' view with the generated short ID
    return res.render('home',{id:shortID})
    
}   

async function HandelGetAnalytics(req,res)
{
    const shortId=req.params.shortId

    // Finding the URL document in the database
    const result=await URL.findOne({shortId})
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics: result.visitHistory })               // array of visit history objects
}

module.exports={
    HandleGenerateNewShortURL,
    HandelGetAnalytics
}

