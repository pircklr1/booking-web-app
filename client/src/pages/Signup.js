import React from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react'
import useForm from "../components/UseLoginForm";
import validate from '../components/LoginPageValidationRules';

const Signup = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    }=useForm(signup, validate)

    function signup() {
        console.log('No errors, submit callback called!');
    }
        return (
            <div className='form-container'>
                <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <Form.Input
                        label='Email'
                        placeholder='Email...'
                        name='email'
                        type='email'
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
                    <Form.Input
                        label='Confirm password'
                        placeholder='Confirm password'
                        name='confirmPassword'
                        type='password'
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={handleChange}
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

export default Signup;