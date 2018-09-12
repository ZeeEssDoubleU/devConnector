const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validations
const validateProfileInput = require('../../validation/profile.js');
const validateExperienceInput = require('../../validation/experience.js');
const validateEducationInput = require('../../validation/education.js');

// load models
const Profile = require('../../models/Profile.js');
const User = require('../../models/User.js');

// @route - GET api/profile
// @desc - get current user's profile
// @access - private
router.get('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const errors = {};

      Profile.findOne({ user: req.user.id })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
            if (!profile) {
               errors.noProfile = 'There is no profile for this user.';
               return res.status(404)
                  .json(errors);
            }
            res.json(profile);
         })
         .catch(err => res.status(404)
            .json(err));
   }
);

// @route - GET api/profile/all
// @desc - get all profiles
// @access - public
router.get('/all',
   (req, res) => {
      const errors = {};
      Profile.find()
         .populate('user', ['name', 'avatar'])
         .then(profiles => {
            if (!profiles) {
               errors.noProfiles = 'There are no profiles.';
               return res.status(404)
                  .json(errors);
            }

            res.json(profiles);
         })
         .catch(err => res.status(404)
            .json({ profile: 'There are no profiles.' }));
   }
);

// @route - GET api/profile/handle/:handle
// @desc - get profile by handle
// @access - public
router.get('/handle/:handle',
   (req, res) => {
      const errors = {};

      Profile.findOne({ handle: req.params.handle })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
            if (!profile) {
               errors.noProfile = 'There is no profile for this user.';
               res.status(404)
                  .json(errors);
            }

            res.json(profile);
         })
         .catch(err => res.status(404)
            .json(err));
   }
);

// @route - GET api/profile/user/:user_id
// @desc - get profile by user ID
// @access - public
router.get('/user/:user_id',
   (req, res) => {
      const errors = {};

      Profile.findOne({ user: req.params.user_id })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
            if (!profile) {
               errors.noProfile = 'There is no profile for this user.';
               res.status(404)
                  .json(errors);
            }

            res.json(profile);
         })
         .catch(err => res.status(404)
            .json({ profile: 'There is no profile for this user.' }));
   }
);

// @route - POST api/profile
// @desc - create or edit user profile
// @access - private
router.post('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);

      // check validation
      if (!isValid) {
         // return errors with 400 status
         return res.status(400)
            .json(errors);
      }

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
               Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                  .then(profile => res.json(profile));
            } else {
               // create profile
               // check if handle exists
               Profile.findOne({ handle: profileFields.handle })
                  .then(profile => {
                     if (profile) {
                        errors.handle = 'That handle already exists.';
                        res.status(400)
                           .json(errors);
                     }

                     // save profile
                     new Profile(profileFields)
                        .save()
                        .then(profile => res.json(profile));
                  })
            }
         })
   }
);

// @route - POST api/profile/experience
// @desc - add or edit experience to profile
// @access - private
router.post('/experience', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, isValid } = validateExperienceInput(req.body);

      // check validation
      if (!isValid) {
         // return errors with 400 status
         return res.status(400)
            .json(errors);
      }

      Profile.findOne({ user: req.user.id })
         .then(profile => {
            const newExp = {
               title: req.body.title,
               company: req.body.company,
               location: req.body.location,
               from: req.body.from,
               to: req.body.to,
               current: req.body.current,
               description: req.body.description,
            }

            // add to experience array
            profile.experience.unshift(newExp);

            profile.save()
               .then(profile => res.json(profile));
         })
   }
);

// @route - POST api/profile/education
// @desc - add or edit education to profile
// @access - private
router.post('/education', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, isValid } = validateEducationInput(req.body);

      // check validation
      if (!isValid) {
         // return errors with 400 status
         return res.status(400)
            .json(errors);
      }

      Profile.findOne({ user: req.user.id })
         .then(profile => {
            const newEdu = {
               school: req.body.school,
               degree: req.body.degree,
               fieldOfStudy: req.body.fieldOfStudy,
               from: req.body.from,
               to: req.body.to,
               current: req.body.current,
               description: req.body.description,
            }

            // add to education array
            profile.education.unshift(newEdu);

            profile.save()
               .then(profile => res.json(profile));
         })
   }
);

// @route - DELETE api/profile/experience/:exp_id
// @desc - delete experience from profile
// @access - private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // get remove index
            const removeIndex = profile.experience.map(item => item.id)
               .indexOf(req.params.exp_id);

            // splice out of array
            profile.experience.splice(removeIndex, 1);

            // save
            profile.save()
               .then(profile => res.json(profile));
         })
         .catch(err => res.status(404)
            .json(err));
   }
);

// @route - DELETE api/profile/education/:edu_id
// @desc - delete education from profile
// @access - private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // get remove index
            const removeIndex = profile.education.map(item => item.id)
               .indexOf(req.params.edu_id);

            // splice out of array
            profile.education.splice(removeIndex, 1);

            // save
            profile.save()
               .then(profile => res.json(profile));
         })
         .catch(err => res.status(404)
            .json(err));
   }
);

// @route - DELETE api/profile
// @desc - delete user and profile
// @access - private
router.delete('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id })
         .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
               .then(() => res.json({ success: true }));
         })
         .catch(err => res.status(404)
            .json(err));
   }
);

module.exports = router;
