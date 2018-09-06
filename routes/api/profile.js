const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load Profile model
const Profile = require('../../models/Profile.js');
// load User model
const User = require('../../models/User.js');

// @route - GET api/profile/test
// @desc - tests profile route
// @access - public
router.get('/test', (req, res) => {
   res.json({ msg: 'Profile works!' });
});

// @route - GET api/profile
// @desc - get current user's profile
// @access - private
router.get('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const errors = {};

      Profile.findOne({ user: req.user.id })
         .then(profile => {
            if (!profile) {
               errors.noProfile = 'There is no profile for this user.';
               return res.status(404).json(errors);
            }
            res.json(profile);
         })
         .catch(err => res.status(404).json(err));
   }
);

// @route - POST api/profile
// @desc - create or edit user profile
// @access - private
router.post('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      // get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.status) profileFields.status = req.body.status;
      // skills = split into array
      if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',');
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.gitHubUserName) profileFields.gitHubUserName = req.body.gitHubUserName;
      // social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

      Profile.findOne({ user: req.user.id })
         .then(profile => {
            if (profile) {
               // update profile
               Profile.findOneAndUpdate(
                  { user: req.user.id },
                  { $set: profileFields },
                  { new: true }
               )
               .then(profile => res.json(profile));
            } else {
               // create profile
               // check if handle exists
               Profile.findOne({ handle: profileFields.handle })
                  .then(profile => {
                     if(profile) {
                        errors.handle = 'That handle already exists.';
                        res.status(400).json(errors);
                     }

                     // save profile
                     new Profile(profileFields)
                        .save()
                        .then(profile => {
                           res.json(profile);
                        });
                  })
            }
         })
   }
);

module.exports = router;


// // experience
// profileFields.experience{};
// if(req.body.title) profileFields.experience.title = req.body.title;
// if(req.body.company) profileFields.experience.company = req.body.company;
// if(req.body.location) profileFields.experience.location = req.body.location;
// if(req.body.from) profileFields.experience.from = req.body.from;
// if(req.body.to) profileFields.experience.to = req.body.to;
// if(req.body.current) profileFields.experience.current = req.body.current;
// if(req.body.description) profileFields.experience.description = req.body.description;
// // education
// profileFields.education{};
// if(req.body.school) profileFields.education.school = req.body.school;
// if(req.body.degree) profileFields.education.degree = req.body.degree;
// if(req.body.fieldOfStudy) profileFields.education.fieldOfStudy = req.body.fieldOfStudy;
// if(req.body.from) profileFields.education.from = req.body.from;
// if(req.body.to) profileFields.education.to = req.body.to;
// if(req.body.current) profileFields.education.current = req.body.current;
// if(req.body.description) profileFields.education.description = req.body.description;
