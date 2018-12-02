import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getRequests } from '../../../actions/requestActions';
import RequestCard from './RequestCard';

class RequestList extends Component {
  componentDidMount() {
    this.props.getRequests();
  }

  render() {
    const { requests, loading } = this.props.request;
    let requestContent;

    if (requests === null || loading) {
      requestContent = <Spinner />;
    } else {
      requestContent = requests.map(request => (
        <RequestCard request={request} key={request._id} />
      ));
    }

    return (
      <div className="request-list">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h3 className="display-4">REQUEST LIST</h3>
          <br />
          {requestContent}
        </div>
      </div>
    );
  }
}

RequestList.propTypes = {
  getRequests: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request
});

export default connect(
  mapStateToProps,
  { getRequests }
)(withRouter(RequestList));
