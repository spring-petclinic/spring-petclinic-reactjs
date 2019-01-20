import * as React from 'react';
import {IRouterContext} from '../types/index';
import Input from './form/Input';
import {NotEmpty} from './form/Constraints';
import {IError} from '../types';
import {url, submitForm} from '../util';
import * as Cookies from 'es-cookie';

interface ILoginState {
    username: string;
    password: string;
    error?: IError;
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
            error: null
        };
    }

    onUsernameChanged(name: string, value: string) {
        this.setState({
            username: value,
            password: this.state.password,
            error: this.state.error
        });
    }

    onPasswordChanged(name: string, value: string) {
        this.setState({
            username: this.state.username,
            password: value,
            error: this.state.error
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('here');
        let payload = {'username': this.state.username, 'password': this.state.password};
        console.log(payload);
        submitForm('POST', 'login', payload, (status, response) => {
            if (status === 200) {
                let in30Minutes = 1 / 48;
                Cookies.set('user', response.token, {expires: in30Minutes});
                this.context.router.push({
                    pathname: '/'
                });
            }
        });
    }

    render() {
        const {username, password, error} = this.state;

        return (
            <form className='form-horizontal' method='POST' action={url('/login')}>
                <div style={{
                    position: 'relative',
                    margin: '0px auto 50px auto',
                    width: '400px'
                }}>
                    <div style={{marginLeft: '170px'}}>
                        <h1>Login</h1>
                    </div>
                    <br/>
                    <br/>
                    <div className='row'>
                        <div className='form-group has-feedback'>
                            <Input object={username} error={error} constraint={NotEmpty}
                                   label='Username:' name='username'
                                   onChange={this.onUsernameChanged}/>
                        </div>
                        <div className='form-group has-feedback'>
                            <Input object={password} error={error} constraint={NotEmpty}
                                   label='Password:' name='password'
                                   onChange={this.onPasswordChanged}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <button id='login-button' className='btn btn-primary'
                                style={{marginLeft: '70px'}}
                                onClick={this.onSubmit}>Login
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
