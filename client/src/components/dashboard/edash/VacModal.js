import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';

class VacModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      hours: '',
      errors: {
        hours: 'bad'
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

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
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <h5 className="modal-lable">Month:</h5>
                <input className="form-control form-control-lg" />
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
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacModal;
