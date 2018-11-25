const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateAssignmentInput = require('../../validation/assignment');

// Load models
const Engineer = require('../../models/Engineer');
const Assignment = require('../../models/Assignment');
const Request = require('../../models/Request');

// @route   GET api/fmanagers/roster
// @desc    View roster for current FM
// @access  Private
router.get(
  '/roster',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    // search engineer db by fm's ID
    // Engineer.({ fmid: req.user.uid })
    //   .then(engineers => {
    //     if (!engineers) {
    //       errors.engineers = 'No engineers on roster';
    //       return res.status(404).json(errors);
    //     }

    //     res.json(engineers);
    //   })
    //   .catch(err =>
    //     res.status(404).json({ engineers: 'No engineers on roster' })
    //   );

    // search enginner db by fmid, aggregate eng's assignments into results
    Engineer.aggregate([
      {
        $lookup: {
          from: 'assignments',
          localField: 'eid',
          foreignField: 'eid',
          as: 'assignments'
        }
      },
      {
        $match: {
          fmid: req.user.uid
        }
      }
    ])
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

// @route   POST api/fmanagers/engineer
// @desc    retrieve single engineer
// @access  Private
router.post(
  '/engineer',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Engineer.findOne({ eid: req.body.eid })
      .then(engineer => {
        if (!engineer) {
          errors.engineer = 'Could not find engineer';
          return res.status(404).json(errors);
        }

        res.json(engineer);
      })
      .catch(err =>
        res.status(404).json({ engineer: 'Error retrieving engineer' })
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
// BROKEN....
router.post(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

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
          as: 'eng'
        }
      },
      {
        $match: {
          'eng.fmid': req.user.uid
        }
      }
    ])
      .then(requests => {
        res.json(requests);
      })
      .catch(err => res.status(404).json({ requests: 'No requests found' }));
  }
);

// @route   GET api/fmanagers/reqcount
// @desc    get number of requests
// @access  Private
router.get(
  '/reqcount',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Request.aggregate([
      {
        $lookup: {
          from: 'engineers',
          localField: 'eid',
          foreignField: 'eid',
          as: 'eng'
        }
      },
      {
        $match: {
          'eng.fmid': req.user.uid
        }
      }
    ])
      .then(requests => {
        res.json(requests.length);
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
    const { errors, isValid } = validateAssignmentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // sum checking Deprecated
    // let sum = 0;
    // for (i in req.body.tasks) {
    //   sum += req.body.tasks[i].hours;
    //   console.log(req.body.tasks[i]);
    // }
    // console.log(sum);

    const newAssignment = new Assignment({
      eid: req.body.eid,
      pid: req.body.pid,
      name: req.body.name,
      pmid: req.body.pmid,
      tasks: req.body.tasks
    });

    Assignment.findOne({ eid: req.body.eid, pid: req.body.pid }).then(
      assignment => {
        if (assignment) {
          // Update Assignment
          console.log('ALREADY EXISTS...');
          Assignment.findOneAndUpdate(
            { eid: req.body.eid, pid: req.body.pid },
            { $set: { tasks: req.body.tasks } },
            { new: true }
          ).then(assignment => res.json(assignment));
        } else {
          console.log('CREATING ASSIGNMENT...');
          // Create Assignment and Save
          new Assignment(newAssignment)
            .save()
            .then(newEntry => res.json(newEntry));
        }
      }
    );
  }
);

// @route   DELETE api/fmanagers/assign
// @desc    Delete assignment
// @access  Private
router.delete(
  '/assign',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Assignment.findOneAndRemove({ eid: req.body.eid, pid: req.body.pid }).then(
      () => {
        res.json({ success: true });
      }
    );
  }
);

module.exports = router;
