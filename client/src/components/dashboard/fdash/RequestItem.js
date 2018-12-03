import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
// import { Link } from 'react-router-dom';

// @info: same as AssignmentItem Review but specifically as new item for inits
class RequestItem extends Component {
  createTasks = () => {
    const { tasks } = this.props.request;
    let cols = [];

    // zero load array
    for (let i = 0; i < 6; i++) {
      cols.push(<td className="RequestRow">0</td>);
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].month >= 0 && tasks[i].month < 6)
        cols[tasks[i].month] = <td className="RequestRow">{tasks[i].hours}</td>;
    }

    return cols;
  };

  render() {
    const { request } = this.props;
    let tasks = this.createTasks();

    return (
      <tr>
        <th scope="row" className="RequestRow">
          {request.name}
        </th>
        {tasks}
      </tr>
    );
  }
}

export default RequestItem;
