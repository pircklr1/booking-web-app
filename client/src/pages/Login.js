import React, {Component} from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react'

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
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
            <form class="ui form" onSubmit={this.onSubmit}>
                <div className="ui stacked secondary  segment">
                    <div className="field">
                <div className="ui left icon input">
                    <i aria-hidden="true" className="at icon"></i>
                    <input type="text"
                           name="email"
                           placeholder="Email..."
                           value={this.state.email}
                           onChange={this.handleInputChange}
                           required/>
                </div>
                    </div>
                    <div className="field">
                <div className="ui left icon input">
                    <i aria-hidden="true" className="lock icon"></i>
                    <input type="text"
                           name="password"
                           placeholder="Password..."
                           value={this.state.password}
                           onChange={this.handleInputChange}
                           required/>
                </div>
                    </div>

                    <div className="ui fluid large teal submit button">Login</div>
                </div>
                <div className="ui error message"></div>
            </form>
                    <div className="ui message">
                        New to us? <a href="/home">Register</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;