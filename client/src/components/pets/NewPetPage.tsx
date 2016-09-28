import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url, submitForm } from '../../util';

import Input from '../form/Input';
import DateInput from '../form/DateInput';
import SelectInput from '../form/SelectInput';

import { IError, IOwner, IPetRequest, IEditablePet, IPet, IPetType, IRouterContext, ISelectOption } from '../../types';

interface INewPetPageProps {
  params: { ownerId: string };
}

interface INewPetPageState {
  pet?: IEditablePet;
  owner?: IOwner;
  pettypes?: ISelectOption[];
  error?: IError;
};

const newPet = (): IEditablePet => ({
  id: null,
  isNew: true,
  name: '',
  birthDate: null,
  typeId: null
});

const toSelectOptions = (pettypes: IPetType[]): ISelectOption[] => pettypes.map(pettype => ({ value: pettype.id, name: pettype.name }));

export default class NewPetPage extends React.Component<INewPetPageProps, INewPetPageState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { pet: newPet() };
  }

  componentDidMount() {

    const { params } = this.props;

    fetch(url('/api/pettypes'))
      .then(response => response.json())
      .then(toSelectOptions)
      .then(pettypes => this.setState({ pettypes }));
    fetch(url('/api/owner/' + params.ownerId))
      .then(response => response.json())
      .then(owner => this.setState({ owner }));
  }

  onSubmit(event) {
    event.preventDefault();

    const { owner, pet } = this.state;

    const request: IPetRequest = {
      birthDate: pet.birthDate,
      name: pet.name,
      typeId: pet.typeId
    };

    console.log('petRequest: ', request);

    const url = '/api/owners/' + owner.id + '/pets';
    submitForm(pet.isNew ? 'POST' : 'PUT', url, request, (status, response) => {
      if (status === 204) {
        this.context.router.push({
          pathname: '/owners/' + owner.id
        });
      } else {
        console.log('ERROR?!...', response);
        this.setState({ error: response });
      }
    });
  }

  onInputChange(name: string, value: string) {
    const { pet } = this.state;
    const modifiedOwner = Object.assign({}, pet, { [name]: value });

    this.setState({ pet: modifiedOwner });
  }

  render() {
    const { owner, pettypes, pet, error } = this.state;

    if (!owner || !pettypes) {
      console.log('render loading form');
      return <span>
        <h2>Pet</h2>
        <form className='form-horizontal' method='POST'>
          <div className='form-group has-feedback'>
            Loading...
          </div>
        </form>
      </span>;
    }

    const formLabel = pet.isNew ? 'Add Pet' : 'Update Pet';

    return (
      <span>
        <h2>{formLabel}</h2>
        <form className='form-horizontal' method='POST' action={url('/api/owner')}>
          <div className='form-group has-feedback'>
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Owner</label>
              <div className='col-sm-10'>{owner.firstName} {owner.lastName}</div>
            </div>

            <Input object={pet} error={error} label='Name' name='name' onChange={this.onInputChange} />
            <DateInput object={pet} error={error} label='Birth date' name='birthDate' onChange={this.onInputChange} />
            <SelectInput object={pet} error={error} label='Type' name='typeId' options={pettypes} onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.onSubmit}>{formLabel}</button>
            </div>
          </div>
        </form>
      </span>
    );
  }
}