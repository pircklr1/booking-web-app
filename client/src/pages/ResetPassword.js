import {Button, Form} from "semantic-ui-react";
import React, {Component} from 'react';
import {resetPassword, updateForgottenPassword} from "../service/ClientService";
import axios from 'axios';

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            updated: false,
            isLoading: true,
            error: false,
        };
    }

    async componentDidMount() {
     console.log(this.props.match.params.token)
        try {
            const response = await axios.get('http://localhost:9999/api/reset', {
                params: {
                    resetPasswordToken: this.props.match.params.token,
                },
            });
            console.log(response.data);
            if (response.data.message === 'password reset link ok') {
                this.setState({
                    email: response.data.email,
                    updated: false,
                    isLoading: false,
                    error: false,
                });
            }
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                updated: false,
                isLoading: false,
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
        const {email, password} = this.state;
        const {
            match: {
                params: {token},
            },
        } = this.props;
        try {
            const response = await axios.put(
                'http://localhost:9999/api/updateforgottenpassword',
                {
                    email,
                    password,
                    resetPasswordToken: token,
                },
            );
            console.log(response.data);
            if (response.data.message === 'password updated') {
                this.setState({
                    updated: true,
                    error: false,
                });
            } else {
                this.setState({
                    updated: false,
                    error: true,
                });
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    render() {
        const {
            password, error, isLoading, updated
        } = this.state;

        if (error) {
            return (
                <div>
                    <div>
                        <h4>Salasanan vaihtaminen ei onnistunut. </h4>
                    </div>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div>
                    <div>Ladataan käyttäjädataa...</div>
                </div>
            );
        }
        return (
            <div>
                <Form className="password-form" onSubmit={this.updatePassword}>
                    <Form.Input
                        id="password"
                        label="Salasana"
                        onChange={this.handleChange('password')}
                        value={password}
                        type="password"
                    />
                    <Button type='submit' primary>
                        Päivitä salasana
                    </Button>
                </Form>

                {updated && (
                    <div>
                        <p>
                            Salasanasi on päivitetty! Kirjaudu sisään sähköpostiosoitteellasi ja uudella salasanallasi.
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default ResetPassword;