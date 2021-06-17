const path = require('path')
const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
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
}