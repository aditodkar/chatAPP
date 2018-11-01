const express = require('express');
const mongoose = require('mongoose');
const socket = require('socket.io');
const path = require('path');
const message = require('./model/message');

const app = express();

const mongoURI = require('./config/keys').mongoURI;

mongoose.connect(mongoURI, {useNewUrlParser: true}, function (err,res) {

    if(err){
      console.log("There is error: " + err);
    }else{
      console.log("Connected to mongo database") 
    }

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
      
        let message = data.message;
        let date = data.date;

        // Check for name and message
        if(message !== '' || date !== ''){
            // Insert message
            chat.insert({message: message, date:date}, function(){
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