import React, { Component } from 'react';
import ProjectRosterItem from './ProjectRosterItem';

class ProjectRosterList extends Component {
  componentDidMount() {
    // get the assignments
  }

  render() {
    let rosterContent;

    if (this.props.roster === null) {
      rosterContent = null;
    } else {
      rosterContent = null;
    }

    return <>{rosterContent}</>;
  }
}

export default ProjectRosterList;
