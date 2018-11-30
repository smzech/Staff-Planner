import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';

class RequestCard extends Component {
  render() {
    const { request } = this.props;
    // CHECK FOR NULL REQUESTS

    let requestCardContent;

    if (request === null) {
      requestCardContent = <h3>NO CURRENT REQUESTS</h3>;
    } else {
      requestCardContent = (
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <p className="text-center">
                <b>Request Type:</b>
              </p>
              <p className="text-center">
                {request.name === 'Vacation' ? 'Vacation' : request.reqtype}
              </p>
            </div>
            <div className="col-md-10">
              <p>
                <b>Project Name: </b>
                {request.name}
              </p>
              <p>
                <b>Requesting: </b>
                {request.eng[0].last}
              </p>
              <span>
                <Link
                  className="btn btn-info mr-1"
                  to={{
                    pathname: '/assignment',
                    state: {
                      request: request
                    }
                  }}
                >
                  Select
                </Link>
              </span>
            </div>
          </div>
        </div>
      );
    }

    return <>{requestCardContent}</>;
  }
}

RequestCard.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(RequestCard);
