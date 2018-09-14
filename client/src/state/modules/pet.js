import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, concatMap } from 'rxjs/operators';

import initialAppState from '../state';

const AJAX_ERROR = 'pet/AJAX_ERROR';
const FETCH_PET_BY_ID = 'pet/FETCH_PET_BY_ID';
const SAVE_VISIT = 'pet/SAVE_VISIT';
const UPDATE_SELECTED_PET = 'pet/UPDATE_SELECTED_PET';
const UPDATE_PET_VISIT_DETAILS = 'pet/UPDATE_PET_VISIT_DETAILS';

const fetchPet = (ownerId, petId) => ({
  type: FETCH_PET_BY_ID,
  ownerId,
  petId
});

const updatePetVisitDetails = details => ({
  type: UPDATE_PET_VISIT_DETAILS,
  details
});

const saveVisit = visit => ({
  type: SAVE_VISIT,
  visit
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

const fetchPetByIdEpic = action$ =>
  action$.pipe(
    ofType(FETCH_PET_BY_ID),
    concatMap(({ petId, ownerId }) =>
      ajax.getJSON(`${petClinicServiceUrl}/owner/list?lastName=`).pipe(
        map(owners => ({ owners, petId, ownerId })),
        catchError(error => of(ajaxError(error.xhr.response)))
      )
    ),
    map(({ petId, owners, ownerId }) => {
      const pet = owners
        .find(o => o.id === ownerId)
        .pets.filter(p => p.id === petId)[0];

      return pet;
    }),
    mergeMap(pet =>
      ajax.getJSON(`${petClinicServiceUrl}/vets`).pipe(
        map(vets => updatePetVisitDetails({ pet, vets })),
        catchError(error => of(ajaxError(error.xhr.response)))
      )
    )
  );

const saveVisitEpic = action$ =>
  action$.pipe(
    ofType(SAVE_VISIT),
    mergeMap(({ visit }) => {
      const { petId, date, description, time, ownerId, vetId } = visit;
      return ajax
        .post(
          `${petClinicServiceUrl}/owners/${ownerId}/pets/${petId}/visits?vetId=${vetId}`,
          {
            date,
            description,
            time
          },
          { 'Content-Type': 'application/json' }
        )
        .pipe(
          map(() => fetchPet(ownerId, petId)),
          catchError(error => of(ajaxError(error.xhr.response)))
        );
    })
  );

const petEpic = combineEpics(fetchPetByIdEpic, saveVisitEpic);

export { ownerReducer as default, petEpic, fetchPet, saveVisit };
