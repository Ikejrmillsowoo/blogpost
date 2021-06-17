const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index', {blogposts})
}