import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputGroup from '../../common/InputGroup';

// FORM TO EDIT ASSIGNMENT
// this.props.location.state.assignment
class EditAssignment extends Component {
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

    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const { assignment } = this.props.location.state;
    const { errors } = this.state;

    return (
      <div className="assignment edit">
        <div className="container">
          <h1 className="display-4">
            <span className="mr-3">Edit Assignment</span>
            <span>{assignment.name}</span>
          </h1>
          <br />
          <div className="col-md-8 m-au">
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

export default EditAssignment;
