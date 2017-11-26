var express = require('express');
var Router  = express.Router({mergeParams:true});
var Buy_Me = require('../models/buy_me');
var House = require('../models/house');

//Routes for users

Router.get('/', function (req,res) {
    House.findById({_id:req.params.hid}).populate("buy_mes").exec(function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            res.json(foundHouse.buy_mes);
        }
    });
});

Router.get('/:uid', function (req,res) {
    Buy_Me.findOne({_id:req.params.uid}, function (err, foundBuyMe) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            res.json({success:true, data:foundBuyMe});
        }
    })
});

Router.post("/", function (req,res) {
    House.findOne({
        _id:req.params.hid
    },function (err, foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            var buy_me = new Buy_Me({
                description: req.body.description,
                name: req.body.name
            });

            buy_me.save(function (err) {
                if(err){
                    console.log(err);
                }
            });

            foundHouse.buy_mes.push(buy_me);
            foundHouse.save();

            res.json({success:true, message:"Buy_Me has been added"});
        }
    });
});

Router.post('/delete_all', function (req,res) {
    House.findOne({
        _id:req.params.hid
    },function (err, foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{

            console.log("remove buy me");
            Buy_Me.remove({}, function (err) {
                console.log("removed");
            });

           res.json({success:true, message:"They couldn't be deleted"});
        }
    });
});

module.exports = Router;