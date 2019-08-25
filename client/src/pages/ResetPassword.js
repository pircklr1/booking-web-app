import {Button, Form} from "semantic-ui-react";
import React, { useContext, useState, useForm } from 'react';

function ResetPassword() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});

    return (
        <div className='form-container'>
            <Form>
                <h1>Vaihda salasana</h1>
                <Form.Input
                    label='Anna uusi salasana:'
                    placeholder='Uusi salasana...'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    //  onChange={onChange}
                />
                <Form.Input
                    label='Vahvista uusi salasana:'
                    placeholder='Uusi salasana uudestaan...'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    // onChange={onChange}
                />
                <Button type='submit' primary>
                    Tallenna salasanan muutos
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
export default ResetPassword;