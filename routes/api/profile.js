const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: 'The user does not have a profile!' });
    }
    //if there is a profile send users profile
    res.json(profile.populate('user', ['name', 'avatar', 'role']));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('profession', 'Profession is required').not().isEmpty(),
      check('locationTown', 'Town is required').not().isEmpty(),
      check('institution', 'Institution is required').not().isEmpty(),
      check('workTime', 'Work time is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('email', 'Email is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      profession,
      locationTown,
      institution,
      contracts,
      workTime,
      phone,
      address,
      email,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    //Build profile object

    const profileFields = {
      user: req.user.id,
      profession,
      locationTown,
      institution,
      phone,
      address,
      email,
      bio,
      contracts: Array.isArray(contracts)
        ? contracts
        : contracts.split(',').map((contracts) => ' ' + contracts.trim()),
      workTime: Array.isArray(workTime)
        ? workTime
        : workTime.split(',').map((workTime) => ' ' + workTime.trim()),
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/profile/:role?
//@desc     Get all profiles
//@access   Public
router.get('/:role?', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar', 'role']);
    let role = req.params.role;
    if (role) {
      profiles = profiles.filter(
        profile => profile.user.role === role
      )
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'User has no profile' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile/:id?
//@desc     Delete  profile, user and posts
//@access   Private
router.delete('/:id?', auth, async (req, res) => {
  try {
    //Remove user posts
    await Post.deleteMany({ user: req.params.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.params.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/profile/experience
//@desc     Add profile experience
//@access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'Form date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     DELETE profile experience
//@access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
