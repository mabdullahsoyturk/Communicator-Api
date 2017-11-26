var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');

Router.get("/",function (req,res) {
    House.findById({_id:req.params.hid}).populate("members").exec(function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            res.json(foundHouse.members);
        }
    })
});

Router.post("/", function (req,res) {
    User.findOne({
        _id:req.params.uid
    },function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{

            var house = new House({
                name: req.body.name
            });

            house.members.push(foundUser);

            house.save(function (err) {
                if(err){
                    console.log(err);
                }
            });

            foundUser.houses.push(house);
            foundUser.save();
            res.json({success:true, message:"You have successfully added a house"});
        }
    });


});

Router.get("/:hid", function (req,res) {
    House.findOne({
        _id:req.params.hid
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
        _id:req.params.hid
    },function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The house couldn't be found"});
        }else{
            User.findOne({
                _id:req.query.member
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