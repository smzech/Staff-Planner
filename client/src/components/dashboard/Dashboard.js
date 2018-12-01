import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Edash from './edash/Dashboard';
import Fdash from './fdash/Dashboard';
import Pdash from './pdash/Dashboard';

class Dashboard extends Component {
  render() {
    let dashboard;
    switch (this.props.auth.user.privilege) {
      case 'e':
        dashboard = <Edash />;
        break;

      case 'f':
        dashboard = <Fdash />;
        break;

      case 'p': {
        dashboard = <Pdash />;
        break;
      }
      default: {
        dashboard = 'default';
        break;
      }
    }

    return (
      <div className="dashboard">
        <div className="container">{dashboard}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
