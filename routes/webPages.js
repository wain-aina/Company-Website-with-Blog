const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Post = require('../models/post');
const path = require("path");

router.get('/:location', async(req,res)=>{
    switch(req.params.location){
        case 'team':
            res.render('website/team', {alerts: req.flash()});
            break;
        case 'blog':
            const itemsPerPage = 5;
            const totalCount = await Post.countDocuments();
            const totalPages = Math.ceil(totalCount / itemsPerPage);

            const currentPage = req.query.page || 1;
            const skipItems = (currentPage - 1) * itemsPerPage;

            let posts = await Post.find().skip(skipItems).limit(itemsPerPage).exec()
            let big5 = await Post.find().sort({day: 1}).limit(5)
            let gov = await Post.find({tags: {$in: "Governance"}})
            let training = await Post.find({tags: {$in: "Training"}})
            let datasci = await Post.find({tags: {$in: "Data Science"}})
            let bcom = await Post.find({tags: {$in: "Business & Finance"}})
            let proj = await Post.find({tags: {$in: "Project Management"}})
            let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
            res.render('website/blog', {
                totalPages, currentPage, big5:big5, alerts: req.flash(),
                topics:posts, count:posts.length,gov:gov.length,
                training:training.length, datasci:datasci.length,
                bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
            })
            break;
        case 'about':
            res.render('website/about', {alerts:req.flash()});
            break;
        case 'contact':
            res.render("website/contact", {alerts:req.flash()});
            break;
        case 'portfolio':
            res.render('website/portfolio', {alerts:req.flash()});
            break;
        case 'services':
            res.render('website/services', {alerts:req.flash()});
            break;
        case 'write':
            res.render('editorial/login');
            break;
    }
})

module.exports = router;