var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');

Router.get("/",function (req,res) {
    House.findOne({id:req.params.hid}).populate("members").exec(function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            console.log(req.params.hid);
            res.json({success:true, message:"Here are the members", data:foundHouse.members});
        }
    })
});

Router.post("/", function (req,res) {
    User.findOne({
        facebook_id:req.params.fid
    },function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            House.findOne({
                id:req.params.hid
            }, function (err, foundHouse) {
                foundHouse.members.push(foundUser);
                foundHouse.save();
                foundUser.house_id = req.body.house_id;
                foundUser.houses.push(foundHouse);
                foundUser.save();
                res.json({success:true, message:"You have successfully added a house member"});
            });
        }
    });


});

Router.get("/:hid", function (req,res) {
    House.findOne({
        id:req.params.hid
    },function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The house couldn't be found"});
        }else{
            res.json(foundHouse);
        }
    });
});

Router.post("/:hid", function (req,res) {
    House.findOne({
        id:req.params.hid
    },function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The house couldn't be found"});
        }else{
            User.findOne({
                facebook_id:req.query.member
            },function (err, foundUser) {
                foundHouse.members.push(foundUser);
                foundHouse.save();
                console.log(foundHouse);
                foundUser.houses.push(foundHouse);
                foundUser.save();
                console.log(foundUser);
                res.json({success:true, message:"The member has been added to the house"});
            });
        }
    });
});

module.exports = Router;