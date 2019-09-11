import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class SettingsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            messageFromServer: '',
            updated: false,
            error: false,
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            isAdmin: false
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
        const {firstName, lastName, email, confirmEmail, isAdmin} = this.state;
        if (firstName.length < 2){
            this.setState({
                firstNameError: true,
                messageFromServer: 'check input'
            });
        }
        if (lastName.length < 2){
            this.setState({
                lastNameError: true,
                messageFromServer: 'check input'
            });
        }
        if (!/\S+@\S+\.\S+/.test(email)){
            this.setState({
                emailError: true,
                messageFromServer: 'check input'
            });
        }
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
                        email,
                        isAdmin
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
            firstName, lastName, email, error, updated, confirmEmail, messageFromServer, firstNameError,
            lastNameError, emailError
        } = this.state;

        if (error) {
            return (
                <div>
                    &nbsp;
                    <Message negative>
                        <Message.Header> Jotain meni vikaan! Kirjaudu sisään tai yritä myöhemmin uudelleen. </Message.Header>
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
                            error={firstNameError}
                            icon='user'
                            iconPosition='left'
                        />
                        <Form.Input
                            id="lastName"
                            label="Vaihda sukunimi:"
                            onChange={this.handleChange('lastName')}
                            value={lastName}
                            type="text"
                            placeholder="Sukunimi"
                            error={lastNameError}
                            icon='user'
                            iconPosition='left'
                        />
                        <Form.Input
                            id="email"
                            label="Vaihda sähköpostiosoite:"
                            onChange={this.handleChange('email')}
                            value={email}
                            type="email"
                            placeholder="Uusi sähköpostiosoite"
                            error={emailError}
                            icon='envelope'
                            iconPosition='left'
                        />
                        <Form.Input
                            id="confirmEmail"
                            label="Uusi sähköposti uudestaan:"
                            onChange={this.handleChange('confirmEmail')}
                            value={confirmEmail}
                            type="email"
                            placeholder="Uusi sähköpostiosoite uudestaan"
                            icon='envelope'
                            iconPosition='left'
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
                        <Message.Header>Sähköpostiosoitteen vahvistaminen epäonnistui! Tarkista, että syötteet ovat samat. </Message.Header>
                    </Message>
                )}
                {messageFromServer === 'check input' && (
                    <Message negative>
                        <Message.Header>Tarkista syötteet! </Message.Header>
                        <p>Kaikki kentät ovat pakollisia. Etu- ja sukunimen tulee olla vähintään 2 merkkiä pitkät,
                            ja sähköpostiosoitteen tulee olla muodossa esimerkki@esimerkki.esim </p>
                    </Message>
                )}
            </div>
        );
    }
}
export default SettingsForm;
