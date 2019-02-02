import * as React from 'react';
import {IRouterContext} from '../types/index';
import Input from './form/Input';
import {NotEmpty} from './form/Constraints';
import {IError} from '../types';
import {url} from '../util';
import * as Cookies from 'es-cookie';

interface ILoginState {
    username: string;
    password: string;
    error?: IError;
    fail: boolean;
    showingAlert: boolean;
}

export default class Login extends React.Component<any, ILoginState> {

    context: IRouterContext;

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);

        this.state = {
            username: '',
            password: '',
            error: null,
            fail: false,
            showingAlert: true
        };
    }

    onUsernameChanged(name: string, value: string) {
        this.setState({
            username: value,
            password: this.state.password,
            error: this.state.error,
            fail: this.state.fail,
            showingAlert: this.state.showingAlert
        });
    }

    onPasswordChanged(name: string, value: string) {
        this.setState({
            username: this.state.username,
            password: value,
            error: this.state.error,
            fail: this.state.fail,
            showingAlert: this.state.showingAlert
        });
    }

    onSubmit(event) {
        event.preventDefault();

        let payload = {'username': this.state.username, 'password': this.state.password};

        const requestUrl = url('login');
        const token = Cookies.get('user');

        const fetchParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
        };

        console.log('Submitting to ' + 'POST' + ' ' + requestUrl);
        return fetch(requestUrl, fetchParams)
            .then(response => {
                if (response.status === 200) {
                    let date = new Date();
                    let minutes = 30;
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    response.json().then(result => {
                        Cookies.set('user', result.token, {expires: date});
                        this.context.router.push('/');
                    });
                } else if (response.status === 401) {
                    this.setState({
                        username: this.state.username,
                        password: this.state.password,
                        error: this.state.error,
                        fail: true,
                        showingAlert: this.state.showingAlert
                    });
                } else if (response.status === 500) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const {username, password, fail} = this.state;
        const errorMessage = fail ?
            <div className='alert alert-danger' style={{marginLeft: '67px'}}>
                <p>Incorrect username or password</p>
            </div> : '';

        return (
            <form className='form-horizontal' method='POST' action={url('/login')}>
                <div style={{
                    position: 'relative',
                    margin: '0px auto 50px auto',
                    width: '400px'
                }}>
                    <div style={{marginLeft: '170px'}}>
                        <h1>Petclinic</h1>
                    </div>
                    <br/>
                    <br/>
                    <div className='row'>
                        {errorMessage}
                        <div className='form-group has-feedback'>
                            <Input type='text' id='username' object={username} error={null}
                                   constraint={NotEmpty}
                                   label='Username:' name='username'
                                   onChange={this.onUsernameChanged}/>
                        </div>
                        <div className='form-group has-feedback'>
                            <Input type='password' id='password' object={password} error={null}
                                   constraint={NotEmpty}
                                   label='Password:' name='password'
                                   onChange={this.onPasswordChanged}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <button id='login-button' className='btn btn-primary'
                                style={{marginLeft: '70px'}}
                                onClick={this.onSubmit}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
