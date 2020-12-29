var users = require('./model');
// const router = require('./routes');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var fs = require('fs');
var path = require('path');

async function login(req,res){
    
    let email = req.body.email;
    let password = req.body.password;

    users.findOne({email: email}).select('+password').then((data)=>{
        data.comparePassword(password,(err,isMatch)=>{
           if (isMatch){ 
               jwt.sign({id:data._id,email:data.email},'SecretKey',((err,token)=>{
                   if(err){
                    throw new Error("Internal Server Error")
                   }
                   else{
                    res.status(200).json({
                        Message:"Logged In",
                        accesstoken:token,
                        match:1
                    })
                   }
               }))
            }else{
                res.status(401).json({Message:'Invalid Password',match:0});
            }
        })
    })
    .catch((err)=>{
        res.status(200).json({
            error:"Wrong Password or User Not Found",
            match:0
        })
    })
};

async function register(req,res) {
    var user = new users({
        firstName   : req.body.firstName,
        lastName    : req.body.lastName,
        phone       : req.body.phone,
        role        : req.body.role,
        email       : req.body.email,
        password    : req.body.password,
        address     : req.body.address,
        profile     : {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/*'
        },
        city        : req.body.city,
        state       : req.body.state,
        country     : req.body.country,
        zip         : req.body.zip
    });
    user.save().then(result => {
        res.status(200).json({message : "Inserted Successfully"});
    }).catch(err => {
        res.status(400).json(err);
    })
};

module.exports = {register,login}