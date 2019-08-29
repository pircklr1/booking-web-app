// This page shows the current user's settings. Here, the user can also modify his or her email and password.

import {Button, Form, Message} from "semantic-ui-react";
import React, {Component} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      const response = await axios.get(baseUrl + '/user', {
        params: {
          userId,
        },
      });
      console.log(response.data);
      this.setState({
        loadingUser: false,
        first_name: response.data.first_name ? response.data.first_name : '',
        last_name: response.data.last_name ? response.data.last_name : '',
        email: response.data.email,
        username: response.data.username,
        password: response.data.password,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
  }
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateUser= async (e) => {
    e.preventDefault();
    const {firstName, lastName, email, password, confirmPassword, messageFromServer} = this.state;
    if (password !== confirmPassword) {
      this.setState({
        messageFromServer: 'passwords are not a match',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      try {
        const response = await axios.put(
            baseUrl + '/user',
            {
              firstName,
              lastName,
              email,
              password
            },
        );
        console.log(response.data);
        if (response.data.message === 'user updated') {
          this.setState({
            updated: true,
            error: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } else {
          this.setState({
            updated: false,
            error: true,
            firstName: '',
            lastName: '',
            email: '',
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
      firstName, lastName, email, password, error, updated, confirmPassword, messageFromServer
    } = this.state;

    if (error) {
      return (
          <div>
            <Message negative>
              <Message.Header> Tietojen tallentaminen ei onnistunut. Tarkista syötteet ja yritä uudestaan.</Message.Header>
            </Message>
          </div>
      );
    }
    return (
        <div style={{backgroundColor: 'white',
          paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
          paddingRight: '20px'}}>
          <div className='form-container'>
            <h1>Asetukset</h1>
            <Form className="update-form" onSubmit={this.updateUser}>
              <Form.Input
                  id="firstname"
                  label="Vaihda etunimi:"
                  onChange={this.handleChange('firstname')}
                  value={firstName}
                  type="text"
                  placeholder="Etunimi"
              />
              <Form.Input
                  id="lastname"
                  label="Vaihda sukunimi:"
                  onChange={this.handleChange('lastname')}
                  value={lastName}
                  type="text"
                  placeholder="Sukunimi"
              />
              <Form.Input
                  id="email"
                  label="Vaihda sähköpostiosoite:"
                  onChange={this.handleChange('email')}
                  value={email}
                  type="password"
                  placeholder="Sähköpostiosoite"
              />
              <Form.Input
                  id="password"
                  label="Vaihda salasana:"
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

export default Settings;
