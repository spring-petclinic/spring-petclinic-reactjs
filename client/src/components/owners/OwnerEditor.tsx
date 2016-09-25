import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url, submitForm } from '../../util';

import Input from '../form/Input';

import { IError, IOwner, IRouterContext } from '../../types';

interface IOwnerEditorProps {
  initialOwner?: IOwner;
}

interface IOwnerEditorState {
  owner?: IOwner;
  error?: IError;
};

export default class OwnerEditor extends React.Component<IOwnerEditorProps, IOwnerEditorState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      owner: Object.assign({}, props.initialOwner)
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const { owner } = this.state;

    const url = owner.isNew ? '/api/owner' : '/api/owner/' + owner.id;
    submitForm(owner.isNew ? 'POST' : 'PUT', url, owner, (status, response) => {
      if (status === 200 || status === 201) {
        const newOwner = response as IOwner;
        this.context.router.push({
          pathname: '/owners/' + newOwner.id
        });
      } else {
        console.log('ERROR?!...', response);
        this.setState({ error: response });
      }
    });
  }

  onInputChange(name: string, value: string) {
    const { owner } = this.state;
    const modifiedOwner = Object.assign({}, owner, { [name]: value });
    this.setState({ owner: modifiedOwner });
  }

  render() {
    const { owner, error } = this.state;
    return (
      <span>
        <h2>New Owner</h2>
        <form className='form-horizontal' method='POST' action={url('/api/owner')}>
          <div className='form-group has-feedback'>
            <Input object={owner} error={error} label='First Name' name='firstName' onChange={this.onInputChange} />
            <Input object={owner} error={error} label='Last Name' name='lastName' onChange={this.onInputChange} />
            <Input object={owner} error={error} label='Address' name='address' onChange={this.onInputChange} />
            <Input object={owner} error={error} label='City' name='city' onChange={this.onInputChange} />
            <Input object={owner} error={error} label='Telephone' name='telephone' onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.onSubmit}>{owner.isNew ? 'Add Owner' : 'Update Owner'}</button>
            </div>
          </div>
        </form>
      </span>
    );
  }
}