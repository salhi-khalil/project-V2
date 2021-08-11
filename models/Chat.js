const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  email: {
    type: String,
  },
  fileUploads: {
    type: String,
  },
  clickedEmail: {
    type: String,
  },
  message: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  chatRoomId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
