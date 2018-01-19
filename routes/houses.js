var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');

Router.get("/",function (req,res) {
    User.findOne({facebook_id:req.params.fid}).populate("houses").exec(function (err,foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found!"});
        }else{
            console.log(foundUser);
            res.json({success:true, message:"Here is the house", data:foundUser.houses});
        }
    })
});

Router.post("/", function (req,res) {
    User.findOne({
        facebook_id:req.params.fid
    },function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found!!!"});
        }else{

            var house = new House({
                name: req.body.name,
                id  : req.body.id,
                facebook_id  : req.body.facebook_id,
                created_time : req.body.created_time
            });

            house.members.push(foundUser);

            house.save(function (err) {
                if(err){
                    console.log(err);
                }
            });

            foundUser.house_id = req.body.house_id;

            foundUser.houses.push(house);
            foundUser.save();
            res.json({success:true, message:"You have successfully added a house", data:house});
        }
    });


});

Router.get("/:hid", function (req,res) {
    House.findOne({
        id:req.params.hid,
        facebook_id: req.params.fid
    },function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The house couldn't be found"});
        }else{
            res.json({success:true, message: "The house was found", data: foundHouse});
        }
    });
});

Router.post("/:hid", function (req,res) {
    House.findOne({
        id:req.params.hid,
        facebook_id: req.params.fid
    },function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The house couldn't be found"});
        }else{
            User.findOne({
                facebook_id:req.body.facebook_id
            },function (err, foundUser) {
                foundHouse.members.push(foundUser);
                foundHouse.save();

                foundUser.houses.push(foundHouse);
                foundUser.save();

                res.json({success:true, message:"The member has been added to the house"});
            });
        }
    });
});

module.exports = Router;