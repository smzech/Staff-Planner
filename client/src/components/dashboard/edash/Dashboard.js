import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ENGINEER DASHBOARD
class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className="engineer">
        <div className="container align-top">
          <h1 className="display-4 text-center">ENGINEER DASH</h1>
          <p className="lead text-muted">Welcome {user.username}</p>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
