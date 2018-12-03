import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeDeleteRequest } from '../../../actions/requestActions';

class ProjectRosterItem extends Component {
  createTasks = () => {
    const { tasks } = this.props.assignment;
    let cols = [];

    // zero load array
    for (let i = 0; i < 6; i++) {
      cols.push(<td>0</td>);
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].month >= 0 && tasks[i].month < 6)
        cols[tasks[i].month] = <td>{tasks[i].hours}</td>;
    }

    cols.push(
      <td>
        <span className="mr-1">
          <Link
            className="btn btn-success"
            to={{
              pathname: '/request-change',
              state: {
                assignment: this.props.assignment
              }
            }}
          >
            Request
          </Link>
        </span>
        <span>
          <div
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this)}
          >
            delete
          </div>
        </span>
      </td>
    );

    return cols;
  };

  onDeleteClick(e) {
    e.preventDefault();
    const { assignment } = this.props;

    const requestData = {
      eid: assignment.eid,
      pid: assignment.pid,
      returnid: this.props.auth.user.uid,
      name: assignment.name,
      reqtype: 'delete',
      tasks: []
    };

    console.log(requestData);
    this.props.makeDeleteRequest(requestData);
  }

  render() {
    const { assignment } = this.props;
    let tasks = this.createTasks();

    return (
      <tr>
        <th scope="row">
          {assignment.engineer ? assignment.engineer[0].eid : null}
        </th>
        <td scope="row">
          {assignment.engineer ? assignment.engineer[0].last : null}
        </td>
        {tasks}
      </tr>
    );
  }
}

ProjectRosterItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  makeDeleteRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { makeDeleteRequest }
)(ProjectRosterItem);
