const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation

// Load models
const Engineer = require('../../models/Engineer');
const Assignment = require('../../models/Assignment');
const Request = require('../../models/Request');

// TEST ROUTE
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

// @route   GET api/fmanagers/roster
// @desc    View roster for current FM
// @access  Private
router.get(
  '/roster',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    // search engineer db by fm's ID
    Engineer.find({ fmid: req.user.uid })
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

// @route   GET api/fmanagers/global
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

// @route   POST api/fmanagers/assignments
// @desc    View assignments for a given engineer
// @access  Private
router.post(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.body.eid);
    Assignment.find({ eid: req.body.eid })
      .then(assignments => {
        if (!assignments) {
          errors.assignments = 'No assignments found';
          return res.status(404).json(errors);
        }

        res.json(assignments);
      })
      .catch(err =>
        res.status(404).json({ assignments: 'No assignments found' })
      );
  }
);

// @route   GET api/fmanagers/requests
// @desc    View requests
// @access  Private
router.get(
  '/requests',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    // consider passing roster from component state

    console.log(req.user.uid);
    Request.aggregate([
      {
        $lookup: {
          from: 'engineers',
          localField: 'eid',
          foreignField: 'eid',
          as: 'engs'
        }
      },
      {
        $match: {
          'engs.fmid': req.user.uid
        }
      },
      {
        $unwind: '$engs'
      }
    ])
      .then(requests => {
        res.json(requests);
      })
      .catch(err => res.status(404).json({ requests: 'No requests found' }));
  }
);

// @route   POST api/fmanagers/assign
// @desc    Make or Edit assignment
// @access  Private
router.post(
  '/assign',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateAssignmentInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    //console.log(req.body);
    let sum = 0;
    for (i in req.body.tasks) {
      sum += req.body.tasks[i].hours;
      console.log(req.body.tasks[i]);
    }
    console.log(sum);

    const newAssignment = new Assignment({
      eid: req.body.eid,
      pid: req.body.pid,
      name: req.body.name,
      pmid: req.body.pmid,
      tasks: req.body.tasks
    });

    res.json(newAssignment);
  }
);

// @route   DELETE api/fmanagers/assign
// @desc    Delete assignment
// @access  Private
router.delete(
  '/assign',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

module.exports = router;
