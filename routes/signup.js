var express = require('express');
var app = express();
var User = require('../models/user');

app.post("/", function (req,res) {
    User.findOne({facebook_id:req.body.facebook_id}, function (err,user) { //look if mail exists
        if(err){
            res.json({success:false, message:"The user couldn't be added"});
        }else if(user){
            res.json({success:false, message:"The user already exists.", data:user});
        }else{
            // create the User
            var newUser = new User({
                first_name:req.body.first_name,
                last_name :req.body.last_name,
                email     : req.body.email,
                balance: 0,
                facebook_id:req.body.facebook_id
            });

            newUser.save(function(err) {
                if (err){
                    res.json({success:false, message:"The user could not be saved"});
                } else{
                    res.json({success:true, message:"User saved successfully", data:newUser});
                }
            });
        }
    });
});

module.exports = app;