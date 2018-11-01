const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConversationSchema = new Schema({
  user1: {
    type: String,
    required: true
  },
  user2: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('Conversation', ConversationSchema);