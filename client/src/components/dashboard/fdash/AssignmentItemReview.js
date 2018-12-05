import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

// Same as Assignment Item but Edit button removed
class AssignmentItem extends Component {
  createTasks = () => {
    const { assignment } = this.props;
    const { request } = this.props;
    let tasks;
    //const { tasks } = this.props.assignment;
    if (assignment.pid === request.pid && request.reqtype === 'delta') {
      tasks = this.props.request.tasks;
    } else {
      tasks = this.props.assignment.tasks;
    }

    let cols = [];

    // zero load array
    for (let i = 0; i < 6; i++) {
      cols.push(<td>0</td>);
    }

    // skip if delete
    if (!(request.reqtype === 'delete' && assignment.pid === request.pid)) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].month >= 0 && tasks[i].month < 6)
          cols[tasks[i].month] = <td>{tasks[i].hours}</td>;
      }
    }

    // change vacation request Cell
    if (assignment.pid === request.pid && request.reqtype === 'vacation') {
      request.tasks.forEach(task => {
        cols[task.month] = <td>{task.hours}</td>;
      });
    }

    return cols;
  };

  render() {
    const { assignment } = this.props;
    const { request } = this.props;
    let tasks = this.createTasks();
    let cellColor = '';

    if (assignment.pid === request.pid) {
      switch (request.reqtype) {
        case 'delta': {
          cellColor = 'RequestRow';
          break;
        }
        case 'delete': {
          cellColor = 'bg-danger';
          break;
        }
        case 'vacation': {
          cellColor = 'RequestRow';
          break;
        }
        default: {
        }
      }
    }

    return (
      <tr className={cellColor}>
        <th scope="row">{assignment.name}</th>
        {tasks}
      </tr>
    );
  }
}

export default AssignmentItem;
