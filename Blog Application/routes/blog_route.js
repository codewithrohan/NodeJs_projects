const { Router } = require('express')
const multer = require('multer')
const path = require('path')

const Blog = require('../models/blog')
const Comment = require('../models/comment')
const router = Router()

// Multer storage configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Destination folder for file uploads
        cb(null, path.resolve(`./public/uploads/`))  //seperate folder for each user
    },
    filename: function (req, file, cb) {

        // Generate a unique filename for the uploaded file
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

// Multer upload middleware
const upload = multer({ storage: storage })

// Route for adding a new blog post

router.get('/add-new', (req, res) => {
    return res.render('addblog', {
        user: req.user,
    })
})

// Route for viewing a specific blog post

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy')
    console.log('comments', comments)
    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    })
})

// Route for adding a comment to a blog post

router.post('/comment/:blogId', async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

// Route for creating a new blog post

router.post('/', upload.single('coverImage'), async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blog._id}`)
})


module.exports = router


