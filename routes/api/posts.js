const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validations
const validatePostInput = require('../../validation/post.js');

// load models
const Post = require('../../models/Post.js');
const Profile = require('../../models/Profile.js');

// @route - GET api/posts
// @desc - get posts
// @access - public
router.get('/',
   (req, res) => {
      Post.find()
         .sort({ date: -1 })
         .then(posts => res.json(posts))
         .catch(err => res.status(404)
            .json({ postsNotFound: 'No posts found.' }));
   }
);

// @route - GET api/posts/:id
// @desc - get post by id
// @access - public
router.get('/:id',
   (req, res) => {
      Post.findById(req.params.id)
         .then(post => res.json(post))
         .catch(err => res.status(404)
            .json({ postNotFound: 'No post found with that ID.' }));
   }
);

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

// @route - DELETE api/posts/:id
// @desc - delete post
// @access - private
router.delete('/:id', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            Post.findById(req.params.id)
               .then(post => {
                  // check for post owner
                  if (post.user.toString() !== req.user.id) {
                     return res.status(401)
                        .json({ notAuthorized: 'User not authorized.' });
                  }

                  // delete
                  post.remove()
                     .then(() => {
                        res.json({ success: true });
                     })
                     .catch(err => res.status(404)
                        .json({ postNotFound: 'No post found.' }));
               })
         })
   }
);

// @route - POST api/posts/like/:id
// @desc - like post
// @access - private
router.post('/like/:id', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            Post.findById(req.params.id)
               .then(post => {
                  // see if user has liked post.  Checks equality in filter function.  If no result is filtered (.length = 0), then user has NOT liked post
                  if (post.likes.filter(like => like.user.toString() === req.user.id)
                     .length > 0) {
                     return res.status(400)
                        .json({ alreadyLiked: 'User already liked this post.' });
                  }

                  // add user id to likes array
                  post.likes.unshift({ user: req.user.id });
                  // save and return post
                  post.save()
                     .then(post => res.json(post));
               })
         })
   }
);

// @route - POST api/posts/unlike/:id
// @desc - unlike post
// @access - private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            Post.findById(req.params.id)
               .then(post => {
                  // see if user has liked post.  Checks equality in filter function.  If no result is filtered (.length = 0), then user has NOT liked post
                  if (post.likes.filter(like => like.user.toString() === req.user.id)
                     .length === 0) {
                     return res.status(400)
                        .json({ alreadyLiked: "You haven't liked this post yet." });
                  }

                  // get remove index
                  const removeIndex = post.likes.map(item => item.user.toString())
                     .indexOf(req.user.id);
                  // splice out of array
                  post.likes.splice(removeIndex, 1);
                  // save and return post
                  post.save()
                     .then(post => res.json(post));
               })
         })
   }
);

module.exports = router;
