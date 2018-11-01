const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const path = require('path');
const message = require('./model/message');
//const Conversation = require('./model/conversation');
const User = require('./model/user');

const app = express();
app.use(bodyParser.json());

const mongoURI = require('./config/keys').mongoURI;

mongoose.connect(mongoURI, {useNewUrlParser: true}, function (err,res) {

    if(err){
      console.log("There is error: " + err);
    }else{
      console.log("Connected to mongo database") 
    }

})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/users', (req, res) => {

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });

    user.save().then( result => {
      console.log(result);
    }).catch( err => console.log(err))

    res.status(200).json({
      message: 'Handling POST req for users at api/users',
      userCreated: user
    });
    
})

app.get('/api/users', (req, res) => {

  User.find({}).then(eachOne => {
		
		res.json(eachOne);
	
  });

})


let db = mongoose.connection;

db.once('open', function() {
  console.log("Database is now connected");

  let io =  socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });

  let chat = db.collection('chat');

      socket.on('SEND_MESSAGE', function(data){
        
        let author = data.author;
        let message = data.message;
        let date = data.date;

        // Check for name and message
        if(author !== '' || message !== '' || date !== ''){
            // Insert message
            chat.insert({author:author, message: message, date:date}, function(){
              io.emit('RECEIVE_MESSAGE', [data]);
            });
        }
      });

      // socket.on('TYPING', function(data){
      //     socket.broadcast.emit('TYPING', data)
      // })

    chat.find().sort({_id:1}).toArray(function(err, res){
      if(err){
          throw err;
      }
      // Emit the messages
      io.emit('RECEIVE_MESSAGE', res);
    }); 
  }) 

});
  

const port = 5000;

let server = app.listen(5000, function(){
  console.log('server is running on port 5000')
});