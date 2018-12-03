import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputGroup from '../../common/InputGroup';
import { getProjects } from '../../../actions/projectActions';
import { makeDeltaRequest } from '../../../actions/requestActions';

class RequestForm extends Component {
  constructor(props) {
    super(props);
    const { assignment } = this.props.location.state;

    this.state = {
      month0: assignment.tasks.find(task => task.month === 0)
        ? assignment.tasks.find(task => task.month === 0).hours
        : 0,
      month1: assignment.tasks.find(task => task.month === 1)
        ? assignment.tasks.find(task => task.month === 1).hours
        : 0,
      month2: assignment.tasks.find(task => task.month === 2)
        ? assignment.tasks.find(task => task.month === 2).hours
        : 0,
      month3: assignment.tasks.find(task => task.month === 3)
        ? assignment.tasks.find(task => task.month === 3).hours
        : 0,
      month4: assignment.tasks.find(task => task.month === 4)
        ? assignment.tasks.find(task => task.month === 4).hours
        : 0,
      month5: assignment.tasks.find(task => task.month === 5)
        ? assignment.tasks.find(task => task.month === 5).hours
        : 0,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { engineer } = this.props.location.state.assignment; // will be an array
    const { assignment } = this.props.location.state;

    // Tests...
    // console.log(JSON.stringify(this.props.auth));
    // console.log(this.props.auth.user.uid);

    const requestData = {
      eid: engineer[0].eid,
      pid: parseInt(assignment.pid),
      returnid: this.props.auth.user.uid,
      name: assignment.name,
      reqtype: 'delta',
      tasks: [
        {
          month: 0,
          hours: parseInt(this.state.month0)
        },
        {
          month: 1,
          hours: parseInt(this.state.month1)
        },
        {
          month: 2,
          hours: parseInt(this.state.month2)
        },
        {
          month: 3,
          hours: parseInt(this.state.month3)
        },
        {
          month: 4,
          hours: parseInt(this.state.month4)
        },
        {
          month: 5,
          hours: parseInt(this.state.month5)
        }
      ]
    };

    // debug
    console.log(requestData);

    // need history to push to dashboard in the actions file
    this.props.makeDeltaRequest(requestData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="request-form">
        <div className="container">
          {errors.assignment && (
            <div class="alert alert-danger" role="alert">
              {errors.assignment}
            </div>
          )}
          {errors.request && (
            <div class="alert alert-danger" role="alert">
              {errors.request}
            </div>
          )}
          {errors.hours ? (
            <div class="alert alert-danger" role="alert">
              {errors.hours}
            </div>
          ) : null}
          <div className="row">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
          </div>
          <h1 className="display-4">Request Form</h1>
          <br />
          <div className="col-md-8 m-au">
            <small className="d-block pd-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <small className="d-block pd-3">
                month fields must be integers between 0 and 160
              </small>
              <InputGroup
                placeholder="Hours"
                name="month0"
                month="Jan"
                value={this.state.month0}
                onChange={this.onChange}
                error={errors.month0}
              />
              <InputGroup
                placeholder="Hours"
                name="month1"
                month="Feb"
                value={this.state.month1}
                onChange={this.onChange}
                error={errors.month1}
              />
              <InputGroup
                placeholder="Hours"
                name="month2"
                month="Mar"
                value={this.state.month2}
                onChange={this.onChange}
                error={errors.month2}
              />
              <InputGroup
                placeholder="Hours"
                name="month3"
                month="Apr"
                value={this.state.month3}
                onChange={this.onChange}
                error={errors.month3}
              />
              <InputGroup
                placeholder="Hours"
                name="month4"
                month="May"
                value={this.state.month4}
                onChange={this.onChange}
                error={errors.month4}
              />
              <InputGroup
                placeholder="Hours"
                name="month5"
                month="Jun"
                value={this.state.month5}
                onChange={this.onChange}
                error={errors.month5}
              />
              <input
                type="submit"
                value="Submit Request"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RequestForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  makeDeltaRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects, makeDeltaRequest }
)(RequestForm);
