import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url, submitForm } from '../../util';

import { IOwner, IRouterContext } from '../../types';

interface INewOwnerPageState {
  owner?: IOwner;
  error?: any; // TODO type
};

const newOwner = (): IOwner => ({
  id: null,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  telephone: '',
  pets: []
});

const Input = ({object, name, label, onChange}: { object: any, name: string, label: string, onChange: (name: string, value: string) => void }) => {

  const handleOnChange = event => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className='form-group'>
      <label className='col-sm-2 control-label'>{label}</label>

      <div className='col-sm-10'>
        <input type='text' name={name} className='form-control' value={object[name]} onChange={handleOnChange} />
        <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>
        { /*
            <c:if test='${status.error}'>
                <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
                <span className='help-inline'>${status.errorMessage}</span>
            </c:if>
            */ }
      </div>
    </div>
  );
};

export default class NewOwnerPage extends React.Component<void, INewOwnerPageState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { owner: newOwner() };
  }

  onSubmit(event) {
    event.preventDefault();

    const { owner } = this.state;

    submitForm('/api/owner', owner, (status, response) => {
      if (status === 201) {
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
    const { owner } = this.state;
    return (
      <span>
        <h2>New Owner</h2>
        <form className='form-horizontal' method='POST' action={url('/api/owner')}>
          <div className='form-group has-feedback'>
            <Input object={owner} label='First Name' name='firstName' onChange={this.onInputChange} />
            <Input object={owner} label='Last Name' name='lastName' onChange={this.onInputChange} />
            <Input object={owner} label='Address' name='address' onChange={this.onInputChange} />
            <Input object={owner} label='City' name='city' onChange={this.onInputChange} />
            <Input object={owner} label='Telephone' name='telephone' onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Owner</button>
            </div>
          </div>
        </form>
      </span>
    );
  }
}