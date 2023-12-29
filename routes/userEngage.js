const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Post = require("../models/post");
const Email = require("../models/mail");
const multer = require("../controllers/multer");
const moment = require("moment");
const router = express.Router();

router.post('/:id/green', async(req,res)=>{
    let newValue = await Post.findOneAndUpdate({_id: req.params.id}, {$inc: {likeCount:1}}, {new:true})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

router.post('/:id/red', async(req,res)=>{
    let newValue = await Post.findOneAndUpdate({_id: req.params.id}, {$inc: {dislikeCount:1}}, {new:true})
    let origin = await Post.findOne({_id: req.params.id})
    res.redirect('back')
})

router.post('/reach', async(req,res)=>{
    let newMail = new Email({
        email:  req.body.subscriber
    })
    let existingMail = await Email.findOne({email: req.body.subscriber})
    if(existingMail){
        req.flash('error', 'Email Already Exists')
        res.redirect(req.headers.referer)
    } else {
        newMail.save().then(()=>{
            req.flash('success', 'Successfully Subscribed to our newsletter')
            res.redirect(req.headers.referer)
        }).catch(err=>{res.redirect(req.headers.referer)})
    }
})

module.exports = router;