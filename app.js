var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    users      = require('./routes/users'),
    houses     = require('./routes/houses'),
    spendings  = require('./routes/spendings'),
    buy_mes    = require('./routes/buyMes'),
    members    = require('./routes/members'),
    signup     = require('./routes/signup');

mongoose.connect("mongodb://localhost/yourdatabasename");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req,res) {
   res.send("Works");
});

app.use("/signup", signup);

var Router = express.Router();

Router.use("/users", users);
Router.use("/users/:fid/houses", houses);
Router.use("/users/:fid/houses/:hid/spendings", spendings);
Router.use("/users/:fid/houses/:hid/buy_mes", buy_mes);
Router.use("/users/:fid/houses/:hid/members", members);

app.use('/api', Router);
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});