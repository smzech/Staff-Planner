import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PostItem extends Component {
  render() {
    const { request } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <i className="fas fa-info-circle text-center RequestIcon" />
            <br />
            <p className="text-center">
              <b>{request.eng[0].last}</b>
            </p>
          </div>
          <div className="col-md-10">
            <p>Project Name: {request.name}</p>
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
}

PostItem.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
