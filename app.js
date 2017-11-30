var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    users      = require('./routes/users'),
    houses     = require('./routes/houses'),
    spendings  = require('./routes/spendings'),
    buy_mes    = require('./routes/buy_mes'),
    members    = require('./routes/members'),
    signup     = require('./routes/signup');

mongoose.connect("mongodb://localhost/houseassistant");
//mongoose.connect('mongodb://muhammet:123@ds121716.mlab.com:21716/communicator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req,res) {

    let transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: "muhammetsoyturk@hotmail.com", // generated ethereal user
            pass: "Hotmail271484060."  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'muhammetsoyturk@hotmail.com', // sender address
        to: 'muhammetabdullahsoyturk@gmail.com', // list of receivers
        subject: 'Communicator Confirmation Mail', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
});

   res.send("Works");
});

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
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});