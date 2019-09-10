import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            emailError: false
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
        if (!/\S+@\S+\.\S+/.test(email)) {
            this.setState({
                emailError: true,
                messageFromServer: 'check input'
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
                if (response.data.email === email) {
                    this.setState({
                        showError: false,
                        messageFromServer: 'invitation email sent',
                        email: ''
                    });
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email already in db') {
                    this.setState({
                        showError: true,
                        messageFromServer: '',
                        email: ''
                    });
                }
            }
        }
    };

    render() {
        const {
            email, messageFromServer, showError, emailError
        } = this.state;
        return (
            <div>
                <Form onSubmit={this.sendInvitationEmail}
                      style={{border: '1px solid #2185D0', padding: 12, marginTop: 16}}>
                    <Form.Input
                        id="email"
                        label="Anna kutsuttavan käyttäjän sähköpostiosoite:"
                        value={email}
                        onChange={this.handleChange('email')}
                        placeholder="Sähköpostiosoite"
                        error={emailError}
                    />
                    <Button type='submit' primary>
                        Kutsu käyttäjäksi
                    </Button>
                </Form>
                &nbsp;
                <div>
                    {messageFromServer === 'check input' && (
                        <Message negative>
                            <Message.Header>Syötä sähköpostiosoite!</Message.Header>
                        </Message>
                    )}
                    {showError && (
                        <Message negative>
                            <Message.Header>
                                Sähköpostiosoitteella on jo olemassa oleva käyttäjätili tai käyttäjä on jo kutsuttu
                                rekisteröitymään!
                            </Message.Header>
                            <p>Mikäli käyttäjä ei ole rekisteröitynyt, ja on esim. kadottanut rekisteröitymissähköpostin,
                                poista käyttäjä alla olevasta listasta ja kutsu sen jälkeen uudestaan.</p>
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