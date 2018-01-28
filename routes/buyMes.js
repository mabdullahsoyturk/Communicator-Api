var express = require('express');
var Router  = express.Router({mergeParams:true});
var BuyMe = require('../models/buyme');
var House = require('../models/house');

//Routes for users

Router.get('/', function (req,res) {
    House.findOne({_id:req.params.hid}).populate("buyMes").exec(function (err,foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            res.json({success:true, message:"You got them all tiger", data:foundHouse.buyMes});
        }
    });
});

Router.delete('/', function (req,res) {;
   BuyMe.remove({house_id:req.params.hid}, function (err, numberOfDeleted) {
       if(err){
           res.json({success:false, message:"Buy Mes couldn't be deleted"});
       }else{
           res.json({success:true, message:"Successfully deleted"});
       }
   }) ;
});

Router.get('/:bmid', function (req,res) {
    BuyMe.findOne({id:req.params.bmid}, function (err, foundBuyMe) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            res.json({success:true, data:foundBuyMe});
        }
    })
});

Router.delete('/:bmid', function (req,res) {
    BuyMe.remove({id: req.params.bmid}, function (err, buyMe) {
       if(err){
           res.json({success:false, message: "Buy me couldn't be deleted"});
       }else{
           res.json({success: true, message: "Buy me successfully deleted"});
       }
    });
});

Router.post("/", function (req,res) {
    House.findOne({
        _id:req.params.hid
    },function (err, foundHouse) {
        if(err){
            res.json({success:false, message:"The user couldn't be found"});
        }else{
            var buyMe = new BuyMe({
                name: req.body.name,
                description: req.body.description,
                facebook_id: req.body.facebook_id,
                house_id:req.body.house_id,
                id: req.body.id,
                created_time: req.body.created_time
            });

            buyMe.save(function (err) {
                if(err){
                    console.log(err);
                }
            });

            foundHouse.buyMes.push(buyMe);
            foundHouse.save();

            res.json({success:true, message:"BuyMe has been added"});
        }
    });
});

module.exports = Router;