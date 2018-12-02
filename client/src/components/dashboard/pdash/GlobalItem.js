import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

class GlobalItem extends Component {
  getCols = () => {
    const { engineer } = this.props;
    let cols = [];

    cols.push(
      <tr>
        <td>{engineer.eid}</td>
        <td>{engineer.first}</td>
        <td>{engineer.last}</td>
        <td>{engineer.dept}</td>
        <td>
          <Link
            to={{
              pathname: '/request-form',
              state: {
                engineer: engineer
              }
            }}
            className="btn btn-success"
          >
            Request
          </Link>
        </td>
      </tr>
    );

    return cols;
  };

  render() {
    let cols = this.getCols();
    return cols;
  }
}

export default GlobalItem;
