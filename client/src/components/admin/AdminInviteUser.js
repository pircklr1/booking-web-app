import {Button, Form, Message} from "semantic-ui-react";
import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

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

    sendInvitationEmail = async (e) => {
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
                    baseUrl + '/inviteNewUser',
                    {
                        email,
                    },
                );
                // console.log(response.data);
                if (response.data === 'invitation email sent') {
                    this.setState({
                        showError: false,
                        messageFromServer: 'invitation email sent',
                        showNullError: false,
                    });
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email already in db') {
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
            <div className='form-container' style={{backgroundColor: 'white',
                paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
                paddingRight: '20px'}}>
                <h2>Kutsu uusi käyttäjä</h2>
                <Form onSubmit={this.sendInvitationEmail}>
                    <Form.Input
                        id="email"
                        label="Anna kutsuttavan käyttäjän sähköpostiosoite:"
                        value= {email}
                        onChange={this.handleChange('email')}
                        placeholder="Sähköpostiosoite"
                    />
                    <Button type='submit' primary>
                        Kutsu käyttäjäksi
                    </Button>
                </Form>
                &nbsp;
                <div>
                    {showNullError && (
                        <Message negative>
                            <Message.Header>Syötä sähköpostiosoite!</Message.Header>
                        </Message>
                    )}
                    {showError && (
                        <Message negative>
                            <Message.Header>
                                Sähköpostiosoitteella on jo olemassa oleva käyttäjätili! Tarkista sähköpostiosoite tai pyydä käyttäjää kirjautumaan sisään.
                            </Message.Header>
                        </Message>
                    )}
                    {messageFromServer === 'invitation email sent' && (
                        <Message positive>
                            <Message.Header>Käyttäjälle on lähetetty rekisteröitymiskutsu.</Message.Header>
                        </Message>
                    )}
                </div>
            </div>
        );
    }
}
export default ForgotPassword;