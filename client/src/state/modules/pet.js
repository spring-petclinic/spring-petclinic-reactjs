import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';

import initialAppState from '../state';

const AJAX_ERROR = 'pet/AJAX_ERROR';
const FETCH_PET_BY_ID = 'pet/FETCH_PET_BY_ID';
const UPDATE_SELECTED_PET = 'pet/UPDATE_SELECTED_PET';
const UPDATE_PET_VISIT_DETAILS = 'pet/UPDATE_PET_VISIT_DETAILS';

const fetchPet = (ownerId, petId) => ({
  type: FETCH_PET_BY_ID,
  ownerId,
  petId
});

// const updateSelectedPet = pet => ({
//   type: UPDATE_SELECTED_PET,
//   pet
// });

const updatePetVisitDetails = details => ({
  type: UPDATE_PET_VISIT_DETAILS,
  details
});

const ajaxError = payload => ({ type: AJAX_ERROR, payload });

const ownerReducer = (state = initialAppState.pet, action) => {
  switch (action.type) {
    case AJAX_ERROR: {
      // eslint-disable-next-line no-console
      console.log(action.payload);
      return { ...state };
    }
    case UPDATE_SELECTED_PET: {
      const { pet } = action;
      return { ...state, selectedOwner: pet };
    }
    case UPDATE_PET_VISIT_DETAILS: {
      const { details } = action;
      return { ...state, visitDetails: details };
    }
    default: {
      return { ...state };
    }
  }
};

const petClinicServiceUrl = 'http://localhost:8080/api';

const fetchPetByIdEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_PET_BY_ID),
    map(({ petId }) => {
      const pet = state$.value.owner.selectedOwner.pets.filter(
        p => p.id === petId
      )[0];

      return pet;
    }),
    mergeMap(pet =>
      ajax.getJSON(`${petClinicServiceUrl}/vets`).pipe(
        map(vets => updatePetVisitDetails({ pet, vets })),
        catchError(error => of(ajaxError(error.xhr.response)))
      )
    )
  );

const petEpic = combineEpics(fetchPetByIdEpic);

export { ownerReducer as default, petEpic, fetchPet };
