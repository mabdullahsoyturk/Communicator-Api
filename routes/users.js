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
           foundUser.house_id_server = req.body.house_id_server;
           console.log(req.body.house_id_server);
           foundUser.save();
           res.json({success:true, message:"The user updated"});
       }
    });
});

Router.put('/:fid/payment', function (req,res) {
    User.findOne({facebook_id:req.body.facebook_id}, function (err,foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found!"});
        } else{
            console.log(foundUser);
            foundUser.balance = foundUser.balance + req.body.how_much;
            foundUser.save();
        }
    });

    User.findOne({facebook_id: req.body.to}, function (err, userToPay) {
       if(err){
           res.json({success:false, message:"The user couldn't be found!"});
       }else{
           console.log(userToPay);
           userToPay.balance = userToPay.balance - req.body.how_much;
           userToPay.save();
       }
    });

    res.json({success:true, message:"The payment has been made"});
});

module.exports = Router;