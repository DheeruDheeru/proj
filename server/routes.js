var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'-'+ file.originalname);
    }
});

var upload = multer({ storage: storage });

var control = require('./controller');

router.post('/login',control.login);

router.post('/register',upload.single('profile'),control.register);

module.exports = router;