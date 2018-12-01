const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateRequestInput = require('../../validation/request');

// Load models
const ProjectManager = require('../../models/ProjectManager');
const Engineer = require('../../models/Engineer');
const Assignment = require('../../models/Assignment');

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
router.get(
  '/projects',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    //console.log(req.user.uid);
    ProjectManager.findOne({ pmid: req.user.uid })
      .then(pm => {
        if (!pm) {
          errors.pm = 'pm does not exist!!!';
          return res.status(404).json(errors);
        }

        res.json(pm.projects);
      })
      .catch(err => res.status(404).json({ pm: 'Error retrieving pm' }));
  }
);

// @route   POST api/pmanagers/roster
// @desc    Get roster from a given project from receive PID
// @access  Private
// @note: may not be needed as /assignments can replace this
router.post(
  '/roster',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    //console.log('fmid: ' + req.user.uid);
    //console.log('pid: ' + req.body.pid);

    Engineer.find({
      projects: req.body.pid
    })
      .then(engineers => {
        if (!engineers) {
          errors.engineers = 'No engineers on roster';
          return res.status(404).json(errors);
        }
        res.json(engineers);
      })
      .catch(err =>
        res.status(404).json({ engineers: 'No engineers on roster' })
      );
  }
);

// @route   GET api/pmanagers/global
// @desc    View global engineering roster
// @access  Private
router.get(
  '/global',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Engineer.find()
      .then(engineers => {
        if (!engineers) {
          errors.engineers =
            'There are no listed engineers on the global roster';
          return res.status(404).json(errors);
        }

        res.json(engineers);
      })
      .catch(err =>
        res
          .status(404)
          .json({ engineers: 'There are no engineers on the global roster' })
      );
  }
);

// @route   POST api/pmanagers/assignments
// @desc    View assignments on a given project ID
// @access  Private
router.post(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Assignment.aggregate([
      {
        $lookup: {
          from: 'engineers',
          localField: 'eid',
          foreignField: 'eid',
          as: 'engineer'
        }
      },
      {
        $match: {
          pid: req.body.pid
        }
      }
    ])
      .then(assignments => {
        if (!assignments) {
          errors.assignments = 'No assignments found';
          return res.status(404).json(errors);
        }
        res.json(assignments);
      })
      .catch(err =>
        res.status(404).json({ assignments: 'Could not get assignments' })
      );
  }
);

// @route   POST api/pmanagers/request
// @desc    Make a request
// @access  Private

// @route   POST api/pmanagers/outstanding
// @desc    View requests
// @access  Private
router.get(
  '/outstanding',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    //console.log(req.user.uid);
    Request.find({ returnid: req.user.uid })
      .then(requests => {
        if (!requests) {
          errors.requests = 'There are no requests';
          return res.status(404).json(errors);
        }
        res.json(requests);
      })
      .catch(err =>
        res.status(404).json({ requests: 'Could not get requests' })
      );
  }
);

// TODO:
// @route   POST api/pmanagers/pause
// @desc    Make or edit a request
// @access  Private

module.exports = router;
