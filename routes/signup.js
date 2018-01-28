var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');

Router.post("/check", function (req,res) {
    User.findOne({facebook_id:req.body.facebook_id}, function (err,user) {
       if(err){
           res.json({success:false, message:"Oopppsy. Error"});
       }else if(user){
           res.json({success:true, message:"Here is the user", data:user});
       }else{
           res.json({success:false, message:"The user is not exist"});
       }
   });
});

Router.post("/", function (req,res) {
    User.findOne({facebook_id:req.body.facebook_id}, function (err,user) { //look if mail exists
        if(err){
            res.json({success:false, message:"The user couldn't be added"});
        }else if(user){
            res.json({success:false, message:"The user already exists.", data:user});
        }else{
            // create the User
            var newUser = new User({
                first_name  : req.body.first_name,
                last_name   : req.body.last_name,
                balance     : 0,
                status      : 1,
                house_id    : req.body.house_id,
                photo_url   : req.body.photo_url,
                facebook_id : req.body.facebook_id,
                id          : req.body.id
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


module.exports = Router;