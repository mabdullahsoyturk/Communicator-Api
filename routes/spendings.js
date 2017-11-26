var express = require('express');
var Router  = express.Router({mergeParams:true});
var User = require('../models/user');
var House = require('../models/house');
var Spending = require('../models/spending');

Router.get("/", function (req,res) {

    var limit = req.query.limit;

    if(limit == 7){
        var d = new Date();
        d.setHours(d.getHours() - 168);
        Spending.find({created_time: {$gte: d}}, function (err, items) {
            if(err){
                console.log(err);
            }
            else{
                console.log(items);
                res.json(items);
            }
        });
    }else if(limit == 30){
        var d = new Date();
        d.setHours(d.getHours() - 720);
        Spending.find({created_time: {$gte: d}}, function (err, items) {
            if(err){
                console.log(err);
            }
            else{
                console.log(items);
                res.json(items);
            }
        });
    }else if(limit == 365){
        var d = new Date();
        d.setHours(d.getHours() - 8760);
        Spending.find({created_time: {$gte: d}}, function (err, items) {
            if(err){
                console.log(err);
            }
            else{
                console.log(items);
                res.json(items);
            }
        });
    }

    else{
        House.findById({_id:req.params.hid}).populate("spendings").exec(function (err,foundHouse) {
            if(err){
                res.json({success:false, message:"The user couldn't be found"});
            }else{
                res.json(foundHouse.spendings);
            }
        });
    }
});

Router.post("/", function (req,res) {
    User.findOne({
        _id:req.params.uid
    },function (err, foundUser) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{

            var temp = req.body.cost;
            console.log(temp);
            var cost = parseFloat(temp);
            console.log(temp);

            var spending = new Spending({
                name: req.body.name,
                description: req.body.description,
                cost: cost
            });

            console.log(spending.created_time.getTime());
            spending.created_time.setHours(spending.created_time.getHours() - 175);

            spending.save(function (err) {
                if(err){
                    console.log(err);
                }
            });

            foundUser.spendings.push(spending);
            foundUser.save();

            House.findOne({
                _id:req.params.hid
            }, function (err, foundHouse) {
                if(err){
                    res.json({success:false, message:"The house couldn't be found"});
                }else{
                    foundHouse.spendings.push(spending);
                    foundHouse.save();
                }
            });

            res.json({success:true, message:"Spending has been added"});
        }
    })
});

Router.get("/:sid", function (req,res) {
    Spending.findOne({
       _id:req.params.sid
    },function (err, foundSpending) {
        if(err){
            res.json({success:false, message:"Spending couldn't be found"});
        }else{
            res.json({success:true, data:foundSpending});
        }
    });
});

module.exports = Router;