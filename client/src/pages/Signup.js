import React from 'react';
import { Button, Icon, Input, Form, Message } from 'semantic-ui-react'
import useForm from "../components/UseLoginForm";
import validate from '../components/SignupPageValidationRules';
import {handleSignup} from '../service/ClientService';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    }=useForm(signup, validate)

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
    }

export default Signup;