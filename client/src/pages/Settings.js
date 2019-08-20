// This page shows the current user's settings. Here, the user can also modify his or her email and password.

import React, { useContext, useState, useForm } from 'react';
import { Button, Form } from 'semantic-ui-react';
import isEmpty from '../validation/is-empty';

function Settings() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  /*  
  const { onChange, onSubmit, values } = useForm({
    email: '',
    email2: '',
    password: '',
    password2: ''
  }); */

  return (
    <div className='form-container'>
      <h5>Here we will show the name of the user</h5>
      <Form>
        <h1>Settings</h1>
        <Form.Input
          label='Change email'
          placeholder='New email'
          name='email'
          type='text'
          value={values.email}
          error={errors.email ? true : false}
          // onChange={onChange}
        />
        <Form.Input
          label='Confirm new email'
          placeholder='Confirm new email'
          name='confirmEmail'
          type='text'
          value={values.email}
          error={errors.email ? true : false}
          // onChange={onChange}
        />
        <Form.Input
          label='Change Password'
          placeholder='New password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          //  onChange={onChange}
        />
        <Form.Input
          label='Confirm new password'
          placeholder='Confirm new password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          // onChange={onChange}
        />
        <Button type='submit' primary>
          Save changes
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

export default Settings;
