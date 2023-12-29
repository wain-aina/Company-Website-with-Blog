const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();

router.use('/uploads', express.static(path.join(__dirname + '/uploads')));

let storageA = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = {
    uploads: multer({storage:storageA}),
};