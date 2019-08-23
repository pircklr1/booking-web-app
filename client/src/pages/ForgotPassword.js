import {Button, Form} from "semantic-ui-react";
import React from 'react';
import {sendForgotPasswordEmail} from "../service/ClientService";
import validate from '../validation/ForgotPasswordValidationRules';
import useForm from "../components/UseLoginForm"

const ForgotPassword = () => {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    }=useForm(forgot, validate);

    function forgot() {
        sendForgotPasswordEmail(values)
            .then(res => {
                if(res) {
                    alert('Sähköposti lähetetty salasanan palauttamista varten')
                } else {
                    alert('Sähköpostilla ei löytynyt käyttäjätiliä! Tarkista sähköposti.')
                }
            })
    }
    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit}>
                <h1>Palauta salasana</h1>
                <Form.Input
                    label='Anna sähköpostiosoitteesi:'
                    placeholder='Sähköpostiosoite...'
                    name='email'
                    type='email'
                    value={values.email}
                    error={!!errors.email}
                    onChange={handleChange}
                />
                <Button type='submit' primary>
                    Lähetä
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
export default ForgotPassword;