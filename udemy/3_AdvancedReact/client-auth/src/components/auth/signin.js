import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error = null } }) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
);

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    // console.log('HANDLE SUBMIT', email, password);
    // log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          type="text"
          component={renderField}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          component={renderField}
        />
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

export default Signin = connect(mapStateToProps, actions)(Signin);
