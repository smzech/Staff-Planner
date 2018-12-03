import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRequest } from '../../../actions/requestActions';

class RequestItem extends Component {
  onDeleteClick() {
    const { request } = this.props;

    const objID = {
      id: request._id
    };

    this.props.deleteRequest(objID);
  }

  render() {
    const { request } = this.props;

    return (
      <div className="card bg-dark text-white card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">
              <b>Request Type:</b>
            </p>
            <p className="text-center">
              {request.name === 'Vacation'
                ? 'Vacation'
                : request.reqtype.toUpperCase()}
            </p>
          </div>
          <div className="col-md-10">
            <p>
              <b>Project Name: </b>
              {request.name}
            </p>
            <p>
              <b>Requesting: </b>
              {request.eid}
            </p>
            <span>
              <button
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this)}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

RequestItem.propTypes = {
  request: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteRequest }
)(RequestItem);
