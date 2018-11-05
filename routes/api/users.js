const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' })); // want this to serve json

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find the user by email
  User.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      errors.username = 'Username not found';
      return res.status(404).json(errors);
    }

    // Check Password
    if (password === user.password) {
      // User Matched

      const payload = {
        id: user.id,
        username: user.username,
        uid: user.uid,
        privilege: user.privilege
      }; // Create JWT Paylod

      // Sign Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      });
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      uid: req.user.uid,
      privilege: req.user.privilege
    });
  }
);

module.exports = router;
