import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
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

  render() {
    return (
      <div className="request-list">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h3>ENGINEER VIEW SHOW 1 ENG WITH ASSIGNMENTS</h3>
          <div>
            PAGE FOR EID: {JSON.stringify(this.props.location.state.eid)}
          </div>
          <div>ENGINEER: {JSON.stringify(this.props.engineer.engineer)}</div>
          <div>
            ASSIGNMENTS: {JSON.stringify(this.props.assignment.assignments)}
          </div>
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
