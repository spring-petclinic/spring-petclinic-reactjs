import * as React from 'react';

import {Link} from 'react-router';
import {IOwner} from '../../types';
import {url} from '../../util';

import OwnerInformation from './OwnerInformation';
import PetsTable from './PetsTable';
import * as Cookies from 'es-cookie';

interface IOwnersPageProps {
    params?: { ownerId?: string };
}

interface IOwnerPageState {
    owner?: IOwner;
}

export default class OwnersPage extends React.Component<IOwnersPageProps, IOwnerPageState> {

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        const {params} = this.props;

        if (params && params.ownerId) {
            const fetchUrl = url(`api/owner/${params.ownerId}`);
            const fetchParams = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('user')
                }
            };
            fetch(fetchUrl, fetchParams)
                .then(response => response.json())
                .then(owner => this.setState({owner}));
        }
    }

    render() {
        const {owner} = this.state;

        if (!owner) {
            return <h2>No Owner loaded</h2>;
        }

        return (
            <span>
        <OwnerInformation owner={owner}/>
        <PetsTable owner={owner}/>
      </span>
        );
    }
}
