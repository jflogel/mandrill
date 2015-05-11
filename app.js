var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser());
app.use(express.static("app"));

var transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  auth: {
    user: 'jason.flogel@gmail.com',
    pass: '6ukNEKG3pDObIATNZAvfxw'
  }
});

app.post('/api/sendEmail', function(req, res) {
  transporter.sendMail({
    from: 'fromjason.flogel@gmail.com',
    to: req.body.toAddress,
    subject: 'hello',
    text: 'hello world!',
    headers: [{
      key: "X-MC-Tags",
      value: "TAG1,TAG2"
    }, {
      key: "X-MC-Metadata",
      value: '{"id":1}'
    }]
  }, function(error, info) {
    console.log('error: ' + error);
    console.log('info.accepted: ' + info.accepted);
    console.log('info.rejected: ' + info.rejected);
    console.log('info.pending: ' + info.pending);
    console.log('info.response: ' + info.response);
  });
  res.sendStatus(200);
});

app.post('/api/webhook', function(req, res) {
  var mandrillEvents = JSON.parse(req.body.mandrill_events);
  for (var i = 0; i < mandrillEvents.length; i++) {
    io.emit('message', mandrillEvents[i])
  }
  res.sendStatus(200);
});

http.listen(3000, function() {
  console.log("NodeJS web server running on localhost:3000");
});
