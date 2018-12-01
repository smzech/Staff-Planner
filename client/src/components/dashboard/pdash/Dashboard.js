import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import Tabs from '../../common/Tabs';
import { getGlobalRoster } from '../../../actions/engineerActions';
import { getProjects } from '../../../actions/projectActions';
import ProjectCard from './ProjectCard';
import GlobalItem from './GlobalItem';

// @name: PM DASHBOARD
// @route: /dashboard
// @desc: home page for PM logins
class Dashboard extends Component {
  componentDidMount() {
    // get projects
    this.props.getGlobalRoster();
    this.props.getProjects();
  }

  render() {
    const { user } = this.props.auth;
    const { projects } = this.props.project;
    const { global } = this.props.engineer;
    const pLoading = this.props.project.loading;
    const eLoading = this.props.engineer.loading;

    let projectContent;
    let globalRosterContent;
    //let rosterContent;
    //let requestContent;

    if (projects === null || pLoading) {
      projectContent = <Spinner />;
    } else {
      projectContent = projects.map(project => (
        <ProjectCard project={project} key={project.pid} />
      ));
    }

    if (global === null || eLoading) {
      globalRosterContent = <Spinner />;
    } else {
      globalRosterContent = global.map(engineer => (
        <GlobalItem engineer={engineer} key={engineer._id} />
      ));
    }

    return (
      <div className="functionalManager">
        <div className="container align-top">
          <h1 className="display-4 text-center">PROJECT MANAGER DASHBOARD</h1>
          <br />
          <p className="lead text-muted">Welcome {user.username}</p>
        </div>
        <Tabs>
          <div label="Projects">{projectContent}</div>
          <div label="Global Roster">
            <table class="table table-dark table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">EID</th>
                  <th scope="col">Last</th>
                  <th scope="col">First</th>
                  <th scope="col">Dept</th>
                  <th scope="col">Request</th>
                </tr>
              </thead>
              <tbody>{globalRosterContent}</tbody>
            </table>
          </div>
          <div label="Outstanding Requests" />
        </Tabs>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  engineer: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  getGlobalRoster: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  assignment: state.assignment,
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects, getGlobalRoster }
)(Dashboard);
