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
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash')

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
})

global.loggedIn = null

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
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use("*", (req,res, next) => {
    loggedIn = req.session.userId 
    next()
})
app.use(flash())


app.get('/posts/new', authMiddleware, newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.post('/posts/seek', searchController)

app.use((req, res)=> res.render('notfound'))




app.listen(4000, () => {
    console.log('App is listening on port 4000')
})