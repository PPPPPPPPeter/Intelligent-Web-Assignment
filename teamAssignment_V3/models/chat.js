const mongoose = require("mongoose");

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

const ChatModel = mongoose.model('Chat', ChatSchema);

module.exports = {
  ChatModel
}

