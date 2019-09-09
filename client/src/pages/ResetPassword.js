import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            messageFromServer: '',
            updated: false,
            error: false,
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: {token},
            },
        } = this.props;
        try {
            const response = await axios.get(baseUrl + '/reset', {
                params: {
                    resetPasswordToken: token,
                },
            });
            console.log(response.data);
            if (response.data.message === 'password reset link ok') {
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

    updatePassword = async (e) => {
        e.preventDefault();
        const {email, password, confirmPassword} = this.state;
        const {
            match: {
                params: {token},
            },
        } = this.props;
        if (password !== confirmPassword) {
            this.setState({
                messageFromServer: 'passwords are not a match',
                password: '',
                confirmPassword: ''
            });
        } else {
            try {
                const response = await axios.put(
                    baseUrl + '/updateForgottenPassword',
                    {
                        email,
                        password,
                        resetPasswordToken: token,
                    },
                );
                // console.log(response.data);
                if (response.data.message === 'password updated') {
                    this.setState({
                        updated: true,
                        error: false,
                        password: '',
                        confirmPassword: ''
                    });
                } else {
                    this.setState({
                        updated: false,
                        error: true,
                        password: '',
                        confirmPassword: ''
                    });
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    render() {
        const {
            password, error, updated, confirmPassword, messageFromServer
        } = this.state;

        if (error) {
            return (
                <div>
                    <Message negative>
                        <Message.Header>Salasanan vaihtaminen ei onnistunut. Linkki saattoi olla virheellinen tai
                            vanhentunut. Tilaa uusi linkki. </Message.Header>
                    </Message>
                </div>
            );
        }
        return (
            <div style={{backgroundColor: 'white',
                paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
                paddingRight: '20px'}}>
                <div className='form-container'>
                    <h1>Vaihda salasana</h1>
                    <Form className="password-form" onSubmit={this.updatePassword}>
                        <Form.Input
                            id="password"
                            label="Syötä uusi salasana:"
                            onChange={this.handleChange('password')}
                            value={password}
                            type="password"
                            placeholder="Uusi salasana..."
                        />
                        <Form.Input
                            id="confirmPassword"
                            label="Vahvista uusi salasana:"
                            value={confirmPassword}
                            type="password"
                            placeholder="Uusi salasana uudelleen..."
                            onChange={this.handleChange('confirmPassword')}
                        />
                        <Button type='submit' primary>
                            Päivitä salasana
                        </Button>
                    </Form>
                    &nbsp;
                </div>
                {updated && (
                    <Message positive>
                        <Message.Header>
                            Salasanasi on päivitetty! Kirjaudu sisään sähköpostiosoitteellasi ja uudella
                            salasanallasi.
                        </Message.Header>
                    </Message>
                )}
                {messageFromServer === 'passwords are not a match' && (
                    <Message negative>
                        <Message.Header>Salasanan vahvistaminen epäonnistui. Syötä uusi salasana
                            uudestaan.</Message.Header>
                    </Message>
                )}
            </div>
        );
    }
}

export default ResetPassword;