const mongoose = require('mongoose')
const BlogPost = require('./models/blogPost')

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

BlogPost.create({
    title: "The mythbusters Guide to Saving money on Energy Bills", 
    body: "If you have been here a long time , you might remember when I went on ITV Tonight to dispense a masterclass in the saving money on energy bills. Energy-saving is one of my favorite money topics, because once ou get past the boring bullet point lists, a whole new words of thrifty nerdery opens up. You know thoses bullet point lists. you starts spotting then everytine at theis time of the year. They go like This:"
}, (error, blogspot) => {
    console.log(error, blogspot)
})

BlogPost.find({}, (error, blogspot) => {
    console.log(error, blogspot)
})