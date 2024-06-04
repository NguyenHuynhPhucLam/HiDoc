import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './SignUp.scss';
import { FormattedMessage } from 'react-intl';
import { handleSignUpApi } from '../../services/userService';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errMessage: '',
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleOnChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
        });
    };

    // handleSignUp = async () => {
    //     this.setState({
    //         errMessage: '',
    //     });

    //     try {
    //         const { username, email, password, confirmPassword } = this.state;

    //         if (password !== confirmPassword) {
    //             this.setState({
    //                 errMessage: 'Passwords do not match.',
    //             });
    //             return;
    //         }

    //         let data = await handleSignUpApi(username, email, password);

    //         if (data && data.errCode !== 0) {
    //             this.setState({
    //                 errMessage: data.message,
    //             });
    //         }

    //         if (data && data.errCode === 0) {
    //             // todo
    //             this.props.userSignUpSuccess(data.user);
    //             console.log('Sign Up Succeeded');
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.data) {
    //             this.setState({
    //                 errMessage: error.response.data.message,
    //             });
    //         }
    //     }
    // };

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleSignUp();
        }
    };

    render() {
        return (
            <div className="signup-background">
                <div className="signup-container">
                    <div className="signup-content row">
                        <div className="col-12 text-signup">Sign Up</div>
                        <div className="col-12 form-group signup-input">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12 form-group signup-input">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12 form-group signup-input">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12 form-group signup-input">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password"
                                value={this.state.confirmPassword}
                                onChange={(event) => this.handleOnChangeConfirmPassword(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-signup"
                            // onClick={() => this.handleSignUp()}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);