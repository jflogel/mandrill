var express = require('express');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var app = express();
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

var emailStatus = {
  "messages": []
};

app.get('/api/messages', function(req, res) {
  res.send(emailStatus);
});

app.post('/api/sendEmail', function(req, res) {
  emailStatus['messages'].push({
    message: 'delivered',
    time: new Date()
  });
  console.log(req.body.toAddress);
  transporter.sendMail({
    from: 'fromjason.flogel@gmail.com',
    to: 'tojason.flogel@gmail.com',
    subject: 'hello',
    text: 'hello world!',
    headers: [{key:"X-MC-Tags", value:"TAG1,TAG2"},
              {key: "X-MC-Metadata", value: '{"id":1}'}]
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
  console.log(req.body);
  // emailStatus['messages'].push({message:'delivered',time: new Date()});
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
console.log("NodeJS web server running on localhost:3000");
