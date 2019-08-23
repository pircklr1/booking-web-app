import React from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react'
import LoadingButton from '../components/LoadingButton'
import useForm from "../components/UseLoginForm";
import validate from '../validation/LoginPageValidationRules';
import {handleLogin} from '../service/ClientService';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
        const {
            values,
            errors,
            handleChange,
            handleSubmit,
        }=useForm(login, validate)

    const [toHome, setToHome] = useState(false);

        function login() {
            handleLogin(values)
                .then(res => {
                    if(res) {
                        setToHome(true)
                    } else {
                        alert('Sisäänkirjautuminen epäonnistui')
                    }
                })
        }

    return (
        <div className='form-container'>
            {toHome ? <Redirect to="/home" /> : null}
            <Form onSubmit={handleSubmit}>
                <h1>Kirjaudu</h1>
                <Form.Input
                    label='Sähköposti'
                    placeholder='Sähköposti...'
                    name='email'
                    type='text'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={handleChange}
                />
                <Form.Input
                    label='Salasana'
                    placeholder='Salasana...'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={handleChange}
                    />
                <a href="/forgot">Unohtuiko salasana?</a> <br/>
                <br/>
                <Button type='submit' primary>
                    Kirjaudu
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
            <div className="ui message">
                Ei vielä tunnuksia? <a href="/signup">Rekisteröidy</a>
            </div>
        </div>
    );
    }

export default Login;
