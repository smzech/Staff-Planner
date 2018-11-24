import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import Tabs from '../../common/Tabs';

// FM DASHBOARD
class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    const { engineer, roster, global } = this.props.engineer;
    const { assignments, loading } = this.props.assignment;

    let count = 'COUNT';

    return (
      <div className="functionalManager">
        <div className="container align-top">
          <h1 className="display-4 text-center">
            FUNCTIONAL MANAGER DASHBOARD
          </h1>
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
          <div label={<b>Roster</b>}>
            <table class="table table-sm table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div label={<b>Global Roster</b>}>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
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
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  engineer: state.engineer,
  assignment: state.assignment
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
