import {Button, Form, Message} from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

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
                const response = await axios.post(
                    baseUrl + '/forgot',
                    {
                        email,
                    },
                );
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
                    &nbsp;
                    <div>
                {showNullError && (
                    <Message negative>
                        <Message.Header>Syötä sähköpostiosoitteesi!</Message.Header>
                    </Message>
                )}
                {showError && (
                    <Message negative>
                        <Message.Header>
                            Sähköpostiosoitteella ei löytynyt käyttäjätiliä! Tarkista sähköpostiosoite tai rekisteröidy käyttäjäksi.
                        </Message.Header>
                    </Message>
                )}
                {messageFromServer === 'recovery email sent' && (
                    <Message positive>
                        <Message.Header>Sinulle on lähetetty sähköpostiviesti salasanan vaihtamiseksi.</Message.Header>
                    </Message>
                )}
                    </div>
            </div>
        );
    }
}
export default ForgotPassword;