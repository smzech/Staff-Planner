const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateInitRequest = require('../../validation/init-request');
const validateDeltaRequest = require('../../validation/delta-request');
const validateDeleteRequest = require('../../validation/delete-request');

// Load models
const ProjectManager = require('../../models/ProjectManager');
const Engineer = require('../../models/Engineer');
const Assignment = require('../../models/Assignment');
const Request = require('../../models/Request');

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

// @route   POST api/pmanagers/init-request
// @desc    Make an INIT request
// @access  Private
router.post(
  '/init-request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateInitRequest(req.body);

    // Check Validation return errors if any
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Check if assignment exists already, can only make init requests if assignment doesn't already exist
    Assignment.findOne({ eid: req.body.eid, pid: req.body.pid })
      .then(assignment => {
        if (assignment) {
          errors.assignment = 'Engineer already assigned to this project';
          return res.status(400).json(errors);
        } else {
          // Check if a request for this assignment has already been made
          Request.findOne({ eid: req.body.eid, pid: req.body.pid })
            .then(request => {
              if (request) {
                errors.request = 'Engineer already requested for this project';
                return res.status(400).json(errors);
              } else {
                // save to save request
                const newReq = {
                  eid: req.body.eid,
                  pid: req.body.pid,
                  returnid: req.body.returnid,
                  name: req.body.name,
                  reqtype: req.body.reqtype,
                  tasks: req.body.tasks
                };

                new Request(newReq)
                  .save()
                  .then(reqReturn => res.json(reqReturn));
              }
            })
            .catch(err =>
              res
                .status(404)
                .json({ request: 'Could not access requests for validation' })
            );
        }
      })
      .catch(err =>
        res
          .status(404)
          .json({ assignment: 'Could not access assignments for validation' })
      );
  }
);

// @route   POST api/pmanagers/delta-request
// @desc    Make an DELTA request
// @access  Private
router.post(
  '/delta-request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDeltaRequest(req.body);

    // Check Validation return errors if any
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const deltareq = {
      eid: req.body.eid,
      pid: req.body.pid,
      returnid: req.body.returnid,
      name: req.body.name,
      reqtype: req.body.reqtype,
      tasks: req.body.tasks
    };

    new Request(deltareq).save().then(request => res.json(request));
  }
);

// @route   POST api/pmanagers/delete-request
// @desc    Make an DELETE request
// @access  Private
router.post(
  '/delete-request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Request.findOne({
      eid: req.body.eid,
      pid: req.body.pid,
      reqtype: req.body.reqtype
    })
      .then(request => {
        // check if request exists already
        if (request) {
          console.log('delete request already exists');
          errors.delete = 'There is already a delete request for this engineer';
          return res.status(400).json(errors);
        }

        // create delete if no delete request found

        const deleteReq = {
          eid: req.body.eid,
          pid: req.body.pid,
          returnid: req.body.returnid,
          name: req.body.name,
          reqtype: req.body.reqtype,
          tasks: []
        };

        new Request(deleteReq).save().then(request => res.json(request));
      })
      .catch(err =>
        res.status(404).json({
          delete: 'Delete request already exists'
        })
      );
  }
);

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

// @route   POST api/pmanagers/remove-request
// @desc    delete a request
// @access  Private
router.post(
  '/remove-request',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.body);
    Request.findOneAndRemove({ _id: req.body.id }).then(() => {
      res.json({ success: true });
    });
  }
);

// TODO:
// @route   POST api/pmanagers/pause
// @desc    Make or edit a request
// @access  Private

module.exports = router;
