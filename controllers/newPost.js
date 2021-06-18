module.exports = (req, res) => {
    if(req.session.userId){
        return res.render('Create')
    }
    res.redirect('/auth/login')
}