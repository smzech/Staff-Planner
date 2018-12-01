import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';

class ProjectCard extends Component {
  render() {
    const { project } = this.props;

    let projectCardContent;

    if (project === null) {
      projectCardContent = <h3>NO CURRENT PROJECTS</h3>;
    } else {
      projectCardContent = (
        <Link
          to={{
            pathname: '/project-roster',
            state: {
              project: project
            }
          }}
          className="projectCard"
        >
          <div className="card bg-dark text-white mb-3 projectCard">
            <div className="card-body">
              <div className="row text-center">
                <h3 className="text-center ml-3">
                  <span className="mr-3">PROJECT:</span>
                  <span>{project.name}</span>
                </h3>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    return <>{projectCardContent}</>;
  }
}

ProjectCard.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ProjectCard);
