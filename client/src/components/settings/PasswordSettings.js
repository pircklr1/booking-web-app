import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class PasswordSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            messageFromServer: '',
            updated: false,
            error: false,
            passwordError: false
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
                email: response.data.email,
                updated: false,
                error: false,
            });
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                updated: false,
                error: true
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
        if (password.length < 8){
            this.setState({
                passwordError: true,
                messageFromServer: 'password is too short'
            })
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
                    baseUrl + '/updatePassword',
                    {email,
                        password},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            token: localStorage.getItem('jwtToken')
                        }
                    });
                console.log(response.data);
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
                        <Message.Header>Jotain meni vikaan! Yritä myöhemmin uudelleen.</Message.Header>
                    </Message>
                </div>
            );
        }
        return (
            <div style={{backgroundColor: 'white',
                paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
                paddingRight: '20px'}}>
                <div className='form-container'>
                    <h4>Vaihda salasana</h4>
                    <Form className="password-form" onSubmit={this.updatePassword}>
                        <Form.Input
                            id="password"
                            label="Syötä uusi salasana:"
                            onChange={this.handleChange('password')}
                            value={password}
                            type="password"
                            placeholder="Uusi salasana"
                            error={this.state.passwordError}
                        />
                        <Form.Input
                            id="confirmPassword"
                            label="Vahvista uusi salasana:"
                            value={confirmPassword}
                            type="password"
                            placeholder="Uusi salasana uudelleen"
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
                            Salasanasi on päivitetty!
                        </Message.Header>
                    </Message>
                )}
                {messageFromServer === 'passwords are not a match' && (
                    <Message negative>
                        <Message.Header>Salasanan vahvistaminen epäonnistui. Syötä uusi salasana
                            uudestaan.</Message.Header>
                    </Message>
                )}
                {messageFromServer === 'password is too short' && (
                    <Message negative>
                        <Message.Header>Salasanan tulee olla vähintään 8 merkkiä pitkä!</Message.Header>
                    </Message>
                )}
            </div>
        );
    }
}

export default PasswordSettings;