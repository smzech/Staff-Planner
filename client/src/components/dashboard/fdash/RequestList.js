import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGlobalRoster } from '../../../actions/engineerActions';

class RequestList extends Component {
  componentDidMount() {
    this.props.getGlobalRoster();
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
          <h3>REQUEST LIST</h3>
        </div>
      </div>
    );
  }
}

RequestList.propTypes = {
  getGlobalRoster: PropTypes.func.isRequired
};

export default connect(
  null,
  { getGlobalRoster }
)(withRouter(RequestList));
