import * as React from 'react';

import {IOwner, IEditablePet, ISelectOption} from '../../types';
import * as Cookies from 'es-cookie';
import {url} from '../../util';

import LoadingPanel from './LoadingPanel';
import PetEditor from './PetEditor';

import createPetEditorModel from './createPetEditorModel';

interface IEditPetPageProps {
    params: {
        ownerId: string,
        petId: string
    };
}

interface IEditPetPageState {
    pet?: IEditablePet;
    owner?: IOwner;
    pettypes?: ISelectOption[];
};

export default class EditPetPage extends React.Component<IEditPetPageProps, IEditPetPageState> {

    componentDidMount() {
        const {params} = this.props;

        const fetchUrl = url(`/api/owners/${params.ownerId}/pets/${params.petId}`);
        const fetchParams = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('user')
            }
        };
        const loadPetPromise = fetch(fetchUrl).then(response => response.json());

        createPetEditorModel(this.props.params.ownerId, loadPetPromise)
            .then(model => this.setState(model));
    }

    render() {
        if (!this.state) {
            return <LoadingPanel/>;
        }

        return <PetEditor {...this.state} />;
    }
}
