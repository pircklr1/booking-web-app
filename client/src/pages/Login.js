import React from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react'
import LoadingButton from '../components/LoadingButton'
import useForm from "../components/UseLoginForm";
import validate from '../components/LoginPageValidationRules';

const Login = () => {
        const {
            values,
            errors,
            handleChange,
            handleSubmit,
        }=useForm(login, validate)

        function login() {
            console.log('No errors, submit callback called!');
        }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Form.Input
                    label='email'
                    placeholder='Email...'
                    name='email'
                    type='text'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={handleChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={handleChange}
                />
                <Button type='submit' primary>
                    Login
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

export default Login;
