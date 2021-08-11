const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Chat = require('../../models/Chat');
const { route } = require('./users');

//@route    POST api/chat
//@desc     Join to chat
//@access   Private

router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('user', ['name']);

    const newRoom = new Chat({
      name: user.name,
      user: req.user.id,
    });
    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/chat/chat-room
//@desc     Create a message
//@access   Private

router.post(
  '/chat-room',
  [auth, [check('text', 'Message is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newChat = new Chat({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        email: user.email,
        chatRoomId: req.body.chatRoomId,
        clickedEmail: req.body.clickedEmail,
      });
      console.error(newChat);
      const chat = await newChat.save();
      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/chat-room/:id
//@desc     Get message by id
//@access   Private
router.get('/chat-room/:id', auth, async (req, res) => {
  try {
    const message = await Chat.findById(req.params.id).sort({ date: 1 });
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/chat/chat-room
// @desc     Get all messages
// @access   Private
router.get('/chat-room', auth, async (req, res) => {
  try {
    const messages = await Chat.find()
      .sort({ date: 1 })
      .populate('user', ['name']);

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/chat/chat-room/:id
//@desc     Get all user messages by user_id
//@access   Private
router.get('/chat-room/:user_id', auth, async (req, res) => {
  try {
    const chat = await Chat.find({ user: req.params.user_id })
      .sort({ date: 1 })
      .populate('user', ['name']);
    if (!chat) {
      return res.status(404).json({ msg: 'User has no messages' });
    }
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    POST api/chat/chat-room/email
//@desc     ADD email
//@access   Private

router.post(
  '/chat-room/email',
  auth,
  // [auth, [check('clickedEmail', 'Message is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newChat2 = new Chat({
        name: user.name,
        user: req.user.id,
        email: user.email,
        clickedEmail: req.body.clickedEmail,
      });
      console.error(newChat2);
      const chat = await newChat2.save();
      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/chat/chat-room/:id
//@desc     Get clicked email by user_id
//@access   Private
router.get('/chat-room/email', auth, async (req, res) => {
  try {
    const email = await Chat.find().sort({ date: 1 });
    if (!email) {
      return res.status(404).json({ msg: 'Email not found' });
    }
    res.json(email);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'ClickedEmail not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
