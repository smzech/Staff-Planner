import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class RequestList extends Component {
  render() {
    return (
      <div className="request-list">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h3>REQUEST LIST</h3>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(withRouter(RequestList));
