import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RequestItem extends Component {
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
              <Link
                className="btn btn-info mr-2"
                to={{
                  pathname: '/request-form',
                  state: {
                    request: request
                  }
                }}
              >
                Edit
              </Link>
            </span>
            <span>
              <div className="btn btn-danger">Delete</div>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestItem;
