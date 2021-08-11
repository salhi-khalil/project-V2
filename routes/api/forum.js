const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Forum = require('../../models/Forum');
const { route } = require('./users');

//@route    POST api/forum
//@desc     Join to forum
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

    const newRoom = new Forum({
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

//@route    POST api/forum/forum-room
//@desc     Create a message
//@access   Private

router.post(
  '/forum-room',
  [auth, [check('text', 'Message is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newForum = new Forum({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        // chatRoomId: req.params.chatRoomId,
      });
      const forum = await newForum.save();
      res.json(forum);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/forum-room/:id
//@desc     Get message by id
//@access   Private
router.get('/forum-room/:id', auth, async (req, res) => {
  try {
    const message = await Forum.findById(req.params.id).sort({ date: 1 });
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

// @route    GET api/forum/forum-room
// @desc     Get all messages
// @access   Private
router.get('/forum-room', auth, async (req, res) => {
  try {
    const messages = await Forum.find()
      .sort({ date: 1 })
      .populate('user', ['name']);

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/forum/forum-room/:id
//@desc     Get all user messages by user_id
//@access   Private
router.get('/forum-room/:user_id', auth, async (req, res) => {
  try {
    const forum = await Forum.find({ user: req.params.user_id })
      .sort({ date: 1 })
      .populate('user', ['name']);
    if (!forum) {
      return res.status(404).json({ msg: 'User has no messages' });
    }
    res.json(forum);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
