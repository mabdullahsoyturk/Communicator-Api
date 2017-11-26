var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    users      = require('./routes/users'),
    houses     = require('./routes/houses'),
    spendings  = require('./routes/spendings'),
    buy_mes    = require('./routes/buy_mes'),
    members    = require('./routes/members'),
    signup     = require('./routes/signup');
mongoose.connect('mongodb://localhost/houseassistant');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/signup", signup);  //Sign up route without middleware for token check since the user doesn't sign in yet.
/////////////////////////////////////////AUTH ROUTES////////////////////////////////////////////////////////////////////

var Router = express.Router();

Router.use("/users", users);
Router.use("/users/:uid/houses", houses);
Router.use("/users/:uid/houses/:hid/spendings", spendings);
Router.use("/users/:uid/houses/:hid/buy_mes", buy_mes);
Router.use("/users/:uid/houses/:hid/members", members);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api', Router);
app.listen(3000);