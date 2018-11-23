import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VacModal from './VacModal';
import Spinner from '../../common/Spinner';
import { getAssignments } from '../../../actions/assignmentActions';

// ENGINEER DASHBOARD
class Dashboard extends Component {
  componentDidMount() {
    this.props.getAssignments(this.props.auth.user.eid);
  }

  render() {
    const { user } = this.props.auth;
    const { assignments, loading } = this.props.assignment;

    let assignmentsContent;

    if (assignments === null || loading) {
      assignmentsContent = <Spinner />;
    } else {
      assignmentsContent = JSON.stringify(assignments);
    }

    // see devConn dashboard for scenario no assignments
    return (
      <div className="engineer">
        <div className="container align-top">
          <h1 className="display-4 text-center">ENGINEER DASHBOARD</h1>
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
          <div className="static-modal" />;<div>{assignmentsContent}</div>
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
