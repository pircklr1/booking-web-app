// This page shows the current user's settings. Here, the user can also modify his or her email and password.

import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import isEmpty from '../validation/is-empty';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email2: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user.user) {
      const user = nextProps.user.user;

      // If user field doesnt exist, make empty string
      user.email = !isEmpty(user.email) ? user.email : '';
      user.password = !isEmpty(user.password) ? user.password : '';

      // Set component fields state
      this.setState({
        email: user.email,
        password: user.password
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.Settings(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='form-container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
        >
          <h1>Register</h1>
          <Form.Input
            label='Change email'
            placeholder='New email'
            name='email'
            type='text'
            value={values.email}
            error={errors.email ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label='Confirm new email'
            placeholder='Confirm new email'
            name='confirmEmail'
            type='text'
            value={values.email}
            error={errors.email ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label='Change Password'
            placeholder='New password'
            name='password'
            type='password'
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label='Confirm new password'
            placeholder='Confirm new password'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}
          />
          <Button type='submit' primary>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Settings;
