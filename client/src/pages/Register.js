import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const baseUrl = 'http://localhost:9999/api';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            messageFromServer: '',
            updated: false,
            error: false,
            firstNameError: false,
            lastNameError: false,
            passwordError: false,
            redirect: false
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: {token},
            },
        } = this.props;
        try {
            const response = await axios.get(baseUrl + '/users/checkRegistrationToken', {
                params: {
                    registerUserToken: token,
                },
            });
            console.log(response.data);
            if (response.data.message === 'registration link ok') {
                this.setState({
                    email: response.data.email,
                    updated: false,
                    error: false,
                });
            }
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                updated: false,
                error: true,
            });
        }
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    registerUser = async (e) => {
        e.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = this.state;
        const {
            match: {
                params: {token},
            },
        } = this.props;
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
        if (password.length < 8){
            this.setState({
                passwordError: true,
                messageFromServer: 'check input'
            });
        }
        if (password !== confirmPassword) {
            this.setState({
                messageFromServer: 'passwords are not a match',
                password: '',
                confirmPassword: ''
            });
        } else {
            try {
                const response = await axios.put(
                    baseUrl + '/users/register',
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                        registerUserToken: token,
                    },
                );
                console.log(response.data);
                if (response.data.message === 'user updated') {
                    this.setState({
                        updated: true,
                        error: false,
                    });
                    setTimeout(() => {
                        this.setState({
                            redirect: true
                        })
                    }, 2000);
                } else {
                    this.setState({
                        updated: false,
                        error: true
                    });
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    render() {
        const {
            firstName, lastName, password, error, updated, confirmPassword, email,
            messageFromServer, firstNameError, lastNameError, passwordError, redirect
        } = this.state;

        if (error) {
            return (
                <div>
                    <Message negative>
                        <Message.Header>Rekisteröitymislinkki on virheellinen tai vanhentunut!
                            Kirjaudu sisään tunnuksillasi tai pyydä adminia lähettämään uusi rekisteröitymislinkki.
                        </Message.Header>
                    </Message>
                </div>
            );
        }
        if (redirect) {
            return (
                <Redirect to={'/login'} />
            )
        }
        return (
            <Grid textAlign='center' style={{height: '70vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='blue' textAlign='center'>
                        Rekisteröidy
                    </Header>
                    <Form size='large' onSubmit={this.registerUser}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Etunimi'
                                name='firstName'
                                type='text'
                                value={firstName}
                                error={firstNameError}
                                onChange={this.handleChange('firstName')}
                            />
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                placeholder='Sukunimi'
                                name='lastName'
                                type='text'
                                value={lastName}
                                error={lastNameError}
                                onChange={this.handleChange('lastName')}
                            />
                            <Form.Input
                                fluid
                                icon='envelope'
                                iconPosition='left'
                                placeholder='Sähköpostiosoite'
                                name='email'
                                type='text'
                                value={email}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Salasana'
                                name='password'
                                type='password'
                                value={password}
                                error={passwordError}
                                onChange={this.handleChange('password')}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Salasanan vahvistus'
                                name='confirmPassword'
                                type='password'
                                value={confirmPassword}
                                onChange={this.handleChange('confirmPassword')}
                            />
                            <Button color='blue' fluid size='large'>
                                Rekisteröidy
                            </Button>
                        </Segment>
                    </Form>
                    &nbsp;
                    <div>
                        {updated && (
                            <Message positive>
                                <Message.Header>
                                    Käyttäjätunnuksen luonti onnistui!
                                </Message.Header>
                                <p>
                                    Voit nyt kirjautua sisään sähköpostiosoitteellasi ja salasanallasi.
                                </p>
                            </Message>
                        )}
                        {messageFromServer === 'passwords are not a match' && (
                            <Message negative>
                                <Message.Header>Salasanan vahvistaminen epäonnistui. Syötä uusi salasana
                                    uudestaan.</Message.Header>
                            </Message>
                        )}
                        {messageFromServer === 'check input' && (
                            <Message negative>
                                <Message.Header>Tarkista syötteet!</Message.Header>
                                <p>Kaikki kentät ovat pakollisia. Salasanan tulee olla vähintään 8 merkkiä pitkä.</p>
                            </Message>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;