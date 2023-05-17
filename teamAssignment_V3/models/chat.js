/**
 * chat.js - Chat Model
 */
const mongoose = require("mongoose");

/**
 * Define the ChatSchema
 */
const ChatSchema = new mongoose.Schema({
  sight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BirdSight'
  },
  sender: String,
  message: String
}, {
  timestamps: true
});

/**
 * Define the ChatModel
 */
const ChatModel = mongoose.model('Chat', ChatSchema);

/**
 * Export the ChatModel
 */
module.exports = {
  ChatModel
}

