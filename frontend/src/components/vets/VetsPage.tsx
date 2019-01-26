import * as React from 'react';

import {IRouter, Link} from 'react-router';
import {url} from '../../util';

import {IVet} from '../../types';
import * as Cookies from 'es-cookie';
import Loader from 'react-loader-advanced';

interface IVetsPageState {
    vets: IVet[];
    isDataLoading: boolean;
}

export default class VetsPage extends React.Component<void, IVetsPageState> {
    constructor() {
        super();

        this.state = {vets: [], isDataLoading: true};
    }

    componentDidMount() {
        const requestUrl = url('api/vets');

        const fetchParams = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('user')
            }
        };

        fetch(requestUrl, fetchParams)
            .then(response => response.json())
            .then(vets => {
                this.setState({vets, isDataLoading: false});
            });
    }

    render() {
        const {vets, isDataLoading} = this.state;
        this.state = {vets: this.state.vets, isDataLoading: true};

        if (!vets) {
            return <h2>Veterinarians</h2>;
        }

        return (
        <span>
        <h2>Veterinarians</h2>
         <Loader show={isDataLoading} message={<img src='/images/loader.gif' width={'25px'} height={'25px'}/>}>
            <table className='table table-striped'>
             <thead>
             <tr>
               <th>Name</th>
               <th>Specialties</th>
             </tr>
            </thead>
            <tbody>
                {vets.map(vet => (
                    <tr key={vet.id}>
                        <td>{vet.firstName} {vet.lastName}</td>
                        <td>{vet.specialties.length > 0 ? vet.specialties.map(specialty => specialty.name).join(', ') : 'none'}</td>
                    </tr>
                ))}
            </tbody>
            </table>
         </Loader>
        </span>
        );
    }
}
