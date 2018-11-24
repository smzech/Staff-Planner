import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import {
  makeVacationRequest,
  clearSuccess
} from '../../../actions/requestActions';

class VacModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      hours: '',
      request: this.props.request,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // this is where the error checking will display
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.request) {
      this.setState({ request: newProps.request });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.clearSuccess();

    const newRequest = {
      month: this.state.month,
      hours: parseInt(this.state.hours)
    };

    this.props.makeVacationRequest(newRequest);
    this.setState({ month: '' });
    this.setState({ hours: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, request } = this.state;

    // Select options for month
    const options = [
      {
        label: '* Select Month to Request',
        value: -1
      },
      { label: 'January', value: 0 },
      { label: 'February', value: 1 },
      { label: 'March', value: 2 },
      { label: 'April', value: 3 },
      { label: 'May', value: 4 },
      { label: 'June', value: 5 },
      { label: 'July', value: 6 },
      { label: 'August', value: 7 },
      { label: 'September', value: 8 },
      { label: 'October', value: 9 },
      { label: 'November', value: 10 },
      { label: 'December', value: 11 }
    ];

    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="vacModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            {errors.hours || errors.month ? (
              <div class="alert alert-danger" role="alert">
                ERROR: INVALID INPUT
              </div>
            ) : null}
            {request.success ? (
              <div class="alert alert-success" role="alert">
                Request Submitted
              </div>
            ) : null}
            <div className="modal-header">
              <div className="modal-title" />
              <h4 className="modal-title text-md-center" id="exampleModalLabel">
                Request Vacation
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.setState({
                    month: '',
                    hours: ''
                  });
                  this.props.clearSuccess();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="modal-body">
                <p>
                  <SelectListGroup
                    placeholder="Month"
                    name="month"
                    value={this.state.month}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                    info="What month to request"
                  />
                </p>
                <p>
                  <h5 className="modal-lable">Hours:</h5>
                  <TextFieldGroup
                    placeholder="Enter Hours"
                    name="hours"
                    value={this.state.hours}
                    onChange={this.onChange}
                    error={errors.hours}
                    info="Request vaction hours betwee 1 and 160"
                  />
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    this.setState({
                      month: '',
                      hours: '',
                      submitted: false
                    });
                    this.props.clearSuccess();
                  }}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

VacModal.propTypes = {
  makeVacationRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  request: state.request
});

export default connect(
  mapStateToProps,
  { makeVacationRequest, clearSuccess }
)(VacModal);
