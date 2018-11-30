import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import AssignmentItem from './AssignmentItem';
import { getAssignmentsByID } from '../../../actions/assignmentActions';
import { getEngineer } from '../../../actions/engineerActions';

class EngineerView extends Component {
  componentDidMount() {
    const { eid } = this.props.location.state;
    const engID = {
      eid: eid
    };
    this.props.getAssignmentsByID(engID);
    this.props.getEngineer(engID);
  }

  /* Total hours for each column */
  getTotals = () => {
    const { assignments } = this.props.assignment;
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
            sum += assignments[j].tasks[k].hours;
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

  render() {
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
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h3>
            <span className="mr-3">ASSIGNMENTS FOR:</span>
            <span>{JSON.stringify(this.props.location.state.eid)}</span>
          </h3>
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
                <th scope="col" className="text-center">
                  -
                </th>
              </tr>
            </thead>
            <tbody>{assignmentsContent}</tbody>
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

EngineerView.propTypes = {
  auth: PropTypes.object.isRequired,
  engineer: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
  getAssignmentsByID: PropTypes.func.isRequired,
  getEngineer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  assignment: state.assignment
});

export default connect(
  mapStateToProps,
  { getAssignmentsByID, getEngineer }
)(EngineerView);
