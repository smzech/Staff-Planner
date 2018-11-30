import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

class AssignmentItem extends Component {
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
        <Link
          className="btn btn-primary"
          to={{
            pathname: '/edit-assignment',
            state: {
              assignment: this.props.assignment
            }
          }}
        >
          Edit
        </Link>
      </td>
    );

    return cols;
  };

  render() {
    const { assignment } = this.props;
    let tasks = this.createTasks();

    return (
      <tr>
        <th scope="row">{assignment.name}</th>
        {tasks}
      </tr>
    );
  }
}

export default AssignmentItem;
