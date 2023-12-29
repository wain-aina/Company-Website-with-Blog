// NPM PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require('passport');
const async = require("async");
const methodOverride = require("method-override");
const path = require('path');
const moment = require('moment');
const flash = require('connect-flash');

const app = express();

const auth = require('./controllers/passport');
const mongoose = require('./controllers/mongodb');
const webPages = require('./routes/webPages');
const editor = require('./routes/editorPages');
const blogPages = require('./routes/blogPages');
const compose = require('./routes/composePost');
const engagement = require('./routes/userEngage');
const submission = require('./routes/submit');

// PACKAGE INITIALIZATION

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(cookieParser('iamevil', {maxAge:60*1000*30}));
app.use(session({secret:"snowflake", resave:false, saveUninitialized:false}));
app.use(methodOverride("_method", {methods:["GET", "POST"]}))
app.use(flash())
app.use(function(req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

app.use('/', auth);
app.use('/', editor);
app.use('/', webPages);
app.use('/', blogPages);
app.use('/', compose);
app.use('/', engagement);
app.use('/', submission);

app.get('/', (req,res)=>{
    res.render('website/home', {alerts:req.flash()})
})

app.post('/write', passport.authenticate('local', {failureRedirect:'/'}), (req,res)=>{
    res.redirect('/index')
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});