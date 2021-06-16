const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const app = new express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const BlogPost = require('./models/blogPost')

app.get('/', async (req, res) => {
   // res.render(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index', {blogposts: blogposts})
})

app.get('/about', (req, res) => {
   // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
}) 

app.get('/contact', (req, res) => {
   // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})
app.get('/post/:id', async (req, res) => {
   // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
   const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {blogpost})
})

app.get('/posts/new', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
     res.render('create')
 })

 app.post('/posts/store', async (req,res) => {
     await BlogPost.create(req.body, (error, blogpost) => {
        console.log(req.body)
         res.redirect('/')
     })
 })

 app.post('/posts/seek', async (req,res) => {
     const searchItem = req.body.body
     console.log(searchItem)
     const reg = new RegExp(searchItem, 'i')
     const blogposts = await BlogPost.find(
         {
         title: reg
     }, (error, blogposts) => {
         console.log(error, blogposts)
     })
     console.log(blogposts)
     res.render('index', {blogposts: blogposts})
})
 



app.listen(4000, () => {
    console.log('App is listening on port 4000')
})