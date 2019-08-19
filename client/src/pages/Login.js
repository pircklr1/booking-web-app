import React, {Component} from 'react';
import { Button, Icon, Input } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        alert('Authentication coming soon!');
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login Below!</h1>
                <div className="ui left icon input">
                    <i aria-hidden="true" className="at icon"></i>
                    <input type="text"
                           name="email"
                           placeholder="Email..."
                           value={this.state.email}
                           onChange={this.handleInputChange}
                           required/>
                </div>

                <div className="ui icon input">
                    <input type="text"
                           name="password"
                           placeholder="Password..."
                           value={this.state.password}
                           onChange={this.handleInputChange}
                           required/>
                </div>

                <button className="ui primary button">Login</button>
            </form>
        );
    }
}

export default Login;