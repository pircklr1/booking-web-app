import {Button, Form} from "semantic-ui-react";
import React, { Component } from 'react';
import {sendForgotPasswordEmail} from "../service/ClientService";

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            showNullError: false,
        };
    }
    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sendEmail = async (e) => {
        e.preventDefault();
        const {email} = this.state;
        if (email === '') {
            this.setState({
                showError: false,
                messageFromServer: '',
                showNullError: true,
            });
        } else {
            try {
                const response = sendForgotPasswordEmail({email});
                console.log(response.data);
                if (response.data === 'recovery email sent') {
                    this.setState({
                        showError: false,
                        messageFromServer: 'recovery email sent',
                        showNullError: false,
                    });
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email not in db') {
                    this.setState({
                        showError: true,
                        messageFromServer: '',
                        showNullError: false,
                    });
                }
            }
        }
    };

    render() {
        const {
            email, messageFromServer, showNullError, showError
        } = this.state;
        return (
                <div className='form-container'>
                    <h1>Palauta salasana</h1>
                    <Form onSubmit={this.sendEmail}>
                        <Form.Input
                            id="email"
                            label="Anna sähköpostiosoitteesi:"
                            value= {email}
                            onChange={this.handleChange('email')}
                            placeholder="Sähköpostiosoite"
                        />
                        <Button type='submit' primary>
                            Lähetä salasanan palautusviesti
                        </Button>
                    </Form>
                {showNullError && (
                    <div>
                        <p>The email address cannot be null.</p>
                    </div>
                )}
                {showError && (
                    <div>
                        <p>
                            That email address isn&apos;t recognized. Please try again or
                            register for a new account.
                        </p>
                    </div>
                )}
                {messageFromServer === 'recovery email sent' && (
                    <div>
                        <h3>Password Reset Email Successfully Sent!</h3>
                    </div>
                )}
            </div>
        );
    }
}
export default ForgotPassword;