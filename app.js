// NPM PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require('passport');
const async = require("async");
const path = require('path');
const methodOverride = require("method-override");
const app = express();

const date = require('./public/js/date');

const mongoose = require('./controllers/mongodb');
const auth = require('./controllers/passport');
const pages = require('./routes/joinedRoutes');
const upload_multer = require('./controllers/multer');
const engagement = require('./routes/userEngage');
const submit_post = require('./routes/submit');
const delete_post = require('./routes/deletePost');
const indexPage = require('./routes/indexPage');
const one_page = require('./routes/specific_post');

// PACKAGE INITIALIZATION

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(cookieParser('iamevil', {maxAge:60*1000*30}));
app.use(session({secret:"snowflake", resave:false, saveUninitialized:false}));
app.use(methodOverride("_method", {methods:["GET", "POST"]}))

app.use('/', auth);
app.use('/', pages);
app.use('/', engagement);
app.use('/', submit_post);
app.use('/', delete_post);
app.use('/', one_page);

app.get('/', (req,res)=>{
    res.render('website/home')
})
a
app.listen(3000, function() {
    console.log("Server started on port 3000");
});

