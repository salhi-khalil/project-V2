const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route    POST api/users
//@desc     Register user
//@access   Public

router.post(
  '/',
  [
    check('name', 'Name is needed').not().isEmpty(),
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Password contains 8 or more characters').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, role, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Get user gravatar
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      //user.allUsers = user.name;

      user = new User({
        name,
        email,
        role,
        avatar,
        password,
        //allUsers,
      });

      //Encrypt password
      const salt = await bycrypt.genSalt(10);

      user.password = await bycrypt.hash(password, salt);
      await user.save();
      
      if (user.role === 'patient') {
        //Create profile for user
        const profileFields = {
            user: user.id,
            email: user.email
        }
        try {
        // Using upsert option (creates new doc if no match is found):
        const profile = await Profile.findOneAndUpdate(
            { user: user.id },
            { $set: profileFields },
            { new: true, upsert: true }
        );
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        }
      }
      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route    GET api/users
//@desc     Get all users
//@access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('user', ['name', 'email']);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
