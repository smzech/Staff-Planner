const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateVacationRequestInput = require('../../validation/vacrequest');

// Load models / Connector
const Assignment = require('../../models/Assignment');
const Request = require('../../models/Request');

// **** TEST ROUTES ****
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const access = req.user.privilege;

    if (access === 'e') {
      res.json({ ACCESS: 'GRANTED' });
    } else {
      res.json({ ACCESS: 'DENIED' });
    }
  }
);
// **** END TEST ROUTES ****

// @route   GET api/engineers/assignments
// @desc    Get engineer user's assignments
// @access  Private
router.get(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    const access = req.user.privilege;
    if (access !== 'e') {
      errors.privilege = 'Not allowed to access this route';
      return res.status(401).json(errors);
    }

    Assignment.find({ eid: req.user.uid })
      .sort({ pid: 1 })
      .then(assignments => {
        if (!assignments) {
          errors.noassignments = 'There are no assigned projects to this user';
          return res.status(404).json(errors);
        }

        res.json(assignments);
      })
      .catch(err =>
        res
          .status(404)
          .json({ assignment: 'There are no assigned projects to this user' })
      );
  }
);

// @route   POST api/engineers/vacation
// @desc    Make request for vacation
// @access  Private
router.post(
  '/vacation',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // fetch all asignments from req.user.id
    console.log('REQ BODY');
    console.log(req.body);
    const { errors, isValid } = validateVacationRequestInput(req.body);

    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Vacation code 777 with name "vacation"
    const vacreq = {
      eid: req.user.uid,
      pid: 777,
      returnid: req.user.uid,
      name: 'Vacation',
      reqtype: 'delta',
      tasks: [
        {
          month: req.body.month,
          hours: req.body.hours
        }
      ]
    };

    console.log('vaction request received!');
    new Request(vacreq).save().then(request => res.json(request));
  }
);

module.exports = router;
