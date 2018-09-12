const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validation
const validatePostInput = require('../../validation/post.js');

// load Post model
const Post = require('../../models/Post.js');

// @route - GET api/posts/test
// @desc - tests posts route
// @access - public
router.get('/test', (req, res) => {
   res.json({ msg: 'Posts works!' });
});

// @route - POST api/posts
// @desc - create post
// @access - private
router.post('/', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);

      // check validation
      if (!isValid) {
         // return errors with 400 status
         return res.status(400)
            .json(errors);
      }

      const newPost = new Post({
         text: req.body.text,
         name: req.body.name,
         avatar: req.body.avatar,
         user: req.user.id,
      });

      newPost.save()
         .then(post => res.json(post));
   }
);

module.exports = router;
