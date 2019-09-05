
import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class SettingsForm extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            messageFromServer: '',
            updated: false,
            error: false,
        };
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId');
        if (userId === null) {
            this.setState({
                error: true,
            });
        }
        try {
            const response = await axios.get(baseUrl + '/user/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('jwtToken')
                }
            });
            // console.log(response.data);
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                confirmEmail: response.data.email,
                error: false
            });
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                error: true
            });
        }
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updateUser = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const {firstName, lastName, email, confirmEmail, messageFromServer} = this.state;
        if (email !== confirmEmail) {
            this.setState({
                messageFromServer: 'emails are not a match',
            });
        } else {
            try {
                const response = await axios.put(
                    baseUrl + '/user/' + userId,
                    {
                        firstName,
                        lastName,
                        email
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            token: localStorage.getItem('jwtToken')
                        }
                    }
                );
                console.log(response.data);
                if (response.data.message === 'user updated') {
                    this.setState({
                        updated: true,
                        error: false,
                    });
                } else {
                    this.setState({
                        updated: false,
                        error: true,
                        firstName: '',
                        lastName: '',
                        email: ''
                    });
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    render() {
        const {
            firstName, lastName, email, error, updated, confirmEmail, messageFromServer
        } = this.state;

        if (error) {
            return (
                <div>
                    <Message negative>
                        <Message.Header> Jokin meni vikaan. Yritä myöhemmin uudelleen. </Message.Header>
                    </Message>
                </div>
            );
        }
        return (
            <div style={{
                backgroundColor: 'white',
                paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
                paddingRight: '20px'
            }}>
                <div className='form-container'>
                    <h4>Käyttäjätiedot</h4>
                    <Form className="update-form" onSubmit={this.updateUser}>
                        <Form.Input
                            id="firstName"
                            label="Vaihda etunimi:"
                            onChange={this.handleChange('firstName')}
                            value={firstName}
                            type="text"
                            placeholder="Etunimi"
                        />
                        <Form.Input
                            id="lastName"
                            label="Vaihda sukunimi:"
                            onChange={this.handleChange('lastName')}
                            value={lastName}
                            type="text"
                            placeholder="Sukunimi"
                        />
                        <Form.Input
                            id="email"
                            label="Vaihda sähköpostiosoite:"
                            onChange={this.handleChange('email')}
                            value={email}
                            type="email"
                            placeholder="Uusi sähköpostiosoite"
                        />
                        <Form.Input
                            id="confirmEmail"
                            label="Uusi sähköposti uudestaan:"
                            onChange={this.handleChange('confirmEmail')}
                            value={confirmEmail}
                            type="email"
                            placeholder="Uusi sähköpostiosoite uudestaan"
                        />
                        <Button type='submit' primary>
                            Tallenna muutokset
                        </Button>
                    </Form>
                    &nbsp;
                </div>
                {updated && (
                    <Message positive>
                        <Message.Header>
                            Tietosi on nyt päivitetty!
                        </Message.Header>
                    </Message>
                )}
                {messageFromServer === 'emails are not a match' && (
                    <Message negative>
                        <Message.Header>Sähköpostiosoitteen vahvistaminen epäonnistui. Syötä uusi sähköpostiosoite
                            uudestaan.</Message.Header>
                    </Message>
                )}
            </div>
        );
    }
}
export default SettingsForm;
