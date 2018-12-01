import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

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

    // NEED TO CHANGE THIS ROUTE
    cols.push(
      <td>
        <span className="mr-1">
          <Link
            className="btn btn-success"
            to={{
              pathname: '/request-form',
              state: {
                assignment: this.props.assignment
              }
            }}
          >
            Request
          </Link>
        </span>
        <span>
          <div className="btn btn-danger">delete</div>
        </span>
      </td>
    );

    return cols;
  };

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

export default ProjectRosterItem;
