import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import AssignmentItemReview from './AssignmentItemReview';
import RequestItem from './RequestItem';
import {
  getAssignmentsByID,
  createAssignment,
  deleteAssignment,
  allocateVacation
} from '../../../actions/assignmentActions';
import { getEngineer } from '../../../actions/engineerActions';
import { rejectRequest } from '../../../actions/requestActions';

// @name: Assignment View
// @route: /assignment
// @desc: accept of reject an assignment for and engineer
// @passed-props: request
class Assignment extends Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
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
            // request type handling:
            // @init: sum normally
            // @delta: skip sum of the request assignment, sum will be handled by the request loop below
            // @vacation: skip sum of if the assignment is vacation and there is a vacation request for this month
            // @delete: do not sum at all

            switch (request.reqtype) {
              case 'init': {
                sum += assignments[j].tasks[k].hours;
                break;
              }
              case 'delta': {
                if (assignments[j].pid !== request.pid) {
                  sum += assignments[j].tasks[k].hours;
                }
                break;
              }
              case 'vacation': {
                if (assignments[j].pid !== request.pid) {
                  sum += assignments[j].tasks[k].hours;
                } else if (!request.tasks.find(task => task.month === i)) {
                  sum += assignments[j].tasks[k].hours;
                }
                break;
              }
              case 'delete': {
                if (assignments[j].pid !== request.pid) {
                  sum += assignments[j].tasks[k].hours;
                }
              }
              default: {
              }
            }
          }
        }
      }

      // loop through request tasks
      if (request.reqtype !== 'delete') {
        for (let k = 0; k < request.tasks.length; k++) {
          if (request.tasks[k].month === i) {
            sum += request.tasks[k].hours;
          }
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

  onAccept(e) {
    e.preventDefault();
    const { request } = this.props.location.state;

    // submit by request type
    switch (request.reqtype) {
      case 'init': {
        this.sendInitDelta();
        break;
      }
      case 'delta': {
        this.sendInitDelta();
        break;
      }
      case 'vacation': {
        this.sendVacation();
        break;
      }
      case 'delete': {
        this.sendDelete();
        break;
      }
      default: {
      }
    }
  }

  // @info: helper function accepting init or delta requests
  sendInitDelta() {
    const { request } = this.props.location.state;

    const assignmentData = {
      eid: request.eid,
      pid: request.pid,
      name: request.name,
      pmid: request.returnid,
      tasks: request.tasks
    };

    // submit assignment
    this.props.createAssignment(assignmentData, this.props.history);
    // delete that request
    const { _id } = this.props.location.state.request;
    const reqID = {
      id: _id
    };
    this.props.rejectRequest(reqID, this.props.history);
  }

  // @info: helper function for accepting a delete request
  sendDelete() {
    const { request } = this.props.location.state;

    this.props.deleteAssignment(request, this.props.history);

    // delete that request
    const { _id } = this.props.location.state.request;
    const reqID = {
      id: _id
    };
    this.props.rejectRequest(reqID, this.props.history);
  }

  // @info: helper function for accepting a vacation request
  sendVacation() {
    const { request } = this.props.location.state;

    this.props.allocateVacation(request, this.props.history);

    // delete that request
    const { _id } = this.props.location.state.request;
    const reqID = {
      id: _id
    };
    this.props.rejectRequest(reqID, this.props.history);
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

  // ************************************************* //

  render() {
    const { request } = this.props.location.state;
    const { assignments, loading } = this.props.assignment;

    let assignmentsContent;
    let totals = this.getTotals();

    if (assignmentsContent === null || loading) {
      assignmentsContent = <Spinner />;
    } else {
      assignmentsContent = assignments.map(assignment => (
        <AssignmentItemReview
          assignment={assignment}
          request={request}
          key={assignment._id}
        />
      ));
    }

    let typeTitle = '';
    switch (request.reqtype) {
      case 'init': {
        typeTitle = 'Initialization';
        break;
      }
      case 'delta': {
        typeTitle = 'Change';
        break;
      }
      case 'vacation': {
        typeTitle = 'Vacation';
        break;
      }
      case 'delete': {
        typeTitle = 'Delete';
        break;
      }
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
            <span className="mr-4">{`Review ${typeTitle} Request`}</span>
            <span>
              <button
                onClick={this.onAccept}
                className="btn btn-info text-center mr-2"
              >
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
              {request.reqtype === 'init' ? (
                <RequestItem request={request} />
              ) : null}
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
  rejectRequest: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  allocateVacation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  assignment: state.assignment
});

export default connect(
  mapStateToProps,
  {
    getAssignmentsByID,
    getEngineer,
    rejectRequest,
    createAssignment,
    deleteAssignment,
    allocateVacation
  }
)(Assignment);
