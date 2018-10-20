const express = require("express");
const router = express.Router();
const passport = require("passport");
// load validations
const validateProfileInput = require("../../validation/profile.js");
const validateExperienceInput = require("../../validation/experience.js");
const validateEducationInput = require("../../validation/education.js");
// load models
const User = require("../../models/Users.js");
const Profile = require("../../models/Profiles.js");

// @route - GET api/profile
// @desc - get current user's profile
// @access - private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
   const errors = {};

   Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
         if (!profile) {
            errors.noProfile = "There is no profile for this user.";
            return res.status(404).json(errors);
         }
         res.json(profile);
      })
      .catch(err => res.status(404).json(err));
});

// @route - GET api/profile/all
// @desc - get all profiles
// @access - public
router.get("/all", (req, res) => {
   const errors = {};
   Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
         if (!profiles) {
            errors.noProfiles = "There are no profiles.";
            return res.status(404).json(errors);
         }

         res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles." }));
});

// @route - GET api/profile/handle/:handle
// @desc - get profile by handle
// @access - public
router.get("/handle/:handle", (req, res) => {
   const errors = {};

   Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then(profile => {
         if (!profile) {
            errors.noProfile = "There is no profile for this user.";
            res.status(404).json(errors);
         }

         res.json(profile);
      })
      .catch(err => res.status(404).json(err));
});

// @route - GET api/profile/user/:user_id
// @desc - get profile by user ID
// @access - public
router.get("/user/:user_id", (req, res) => {
   const errors = {};

   Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
         if (!profile) {
            errors.noProfile = "There is no profile for this user.";
            res.status(404).json(errors);
         }

         res.json(profile);
      })
      .catch(err => res.status(404).json({ profile: "There is no profile for this user." }));
});

// @route - POST api/profile
// @desc - create or edit user profile
// @access - private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
   const { errors, isValid } = validateProfileInput(req.body);

   // check validation
   if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
   }

   // get fields
   const { skills, twitter, facebook, linkedin, youtube, instagram } = req.body;

   const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(","),
      social: { twitter, facebook, linkedin, instagram, youtube },
   };

   Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
         // if profile exists, update profile
         Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
         ).then(() =>
            // also update user
            User.findOneAndUpdate(
               { _id: req.user.id },
               // update user handle with profile handle
               { $set: { handle: req.body.handle } },
               { new: true },
            ).then(profile => res.json(profile)),
         )
            .catch(err => res.json(err));
      } else {
         // create profile
         // check if handle exists
         Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
               errors.handle = "That handle already exists.";
               res.status(400).json(errors);
            }

            // save profile
            new Profile(profileFields).save().then(profile => res.json(profile));
         });
      }
   });
});

// @route - POST api/profile/experience
// @desc - add or edit experience to profile
// @access - private
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
   const { errors, isValid } = validateExperienceInput(req.body);

   // check validation
   if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
   }

   Profile.findOne({ user: req.user.id }).then(profile => {
      // add updated fields to experience array
      profile.experience.unshift(req.body);

      profile.save().then(profile => res.json(profile));
   });
});

// @route - POST api/profile/education
// @desc - add or edit education to profile
// @access - private
router.post("/education", passport.authenticate("jwt", { session: false }), (req, res) => {
   const { errors, isValid } = validateEducationInput(req.body);

   // check validation
   if (!isValid) {
      // return errors with 400 status
      return res.status(400).json(errors);
   }

   Profile.findOne({ user: req.user.id }).then(profile => {
      // add updated fields to education array
      profile.education.unshift(req.body);

      profile.save().then(profile => res.json(profile));
   });
});

// @route - DELETE api/profile/experience/:exp_id
// @desc - delete experience from profile
// @access - private
router.delete(
   "/experience/:exp_id",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // get remove index
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

            // splice out of array
            profile.experience.splice(removeIndex, 1);

            // save
            profile.save().then(profile => res.json(profile));
         })
         .catch(err => res.status(404).json(err));
   },
);

// @route - DELETE api/profile/education/:edu_id
// @desc - delete education from profile
// @access - private
router.delete(
   "/education/:edu_id",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // get remove index
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

            // splice out of array
            profile.education.splice(removeIndex, 1);

            // save
            profile.save().then(profile => res.json(profile));
         })
         .catch(err => res.status(404).json(err));
   },
);

// @route - DELETE api/profile
// @desc - delete user and profile
// @access - private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
   Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
         User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
});

module.exports = router;
