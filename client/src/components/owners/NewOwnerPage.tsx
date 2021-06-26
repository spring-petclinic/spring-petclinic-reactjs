import * as React from 'react';
import OwnerEditor from './OwnerEditor';

import { IOwner } from '../../types';

const newOwner = (): IOwner => ({
  id: null,
  isNew: true,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  telephone: '',
  pets: []
});

export default () => <OwnerEditor initialOwner={newOwner()} />;

//   constructor() {
//     super();
//     this.onInputChange = this.onInputChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = { owner: newOwner() };
//   }

//   onSubmit(event) {
//     event.preventDefault();

//     const { owner } = this.state;

//     submitForm('/api/owner', owner, (status, response) => {
//       if (status === 201) {
//         const newOwner = response as IOwner;
//         this.context.router.push({
//           pathname: '/owners/' + newOwner.id
//         });
//       } else {
//         console.log('ERROR?!...', response);
//         this.setState({ error: response });
//       }
//     });
//   }

//   onInputChange(name: string, value: string) {
//     const { owner } = this.state;
//     const modifiedOwner = Object.assign({}, owner, { [name]: value });
//     this.setState({ owner: modifiedOwner });
//   }

//   render() {
//     const { owner, error } = this.state;
//     return (
//       <span>
//         <h2>New Owner</h2>
//         <form className='form-horizontal' method='POST' action={url('/api/owner')}>
//           <div className='form-group has-feedback'>
//             <Input object={owner} error={error} label='First Name' name='firstName' onChange={this.onInputChange} />
//             <Input object={owner} error={error} label='Last Name' name='lastName' onChange={this.onInputChange} />
//             <Input object={owner} error={error} label='Address' name='address' onChange={this.onInputChange} />
//             <Input object={owner} error={error} label='City' name='city' onChange={this.onInputChange} />
//             <Input object={owner} error={error} label='Telephone' name='telephone' onChange={this.onInputChange} />
//           </div>
//           <div className='form-group'>
//             <div className='col-sm-offset-2 col-sm-10'>
//               <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Owner</button>
//             </div>
//           </div>
//         </form>
//       </span>
//     );
//   }
// }