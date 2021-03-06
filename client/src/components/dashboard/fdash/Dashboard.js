import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import Tabs from '../../common/Tabs';
import { getRoster, getGlobalRoster } from '../../../actions/engineerActions';
import { getRequestCount } from '../../../actions/requestActions';
import RosterItem from './RosterItem';
import GlobalItem from './GlobalItem';

// @name: FM DASHBOARD
// @route: /dashboard
// @desc: home page for FM logins
class Dashboard extends Component {
  componentDidMount() {
    this.props.getRoster();
    this.props.getGlobalRoster();
    this.props.getRequestCount();
  }

  render() {
    const { user } = this.props.auth;
    const { engineer, roster, global } = this.props.engineer;
    const eLoading = this.props.engineer.loading;
    //const { assignments, loading } = this.props.assignment;

    let count = this.props.request.count;
    //let count;
    let rosterContent;
    let globalRosterContent;

    if (roster === null || eLoading) {
      rosterContent = <Spinner />;
    } else {
      rosterContent = roster.map(engineer => (
        <RosterItem engineer={engineer} key={engineer._id} />
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
          <h3 className="display-4 text-center">
            FUNCTIONAL MANAGER DASHBOARD
          </h3>
          <br />
          <p className="lead text-muted">Welcome {user.username}</p>
        </div>
        <div className="btn-group mb-4" role="group">
          <Link to="/request-list" className="btn btn-info">
            <i className="fas fa-file-signature text-dark mr-1" /> View Requests
            {' ('}
            {count}
            {')'}
          </Link>
        </div>
        <Tabs>
          <div label="Roster">
            <table class="table table-dark table-hover">
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
                </tr>
              </thead>
              <tbody>{rosterContent}</tbody>
            </table>
          </div>
          <div label="Global Roster">
            <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">EID</th>
                  <th scope="col">Last</th>
                  <th scope="col">First</th>
                  <th scope="col">Dept</th>
                </tr>
              </thead>
              <tbody>{globalRosterContent}</tbody>
            </table>
          </div>
        </Tabs>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  engineer: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  //assignments: PropTypes.object.isRequired,
  getGlobalRoster: PropTypes.func.isRequired,
  getRoster: PropTypes.func.isRequired,
  getRequestCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  request: state.request
  //assignment: state.assignment
});

export default connect(
  mapStateToProps,
  { getRoster, getGlobalRoster, getRequestCount }
)(Dashboard);
