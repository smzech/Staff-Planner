const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation

// Load models

router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const access = req.user.privilege;

    if (access === 'p') {
      res.json({ ACCESS: 'GRANTED' });
    } else {
      res.json({ ACCESS: 'DENIED' });
    }
  }
);

// @route   GET api/pmanagers/projects
// @desc    Get current pm's projects
// @access  Private

// @route   GET api/pmanagers/roster
// @desc    Get roster from a given project
// @access  Private

// @route   GET api/pmanagers/global
// @desc    View global engineering roster
// @access  Private

// @route   GET api/pmanagers/assignments
// @desc    View assignments for a given engineer
// @access  Private

// @route   POST api/pmanagers/request
// @desc    Make or edit a request
// @access  Private

// TODO:
// @route   POST api/pmanagers/pause
// @desc    Make or edit a request
// @access  Private

module.exports = router;
