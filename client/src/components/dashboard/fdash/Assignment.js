import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import AssignmentItem from './AssignmentItem';
import RequestItem from './RequestItem';
import { getAssignmentsByID } from '../../../actions/assignmentActions';
import { getEngineer } from '../../../actions/engineerActions';
import { rejectRequest } from '../../../actions/requestActions';

// @name: Assignment View
// @route: /assignment
// @desc: accept of reject an assignment for and engineer
class Assignment extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReject = this.onReject.bind(this);
  }

  componentDidMount() {
    const { eid } = this.props.location.state.request;
    const engID = {
      eid: eid
    };
    this.props.getAssignmentsByID(engID);
    this.props.getEngineer(engID);
  }

  /* Total hours for each column */
  getTotals = () => {
    const { assignments } = this.props.assignment;
    const { request } = this.props.location.state;
    let cols = [];

    // iterate 6 times, for each column, i is index of column/month
    for (let i = 0; i < 6; i++) {
      // sum hours for column[i]
      let sum = 0;
      // loop through each assignment, j is index of assignment
      for (let j = 0; j < assignments.length; j++) {
        // loop through each task of this assignment, k is index of task of assignment
        for (let k = 0; k < assignments[j].tasks.length; k++) {
          if (assignments[j].tasks[k].month === i) {
            // TODO: do not sum hours if project is part of delete request
            sum += assignments[j].tasks[k].hours;
          }
        }
      }
      // TODO: get tasks from requests, handle delta and init, skip if delete
      for (let k = 0; k < request.tasks.length; k++) {
        if (request.tasks[k].month === i) {
          sum += request.tasks[k].hours;
        }
      }

      let color = null;
      if (sum >= 150 && sum <= 170) {
        color = 'bg-success';
      } else if (sum >= 135 && sum <= 185) {
        color = 'bg-warning';
      } else {
        color = 'bg-danger';
      }
      cols.push(<th className={color}>{sum}</th>);
    }
    return cols;
  };

  onSubmit(e) {
    e.preventDefault();

    // submit request as an assignment
    this.state.test = 'SUBMIT';
  }

  onReject(e) {
    e.preventDefault();

    // handle request rejection
    const { _id } = this.props.location.state.request;
    const reqID = {
      id: _id
    };
    this.props.rejectRequest(reqID, this.props.history);
  }

  render() {
    const { request } = this.props.location.state;
    const { assignments, loading } = this.props.assignment;

    let assignmentsContent;
    let totals = this.getTotals();

    if (assignmentsContent === null || loading) {
      assignmentsContent = <Spinner />;
    } else {
      assignmentsContent = assignments.map(assignment => (
        <AssignmentItem assignment={assignment} key={assignment._id} />
      ));
    }

    return (
      <div className="request-list">
        <div className="container">
          <div className="row">
            <Link to="/request-list" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h3>
            <span className="mr-4">Review Request</span>
            <span>
              <button type="submit" className="btn btn-info text-center mr-2">
                <i className="far fa-check-circle mr-2 align-middle" />
                <b>Accept</b>
              </button>
              <button
                onClick={this.onReject}
                className="btn btn-danger text-center ml-2"
              >
                <i className="far fa-times-circle mr-2 align-middle" />
                <b>Reject</b>
              </button>
            </span>
          </h3>
          <br />
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Jan</th>
                <th scope="col">Feb</th>
                <th scope="col">Mar</th>
                <th scope="col">Apr</th>
                <th scope="col">May</th>
                <th scope="col">Jun</th>
              </tr>
            </thead>
            <tbody>
              {assignmentsContent}
              <RequestItem request={request} />
            </tbody>
            <tfoot className="bg-info">
              <tr>
                <th scope="col">Totals:</th>
                {totals}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

Assignment.propTypes = {
  auth: PropTypes.object.isRequired,
  engineer: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
  getAssignmentsByID: PropTypes.func.isRequired,
  getEngineer: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  assignment: state.assignment
});

export default connect(
  mapStateToProps,
  { getAssignmentsByID, getEngineer, rejectRequest }
)(Assignment);
