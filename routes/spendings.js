var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');
var Spending = require('../models/spending');

Router.get("/", function (req,res) {
        House.findOne({_id:req.params.hid}).populate("spendings").exec(function (err,foundHouse) {
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
                facebook_ids: req.body.facebook_ids,
                house_id: req.body.house_id,
                created_time: req.body.created_time
            });

            newSpending.save(function (err) {
                console.log(err);
            });

            var ids = req.body.facebook_ids;

            var index;
            for(index = 0; index < ids.length; index++){
                User.findOne({
                    facebook_id:ids[index]
                }, function (err, singleUser) {
                    if(err){
                        res.json({success:false, message:"No such member"});
                    }else{
                        singleUser.balance = singleUser.balance + (req.body.cost / ids.length);
                        singleUser.save();
                    }
                })
            }

            foundUser.spendings.push(newSpending);
            foundUser.save();

            House.findOne({
                _id:req.params.hid
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

Router.put("/:sid", function (req,res) {
    Spending.findOne({id:req.params.sid}, function(err, foundSpending) {
        if(err){
            res.json({success:false, message: "Spending couldn't be deleted"});
        }else{
            var index;

            console.log(foundSpending);

            var ids = foundSpending.facebook_ids;

            for(index = 0; index < ids.length; index++){
                User.findOne({
                    facebook_id:ids[index]
                }, function (err, singleUser) {
                    singleUser.balance = singleUser.balance - (foundSpending.cost / ids.length);
                    singleUser.save();
                });
            }

            res.json({success:true, message:"Balances are updated"});
        }
    });

});

Router.delete('/:sid', function (req,res) {

    Spending.remove({id: req.params.sid}, function (err, foundSpending) {
        if(err){
            res.json({success:false, message: "Spending couldn't be deleted"});
        }else{
            res.json({success: true, message: "Spending successfully deleted"});
        }
    });

});

module.exports = Router;