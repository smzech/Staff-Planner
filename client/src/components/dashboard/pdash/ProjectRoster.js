import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getProjectAssignments } from '../../../actions/assignmentActions';
import ProjectRosterItem from './ProjectRosterItem';

class ProjectRoster extends Component {
  componentDidMount() {
    const { project } = this.props.location.state;
    const prjID = {
      pid: project.pid
    };
    this.props.getProjectAssignments(prjID);
  }

  render() {
    const { project } = this.props.location.state;
    const { assignments, loading } = this.props.assignment;

    let rosterContent;

    if (assignments === null || loading) {
      rosterContent = <Spinner />;
    } else {
      // globalRosterContent = global.map(engineer => (
      //   <GlobalItem engineer={engineer} key={engineer._id} />
      // ));
      rosterContent = assignments.map(assignment => (
        <ProjectRosterItem assignment={assignment} />
      ));
    }

    return (
      <div>
        <h3>Roster for project {project.name}</h3>
        <br />
        <div label="Roster">
          <table class="table table-dark table-hover text-center">
            <thead>
              <tr>
                <th scope="col">EID</th>
                <th scope="col">Name</th>
                <th scope="col">Jan</th>
                <th scope="col">Feb</th>
                <th scope="col">Mar</th>
                <th scope="col">Apr</th>
                <th scope="col">May</th>
                <th scope="col">Jun</th>
                <th scope="col">Change</th>
              </tr>
            </thead>
            <tbody>{rosterContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

ProjectRoster.propTypes = {
  auth: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getProjectAssignments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignment: state.assignment,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProjectAssignments }
)(ProjectRoster);
