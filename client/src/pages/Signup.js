<<<<<<< HEAD
// This component handles the rendering of signup page,
// its connection to backend, and redirecting to homepage in case user is already logged in.
=======
import React from 'react';
import { Button, Icon, Input, Form, Message } from 'semantic-ui-react'
import useForm from "../components/UseLoginForm";
import validate from '../validation/SignupPageValidationRules';
import {handleSignup} from '../service/ClientService';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';
>>>>>>> 9c33c0cbafa9bafd767201c629c181fa22889744

import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import validate from '../validation/SignupPageValidationRules';

<<<<<<< HEAD
import axios from 'axios';
const baseUrl = 'http://localhost:9999/api';
function Signup(props) {
  //Check if user is already logged in. If so, push user to homepage.
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    props.history.push('/home');
  }

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      addUser();
=======
    const [toHome, setToHome] = useState(false);
    const [success, setSuccess] = useState(false);

    function signup() {
        handleSignup(values)
            .then(res => {
                if(res) {
                    setSuccess(true)
                    setTimeout(function () {
                        console.log('näin')
                        setToHome(true)
                    }, 3000)
                } else {
                    alert('Tunnusten luonti ei onnistunut')
                }
            })
    }
        return (
            
            <div className='form-container'>
                {toHome ? <Redirect to="/login" /> : null}
                <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <Form.Input
                        label='Firstname'
                        placeholder='Firstname'
                        name='firstName'
                        type='text'
                        value={values.firstName}
                        error={errors.firstName ? true : false}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Lastname'
                        placeholder='Lastname'
                        name='lastName'
                        type='text'
                        value={values.lastName}
                        error={errors.lastName ? true : false}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Email'
                        placeholder='Email'
                        name='email'
                        type='text'
                        value={values.email}
                        error={errors.email ? true : false}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Password'
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Confirm password'
                        placeholder='Confirm password'
                        name='confirmPassword'
                        type='password'
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={handleChange}
                    />
                    {success ? <Message positive>
                        <Message.Header>Käyttäjätunnus luotu onnistuneesti!</Message.Header>
                        <p>Pääset kirjautumaan sisään kun ylläpitäjä on hyväksynyt käyttäjätunnuksesi.</p>
                    </Message> : null}
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
>>>>>>> 9c33c0cbafa9bafd767201c629c181fa22889744
    }
  }, [errors]);

  const onSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const onChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  function addUser() {
    axios
      .post(baseUrl + '/users/register', values)
      .then(response => {
        if (response.status === 200) {
          props.history.push('/login');
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        setErrors(error.response.data);
      });
  }

  function registerUser() {
    addUser();
  }

  return (
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          <Icon name='registered' /> Rekisteröidy
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              //label='Etunimi'
              placeholder='Etunimi'
              name='firstName'
              type='text'
              value={values.firstName}
              error={errors.firstName ? true : false}
              onChange={onChange}
            />
            <Form.Input
              //label='Sukunimi'
              icon='user'
              iconPosition='left'
              placeholder='Sukunimi'
              name='lastName'
              type='text'
              value={values.lastName}
              error={errors.lastName ? true : false}
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon='envelope'
              iconPosition='left'
              //label='Sähköpostiosoite'
              placeholder='Sähköpostiosoite'
              name='email'
              type='text'
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              //label='Salasana'
              placeholder='Salasana'
              name='password'
              type='password'
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              //label='Salasanan vahvistus'
              placeholder='Salasanan vahvistus'
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
            />
            <Button color='blue' fluid size='large'>
              Rekisteröidy
            </Button>
          </Segment>
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
      </Grid.Column>
    </Grid>
  );
}

export default Signup;
