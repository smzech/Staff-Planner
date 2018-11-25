import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

import EngView from './EngineerView';

class RosterItem extends Component {
  getCols = () => {
    const { engineer } = this.props;
    let name = engineer.first + ' ' + engineer.last;
    let cols = [];

    cols.push(
      <tr>
        <th scope="row" className="text-light">
          <Link to="/engineer-view" className="roster-link">
            {engineer.eid}
          </Link>
        </th>
        <td>{engineer.last}</td>
        {this.getMonthVals()}
      </tr>
    );

    return cols;
  };

  getMonthVals = () => {
    const { engineer } = this.props;
    let cols = [];
    let color = '';
    let monthSum = 0;
    let percent = 0;

    // loop 0-6 or curr month to curr month+6
    for (let i = 0; i < 6; i++) {
      monthSum = 0;
      engineer.assignments.forEach(assignment => {
        assignment.tasks.forEach(task => {
          if (task.month === i) {
            monthSum += task.hours;
          }
        });
      });
      percent = Math.floor((monthSum / 160.0) * 100);

      if (percent >= 90 && percent <= 110) {
        color = 'text-success';
      } else if (percent >= 80 && percent <= 120) {
        color = 'text-warning';
      } else {
        color = 'percentDanger';
      }

      cols.push(<td className={color}>{percent} %</td>);
    }

    return cols;
  };

  render() {
    const { assignment } = this.props;
    let cols = this.getCols();

    return cols;
  }
}

export default RosterItem;
