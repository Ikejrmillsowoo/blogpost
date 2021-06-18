const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const searchController = require('./controllers/search')
const validateMiddleware = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')


mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
})

const app = new express()

// const customMiddleWare = (req,res,next)=> {
//     console.log('Custom Middle Ware')
//     next()
// }

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(fileUpload())
// app.use(customMiddleWare)
app.use('/posts/store', validateMiddleware)



app.get('/', homeController)

app.get('/auth/register', newUserController)
app.get('/auth/login', loginController)
app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

 app.post('/posts/store', storePostController)
 app.post('/users/register', storeUserController)

 app.post('/posts/seek', searchController)
 app.post('/users/login', loginUserController)
 



app.listen(4000, () => {
    console.log('App is listening on port 4000')
})