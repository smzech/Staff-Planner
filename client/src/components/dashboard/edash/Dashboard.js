import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VacModal from './VacModal';
import Spinner from '../../common/Spinner';
import { getAssignments } from '../../../actions/assignmentActions';
import AssignmentItem from './AssignmentItem';

// ENGINEER DASHBOARD
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAssignments(this.props.auth.user.eid);
  }

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
    const { user } = this.props.auth;
    const { assignments, loading } = this.props.assignment;

    let assignmentsContent;
    let totals = this.getTotals();

    if (assignments === null || loading) {
      assignmentsContent = <Spinner />;
    } else {
      assignmentsContent = assignments.map(assignment => (
        <AssignmentItem assignment={assignment} />
      ));
    }

    // see devConn dashboard for scenario no assignments
    return (
      <div className="engineer">
        <div className="container align-top">
          <h1 className="display-4 text-center">ENGINEER DASHBOARD</h1>
          <br />
          <p className="lead text-muted">Welcome {user.username}</p>
          <div className="btn-group mb-4" role="group">
            <button
              className="btn btn-dark"
              data-toggle="modal"
              data-target="#vacModal"
            >
              <i className="fas fa-plane text-info mr-1" /> Request Vacation
            </button>
          </div>
          <table className="table table-hover">
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
            {assignmentsContent}
            <tbody />
            <tfoot className="bg-info">
              <tr>
                <th scope="col">Totals:</th>
                {totals}
              </tr>
            </tfoot>
          </table>
          <VacModal />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignment: state.assignment
});

export default connect(
  mapStateToProps,
  { getAssignments }
)(Dashboard);
