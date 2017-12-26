var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');

//Routes for users

Router.get('/', function (req,res) {
    User.find({}, function (err,users) {
        if(err){
            res.json({success:false, message:"Cannot reach to users"});
        }else{
            res.json({success:true, data:users});
        }
    })
});

Router.get('/:fid', function (req,res) {
    User.findOne({facebook_id:req.params.fid}, function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found!!!!!"});
        }else{
            res.json({success:true, data:foundUser});
        }
    })
});

Router.put('/:fid', function (req,res) {
    User.findOne({facebook_id:req.params.fid}, function (err,foundUser) {
       if(err){
           res.json({success:false, message:"The user couldn't be found!"});
       } else{
           foundUser.house_id = req.body.house_id;
           foundUser.save();
           res.json({success:true, message:"The user updated"});
       }
    });
});

module.exports = Router;