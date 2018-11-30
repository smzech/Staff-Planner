import React, { Component } from 'react';

// FORM TO EDIT ASSIGNMENT
class EditAssignment extends Component {
  render() {
    return (
      <div className="assignment edit">
        <div className="container">
          {JSON.stringify(this.props.location.state.assignment)}
        </div>
      </div>
    );
  }
}

export default EditAssignment;
