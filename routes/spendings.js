var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');
var Spending = require('../models/spending');

Router.get("/", function (req,res) {
        House.findOne({id:req.params.hid}).populate("spendings").exec(function (err,foundHouse) {
            if(err){
                res.json({success:false, message:"The user couldn't be found"});
            }else{
                res.json({success:true, message:"Here are your spendings", data:foundHouse.spendings});
            }
        });
});

Router.post("/", function (req,res) {
    User.findOne({
        facebook_id:req.params.fid
    },function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            var newSpending = new Spending({
                id  : req.body.id,
                name: req.body.name,
                cost: req.body.cost,
                facebook_id: req.body.facebook_id,
                house_id: req.body.house_id,
                created_time: req.body.created_time
            });

            newSpending.save(function (err) {
                console.log(err);
            });
            foundUser.spendings.push(newSpending);
            foundUser.balance = foundUser.balance + req.body.cost;
            foundUser.save();

            House.findOne({
                id:req.params.hid
            }, function (err, foundHouse) {
                if(err){
                    res.json({success:false, message:"The house couldn't be found"});
                }else{
                    foundHouse.spendings.push(newSpending);
                    foundHouse.save();
                }
            });

            res.json({success:true, message:"Spending has been added"});
        }
    })
});

Router.get("/:sid", function (req,res) {
    Spending.findOne({
       id:req.params.sid
    },function (err, foundSpending) {
        if(err){
            res.json({success:false, message:"Spending couldn't be found"});
        }else{
            res.json({success:true, data:foundSpending});
        }
    });
});

Router.delete('/:sid', function (req,res) {
    Spending.remove({id: req.params.sid}, function (err, spending) {
        if(err){
            res.json({success:false, message: "Spending couldn't be deleted"});
        }else{
            res.json({success: true, message: "Spending successfully deleted"});
        }
    });
});

module.exports = Router;